package systems.commands;

import ecs.System;
import discord_builder.BaseCommandInteraction;
import js.lib.Object;
import vm2.NodeVM;
import js.Browser;
import js.node.Process;
import vm2.VM;
import discord_js.Role;
import js.node.Fs;
import haxe.Http;
import discord_js.TextChannel;
import discord_js.MessageEmbed;
import sys.FileSystem;
import discord_js.Message;
import components.Command;
import js.node.ChildProcess.spawn;

enum abstract RunMessage(String) from String to String {}

class Run extends System {
	@:fastFamily var code_messages:{message:RunMessage, response:Message};
	var message_id:String;
	var haxe_version:String = null;
	var code_requests:Map<String, Array<Float>> = [];
	var channel:TextChannel;
	var checked:Bool = false;
	override function onAdded() {

	}

	override function update(_) {
		if (!Main.connected) {
			return;
		}

		if (this.channel == null && !checked) {
			checked = true;
			Main.client.channels.fetch('663246792426782730').then(channel -> {
				this.channel = cast channel;
			});
			return;
		}

		iterate(code_messages, entity -> {
			if (message.startsWith('!run ')) {
				this.run(message, response);
				trace('here');
				this.code_messages.remove(entity);
			}
		});
	}

	function run(message:String, response:Message) {
		if (this.haxe_version == null) {
			var process = './haxe/haxe';
			if (!FileSystem.exists(process)) {
				process = 'haxe';
			}
			var ls = spawn(process, ['--version']);
			ls.stdout.once('data', (data) -> {
				this.haxe_version = data.toString().substring(0, 5);
				ls.kill();
			});
		}
		
		this.extractCode(message, response);
	}

	function codeSource(message:String) {
		var remote = ~/^(!run #([a-zA-Z0-9]{5,8}))/gi;
		var source = "";
		if (remote.match(message)) {
			source = 'https://try.haxe.org/#${remote.matched(2)}';
		}
		return source;
	}

	function extractCode(message:String, response:Message) {
		var check_code = ~/^(!run(\s|\n| \n|)```(haxe|hx)(.*)```)/gmisu;
		if (check_code.match(message)) {
			this.parse(check_code.matched(4), response);
			return;
		}

		check_code = ~/^(!run #([a-zA-Z0-9]{5,8}))/gi;
		if (check_code.match(message)) {
			var regex = ~/(<code class="prettyprint haxe">)(.*?)(<\/code>)/gmius;
			var get_code = new Http('https://try.haxe.org/embed/${check_code.matched(2)}');
			get_code.onData = (data) -> {
				if (regex.match(data)) {
					this.parse(regex.matched(2).htmlUnescape(), response);
				}
			}
			get_code.request();
			return;
		}

		check_code = ~/!run (.*)/gmis;
		if (check_code.match(message)) {
			this.parse(check_code.matched(1), response);
			return;
		}
		this.parse(null, response);
	}

	function deleteFile(filename:String) {
		try {
			FileSystem.deleteFile('${this.base_path}/bin/$filename.js');
		} catch (e:Dynamic) {
			trace(e);
		}
	}

	function extractLibs(code:String) {
		var check_code = ~/(\/?\/?-l\W.*)/gmiu;
		if (!check_code.match(code)) {
			return [];
		}

		var libs = [];
		while (check_code.match(code)) {
			var split = check_code.matched(1).split(" ");
			libs.push('-L');
			libs.push(split[1]);
			code = check_code.matchedRight();
		}

		return libs;
	}

	function canRequest(data:Array<Float>) {
		var timings = 0.0;
		var last = 0.0;
		var count = 1;
		for (i in 0...data.length) {
			if (data.length % 2 == 1 && (data.length - i) == 1) {
				break;
			}
			if (i % 2 == 0) {
				last = data[i];
				continue;
			}
			timings += data[i] - last;
			count++;
		}

		return (data.length < 6) || (timings / count) > 2000;
	}

	function cleanOutput(data:String, filename:String, class_entry) {
		data = data.toString();
		var remove_vm = ~/(\[(.*|vm)\].*)$/igmu;
		
		data = data.replace(filename, class_entry).replace('', '');
		data = data.replace(this.base_path, "");
		data = data.replace("/hx/", "");
		data = data.replace("/bin/", "");

		return data;
	}

	function getImportAndUsings(input:String, index:Int = 0) {
		var regex = new EReg('^(import|using)(.*);$', 'igmu');
		var matches = [];
		while (regex.match(input)) {
			matches.push(regex.matched(index));
			input = regex.matchedRight();
		}

		return {
			code: input,
			paths: matches
		};
	}

	function parse(code:String, response:Message) {
		if (code == null || code.length == 0) {
			response.reply({content: 'Your `!run` command formatting is incorrect. Check the pin in <#663246792426782730>.'});
			return;
		}

		var class_exists = ~/(class.*({|\n{))/mgu;

		if (class_exists.match(code)) {
			var check_class = ~/(^class\s(Test|Main)(\n|\s|\S))/mgu;
			if (!check_class.match(code)) {
				response.reply({content: 'You must have a class called `Test` or `Main`'});
				return;
			}
		}
		if (!this.isSafe(code, response)) {
			response.reply({content: 'Your code contains bad things.'});
			return;
		}
		this.runCodeOnThread(code, response);
	}

	function isSafe(code:String, response:Message) {
		var check_http = new EReg('haxe.http|haxe.Http', 'gmu');
		if (check_http.match(code)) {
			return false;
		}

		if (!Main.config.macros) {
			if (~/@:.*[bB]uild/igmu.match(code)) {
				response.reply({content: "Currently no build macros allowed"});
				return false;
			}
		} else {
			if (code.contains('macro') || ~/macro|@:.*[bB]uild/igmu.match(code)) {
				return false;
			}
		}
		return !~/(\}\})|(sys|(("|')s(.*)y(.*)("|')s("|'))|eval|command|syntax.|require|location|untyped|@:.*[bB]uild)/igmu.match(code);
	}

	function runCodeOnThread(code:String, message:Message) {
		if (!this.isSafe(code, message)) {
			message.reply({content: 'Your code contains bad things.'});
			return;
		}

		var mention = '';

		var libs = this.extractLibs(code);
		var lib_regex = ~/(\/?\/?-l\W.*)/gmiu;
		if (lib_regex.match(code)) {
			code = lib_regex.replace(code, "");
		}

		var get_paths = this.getImportAndUsings(code);
		var format = '';

		for (data in get_paths.paths) {
			format += data;
		}
		try {
			var filename = 'H' + Date.now().getTime() + Math.floor(Math.random() * 100000);
			var check_class = ~/(^class\s(Test|Main)(\n|\s|\S))/mg;
			var code_content = "";
			var class_entry = "Main";
			if (check_class.match(get_paths.code)) {
				var parsed = check_class.matched(0);
				var replaced = "";
				if (parsed.contains("Test")) {
					class_entry = "Test";
				}

				replaced = check_class.replace(parsed, StringTools.replace(parsed, class_entry, filename));
				code_content = get_paths.code.replace(parsed, replaced);
				var other_instances = new EReg(class_entry, 'gm');
				if (other_instances.match(code_content)) {
					code_content = other_instances.replace(code_content, filename);
				}
			} else {
				code_content = 'class $filename {static function main() {${get_paths.code}}}';
			}

			code_content = format + '\n' + code_content;
			Fs.appendFile('${this.base_path}/hx/$filename.hx', code_content + '//User:${message.author.tag} | time: ${Date.now()}', (error) -> {
				if (error != null) {
					trace(error);
				}

				var commands = [
					'-cp',
					'${this.base_path}/hx',
					'-main',
					filename,
					'-js',
					'${this.base_path}/bin/$filename.js'
				];
				
				var process = './haxe/haxe';
				if (!FileSystem.exists(process)) {
					process = 'haxe';
				}

				var ls = spawn(process, libs.concat(commands), {timeout: 10000});
				
				//to debug code output
				// ls.stdout.on('data', (data:String) -> {
				// 	trace('stdout: ' + this.cleanOutput(data, filename, class_entry));
				// });

				ls.stderr.once('data', (data) -> {
					trace('error: ' + data);
					var compile_output = this.cleanOutput(data, filename, class_entry);
					message.reply({content: mention + '```\n${compile_output}```'});
					ls.kill('SIGTERM');
					return;
				});
				
				ls.once('close', (data) -> {
					var response = "";
					var js_file = '${this.base_path}/bin/$filename.js';
					if (!FileSystem.exists(js_file)) {
						trace('Code likely errored and didnt compile ($filename.js)');
						ls.kill('SIGTERM');
						return;
					}
					var obj = null;
					var vm = new NodeVM({
						sandbox: obj,
						console: 'redirect',
					});
					
					vm.on('console.log', (data, info) -> {
						trace(data);
						trace(info);
						response += '$info\n';
					});

					try {
						vm.runFile(js_file);
						var x = response.split('\n');
						var truncated = false;
						if (x.length > 24) {
							truncated = true;
							response = "";
							for (line in x.slice(x.length - 23)) {
								response += line + "\n";
							}
						}

						var embed = new MessageEmbed();
						embed.type = 'article';
						var code_output = '';
						var split = response.split('\n');
						for (key => item in split) {
							if (key >= split.length -1) {
								break;
							}
							code_output += '$key. $item \n';
						}

						if (truncated) {
							code_output += '\n//Output has been trimmed.';
						}

						var desc = '**Code:**\n```hx\n${get_paths.code}``` **Output:**\n ```markdown\n' + code_output + '\n```';
						trace(desc);
						
						embed.setDescription(desc);

						var url = this.codeSource(code);
						if (url == "") {
							embed.setAuthor('@${message.author.tag}', message.author.displayAvatarURL());
						} else {
							var tag = url.split('#')[1];
							embed.setTitle('TryHaxe #$tag');
							embed.setURL(url);
							embed.setAuthor('@${message.author.tag}', message.author.displayAvatarURL());
						}

						embed.setFooter('Haxe ${this.haxe_version}', 'https://cdn.discordapp.com/emojis/567741748172816404.png?v=1');						
						if (response.length > 0 && data == 0) {
							message.reply({embeds: [embed]}).then((succ) -> {
								message.delete().then(null, null);
							}, null);
							ls.kill();
							return;
						}
					} catch (e) {
						trace(e);
					}
					return; 
				});
			});
			return;
		} catch (e:Dynamic) {
			trace(e);
			this.channel.send({content: mention + "Code failed to execute."});
		}
	}

	var base_path(get, never):String;

	function get_base_path():String {
		var path = FileSystem.absolutePath('.');
		if (!FileSystem.exists(path + '/haxebot')) {
			FileSystem.createDirectory(path + '/haxebot');
		}
		path += '/haxebot';
		var date = DateTools.format(Date.now(), '%F');
		path += '/$date';
		if (!FileSystem.exists(path)) {
			FileSystem.createDirectory(path);
		}

		if (!FileSystem.exists(path + '/hx')) {
			FileSystem.createDirectory(path + '/hx');
		}

		if (!FileSystem.exists(path + '/bin')) {
			FileSystem.createDirectory(path + '/bin');
		}
		return path;
	}

	function get_name():String {
		return '!run';
	}
}