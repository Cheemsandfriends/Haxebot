const { Routes } = require('discord-api-types/v9');
;(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = "DateTools";
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "A":
		return DateTools.DAY_NAMES[d.getDay()];
	case "B":
		return DateTools.MONTH_NAMES[d.getMonth()];
	case "C":
		return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "Y":
		return Std.string(d.getFullYear());
	case "a":
		return DateTools.DAY_SHORT_NAMES[d.getDay()];
	case "b":case "h":
		return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "e":
		return Std.string(d.getDate());
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) {
			return "PM";
		} else {
			return "AM";
		}
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "s":
		return Std.string(d.getTime() / 1000 | 0);
	case "t":
		return "\t";
	case "u":
		var t = d.getDay();
		if(t == 0) {
			return "7";
		} else if(t == null) {
			return "null";
		} else {
			return "" + t;
		}
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	default:
		throw new haxe_exceptions_NotImplementedException("Date.format %" + e + "- not implemented yet.",null,{ fileName : "DateTools.hx", lineNumber : 101, className : "DateTools", methodName : "__format_get"});
	}
};
DateTools.__format = function(d,f) {
	var r_b = "";
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) {
			break;
		}
		var len = np - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	var len = f.length - p;
	r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
	return r_b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
DateTools.delta = function(d,t) {
	return new Date(d.getTime() + t);
};
DateTools.getMonthDays = function(d) {
	var month = d.getMonth();
	var year = d.getFullYear();
	if(month != 1) {
		return DateTools.DAYS_OF_MONTH[month];
	}
	var isB = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	if(isB) {
		return 29;
	} else {
		return 28;
	}
};
DateTools.seconds = function(n) {
	return n * 1000.0;
};
DateTools.minutes = function(n) {
	return n * 60.0 * 1000.0;
};
DateTools.hours = function(n) {
	return n * 60.0 * 60.0 * 1000.0;
};
DateTools.days = function(n) {
	return n * 24.0 * 60.0 * 60.0 * 1000.0;
};
DateTools.parse = function(t) {
	var s = t / 1000;
	var m = s / 60;
	var h = m / 60;
	return { ms : t % 1000, seconds : s % 60 | 0, minutes : m % 60 | 0, hours : h % 24 | 0, days : h / 24 | 0};
};
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
};
DateTools.makeUtc = function(year,month,day,hour,min,sec) {
	return Date.UTC(year,month,day,hour,min,sec);
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.escape = function(s) {
	return s.replace(EReg.escapeRe,"\\$&");
};
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedLeft: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		return s.replace(this.r,"#__delim__#").split("#__delim__#");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var EnumValue = {};
EnumValue.match = function(this1,pattern) {
	return false;
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) {
			i = 0;
		}
	}
	while(i < len) {
		if(((a[i]) === obj)) {
			return i;
		}
		++i;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) {
		i = len - 1;
	} else if(i < 0) {
		i += len;
	}
	while(i >= 0) {
		if(((a[i]) === obj)) {
			return i;
		}
		--i;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.keyValueIter = function(a) {
	return new haxe_iterators_ArrayKeyValueIterator(a);
};
HxOverrides.now = function() {
	return Date.now();
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new haxe_ds_List();
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		l.add(i1);
	}
	return l;
};
Lambda.map = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(x1));
	}
	return _g;
};
Lambda.mapi = function(it,f) {
	var i = 0;
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(i++,x1));
	}
	return _g;
};
Lambda.flatten = function(it) {
	var _g = [];
	var e = $getIterator(it);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			_g.push(x1);
		}
	}
	return _g;
};
Lambda.flatMap = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(x1));
	}
	var _g1 = [];
	var e = $getIterator(_g);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			_g1.push(x1);
		}
	}
	return _g1;
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(!f(x1)) {
			return false;
		}
	}
	return true;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		f(x1);
	}
};
Lambda.filter = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			_g.push(x1);
		}
	}
	return _g;
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.foldi = function(it,f,first) {
	var i = 0;
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first,i);
		++i;
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = $getIterator(it);
		while(_.hasNext()) {
			_.next();
			++n;
		}
	} else {
		var x = $getIterator(it);
		while(x.hasNext()) {
			var x1 = x.next();
			if(pred(x1)) {
				++n;
			}
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$getIterator(it).hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Lambda.findIndex = function(it,f) {
	var i = 0;
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.concat = function(a,b) {
	var l = [];
	var x = $getIterator(a);
	while(x.hasNext()) {
		var x1 = x.next();
		l.push(x1);
	}
	var x = $getIterator(b);
	while(x.hasNext()) {
		var x1 = x.next();
		l.push(x1);
	}
	return l;
};
var haxe_ds_Map = {};
haxe_ds_Map.set = function(this1,key,value) {
	this1.set(key,value);
};
haxe_ds_Map.get = function(this1,key) {
	return this1.get(key);
};
haxe_ds_Map.exists = function(this1,key) {
	return this1.exists(key);
};
haxe_ds_Map.remove = function(this1,key) {
	return this1.remove(key);
};
haxe_ds_Map.keys = function(this1) {
	return this1.keys();
};
haxe_ds_Map.iterator = function(this1) {
	return this1.iterator();
};
haxe_ds_Map.keyValueIterator = function(this1) {
	return this1.keyValueIterator();
};
haxe_ds_Map.copy = function(this1) {
	return this1.copy();
};
haxe_ds_Map.toString = function(this1) {
	return this1.toString();
};
haxe_ds_Map.clear = function(this1) {
	this1.clear();
};
haxe_ds_Map.arrayWrite = function(this1,k,v) {
	this1.set(k,v);
	return v;
};
haxe_ds_Map.toStringMap = function(t) {
	return new haxe_ds_StringMap();
};
haxe_ds_Map.toIntMap = function(t) {
	return new haxe_ds_IntMap();
};
haxe_ds_Map.toEnumValueMapMap = function(t) {
	return new haxe_ds_EnumValueMap();
};
haxe_ds_Map.toObjectMap = function(t) {
	return new haxe_ds_ObjectMap();
};
haxe_ds_Map.fromStringMap = function(map) {
	return map;
};
haxe_ds_Map.fromIntMap = function(map) {
	return map;
};
haxe_ds_Map.fromObjectMap = function(map) {
	return map;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.__properties__ = {get_discord:"get_discord"};
Main.app = null;
Main.auth = null;
Main.client = null;
Main.keys = null;
Main.state = null;
Main.command_file = null;
Main.universe = null;
Main.get_discord = function() {
	var config = null;
	config = Main.keys.discord_live;
	return config;
};
Main.token = function(rest) {
	var commands = Main.parseCommands();
	var get = rest.put(Routes.applicationGuildCommands(Main.get_discord().client_id,Main.guild_id),{ body : commands});
	return get;
};
Main.start = function() {
	var this1 = new Array(2);
	var vec = this1;
	var this1 = new Array(11);
	var this2 = new Array(11);
	vec[0] = new ecs_Phase(false,"testing",this1,this2);
	var this1 = new Array(28);
	var this2 = new Array(28);
	vec[1] = new ecs_Phase(true,"main",this1,this2);
	var phases = vec;
	var entities = new ecs_core_EntityManager(1000);
	var this1 = new Array(9);
	var vec = this1;
	vec[2] = new ecs_Components(9);
	vec[8] = new ecs_Components(9);
	vec[5] = new ecs_Components(9);
	vec[6] = new ecs_Components(9);
	vec[4] = new ecs_Components(9);
	vec[0] = new ecs_Components(9);
	vec[1] = new ecs_Components(9);
	vec[3] = new ecs_Components(9);
	vec[7] = new ecs_Components(9);
	var components = new ecs_core_ComponentManager(entities,vec);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var this1 = new Array(0);
	var resources = new ecs_core_ResourceManager(this2,this1);
	var this1 = new Array(8);
	var vec = this1;
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,1);
	bits_Bits.set(cmpBits,0);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[0] = new ecs_Family(0,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,3);
	bits_Bits.set(cmpBits,2);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[1] = new ecs_Family(1,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,0);
	bits_Bits.set(cmpBits,4);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[2] = new ecs_Family(2,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,6);
	bits_Bits.set(cmpBits,5);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[3] = new ecs_Family(3,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,7);
	bits_Bits.set(cmpBits,3);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[4] = new ecs_Family(4,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,0);
	bits_Bits.set(cmpBits,6);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[5] = new ecs_Family(5,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,3);
	bits_Bits.set(cmpBits,0);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[6] = new ecs_Family(6,cmpBits,resBits,1000);
	var capacity = 9;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var cmpBits = this2;
	bits_Bits.set(cmpBits,3);
	bits_Bits.set(cmpBits,8);
	var capacity = 0;
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var _g = this2.length;
		var _g1 = Math.ceil(capacity / 32);
		while(_g < _g1) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	var resBits = this2;
	vec[7] = new ecs_Family(7,cmpBits,resBits,1000);
	var families = new ecs_core_FamilyManager(components,resources,vec);
	var u = new ecs_Universe(entities,components,resources,families,phases);
	var phase = phases[0];
	var s = new commands_Showcase(u);
	phase.systems[0] = s;
	phase.enabledSystems[0] = true;
	var s = new commands_Quote(u);
	phase.systems[1] = s;
	phase.enabledSystems[1] = true;
	var s = new commands_Snippet(u);
	phase.systems[2] = s;
	phase.enabledSystems[2] = true;
	var s = new commands_Run(u);
	phase.systems[3] = s;
	phase.enabledSystems[3] = true;
	var s = new commands_Api(u);
	phase.systems[4] = s;
	phase.enabledSystems[4] = true;
	var s = new commands_TextMention(u);
	phase.systems[5] = s;
	phase.enabledSystems[5] = true;
	var s = new commands_Notify(u);
	phase.systems[6] = s;
	phase.enabledSystems[6] = true;
	var s = new commands_Code(u);
	phase.systems[7] = s;
	phase.enabledSystems[7] = true;
	var s = new commands_CodeLineNumbers(u);
	phase.systems[8] = s;
	phase.enabledSystems[8] = true;
	var s = new commands_React(u);
	phase.systems[9] = s;
	phase.enabledSystems[9] = true;
	var s = new commands_Say(u);
	phase.systems[10] = s;
	phase.enabledSystems[10] = true;
	var phase = phases[1];
	var s = new commands_AutoThread(u);
	phase.systems[0] = s;
	phase.enabledSystems[0] = true;
	s.onEnabled();
	var s = new commands_Snippet(u);
	phase.systems[1] = s;
	phase.enabledSystems[1] = true;
	s.onEnabled();
	var s = new commands_PinMessage(u);
	phase.systems[2] = s;
	phase.enabledSystems[2] = true;
	s.onEnabled();
	var s = new commands_mod_Mention(u);
	phase.systems[3] = s;
	phase.enabledSystems[3] = true;
	s.onEnabled();
	var s = new commands_TextMention(u);
	phase.systems[4] = s;
	phase.enabledSystems[4] = true;
	s.onEnabled();
	var s = new commands_Reminder(u);
	phase.systems[5] = s;
	phase.enabledSystems[5] = true;
	s.onEnabled();
	var s = new commands_mod_Social(u);
	phase.systems[6] = s;
	phase.enabledSystems[6] = true;
	s.onEnabled();
	var s = new commands_AutoRole(u);
	phase.systems[7] = s;
	phase.enabledSystems[7] = true;
	s.onEnabled();
	var s = new commands_Twitter(u);
	phase.systems[8] = s;
	phase.enabledSystems[8] = true;
	s.onEnabled();
	var s = new commands_Quote(u);
	phase.systems[9] = s;
	phase.enabledSystems[9] = true;
	s.onEnabled();
	var s = new commands_ScamPrevention(u);
	phase.systems[10] = s;
	phase.enabledSystems[10] = true;
	s.onEnabled();
	var s = new commands_Api(u);
	phase.systems[11] = s;
	phase.enabledSystems[11] = true;
	s.onEnabled();
	var s = new commands_Haxelib(u);
	phase.systems[12] = s;
	phase.enabledSystems[12] = true;
	s.onEnabled();
	var s = new commands_Trace(u);
	phase.systems[13] = s;
	phase.enabledSystems[13] = true;
	s.onEnabled();
	var s = new commands_React(u);
	phase.systems[14] = s;
	phase.enabledSystems[14] = true;
	s.onEnabled();
	var s = new commands_Notify(u);
	phase.systems[15] = s;
	phase.enabledSystems[15] = true;
	s.onEnabled();
	var s = new commands_Rtfm(u);
	phase.systems[16] = s;
	phase.enabledSystems[16] = true;
	s.onEnabled();
	var s = new commands_Poll(u);
	phase.systems[17] = s;
	phase.enabledSystems[17] = true;
	s.onEnabled();
	var s = new commands_Boop(u);
	phase.systems[18] = s;
	phase.enabledSystems[18] = true;
	s.onEnabled();
	var s = new commands_Archive(u);
	phase.systems[19] = s;
	phase.enabledSystems[19] = true;
	s.onEnabled();
	var s = new commands_Help(u);
	phase.systems[20] = s;
	phase.enabledSystems[20] = true;
	s.onEnabled();
	var s = new commands_Translate(u);
	phase.systems[21] = s;
	phase.enabledSystems[21] = true;
	s.onEnabled();
	var s = new commands_Hi(u);
	phase.systems[22] = s;
	phase.enabledSystems[22] = true;
	s.onEnabled();
	var s = new commands_Run(u);
	phase.systems[23] = s;
	phase.enabledSystems[23] = true;
	s.onEnabled();
	var s = new commands_Roundup(u);
	phase.systems[24] = s;
	phase.enabledSystems[24] = true;
	s.onEnabled();
	var s = new commands_Showcase(u);
	phase.systems[25] = s;
	phase.enabledSystems[25] = true;
	s.onEnabled();
	var s = new commands_CodeLineNumbers(u);
	phase.systems[26] = s;
	phase.enabledSystems[26] = true;
	s.onEnabled();
	var s = new commands_Say(u);
	phase.systems[27] = s;
	phase.enabledSystems[27] = true;
	s.onEnabled();
	var _g = 0;
	var _g1 = u.families.number;
	while(_g < _g1) {
		var idx = _g++;
		u.families.tryActivate(idx);
	}
	Main.universe = u;
	Main.client = new discord_$js_Client({ intents : [1,32768,512,4096,2,1024]});
	Main.client.once("ready",function() {
		var $l=arguments.length;
		var clients = new Array($l>0?$l-0:0);
		for(var $i=0;$i<$l;++$i){clients[$i-0]=arguments[$i];}
		haxe_Log.trace("Ready!",{ fileName : "src/Main.hx", lineNumber : 149, className : "Main", methodName : "start"});
		Main.client = clients[0];
		Main.connected = true;
		var rest = new discord_$js_rest_REST({ version : "9"}).setToken(Main.get_discord().token);
		var res = Main.token(rest);
		res.then(function(foo) {
			Main.commands_active = true;
			var _g = 0;
			while(_g < foo.length) {
				var item = foo[_g];
				++_g;
				haxe_Log.trace("DEBUG - " + item.name + " is REGISTERED",{ fileName : "src/Main.hx", lineNumber : 158, className : "Main", methodName : "start"});
			}
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 165, className : "Main", methodName : "start"});
			$global.console.dir(err);
		});
	});
	Main.client.on("guildMemberAdd",function(member) {
		haxe_Log.trace("member " + member.user.tag,{ fileName : "src/Main.hx", lineNumber : 171, className : "Main", methodName : "start"});
		var _ecsTmpEntity = Main.universe.createEntity();
		Main.universe.components.set(_ecsTmpEntity,0,"add_event_role");
		Main.universe.components.set(_ecsTmpEntity,4,member);
		var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
		var ecsTmpFamily = Main.universe.families.get(0);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(2);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(5);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(6);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
	});
	Main.client.on("messageCreate",function(message) {
		if(message.author.bot) {
			return;
		}
		var channel = message.channel;
		if(channel.type == 1) {
			if(Object.prototype.hasOwnProperty.call(Main.dm_help_tracking.h,message.author.id)) {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"helppls");
				Main.universe.components.set(_ecsTmpEntity,6,message);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(3);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			return;
		}
		var match = message.content.split(" ")[0];
		if(match != null && match.charAt(0) == "!") {
			var _g = 0;
			var _g1 = components_TextCommand.list();
			while(_g < _g1.length) {
				var command = _g1[_g];
				++_g;
				if(match == command) {
					var _ecsTmpEntity = Main.universe.createEntity();
					Main.universe.components.set(_ecsTmpEntity,5,command);
					Main.universe.components.set(_ecsTmpEntity,6,message);
					var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
					var ecsTmpFamily = Main.universe.families.get(3);
					if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
						ecsTmpFamily.add(_ecsTmpEntity);
					}
					var ecsTmpFamily1 = Main.universe.families.get(5);
					if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily1.componentsMask)) {
						ecsTmpFamily1.add(_ecsTmpEntity);
					}
					break;
				}
			}
		}
		if(channel.type == 0) {
			var showcase_channel = "162664383082790912";
			if(channel.id == showcase_channel && !message.system) {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"showcase_message");
				Main.universe.components.set(_ecsTmpEntity,6,message);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(3);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			if(StringTools.startsWith(message.content,"!react")) {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"react");
				Main.universe.components.set(_ecsTmpEntity,6,message);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(3);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
		}
		var check = false;
		check = channel.type == 11 && channel.parentId == "1019922106370232360";
		if(check) {
			if(StringTools.startsWith(message.content,"[showcase]")) {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"showcase");
				Main.universe.components.set(_ecsTmpEntity,6,message);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(3);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
		}
		var _ecsTmpEntity = Main.universe.createEntity();
		Main.universe.components.set(_ecsTmpEntity,0,"scam_prevention");
		Main.universe.components.set(_ecsTmpEntity,6,message);
		var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
		var ecsTmpFamily = Main.universe.families.get(0);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(2);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(5);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(6);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(3);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
	});
	Main.client.on("ChatInputAutoCompleteEvent",function(incoming) {
		haxe_Log.trace("disconnected",{ fileName : "src/Main.hx", lineNumber : 230, className : "Main", methodName : "start"});
		haxe_Log.trace(incoming,{ fileName : "src/Main.hx", lineNumber : 231, className : "Main", methodName : "start"});
	});
	Main.client.on("threadCreate",function(thread) {
		var _ecsTmpEntity = Main.universe.createEntity();
		Main.universe.components.set(_ecsTmpEntity,0,"thread_pin_message");
		Main.universe.components.set(_ecsTmpEntity,1,thread);
		var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
		var ecsTmpFamily = Main.universe.families.get(0);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(2);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(5);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(6);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
	});
	Main.client.on("interactionCreate",function(interaction) {
		if(interaction.isButton()) {
			if(interaction.customId == "showcase_agree") {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"showcase_agree");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			if(interaction.customId == "showcase_disagree") {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"showcase_disagree");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			if(interaction.customId == "snippet_left") {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"snippet_left");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			if(interaction.customId == "snippet_right") {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"snippet_right");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
			return;
		}
		if(interaction.isModalSubmit()) {
			haxe_Log.trace("here",{ fileName : "src/Main.hx", lineNumber : 263, className : "Main", methodName : "start"});
			haxe_Log.trace(interaction.customId,{ fileName : "src/Main.hx", lineNumber : 264, className : "Main", methodName : "start"});
			switch(interaction.customId) {
			case "code_paste":
				haxe_Log.trace("here",{ fileName : "src/Main.hx", lineNumber : 273, className : "Main", methodName : "start"});
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"code_paste");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				break;
			case "quote_edit":
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"quote_edit");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				break;
			case "quote_set":
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,0,"quote_set");
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(0);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(2);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(5);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				break;
			default:
			}
			return;
		}
		if(interaction.isMessageContextMenuCommand()) {
			var type;
			switch(interaction.commandName) {
			case "Line Numbers":
				type = "CodeLineNumbers";
				break;
			case "Pin Message":
				type = "PinMessage";
				break;
			default:
				type = "none";
			}
			if(type != "none") {
				var _ecsTmpEntity = Main.universe.createEntity();
				Main.universe.components.set(_ecsTmpEntity,8,type);
				Main.universe.components.set(_ecsTmpEntity,3,interaction);
				var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
				var ecsTmpFamily = Main.universe.families.get(7);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(1);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(4);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
				var ecsTmpFamily = Main.universe.families.get(6);
				if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
					ecsTmpFamily.add(_ecsTmpEntity);
				}
			}
		}
		if(!interaction.isCommand() && !interaction.isAutocomplete() && !interaction.isChatInputCommand()) {
			return;
		}
		var command = Main.createCommand(interaction);
		var _ecsTmpEntity = Main.universe.createEntity();
		Main.universe.components.set(_ecsTmpEntity,2,command);
		Main.universe.components.set(_ecsTmpEntity,3,interaction);
		var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
		var ecsTmpFamily = Main.universe.families.get(1);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(4);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(6);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
		var ecsTmpFamily = Main.universe.families.get(7);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
	});
	Main.client.login(Main.get_discord().token);
	new haxe_Timer(500).run = function() {
		if(!Main.connected || !Main.commands_active || Main.state == null) {
			return;
		}
		Main.universe.update(1);
	};
};
Main.createCommand = function(interaction) {
	var command = { name : interaction.commandName, content : null};
	if(command.name == "helppls") {
		var time = new Date().getTime();
		Main.dm_help_tracking.h[interaction.user.id] = time;
	}
	var enum_id = command.name.charAt(0).toUpperCase() + command.name.substring(1);
	var _g = 0;
	var _g1 = Main.command_file;
	while(_g < _g1.length) {
		var value = _g1[_g];
		++_g;
		if(value.name != command.name) {
			continue;
		}
		if(value.params == null) {
			var id = "";
			if(value.type == "menu") {
				id = value.id;
			} else {
				id = enum_id;
			}
			command.content = Type.createEnum(components_CommandOptions,id);
		} else {
			var subcommand = null;
			var params = [];
			var _g2 = 0;
			var _g3 = value.params;
			while(_g2 < _g3.length) {
				var param = _g3[_g2];
				++_g2;
				switch(param.type) {
				case "bool":
					params.push(interaction.options.getBoolean(param.name));
					break;
				case "channel":
					params.push(interaction.options.getChannel(param.name));
					break;
				case "mention":
					params.push(interaction.options.getMentionable(param.name));
					break;
				case "number":
					params.push(interaction.options.getNumber(param.name));
					break;
				case "role":
					params.push(interaction.options.getRole(param.name));
					break;
				case "string":
					params.push(interaction.options.getString(param.name));
					break;
				case "subcommand":
					var type = interaction.options.getSubcommand();
					if(param.name != type) {
						continue;
					}
					subcommand = type;
					var _g4 = 0;
					var _g5 = param.params;
					while(_g4 < _g5.length) {
						var subparam = _g5[_g4];
						++_g4;
						Main.parseIncomingCommand(params,subparam,interaction);
					}
					break;
				case "user":
					params.push(interaction.options.getUser(param.name));
					break;
				default:
					throw haxe_Exception.thrown("Something went wrong.");
				}
			}
			if(subcommand != null) {
				enum_id += subcommand.charAt(0).toUpperCase() + subcommand.substring(1);
			}
			command.content = Type.createEnum(components_CommandOptions,enum_id,params);
		}
	}
	return command;
};
Main.parseIncomingCommand = function(args,param,interaction) {
	switch(param.type) {
	case "bool":
		args.push(interaction.options.getBoolean(param.name));
		break;
	case "channel":
		args.push(interaction.options.getChannel(param.name));
		break;
	case "mention":
		args.push(interaction.options.getMentionable(param.name));
		break;
	case "number":
		args.push(interaction.options.getNumber(param.name));
		break;
	case "role":
		args.push(interaction.options.getRole(param.name));
		break;
	case "string":
		args.push(interaction.options.getString(param.name));
		break;
	case "user":
		args.push(interaction.options.getUser(param.name));
		break;
	default:
		throw haxe_Exception.thrown("Something went wrong.");
	}
};
Main.getCommand = function(name) {
	if(Main.registered_commands == null) {
		return null;
	}
	var h = Main.registered_commands.h;
	var command_keys = Object.keys(h);
	var command_length = command_keys.length;
	var command_current = 0;
	while(command_current < command_length) {
		var command = h[command_keys[command_current++]];
		if(name == command.name) {
			return command;
		}
	}
	return null;
};
Main.saveCommand = function(command) {
	Main.registered_commands.h[command.name] = command;
	haxe_Log.trace("registered " + command.name,{ fileName : "src/Main.hx", lineNumber : 429, className : "Main", methodName : "saveCommand"});
};
Main.main = function() {
	try {
		Main.keys = JSON.parse(js_node_Fs.readFileSync("./config/keys.json",{ encoding : "utf8"}));
		Main.command_file = JSON.parse(js_node_Fs.readFileSync("./config/commands.json",{ encoding : "utf8"}));
	} catch( _g ) {
		var e = haxe_Exception.caught(_g);
		haxe_Log.trace(e.get_message(),{ fileName : "src/Main.hx", lineNumber : 440, className : "Main", methodName : "main"});
	}
	if(Main.keys == null || Main.get_discord().token == null) {
		throw haxe_Exception.thrown("Enter your discord auth token.");
	}
	Main.app = firebase_web_app_FirebaseApp.initializeApp(Main.keys.firebase);
	firebase_web_auth_Auth.signInWithEmailAndPassword(firebase_web_auth_Auth.getAuth(),Main.keys.username,Main.keys.password).then(function(res) {
		haxe_Log.trace("logged in",{ fileName : "src/Main.hx", lineNumber : 450, className : "Main", methodName : "main"});
		var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(Main.app),"discord/admin");
		firebase_web_firestore_Firestore.getDoc(doc).then(function(resp) {
			Main.state = resp.data().state;
			Main.auth = res.user;
			Main.logged_in = true;
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 459, className : "Main", methodName : "main"});
			$global.console.dir(err);
		});
	},function(err) {
		haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 463, className : "Main", methodName : "main"});
		$global.console.dir(err);
	});
	Main.start();
};
Main.updateState = function() {
	var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(Main.app),"discord/admin");
	firebase_web_firestore_Firestore.updateDoc(doc,"state",Main.state).then(null,function(err) {
		haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 474, className : "Main", methodName : "updateState"});
		$global.console.dir(err);
	});
};
Main.parseCommands = function() {
	if(Main.command_file == null || Main.command_file.length == 0) {
		throw haxe_Exception.thrown("No commands configured in the config.json file.");
	}
	var commands = [];
	var _g = 0;
	var _g1 = Main.command_file;
	while(_g < _g1.length) {
		var command = _g1[_g];
		++_g;
		if(command.is_public != null && !command.is_public) {
			continue;
		}
		var permission = CommandPermission.fromString(command.permissions);
		if(permission == null) {
			permission = 1024 | 2048;
		}
		if(command.type == "menu") {
			commands.push(discord_$builder_AnySlashCommand.fromContextMenu(new discord_$builder_ContextMenuCommandBuilder().setName(command.name).setType(command.menu_type).setDefaultMemberPermissions(permission)));
			continue;
		}
		var main_command = new discord_$builder_SlashCommandBuilder().setName(command.name).setDescription(command.description).setDefaultMemberPermissions(permission);
		if(command.params != null) {
			var _g2 = 0;
			var _g3 = command.params;
			while(_g2 < _g3.length) {
				var param = _g3[_g2];
				++_g2;
				var autocomplete = false;
				if(param.type == "subcommand") {
					var subcommand = new discord_$builder_SlashCommandSubcommandBuilder().setName(param.name).setDescription(param.description);
					var _g4 = 0;
					var _g5 = param.params;
					while(_g4 < _g5.length) {
						var subparam = _g5[_g4];
						++_g4;
						var autocomplete1 = false;
						if(subparam.autocomplete != null) {
							autocomplete1 = subparam.autocomplete;
						}
						Main.parseCommandType(subparam,autocomplete1,subcommand);
					}
					main_command.addSubcommand(subcommand);
				} else {
					if(param.autocomplete != null) {
						autocomplete = param.autocomplete;
					}
					Main.parseCommandType(param,autocomplete,main_command);
				}
			}
		}
		commands.push(discord_$builder_AnySlashCommand.fromBase(main_command));
	}
	return commands;
};
Main.parseCommandType = function(param,autocomplete,builder) {
	switch(param.type) {
	case "bool":
		builder.addBooleanOption(new discord_$builder_SlashCommandBooleanOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	case "channel":
		builder.addChannelOption(new discord_$builder_SlashCommandChannelOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	case "mention":
		builder.addMentionableOption(new discord_$builder_SlashCommandMentionableOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	case "number":
		builder.addNumberOption(new discord_$builder_SlashCommandNumberOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	case "role":
		builder.addRoleOption(new discord_$builder_SlashCommandRoleOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	case "string":
		var cmd = new discord_$builder_SlashCommandStringOption().setName(param.name).setRequired(param.required).setAutocomplete(autocomplete);
		if(param.description != null) {
			cmd = cmd.setDescription(param.description);
		}
		if(param.choices != null && !autocomplete) {
			var choices = [];
			var _g = 0;
			var _g1 = param.choices;
			while(_g < _g1.length) {
				var option = _g1[_g];
				++_g;
				choices.push({ name : option.name, value : option.value});
			}
			($_=cmd,$_.addChoices.apply($_,choices));
		}
		builder.addStringOption(cmd);
		break;
	case "user":
		builder.addUserOption(new discord_$builder_SlashCommandUserOption().setName(param.name).setDescription(param.description).setRequired(param.required));
		break;
	default:
	}
};
var CommandPermission = {};
CommandPermission.fromString = function(value) {
	switch(value) {
	case "admin":
		return 8;
	case "everyone":
		return 1024 | 2048;
	case "supermod":
		return 4;
	default:
		return 1024 | 2048;
	}
};
Math.__name__ = "Math";
var NodeHtmlParser = require("node-html-parser");
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Safety = function() { };
$hxClasses["Safety"] = Safety;
Safety.__name__ = "Safety";
Safety.or = function(value,defaultValue) {
	if(value == null) {
		return defaultValue;
	} else {
		return value;
	}
};
Safety.orGet = function(value,getter) {
	if(value == null) {
		return getter();
	} else {
		return value;
	}
};
Safety.sure = function(value) {
	if(value == null) {
		throw new safety_NullPointerException("Null pointer in .sure() call");
	} else {
		return value;
	}
};
Safety.unsafe = function(value) {
	return value;
};
Safety.check = function(value,callback) {
	if(value != null) {
		return callback(value);
	} else {
		return false;
	}
};
Safety.let = function(value,callback) {
	if(value == null) {
		return null;
	} else {
		return callback(value);
	}
};
Safety.run = function(value,callback) {
	if(value != null) {
		callback(value);
	}
};
Safety.apply = function(value,callback) {
	if(value != null) {
		callback(value);
	}
	return value;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.is = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.isOfType = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.downcast = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.instance = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCodePoint(c);
	}
	,addSub: function(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var haxe_SysTools = function() { };
$hxClasses["haxe.SysTools"] = haxe_SysTools;
haxe_SysTools.__name__ = "haxe.SysTools";
haxe_SysTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	}
	if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	}
	return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
};
haxe_SysTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
		var result_b = "";
		var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += bs == null ? "null" : "" + bs;
					result_b += bs == null ? "null" : "" + bs;
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument,i);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument;
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.contains = function(s,value) {
	return s.indexOf(value) != -1;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	buf_b = "" + (s == null ? "null" : "" + s);
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.unsafeCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.iterator = function(s) {
	return new haxe_iterators_StringIterator(s);
};
StringTools.keyValueIterator = function(s) {
	return new haxe_iterators_StringKeyValueIterator(s);
};
StringTools.isEof = function(c) {
	return c != c;
};
StringTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	} else {
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
};
StringTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	var argument1 = argument;
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
		var result_b = "";
		var needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument1,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += Std.string(bs);
					result_b += Std.string(bs);
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument1 = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument1,i);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument1;
	}
};
StringTools.utf16CodePointAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(c >= 55296 && c <= 56319) {
		c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
	}
	return c;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.getClass = function(o) {
	return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	return c.__name__;
};
Type.getEnumName = function(e) {
	return e.__ename__;
};
Type.resolveClass = function(name) {
	return $hxClasses[name];
};
Type.resolveEnum = function(name) {
	return $hxEnums[name];
};
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
Type.createEmptyInstance = function(cl) {
	return Object.create(cl.prototype);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var _this = e.__constructs__;
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = _this[i]._hx_name;
	}
	return result;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
Type.enumIndex = function(e) {
	return e._hx_index;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__.slice();
};
function Util_loadFile(filename,pos) {
	var data = null;
	try {
		data = JSON.parse(js_node_Fs.readFileSync("./commands/" + filename + ".json",{ encoding : "utf8"}));
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g);
		haxe_Log.trace(_g1,{ fileName : "src/Util.hx", lineNumber : 15, className : "_Util.Util_Fields_", methodName : "loadFile"});
		haxe_Log.trace("Failed to load file or parse json",{ fileName : "src/Util.hx", lineNumber : 16, className : "_Util.Util_Fields_", methodName : "loadFile", customParams : [pos]});
	}
	return data;
}
function Util_hasRole(role,interaction) {
	var guild = interaction.member.roles.cache.get(role);
	if(interaction.guild.available) {
		var _v_ = guild == null ? null : guild.members;
		if(_v_ == null) {
			return null;
		} else {
			return _v_.has(interaction.user.id);
		}
	} else {
		return false;
	}
}
function Util_withinTime(time,timeout) {
	var now = new Date().getTime();
	return now - time < timeout;
}
function Util_dateWithinTimeout(a,b,timeout) {
	if(a == null || b == null) {
		return false;
	}
	return a.getTime() - b.getTime() < timeout;
}
function Util_fbDateWithinTimeout(a,b,timeout) {
	if(a == null || b == null) {
		return false;
	}
	return a.toDate().getTime() - b.toDate().getTime() < timeout;
}
var bits_Bits = {};
bits_Bits.fromPositions = function(positions) {
	var this1 = [0];
	var this2 = this1;
	var bits = this2;
	var _g = 0;
	while(_g < positions.length) {
		var pos = positions[_g];
		++_g;
		if(pos < 32) {
			bits[0] |= 1 << pos;
		} else {
			var cell = pos / 32 | 0;
			if(bits.length <= cell) {
				var _g1 = bits.length;
				var _g2 = cell + 1;
				while(_g1 < _g2) {
					var i = _g1++;
					bits[i] = 0;
				}
			}
			var bit = pos - cell * 32;
			bits[cell] |= 1 << bit;
		}
	}
	return bits;
};
bits_Bits._new = function(capacity) {
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	var this2 = this1;
	if(capacity > 0) {
		var newLength = Math.ceil(capacity / 32);
		var _g = this2.length;
		while(_g < newLength) {
			var i = _g++;
			this2[i] = 0;
		}
	}
	return this2;
};
bits_Bits.set = function(this1,pos) {
	if(pos < 32) {
		this1[0] |= 1 << pos;
	} else {
		var cell = pos / 32 | 0;
		if(this1.length <= cell) {
			var _g = this1.length;
			var _g1 = cell + 1;
			while(_g < _g1) {
				var i = _g++;
				this1[i] = 0;
			}
		}
		var bit = pos - cell * 32;
		this1[cell] |= 1 << bit;
	}
};
bits_Bits.unset = function(this1,pos) {
	if(pos < 32) {
		this1[0] &= ~(1 << pos);
	} else {
		var cell = pos / 32 | 0;
		if(this1.length <= cell) {
			var _g = this1.length;
			var _g1 = cell + 1;
			while(_g < _g1) {
				var i = _g++;
				this1[i] = 0;
			}
		}
		var bit = pos - cell * 32;
		this1[cell] &= ~(1 << bit);
	}
};
bits_Bits.add = function(this1,bits) {
	var data = bits;
	if(this1.length < data.length) {
		var newLength = data.length;
		var _g = this1.length;
		while(_g < newLength) {
			var i = _g++;
			this1[i] = 0;
		}
	}
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		this1[cell] |= data[cell];
	}
};
bits_Bits.remove = function(this1,bits) {
	var data = bits;
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		if(cell >= this1.length) {
			break;
		}
		this1[cell] &= ~data[cell];
	}
};
bits_Bits.isSet = function(this1,pos) {
	if(pos < 32) {
		return 0 != (this1[0] & 1 << pos);
	} else {
		var cell = pos / 32 | 0;
		var bit = pos - cell * 32;
		if(cell < this1.length) {
			return 0 != (this1[cell] & 1 << bit);
		} else {
			return false;
		}
	}
};
bits_Bits.areSet = function(this1,bits) {
	var data = bits;
	var has = true;
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		if(cell < this1.length) {
			has = data[cell] == (this1[cell] & data[cell]);
		} else {
			has = 0 == data[cell];
		}
		if(!has) {
			break;
		}
	}
	return has;
};
bits_Bits.forEach = function(this1,callback) {
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) {
		var cell = _g++;
		var cellValue = this1[cell];
		if(cellValue != 0) {
			var _g2 = 0;
			while(_g2 < 32) {
				var i = _g2++;
				if(0 != (cellValue & 1 << i)) {
					callback(cell * 32 + i);
				}
			}
		}
	}
};
bits_Bits.copy = function(this1) {
	return this1.slice();
};
bits_Bits.toString = function(this1) {
	var result = "";
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) {
		var cell = _g++;
		var cellValue = this1[cell];
		var _g2 = 0;
		while(_g2 < 32) {
			var i = _g2++;
			result = (0 != (cellValue & 1 << i) ? "1" : "0") + result;
		}
	}
	return HxOverrides.substr(result,result.indexOf("1"),null);
};
bits_Bits.isEmpty = function(this1) {
	var empty = true;
	var _g = 0;
	while(_g < this1.length) {
		var cellValue = this1[_g];
		++_g;
		if(cellValue != 0) {
			empty = false;
			break;
		}
	}
	return empty;
};
bits_Bits.count = function(this1) {
	var result = 0;
	var _g = 0;
	while(_g < this1.length) {
		var v = this1[_g];
		++_g;
		if(v != 0) {
			v -= v >>> 1 & 1431655765;
			v = (v & 858993459) + (v >>> 2 & 858993459);
			result += (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
		}
	}
	return result;
};
bits_Bits.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) {
		var cell = _g++;
		this1[cell] = 0;
	}
};
bits_Bits.merge = function(this1,bits) {
	if(this1.length < bits.length) {
		var result = bits.slice();
		var _g = 0;
		var _g1 = this1.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] |= this1[cell];
		}
		return result;
	} else {
		var result = this1.slice();
		var _g = 0;
		var _g1 = bits.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] |= bits[cell];
		}
		return result;
	}
};
bits_Bits.intersect = function(this1,bits) {
	if(this1.length < bits.length) {
		var result = this1.slice();
		var _g = 0;
		var _g1 = this1.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] &= bits[cell];
		}
		return result;
	} else {
		var result = bits.slice();
		var _g = 0;
		var _g1 = bits.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] &= this1[cell];
		}
		return result;
	}
};
bits_Bits.iterator = function(this1) {
	return new bits_BitsIterator(this1);
};
var bits_BitsIterator = function(data) {
	this.i = 0;
	this.cell = 0;
	this.data = data;
};
$hxClasses["bits.BitsIterator"] = bits_BitsIterator;
bits_BitsIterator.__name__ = "bits.BitsIterator";
bits_BitsIterator.prototype = {
	data: null
	,cell: null
	,i: null
	,hasNext: function() {
		var has = false;
		while(this.cell < this.data.length) {
			var cellValue = this.data[this.cell];
			if(cellValue != 0) {
				while(this.i < 32) {
					if((cellValue & 1 << this.i) != 0) {
						has = true;
						break;
					}
					++this.i;
				}
				if(has) {
					break;
				}
			}
			this.i = 0;
			++this.cell;
		}
		return has;
	}
	,next: function() {
		++this.i;
		return this.cell * 32 + this.i - 1;
	}
	,__class__: bits_BitsIterator
};
var bits_BitsData = {};
bits_BitsData.__properties__ = {get_length:"get_length"};
bits_BitsData._new = function() {
	var this1 = [0];
	return this1;
};
bits_BitsData.resize = function(this1,newLength) {
	var _g = this1.length;
	while(_g < newLength) {
		var i = _g++;
		this1[i] = 0;
	}
};
bits_BitsData.copy = function(this1) {
	return this1.slice();
};
bits_BitsData.countOnes = function(this1) {
	var result = 0;
	var _g = 0;
	while(_g < this1.length) {
		var v = this1[_g];
		++_g;
		if(v != 0) {
			v -= v >>> 1 & 1431655765;
			v = (v & 858993459) + (v >>> 2 & 858993459);
			result += (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
		}
	}
	return result;
};
bits_BitsData.get = function(this1,index) {
	return this1[index];
};
bits_BitsData.set = function(this1,index,value) {
	return this1[index] = value;
};
bits_BitsData.get_length = function(this1) {
	return this1.length;
};
var commands_FieldCache = {};
commands_FieldCache._new = function() {
	var this1 = { size : 0, fields : new haxe_ds_StringMap()};
	return this1;
};
commands_FieldCache.exists = function(this1,pkg,key) {
	var path = pkg + "." + key;
	return Object.prototype.hasOwnProperty.call(this1.fields.h,path);
};
commands_FieldCache.set = function(this1,pkg,value) {
	var path = pkg + "." + value.id;
	if(!Object.prototype.hasOwnProperty.call(this1.fields.h,path)) {
		this1.size++;
	}
	this1.fields.h[path] = value;
};
commands_FieldCache.get = function(this1,pkg,id) {
	var path = pkg + "." + id;
	if(!Object.prototype.hasOwnProperty.call(this1.fields.h,path)) {
		return null;
	}
	return this1.fields.h[path];
};
var ecs_System = function(_universe) {
	this.universe = _universe;
};
$hxClasses["ecs.System"] = ecs_System;
ecs_System.__name__ = "ecs.System";
ecs_System.prototype = {
	universe: null
	,onEnabled: function() {
	}
	,update: function(_dt) {
	}
	,onDisabled: function() {
	}
	,__class__: ecs_System
};
var systems_CommandBase = function(_universe) {
	this.has_subcommands = false;
	ecs_System.call(this,_universe);
	this.commands = this.universe.families.get(1);
	this.table5d38588a6ddd880f90fc8234bccb893f = this.universe.components.getTable(3);
	this.tablefa61f37a15ee60bbc1601eb42174bd3d = this.universe.components.getTable(2);
};
$hxClasses["systems.CommandBase"] = systems_CommandBase;
systems_CommandBase.__name__ = "systems.CommandBase";
systems_CommandBase.__super__ = ecs_System;
systems_CommandBase.prototype = $extend(ecs_System.prototype,{
	has_subcommands: null
	,update: function(_) {
		if(!Main.connected || !Main.commands_active) {
			return;
		}
		var _this = this.commands;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var command = this.tablefa61f37a15ee60bbc1601eb42174bd3d.get(entity);
			if(this.has_subcommands) {
				if(command.name.indexOf(this.get_name(),0) != -1) {
					this.run(command,interaction);
					this.universe.deleteEntity(entity);
				}
			} else if(command.name == this.get_name()) {
				this.run(command,interaction);
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: null
	,get_name: null
	,commands: null
	,table5d38588a6ddd880f90fc8234bccb893f: null
	,tablefa61f37a15ee60bbc1601eb42174bd3d: null
	,__class__: systems_CommandBase
	,__properties__: {get_name:"get_name"}
});
var commands_Api = function(_universe) {
	this.save_frequency = 3600000;
	this.npackages = [];
	this.packages = new haxe_ds_StringMap();
	this.sapi = new haxe_ds_StringMap();
	this.api = new haxe_ds_StringMap();
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Api"] = commands_Api;
commands_Api.__name__ = "commands.Api";
commands_Api.__super__ = systems_CommandBase;
commands_Api.prototype = $extend(systems_CommandBase.prototype,{
	api: null
	,sapi: null
	,packages: null
	,npackages: null
	,cache: null
	,save_time: null
	,save_frequency: null
	,onEnabled: function() {
		var this1 = this.api;
		var value = Util_loadFile("api/haxe",{ fileName : "src/commands/Api.hx", lineNumber : 78, className : "commands.Api", methodName : "onEnabled"});
		this1.h["haxe"] = value;
		var this1 = this.api;
		var value = Util_loadFile("api/flixel",{ fileName : "src/commands/Api.hx", lineNumber : 79, className : "commands.Api", methodName : "onEnabled"});
		this1.h["flixel"] = value;
		var this1 = this.api;
		var value = Util_loadFile("api/heaps",{ fileName : "src/commands/Api.hx", lineNumber : 80, className : "commands.Api", methodName : "onEnabled"});
		this1.h["heaps"] = value;
		var this1 = this.api;
		var value = Util_loadFile("api/ceramic",{ fileName : "src/commands/Api.hx", lineNumber : 81, className : "commands.Api", methodName : "onEnabled"});
		this1.h["ceramic"] = value;
		var this1 = this.api;
		var value = Util_loadFile("api/openfl",{ fileName : "src/commands/Api.hx", lineNumber : 82, className : "commands.Api", methodName : "onEnabled"});
		this1.h["openfl"] = value;
		var this1 = this.api;
		var value = Util_loadFile("api/hxgodot",{ fileName : "src/commands/Api.hx", lineNumber : 83, className : "commands.Api", methodName : "onEnabled"});
		this1.h["godot"] = value;
		this.cache = Util_loadFile("api/cache/0",{ fileName : "src/commands/Api.hx", lineNumber : 84, className : "commands.Api", methodName : "onEnabled"});
		if(this.cache == null) {
			this.cache = commands_FieldCache._new();
		}
		var h = this.api.h;
		var _g_keys = Object.keys(h);
		var _g_length = _g_keys.length;
		var _g_current = 0;
		while(_g_current < _g_length) {
			var key = _g_keys[_g_current++];
			var _g1_value = h[key];
			var arr = [];
			var h1 = _g1_value.h;
			var _g2_keys = Object.keys(h1);
			var _g2_length = _g2_keys.length;
			var _g2_current = 0;
			while(_g2_current < _g2_length) {
				var key1 = _g2_keys[_g2_current++];
				var _g3_value = h1[key1];
				this.packages.h[key1] = key;
				arr.push(_g3_value);
				this.npackages.push({ name : key1, value : _g3_value.path});
			}
			this.sapi.h[key] = arr;
		}
		haxe_Log.trace("loaded",{ fileName : "src/commands/Api.hx", lineNumber : 103, className : "commands.Api", methodName : "onEnabled"});
	}
	,update: function(_) {
		systems_CommandBase.prototype.update.call(this,_);
		var time = new Date().getTime();
		if(time - this.save_time > this.save_frequency) {
			js_node_Fs.writeFileSync("./commands/api/cache/0.json",JSON.stringify(this.cache));
			this.save_time = new Date().getTime();
		}
	}
	,saveCache: function() {
		js_node_Fs.writeFileSync("./commands/api/cache/0.json",JSON.stringify(this.cache));
		this.save_time = new Date().getTime();
	}
	,run: function(command,interaction) {
		if(command.content == null) {
			return;
		}
		var _g = command.content;
		if(_g._hx_index == 22) {
			var _g1 = _g.content;
			var _g2 = _g.field;
			var type = this.packages.h[_g1];
			var cls = null;
			if(Object.prototype.hasOwnProperty.call(this.packages.h,_g1)) {
				cls = this.api.h[type].h[_g1];
			}
			if(interaction.isAutocomplete()) {
				var focused = null;
				var _g = 0;
				var _g3 = interaction.options._hoistedOptions;
				while(_g < _g3.length) {
					var item = _g3[_g];
					++_g;
					if(item.focused) {
						focused = item;
						break;
					}
				}
				switch(focused.name) {
				case "field":
					var ac = [];
					var h = this.cache.fields.h;
					var _g2_keys = Object.keys(h);
					var _g2_length = _g2_keys.length;
					var _g2_current = 0;
					while(_g2_current < _g2_length) {
						var key = _g2_keys[_g2_current++];
						var _g3_value = h[key];
						var path = _g1 + "." + _g2;
						if(key == path) {
							ac.push({ name : _g3_value.id, value : _g3_value.id});
							interaction.respond(ac);
							return;
						}
					}
					try {
						this.getFieldPage(cls,_g2,interaction);
					} catch( _g ) {
						var _g3 = haxe_Exception.caught(_g);
						haxe_Log.trace(_g3,{ fileName : "src/commands/Api.hx", lineNumber : 161, className : "commands.Api", methodName : "run"});
						haxe_Log.trace(cls,{ fileName : "src/commands/Api.hx", lineNumber : 162, className : "commands.Api", methodName : "run"});
						haxe_Log.trace(_g2,{ fileName : "src/commands/Api.hx", lineNumber : 163, className : "commands.Api", methodName : "run"});
						haxe_Log.trace(_g1,{ fileName : "src/commands/Api.hx", lineNumber : 164, className : "commands.Api", methodName : "run"});
					}
					break;
				case "package":
					this.search(_g1,interaction);
					break;
				default:
				}
				return;
			}
			var f = commands_FieldCache.get(this.cache,_g1,_g2);
			var embed = new discord_$js_MessageEmbed();
			var title = "";
			var link = "";
			var cls_desc = "";
			var field_desc = "";
			if(Object.prototype.hasOwnProperty.call(this.packages.h,_g1)) {
				title = cls.path;
				link = cls.link;
				cls_desc = cls.description;
			}
			if(commands_FieldCache.exists(this.cache,_g1,_g2)) {
				title += "#" + f.id;
				link += "#" + f.id;
				field_desc = f.doc;
			}
			var desc = "" + cls_desc;
			if(f != null) {
				desc += "```hx\n" + f.code + "\n```" + f.doc;
			}
			if(cls_desc == "" && field_desc == "") {
				desc = "*No description found*";
			}
			if(title != "") {
				embed.setTitle(title);
			}
			if(link != "") {
				embed.setURL(link);
			}
			if(link == "" && title == "") {
				interaction.reply({ content : "Couldn't find the package"}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Api.hx", lineNumber : 209, className : "commands.Api", methodName : "run"});
				});
				return;
			}
			embed.setDescription(desc);
			interaction.reply({ embeds : [embed]});
			return;
		}
	}
	,getFieldPage: function(cls,find,interaction,ac) {
		var _gthis = this;
		if(cls == null) {
			return;
		}
		var http = new haxe_http_HttpNodeJs(cls.link);
		if(ac == null) {
			ac = [];
		}
		var headers_h = Object.create(null);
		headers_h["static_vars"] = "<h3 class=\"section\">Static variables</h3>";
		headers_h["static_methods"] = "<h3 class=\"section\">Static methods</h3>";
		headers_h["constructor"] = "<h3 class=\"section\">Constructor</h3>";
		headers_h["variables"] = "<h3 class=\"section\">Variables</h3>";
		headers_h["methods"] = "<h3 class=\"section\">Methods</h3>";
		headers_h["last"] = "<footer";
		var header_arr = ["static_vars","static_methods","constructor","variables","methods","last"];
		http.onData = function(res) {
			header_arr.sort(function(a,b) {
				var index_a = res.indexOf(headers_h[a]);
				var index_b = res.indexOf(headers_h[b]);
				if(index_a > index_b) {
					return 1;
				}
				if(index_a < index_b) {
					return -1;
				}
				return 0;
			});
			var a = null;
			var b = null;
			var last = 0;
			var response = [];
			var results = [];
			while(true) {
				var _g1_current = 0;
				var _g1_array = header_arr;
				while(_g1_current < _g1_array.length) {
					var _g2_value = _g1_array[_g1_current];
					var _g2_key = _g1_current++;
					if(a != null && b != null) {
						break;
					}
					if(res.indexOf(headers_h[_g2_value]) != -1) {
						if(a != null && b == null && _g2_key > last) {
							b = _g2_value;
							last = _g2_key;
						}
						if(a == null) {
							a = _g2_value;
						}
					}
				}
				var pos_a = res.indexOf(headers_h[a]) + headers_h[a].length;
				var pos_b = res.indexOf(headers_h[b]);
				var fields = res.substring(pos_a,pos_b);
				var arr;
				switch(a) {
				case "constructor":
					arr = _gthis.searchMethods(find,fields);
					break;
				case "last":
					arr = [];
					break;
				case "methods":
					arr = _gthis.searchMethods(find,fields);
					break;
				case "static_methods":
					arr = _gthis.searchMethods(find,fields);
					break;
				case "static_vars":
					arr = _gthis.searchVars(find,fields);
					break;
				case "variables":
					arr = _gthis.searchVars(find,fields);
					break;
				default:
					arr = [];
				}
				response = response.concat(arr);
				var algo = externs_FuzzySort.go(find,response,{ key : "id", limit : 10, threshold : -10000});
				var _g = 0;
				while(_g < algo.length) {
					var a1 = algo[_g];
					++_g;
					results.push(a1.obj);
				}
				a = b;
				b = null;
				if(a == "last") {
					break;
				}
			}
			var _g = 0;
			while(_g < results.length) {
				var r = results[_g];
				++_g;
				commands_FieldCache.set(_gthis.cache,cls.path,r);
				var name = "var " + r.id;
				if(r.code.indexOf("(") != -1) {
					name = "fun " + r.id;
				}
				ac.push({ name : name, value : r.id});
			}
			ac.sort(function(a,b) {
				return a.name.length - b.name.length;
			});
			js_node_Fs.writeFileSync("./commands/api/cache/0.json",JSON.stringify(_gthis.cache));
			_gthis.save_time = new Date().getTime();
			if(ac.length > 24) {
				ac = ac.slice(0,24);
			}
			interaction.respond(ac);
		};
		http.request();
	}
	,searchVars: function(find,fields) {
		var parse = NodeHtmlParser.parse(fields);
		var arr = [];
		var _g = 0;
		var _g1 = parse.querySelectorAll(".field");
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var labels = [];
			var identifier = "";
			var type = "";
			var doc = "";
			var value = "";
			var _g2 = 0;
			var _g3 = f.querySelectorAll("span");
			while(_g2 < _g3.length) {
				var m = _g3[_g2];
				++_g2;
				if(m.classNames.indexOf("label") != -1 && m.text.indexOf("@:") == -1) {
					labels.push(m.text);
				}
				if(m.classNames.indexOf("identifier") != -1) {
					identifier = m.text;
				}
			}
			value = f.querySelector("code").text.split("=")[2];
			var split = f.querySelector("code").text.split(":");
			if(split.length == 2) {
				type = split[1];
			}
			if(split.length == 3) {
				type = split[2];
			}
			var _g4 = 0;
			var _g5 = f.querySelectorAll("p");
			while(_g4 < _g5.length) {
				var p = _g5[_g4];
				++_g4;
				if(p.classNames.indexOf("javadoc") != -1) {
					break;
				}
				var line = StringTools.replace(StringTools.replace(p.text,"\n",""),"\t","");
				if(line.length == 0) {
					continue;
				}
				doc += "" + line + " ";
			}
			var result = "";
			var _g6 = 0;
			while(_g6 < labels.length) {
				var l = labels[_g6];
				++_g6;
				result += "" + l + " ";
			}
			result += "" + identifier + ":" + type;
			if(value != null) {
				result += " = " + value;
			}
			arr.push({ id : identifier, code : result, doc : doc});
		}
		return arr;
	}
	,searchMethods: function(find,fields) {
		var parse = NodeHtmlParser.parse(fields);
		var arr = [];
		var _g = 0;
		var _g1 = parse.querySelectorAll(".field");
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var labels = [];
			var identifier = "";
			var parameters = "";
			var doc = "";
			var _g2 = 0;
			var _g3 = f.querySelectorAll("span");
			while(_g2 < _g3.length) {
				var m = _g3[_g2];
				++_g2;
				if(m.classNames.indexOf("label") != -1 && m.text.indexOf("@:") == -1) {
					labels.push(StringTools.trim(m.text));
				}
				if(m.classNames.indexOf("identifier") != -1) {
					identifier = StringTools.trim(m.text);
				}
			}
			parameters = StringTools.trim(f.querySelector("code").text.split(identifier)[1]);
			f.querySelector("code");
			var _g4 = 0;
			var _g5 = f.querySelectorAll("p");
			while(_g4 < _g5.length) {
				var p = _g5[_g4];
				++_g4;
				if(p.classNames.indexOf("javadoc") != -1) {
					break;
				}
				var line = StringTools.trim(StringTools.replace(StringTools.replace(p.text,"\n",""),"\t",""));
				if(line.length == 0) {
					continue;
				}
				doc += "" + line + " ";
			}
			var result = "";
			var _g6 = 0;
			while(_g6 < labels.length) {
				var l = labels[_g6];
				++_g6;
				result += "" + l + " ";
			}
			result += "" + identifier + parameters;
			arr.push({ id : identifier, code : result, doc : doc});
		}
		return arr;
	}
	,search: function(string,interaction) {
		var results = [];
		var narrow = [];
		var keywords_h = Object.create(null);
		keywords_h["flixel"] = ["flx","flixel"];
		keywords_h["heaps"] = ["h2d","hxd","hxsl","h3d"];
		keywords_h["ceramic"] = ["ceramic","clay","spine"];
		keywords_h["openfl"] = ["openfl"];
		keywords_h["haxe"] = ["haxe"];
		keywords_h["godot"] = ["godot"];
		var h = keywords_h;
		var _g1_h = h;
		var _g1_keys = Object.keys(h);
		var _g1_length = _g1_keys.length;
		var _g1_current = 0;
		while(_g1_current < _g1_length) {
			var key = _g1_keys[_g1_current++];
			var _g2_key = key;
			var _g2_value = _g1_h[key];
			var k = _g2_key;
			var v = _g2_value;
			var _g = 0;
			while(_g < v.length) {
				var i = v[_g];
				++_g;
				if(string.indexOf(i) != -1) {
					narrow = this.sapi.h[k];
					break;
				}
			}
		}
		if(narrow.length == 0) {
			var algo = externs_FuzzySort.go(string,this.npackages,{ key : "name", limit : 10, threshold : -10000});
			var _g = 0;
			while(_g < algo.length) {
				var a = algo[_g];
				++_g;
				results.push(a.obj);
			}
		} else {
			var algo = externs_FuzzySort.go(string,narrow,{ key : "path", limit : 10, threshold : -10000});
			var _g = 0;
			while(_g < algo.length) {
				var a = algo[_g];
				++_g;
				results.push({ name : a.obj.path, value : a.obj.path});
			}
		}
		interaction.respond(results).then(null,function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/Api.hx", lineNumber : 501, className : "commands.Api", methodName : "search"});
			$global.console.dir(err);
		});
	}
	,get_name: function() {
		return "api";
	}
	,__class__: commands_Api
});
var commands_Archive = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Archive"] = commands_Archive;
commands_Archive.__name__ = "commands.Archive";
commands_Archive.__super__ = systems_CommandBase;
commands_Archive.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		if(command.content._hx_index == 1) {
			var role = "1019915584546291712";
			interaction.member.fetch(true).then(function(member) {
				var found = false;
				var jsIterator = member.roles.cache.entries();
				var _g_jsIterator = jsIterator;
				var _g_lastStep = jsIterator.next();
				while(!_g_lastStep.done) {
					var v = _g_lastStep.value;
					_g_lastStep = _g_jsIterator.next();
					var key = v[0];
					if(key == role) {
						found = true;
						break;
					}
				}
				if(found) {
					interaction.member.roles.remove(role).then(function(success) {
						interaction.reply("Archives are hidden");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Archive.hx", lineNumber : 28, className : "commands.Archive", methodName : "run"});
						$global.console.dir(err);
					});
				} else {
					interaction.member.roles.add(role).then(function(success) {
						interaction.reply("Archives are shown");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Archive.hx", lineNumber : 35, className : "commands.Archive", methodName : "run"});
						$global.console.dir(err);
					});
				}
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Archive.hx", lineNumber : 40, className : "commands.Archive", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,get_name: function() {
		return "archive";
	}
	,__class__: commands_Archive
});
var commands_AutoRole = function(_universe) {
	this.event_role_id = "1054432874473996408";
	this.news_role_id = "761714325227700225";
	systems_CommandBase.call(this,_universe);
	this.users = this.universe.families.get(2);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
	this.tablec254489e95ef23a8f91062a1947780b9 = this.universe.components.getTable(4);
};
$hxClasses["commands.AutoRole"] = commands_AutoRole;
commands_AutoRole.__name__ = "commands.AutoRole";
commands_AutoRole.__super__ = systems_CommandBase;
commands_AutoRole.prototype = $extend(systems_CommandBase.prototype,{
	news_role_id: null
	,event_role_id: null
	,update: function(_) {
		systems_CommandBase.prototype.update.call(this,_);
		var _this = this.users;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var command = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			var member = this.tablec254489e95ef23a8f91062a1947780b9.get(entity);
			if(command == "add_event_role") {
				member.roles.add(this.event_role_id).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/AutoRole.hx", lineNumber : 21, className : "commands.AutoRole", methodName : "update"});
					$global.console.dir(err);
				});
				member.roles.add(this.news_role_id).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/AutoRole.hx", lineNumber : 25, className : "commands.AutoRole", methodName : "update"});
					$global.console.dir(err);
				});
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: function(command,interaction) {
	}
	,get_name: function() {
		return "autorole";
	}
	,users: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,tablec254489e95ef23a8f91062a1947780b9: null
	,__class__: commands_AutoRole
});
var commands_AutoThread = function(_universe) {
	this.news_feed = "1030188275341729882";
	this.checking = false;
	this.announcement_channel = "286485321925918721";
	this.event_role_id = "1054432874473996408";
	this.news_role_id = "761714325227700225";
	systems_CommandBase.call(this,_universe);
	this.users = this.universe.families.get(2);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
	this.tablec254489e95ef23a8f91062a1947780b9 = this.universe.components.getTable(4);
};
$hxClasses["commands.AutoThread"] = commands_AutoThread;
commands_AutoThread.__name__ = "commands.AutoThread";
commands_AutoThread.__super__ = systems_CommandBase;
commands_AutoThread.prototype = $extend(systems_CommandBase.prototype,{
	news_role_id: null
	,event_role_id: null
	,announcement_channel: null
	,announcement: null
	,checking: null
	,news_feed: null
	,news_feed_channel: null
	,update: function(_) {
		var _gthis = this;
		systems_CommandBase.prototype.update.call(this,_);
		if(this.announcement == null && !this.checking) {
			this.checking = true;
			Main.client.channels.fetch(this.announcement_channel).then(function(channel) {
				_gthis.announcement = channel;
				_gthis.checking = false;
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/AutoThread.hx", lineNumber : 29, className : "commands.AutoThread", methodName : "update"});
				$global.console.dir(err);
			});
		}
		if(this.announcement != null && !this.checking) {
			this.checking = true;
			this.announcement.threads.fetch(this.news_feed).then(function(succ) {
				_gthis.news_feed_channel = succ;
				_gthis.checking = false;
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/AutoThread.hx", lineNumber : 39, className : "commands.AutoThread", methodName : "update"});
			});
		}
		if(this.announcement == null && this.news_feed == null) {
			return;
		}
		var _this = this.users;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var command = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			var member = this.tablec254489e95ef23a8f91062a1947780b9.get(entity);
			if(command == "auto_thread") {
				this.news_feed_channel.members.add(member.id).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/AutoThread.hx", lineNumber : 49, className : "commands.AutoThread", methodName : "update"});
				});
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: function(command,interaction) {
	}
	,get_name: function() {
		return "autothread";
	}
	,users: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,tablec254489e95ef23a8f91062a1947780b9: null
	,__class__: commands_AutoThread
});
var commands_Boop = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Boop"] = commands_Boop;
commands_Boop.__name__ = "commands.Boop";
commands_Boop.__super__ = systems_CommandBase;
commands_Boop.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 16) {
			interaction.reply("*boop* <@" + _g.user.id + ">");
		}
	}
	,get_name: function() {
		return "boop";
	}
	,__class__: commands_Boop
});
var commands_Code = function(_universe) {
	systems_CommandBase.call(this,_universe);
	this.something_else = this.universe.families.get(6);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
};
$hxClasses["commands.Code"] = commands_Code;
commands_Code.__name__ = "commands.Code";
commands_Code.__super__ = systems_CommandBase;
commands_Code.prototype = $extend(systems_CommandBase.prototype,{
	update: function(_) {
		systems_CommandBase.prototype.update.call(this,_);
		var _this = this.something_else;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var forward = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			haxe_Log.trace("here",{ fileName : "src/commands/Code.hx", lineNumber : 18, className : "commands.Code", methodName : "update"});
			haxe_Log.trace(forward,{ fileName : "src/commands/Code.hx", lineNumber : 19, className : "commands.Code", methodName : "update"});
			if(forward == "code_paste") {
				var start = Std.parseInt(interaction.fields.getTextInputValue("start"));
				var problem = interaction.fields.getTextInputValue("problem");
				var code = this.cleanSpace(interaction.fields.getTextInputValue("code"));
				if(start == null) {
					start = 1;
				}
				var embed = new discord_$js_MessageEmbed();
				var new_code = "";
				var _this = code.split("\n");
				var _g_current = 0;
				while(_g_current < _this.length) {
					var _g1_value = _this[_g_current];
					var _g1_key = _g_current++;
					new_code += "" + (start + _g1_key) + ": " + _g1_value + "\n";
				}
				var content = "**__Code__**\n```hx\n" + new_code + "\n```\n**__Problem__**\n" + problem;
				embed.setDescription(content);
				interaction.reply({ embeds : [embed]}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Code.hx", lineNumber : 39, className : "commands.Code", methodName : "update"});
				});
				this.universe.deleteEntity(entity);
			}
		}
	}
	,cleanSpace: function(code) {
		var shallowest = 500;
		var largest = 0;
		code = StringTools.replace(code,"`","\\`");
		var _g = 0;
		var _g1 = code.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			var depth = 0;
			var _g2 = 0;
			var _g3 = line.length;
			while(_g2 < _g3) {
				var i = _g2++;
				var char = line.charAt(i);
				if(char == " " || char == "\t") {
					continue;
				}
				depth = i;
				break;
			}
			if(depth < shallowest && depth != 0) {
				shallowest = depth;
			}
			if(depth > largest) {
				largest = depth;
			}
		}
		var new_code = "";
		var _g = 0;
		var _g1 = code.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			new_code += line.substring(shallowest) + "\n";
		}
		return new_code;
	}
	,run: function(command,interaction) {
		var modal = new discord_$builder_ModalBuilder().setCustomId("code_paste").setTitle("Code paste");
		var problem = new discord_$builder_APITextInputComponent().setCustomId("problem").setLabel("Problem description").setStyle(2).setRequired(true).setPlaceholder("Describe your issue and post any error messages here");
		var from = new discord_$builder_APITextInputComponent().setCustomId("start").setLabel("First line number").setStyle(1).setMinLength(1).setMaxLength(5).setPlaceholder("The starting line number of the code you are pasting");
		var code = new discord_$builder_APITextInputComponent().setCustomId("code").setLabel("Code").setStyle(2).setMinLength(10).setMaxLength(2000);
		var action_a = new discord_$builder_APIActionRowComponent().addComponents(from);
		var action_c = new discord_$builder_APIActionRowComponent().addComponents(code);
		var action_d = new discord_$builder_APIActionRowComponent().addComponents(problem);
		modal.addComponents(action_a,action_c,action_d);
		interaction.showModal(modal);
	}
	,get_name: function() {
		return "code";
	}
	,something_else: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,__class__: commands_Code
});
var commands_CodeLineNumbers = function(_universe) {
	systems_CommandBase.call(this,_universe);
	this.options = this.universe.families.get(7);
	this.tablef1c30c373f6abc39648a24020b4b82b2 = this.universe.components.getTable(8);
};
$hxClasses["commands.CodeLineNumbers"] = commands_CodeLineNumbers;
commands_CodeLineNumbers.__name__ = "commands.CodeLineNumbers";
commands_CodeLineNumbers.__super__ = systems_CommandBase;
commands_CodeLineNumbers.prototype = $extend(systems_CommandBase.prototype,{
	update: function(_) {
		var _this = this.options;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var route = this.tablef1c30c373f6abc39648a24020b4b82b2.get(entity);
			if(route == "CodeLineNumbers") {
				var message = [interaction.targetMessage];
				if(message[0].author.id != interaction.member.id) {
					interaction.reply({ content : "Hey, that isn't your message! :angry:", ephemeral : true}).then(null,(function() {
						return function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/CodeLineNumbers.hx", lineNumber : 20, className : "commands.CodeLineNumbers", methodName : "update"});
						};
					})());
				}
				if(message[0] != null && message[0].content.length > 0) {
					var replace = this.parseString(message[0].content);
					if(replace != null) {
						interaction.reply({ content : replace}).then((function(message) {
							return function(_) {
								message[0].delete().then(null,(function() {
									return function(err) {
										haxe_Log.trace(err,{ fileName : "src/commands/CodeLineNumbers.hx", lineNumber : 26, className : "commands.CodeLineNumbers", methodName : "update"});
									};
								})());
							};
						})(message),(function() {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/CodeLineNumbers.hx", lineNumber : 27, className : "commands.CodeLineNumbers", methodName : "update"});
							};
						})());
					} else {
						interaction.reply({ content : "No compatible code blocks were found. Only standard block or hx/haxe are supported.", ephemeral : true}).then(null,(function() {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/CodeLineNumbers.hx", lineNumber : 33, className : "commands.CodeLineNumbers", methodName : "update"});
							};
						})());
					}
				}
				this.universe.deleteEntity(entity);
			}
		}
	}
	,parseString: function(content) {
		var matched = [];
		var index = 0;
		var start = -1;
		var blocks = ["```hx\n","```haxe\n","```\n"];
		var selected = null;
		var _g = 0;
		while(_g < blocks.length) {
			var opt = blocks[_g];
			++_g;
			if(content.indexOf(opt) != -1) {
				selected = opt;
				break;
			}
		}
		if(selected == null) {
			haxe_Log.trace("no compatible code block",{ fileName : "src/commands/CodeLineNumbers.hx", lineNumber : 57, className : "commands.CodeLineNumbers", methodName : "parseString"});
			return null;
		}
		while(index != -1) {
			var pos = start;
			if(pos > -1) {
				pos += selected.length;
			} else {
				pos = 0;
			}
			index = content.indexOf(selected,pos);
			start = index;
			if(index == -1) {
				break;
			}
			var cursor = start - 1;
			while(true) {
				var char = content.charAt(cursor);
				if(char == "\n") {
					break;
				}
				++cursor;
			}
			matched.push({ start : start, end : start + selected.length});
			if(selected != "```\n") {
				var end_tag = content.indexOf("```",index + selected.length);
				matched.push({ start : end_tag, end : end_tag + selected.length});
			}
		}
		var replace = content;
		var _g1_current = 0;
		while(_g1_current < matched.length) {
			var _g2_value = matched[_g1_current];
			var _g2_key = _g1_current++;
			if(_g2_key % 2 == 0) {
				continue;
			}
			var last = matched[_g2_key - 1];
			var ogcode = content.substring(last.end,_g2_value.start);
			var lines = this.addLineNumbers(ogcode);
			replace = StringTools.replace(replace,ogcode,lines);
		}
		return replace;
	}
	,addLineNumbers: function(code) {
		var new_code = "\n";
		code = StringTools.rtrim(code);
		var split = code.split("\n");
		var _g_current = 0;
		while(_g_current < split.length) {
			var _g1_value = split[_g_current];
			var _g1_key = _g_current++;
			var new_line = false;
			if(_g1_key + 1 < split.length) {
				new_line = true;
			}
			new_code += "" + (_g1_key + 1) + ": " + _g1_value;
			if(new_line) {
				new_code += "\n";
			}
		}
		return new_code;
	}
	,cleanSpace: function(code) {
		var shallowest = 500;
		var largest = 0;
		code = StringTools.replace(code,"`","\\`");
		var _g = 0;
		var _g1 = code.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			var depth = 0;
			var _g2 = 0;
			var _g3 = line.length;
			while(_g2 < _g3) {
				var i = _g2++;
				var char = line.charAt(i);
				if(char == " " || char == "\t") {
					continue;
				}
				depth = i;
				break;
			}
			if(depth < shallowest && depth != 0) {
				shallowest = depth;
			}
			if(depth > largest) {
				largest = depth;
			}
		}
		var new_code = "";
		var _g = 0;
		var _g1 = code.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			new_code += line.substring(shallowest) + "\n";
		}
		return new_code;
	}
	,run: function(command,interaction) {
	}
	,get_name: function() {
		return "codelinenumbers";
	}
	,options: null
	,tablef1c30c373f6abc39648a24020b4b82b2: null
	,__class__: commands_CodeLineNumbers
});
var commands_Haxelib = function(_universe) {
	this.message_history = new haxe_ds_StringMap();
	this.super_mod_id = "198916468312637440";
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Haxelib"] = commands_Haxelib;
commands_Haxelib.__name__ = "commands.Haxelib";
commands_Haxelib.__super__ = systems_CommandBase;
commands_Haxelib.prototype = $extend(systems_CommandBase.prototype,{
	last_interaction: null
	,super_mod_id: null
	,message_history: null
	,run: function(command,interaction) {
		var h = this.message_history.h;
		var _g_h = h;
		var _g_keys = Object.keys(h);
		var _g_length = _g_keys.length;
		var _g_current = 0;
		while(_g_current < _g_length) {
			var key = _g_keys[_g_current++];
			var _g1_key = key;
			var _g1_value = _g_h[key];
			var key1 = _g1_key;
			var data = _g1_value;
			var time = new Date().getTime();
			if(time - data.timestamp > 5000) {
				var _this = this.message_history;
				if(Object.prototype.hasOwnProperty.call(_this.h,key1)) {
					delete(_this.h[key1]);
				}
			}
		}
		var role_status = Util_hasRole(this.super_mod_id,interaction);
		var _g = command.content;
		if(_g._hx_index == 25) {
			var command = _g.command;
			var route = command;
			if(route.indexOf(" ") != -1) {
				route = route.split(" ")[0];
			}
			if(route != "list" && route != "info" && route != "search") {
				if(!role_status) {
					interaction.reply("Invalid Permissions.").then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Haxelib.hx", lineNumber : 41, className : "commands.Haxelib", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
			}
			var channel = interaction.channel;
			var commands = [];
			var _g = 0;
			var _g1 = command.split(" ");
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				commands.push(c);
			}
			var $process = "./haxe/haxelib";
			if(!sys_FileSystem.exists($process)) {
				$process = "haxelib";
			}
			var ls = js_node_ChildProcess.spawn($process,commands);
			var output = "";
			ls.stdout.on("data",function(data) {
				if(data.indexOf("KB") != -1 || data.indexOf("%") != -1) {
					return;
				}
				output += data;
			});
			ls.stdout.once("close",function(data) {
				var embed = new discord_$js_MessageEmbed().setTitle("Haxelib");
				if(output.length > 4000) {
					output = HxOverrides.substr(output,0,4000) + "...";
				}
				embed.setDescription(output);
				return interaction.reply({ embeds : [embed]}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Haxelib.hx", lineNumber : 75, className : "commands.Haxelib", methodName : "run"});
					$global.console.dir(err);
				});
			});
			ls.stderr.on("data",function(data) {
				var embed = new discord_$js_MessageEmbed();
				embed.type = "article";
				embed.setDescription("Error \n + " + "error");
				return channel.send(embed);
			});
		}
	}
	,addHistory: function(command,embed) {
		if(Object.prototype.hasOwnProperty.call(this.message_history.h,command)) {
			return false;
		}
		this.message_history.h[command] = embed;
		return true;
	}
	,get_name: function() {
		return "haxelib";
	}
	,__class__: commands_Haxelib
});
var commands_Help = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Help"] = commands_Help;
commands_Help.__name__ = "commands.Help";
commands_Help.__super__ = systems_CommandBase;
commands_Help.prototype = $extend(systems_CommandBase.prototype,{
	data: null
	,onEnabled: function() {
		this.data = Util_loadFile("help",{ fileName : "src/commands/Help.hx", lineNumber : 12, className : "commands.Help", methodName : "onEnabled"});
	}
	,run: function(command,interaction) {
		if(this.data == null || this.data.length == 0) {
			haxe_Log.trace("no help content configured",{ fileName : "src/commands/Help.hx", lineNumber : 17, className : "commands.Help", methodName : "run"});
			return;
		}
		if(Object.prototype.hasOwnProperty.call(Main.dm_help_tracking.h,interaction.user.id)) {
			var _g = 0;
			var _g1 = this.data;
			while(_g < _g1.length) {
				var content = _g1[_g];
				++_g;
				if(content.type != "helppls_dm") {
					continue;
				}
				interaction.reply({ content : content.content.toString()}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Help.hx", lineNumber : 27, className : "commands.Help", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			}
			return;
		}
		var _g = command.content;
		if(_g._hx_index == 24) {
			var category = _g.category;
			var msg = "";
			var _g_current = 0;
			var _g_array = this.data;
			while(_g_current < _g_array.length) {
				var _g1_value = _g_array[_g_current];
				var _g1_key = _g_current++;
				var key = _g1_key;
				var item = _g1_value;
				if(category == null) {
					if(!item.show_help) {
						continue;
					}
					if(item.type == "run") {
						msg += "- `!" + item.type + "`: " + item.content.toString();
					} else {
						msg += "- `/" + item.type + "`: " + item.content.toString();
					}
					if(key != this.data.length - 1) {
						msg += "\n";
					}
				} else if(item.type == category) {
					msg = "/`" + item.type + "`: " + item.content.toString();
					break;
				}
			}
			if(msg.length == 0 || msg == "" || msg == null) {
				msg = "Nothing found, sorry :(";
			}
			interaction.reply(msg).then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Help.hx", lineNumber : 64, className : "commands.Help", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,get_name: function() {
		return "help";
	}
	,__class__: commands_Help
});
var commands_HelpType = {};
commands_HelpType.fromString = function(value) {
	switch(value.toLowerCase()) {
	case "helppls_dm":
		return "helppls_dm";
	case "notify":
		return "notify";
	case "rtfm":
		return "rtfm";
	case "run":
		return "run";
	default:
		return "Invalid help option.";
	}
};
var commands_Hi = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Hi"] = commands_Hi;
commands_Hi.__name__ = "commands.Hi";
commands_Hi.__super__ = systems_CommandBase;
commands_Hi.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var message = "Hey there";
		if(Math.random() < 0.35) {
			switch(interaction.user.id) {
			case "215582414544699393":
				message = "Hello Bulby! ReAD ArCH NeWS! :face_with_hand_over_mouth:";
				break;
			case "231872730478280705":
				message = "Hey logo, how jammy are you feeling today? :jam:";
				break;
			case "415825875146375168":
				message = "Hey semmi, got any cool music tonight? \\o/";
				break;
			case "613797359822045194":
				message = "Hey Furret, gained any patience yet?";
				break;
			case "726161533540761662":
				message = "Hi muffin, having a good day? :)";
				break;
			case "781745960829059072":
				message = "Hi FS, don't make me go sleep :(";
				break;
			case "817154767733653524":
				message = "Hello " + interaction.user.tag + ", always a pleasure :)";
				break;
			default:
				message = "Hey you, what's up?";
			}
		}
		interaction.reply({ content : message}).then(null,function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/Hi.hx", lineNumber : 24, className : "commands.Hi", methodName : "run"});
			$global.console.dir(err);
		});
	}
	,get_name: function() {
		return "hi";
	}
	,__class__: commands_Hi
});
var commands_Notify = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Notify"] = commands_Notify;
commands_Notify.__name__ = "commands.Notify";
commands_Notify.__super__ = systems_CommandBase;
commands_Notify.prototype = $extend(systems_CommandBase.prototype,{
	getRole: function(channel) {
		switch(channel) {
		case "announcements":
			return "761714325227700225";
		case "ceramic":
			return "914171888748609546";
		case "dvorak":
			return "903006951896666153";
		case "events":
			return "1054432874473996408";
		case "flixel":
			return "761714697468248125";
		case "godot":
			return "1059447670344794142";
		case "haxeui":
			return "761714853403820052";
		case "heaps":
			return "761714775902126080";
		case "jam":
			return "1058843687687295066";
		case "kha":
			return "761714809179209818";
		default:
			return "err";
		}
	}
	,run: function(command,interaction) {
		var _gthis = this;
		var _g = command.content;
		if(_g._hx_index == 23) {
			var channel = _g.channel;
			var role = this.getRole(channel);
			if(role == "err") {
				haxe_Log.trace(channel,{ fileName : "src/commands/Notify.hx", lineNumber : 38, className : "commands.Notify", methodName : "run"});
				haxe_Log.trace(interaction.command,{ fileName : "src/commands/Notify.hx", lineNumber : 39, className : "commands.Notify", methodName : "run"});
				interaction.reply("Invalid channel");
				return;
			}
			interaction.member.fetch(true).then(function(member) {
				var found = false;
				var jsIterator = member.roles.cache.entries();
				var _g_jsIterator = jsIterator;
				var _g_lastStep = jsIterator.next();
				while(!_g_lastStep.done) {
					var v = _g_lastStep.value;
					_g_lastStep = _g_jsIterator.next();
					var key = v[0];
					if(key == role) {
						found = true;
						break;
					}
				}
				if(found) {
					interaction.member.roles.remove(role).then(function(success) {
						interaction.reply("Unsubscribed to " + channel + " updates");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Notify.hx", lineNumber : 57, className : "commands.Notify", methodName : "run"});
						$global.console.dir(err);
					});
				} else {
					interaction.member.roles.add(role).then(function(success) {
						if(channel == "announcements") {
							var _ecsTmpEntity = _gthis.universe.createEntity();
							_gthis.universe.components.set(_ecsTmpEntity,0,"auto_thread");
							_gthis.universe.components.set(_ecsTmpEntity,4,member);
							var ecsEntCompFlags = _gthis.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
							var ecsTmpFamily = _gthis.universe.families.get(0);
							if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
								ecsTmpFamily.add(_ecsTmpEntity);
							}
							var ecsTmpFamily = _gthis.universe.families.get(2);
							if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
								ecsTmpFamily.add(_ecsTmpEntity);
							}
							var ecsTmpFamily = _gthis.universe.families.get(5);
							if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
								ecsTmpFamily.add(_ecsTmpEntity);
							}
							var ecsTmpFamily = _gthis.universe.families.get(6);
							if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
								ecsTmpFamily.add(_ecsTmpEntity);
							}
						}
						interaction.reply("Subscribed to " + channel + " updates");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Notify.hx", lineNumber : 70, className : "commands.Notify", methodName : "run"});
						$global.console.dir(err);
					});
				}
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Notify.hx", lineNumber : 75, className : "commands.Notify", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,get_name: function() {
		return "notify";
	}
	,__class__: commands_Notify
});
var systems_CommandDbBase = function(_universe) {
	this.has_subcommands = false;
	ecs_System.call(this,_universe);
	this.commands = this.universe.families.get(1);
	this.table5d38588a6ddd880f90fc8234bccb893f = this.universe.components.getTable(3);
	this.tablefa61f37a15ee60bbc1601eb42174bd3d = this.universe.components.getTable(2);
};
$hxClasses["systems.CommandDbBase"] = systems_CommandDbBase;
systems_CommandDbBase.__name__ = "systems.CommandDbBase";
systems_CommandDbBase.__super__ = ecs_System;
systems_CommandDbBase.prototype = $extend(ecs_System.prototype,{
	has_subcommands: null
	,update: function(_) {
		if(!Main.connected || !Main.commands_active) {
			return;
		}
		var _this = this.commands;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var command = this.tablefa61f37a15ee60bbc1601eb42174bd3d.get(entity);
			if(this.has_subcommands) {
				if(command.name.indexOf(this.get_name(),0) != -1) {
					this.run(command,interaction);
					this.universe.deleteEntity(entity);
				}
			} else if(command.name == this.get_name()) {
				this.run(command,interaction);
				this.universe.deleteEntity(entity);
			}
		}
	}
	,addDoc: function(path,data,success,failure) {
		firebase_web_firestore_Firestore.addDoc(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),path),data).then(success,failure);
	}
	,get_db: function() {
		return firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp());
	}
	,run: null
	,get_name: null
	,commands: null
	,table5d38588a6ddd880f90fc8234bccb893f: null
	,tablefa61f37a15ee60bbc1601eb42174bd3d: null
	,__class__: systems_CommandDbBase
	,__properties__: {get_name:"get_name",get_db:"get_db"}
});
var commands_PinMessage = function(_universe) {
	systems_CommandDbBase.call(this,_universe);
	this.options = this.universe.families.get(7);
	this.tablef1c30c373f6abc39648a24020b4b82b2 = this.universe.components.getTable(8);
};
$hxClasses["commands.PinMessage"] = commands_PinMessage;
commands_PinMessage.__name__ = "commands.PinMessage";
commands_PinMessage.__super__ = systems_CommandDbBase;
commands_PinMessage.prototype = $extend(systems_CommandDbBase.prototype,{
	update: function(_) {
		var _this = this.options;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = [this.table5d38588a6ddd880f90fc8234bccb893f.get(entity)];
			var route = this.tablef1c30c373f6abc39648a24020b4b82b2.get(entity);
			if(route == "PinMessage") {
				var author = interaction[0].user.id;
				if(interaction[0].channel.isThread()) {
					try {
						var thread = js_Boot.__cast(interaction[0].channel , discord_$js_ThreadChannel);
						if(thread.ownerId == author) {
							if(interaction[0].targetMessage.pinned) {
								interaction[0].targetMessage.unpin().then((function(interaction) {
									return function(_) {
										interaction[0].reply({ content : "Unpinned", ephemeral : true});
									};
								})(interaction),(function() {
									return function(err) {
										haxe_Log.trace(err,{ fileName : "src/commands/PinMessage.hx", lineNumber : 25, className : "commands.PinMessage", methodName : "update"});
									};
								})());
							} else {
								interaction[0].targetMessage.pin().then((function(interaction) {
									return function(_) {
										interaction[0].reply({ content : "Pinned", ephemeral : true});
									};
								})(interaction),(function(interaction) {
									return function(err) {
										var message = null;
										if(err.code == 50021) {
											message = "Can't pin a system message";
										} else {
											message = err.message + "\n\n Contact NotBilly about this";
										}
										haxe_Log.trace(err,{ fileName : "src/commands/PinMessage.hx", lineNumber : 37, className : "commands.PinMessage", methodName : "update"});
										interaction[0].reply(message).then(null,(function() {
											return function(err) {
												haxe_Log.trace(err,{ fileName : "src/commands/PinMessage.hx", lineNumber : 38, className : "commands.PinMessage", methodName : "update"});
											};
										})());
									};
								})(interaction));
							}
						} else {
							interaction[0].reply({ content : "This isn't your thread!", ephemeral : true});
						}
					} catch( _g ) {
						haxe_Log.trace("thread cast failed",{ fileName : "src/commands/PinMessage.hx", lineNumber : 45, className : "commands.PinMessage", methodName : "update"});
					}
				} else {
					interaction[0].reply({ content : "*Currently this only works for user threads :)*", ephemeral : true}).then(null,(function() {
						return function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/PinMessage.hx", lineNumber : 51, className : "commands.PinMessage", methodName : "update"});
						};
					})());
				}
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: function(command,interaction) {
		haxe_Log.trace("here",{ fileName : "src/commands/PinMessage.hx", lineNumber : 60, className : "commands.PinMessage", methodName : "run"});
	}
	,get_name: function() {
		return "pinmessage";
	}
	,options: null
	,tablef1c30c373f6abc39648a24020b4b82b2: null
	,__class__: commands_PinMessage
});
var commands_Poll = function(_universe) {
	this.checked = false;
	systems_CommandDbBase.call(this,_universe);
	this.dm_messages = this.universe.families.get(5);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
	this.tabled1cd3067ebd0108e92f1425a40ea7b45 = this.universe.components.getTable(6);
};
$hxClasses["commands.Poll"] = commands_Poll;
commands_Poll.__name__ = "commands.Poll";
commands_Poll.__super__ = systems_CommandDbBase;
commands_Poll.prototype = $extend(systems_CommandDbBase.prototype,{
	checked: null
	,update: function(_) {
		var _gthis = this;
		systems_CommandDbBase.prototype.update.call(this,_);
		if(!this.checked && Main.connected) {
			this.checked = true;
			var query = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/polls/entries"));
			firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
				var now = new Date().getTime();
				var _g = 0;
				var _g1 = res.docs;
				while(_g < _g1.length) {
					var doc = _g1[_g];
					++_g;
					var data = [doc.data()];
					if(!data[0].active) {
						var four_weeks = data[0].timestamp.toMillis() + 1210000000 * 2;
						if(now - four_weeks < 0) {
							continue;
						}
						firebase_web_firestore_Firestore.deleteDoc(doc.ref).then(null,(function() {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 39, className : "commands.Poll", methodName : "update"});
								$global.console.dir(err);
							};
						})());
						continue;
					}
					var start = data[0].timestamp.toMillis();
					var finish = start + data[0].duration;
					var time_left = [0.];
					if(finish < now) {
						time_left[0] = 30000;
					} else {
						time_left[0] = finish - now;
					}
					Main.client.channels.fetch(data[0].channel).then((function(time_left,data) {
						return function(succ) {
							succ.messages.fetch(data[0].message_id).then((function(time_left,data) {
								return function(message) {
									haxe_Log.trace("Resyncing " + data[0].id,{ fileName : "src/commands/Poll.hx", lineNumber : 56, className : "commands.Poll", methodName : "update"});
									_gthis.addCollector(message,data[0],time_left[0]);
								};
							})(time_left,data),(function() {
								return function(err) {
									haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 59, className : "commands.Poll", methodName : "update"});
									$global.console.dir(err);
								};
							})());
						};
					})(time_left,data),(function() {
						return function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 63, className : "commands.Poll", methodName : "update"});
							$global.console.dir(err);
						};
					})());
				}
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 68, className : "commands.Poll", methodName : "update"});
				$global.console.dir(err);
			});
		}
	}
	,run: function(command,interaction) {
		var _gthis = this;
		var _g = command.content;
		if(_g._hx_index == 17) {
			var question = _g.question;
			var length = _g.length;
			var a = _g.a;
			var b = _g.b;
			var c = _g.c;
			var d = _g.d;
			var e = _g.e;
			var f = _g.f;
			var g = _g.g;
			var v = _g.votes;
			var time = commands_PollTime.fromString(length);
			if(a == null && b == null) {
				interaction.reply("You must have at least 2 answers");
				return;
			}
			var body = "";
			var collection = [a,b,c,d,e,f,g];
			var answers = new haxe_ds_StringMap();
			var results = new haxe_ds_StringMap();
			var votes = 1;
			var vtxt = "vote";
			if(v == 0 || v > 1) {
				vtxt += "s";
			}
			if(v != null) {
				votes = v;
				if(votes > 7) {
					votes = 7;
				}
			}
			var _g_current = 0;
			var _g_array = collection;
			while(_g_current < _g_array.length) {
				var _g1_value = _g_array[_g_current];
				var _g1_key = _g_current++;
				var i = _g1_key;
				var ans = _g1_value;
				if(ans == null) {
					continue;
				}
				var char = this.chars(i);
				results.h[char] = 0;
				answers.h[char] = ans;
				body += "" + char + " - " + ans + "\n";
			}
			var embed = new discord_$js_MessageEmbed();
			embed.setDescription("**Question**\n" + question + "\n\n**Options**\n" + body + "\n**Settings**\n**" + votes + "** " + vtxt + " per user.");
			embed.setFooter({ text : "Poll will run for " + length + "."});
			var settings = new haxe_ds_IntMap();
			settings.h[0] = votes;
			interaction.reply({ embeds : [embed]}).then(function(_) {
				return interaction.fetchReply().then(function(message) {
					var h = answers.h;
					var _g_keys = Object.keys(h);
					var _g_length = _g_keys.length;
					var _g_current = 0;
					while(_g_current < _g_length) {
						var key = _g_keys[_g_current++];
						var _g1_key = key;
						var k = _g1_key;
						message.react(k);
					}
					var data = { id : -1, active : true, results : JSON.stringify(results), answers : JSON.stringify(answers), question : question, duration : time, settings : JSON.stringify(settings), timestamp : firebase_web_firestore_Timestamp.now(), author : interaction.user.id, message_id : message.id, channel : message.channel.id};
					firebase_web_firestore_Firestore.runTransaction(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),function(transaction) {
						return transaction.get(firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/polls")).then(function(doc) {
							if(!doc.exists()) {
								return { id : -1};
							}
							var data = doc.data();
							data.id += 1;
							transaction.update(doc.ref,data);
							return data;
						});
					}).then(function(value) {
						data.id = value.id;
						firebase_web_firestore_Firestore.addDoc(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/polls/entries"),data).then(function(_) {
							_gthis.addCollector(message,data);
						},function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 162, className : "commands.Poll", methodName : "run"});
							$global.console.dir(err);
						});
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 166, className : "commands.Poll", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 170, className : "commands.Poll", methodName : "run"});
					$global.console.dir(err);
				});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Poll.hx", lineNumber : 174, className : "commands.Poll", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,addCollector: function(message,data,time_left) {
		var filter = this.filter(message,data);
		var time = data.duration;
		if(time_left != null) {
			time = time_left;
		}
		var collector = message.createReactionCollector({ filter : filter, time : time});
		collector.on("collect",function(reaction,user) {
		});
		collector.on("end",function(collected,reason) {
			var embed = new discord_$js_MessageEmbed();
			var body = "**Question**\n" + data.question + "\n\n**Options**\n";
			var options = commands_PollData.get_answers(data);
			var h = options.h;
			var _g_keys = Object.keys(h);
			var _g_length = _g_keys.length;
			var _g_current = 0;
			while(_g_current < _g_length) {
				var key = _g_keys[_g_current++];
				var _g1_value = h[key];
				body += "" + key + " - " + _g1_value + "\n";
			}
			body += "\n**Results**\n";
			var sort = message.reactions.cache.sort(function(a,b,_,_1) {
				return b.count - a.count;
			});
			var jsIterator = sort.entries();
			var _g_lastStep = jsIterator.next();
			while(!_g_lastStep.done) {
				var v = _g_lastStep.value;
				_g_lastStep = jsIterator.next();
				var k = v[0];
				var v1 = v[1];
				var col = sort.get(k);
				var count = 0;
				if(col != null) {
					count = v1.count;
				}
				body += "" + k + " - **" + (count - 1) + "** \n";
			}
			body += "\n*Poll ran for " + (data.duration == null ? "null" : commands_PollTime.toString(data.duration)) + "*";
			body += "\n*Posted: <t:" + Math.round(message.createdTimestamp / 1000) + ":R>*";
			embed.setDescription(body);
			message.reply({ content : "<@" + data.author + ">", embeds : [embed]}).then(function(_) {
				var query = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/polls/entries"),firebase_web_firestore_Firestore.where("id","==",data.id));
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						return;
					}
					firebase_web_firestore_Firestore.updateDoc(res.docs[0].ref,"active",false);
				});
			});
		});
	}
	,get_name: function() {
		return "poll";
	}
	,filter: function(message,data) {
		var reactions = commands_PollData.get_answers(data);
		var rcount = 0;
		var h = reactions.h;
		var __keys = Object.keys(h);
		var __length = __keys.length;
		var __current = 0;
		while(__current < __length) {
			++__current;
			rcount += 1;
		}
		var vvotes = commands_PollData.get_settings(data).h[0];
		var filter = function(reaction,user) {
			var votes = 0;
			var jsIterator = message.reactions.cache.values();
			var _g_lastStep = jsIterator.next();
			while(!_g_lastStep.done) {
				var v = _g_lastStep.value;
				_g_lastStep = jsIterator.next();
				var jsIterator1 = v.users.cache.values();
				var _g_lastStep1 = jsIterator1.next();
				while(!_g_lastStep1.done) {
					var v1 = _g_lastStep1.value;
					_g_lastStep1 = jsIterator1.next();
					if(v1.id == user.id && !v1.bot) {
						++votes;
					}
				}
			}
			if(votes > vvotes) {
				if(!user.bot) {
					reaction.users.remove(user);
				}
			}
			if(reaction.emoji.name == "🇦" && rcount >= 1) {
				return true;
			}
			if(reaction.emoji.name == "🇧" && rcount >= 2) {
				return true;
			}
			if(reaction.emoji.name == "🇨" && rcount >= 3) {
				return true;
			}
			if(reaction.emoji.name == "🇩" && rcount >= 4) {
				return true;
			}
			if(reaction.emoji.name == "🇪" && rcount >= 5) {
				return true;
			}
			if(reaction.emoji.name == "🇫" && rcount >= 6) {
				return true;
			}
			if(reaction.emoji.name == "🇬" && rcount >= 7) {
				return true;
			}
			reaction.remove();
			return false;
		};
		return filter;
	}
	,chars: function(char) {
		switch(char) {
		case 0:
			return "🇦";
		case 1:
			return "🇧";
		case 2:
			return "🇨";
		case 3:
			return "🇩";
		case 4:
			return "🇪";
		case 5:
			return "🇫";
		case 6:
			return "🇬";
		default:
			return "";
		}
	}
	,dm_messages: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,tabled1cd3067ebd0108e92f1425a40ea7b45: null
	,__class__: commands_Poll
});
var commands_PollData = {};
commands_PollData.__properties__ = {get_settings:"get_settings",get_results:"get_results",get_answers:"get_answers"};
commands_PollData.get_answers = function(this1) {
	return JSON.parse(this1.answers);
};
commands_PollData.get_results = function(this1) {
	return JSON.parse(this1.results);
};
commands_PollData.get_settings = function(this1) {
	return JSON.parse(this1.settings);
};
var commands_PollTime = {};
commands_PollTime._new = function(value) {
	return value;
};
commands_PollTime.fromString = function(input) {
	switch(input) {
	case "12hr":
		return 43200000;
	case "15m":
		return 900000;
	case "1d":
		return 86400000;
	case "1hr":
		return 3600000;
	case "1w":
		return 604800000;
	case "2w":
		return 1210000000;
	case "30m":
		return 1800000;
	case "3d":
		return 259200000;
	case "4hr":
		return 14400000;
	case "5d":
		return 432000000;
	case "8hr":
		return 28800000;
	default:
		return 3600000;
	}
};
commands_PollTime.toString = function(this1) {
	switch(this1) {
	case 900000:
		return "15mins";
	case 1800000:
		return "30mins";
	case 3600000:
		return "1 hour";
	case 14400000:
		return "4 hours";
	case 28800000:
		return "8 hours";
	case 43200000:
		return "12 hours";
	case 86400000:
		return "1 day";
	case 259200000:
		return "3 days";
	case 432000000:
		return "5 days";
	case 604800000:
		return "1 week";
	case 1210000000:
		return "2 weeks";
	default:
		return "1 hour";
	}
};
var commands_Quote = function(_universe) {
	this.max_name_length = 20;
	this.cache = new haxe_ds_StringMap();
	systems_CommandDbBase.call(this,_universe);
	this.modal = this.universe.families.get(6);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
};
$hxClasses["commands.Quote"] = commands_Quote;
commands_Quote.__name__ = "commands.Quote";
commands_Quote.__super__ = systems_CommandDbBase;
commands_Quote.prototype = $extend(systems_CommandDbBase.prototype,{
	cache: null
	,max_name_length: null
	,onEnabled: function() {
		this.has_subcommands = true;
	}
	,update: function(_) {
		var _gthis = this;
		systems_CommandDbBase.prototype.update.call(this,_);
		var _this = this.modal;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var interaction = [this.table5d38588a6ddd880f90fc8234bccb893f.get(entity)];
			var forward = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			switch(forward) {
			case "quote_edit":
				var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
				var query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("id","==",this.cache.h[interaction[0].user.id]));
				firebase_web_firestore_Firestore.getDocs(query).then((function(interaction) {
					return function(resp) {
						if(resp.docs.length != 1) {
							interaction[0].reply("Something went wrong");
							haxe_Log.trace(_gthis.cache.h[interaction[0].user.id],{ fileName : "src/commands/Quote.hx", lineNumber : 87, className : "commands.Quote", methodName : "update"});
							return;
						}
						firebase_web_firestore_Firestore.updateDoc(resp.docs[0].ref,{ description : interaction[0].fields.getTextInputValue("description")}).then((function(interaction) {
							return function(_) {
								interaction[0].reply("Quote updated!");
								var key = interaction[0].user.id;
								var _this = _gthis.cache;
								if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
									delete(_this.h[key]);
								}
							};
						})(interaction),(function() {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 99, className : "commands.Quote", methodName : "update"});
								$global.console.dir(err);
							};
						})());
					};
				})(interaction),(function() {
					return function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 103, className : "commands.Quote", methodName : "update"});
						$global.console.dir(err);
					};
				})());
				break;
			case "quote_set":
				var name = [interaction[0].fields.getTextInputValue("name")];
				var description = [interaction[0].fields.getTextInputValue("description")];
				var data = [{ id : -1, name : name[0], tags : this.nameArray(name[0]), description : description[0], author : interaction[0].user.id, username : interaction[0].user.username, timestamp : new Date()}];
				if(!this.isValidName(name[0])) {
					interaction[0].reply({ content : "*Names can only contain `_-:` and/or spaces.*\nname: " + name[0] + "\n" + description[0], ephemeral : true});
					return;
				}
				var doc = [firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes")];
				firebase_web_firestore_Firestore.runTransaction(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),(function(doc) {
					return function(transaction) {
						return transaction.get(doc[0]).then((function() {
							return function(doc) {
								if(!doc.exists()) {
									return { id : -1};
								}
								var data = doc.data();
								data.id += 1;
								transaction.update(doc.ref,data);
								return data;
							};
						})());
					};
				})(doc)).then((function(data,description,name,interaction) {
					return function(value) {
						data[0].id = value.id;
						data[0].tags.splice(0,0,"" + data[0].id);
						firebase_web_firestore_Firestore.addDoc(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries"),data[0]).then((function(data,description,name,interaction) {
							return function(_) {
								interaction[0].reply("*Quote #" + data[0].id + " added!*\nname: " + name[0] + "\n" + description[0] + "\n\nby: <@" + data[0].author + ">");
							};
						})(data,description,name,interaction),(function() {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 73, className : "commands.Quote", methodName : "update"});
								$global.console.dir(err);
							};
						})());
					};
				})(data,description,name,interaction),(function() {
					return function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 77, className : "commands.Quote", methodName : "update"});
						$global.console.dir(err);
					};
				})());
				break;
			default:
			}
			if(forward == "quote_set" || forward == "quote_edit") {
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: function(command,interaction) {
		var _gthis = this;
		var _g = command.content;
		switch(_g._hx_index) {
		case 26:
			var user = _g.user;
			var sort = firebase_web_firestore_Firestore.orderBy("id","asc");
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
			var query = firebase_web_firestore_Firestore.query(col,sort);
			if(user != null) {
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("author","==",user.id),sort);
			}
			firebase_web_firestore_Firestore.getDocs(query).then(function(resp) {
				if(resp.empty) {
					interaction.reply("No quotes by that user!");
					return;
				}
				var embed = new discord_$js_MessageEmbed();
				embed.setTitle("List of Quotes");
				var body = "";
				var _g = 0;
				var _g1 = resp.docs;
				while(_g < _g1.length) {
					var doc = _g1[_g];
					++_g;
					var data = doc.data();
					body += "**#" + data.id + "** " + data.name + " by <@" + data.author + "> \n";
				}
				embed.setDescription(body);
				embed.setColor(15368736);
				interaction.reply({ embeds : [embed]});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 142, className : "commands.Quote", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 27:
			var name = _g.name;
			var type = "get";
			var e = command.content;
			var enum_name = $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name.toLowerCase();
			if(enum_name.indexOf("get") != -1) {
				type = "get";
			}
			if(enum_name.indexOf("create") != -1) {
				type = "set";
			}
			if(enum_name.indexOf("delete") != -1) {
				type = "delete";
			}
			if(enum_name.indexOf("edit") != -1) {
				type = "edit";
			}
			var column = "id";
			if(name == null) {
				name = "";
			}
			if(this.isName(name) && type != "get") {
				if(name.length < 2) {
					if(interaction.isAutocomplete()) {
						interaction.respond([]);
					}
					return;
				}
				if(this.isValidName(name)) {
					column = "name";
					name = name.toLowerCase();
				}
			}
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
			var query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where(column,"==",this.isName(name) ? name : Std.parseInt(name)),firebase_web_firestore_Firestore.where("author","==",interaction.user.id));
			if(interaction.isAutocomplete() && type != "get") {
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					var results = [];
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						var data = d.data();
						var name = data.name;
						if(name.length > 25) {
							name = HxOverrides.substr(name,0,25) + "...";
						}
						results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
					}
					interaction.respond(results).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 202, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 206, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				return;
			}
			switch(type) {
			case "delete":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Cannot delete this quote").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 313, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					if(res.docs.length > 1) {
						interaction.reply("An odd situation occured. <@151104106973495296>");
						return;
					}
					firebase_web_firestore_Firestore.deleteDoc(res.docs[0].ref).then(function(_) {
						interaction.reply("Quote deleted!");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 327, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 331, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "edit":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find quote");
						return;
					}
					var ref = null;
					var doc = null;
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						if(interaction.user.id == d.data().author) {
							ref = d.ref;
							doc = d.data();
							break;
						}
					}
					if(doc == null) {
						interaction.reply("That isn't your quote!").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 283, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_edit").setTitle("Editting quote #" + doc.id);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("" + doc.name + ":").setStyle(2).setValue(doc.description).setMinLength(10).setMaxLength(2000);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_b);
					_gthis.cache.h[interaction.user.id] = doc.id;
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 305, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "get":
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "set":
				if(!this.isValidName(name)) {
					var error_msg = "name can only be 3-" + this.max_name_length + " characters long";
					if(name.length < this.max_name_length) {
						error_msg = "*Names can only contain `_-` and/or spaces.*";
					}
					interaction.reply({ content : error_msg, ephemeral : true});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length >= 1) {
						interaction.reply("You already have a quote(#" + res.docs[0].data().id + ") with the name __" + name + "__").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 229, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_set").setTitle("Creating a quote");
					var title_input = new discord_$builder_APITextInputComponent().setCustomId("name").setLabel("name").setStyle(1).setValue(name.toLowerCase()).setMinLength(3).setMaxLength(20);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("description").setStyle(2).setMinLength(10).setMaxLength(2000);
					var action_a = new discord_$builder_APIActionRowComponent().addComponents(title_input);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_a,action_b);
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 258, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			default:
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
			}
			break;
		case 28:
			var name1 = _g.name;
			var type = "get";
			var e = command.content;
			var enum_name = $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name.toLowerCase();
			if(enum_name.indexOf("get") != -1) {
				type = "get";
			}
			if(enum_name.indexOf("create") != -1) {
				type = "set";
			}
			if(enum_name.indexOf("delete") != -1) {
				type = "delete";
			}
			if(enum_name.indexOf("edit") != -1) {
				type = "edit";
			}
			var column = "id";
			if(name1 == null) {
				name1 = "";
			}
			if(this.isName(name1) && type != "get") {
				if(name1.length < 2) {
					if(interaction.isAutocomplete()) {
						interaction.respond([]);
					}
					return;
				}
				if(this.isValidName(name1)) {
					column = "name";
					name1 = name1.toLowerCase();
				}
			}
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
			var query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where(column,"==",this.isName(name1) ? name1 : Std.parseInt(name1)),firebase_web_firestore_Firestore.where("author","==",interaction.user.id));
			if(interaction.isAutocomplete() && type != "get") {
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					var results = [];
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						var data = d.data();
						var name = data.name;
						if(name.length > 25) {
							name = HxOverrides.substr(name,0,25) + "...";
						}
						results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
					}
					interaction.respond(results).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 202, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 206, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				return;
			}
			switch(type) {
			case "delete":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Cannot delete this quote").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 313, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					if(res.docs.length > 1) {
						interaction.reply("An odd situation occured. <@151104106973495296>");
						return;
					}
					firebase_web_firestore_Firestore.deleteDoc(res.docs[0].ref).then(function(_) {
						interaction.reply("Quote deleted!");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 327, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 331, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "edit":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find quote");
						return;
					}
					var ref = null;
					var doc = null;
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						if(interaction.user.id == d.data().author) {
							ref = d.ref;
							doc = d.data();
							break;
						}
					}
					if(doc == null) {
						interaction.reply("That isn't your quote!").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 283, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_edit").setTitle("Editting quote #" + doc.id);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("" + doc.name + ":").setStyle(2).setValue(doc.description).setMinLength(10).setMaxLength(2000);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_b);
					_gthis.cache.h[interaction.user.id] = doc.id;
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 305, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "get":
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name1)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "set":
				if(!this.isValidName(name1)) {
					var error_msg = "name can only be 3-" + this.max_name_length + " characters long";
					if(name1.length < this.max_name_length) {
						error_msg = "*Names can only contain `_-` and/or spaces.*";
					}
					interaction.reply({ content : error_msg, ephemeral : true});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length >= 1) {
						interaction.reply("You already have a quote(#" + res.docs[0].data().id + ") with the name __" + name1 + "__").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 229, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_set").setTitle("Creating a quote");
					var title_input = new discord_$builder_APITextInputComponent().setCustomId("name").setLabel("name").setStyle(1).setValue(name1.toLowerCase()).setMinLength(3).setMaxLength(20);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("description").setStyle(2).setMinLength(10).setMaxLength(2000);
					var action_a = new discord_$builder_APIActionRowComponent().addComponents(title_input);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_a,action_b);
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 258, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			default:
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name1)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
			}
			break;
		case 29:
			var name2 = _g.name;
			var type = "get";
			var e = command.content;
			var enum_name = $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name.toLowerCase();
			if(enum_name.indexOf("get") != -1) {
				type = "get";
			}
			if(enum_name.indexOf("create") != -1) {
				type = "set";
			}
			if(enum_name.indexOf("delete") != -1) {
				type = "delete";
			}
			if(enum_name.indexOf("edit") != -1) {
				type = "edit";
			}
			var column = "id";
			if(name2 == null) {
				name2 = "";
			}
			if(this.isName(name2) && type != "get") {
				if(name2.length < 2) {
					if(interaction.isAutocomplete()) {
						interaction.respond([]);
					}
					return;
				}
				if(this.isValidName(name2)) {
					column = "name";
					name2 = name2.toLowerCase();
				}
			}
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
			var query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where(column,"==",this.isName(name2) ? name2 : Std.parseInt(name2)),firebase_web_firestore_Firestore.where("author","==",interaction.user.id));
			if(interaction.isAutocomplete() && type != "get") {
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					var results = [];
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						var data = d.data();
						var name = data.name;
						if(name.length > 25) {
							name = HxOverrides.substr(name,0,25) + "...";
						}
						results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
					}
					interaction.respond(results).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 202, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 206, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				return;
			}
			switch(type) {
			case "delete":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Cannot delete this quote").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 313, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					if(res.docs.length > 1) {
						interaction.reply("An odd situation occured. <@151104106973495296>");
						return;
					}
					firebase_web_firestore_Firestore.deleteDoc(res.docs[0].ref).then(function(_) {
						interaction.reply("Quote deleted!");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 327, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 331, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "edit":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find quote");
						return;
					}
					var ref = null;
					var doc = null;
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						if(interaction.user.id == d.data().author) {
							ref = d.ref;
							doc = d.data();
							break;
						}
					}
					if(doc == null) {
						interaction.reply("That isn't your quote!").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 283, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_edit").setTitle("Editting quote #" + doc.id);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("" + doc.name + ":").setStyle(2).setValue(doc.description).setMinLength(10).setMaxLength(2000);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_b);
					_gthis.cache.h[interaction.user.id] = doc.id;
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 305, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "get":
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name2)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "set":
				if(!this.isValidName(name2)) {
					var error_msg = "name can only be 3-" + this.max_name_length + " characters long";
					if(name2.length < this.max_name_length) {
						error_msg = "*Names can only contain `_-` and/or spaces.*";
					}
					interaction.reply({ content : error_msg, ephemeral : true});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length >= 1) {
						interaction.reply("You already have a quote(#" + res.docs[0].data().id + ") with the name __" + name2 + "__").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 229, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_set").setTitle("Creating a quote");
					var title_input = new discord_$builder_APITextInputComponent().setCustomId("name").setLabel("name").setStyle(1).setValue(name2.toLowerCase()).setMinLength(3).setMaxLength(20);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("description").setStyle(2).setMinLength(10).setMaxLength(2000);
					var action_a = new discord_$builder_APIActionRowComponent().addComponents(title_input);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_a,action_b);
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 258, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			default:
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name2)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
			}
			break;
		case 30:
			var name3 = _g.name;
			var type = "get";
			var e = command.content;
			var enum_name = $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name.toLowerCase();
			if(enum_name.indexOf("get") != -1) {
				type = "get";
			}
			if(enum_name.indexOf("create") != -1) {
				type = "set";
			}
			if(enum_name.indexOf("delete") != -1) {
				type = "delete";
			}
			if(enum_name.indexOf("edit") != -1) {
				type = "edit";
			}
			var column = "id";
			if(name3 == null) {
				name3 = "";
			}
			if(this.isName(name3) && type != "get") {
				if(name3.length < 2) {
					if(interaction.isAutocomplete()) {
						interaction.respond([]);
					}
					return;
				}
				if(this.isValidName(name3)) {
					column = "name";
					name3 = name3.toLowerCase();
				}
			}
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/quotes/entries");
			var query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where(column,"==",this.isName(name3) ? name3 : Std.parseInt(name3)),firebase_web_firestore_Firestore.where("author","==",interaction.user.id));
			if(interaction.isAutocomplete() && type != "get") {
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					var results = [];
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						var data = d.data();
						var name = data.name;
						if(name.length > 25) {
							name = HxOverrides.substr(name,0,25) + "...";
						}
						results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
					}
					interaction.respond(results).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 202, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 206, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				return;
			}
			switch(type) {
			case "delete":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Cannot delete this quote").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 313, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					if(res.docs.length > 1) {
						interaction.reply("An odd situation occured. <@151104106973495296>");
						return;
					}
					firebase_web_firestore_Firestore.deleteDoc(res.docs[0].ref).then(function(_) {
						interaction.reply("Quote deleted!");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 327, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 331, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "edit":
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find quote");
						return;
					}
					var ref = null;
					var doc = null;
					var _g = 0;
					var _g1 = res.docs;
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						if(interaction.user.id == d.data().author) {
							ref = d.ref;
							doc = d.data();
							break;
						}
					}
					if(doc == null) {
						interaction.reply("That isn't your quote!").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 283, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_edit").setTitle("Editting quote #" + doc.id);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("" + doc.name + ":").setStyle(2).setValue(doc.description).setMinLength(10).setMaxLength(2000);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_b);
					_gthis.cache.h[interaction.user.id] = doc.id;
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 305, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "get":
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name3)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			case "set":
				if(!this.isValidName(name3)) {
					var error_msg = "name can only be 3-" + this.max_name_length + " characters long";
					if(name3.length < this.max_name_length) {
						error_msg = "*Names can only contain `_-` and/or spaces.*";
					}
					interaction.reply({ content : error_msg, ephemeral : true});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length >= 1) {
						interaction.reply("You already have a quote(#" + res.docs[0].data().id + ") with the name __" + name3 + "__").then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 229, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
						return;
					}
					var modal = new discord_$builder_ModalBuilder().setCustomId("quote_set").setTitle("Creating a quote");
					var title_input = new discord_$builder_APITextInputComponent().setCustomId("name").setLabel("name").setStyle(1).setValue(name3.toLowerCase()).setMinLength(3).setMaxLength(20);
					var desc_input = new discord_$builder_APITextInputComponent().setCustomId("description").setLabel("description").setStyle(2).setMinLength(10).setMaxLength(2000);
					var action_a = new discord_$builder_APIActionRowComponent().addComponents(title_input);
					var action_b = new discord_$builder_APIActionRowComponent().addComponents(desc_input);
					modal.addComponents(action_a,action_b);
					interaction.showModal(modal);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 258, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
				break;
			default:
				query = firebase_web_firestore_Firestore.query(col,firebase_web_firestore_Firestore.where("tags","array-contains-any",this.nameArray(name3)));
				if(interaction.isAutocomplete()) {
					firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
						var results = [];
						var _g = 0;
						var _g1 = res.docs;
						while(_g < _g1.length) {
							var d = _g1[_g];
							++_g;
							var data = d.data();
							var name = data.name;
							if(name.length > 25) {
								name = HxOverrides.substr(name,0,25) + "...";
							}
							results.push({ name : "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username), value : "" + data.id});
						}
						interaction.respond(results).then(null,function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 349, className : "commands.Quote", methodName : "run"});
							$global.console.dir(err);
						});
					}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 353, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
					return;
				}
				firebase_web_firestore_Firestore.getDocs(query).then(function(res) {
					if(res.docs.length == 0) {
						interaction.reply("Could not find any quotes with that identifier");
						return;
					}
					var data = res.docs[0].data();
					var embed = new discord_$js_MessageEmbed();
					var user = interaction.client.users.cache.get(data.author);
					var from = js_Boot.__cast(data.timestamp , firebase_web_firestore_Timestamp);
					var date = DateTools.format(from.toDate(),"%H:%M %d-%m-%Y");
					var icon = "https://cdn.discordapp.com/emojis/567741748172816404.webp?size=96&quality=lossless";
					var content = data.username;
					if(user != null) {
						icon = user.avatarURL();
						content = user.username;
					}
					embed.setDescription("***" + data.name + "***\n" + data.description);
					embed.setFooter({ text : "" + content + " | " + date + " |\t#" + data.id, iconURL : icon});
					interaction.reply({ embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 386, className : "commands.Quote", methodName : "run"});
						$global.console.dir(err);
					});
				}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Quote.hx", lineNumber : 390, className : "commands.Quote", methodName : "run"});
					$global.console.dir(err);
				});
			}
			break;
		default:
		}
	}
	,acResponse: function(data) {
		var name = data.name;
		if(name.length > 25) {
			name = HxOverrides.substr(name,0,25) + "...";
		}
		return "" + name + " - " + HxOverrides.substr(data.description,0,25) + ("... by " + data.username);
	}
	,nameArray: function(original) {
		var arr = original.toLowerCase().split(" ");
		var _g_current = 0;
		while(_g_current < arr.length) {
			var _g1_value = arr[_g_current];
			var _g1_key = _g_current++;
			arr[_g1_key] = StringTools.trim(_g1_value);
		}
		return arr;
	}
	,nameString: function(arr) {
		var text = arr[1];
		var _g = 2;
		var _g1 = arr.length;
		while(_g < _g1) {
			var i = _g++;
			text += " " + arr[i];
		}
		return StringTools.trim(text);
	}
	,isName: function(input) {
		var check_letters = new EReg("([a-z])","i");
		return check_letters.match(input);
	}
	,isValidName: function(input) {
		var check_letters = new EReg("^[A-Za-z0-9 :_-]{2,20}$","i");
		return check_letters.match(input);
	}
	,get_name: function() {
		return "quote";
	}
	,modal: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,__class__: commands_Quote
});
var commands_React = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.React"] = commands_React;
commands_React.__name__ = "commands.React";
commands_React.__super__ = systems_CommandBase;
commands_React.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 12) {
			var emoji = _g.emoji;
			interaction.channel.messages.fetch(_g.message_id).then(function(react_message) {
				react_message.react(emoji).then(function(_) {
					interaction.reply({ content : "*reacted*", ephemeral : true}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/React.hx", lineNumber : 16, className : "commands.React", methodName : "run"});
					});
				},function(err) {
					interaction.reply({ ephemeral : true, content : "*failed to react, not sure why. invalid emoji perhaps? ask notbilly if no obvious reason*"});
					haxe_Log.trace(err,{ fileName : "src/commands/React.hx", lineNumber : 19, className : "commands.React", methodName : "run"});
				});
			});
		}
	}
	,get_name: function() {
		return "react";
	}
	,__class__: commands_React
});
var commands_Reminder = function(_universe) {
	this.casual_chat = "";
	this.bot_channel = "663246792426782730";
	this.sent = [];
	this.reminders = [];
	this.checking = false;
	this.channels = new haxe_ds_StringMap();
	systems_CommandDbBase.call(this,_universe);
};
$hxClasses["commands.Reminder"] = commands_Reminder;
commands_Reminder.__name__ = "commands.Reminder";
commands_Reminder.__super__ = systems_CommandDbBase;
commands_Reminder.prototype = $extend(systems_CommandDbBase.prototype,{
	channels: null
	,checking: null
	,reminders: null
	,sent: null
	,bot_channel: null
	,casual_chat: null
	,onEnabled: function() {
		var _gthis = this;
		firebase_web_firestore_Firestore.onSnapshot(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/reminders/entries"),function(resp) {
			var arr = [];
			var _g = 0;
			var _g1 = resp.docs;
			while(_g < _g1.length) {
				var item = _g1[_g];
				++_g;
				arr.push(item.data());
			}
			_gthis.reminders = arr;
		});
	}
	,run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 8) {
			var content = _g.content;
			var when = _g.when;
			var personal = _g.personal;
			var thread_reply = _g.thread_reply;
			if(personal == null) {
				personal = false;
			}
			var thread_id = "";
			if(thread_reply) {
				if(interaction.channel.isThread()) {
					thread_id = interaction.channel.id;
				} else {
					interaction.reply("You marked `thread_reply` to true. Please trigger this command from a thread.");
					return;
				}
			}
			var channel_id = null;
			var category = interaction.channel.parent.name;
			if(category.toLowerCase() == "offtopic") {
				channel_id = interaction.channelId;
			}
			var obj = { channel_id : channel_id, sent : false, thread_reply : thread_reply, thread_id : thread_id, id : "", duration : commands_types_Duration.fromString(when), timestamp : new Date().getTime(), author : interaction.user.id, content : content, personal : personal};
			var min = "4mins";
			var duration = commands_types_Duration.fromString(min);
			if(obj.duration == 0.) {
				interaction.reply("Your time formatting was likely incorrect. Use units like __m__in(s), __h__ou__r__(s), __d__ay(s), __w__ee__k__(s) and __mo__nth(s)");
				return;
			}
			if(obj.duration <= duration) {
				interaction.reply("Please set a reminder that is at least 5mins");
				return;
			}
			if(obj.duration >= commands_types_Duration.fromString("366days")) {
				interaction.reply("A reminder can't be set for longer than 366 days");
				return;
			}
			var col = firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/reminders/entries");
			firebase_web_firestore_Firestore.addDoc(col,obj).then(function(doc) {
				var post_time = Math.round((obj.timestamp + obj.duration) / 1000);
				interaction.reply({ ephemeral : personal, content : "Your reminder has been set for <t:" + post_time + ">"}).then(function(msg) {
					obj.id = doc.id;
					firebase_web_firestore_Firestore.updateDoc(doc,obj).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 95, className : "commands.Reminder", methodName : "run"});
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 98, className : "commands.Reminder", methodName : "run"});
					$global.console.dir(err);
				});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 102, className : "commands.Reminder", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,update: function(_) {
		var _gthis = this;
		systems_CommandDbBase.prototype.update.call(this,_);
		this.getChannel(this.bot_channel);
		if(this.channels.h[this.bot_channel] == null) {
			return;
		}
		var _g = 0;
		var _g1 = this.reminders;
		while(_g < _g1.length) {
			var reminder = [_g1[_g]];
			++_g;
			if(reminder[0].sent) {
				continue;
			}
			if(reminder[0].channel_id != null && !Object.prototype.hasOwnProperty.call(this.channels.h,reminder[0].channel_id)) {
				this.getChannel(reminder[0].channel_id);
			}
			var post_time = reminder[0].timestamp + reminder[0].duration;
			if(new Date().getTime() < post_time) {
				continue;
			}
			reminder[0].sent = true;
			var parse = [{ parse : ["users"]}];
			var embed = new discord_$js_MessageEmbed();
			embed.setTitle("Reminder");
			embed.setDescription(reminder[0].content);
			embed.setFooter({ text : "<t:" + Math.round(reminder[0].timestamp / 1000) + ">"});
			var message = "> <@" + reminder[0].author + "> Your reminder was sent <t:" + Math.round(reminder[0].timestamp / 1000) + ":R>";
			var content = ["" + message + "\n" + reminder[0].content];
			if(reminder[0].thread_reply) {
				Main.client.channels.fetch(reminder[0].thread_id).then((function(content,parse,reminder) {
					return function(channel) {
						channel.send({ content : content[0], allowedMentions : parse[0]}).then(null,(function(parse,reminder) {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 145, className : "commands.Reminder", methodName : "update"});
								reminder[0].sent = false;
								reminder[0].duration += commands_types_Duration.fromString("3hrs");
								var tmp = "<@" + reminder[0].author + "> I failed to post a reminder to your thread. Might be an issue.";
								_gthis.get_channel().send({ content : tmp, allowedMentions : parse[0]});
							};
						})(parse,reminder));
					};
				})(content,parse,reminder));
			} else if(reminder[0].personal) {
				Main.client.users.fetch(reminder[0].author).then((function(content,parse,reminder) {
					return function(user) {
						user.send(content[0]).then(null,(function(parse,reminder) {
							return function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 157, className : "commands.Reminder", methodName : "update"});
								reminder[0].sent = false;
								reminder[0].duration += 86400000;
								var tmp = "<@" + reminder[0].author + "> I tried to DM you a reminder, but it failed. Do you accept messages from this server?";
								_gthis.get_channel().send({ content : tmp, allowedMentions : parse[0]});
							};
						})(parse,reminder));
					};
				})(content,parse,reminder));
			} else {
				var channel = this.get_channel();
				if(reminder[0].channel_id != null && Object.prototype.hasOwnProperty.call(this.channels.h,reminder[0].channel_id)) {
					channel = this.channels.h[reminder[0].channel_id];
				}
				channel.send({ content : content[0], allowedMentions : parse[0]}).then(null,(function(reminder) {
					return function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 173, className : "commands.Reminder", methodName : "update"});
						reminder[0].sent = false;
						reminder[0].duration += 3600000;
					};
				})(reminder));
			}
		}
		var _g = 0;
		var _g1 = this.reminders;
		while(_g < _g1.length) {
			var msg = _g1[_g];
			++_g;
			if(!msg.sent) {
				continue;
			}
			var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/reminders/entries/" + msg.id);
			firebase_web_firestore_Firestore.deleteDoc(doc).then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 186, className : "commands.Reminder", methodName : "update"});
				$global.console.dir(err);
			});
			HxOverrides.remove(this.sent,msg);
		}
	}
	,getChannel: function(channel_id) {
		var _gthis = this;
		if(!this.checking && this.channels.h[channel_id] == null) {
			this.checking = true;
			Main.client.channels.fetch(channel_id).then(function(channel) {
				_gthis.channels.h[channel.id] = channel;
				_gthis.checking = false;
				haxe_Log.trace("Found " + channel.name + " channel",{ fileName : "src/commands/Reminder.hx", lineNumber : 199, className : "commands.Reminder", methodName : "getChannel"});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Reminder.hx", lineNumber : 201, className : "commands.Reminder", methodName : "getChannel"});
				$global.console.dir(err);
			});
		}
	}
	,get_channel: function() {
		return this.channels.h[this.bot_channel];
	}
	,get_name: function() {
		return "reminder";
	}
	,__class__: commands_Reminder
	,__properties__: $extend(systems_CommandDbBase.prototype.__properties__,{get_channel:"get_channel"})
});
var commands_Roundup = function(_universe) {
	this.set_permissions = false;
	this.announcement_channel = "286485321925918721";
	this.news_role = "761714325227700225";
	this.super_mod_id = "198916468312637440";
	this.checking = false;
	this.channel = null;
	this.active = true;
	this.thursday_check = -1;
	this.last_checked = -1;
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Roundup"] = commands_Roundup;
commands_Roundup.__name__ = "commands.Roundup";
commands_Roundup.__super__ = systems_CommandBase;
commands_Roundup.prototype = $extend(systems_CommandBase.prototype,{
	last_checked: null
	,thursday_check: null
	,active: null
	,channel: null
	,checking: null
	,super_mod_id: null
	,news_role: null
	,announcement_channel: null
	,getHaxeIoPage: function() {
		var _gthis = this;
		var data = new haxe_http_HttpNodeJs("https://raw.githubusercontent.com/skial/haxe.io/master/src/roundups/" + Main.state.next_roundup + ".md");
		var embed = new discord_$js_MessageEmbed();
		data.onError = function(error) {
			haxe_Log.trace(error,{ fileName : "src/commands/Roundup.hx", lineNumber : 27, className : "commands.Roundup", methodName : "getHaxeIoPage"});
		};
		data.onData = function(body) {
			var regex = new EReg("### News and Articles(.*?)##### _In case you missed it_","gmis");
			if(regex.match(body)) {
				embed.setTitle("Haxe Roundup #" + Main.state.next_roundup);
				embed.setURL("https://haxe.io/roundups/" + Main.state.next_roundup + "/");
				var desc_split = StringTools.trim(regex.matched(1)).split("\n");
				var desc = "\n**News And Articles**";
				var _g = 0;
				while(_g < desc_split.length) {
					var item = desc_split[_g];
					++_g;
					if(desc.length + StringTools.trim(item).length + 3 + 22 >= 2048) {
						continue;
					}
					desc += "\n" + StringTools.trim(item);
				}
				desc += "\n...";
				embed.setDescription(desc);
				_gthis.channel.send({ content : "<@&" + _gthis.news_role + ">", allowedMentions : { roles : [_gthis.news_role]}, embeds : [embed]}).then(function(_) {
					var fh = Main.state;
					var postfix = fh.next_roundup;
					var value = fh.next_roundup + 1;
					Main.state.next_roundup = value;
					Main.updateState();
					return postfix;
				});
			}
		};
		data.request();
	}
	,set_permissions: null
	,update: function(_) {
		var _gthis = this;
		systems_CommandBase.prototype.update.call(this,_);
		if(this.channel == null && this.checking == false) {
			this.checking = true;
			Main.client.channels.fetch(this.announcement_channel).then(function(channel) {
				_gthis.channel = channel;
				_gthis.checking = false;
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Roundup.hx", lineNumber : 68, className : "commands.Roundup", methodName : "update"});
				$global.console.dir(err);
			});
		}
		if(Main.state.next_roundup == -1 || this.channel == null) {
			return;
		}
		var today = new Date();
		var diff = today.getTime() - this.last_checked;
		if(today.getUTCDay() == 4) {
			if(!this.shouldCheck()) {
				return;
			}
		} else {
			if(diff >= commands_types_Duration.fromString("1d")) {
				return;
			}
			this.last_checked = new Date().getTime();
		}
		this.getHaxeIoPage();
	}
	,shouldCheck: function() {
		var today = new Date();
		var hour = today.getUTCHours();
		if(hour < 11 || hour > 14) {
			return false;
		}
		var min = today.getUTCMinutes();
		if(min % 30 != 0) {
			return false;
		}
		var diff = today.getTime() - this.thursday_check;
		if(diff <= commands_types_Duration.fromString("25m")) {
			return false;
		}
		this.thursday_check = today.getTime();
		return true;
	}
	,run: function(command,interaction) {
		var _gthis = this;
		if(!Util_hasRole(this.super_mod_id,interaction)) {
			interaction.reply("Invalid permissions").then(null,null);
			return;
		}
		var _g = command.content;
		if(_g._hx_index == 18) {
			var number = _g.number;
			if(this.active) {
				this.active = false;
				this.last_checked = -1;
				interaction.reply("Disabled haxe roundup monitoring");
				return;
			}
			if(number <= 600) {
				interaction.reply("Please enter a more recent roundup issue.");
				return;
			}
			this.active = true;
			var value = number | 0;
			Main.state.next_roundup = value;
			Main.updateState();
			interaction.reply("Will start watching haxe roundups from **#" + number + "**.");
			interaction.client.channels.fetch(this.announcement_channel).then(function(channel) {
				_gthis.channel = channel;
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Roundup.hx", lineNumber : 144, className : "commands.Roundup", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,get_roundup: function() {
		return Main.state.next_roundup;
	}
	,set_roundup: function(value) {
		Main.state.next_roundup = value;
		Main.updateState();
		return value;
	}
	,get_name: function() {
		return "roundup";
	}
	,__class__: commands_Roundup
	,__properties__: $extend(systems_CommandBase.prototype.__properties__,{set_roundup:"set_roundup",get_roundup:"get_roundup"})
});
var commands_Rtfm = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Rtfm"] = commands_Rtfm;
commands_Rtfm.__name__ = "commands.Rtfm";
commands_Rtfm.__super__ = systems_CommandBase;
commands_Rtfm.prototype = $extend(systems_CommandBase.prototype,{
	data: null
	,onEnabled: function() {
		this.data = Util_loadFile("rtfm",{ fileName : "src/commands/Rtfm.hx", lineNumber : 11, className : "commands.Rtfm", methodName : "onEnabled"});
	}
	,run: function(command,interaction) {
		if(this.data == null) {
			haxe_Log.trace("failed to read rtfm data",{ fileName : "src/commands/Rtfm.hx", lineNumber : 16, className : "commands.Rtfm", methodName : "run"});
			return;
		}
		var _g = command.content;
		if(_g._hx_index == 19) {
			var _g1 = _g.channel;
			var compare = _g1;
			if(_g1 == null) {
				compare = interaction.channel.name;
			}
			var _g = 0;
			var _g1 = this.data;
			while(_g < _g1.length) {
				var item = _g1[_g];
				++_g;
				var _g2 = 0;
				var _g3 = item.keys;
				while(_g2 < _g3.length) {
					var val = _g3[_g2];
					++_g2;
					if(val == compare) {
						interaction.reply(item.content);
						return;
					}
				}
			}
			interaction.reply("No information available.");
		}
	}
	,get_name: function() {
		return "rtfm";
	}
	,__class__: commands_Rtfm
});
var systems_TextCommandBase = function(_universe) {
	ecs_System.call(this,_universe);
	this.commands = this.universe.families.get(3);
	this.tabled1cd3067ebd0108e92f1425a40ea7b45 = this.universe.components.getTable(6);
	this.tablee699e73f96d5fb19e01669534fb74875 = this.universe.components.getTable(5);
};
$hxClasses["systems.TextCommandBase"] = systems_TextCommandBase;
systems_TextCommandBase.__name__ = "systems.TextCommandBase";
systems_TextCommandBase.__super__ = ecs_System;
systems_TextCommandBase.prototype = $extend(ecs_System.prototype,{
	update: function(_) {
		if(!Main.connected || !Main.commands_active) {
			return;
		}
		var _this = this.commands;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var message = this.tabled1cd3067ebd0108e92f1425a40ea7b45.get(entity);
			var command = this.tablee699e73f96d5fb19e01669534fb74875.get(entity);
			if(command == this.get_name()) {
				this.run(message,StringTools.replace(message.content,this.get_name(),""));
				this.universe.deleteEntity(entity);
			}
		}
	}
	,run: null
	,get_name: null
	,commands: null
	,tabled1cd3067ebd0108e92f1425a40ea7b45: null
	,tablee699e73f96d5fb19e01669534fb74875: null
	,__class__: systems_TextCommandBase
	,__properties__: {get_name:"get_name"}
});
var commands_Run = function(_universe) {
	this.varname = "";
	this.timeout = 5000;
	this.checked = false;
	this.code_requests = new haxe_ds_StringMap();
	this.haxe_version = null;
	systems_TextCommandBase.call(this,_universe);
	this.code_messages = this.universe.families.get(3);
};
$hxClasses["commands.Run"] = commands_Run;
commands_Run.__name__ = "commands.Run";
commands_Run.__super__ = systems_TextCommandBase;
commands_Run.prototype = $extend(systems_TextCommandBase.prototype,{
	message_id: null
	,haxe_version: null
	,code_requests: null
	,channel: null
	,checked: null
	,timeout: null
	,last_cleared: null
	,update: function(_) {
		systems_TextCommandBase.prototype.update.call(this,_);
		var now = new Date().getTime();
		var clear_frame = commands_types_Duration.fromString("2w");
		if(!(now - this.last_cleared < clear_frame)) {
			this.last_cleared = now;
			var before = null;
			try {
				var path = (haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".")) + "/haxebot";
				var folders = js_node_Fs.readdirSync(path);
				var _g = 0;
				while(_g < folders.length) {
					var folder = folders[_g];
					++_g;
					before = HxOverrides.strDate(folder).getTime();
					if(now - before < clear_frame) {
						continue;
					}
					var path1 = "" + path + "/" + folder;
					if(sys_FileSystem.exists(path1)) {
						var _g1 = 0;
						var _g2 = js_node_Fs.readdirSync(path1);
						while(_g1 < _g2.length) {
							var file = _g2[_g1];
							++_g1;
							var curPath = path1 + "/" + file;
							if(sys_FileSystem.isDirectory(curPath)) {
								if(sys_FileSystem.exists(curPath)) {
									var _g3 = 0;
									var _g4 = js_node_Fs.readdirSync(curPath);
									while(_g3 < _g4.length) {
										var file1 = _g4[_g3];
										++_g3;
										var curPath1 = curPath + "/" + file1;
										if(sys_FileSystem.isDirectory(curPath1)) {
											sys_FileSystem.deleteDirectory(curPath1);
										} else {
											js_node_Fs.unlinkSync(curPath1);
										}
									}
									js_node_Fs.rmdirSync(curPath);
								}
							} else {
								js_node_Fs.unlinkSync(curPath);
							}
						}
						js_node_Fs.rmdirSync(path1);
					}
				}
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g);
				haxe_Log.trace(_g1,{ fileName : "src/commands/Run.hx", lineNumber : 58, className : "commands.Run", methodName : "cleanDirectory"});
			}
		}
	}
	,cleanDirectory: function() {
		var now = new Date().getTime();
		var clear_frame = commands_types_Duration.fromString("2w");
		if(now - this.last_cleared < clear_frame) {
			return;
		}
		this.last_cleared = now;
		var before = null;
		try {
			var path = (haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".")) + "/haxebot";
			var folders = js_node_Fs.readdirSync(path);
			var _g = 0;
			while(_g < folders.length) {
				var folder = folders[_g];
				++_g;
				before = HxOverrides.strDate(folder).getTime();
				if(now - before < clear_frame) {
					continue;
				}
				var path1 = "" + path + "/" + folder;
				if(sys_FileSystem.exists(path1)) {
					var _g1 = 0;
					var _g2 = js_node_Fs.readdirSync(path1);
					while(_g1 < _g2.length) {
						var file = _g2[_g1];
						++_g1;
						var curPath = path1 + "/" + file;
						if(sys_FileSystem.isDirectory(curPath)) {
							if(sys_FileSystem.exists(curPath)) {
								var _g3 = 0;
								var _g4 = js_node_Fs.readdirSync(curPath);
								while(_g3 < _g4.length) {
									var file1 = _g4[_g3];
									++_g3;
									var curPath1 = curPath + "/" + file1;
									if(sys_FileSystem.isDirectory(curPath1)) {
										sys_FileSystem.deleteDirectory(curPath1);
									} else {
										js_node_Fs.unlinkSync(curPath1);
									}
								}
								js_node_Fs.rmdirSync(curPath);
							}
						} else {
							js_node_Fs.unlinkSync(curPath);
						}
					}
					js_node_Fs.rmdirSync(path1);
				}
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g);
			haxe_Log.trace(_g1,{ fileName : "src/commands/Run.hx", lineNumber : 58, className : "commands.Run", methodName : "cleanDirectory"});
		}
	}
	,run: function(message,content) {
		var _gthis = this;
		if(this.haxe_version == null) {
			var $process = "./haxe/haxe";
			if(!sys_FileSystem.exists("./haxe/haxe")) {
				$process = "haxe";
			}
			var ls = js_node_ChildProcess.spawn($process,["--version"]);
			ls.stdout.once("data",function(data) {
				_gthis.haxe_version = data.toString().substring(0,5);
				ls.kill();
			});
		}
		this.extractCode(message.content,message);
	}
	,codeSource: function(message) {
		var remote = new EReg("^(!run #([a-zA-Z0-9]{5,8}))","gi");
		var source = "";
		if(remote.match(message)) {
			source = "https://try.haxe.org/#" + remote.matched(2);
		}
		return source;
	}
	,extractCode: function(message,response) {
		var _gthis = this;
		var check_code = new EReg("^(!run #([a-zA-Z0-9]{5,8}))","gi");
		if(check_code.match(message)) {
			var regex = new EReg("(<code class=\"prettyprint haxe\">)(.*?)(</code>)","gmius");
			var get_code = new haxe_http_HttpNodeJs("https://try.haxe.org/embed/" + check_code.matched(2));
			get_code.onData = function(data) {
				if(regex.match(data)) {
					_gthis.parse(StringTools.htmlUnescape(regex.matched(2)),response);
				}
			};
			get_code.request();
			return;
		}
		check_code = new EReg("^(!run(\\s|\n| \n|)```(haxe|hx|)(.*)```)","gmisu");
		if(check_code.match(message)) {
			this.parse(check_code.matched(4),response);
			return;
		}
		check_code = new EReg("!run[\\s|\n| \n](.*)","gmis");
		if(check_code.match(message)) {
			this.parse(check_code.matched(1),response);
			return;
		}
		this.parse(null,response);
	}
	,deleteFile: function(filename) {
		try {
			js_node_Fs.unlinkSync("" + this.get_base_path() + "/bin/" + filename + ".js");
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(_g1,{ fileName : "src/commands/Run.hx", lineNumber : 120, className : "commands.Run", methodName : "deleteFile"});
		}
	}
	,extractLibs: function(code) {
		var check_code = new EReg("(/?/?-l\\W.*)","gmiu");
		if(!check_code.match(code)) {
			return [];
		}
		var libs = [];
		while(check_code.match(code)) {
			var split = check_code.matched(1).split(" ");
			libs.push("-L");
			libs.push(split[1]);
			code = check_code.matchedRight();
		}
		return libs;
	}
	,canRequest: function(data) {
		var timings = 0.0;
		var last = 0.0;
		var count = 1;
		var _g = 0;
		var _g1 = data.length;
		while(_g < _g1) {
			var i = _g++;
			if(data.length % 2 == 1 && data.length - i == 1) {
				break;
			}
			if(i % 2 == 0) {
				last = data[i];
				continue;
			}
			timings += data[i] - last;
			++count;
		}
		if(data.length >= 6) {
			return timings / count > 2000;
		} else {
			return true;
		}
	}
	,cleanOutput: function(data,filename,class_entry) {
		data = data.toString();
		new RegExp("(\\[(.*|vm)\\].*)$","igmu".split("u").join(""));
		data = StringTools.replace(StringTools.replace(data,filename,class_entry),"\x1B","");
		data = StringTools.replace(data,this.get_base_path(),"");
		data = StringTools.replace(data,"/hx/","");
		data = StringTools.replace(data,"/bin/","");
		return data;
	}
	,getImportAndUsings: function(input,index) {
		if(index == null) {
			index = 0;
		}
		var regex = new EReg("^(import|using)(.*);$","igmu");
		var matches = [];
		while(regex.match(input)) {
			matches.push(regex.matched(index));
			input = regex.matchedRight();
		}
		return { code : input, paths : matches};
	}
	,parse: function(code,response) {
		if(code == null || code.length == 0) {
			response.reply({ content : "Your `!run` command formatting is incorrect. Check the pin in <#663246792426782730>."});
			return;
		}
		var class_exists = new EReg("(class.*({|\n{))","mgu");
		if(class_exists.match(code)) {
			var check_class = new EReg("(^class\\s(Test|Main)(\n|\\s|\\S))","mgu");
			if(!check_class.match(code)) {
				response.reply({ content : "You must have a class called `Test` or `Main`"});
				return;
			}
		}
		if(!this.isSafe(code,response)) {
			response.reply({ content : "Your code contains bad things."});
			return;
		}
		this.runCodeOnThread(code,response);
	}
	,isSafe: function(code,response) {
		var check_http = new EReg("haxe.http|haxe.Http","gmu");
		if(check_http.match(code)) {
			return false;
		}
		if(!Main.state.macros) {
			if(new EReg("@:.*[bB]uild","igmu").match(code)) {
				response.reply({ content : "Currently no build macros allowed"});
				return false;
			}
		} else if(code.indexOf("macro") != -1 || new EReg("macro|@:.*[bB]uild","igmu").match(code)) {
			return false;
		}
		return !new EReg("(sys|((\"|')s(.*)y(.*)(\"|')s(\"|'))|eval|syntax.|require|location|untyped|@:.*[bB]uild)","igmu").match(code);
	}
	,varname: null
	,insertLoopBreak: function(name,code) {
		this.varname = "___" + util_Random.string(6);
		var regex = new EReg("((while|for)\\s*\\(.*\\)\\s*\\{|(while|for)\\s*\\(.*?\\))|(function.*?\\(.*?\\)\\s*{)","gmui");
		var copy = code;
		copy = StringTools.replace(copy,"class " + name + " {","class " + name + " {\nstatic public final " + this.varname + " = Date.now().getTime();");
		copy = StringTools.replace(copy,"class " + name + "{","class " + name + " {\nstatic public final " + this.varname + " = Date.now().getTime();");
		var matched = [];
		while(regex.match(code)) {
			if(regex.matched(1) != null) {
				matched.push(regex.matched(1));
			}
			if(regex.matched(4) != null) {
				matched.push(regex.matched(4));
			}
			code = regex.matchedRight();
		}
		var throw_fun = "public static function __time_fun() {if (Date.now().getTime() - " + name + "." + this.varname + " > " + this.timeout + ") { throw \"Code took too long to execute.\";}}";
		var condition = "" + name + ".__time_fun();";
		var _g = 0;
		while(_g < matched.length) {
			var match = matched[_g];
			++_g;
			copy = StringTools.replace(copy,match,"\n" + match + "\n" + condition);
		}
		copy = StringTools.replace(copy,"class " + name + " {","class " + name + " {\n\t" + throw_fun + "\n\t");
		copy = StringTools.replace(copy,"class " + name + "{","class " + name + " {\n\t" + throw_fun + "\n\t");
		return copy;
	}
	,parseError: function(error,code) {
		var embed = new discord_$js_MessageEmbed();
		embed.setTitle("Compilation Error");
		var regex = new EReg("(Main|Test).hx:([0-9]+): characters ([0-9]+)-([0-9]+) : (.*)","gm");
		if(regex.match(error)) {
			var line = Std.parseInt(regex.matched(2));
			var start_char = Std.parseInt(regex.matched(3));
			var end_char = Std.parseInt(regex.matched(4));
			var str = "";
			var new_code = "";
			var _this = code.split("\n");
			var _g_current = 0;
			while(_g_current < _this.length) {
				var _g1_value = _this[_g_current];
				var _g1_key = _g_current++;
				if(_g1_key != line - 1) {
					new_code += _g1_value + "\n";
					continue;
				}
				var _g = 0;
				var _g1 = _g1_value.length;
				while(_g < _g1) {
					var i = _g++;
					var pos = i + 1;
					var char = _g1_value.charAt(i);
					if(pos < start_char) {
						str += char;
					} else if(pos == start_char) {
						str += "->" + char;
					} else if(pos == end_char) {
						str += "" + char + "<-";
					}
				}
				new_code += str + "\n";
			}
			if(new_code.length > 3900) {
				new_code = HxOverrides.substr(new_code,0,3900);
			}
			embed.setDescription("```hx\n" + new_code + ("``` **Error** \n " + error));
			return embed;
		}
		return null;
	}
	,runCodeOnThread: function(code,message) {
		var _gthis = this;
		if(!this.isSafe(code,message)) {
			message.reply({ content : "Your code contains bad things."});
			return;
		}
		var mention = "";
		var libs = this.extractLibs(code);
		var lib_regex = new EReg("(/?/?-l\\W.*)","gmiu");
		if(lib_regex.match(code)) {
			code = code.replace(lib_regex.r,"");
		}
		var get_paths = this.getImportAndUsings(code);
		var format = "";
		var _g = 0;
		var _g1 = get_paths.paths;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			format += data;
		}
		try {
			var filename = "H" + new Date().getTime() + Math.floor(Math.random() * 100000);
			var check_class = new EReg("(^class\\s(Test|Main)(\n|\\s|\\S))","mg");
			var code_content = "";
			var class_entry = "Main";
			if(check_class.match(get_paths.code)) {
				var parsed = check_class.matched(0);
				var replaced = "";
				if(parsed.indexOf("Test") != -1) {
					class_entry = "Test";
				}
				var by = StringTools.replace(parsed,class_entry,filename);
				replaced = parsed.replace(check_class.r,by);
				code_content = StringTools.replace(get_paths.code,parsed,replaced);
				var other_instances = new EReg(class_entry,"gm");
				if(other_instances.match(code_content)) {
					code_content = code_content.replace(other_instances.r,filename);
				}
				code_content = StringTools.replace(code_content,parsed,parsed);
			} else {
				code_content = "class " + filename + " {\n\tstatic function main() {\n\t\t" + get_paths.code + "\n\t}\n}";
			}
			code_content = format + "\n" + code_content;
			var pre_loop = code_content;
			code_content = this.insertLoopBreak(filename,code_content);
			js_node_Fs.appendFile("" + this.get_base_path() + "/hx/" + filename + ".hx",code_content + ("//User:" + message.author.tag + " | time: " + Std.string(new Date())),function(error) {
				if(error != null) {
					haxe_Log.trace(error,{ fileName : "src/commands/Run.hx", lineNumber : 364, className : "commands.Run", methodName : "runCodeOnThread"});
				}
				var commands = ["-cp","" + _gthis.get_base_path() + "/hx","-main",filename,"-js","" + _gthis.get_base_path() + "/bin/" + filename + ".js"];
				var $process = "./haxe/haxe";
				if(!sys_FileSystem.exists($process)) {
					$process = "haxe";
				}
				var ls = js_node_ChildProcess.spawn($process,libs.concat(commands),{ timeout : _gthis.timeout});
				ls.stderr.once("data",function(data) {
					var compile_output = _gthis.cleanOutput(data,filename,class_entry);
					pre_loop = StringTools.replace(pre_loop,filename,class_entry);
					var embed = _gthis.parseError(compile_output,pre_loop);
					if(embed == null) {
						message.reply({ allowedMentions : { parse : []}, content : mention + ("```\n" + compile_output + "```")});
					} else {
						embed.setDescription(_gthis.cleanOutput(embed.data.description,filename,class_entry));
						message.reply({ allowedMentions : { parse : []}, embeds : [embed]});
					}
					ls.kill("SIGTERM");
				});
				ls.once("close",function(data) {
					var response = "";
					var js_file = "" + _gthis.get_base_path() + "/bin/" + filename + ".js";
					if(!sys_FileSystem.exists(js_file)) {
						haxe_Log.trace("Code likely errored and didnt compile (" + filename + ".js)",{ fileName : "src/commands/Run.hx", lineNumber : 411, className : "commands.Run", methodName : "runCodeOnThread"});
						ls.kill("SIGTERM");
						return;
					}
					var obj = null;
					var vm = new vm2_NodeVM({ sandbox : obj, console : "redirect", timeout : _gthis.timeout});
					vm.on("console.log",function(data,info) {
						var regex = new EReg("H[0-9]*..hx:[0-9]*.: (.*)","gm");
						if(regex.match(data)) {
							data = regex.matched(1);
						}
						if(info != null) {
							response += "" + info + "\n";
							return response;
						} else {
							response += "" + data + "\n";
							return response;
						}
					});
					try {
						vm.run(js_node_Fs.readFileSync(js_file,{ encoding : "utf8"}));
						var x = response.split("\n");
						var truncated = false;
						if(x.length > 24) {
							truncated = true;
							response = "";
							var _g = 0;
							var _g1 = x.slice(x.length - 23);
							while(_g < _g1.length) {
								var line = _g1[_g];
								++_g;
								response += line + "\n";
							}
						}
						var embed = new discord_$js_MessageEmbed();
						embed.type = "article";
						var code_output = "";
						var split = response.split("\n");
						var _g2_current = 0;
						var _g2_array = split;
						while(_g2_current < _g2_array.length) {
							var _g3_value = _g2_array[_g2_current];
							var _g3_key = _g2_current++;
							var key = _g3_key;
							var item = _g3_value;
							if(key >= split.length - 1) {
								break;
							}
							code_output += "" + key + ". " + item + " \n";
						}
						if(truncated) {
							code_output += "\n//Output has been trimmed.";
						}
						var desc = "**Code:**\n```hx\n" + get_paths.code + "``` **Output:**\n ```markdown\n" + code_output + "\n```";
						embed.setDescription(desc);
						var url = _gthis.codeSource(message.content);
						var author = { name : "@" + message.author.tag, iconURL : message.author.displayAvatarURL()};
						if(url == "") {
							embed.setAuthor(author);
						} else {
							var tag = url.split("#")[1];
							embed.setTitle("TryHaxe #" + tag);
							embed.setURL(url);
							embed.setAuthor(author);
						}
						var date = new Date(message.createdTimestamp);
						var format_date = DateTools.format(date,"%d-%m-%Y %H:%M:%S");
						embed.setFooter({ text : "Haxe " + _gthis.haxe_version, iconURL : "https://cdn.discordapp.com/emojis/567741748172816404.png?v=1"});
						if(response.length > 0 && data == 0) {
							message.reply({ allowedMentions : { parse : []}, embeds : [embed]}).then(function(succ) {
								haxe_Log.trace("" + message.author.tag + " at " + format_date + " with file id: " + filename,{ fileName : "src/commands/Run.hx", lineNumber : 494, className : "commands.Run", methodName : "runCodeOnThread"});
								if(message.deletable) {
									message.delete().then(null,function(err) {
										haxe_Log.trace(err,{ fileName : "src/commands/Run.hx", lineNumber : 499, className : "commands.Run", methodName : "runCodeOnThread"});
										$global.console.dir(err);
									});
								}
							},function(err) {
								haxe_Log.trace(err,{ fileName : "src/commands/Run.hx", lineNumber : 504, className : "commands.Run", methodName : "runCodeOnThread"});
								$global.console.dir(err);
							});
							ls.kill();
							return;
						}
					} catch( _g ) {
						var e = haxe_Exception.caught(_g);
						var compile_output = _gthis.cleanOutput(e.get_message(),filename,class_entry);
						message.reply({ allowedMentions : { parse : []}, content : mention + ("```\n" + compile_output + "```")});
						haxe_Log.trace(e,{ fileName : "src/commands/Run.hx", lineNumber : 517, className : "commands.Run", methodName : "runCodeOnThread"});
					}
				});
			});
			return;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "src/commands/Run.hx", lineNumber : 525, className : "commands.Run", methodName : "runCodeOnThread"});
			this.channel.send({ content : mention + "Code failed to execute."});
		}
	}
	,get_base_path: function() {
		var path = haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".");
		if(!sys_FileSystem.exists(path + "/haxebot")) {
			sys_FileSystem.createDirectory(path + "/haxebot");
		}
		path += "/haxebot";
		var date = DateTools.format(new Date(),"%F");
		path += "/" + date;
		if(!sys_FileSystem.exists(path)) {
			sys_FileSystem.createDirectory(path);
		}
		if(!sys_FileSystem.exists(path + "/hx")) {
			sys_FileSystem.createDirectory(path + "/hx");
		}
		if(!sys_FileSystem.exists(path + "/bin")) {
			sys_FileSystem.createDirectory(path + "/bin");
		}
		return path;
	}
	,get_name: function() {
		return "!run";
	}
	,code_messages: null
	,__class__: commands_Run
	,__properties__: $extend(systems_TextCommandBase.prototype.__properties__,{get_base_path:"get_base_path"})
});
var commands_Say = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Say"] = commands_Say;
commands_Say.__name__ = "commands.Say";
commands_Say.__super__ = systems_CommandBase;
commands_Say.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 11) {
			var _g1 = _g.message_id;
			var message = _g.message;
			if(_g1 == null) {
				interaction.channel.sendTyping().then(function(_) {
					interaction.channel.send({ content : message}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Say.hx", lineNumber : 13, className : "commands.Say", methodName : "run"});
					});
					return interaction.reply({ content : "sent", ephemeral : true});
				});
			} else {
				interaction.channel.messages.fetch(_g1).then(function(reply) {
					reply.reply({ content : message}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Say.hx", lineNumber : 19, className : "commands.Say", methodName : "run"});
					});
					interaction.reply({ content : "sent", ephemeral : true});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Say.hx", lineNumber : 21, className : "commands.Say", methodName : "run"});
				});
			}
		}
	}
	,get_name: function() {
		return "say";
	}
	,__class__: commands_Say
});
var commands_ScamPrevention = function(_universe) {
	this.last_message_interval = 10000;
	this.phishing_urls = [];
	this.trigger_messages = new haxe_ds_StringMap();
	this.user_list = new haxe_ds_StringMap();
	this.sequential_tags = new haxe_ds_StringMap();
	this.time_since = new haxe_ds_StringMap();
	systems_CommandBase.call(this,_universe);
	this.messages = this.universe.families.get(5);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
	this.tabled1cd3067ebd0108e92f1425a40ea7b45 = this.universe.components.getTable(6);
};
$hxClasses["commands.ScamPrevention"] = commands_ScamPrevention;
commands_ScamPrevention.__name__ = "commands.ScamPrevention";
commands_ScamPrevention.__super__ = systems_CommandBase;
commands_ScamPrevention.prototype = $extend(systems_CommandBase.prototype,{
	time_since: null
	,sequential_tags: null
	,user_list: null
	,trigger_messages: null
	,phishing_urls: null
	,phishing_update_time: null
	,last_message_interval: null
	,update: function(_) {
		systems_CommandBase.prototype.update.call(this,_);
		var _this = this.messages;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var forward = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			var message = this.tabled1cd3067ebd0108e92f1425a40ea7b45.get(entity);
			if(forward != "scam_prevention") {
				continue;
			}
			if(Util_withinTime(message.createdTimestamp,this.last_message_interval)) {
				var user = message.author.id;
				var this1 = this.time_since;
				var value = new Date().getTime();
				this1.h[user] = value;
				this.addMessage(message.author.id,message);
			}
			this.universe.deleteEntity(entity);
		}
		var _gthis = this;
		if(!(new Date().getTime() - this.phishing_update_time < 21600000)) {
			this.phishing_update_time = new Date().getTime();
			var links = new haxe_http_HttpNodeJs("https://raw.githubusercontent.com/Discord-AntiScam/scam-links/main/urls.json");
			links.onData = function(data) {
				try {
					_gthis.phishing_urls = JSON.parse(data);
				} catch( _g ) {
					var _g1 = haxe_Exception.caught(_g);
					haxe_Log.trace(_g1,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 118, className : "commands.ScamPrevention", methodName : "getPhishingLinks"});
					haxe_Log.trace("error parsing phishing links",{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 119, className : "commands.ScamPrevention", methodName : "getPhishingLinks"});
					var tmp = new Date().getTime();
					_gthis.phishing_update_time = tmp - 18000000;
				}
			};
			links.request();
		}
		var h = this.trigger_messages.h;
		var messages_keys = Object.keys(h);
		var messages_length = messages_keys.length;
		var messages_current = 0;
		while(messages_current < messages_length) {
			var messages = h[messages_keys[messages_current++]];
			if(this.checkPhishingLinks(messages)) {
				this.banUser(messages);
				continue;
			}
			if(messages.length < 3) {
				continue;
			}
			var review = false;
			if(this.checkTags(messages)) {
				review = true;
			}
			if(this.checkEquality(messages)) {
				review = true;
			}
			if(!review) {
				continue;
			}
			this.reviewMessage(messages);
			var id = messages[0].author.id;
			var _this = this.time_since;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _this1 = this.user_list;
			if(Object.prototype.hasOwnProperty.call(_this1.h,id)) {
				delete(_this1.h[id]);
			}
			var _this2 = this.trigger_messages;
			if(Object.prototype.hasOwnProperty.call(_this2.h,id)) {
				delete(_this2.h[id]);
			}
		}
		var h = this.time_since.h;
		var _g1_keys = Object.keys(h);
		var _g1_length = _g1_keys.length;
		var _g1_current = 0;
		while(_g1_current < _g1_length) {
			var key = _g1_keys[_g1_current++];
			var _g2_value = h[key];
			if(new Date().getTime() - _g2_value > this.last_message_interval) {
				var _this = this.time_since;
				if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
					delete(_this.h[key]);
				}
				var _this1 = this.user_list;
				if(Object.prototype.hasOwnProperty.call(_this1.h,key)) {
					delete(_this1.h[key]);
				}
				var _this2 = this.trigger_messages;
				if(Object.prototype.hasOwnProperty.call(_this2.h,key)) {
					delete(_this2.h[key]);
				}
			}
		}
	}
	,reviewMessage: function(messages) {
		var message = messages[0];
		var embed = this.reformatMessage("SPAM ALERT - Timed out",message);
		this.timeoutUser(message,function(_) {
			message.reply({ content : "<@&198916468312637440> Please review this message by: <@" + message.author.id + ">", embeds : [embed]}).then(function(_) {
				var _g = 0;
				while(_g < messages.length) {
					var message = messages[_g];
					++_g;
					message.delete().then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 89, className : "commands.ScamPrevention", methodName : "reviewMessage"});
						$global.console.dir(err);
					});
				}
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 94, className : "commands.ScamPrevention", methodName : "reviewMessage"});
				$global.console.dir(err);
			});
		});
	}
	,resetChecks: function(id) {
		var _this = this.time_since;
		if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
			delete(_this.h[id]);
		}
		var _this = this.user_list;
		if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
			delete(_this.h[id]);
		}
		var _this = this.trigger_messages;
		if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
			delete(_this.h[id]);
		}
	}
	,getPhishingLinks: function() {
		var _gthis = this;
		if(new Date().getTime() - this.phishing_update_time < 21600000) {
			return;
		}
		this.phishing_update_time = new Date().getTime();
		var links = new haxe_http_HttpNodeJs("https://raw.githubusercontent.com/Discord-AntiScam/scam-links/main/urls.json");
		links.onData = function(data) {
			try {
				_gthis.phishing_urls = JSON.parse(data);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g);
				haxe_Log.trace(_g1,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 118, className : "commands.ScamPrevention", methodName : "getPhishingLinks"});
				haxe_Log.trace("error parsing phishing links",{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 119, className : "commands.ScamPrevention", methodName : "getPhishingLinks"});
				var tmp = new Date().getTime();
				_gthis.phishing_update_time = tmp - 18000000;
			}
		};
		links.request();
	}
	,timeoutUser: function(message,callback) {
		var _gthis = this;
		message.guild.members.fetch(message.author.id).then(function(guild_member) {
			_gthis.logMessage(message.author.id,_gthis.reformatMessage("Original Message",message,false),"TIMEOUT");
			guild_member.timeout(43200000,"Stop spamming, a mod will review this at their convenience.").then(callback,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 135, className : "commands.ScamPrevention", methodName : "timeoutUser"});
				$global.console.dir(err);
			});
			var id = message.author.id;
			var _this = _gthis.time_since;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _this = _gthis.user_list;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _this = _gthis.trigger_messages;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 140, className : "commands.ScamPrevention", methodName : "timeoutUser"});
			$global.console.dir(err);
		});
	}
	,banUser: function(messages,callback) {
		var _gthis = this;
		var message = messages[0];
		message.guild.members.fetch(message.author.id).then(function(guild_member) {
			var _g = 0;
			while(_g < messages.length) {
				var message1 = messages[_g];
				++_g;
				_gthis.logMessage(message1.author.id,_gthis.reformatMessage("Original Message",message1,false),"BAN");
			}
			guild_member.ban({ days : 1, reason : "found phishing links, auto banned."}).then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 156, className : "commands.ScamPrevention", methodName : "banUser"});
				$global.console.dir(err);
			});
			var id = message.author.id;
			var _this = _gthis.time_since;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _this = _gthis.user_list;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _this = _gthis.trigger_messages;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			message.channel.send("User <@" + message.author.id + "> has been auto banned for sending scam links.").then(callback,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 164, className : "commands.ScamPrevention", methodName : "banUser"});
				$global.console.dir(err);
			});
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 168, className : "commands.ScamPrevention", methodName : "banUser"});
			$global.console.dir(err);
		});
	}
	,logMessage: function(id,embed,action) {
		var desc = embed.data.description;
		embed.setDescription(desc + (embed.data.description + ("\n\n Action: **__" + action + "__**")));
		Main.client.channels.fetch("952952631079362650").then(function(channel) {
			channel.send({ content : "<@" + id + ">", embeds : [embed]});
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 179, className : "commands.ScamPrevention", methodName : "logMessage"});
			$global.console.dir(err);
		});
	}
	,checkPhishingLinks: function(messages) {
		var _g = 0;
		while(_g < messages.length) {
			var message = messages[_g];
			++_g;
			var _g1 = 0;
			var _g2 = this.phishing_urls;
			while(_g1 < _g2.length) {
				var link = _g2[_g1];
				++_g1;
				if(message.content.indexOf(link) != -1) {
					var regex = new EReg("((((https?:)(?://)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:/[\\+~%/.\\w_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)","gm");
					if(regex.match(message.content)) {
						var url = new URL(regex.matched(1));
						var arr = [new EReg("(.*)?.?(discordapp.com)","gu"),new EReg("(.*)?.?(twitch.tv)","gu")];
						var whitelisted = false;
						var _g3 = 0;
						while(_g3 < arr.length) {
							var url_host_regex = arr[_g3];
							++_g3;
							if(url_host_regex.match(url.hostname)) {
								whitelisted = true;
							}
						}
						if(whitelisted) {
							return false;
						}
						if(url.hostname.length == 0 || url.hostname == null) {
							haxe_Log.trace(regex.matched(1),{ fileName : "src/commands/ScamPrevention.hx", lineNumber : 204, className : "commands.ScamPrevention", methodName : "checkPhishingLinks"});
							return false;
						}
						if(link != url.hostname) {
							return false;
						}
						return true;
					}
				}
			}
		}
		return false;
	}
	,checkTags: function(messages) {
		var tag_count = 0;
		var _g = 0;
		while(_g < messages.length) {
			var message = messages[_g];
			++_g;
			if(StringTools.startsWith(message.content,"@everyone") || StringTools.startsWith(message.content,"@here")) {
				if(tag_count >= 3) {
					break;
				}
				++tag_count;
			}
		}
		if(tag_count >= 3) {
			return true;
		}
		return false;
	}
	,checkEquality: function(messages) {
		var equality_count = 0;
		var channel_count = 0;
		var compare = messages[0];
		var _g = 0;
		while(_g < messages.length) {
			var message = messages[_g];
			++_g;
			var content = message.content;
			if(compare.content == content) {
				++equality_count;
			}
			if(compare.channel.id != message.channel.id) {
				++channel_count;
			}
		}
		if(equality_count == messages.length && equality_count >= 3 && channel_count >= 4) {
			return true;
		}
		return false;
	}
	,reformatMessage: function(title,message,format) {
		if(format == null) {
			format = true;
		}
		var embed = new discord_$js_MessageEmbed();
		var content = message.content;
		if(title != null) {
			embed.setTitle(title);
		}
		if(format) {
			var link_regex = new EReg("(https?://(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\\d*)/?([a-z_/0-9\\-#.]*)\\??([a-z_/0-9\\-#=&]*)","ig");
			if(link_regex.match(content)) {
				content = content.replace(link_regex.r,"[Link Removed]");
			}
		}
		var rand = Math.random();
		var avatar = rand >= 0 && rand < 0.33 ? "https://github.com/Jarrio/Haxebot/blob/master/bin/resources/images/muffin_haxe_cop.png?raw=true&rf=1" : rand >= 0.33 && rand < 0.66 ? "https://github.com/Jarrio/Haxebot/blob/master/bin/resources/images/bulby_haxe_cop.png?raw=true" : "https://github.com/Jarrio/Haxebot/blob/master/bin/resources/images/bsod_haxe_cop.png?raw=true";
		embed.setAuthor({ name : "" + message.author.tag, iconURL : avatar});
		embed.setDescription(content);
		return embed;
	}
	,updateTime: function(user) {
		var this1 = this.time_since;
		var value = new Date().getTime();
		this1.h[user] = value;
	}
	,run: function(command,interaction) {
	}
	,get_timestamp: function() {
		return new Date().getTime();
	}
	,get_name: function() {
		return "scamprevention";
	}
	,addMessage: function(id,message) {
		var messages = this.trigger_messages.h[id];
		if(messages == null) {
			messages = [];
		}
		messages.push(message);
		this.trigger_messages.h[id] = messages;
	}
	,messages: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,tabled1cd3067ebd0108e92f1425a40ea7b45: null
	,__class__: commands_ScamPrevention
	,__properties__: $extend(systems_CommandBase.prototype.__properties__,{get_timestamp:"get_timestamp"})
});
var commands_Showcase = function(_) {
	this.checking = false;
	this.channel_id = "162664383082790912";
	systems_CommandBase.call(this,_);
	this.modal = this.universe.families.get(4);
	this.messages = this.universe.families.get(5);
	this.interactions = this.universe.families.get(6);
	this.table57fe33dae47d23e66b521963cf6643b9 = this.universe.components.getTable(7);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
	this.tabled1cd3067ebd0108e92f1425a40ea7b45 = this.universe.components.getTable(6);
	this.webhook = new discord_$js_WebhookClient({ url : Main.keys.showcase_hook});
};
$hxClasses["commands.Showcase"] = commands_Showcase;
commands_Showcase.__name__ = "commands.Showcase";
commands_Showcase.__super__ = systems_CommandBase;
commands_Showcase.prototype = $extend(systems_CommandBase.prototype,{
	channel: null
	,channel_id: null
	,webhook: null
	,checking: null
	,update: function(_) {
		var _gthis = this;
		systems_CommandBase.prototype.update.call(this,_);
		if(this.channel == null && !this.checking) {
			this.checking = true;
			Main.client.channels.fetch(this.channel_id).then(function(channel) {
				_gthis.channel = channel;
				_gthis.checking = false;
				haxe_Log.trace("loaded showcase channel",{ fileName : "src/commands/Showcase.hx", lineNumber : 43, className : "commands.Showcase", methodName : "update"});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Showcase.hx", lineNumber : 45, className : "commands.Showcase", methodName : "update"});
				$global.console.dir(err);
			});
		}
		var _this = this.modal;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var modal = this.table57fe33dae47d23e66b521963cf6643b9.get(entity);
			var command = [this.table5d38588a6ddd880f90fc8234bccb893f.get(entity)];
			this.channel.send("" + modal.title_or_link + " \n " + modal.description).then((function(command) {
				return function(_) {
					command[0].reply("Your post was submitted to the showcase channel!");
				};
			})(command));
			this.universe.deleteEntity(entity);
		}
		var _this = this.messages;
		var _set = _this.entities;
		var _g1_set = _set;
		var _g1_active = _this.isActive();
		var _g1_idx = _set.size() - 1;
		while(_g1_active && _g1_idx >= 0) {
			var entity = _g1_set.getDense(_g1_idx--);
			var command1 = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			var message = [this.tabled1cd3067ebd0108e92f1425a40ea7b45.get(entity)];
			if(command1 == "showcase_message") {
				var regex = new EReg("https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)","ig");
				if(!regex.match(message[0].content) && message[0].attachments.size == 0) {
					var content = "```\n" + message[0].content + "\n```";
					content += "\nYour message was removed due to not having any attachments or links. Please chat within threads only.\n";
					content += "**Showcase Channel guidelines:**\n\n";
					content += "1. Programming projects must be haxe related\n2. Comments on posts should be made within threads\n3. Art and Music showcases are allowed here";
					message[0].author.send({ content : content}).then((function(message) {
						return function(succ) {
							message[0].delete().then(null,(function() {
								return function(err) {
									haxe_Log.trace(err,{ fileName : "src/commands/Showcase.hx", lineNumber : 69, className : "commands.Showcase", methodName : "update"});
								};
							})());
						};
					})(message),(function() {
						return function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Showcase.hx", lineNumber : 71, className : "commands.Showcase", methodName : "update"});
							$global.console.dir(err);
						};
					})());
				}
				this.universe.deleteEntity(entity);
				return;
			}
			if(command1 != "showcase" && !this.channel.isThread()) {
				return;
			}
			var thread = [js_Boot.__cast(message[0].channel , discord_$js_ThreadChannel)];
			if(thread[0].id != "1024905470621798410") {
				if(thread[0].ownerId != message[0].author.id) {
					return;
				}
			}
			var arr = [[]];
			var content1 = [StringTools.trim(message[0].content.substring(10))];
			var jsIterator = message[0].attachments.values();
			var _g1_jsIterator = jsIterator;
			var _g1_lastStep = jsIterator.next();
			while(!_g1_lastStep.done) {
				var v = _g1_lastStep.value;
				_g1_lastStep = _g1_jsIterator.next();
				var a = v;
				arr[0].push(a);
				haxe_Log.trace(a,{ fileName : "src/commands/Showcase.hx", lineNumber : 100, className : "commands.Showcase", methodName : "update"});
			}
			var name = [message[0].author.username];
			if(message[0].member.nickname != null && message[0].member.nickname.length > 0) {
				name[0] = message[0].member.nickname;
			}
			var cont = [(function(name,thread,message) {
				return function() {
					return _gthis.webhook.send({ content : "***Continue the conversation at - <#" + thread[0].id + ">***", username : name[0], avatarURL : message[0].author.avatarURL()});
				};
			})(name,thread,message)];
			this.webhook.send({ content : content1[0], username : name[0], avatarURL : message[0].author.avatarURL(), files : arr[0]}).then((function(cont) {
				return function(_) {
					cont[0]();
				};
			})(cont),(function(cont,name,content,arr,message) {
				return function(err) {
					var _v_ = err;
					if((_v_ == null ? null : _v_.message).indexOf("Request entity too large") != -1) {
						_gthis.webhook.send({ content : content[0] + "\n" + arr[0][0].url, username : name[0], avatarURL : message[0].author.avatarURL()}).then((function(cont) {
							return function(_) {
								cont[0]();
							};
						})(cont));
					}
				};
			})(cont,name,content1,arr,message));
			this.universe.deleteEntity(entity);
		}
		var _this = this.interactions;
		var _set = _this.entities;
		var _g2_set = _set;
		var _g2_active = _this.isActive();
		var _g2_idx = _set.size() - 1;
		while(_g2_active && _g2_idx >= 0) {
			var entity = _g2_set.getDense(_g2_idx--);
			var interaction = [this.table5d38588a6ddd880f90fc8234bccb893f.get(entity)];
			var command1 = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			if(command1 == "showcase_agree") {
				interaction[0].member.roles.add("1021517470080700468").then((function(interaction) {
					return function(success) {
						interaction[0].reply({ content : "Thanks! You can now post in <#162664383082790912>", ephemeral : true});
					};
				})(interaction),(function() {
					return function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Showcase.hx", lineNumber : 143, className : "commands.Showcase", methodName : "update"});
						$global.console.dir(err);
					};
				})());
			}
			if(command1 == "showcase_disagree") {
				interaction[0].reply({ content : "Keep on lurking :)", ephemeral : true});
			}
			switch(command1) {
			case "showcase_agree":case "showcase_disagree":
				this.universe.deleteEntity(entity);
				break;
			default:
			}
		}
	}
	,run: function(command,interaction) {
		var agree_btn = new discord_$builder_ButtonBuilder().setCustomId("showcase_agree").setLabel("Agree").setStyle(1);
		var disagree_btn = new discord_$builder_ButtonBuilder().setCustomId("showcase_disagree").setLabel("Disagree").setStyle(2);
		var row = new discord_$builder_APIActionRowComponent().addComponents(agree_btn,disagree_btn);
		interaction.reply({ content : "If your post does not contain either an __**attachment**__ or a __**link**__, the post will be removed. Any comments on any of the works posted in the <#162664383082790912> channel should be made within threads. \n\n**Guidelines**\n1. Programming projects must be haxe related\n2. Comments on posts should be made within threads\n3. Art and Music showcases are allowed here", components : [row], ephemeral : true});
	}
	,get_name: function() {
		return "showcase";
	}
	,modal: null
	,messages: null
	,interactions: null
	,table57fe33dae47d23e66b521963cf6643b9: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,tabled1cd3067ebd0108e92f1425a40ea7b45: null
	,__class__: commands_Showcase
});
var commands_Snippet = function(_universe) {
	this.cache = new haxe_ds_StringMap();
	this.results_per_page_no_desc = 20;
	this.results_per_page = 5;
	this.tags = [];
	this.sent = [];
	systems_CommandDbBase.call(this,_universe);
	this.button_events = this.universe.families.get(6);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
};
$hxClasses["commands.Snippet"] = commands_Snippet;
commands_Snippet.__name__ = "commands.Snippet";
commands_Snippet.__super__ = systems_CommandDbBase;
commands_Snippet.prototype = $extend(systems_CommandDbBase.prototype,{
	sent: null
	,tags: null
	,results_per_page: null
	,results_per_page_no_desc: null
	,cache: null
	,onEnabled: function() {
		var _gthis = this;
		this.has_subcommands = true;
		firebase_web_firestore_Firestore.onSnapshot(firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets"),function(resp) {
			var arr = [];
			var _g = 0;
			var _g1 = resp.data().tags;
			while(_g < _g1.length) {
				var tag = _g1[_g];
				++_g;
				arr.push({ name : tag, value : tag});
			}
			_gthis.tags = arr;
			_gthis.tags.sort(function(a,b) {
				if(HxOverrides.cca(a.name,0) > HxOverrides.cca(b.name,0)) {
					return 1;
				}
				if(HxOverrides.cca(a.name,0) < HxOverrides.cca(b.name,0)) {
					return -1;
				}
				return 0;
			});
		});
	}
	,update: function(_) {
		var _gthis = this;
		systems_CommandDbBase.prototype.update.call(this,_);
		var _this = this.button_events;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var command = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			var cache = this.cache.h[interaction.user.id];
			if(cache != null) {
				switch(command) {
				case "snippet_left":
					if(cache.page - 1 >= 0) {
						var embed = this.formatResultOutput(cache,-1);
						cache.message.edit({ embeds : [embed]});
					}
					cache.interacted_at = new Date().getTime();
					interaction.deferUpdate().then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 60, className : "commands.Snippet", methodName : "update"});
						$global.console.dir(err);
					});
					this.universe.deleteEntity(entity);
					break;
				case "snippet_right":
					var page = cache.page;
					var results_pp = cache.desc ? this.results_per_page : this.results_per_page_no_desc;
					var max = Math.ceil(cache.results.length / results_pp);
					if(page + 1 < max) {
						var embed1 = this.formatResultOutput(cache,1);
						cache.message.edit({ embeds : [embed1]});
					}
					cache.interacted_at = new Date().getTime();
					interaction.deferUpdate().then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 74, className : "commands.Snippet", methodName : "update"});
						$global.console.dir(err);
					});
					this.universe.deleteEntity(entity);
					break;
				default:
				}
			}
			if(command == "snippet_left" || command == "snippet_right") {
				this.universe.deleteEntity(entity);
			}
		}
		var h = this.cache.h;
		var _g1_h = h;
		var _g1_keys = Object.keys(h);
		var _g1_length = _g1_keys.length;
		var _g1_current = 0;
		while(_g1_current < _g1_length) {
			var key = _g1_keys[_g1_current++];
			var _g2_key = key;
			var _g2_value = _g1_h[key];
			var key1 = [_g2_key];
			var item = [_g2_value];
			var now = new Date().getTime();
			var diff = now - item[0].interacted_at;
			if(diff < 30000) {
				continue;
			}
			item[0].interacted_at = now;
			var embed = this.formatResultOutput(item[0],0);
			item[0].message.edit({ embeds : [embed], components : []}).then((function(key) {
				return function(_) {
					var _this = _gthis.cache;
					if(Object.prototype.hasOwnProperty.call(_this.h,key[0])) {
						delete(_this.h[key[0]]);
					}
				};
			})(key1),(function(item,key) {
				return function(err) {
					if(item[0].message.deleted) {
						var _this = _gthis.cache;
						if(Object.prototype.hasOwnProperty.call(_this.h,key[0])) {
							delete(_this.h[key[0]]);
						}
					}
					haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 100, className : "commands.Snippet", methodName : "update"});
					$global.console.dir(err);
				};
			})(item,key1));
		}
	}
	,run: function(command,interaction) {
		var _gthis = this;
		var _g = command.content;
		switch(_g._hx_index) {
		case 2:
			var embed = new discord_$js_MessageEmbed();
			embed.setTitle("Tags");
			var _g_current = 0;
			var _g_array = this.tags;
			while(_g_current < _g_array.length) {
				var _g1_value = _g_array[_g_current];
				var _g1_key = _g_current++;
				var i = _g1_key;
				var tag = _g1_value;
				if(i % 2 == 0 && i != this.tags.length - 1) {
					embed.addFields(new discord_$js_Field(tag.name,this.tags[i + 1].name,true));
				}
				if(i == this.tags.length - 1) {
					embed.addFields(new discord_$js_Field(tag.name,"...",true));
				}
			}
			interaction.reply({ embeds : [embed]}).then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 378, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 3:
			var user = _g.user;
			var show_desc = _g.show_desc;
			if(show_desc == null) {
				show_desc = true;
			}
			var q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.orderBy("id","asc"));
			if(user != null) {
				q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.where("submitted_by","==",user.id),firebase_web_firestore_Firestore.orderBy("id","asc"));
			}
			firebase_web_firestore_Firestore.getDocs(q).then(function(resp) {
				var res = [];
				var _g = 0;
				var _g1 = resp.docs;
				while(_g < _g1.length) {
					var doc = _g1[_g];
					++_g;
					res.push(doc.data());
				}
				var obj = { page : 0, desc : show_desc, message : null, results : res, interacted_at : new Date().getTime()};
				_gthis.handleSearchResponse(interaction,obj);
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 300, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 4:
			var id = _g.id;
			var q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.where("id","==",id),firebase_web_firestore_Firestore.where("submitted_by","==",interaction.user.id));
			firebase_web_firestore_Firestore.getDocs(q).then(function(resp) {
				if(resp.empty && !interaction.isAutocomplete()) {
					interaction.reply("No snippets with that id were found that could belong to you");
					return;
				}
				if(interaction.isAutocomplete()) {
					var res = [];
					if(resp.docs.length > 0) {
						var data = resp.docs[0].data();
						res.push({ name : "" + data.id + " - " + data.title, value : "" + data.id});
					}
					interaction.respond(res);
					return;
				}
				interaction.reply("Editting currently not implemented");
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 328, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 5:
			var id = _g.id;
			var q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.where("id","==",Std.parseInt(id)),firebase_web_firestore_Firestore.where("submitted_by","==",interaction.user.id));
			firebase_web_firestore_Firestore.getDocs(q).then(function(resp) {
				if(resp.empty && !interaction.isAutocomplete()) {
					interaction.reply("No snippets with that id were found that could belong to you");
					return;
				}
				if(interaction.isAutocomplete()) {
					var res = [];
					if(resp.docs.length > 0) {
						var data = resp.docs[0].data();
						res.push({ name : "" + data.id + " - " + data.title, value : "" + data.id});
					}
					interaction.respond(res);
					return;
				}
				firebase_web_firestore_Firestore.deleteDoc(resp.docs[0].ref).then(function(_) {
					interaction.reply("Your snippet(#" + id + ") has been deleted.");
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 357, className : "commands.Snippet", methodName : "run"});
					$global.console.dir(err);
				});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 361, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 6:
			var taga = _g.taga;
			var tagb = _g.tagb;
			var tagc = _g.tagc;
			var restraints = [];
			var search = "";
			if(taga != null) {
				search = taga;
			}
			if(tagb != null) {
				search = tagb;
			}
			if(tagc != null) {
				search = tagc;
			}
			if(interaction.isAutocomplete()) {
				var results = this.autoComplete(search);
				interaction.respond(results);
				return;
			}
			if(this.isValidTag(taga)) {
				search = taga;
				restraints.push(taga);
			}
			if(this.isValidTag(tagb)) {
				search = tagb;
				restraints.push(tagb);
			}
			if(this.isValidTag(tagc)) {
				search = tagc;
				restraints.push(tagc);
			}
			var q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.where("tags","array-contains-any",restraints));
			firebase_web_firestore_Firestore.getDocs(q).then(function(resp) {
				var res = [];
				var _g = 0;
				var _g1 = resp.docs;
				while(_g < _g1.length) {
					var doc = _g1[_g];
					++_g;
					res.push(doc.data());
				}
				res = _gthis.matchTags(restraints,res);
				var obj = { page : 0, desc : true, message : null, results : res, interacted_at : new Date().getTime()};
				_gthis.handleSearchResponse(interaction,obj);
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 268, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		case 7:
			var url = _g.url;
			var title = _g.title;
			var description = _g.description;
			var taga = _g.taga;
			var tagb = _g.tagb;
			var tagc = _g.tagc;
			var tagd = _g.tagd;
			var tage = _g.tage;
			var ac = taga;
			var obj = { id : -1, submitted_by : interaction.user.id, timestamp : new Date().getTime(), title : title, description : description, url : url, tags : [taga]};
			if(tagb != null) {
				ac = tagb;
				obj.tags.push(tagb);
			}
			if(tagc != null) {
				ac = tagc;
				obj.tags.push(tagc);
			}
			if(tagd != null) {
				ac = tagd;
				obj.tags.push(tagd);
			}
			if(tage != null) {
				ac = tage;
				obj.tags.push(tage);
			}
			if(interaction.isAutocomplete()) {
				var results = this.autoComplete(ac);
				interaction.respond(results);
				return;
			}
			if(!this.validateURL(url)) {
				interaction.reply("Invalid URL format");
				return;
			}
			if(url.charAt(url.length - 1) == "/") {
				url = url.substring(0,url.length - 1);
			}
			var _g = 0;
			var _g1 = obj.tags;
			while(_g < _g1.length) {
				var tag = _g1[_g];
				++_g;
				var found = false;
				var _g2 = 0;
				var _g3 = this.tags;
				while(_g2 < _g3.length) {
					var v = _g3[_g2];
					++_g2;
					if(tag == v.name) {
						found = true;
						break;
					}
				}
				if(!found) {
					interaction.reply("The tag __" + tag + "__ is not available as an option currently.");
					return;
				}
			}
			var q = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),firebase_web_firestore_Firestore.where("url","==",url));
			firebase_web_firestore_Firestore.getDocs(q).then(function(resp) {
				if(!resp.empty) {
					interaction.reply("Snippet already exists");
					return;
				}
				var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets");
				firebase_web_firestore_Firestore.runTransaction(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),function(transaction) {
					return transaction.get(doc).then(function(doc) {
						if(!doc.exists()) {
							return { id : -1};
						}
						var data = doc.data();
						data.id += 1;
						transaction.update(doc.ref,data);
						return data;
					});
				}).then(function(value) {
					obj.id = value.id;
					obj.tags.splice(0,0,"" + value.id);
					firebase_web_firestore_Firestore.addDoc(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/snippets/entries"),obj).then(function(_) {
						interaction.reply("*Snippet #" + value.id + " added!*\ntitle: " + title + "\n" + description + "\n");
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 200, className : "commands.Snippet", methodName : "run"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 204, className : "commands.Snippet", methodName : "run"});
					$global.console.dir(err);
				});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 208, className : "commands.Snippet", methodName : "run"});
				$global.console.dir(err);
			});
			break;
		default:
		}
	}
	,matchTags: function(tags,results) {
		var arr = [];
		var _g = 0;
		while(_g < results.length) {
			var r = results[_g];
			++_g;
			var matches = 0;
			var _g1 = 0;
			var _g2 = r.tags;
			while(_g1 < _g2.length) {
				var rtag = _g2[_g1];
				++_g1;
				if(tags.indexOf(rtag) != -1) {
					++matches;
				}
			}
			if(matches == tags.length) {
				arr.push(r);
			}
		}
		return arr;
	}
	,handleSearchResponse: function(interaction,state) {
		var _gthis = this;
		var builder = new discord_$builder_APIActionRowComponent();
		builder.addComponents(new discord_$builder_ButtonBuilder().setCustomId("snippet_left").setLabel("Prev").setStyle(1),new discord_$builder_ButtonBuilder().setCustomId("snippet_right").setLabel("Next").setStyle(1));
		var arr = [];
		var results_pp = state.desc ? this.results_per_page : this.results_per_page_no_desc;
		var max = Math.ceil(state.results.length / results_pp);
		if(max > 1) {
			arr = [builder];
		}
		var embed = this.formatResultOutput(state,0);
		var eph = false;
		if(embed.data.description == "No results found") {
			eph = true;
		}
		interaction.reply({ embeds : [embed], components : arr, ephemeral : eph, fetchReply : true}).then(function(message) {
			if(!eph || max == 1) {
				state.message = message;
				_gthis.cache.h[interaction.user.id] = state;
			}
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/Snippet.hx", lineNumber : 428, className : "commands.Snippet", methodName : "handleSearchResponse"});
			$global.console.dir(err);
		});
	}
	,formatResultOutput: function(state,forward) {
		var embed = new discord_$js_MessageEmbed();
		var desc = "No results found";
		var results = state.results;
		var results_pp = state.desc ? this.results_per_page : this.results_per_page_no_desc;
		var max = Math.ceil(results.length / results_pp);
		embed.setTitle("Snippets");
		if(results.length > 0) {
			desc = "";
			if(forward == -1) {
				state.page -= 1;
			}
			if(forward == 1) {
				state.page += 1;
			}
			var start = 0;
			if(state.page > 0) {
				start = state.page * results_pp;
			}
			var end = start + results_pp;
			if(start < 0) {
				start = 0;
			}
			if(end > results.length) {
				end = results.length;
			}
			var _this = results.slice(start,end);
			var _g_current = 0;
			while(_g_current < _this.length) {
				var _g1_value = _this[_g_current];
				var _g1_key = _g_current++;
				var count = start + _g1_key + 1;
				desc += "**" + count + ") [" + _g1_value.title + "](" + _g1_value.url + ")**\n";
				if(state.desc) {
					desc += "***tags: " + StringTools.replace(_g1_value.tags.slice(1).toString(),",",", ") + "***\n";
					desc += _g1_value.description + "\n";
				}
			}
		}
		embed.setColor(15368736);
		embed.setDescription(desc);
		if(results.length > 0) {
			embed.setFooter({ iconURL : "https://cdn.discordapp.com/emojis/567741748172816404.png?v=1", text : "Page " + (state.page + 1) + " / " + max});
		}
		return embed;
	}
	,validateURL: function(content) {
		var regex = new EReg("((((https?:)(?://)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:/[\\+~%/.\\w_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)","gm");
		if(regex.match(content)) {
			return true;
		}
		return false;
	}
	,autoComplete: function(term) {
		var results = [];
		var algo = externs_FuzzySort.go(term,this.tags,{ key : "name", limit : 15, threshold : -1000});
		var _g = 0;
		while(_g < algo.length) {
			var a = algo[_g];
			++_g;
			results.push(a.obj);
		}
		if(results.length == 0) {
			results = this.tags.slice(0,20);
		}
		return results;
	}
	,isValidTag: function(tag) {
		var found = false;
		var _g = 0;
		var _g1 = this.tags;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			if(tag == v.name) {
				found = true;
				break;
			}
		}
		return found;
	}
	,createEmbed: function(obj) {
		var embed = new discord_$js_MessageEmbed();
		embed.setTitle(obj.title);
		embed.setURL(obj.url);
		embed.setDescription(obj.description);
	}
	,get_name: function() {
		return "snippet";
	}
	,button_events: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,__class__: commands_Snippet
});
var commands_TextMention = function(_universe) {
	this.roles = new haxe_ds_StringMap();
	this.permissions = new haxe_ds_StringMap();
	this.cached = false;
	systems_TextCommandBase.call(this,_universe);
};
$hxClasses["commands.TextMention"] = commands_TextMention;
commands_TextMention.__name__ = "commands.TextMention";
commands_TextMention.__super__ = systems_TextCommandBase;
commands_TextMention.prototype = $extend(systems_TextCommandBase.prototype,{
	cached: null
	,permissions: null
	,roles: null
	,onEnabled: function() {
		var _gthis = this;
		var db = firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp());
		firebase_web_firestore_Firestore.onSnapshot(firebase_web_firestore_Firestore.collection(db,"discord/admin/mentions"),function(resp) {
			var _g = 0;
			var _g1 = resp.docs;
			while(_g < _g1.length) {
				var doc = _g1[_g];
				++_g;
				var data = doc.data();
				_gthis.permissions.h[data.user] = data;
			}
			if(!_gthis.cached) {
				_gthis.cached = true;
			}
		});
		firebase_web_firestore_Firestore.getDoc(firebase_web_firestore_Firestore.doc(db,"discord/admin")).then(function(doc) {
			var _g = 0;
			var _g1 = doc.data().roles;
			while(_g < _g1.length) {
				var role = _g1[_g];
				++_g;
				_gthis.roles.h[role.tag] = role.id;
			}
		},function(err) {
			haxe_Log.trace(err,{ fileName : "src/commands/TextMention.hx", lineNumber : 33, className : "commands.TextMention", methodName : "onEnabled"});
			$global.console.dir(err);
		});
	}
	,run: function(message,content) {
		if(!this.cached || this.roles == null) {
			return;
		}
		if(!Object.prototype.hasOwnProperty.call(this.permissions.h,message.author.id)) {
			return;
		}
		var user = this.permissions.h[message.author.id];
		var found = 0;
		var roles_found = "";
		var h = this.roles.h;
		var _g_h = h;
		var _g_keys = Object.keys(h);
		var _g_length = _g_keys.length;
		var _g_current = 0;
		while(_g_current < _g_length) {
			var key = _g_keys[_g_current++];
			var _g1_key = key;
			var _g1_value = _g_h[key];
			var tag = _g1_key;
			var id = _g1_value;
			var copy = content.toLowerCase();
			if(copy.indexOf(tag) != -1) {
				var pos = copy.indexOf(tag);
				var mention = content.substring(pos,pos + tag.length);
				content = StringTools.replace(content,mention,"<@&" + id + ">");
				break;
			}
		}
		var thumb = null;
		var _g = 0;
		var _g1 = user.roles;
		while(_g < _g1.length) {
			var role = _g1[_g];
			++_g;
			if(content.indexOf("<@&" + role + ">") != -1) {
				roles_found += "<@&" + role + ">";
				content = StringTools.trim(StringTools.replace(content,"<@&" + role + ">",""));
				switch(role) {
				case "1059447670344794142":
					thumb = "https://camo.githubusercontent.com/f171b5935350515b274913adb4a080390e6075c46cafa43dd24efe3b37afb4f1/68747470733a2f2f6878676f646f742e6769746875622e696f2f6c6f676f322e706e67";
					break;
				case "761714697468248125":
					thumb = "https://cdn.discordapp.com/emojis/230369617774641152.webp?size=96&quality=lossless";
					break;
				case "761714775902126080":
					thumb = "https://cdn.discordapp.com/emojis/567739201341095946.webp?size=96&quality=lossless";
					break;
				case "761714853403820052":
					thumb = "https://cdn.discordapp.com/emojis/567736760243847169.webp?size=96&quality=lossless";
					break;
				case "914171888748609546":
					thumb = "https://raw.githubusercontent.com/ceramic-engine/ceramic/master/tools/resources/AppIcon-128.png";
					break;
				default:
				}
				++found;
			}
		}
		if(found > 0) {
			var attachments = new Map();
			if(message.attachments.size > 0) {
				attachments = message.attachments;
			}
			if(thumb == null) {
				thumb = message.author.avatarURL();
			}
			var embed = new discord_$js_MessageEmbed();
			if(content == null || content.length < 1) {
				haxe_Log.trace(message.author.tag,{ fileName : "src/commands/TextMention.hx", lineNumber : 92, className : "commands.TextMention", methodName : "run"});
				return;
			}
			embed.setDescription(content);
			embed.setTitle("*" + message.author.username + "*");
			embed.setThumbnail(thumb);
			message.reply({ content : roles_found, embeds : [embed], attachments : attachments, allowedMentions : { roles : user.roles}}).then(function(_) {
				message.delete().then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/TextMention.hx", lineNumber : 104, className : "commands.TextMention", methodName : "run"});
				});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/TextMention.hx", lineNumber : 106, className : "commands.TextMention", methodName : "run"});
				$global.console.dir(err);
			});
		}
	}
	,get_name: function() {
		return "!mention";
	}
	,__class__: commands_TextMention
});
var commands_Trace = function(_universe) {
	this.haxe_version = null;
	this.timeout = 5000;
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Trace"] = commands_Trace;
commands_Trace.__name__ = "commands.Trace";
commands_Trace.__super__ = systems_CommandBase;
commands_Trace.prototype = $extend(systems_CommandBase.prototype,{
	timeout: null
	,haxe_version: null
	,last_cleared: null
	,update: function(_) {
		var _gthis = this;
		systems_CommandBase.prototype.update.call(this,_);
		if(this.haxe_version == null) {
			var $process = "./haxe/haxe";
			if(!sys_FileSystem.exists("./haxe/haxe")) {
				$process = "haxe";
			}
			var ls = js_node_ChildProcess.spawn($process,["--version"]);
			ls.stdout.once("data",function(data) {
				_gthis.haxe_version = data.toString().substring(0,5);
				ls.kill();
			});
		}
		var now = new Date().getTime();
		if(!(now - this.last_cleared < 604800000)) {
			this.last_cleared = now;
			var before = null;
			try {
				var path = (haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".")) + "/haxebot";
				var folders = js_node_Fs.readdirSync(path);
				var _g = 0;
				while(_g < folders.length) {
					var folder = folders[_g];
					++_g;
					before = HxOverrides.strDate(folder).getTime();
					if(now - before < 604800000) {
						continue;
					}
					var path1 = "" + path + "/" + folder;
					if(sys_FileSystem.exists(path1)) {
						var _g1 = 0;
						var _g2 = js_node_Fs.readdirSync(path1);
						while(_g1 < _g2.length) {
							var file = _g2[_g1];
							++_g1;
							var curPath = path1 + "/" + file;
							if(sys_FileSystem.isDirectory(curPath)) {
								if(sys_FileSystem.exists(curPath)) {
									var _g3 = 0;
									var _g4 = js_node_Fs.readdirSync(curPath);
									while(_g3 < _g4.length) {
										var file1 = _g4[_g3];
										++_g3;
										var curPath1 = curPath + "/" + file1;
										if(sys_FileSystem.isDirectory(curPath1)) {
											sys_FileSystem.deleteDirectory(curPath1);
										} else {
											js_node_Fs.unlinkSync(curPath1);
										}
									}
									js_node_Fs.rmdirSync(curPath);
								}
							} else {
								js_node_Fs.unlinkSync(curPath);
							}
						}
						js_node_Fs.rmdirSync(path1);
					}
				}
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g);
				haxe_Log.trace(_g1,{ fileName : "src/commands/Trace.hx", lineNumber : 59, className : "commands.Trace", methodName : "cleanDirectory"});
			}
		}
	}
	,cleanDirectory: function() {
		var now = new Date().getTime();
		if(now - this.last_cleared < 604800000) {
			return;
		}
		this.last_cleared = now;
		var before = null;
		try {
			var path = (haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".")) + "/haxebot";
			var folders = js_node_Fs.readdirSync(path);
			var _g = 0;
			while(_g < folders.length) {
				var folder = folders[_g];
				++_g;
				before = HxOverrides.strDate(folder).getTime();
				if(now - before < 604800000) {
					continue;
				}
				var path1 = "" + path + "/" + folder;
				if(sys_FileSystem.exists(path1)) {
					var _g1 = 0;
					var _g2 = js_node_Fs.readdirSync(path1);
					while(_g1 < _g2.length) {
						var file = _g2[_g1];
						++_g1;
						var curPath = path1 + "/" + file;
						if(sys_FileSystem.isDirectory(curPath)) {
							if(sys_FileSystem.exists(curPath)) {
								var _g3 = 0;
								var _g4 = js_node_Fs.readdirSync(curPath);
								while(_g3 < _g4.length) {
									var file1 = _g4[_g3];
									++_g3;
									var curPath1 = curPath + "/" + file1;
									if(sys_FileSystem.isDirectory(curPath1)) {
										sys_FileSystem.deleteDirectory(curPath1);
									} else {
										js_node_Fs.unlinkSync(curPath1);
									}
								}
								js_node_Fs.rmdirSync(curPath);
							}
						} else {
							js_node_Fs.unlinkSync(curPath);
						}
					}
					js_node_Fs.rmdirSync(path1);
				}
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g);
			haxe_Log.trace(_g1,{ fileName : "src/commands/Trace.hx", lineNumber : 59, className : "commands.Trace", methodName : "cleanDirectory"});
		}
	}
	,parseError: function(error,code) {
		var embed = new discord_$js_MessageEmbed();
		embed.setTitle("Compilation Error");
		var regex = new EReg("(Main|Test).hx:([0-9]+): characters ([0-9]+)-([0-9]+) : (.*)","gm");
		if(regex.match(error)) {
			var line = Std.parseInt(regex.matched(2));
			var start_char = Std.parseInt(regex.matched(3));
			var end_char = Std.parseInt(regex.matched(4));
			var str = "";
			var new_code = "";
			var _this = code.split("\n");
			var _g_current = 0;
			while(_g_current < _this.length) {
				var _g1_value = _this[_g_current];
				var _g1_key = _g_current++;
				if(_g1_key != line - 1) {
					new_code += _g1_value + "\n";
					continue;
				}
				var _g = 0;
				var _g1 = _g1_value.length;
				while(_g < _g1) {
					var i = _g++;
					var pos = i + 1;
					var char = _g1_value.charAt(i);
					if(pos < start_char) {
						str += char;
					} else if(pos == start_char) {
						str += "->" + char;
					} else if(pos == end_char) {
						str += "" + char + "<-";
					}
				}
				new_code += str + "\n";
			}
			if(new_code.length > 3800) {
				new_code = HxOverrides.substr(new_code,0,3800);
			}
			embed.setDescription("```hx\n" + new_code + ("``` Error\n " + error));
			return embed;
		}
		return null;
	}
	,run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 15) {
			var _g1 = _g.code;
			if(!this.isSafe(_g1,interaction)) {
				interaction.reply("That code is not safe.").then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Trace.hx", lineNumber : 107, className : "commands.Trace", methodName : "run"});
				});
				return;
			}
			this.runCode(_g1,interaction);
		}
	}
	,runCode: function(code,interaction) {
		var _gthis = this;
		var filename = "T" + new Date().getTime() + Math.floor(Math.random() * 100000);
		var final_code = this.insertLoopBreak("class " + filename + " {\n\tstatic function main() {\n\t\ttrace(" + code + ");\n\t}\n}");
		var mention = "<@" + interaction.user.id + ">";
		js_node_Fs.appendFile("" + this.get_base_path() + "/hx/" + filename + ".hx",final_code + ("\n//User:" + interaction.user.tag + " id: " + interaction.user.id + "| time: " + Std.string(new Date())),function(error) {
			if(error != null) {
				haxe_Log.trace(error,{ fileName : "src/commands/Trace.hx", lineNumber : 128, className : "commands.Trace", methodName : "runCode"});
			}
			var commands = ["-cp","" + _gthis.get_base_path() + "/hx","-main",filename,"-js","" + _gthis.get_base_path() + "/bin/" + filename + ".js"];
			var $process = "./haxe/haxe";
			if(!sys_FileSystem.exists($process)) {
				$process = "haxe";
			}
			var ls = js_node_ChildProcess.spawn($process,commands,{ timeout : _gthis.timeout});
			ls.stderr.once("data",function(data) {
				haxe_Log.trace("error: " + data,{ fileName : "src/commands/Trace.hx", lineNumber : 148, className : "commands.Trace", methodName : "runCode"});
				var compile_output = _gthis.cleanOutput(data,filename,"Main");
				var embed = _gthis.parseError(compile_output,final_code);
				if(embed == null) {
					interaction.reply({ allowedMentions : { parse : []}, content : mention + ("```\n" + compile_output + "```")}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Trace.hx", lineNumber : 157, className : "commands.Trace", methodName : "runCode"});
					});
				} else {
					embed.setDescription(_gthis.cleanOutput(embed.data.description,filename,"Main"));
					interaction.reply({ allowedMentions : { parse : []}, embeds : [embed]}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Trace.hx", lineNumber : 162, className : "commands.Trace", methodName : "runCode"});
					});
				}
				ls.kill("SIGTERM");
			});
			ls.once("close",function(data) {
				var response = "";
				var js_file = "" + _gthis.get_base_path() + "/bin/" + filename + ".js";
				if(!sys_FileSystem.exists(js_file)) {
					haxe_Log.trace("Code likely errored and didnt compile (" + filename + ".js)",{ fileName : "src/commands/Trace.hx", lineNumber : 173, className : "commands.Trace", methodName : "runCode"});
					return;
				}
				var obj = null;
				var vm = new vm2_NodeVM({ sandbox : obj, console : "redirect", timeout : _gthis.timeout});
				vm.on("console.log",function(data,info) {
					var regex = new EReg("T[0-9]*..hx:[0-9]*.: (.*)","gm");
					if(regex.match(data)) {
						data = regex.matched(1);
					}
					if(info != null) {
						response += "" + info + "\n";
						return response;
					} else {
						response += "" + data + "\n";
						return response;
					}
				});
				try {
					vm.run(js_node_Fs.readFileSync(js_file,{ encoding : "utf8"}));
					var x = response.split("\n");
					var truncated = false;
					if(x.length > 24) {
						truncated = true;
						response = "";
						var _g = 0;
						var _g1 = x.slice(x.length - 23);
						while(_g < _g1.length) {
							var line = _g1[_g];
							++_g;
							response += line + "\n";
						}
					}
					var embed = new discord_$js_MessageEmbed();
					embed.type = "article";
					var code_output = "";
					var split = response.split("\n");
					var _g_current = 0;
					var _g_array = split;
					while(_g_current < _g_array.length) {
						var _g1_value = _g_array[_g_current];
						var _g1_key = _g_current++;
						var key = _g1_key;
						var item = _g1_value;
						if(key >= split.length - 1) {
							break;
						}
						code_output += "" + (key + 1) + ". " + item + " \n";
					}
					if(truncated) {
						code_output += "\n//Output has been trimmed.";
					}
					var desc = "**Code:**\n```hx\n" + code + "``` **Output:**\n ```markdown\n" + code_output + "\n```";
					embed.setDescription(desc);
					var author = { name : "@" + interaction.user.tag, iconURL : interaction.user.displayAvatarURL()};
					embed.setAuthor(author);
					var date = new Date(interaction.createdTimestamp);
					var format_date = DateTools.format(date,"%d-%m-%Y %H:%M:%S");
					embed.setFooter({ text : "Haxe " + _gthis.haxe_version, iconURL : "https://cdn.discordapp.com/emojis/567741748172816404.png?v=1"});
					if(response.length > 0 && data == 0) {
						interaction.reply({ allowedMentions : { parse : []}, embeds : [embed]}).then(function(succ) {
							haxe_Log.trace("" + interaction.user.tag + "(" + interaction.user.id + ") at " + format_date + " with file id: " + filename,{ fileName : "src/commands/Trace.hx", lineNumber : 247, className : "commands.Trace", methodName : "runCode"});
						},function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Trace.hx", lineNumber : 251, className : "commands.Trace", methodName : "runCode"});
							$global.console.dir(err);
						});
						ls.kill();
						return;
					}
				} catch( _g ) {
					var e = haxe_Exception.caught(_g);
					var compile_output = _gthis.cleanOutput(e.get_message(),filename,"Main");
					interaction.reply({ allowedMentions : { parse : []}, content : mention + ("```\n" + compile_output + "```")}).then(null,function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Trace.hx", lineNumber : 262, className : "commands.Trace", methodName : "runCode"});
					});
					haxe_Log.trace(e,{ fileName : "src/commands/Trace.hx", lineNumber : 263, className : "commands.Trace", methodName : "runCode"});
				}
			});
		});
	}
	,get_base_path: function() {
		var path = haxe_io_Path.isAbsolute(".") ? "." : js_node_Path.resolve(".");
		if(!sys_FileSystem.exists(path + "/haxebot")) {
			sys_FileSystem.createDirectory(path + "/haxebot");
		}
		path += "/haxebot";
		var date = DateTools.format(new Date(),"%F");
		path += "/" + date;
		if(!sys_FileSystem.exists(path)) {
			sys_FileSystem.createDirectory(path);
		}
		if(!sys_FileSystem.exists(path + "/hx")) {
			sys_FileSystem.createDirectory(path + "/hx");
		}
		if(!sys_FileSystem.exists(path + "/bin")) {
			sys_FileSystem.createDirectory(path + "/bin");
		}
		return path;
	}
	,cleanOutput: function(data,filename,class_entry) {
		data = data.toString();
		new RegExp("(\\[(.*|vm)\\].*)$","igmu".split("u").join(""));
		data = StringTools.replace(StringTools.replace(data,filename,class_entry),"\x1B","");
		data = StringTools.replace(data,this.get_base_path(),"");
		data = StringTools.replace(data,"/hx/","");
		data = StringTools.replace(data,"/bin/","");
		return data;
	}
	,insertLoopBreak: function(code) {
		var varname = "";
		var regex = new EReg("(while\\s*\\(.*\\)\\s*\\{|while\\s*\\(.*?\\))","gmui");
		var copy = code;
		var matched = [];
		while(regex.match(code)) {
			matched.push(regex.matched(1));
			code = regex.matchedRight();
		}
		var _g = 0;
		while(_g < matched.length) {
			var match = matched[_g];
			++_g;
			varname = "___" + util_Random.string(6);
			var start = "final " + varname + " = Date.now().getTime();";
			var condition = "if (Date.now().getTime() - " + varname + " > " + this.timeout + ") { break; }";
			copy = StringTools.replace(copy,match,start + "\n" + match + "\n" + condition);
		}
		return copy;
	}
	,isSafe: function(code,response) {
		var check_http = new EReg("haxe.http|haxe.Http","gmu");
		if(check_http.match(code)) {
			return false;
		}
		if(!Main.state.macros) {
			if(new EReg("@:.*[bB]uild","igmu").match(code)) {
				response.reply({ content : "Currently no build macros allowed"});
				return false;
			}
		} else if(code.indexOf("macro") != -1 || new EReg("macro|@:.*[bB]uild","igmu").match(code)) {
			return false;
		}
		return !new EReg("(sys|((\"|')s(.*)y(.*)(\"|')s(\"|'))|eval|command|syntax.|require|location|untyped|@:.*[bB]uild)","igmu").match(code);
	}
	,get_name: function() {
		return "trace";
	}
	,__class__: commands_Trace
	,__properties__: $extend(systems_CommandBase.prototype.__properties__,{get_base_path:"get_base_path"})
});
var commands_Translate = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["commands.Translate"] = commands_Translate;
commands_Translate.__name__ = "commands.Translate";
commands_Translate.__super__ = systems_CommandBase;
commands_Translate.prototype = $extend(systems_CommandBase.prototype,{
	usage: null
	,onEnabled: function() {
		this.getCount();
	}
	,run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 20) {
			var _g1 = _g.message;
			if(this.usage == null) {
				interaction.reply("An error occured");
				return;
			}
			if(this.usage.character_count + _g1.length > this.usage.character_limit) {
				interaction.reply("API has reached its limit unfortunately. Please wait till next month.");
				return;
			}
			this.getTranslation(interaction,_g.from,_g.to,_g1);
		}
	}
	,getCount: function() {
		var _gthis = this;
		externs_Fetch("https://api-free.deepl.com" + "/v2/usage",{ method : "GET", headers : { "Authorization" : "DeepL-Auth-Key " + Main.keys.deepl_key}}).then(function(resp) {
			return resp.json().then(function(body) {
				_gthis.usage = body;
				haxe_Log.trace("Character count: " + _gthis.usage.character_count + "/" + _gthis.usage.character_limit,{ fileName : "src/commands/Translate.hx", lineNumber : 39, className : "commands.Translate", methodName : "getCount"});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Translate.hx", lineNumber : 43, className : "commands.Translate", methodName : "getCount"});
				$global.console.dir(err);
			});
		});
	}
	,getTranslation: function(interaction,from,to,message) {
		var _gthis = this;
		if(from == null) {
			from = "";
		}
		try {
			externs_Fetch("https://api-free.deepl.com" + ("/v2/translate?source_lang=" + from + "&target_lang=" + to + "&text=" + message),{ method : "GET", headers : { "Authorization" : "DeepL-Auth-Key " + Main.keys.deepl_key}}).then(function(resp) {
				return resp.json().then(function(body) {
					var content = "";
					var _g = 0;
					var _g1 = body.translations;
					while(_g < _g1.length) {
						var item = _g1[_g];
						++_g;
						content += item.text + "\n";
					}
					interaction.reply(content).then(function(_) {
						_gthis.getCount();
					},function(err) {
						haxe_Log.trace(err,{ fileName : "src/commands/Translate.hx", lineNumber : 66, className : "commands.Translate", methodName : "getTranslation"});
						$global.console.dir(err);
					});
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Translate.hx", lineNumber : 70, className : "commands.Translate", methodName : "getTranslation"});
					$global.console.dir(err);
				});
			});
		} catch( _g ) {
			var e = haxe_Exception.caught(_g);
			haxe_Log.trace("Deepl error",{ fileName : "src/commands/Translate.hx", lineNumber : 75, className : "commands.Translate", methodName : "getTranslation"});
			haxe_Log.trace($bind(e,e.details),{ fileName : "src/commands/Translate.hx", lineNumber : 76, className : "commands.Translate", methodName : "getTranslation"});
			haxe_Log.trace(e.get_message(),{ fileName : "src/commands/Translate.hx", lineNumber : 77, className : "commands.Translate", methodName : "getTranslation"});
			haxe_Log.trace(e,{ fileName : "src/commands/Translate.hx", lineNumber : 78, className : "commands.Translate", methodName : "getTranslation"});
			interaction.reply("Deepl error?").then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Translate.hx", lineNumber : 80, className : "commands.Translate", methodName : "getTranslation"});
				$global.console.dir(err);
			});
		}
	}
	,getLanguages: function() {
		externs_Fetch("https://api-free.deepl.com" + "/v2/languages",{ method : "GET", headers : { "Authorization" : "DeepL-Auth-Key " + Main.keys.deepl_key}}).then(function(resp) {
			return resp.json().then(function(body) {
				var str = "[";
				var _g = 0;
				while(_g < body.length) {
					var item = body[_g];
					++_g;
					str += "{\r\n\t\t\t\t\t\t\"name\": \"" + item.name + "\",\r\n\t\t\t\t\t\t\"value\": \"" + item.language + "\"\r\n\t\t\t\t\t},";
				}
				str += "]";
				haxe_Log.trace(str,{ fileName : "src/commands/Translate.hx", lineNumber : 97, className : "commands.Translate", methodName : "getLanguages"});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Translate.hx", lineNumber : 99, className : "commands.Translate", methodName : "getLanguages"});
				$global.console.dir(err);
			});
		});
	}
	,request: function(endpoint) {
		return externs_Fetch("https://api-free.deepl.com" + endpoint,{ method : "GET", headers : { "Authorization" : "DeepL-Auth-Key " + Main.keys.deepl_key}});
	}
	,get_name: function() {
		return "translate";
	}
	,__class__: commands_Translate
});
var commands__$Twitter_Response = {};
commands__$Twitter_Response.__properties__ = {get_users:"get_users",get_tweets:"get_tweets"};
commands__$Twitter_Response.getUser = function(this1,tweet) {
	if(commands__$Twitter_Response.get_users(this1) != null) {
		var _g = 0;
		var _g1 = commands__$Twitter_Response.get_users(this1);
		while(_g < _g1.length) {
			var user = _g1[_g];
			++_g;
			if(tweet.author_id == user.id) {
				return user;
			}
		}
	}
	return null;
};
commands__$Twitter_Response.createLinks = function(this1) {
	var urls = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = commands__$Twitter_Response.get_tweets(this1);
	while(_g < _g1.length) {
		var tweet = _g1[_g];
		++_g;
		var user = commands__$Twitter_Response.getUser(this1,tweet);
		urls.h[tweet.id] = "https://fxtwitter.com/" + user.username + "/status/" + tweet.id;
	}
	return urls;
};
commands__$Twitter_Response.createLink = function(user,id) {
	return "https://fxtwitter.com/" + user + "/status/" + id;
};
commands__$Twitter_Response.get_tweets = function(this1) {
	return this1.data;
};
commands__$Twitter_Response.get_users = function(this1) {
	return this1.includes.users;
};
var commands_Twitter = function(_universe) {
	this.start_timer = false;
	this.ignore = [];
	this.users = [];
	this.tags = [];
	this.checking = false;
	this.twitter_links = [];
	var this1 = new Array(6);
	this.async_check = this1;
	this.channel_id = "1030188275341729882";
	this.ping_rate = 3600000;
	this.tweets = new haxe_ds_StringMap();
	systems_CommandDbBase.call(this,_universe);
};
$hxClasses["commands.Twitter"] = commands_Twitter;
commands_Twitter.__name__ = "commands.Twitter";
commands_Twitter.__super__ = systems_CommandDbBase;
commands_Twitter.prototype = $extend(systems_CommandDbBase.prototype,{
	tweets: null
	,ping_rate: null
	,channel: null
	,channel_id: null
	,async_check: null
	,twitter_links: null
	,checking: null
	,tags: null
	,users: null
	,ignore: null
	,start_timer: null
	,onEnabled: function() {
		var _gthis = this;
		this.ignore.push("first_issues");
		var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/social");
		firebase_web_firestore_Firestore.onSnapshot(doc,function(update) {
			_gthis.tags = update.data().twitter_tags;
			_gthis.users = update.data().twitter_users;
			var this1 = new Array(_gthis.tags.length);
			_gthis.async_check = this1;
			var _g_current = 0;
			var _g_array = _gthis.tags;
			while(_g_current < _g_array.length) {
				var _g1_key = _g_current++;
				var k = _g1_key;
				_gthis.async_check[k] = false;
			}
			if(!_gthis.start_timer) {
				_gthis.start_timer = true;
				var _gthis1 = _gthis;
				haxe_Log.trace("started",{ fileName : "src/commands/Twitter.hx", lineNumber : 105, className : "commands.Twitter", methodName : "poll"});
				var checker = new haxe_Timer(_gthis.ping_rate | 0);
				checker.run = function() {
					if(Main.connected && !_gthis1.checking && _gthis1.channel != null) {
						_gthis1.checking = true;
						var _g_current = 0;
						var _g_array = _gthis1.tags;
						while(_g_current < _g_array.length) {
							var _g1_value = _g_array[_g_current];
							var _g1_key = _g_current++;
							var k = [_g1_key];
							var query = _g1_value;
							var url = ["https://api.twitter.com/2/tweets/search/recent?tweet.fields=created_at&user.fields=name&expansions=author_id&max_results=25"];
							if(Main.state.twitter_since_id != "") {
								url[0] += "&since_id=" + Main.state.twitter_since_id;
							}
							query += " -is:retweet";
							url[0] += "&query=" + encodeURIComponent(query);
							externs_Fetch(url[0],{ headers : { Authorization : "Bearer " + Main.keys.twitter_token}, method : "GET"}).then((function(url,k) {
								return function(succ) {
									succ.json().then((function(url,k) {
										return function(json) {
											try {
												if(json.meta.result_count > 0) {
													var h = commands__$Twitter_Response.createLinks(json).h;
													var tweet_h = h;
													var tweet_keys = Object.keys(h);
													var tweet_length = tweet_keys.length;
													var tweet_current = 0;
													while(tweet_current < tweet_length) {
														var tweet = tweet_h[tweet_keys[tweet_current++]];
														_gthis1.twitter_links.push(tweet);
													}
												}
												_gthis1.removeDupes();
											} catch( _g ) {
												var e = haxe_Exception.caught(_g);
												haxe_Log.trace(Main.state.twitter_since_id,{ fileName : "src/commands/Twitter.hx", lineNumber : 134, className : "commands.Twitter", methodName : "poll"});
												haxe_Log.trace(url[0],{ fileName : "src/commands/Twitter.hx", lineNumber : 135, className : "commands.Twitter", methodName : "poll"});
												haxe_Log.trace(e,{ fileName : "src/commands/Twitter.hx", lineNumber : 136, className : "commands.Twitter", methodName : "poll"});
												haxe_Log.trace(json,{ fileName : "src/commands/Twitter.hx", lineNumber : 137, className : "commands.Twitter", methodName : "poll"});
											}
											_gthis1.async_check[k[0]] = true;
											_gthis1.checking = false;
										};
									})(url,k),(function() {
										return function(err) {
											haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 142, className : "commands.Twitter", methodName : "poll"});
											$global.console.dir(err);
										};
									})());
								};
							})(url,k),(function() {
								return function(err) {
									haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 146, className : "commands.Twitter", methodName : "poll"});
									$global.console.dir(err);
								};
							})());
						}
					}
				};
			}
		});
	}
	,poll: function() {
		var _gthis = this;
		haxe_Log.trace("started",{ fileName : "src/commands/Twitter.hx", lineNumber : 105, className : "commands.Twitter", methodName : "poll"});
		var checker = new haxe_Timer(this.ping_rate | 0);
		checker.run = function() {
			if(Main.connected && !_gthis.checking && _gthis.channel != null) {
				_gthis.checking = true;
				var _g_current = 0;
				var _g_array = _gthis.tags;
				while(_g_current < _g_array.length) {
					var _g1_value = _g_array[_g_current];
					var _g1_key = _g_current++;
					var k = [_g1_key];
					var query = _g1_value;
					var url = ["https://api.twitter.com/2/tweets/search/recent?tweet.fields=created_at&user.fields=name&expansions=author_id&max_results=25"];
					if(Main.state.twitter_since_id != "") {
						url[0] += "&since_id=" + Main.state.twitter_since_id;
					}
					query += " -is:retweet";
					url[0] += "&query=" + encodeURIComponent(query);
					externs_Fetch(url[0],{ headers : { Authorization : "Bearer " + Main.keys.twitter_token}, method : "GET"}).then((function(url,k) {
						return function(succ) {
							succ.json().then((function(url,k) {
								return function(json) {
									try {
										if(json.meta.result_count > 0) {
											var h = commands__$Twitter_Response.createLinks(json).h;
											var tweet_h = h;
											var tweet_keys = Object.keys(h);
											var tweet_length = tweet_keys.length;
											var tweet_current = 0;
											while(tweet_current < tweet_length) {
												var tweet = tweet_h[tweet_keys[tweet_current++]];
												_gthis.twitter_links.push(tweet);
											}
										}
										_gthis.removeDupes();
									} catch( _g ) {
										var e = haxe_Exception.caught(_g);
										haxe_Log.trace(Main.state.twitter_since_id,{ fileName : "src/commands/Twitter.hx", lineNumber : 134, className : "commands.Twitter", methodName : "poll"});
										haxe_Log.trace(url[0],{ fileName : "src/commands/Twitter.hx", lineNumber : 135, className : "commands.Twitter", methodName : "poll"});
										haxe_Log.trace(e,{ fileName : "src/commands/Twitter.hx", lineNumber : 136, className : "commands.Twitter", methodName : "poll"});
										haxe_Log.trace(json,{ fileName : "src/commands/Twitter.hx", lineNumber : 137, className : "commands.Twitter", methodName : "poll"});
									}
									_gthis.async_check[k[0]] = true;
									_gthis.checking = false;
								};
							})(url,k),(function() {
								return function(err) {
									haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 142, className : "commands.Twitter", methodName : "poll"});
									$global.console.dir(err);
								};
							})());
						};
					})(url,k),(function() {
						return function(err) {
							haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 146, className : "commands.Twitter", methodName : "poll"});
							$global.console.dir(err);
						};
					})());
				}
			}
		};
	}
	,removeDupes: function() {
		var list = [];
		var _g = 0;
		var _g1 = this.twitter_links;
		while(_g < _g1.length) {
			var link = _g1[_g];
			++_g;
			var block = false;
			var _g2 = 0;
			var _g3 = this.ignore;
			while(_g2 < _g3.length) {
				var account = _g3[_g2];
				++_g2;
				if(link.indexOf("/" + account + "/") != -1) {
					block = true;
					break;
				}
			}
			if(block) {
				continue;
			}
			if(list.indexOf(link) == -1) {
				list.push(link);
			}
		}
		this.twitter_links = list;
	}
	,update: function(_) {
		var _gthis = this;
		systems_CommandDbBase.prototype.update.call(this,_);
		if(!Main.connected) {
			return;
		}
		var check = true;
		var _g = 0;
		var _g1 = this.async_check;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			if(!v) {
				check = false;
				break;
			}
		}
		if(check && this.twitter_links.length > 0) {
			this.twitter_links.sort(function(a,b) {
				var split_a = a.split("/");
				var split_b = b.split("/");
				var x = Std.parseInt(split_a[split_a.length - 1]);
				var y = Std.parseInt(split_b[split_b.length - 1]);
				if(x > y) {
					return 1;
				}
				if(x < y) {
					return -1;
				}
				return 0;
			});
			var _g = 0;
			var _g1 = this.twitter_links;
			while(_g < _g1.length) {
				var link = _g1[_g];
				++_g;
				this.channel.send({ content : link}).then(null,function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 208, className : "commands.Twitter", methodName : "update"});
					$global.console.dir(err);
				});
			}
			var _g4_current = 0;
			var _g4_array = this.tags;
			while(_g4_current < _g4_array.length) {
				var _g5_key = _g4_current++;
				var k = _g5_key;
				this.async_check[k] = false;
			}
			var split = this.twitter_links[this.twitter_links.length - 1].split("/");
			var value = split[split.length - 1];
			Main.state.twitter_since_id = value;
			Main.updateState();
			this.twitter_links = [];
		}
		if(check && this.twitter_links.length == 0) {
			var _g2_current = 0;
			var _g2_array = this.tags;
			while(_g2_current < _g2_array.length) {
				var _g3_key = _g2_current++;
				var k = _g3_key;
				this.async_check[k] = false;
			}
		}
		if(!this.checking && this.channel == null) {
			this.checking = true;
			Main.client.channels.fetch(this.channel_id).then(function(succ) {
				_gthis.channel = succ;
				_gthis.checking = false;
				haxe_Log.trace("Found twitter thread",{ fileName : "src/commands/Twitter.hx", lineNumber : 233, className : "commands.Twitter", methodName : "update"});
			},function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/Twitter.hx", lineNumber : 235, className : "commands.Twitter", methodName : "update"});
				$global.console.dir(err);
			});
		}
	}
	,run: function(command,interaction) {
	}
	,get_since_id: function() {
		return Main.state.twitter_since_id;
	}
	,set_since_id: function(value) {
		Main.state.twitter_since_id = value;
		Main.updateState();
		return value;
	}
	,get_name: function() {
		return "twitter";
	}
	,__class__: commands_Twitter
	,__properties__: $extend(systems_CommandDbBase.prototype.__properties__,{set_since_id:"set_since_id",get_since_id:"get_since_id"})
});
var commands_events_PinMessageInfo = function(_universe) {
	this.messages = [];
	ecs_System.call(this,_universe);
	this.threads = this.universe.families.get(0);
	this.table77d573418a21d66427b12280fbf7836b = this.universe.components.getTable(1);
	this.table87a8f92f715c03d0822a55d9b93a210d = this.universe.components.getTable(0);
};
$hxClasses["commands.events.PinMessageInfo"] = commands_events_PinMessageInfo;
commands_events_PinMessageInfo.__name__ = "commands.events.PinMessageInfo";
commands_events_PinMessageInfo.__super__ = ecs_System;
commands_events_PinMessageInfo.prototype = $extend(ecs_System.prototype,{
	messages: null
	,update: function(_dt) {
		var _gthis = this;
		var _this = this.threads;
		var _set = _this.entities;
		var _g_set = _set;
		var _g_active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_g_active && _g_idx >= 0) {
			var entity = _g_set.getDense(_g_idx--);
			var thread = this.table77d573418a21d66427b12280fbf7836b.get(entity);
			var command = this.table87a8f92f715c03d0822a55d9b93a210d.get(entity);
			if(command == "thread_pin_message") {
				var now = new Date().getTime();
				if(now - thread.createdTimestamp < 10000) {
					continue;
				}
				thread.send({ content : "<@" + thread.ownerId + "> You can pin messages in your own threads by Right clicking a message -> Apps -> Pin Message\n\n*This message will selfdestruct in 30 seconds.*"}).then(function(message) {
					_gthis.messages.push(message);
				},function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/events/PinMessageInfo.hx", lineNumber : 27, className : "commands.events.PinMessageInfo", methodName : "update"});
					$global.console.dir(err);
				});
				this.universe.deleteEntity(entity);
			}
		}
		var now = new Date().getTime();
		var _g = 0;
		var _g1 = this.messages;
		while(_g < _g1.length) {
			var message = [_g1[_g]];
			++_g;
			if(now - message[0].createdTimestamp < 30000) {
				continue;
			}
			message[0].delete().then((function(message) {
				return function(_) {
					HxOverrides.remove(_gthis.messages,message[0]);
				};
			})(message),(function() {
				return function(err) {
					haxe_Log.trace(err,{ fileName : "src/commands/events/PinMessageInfo.hx", lineNumber : 42, className : "commands.events.PinMessageInfo", methodName : "update"});
				};
			})());
		}
	}
	,threads: null
	,table77d573418a21d66427b12280fbf7836b: null
	,table87a8f92f715c03d0822a55d9b93a210d: null
	,__class__: commands_events_PinMessageInfo
});
var commands_mod_Mention = function(_universe) {
	systems_CommandDbBase.call(this,_universe);
};
$hxClasses["commands.mod.Mention"] = commands_mod_Mention;
commands_mod_Mention.__name__ = "commands.mod.Mention";
commands_mod_Mention.__super__ = systems_CommandDbBase;
commands_mod_Mention.prototype = $extend(systems_CommandDbBase.prototype,{
	run: function(command,interaction) {
		var _gthis = this;
		var _g = command.content;
		if(_g._hx_index == 31) {
			var user = _g.user;
			var role = _g.role;
			var query = firebase_web_firestore_Firestore.query(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/admin/mentions"),firebase_web_firestore_Firestore.where("user","==",user.id));
			firebase_web_firestore_Firestore.getDocs(query).then(function(resp) {
				var obj = { user : user.id, roles : [role.id], added_by_name : interaction.user.tag, added_by_id : interaction.user.id, timestamp : new Date().getTime()};
				var found = -1;
				if(!resp.empty) {
					obj = resp.docs[0].data();
					var _this = obj.roles;
					var _g_current = 0;
					while(_g_current < _this.length) {
						var _g1_value = _this[_g_current];
						var _g1_key = _g_current++;
						if(_g1_value == role.id) {
							found = _g1_key;
							break;
						}
					}
					if(found != -1) {
						HxOverrides.remove(obj.roles,role.id);
					} else {
						obj.roles.push(role.id);
					}
				}
				if(resp.empty) {
					firebase_web_firestore_Firestore.addDoc(firebase_web_firestore_Firestore.collection(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/admin/mentions"),obj).then(function(_) {
						var embed = _gthis.embed(role,found != -1);
						interaction.reply({ content : "<@" + user.id + ">", embeds : [embed]});
					});
				} else {
					firebase_web_firestore_Firestore.updateDoc(resp.docs[0].ref,obj).then(function(_) {
						var embed = _gthis.embed(role,found != -1);
						interaction.reply({ content : "<@" + user.id + ">", embeds : [embed]});
					});
				}
			});
		}
	}
	,embed: function(role,found) {
		var embed = new discord_$js_MessageEmbed();
		var desc = "Role " + role.name + " removed from user";
		if(!found) {
			desc = "You can now use the `!mention` text command to ping the members of the <@&" + role.id + "> role!\n";
			desc += "**Example:**```\n!mention @" + role.name + " Hey I just updated things! Check it out and vote for the next feature!```";
			desc += "Currently this does not support attachments, so send any attachments before/after the !mention command";
		}
		embed.setTitle("Permission Update");
		embed.setDescription(desc);
		return embed;
	}
	,parseTwitter: function(interaction,tag,user) {
		if(tag == null && user == null) {
			interaction.reply("Invalid input").then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/mod/Mention.hx", lineNumber : 79, className : "commands.mod.Mention", methodName : "parseTwitter"});
				$global.console.dir(err);
			});
			return;
		}
		if(tag != null) {
			var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/social");
			firebase_web_firestore_Firestore.updateDoc(doc,{ twitter_tags : firebase_web_firestore_Firestore.arrayUnion(tag)}).then(function(_) {
				if(!interaction.replied) {
					interaction.reply("Updated collection!");
				}
			});
		}
		if(user != null) {
			var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/social");
			firebase_web_firestore_Firestore.updateDoc(doc,{ twitter_users : firebase_web_firestore_Firestore.arrayUnion(user)}).then(function(_) {
				if(!interaction.replied) {
					interaction.reply("Updated collection!");
				}
			});
		}
	}
	,get_name: function() {
		return "mention";
	}
	,__class__: commands_mod_Mention
});
var commands_mod_Social = function(_universe) {
	systems_CommandDbBase.call(this,_universe);
};
$hxClasses["commands.mod.Social"] = commands_mod_Social;
commands_mod_Social.__name__ = "commands.mod.Social";
commands_mod_Social.__super__ = systems_CommandDbBase;
commands_mod_Social.prototype = $extend(systems_CommandDbBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 9) {
			this.parseTwitter(interaction,_g.tag,_g.user);
		}
	}
	,parseTwitter: function(interaction,tag,user) {
		if(tag == null && user == null) {
			interaction.reply("Invalid input").then(null,function(err) {
				haxe_Log.trace(err,{ fileName : "src/commands/mod/Social.hx", lineNumber : 20, className : "commands.mod.Social", methodName : "parseTwitter"});
				$global.console.dir(err);
			});
			return;
		}
		if(tag != null) {
			var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/social");
			firebase_web_firestore_Firestore.updateDoc(doc,{ twitter_tags : firebase_web_firestore_Firestore.arrayUnion(tag)}).then(function(_) {
				if(!interaction.replied) {
					interaction.reply("Updated collection!");
				}
			});
		}
		if(user != null) {
			var doc = firebase_web_firestore_Firestore.doc(firebase_web_firestore_Firestore.getFirestore(firebase_web_app_FirebaseApp.getApp()),"discord/social");
			firebase_web_firestore_Firestore.updateDoc(doc,{ twitter_users : firebase_web_firestore_Firestore.arrayUnion(user)}).then(function(_) {
				if(!interaction.replied) {
					interaction.reply("Updated collection!");
				}
			});
		}
	}
	,get_name: function() {
		return "social";
	}
	,__class__: commands_mod_Social
});
var commands_types_Duration = {};
commands_types_Duration._new = function(value) {
	return value;
};
commands_types_Duration.fromString = function(input) {
	var time = 0.;
	var min_regex = new EReg("([0-9]+)[ ]?(m|min|mins)\\b","gi");
	if(min_regex.match(input)) {
		var num = parseFloat(min_regex.matched(1));
		time = num * 60000;
	}
	var hour_regex = new EReg("([0-9]+)[ ]?(h|hr|hrs|hours)\\b","gi");
	if(hour_regex.match(input)) {
		var num = parseFloat(hour_regex.matched(1));
		time = num * 3600000;
	}
	var day_regex = new EReg("([0-9]+)[ ]?(d|day|days)\\b","gi");
	if(day_regex.match(input)) {
		var num = parseFloat(day_regex.matched(1));
		time = num * 86400000;
	}
	var week_regex = new EReg("([0-9]+)[ ]?(w|wk|wks|week|weeks)\\b","gi");
	if(week_regex.match(input)) {
		var num = parseFloat(week_regex.matched(1));
		time = num * 604800000;
	}
	var month_regex = new EReg("([0-9]+)[ ]?(mo|mos|mths|month|months)\\b","gi");
	if(month_regex.match(input)) {
		var num = parseFloat(month_regex.matched(1));
		time = num * 2419200000;
	}
	return commands_types_Duration._new(time);
};
var components_CommandOptions = $hxEnums["components.CommandOptions"] = { __ename__:"components.CommandOptions",__constructs__:null
	,Hi: {_hx_name:"Hi",_hx_index:0,__enum__:"components.CommandOptions",toString:$estr}
	,Archive: {_hx_name:"Archive",_hx_index:1,__enum__:"components.CommandOptions",toString:$estr}
	,SnippetTags: {_hx_name:"SnippetTags",_hx_index:2,__enum__:"components.CommandOptions",toString:$estr}
	,SnippetList: ($_=function(user,show_desc) { return {_hx_index:3,user:user,show_desc:show_desc,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="SnippetList",$_.__params__ = ["user","show_desc"],$_)
	,SnippetEdit: ($_=function(id) { return {_hx_index:4,id:id,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="SnippetEdit",$_.__params__ = ["id"],$_)
	,SnippetDelete: ($_=function(id) { return {_hx_index:5,id:id,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="SnippetDelete",$_.__params__ = ["id"],$_)
	,SnippetSearch: ($_=function(taga,tagb,tagc) { return {_hx_index:6,taga:taga,tagb:tagb,tagc:tagc,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="SnippetSearch",$_.__params__ = ["taga","tagb","tagc"],$_)
	,SnippetAdd: ($_=function(url,title,description,taga,tagb,tagc,tagd,tage) { return {_hx_index:7,url:url,title:title,description:description,taga:taga,tagb:tagb,tagc:tagc,tagd:tagd,tage:tage,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="SnippetAdd",$_.__params__ = ["url","title","description","taga","tagb","tagc","tagd","tage"],$_)
	,Reminder: ($_=function(content,when,personal,thread_reply) { return {_hx_index:8,content:content,when:when,personal:personal,thread_reply:thread_reply,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Reminder",$_.__params__ = ["content","when","personal","thread_reply"],$_)
	,Social: ($_=function(tag,user) { return {_hx_index:9,tag:tag,user:user,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Social",$_.__params__ = ["tag","user"],$_)
	,Ban: ($_=function(user,reason,delete_messages) { return {_hx_index:10,user:user,reason:reason,delete_messages:delete_messages,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Ban",$_.__params__ = ["user","reason","delete_messages"],$_)
	,Say: ($_=function(message,message_id) { return {_hx_index:11,message:message,message_id:message_id,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Say",$_.__params__ = ["message","message_id"],$_)
	,React: ($_=function(message_id,emoji) { return {_hx_index:12,message_id:message_id,emoji:emoji,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="React",$_.__params__ = ["message_id","emoji"],$_)
	,Helppls: ($_=function(topic) { return {_hx_index:13,topic:topic,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Helppls",$_.__params__ = ["topic"],$_)
	,Run: ($_=function(code) { return {_hx_index:14,code:code,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Run",$_.__params__ = ["code"],$_)
	,Trace: ($_=function(code) { return {_hx_index:15,code:code,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Trace",$_.__params__ = ["code"],$_)
	,Boop: ($_=function(user) { return {_hx_index:16,user:user,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Boop",$_.__params__ = ["user"],$_)
	,Poll: ($_=function(question,length,a,b,c,d,e,f,g,votes) { return {_hx_index:17,question:question,length:length,a:a,b:b,c:c,d:d,e:e,f:f,g:g,votes:votes,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Poll",$_.__params__ = ["question","length","a","b","c","d","e","f","g","votes"],$_)
	,Roundup: ($_=function(number) { return {_hx_index:18,number:number,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Roundup",$_.__params__ = ["number"],$_)
	,Rtfm: ($_=function(channel) { return {_hx_index:19,channel:channel,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Rtfm",$_.__params__ = ["channel"],$_)
	,Translate: ($_=function(to,message,from) { return {_hx_index:20,to:to,message:message,from:from,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Translate",$_.__params__ = ["to","message","from"],$_)
	,Helpdescription: ($_=function(description) { return {_hx_index:21,description:description,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Helpdescription",$_.__params__ = ["description"],$_)
	,Api: ($_=function(content,field) { return {_hx_index:22,content:content,field:field,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Api",$_.__params__ = ["content","field"],$_)
	,Notify: ($_=function(channel) { return {_hx_index:23,channel:channel,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Notify",$_.__params__ = ["channel"],$_)
	,Help: ($_=function(category) { return {_hx_index:24,category:category,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Help",$_.__params__ = ["category"],$_)
	,Haxelib: ($_=function(command) { return {_hx_index:25,command:command,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Haxelib",$_.__params__ = ["command"],$_)
	,QuoteList: ($_=function(user) { return {_hx_index:26,user:user,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="QuoteList",$_.__params__ = ["user"],$_)
	,QuoteGet: ($_=function(name) { return {_hx_index:27,name:name,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="QuoteGet",$_.__params__ = ["name"],$_)
	,QuoteDelete: ($_=function(name) { return {_hx_index:28,name:name,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="QuoteDelete",$_.__params__ = ["name"],$_)
	,QuoteEdit: ($_=function(name) { return {_hx_index:29,name:name,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="QuoteEdit",$_.__params__ = ["name"],$_)
	,QuoteCreate: ($_=function(name) { return {_hx_index:30,name:name,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="QuoteCreate",$_.__params__ = ["name"],$_)
	,Mention: ($_=function(user,role) { return {_hx_index:31,user:user,role:role,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Mention",$_.__params__ = ["user","role"],$_)
	,Showcase: {_hx_name:"Showcase",_hx_index:32,__enum__:"components.CommandOptions",toString:$estr}
	,PinMessage: {_hx_name:"PinMessage",_hx_index:33,__enum__:"components.CommandOptions",toString:$estr}
	,Code: {_hx_name:"Code",_hx_index:34,__enum__:"components.CommandOptions",toString:$estr}
	,CodeLineNumbers: {_hx_name:"CodeLineNumbers",_hx_index:35,__enum__:"components.CommandOptions",toString:$estr}
};
components_CommandOptions.__constructs__ = [components_CommandOptions.Hi,components_CommandOptions.Archive,components_CommandOptions.SnippetTags,components_CommandOptions.SnippetList,components_CommandOptions.SnippetEdit,components_CommandOptions.SnippetDelete,components_CommandOptions.SnippetSearch,components_CommandOptions.SnippetAdd,components_CommandOptions.Reminder,components_CommandOptions.Social,components_CommandOptions.Ban,components_CommandOptions.Say,components_CommandOptions.React,components_CommandOptions.Helppls,components_CommandOptions.Run,components_CommandOptions.Trace,components_CommandOptions.Boop,components_CommandOptions.Poll,components_CommandOptions.Roundup,components_CommandOptions.Rtfm,components_CommandOptions.Translate,components_CommandOptions.Helpdescription,components_CommandOptions.Api,components_CommandOptions.Notify,components_CommandOptions.Help,components_CommandOptions.Haxelib,components_CommandOptions.QuoteList,components_CommandOptions.QuoteGet,components_CommandOptions.QuoteDelete,components_CommandOptions.QuoteEdit,components_CommandOptions.QuoteCreate,components_CommandOptions.Mention,components_CommandOptions.Showcase,components_CommandOptions.PinMessage,components_CommandOptions.Code,components_CommandOptions.CodeLineNumbers];
components_CommandOptions.__empty_constructs__ = [components_CommandOptions.Hi,components_CommandOptions.Archive,components_CommandOptions.SnippetTags,components_CommandOptions.Showcase,components_CommandOptions.PinMessage,components_CommandOptions.Code,components_CommandOptions.CodeLineNumbers];
var components_ShowcaseModalSubmit = function(title,description) {
	this.title_or_link = title;
	this.description = description;
};
$hxClasses["components.ShowcaseModalSubmit"] = components_ShowcaseModalSubmit;
components_ShowcaseModalSubmit.__name__ = "components.ShowcaseModalSubmit";
components_ShowcaseModalSubmit.prototype = {
	title_or_link: null
	,description: null
	,__class__: components_ShowcaseModalSubmit
};
var components_TextCommand = {};
components_TextCommand.list = function() {
	return ["!mention","!run"];
};
var discord_$builder_APIBaseComponent = function() { };
$hxClasses["discord_builder.APIBaseComponent"] = discord_$builder_APIBaseComponent;
discord_$builder_APIBaseComponent.__name__ = "discord_builder.APIBaseComponent";
discord_$builder_APIBaseComponent.prototype = {
	type: null
	,__class__: discord_$builder_APIBaseComponent
};
var discord_$builder_APIActionRowComponent = function() {
	this.components = [];
	this.type = 1;
};
$hxClasses["discord_builder.APIActionRowComponent"] = discord_$builder_APIActionRowComponent;
discord_$builder_APIActionRowComponent.__name__ = "discord_builder.APIActionRowComponent";
discord_$builder_APIActionRowComponent.__super__ = discord_$builder_APIBaseComponent;
discord_$builder_APIActionRowComponent.prototype = $extend(discord_$builder_APIBaseComponent.prototype,{
	components: null
	,addComponents: function() {
		var $l=arguments.length;
		var components = new Array($l>0?$l-0:0);
		for(var $i=0;$i<$l;++$i){components[$i-0]=arguments[$i];}
		var _g_current = 0;
		while(_g_current < components.length) {
			var c = components[_g_current++];
			this.components.push(c);
		}
		return this;
	}
	,__class__: discord_$builder_APIActionRowComponent
});
var discord_$builder_APIButtonComponentBase = function() {
	this.type = 2;
};
$hxClasses["discord_builder.APIButtonComponentBase"] = discord_$builder_APIButtonComponentBase;
discord_$builder_APIButtonComponentBase.__name__ = "discord_builder.APIButtonComponentBase";
discord_$builder_APIButtonComponentBase.__super__ = discord_$builder_APIBaseComponent;
discord_$builder_APIButtonComponentBase.prototype = $extend(discord_$builder_APIBaseComponent.prototype,{
	__class__: discord_$builder_APIButtonComponentBase
});
var discord_$builder_APITextInputComponent = function() {
	this.type = 4;
};
$hxClasses["discord_builder.APITextInputComponent"] = discord_$builder_APITextInputComponent;
discord_$builder_APITextInputComponent.__name__ = "discord_builder.APITextInputComponent";
discord_$builder_APITextInputComponent.__super__ = discord_$builder_APIBaseComponent;
discord_$builder_APITextInputComponent.prototype = $extend(discord_$builder_APIBaseComponent.prototype,{
	style: null
	,custom_id: null
	,label: null
	,placeholder: null
	,value: null
	,min_length: null
	,max_length: null
	,required: null
	,setStyle: function(style) {
		this.style = style;
		return this;
	}
	,setCustomId: function(custom_id) {
		this.custom_id = custom_id;
		return this;
	}
	,setLabel: function(label) {
		this.label = label;
		return this;
	}
	,setPlaceholder: function(placeholder) {
		this.placeholder = placeholder;
		return this;
	}
	,setValue: function(value) {
		this.value = value;
		return this;
	}
	,setMinLength: function(min_length) {
		this.min_length = min_length;
		return this;
	}
	,setMaxLength: function(max_length) {
		this.max_length = max_length;
		return this;
	}
	,setRequired: function(required) {
		if(required == null) {
			required = true;
		}
		this.required = required;
		return this;
	}
	,__class__: discord_$builder_APITextInputComponent
});
var discord_$builder_JSONEncodable = require("@discordjs/builders").JSONEncodable;
var discord_$builder_ActionRowBuilder = require("@discordjs/builders").ActionRowBuilder;
var discord_$builder_ButtonBuilder = function() {
	discord_$builder_APIButtonComponentBase.call(this);
};
$hxClasses["discord_builder.ButtonBuilder"] = discord_$builder_ButtonBuilder;
discord_$builder_ButtonBuilder.__name__ = "discord_builder.ButtonBuilder";
discord_$builder_ButtonBuilder.__super__ = discord_$builder_APIButtonComponentBase;
discord_$builder_ButtonBuilder.prototype = $extend(discord_$builder_APIButtonComponentBase.prototype,{
	label: null
	,custom_id: null
	,style: null
	,emoji: null
	,url: null
	,disabled: null
	,setDisabled: function(disabled) {
		if(disabled == null) {
			disabled = true;
		}
		this.disabled = disabled;
		return this;
	}
	,setCustomId: function(custom_id) {
		this.custom_id = custom_id;
		return this;
	}
	,setEmoji: function(emoji) {
		this.emoji = emoji;
		return this;
	}
	,setLabel: function(label) {
		this.label = label;
		return this;
	}
	,setStyle: function(style) {
		this.style = style;
		return this;
	}
	,setUrl: function(url) {
		this.url = url;
		return this;
	}
	,__class__: discord_$builder_ButtonBuilder
});
var discord_$builder_ContextMenuCommandBuilder = require("@discordjs/builders").ContextMenuCommandBuilder;
var discord_$builder_ModalBuildera = require("@discordjs/builders").ModalBuilder;
var discord_$builder_ModalBuilder = function() {
	this.components = [];
};
$hxClasses["discord_builder.ModalBuilder"] = discord_$builder_ModalBuilder;
discord_$builder_ModalBuilder.__name__ = "discord_builder.ModalBuilder";
discord_$builder_ModalBuilder.prototype = {
	title: null
	,custom_id: null
	,components: null
	,setCustomId: function(custom_id) {
		this.custom_id = custom_id;
		return this;
	}
	,setTitle: function(title) {
		this.title = title;
		return this;
	}
	,addComponents: function() {
		var $l=arguments.length;
		var components = new Array($l>0?$l-0:0);
		for(var $i=0;$i<$l;++$i){components[$i-0]=arguments[$i];}
		var _g_current = 0;
		while(_g_current < components.length) {
			var c = components[_g_current++];
			this.components.push(c);
		}
		return this;
	}
	,__class__: discord_$builder_ModalBuilder
};
var discord_$builder_SharedNameAndDescription = require("@discordjs/builders").SharedNameAndDescription;
var discord_$builder_SharedSlashCommandOptions = require("@discordjs/builders").SharedSlashCommandOptions;
var discord_$builder_AnySlashCommand = {};
discord_$builder_AnySlashCommand._new = function(builder) {
	return builder;
};
discord_$builder_AnySlashCommand.fromBase = function(base) {
	return discord_$builder_AnySlashCommand._new(base);
};
discord_$builder_AnySlashCommand.fromUser = function(user) {
	return discord_$builder_AnySlashCommand._new(user);
};
discord_$builder_AnySlashCommand.fromBool = function(bool) {
	return discord_$builder_AnySlashCommand._new(bool);
};
discord_$builder_AnySlashCommand.fromString = function(string) {
	return discord_$builder_AnySlashCommand._new(string);
};
discord_$builder_AnySlashCommand.fromChannel = function(channel) {
	return discord_$builder_AnySlashCommand._new(channel);
};
discord_$builder_AnySlashCommand.fromRole = function(role) {
	return discord_$builder_AnySlashCommand._new(role);
};
discord_$builder_AnySlashCommand.fromNumber = function(number) {
	return discord_$builder_AnySlashCommand._new(number);
};
discord_$builder_AnySlashCommand.fromMentionable = function(mentionable) {
	return discord_$builder_AnySlashCommand._new(mentionable);
};
discord_$builder_AnySlashCommand.fromSubcommand = function(subcommand) {
	return discord_$builder_AnySlashCommand._new(subcommand);
};
discord_$builder_AnySlashCommand.fromContextMenu = function(menu) {
	return discord_$builder_AnySlashCommand._new(menu);
};
var discord_$builder_SlashCommandOptionBase = require("@discordjs/builders").SlashCommandOptionBase;
var discord_$builder_SlashCommandBooleanOption = require("@discordjs/builders").SlashCommandBooleanOption;
var discord_$builder_SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
var discord_$builder_SlashCommandChannelOption = require("@discordjs/builders").SlashCommandChannelOption;
var discord_$builder_SlashCommandMentionableOption = require("@discordjs/builders").SlashCommandMentionableOption;
var discord_$builder_SlashCommandNumberOption = require("@discordjs/builders").SlashCommandNumberOption;
var discord_$builder_SlashCommandRoleOption = require("@discordjs/builders").SlashCommandRoleOption;
var discord_$builder_SlashCommandStringOption = require("@discordjs/builders").SlashCommandStringOption;
var discord_$builder_SlashCommandSubcommandBuilder = require("@discordjs/builders").SlashCommandSubcommandBuilder;
var discord_$builder_SlashCommandUserOption = require("@discordjs/builders").SlashCommandUserOption;
var discord_$builder_TextInputBuilder = require("@discordjs/builders").TextInputBuilder;
var discord_$js_APIMessage = require("discord.js").APIMessage;
var discord_$js_Activity = require("discord.js").Activity;
var discord_$js_Application = require("discord.js").Application;
var discord_$js_Base = require("discord.js").Base;
var discord_$js_ApplicationCommandManager = require("discord.js").ApplicationCommandManager;
var discord_$js_BaseClient = require("discord.js").BaseClient;
var discord_$js_Emoji = require("discord.js").Emoji;
var discord_$js_BaseGuildEmoji = require("discord.js").BaseGuildEmoji;
var discord_$js_BaseManager = require("discord.js").BaseManager;
var discord_$js_BitField = require("discord.js").BitField;
var discord_$js_BroadcastDispatcher = require("discord.js").BroadcastDispatcher;
var discord_$js_Channel = require("discord.js").Channel;
var discord_$js_GuildChannel = require("discord.js").GuildChannel;
var discord_$js_CategoryChannel = require("discord.js").CategoryChannel;
var discord_$js_ChannelManager = require("discord.js").ChannelManager;
var discord_$js_Client = require("discord.js").Client;
var discord_$js_ClientApplication = require("discord.js").ClientApplication;
var discord_$js_User = require("discord.js").User;
var discord_$js_ClientUser = require("discord.js").ClientUser;
var discord_$js_ClientVoiceManager = require("discord.js").ClientVoiceManager;
var discord_$js_collection_Collection = require("@discordjs/collection").Collection;
var discord_$js_Collection = require("discord.js").Collection;
var discord_$js_Collector = require("discord.js").Collector;
var discord_$js_DMChannel = require("discord.js").DMChannel;
var discord_$js_Guild = require("discord.js").Guild;
var discord_$js_GuildApplicationCommandManager = require("discord.js").GuildApplicationCommandManager;
var discord_$js_GuildAuditLogs = require("discord.js").GuildAuditLogs;
var discord_$js_GuildAuditLogsEntry = require("discord.js").GuildAuditLogsEntry;
var discord_$js_GuildChannelManager = require("discord.js").GuildChannelManager;
var discord_$js_GuildEmoji = require("discord.js").GuildEmoji;
var discord_$js_GuildEmojiManager = require("discord.js").GuildEmojiManager;
var discord_$js_GuildEmojiRoleManager = require("discord.js").GuildEmojiRoleManager;
var discord_$js_GuildManager = require("discord.js").GuildManager;
var discord_$js_GuildMember = require("discord.js").GuildMember;
var discord_$js_GuildMemberManager = require("discord.js").GuildMemberManager;
var discord_$js_OverridableManager = require("discord.js").OverridableManager;
var discord_$js_GuildMemberRoleManager = require("discord.js").GuildMemberRoleManager;
var discord_$js_GuildPreview = require("discord.js").GuildPreview;
var discord_$js_GuildPreviewEmoji = require("discord.js").GuildPreviewEmoji;
var discord_$js_GuildTemplate = require("discord.js").GuildTemplate;
var discord_$js_Integration = require("discord.js").Integration;
var discord_$js_IntegrationApplication = require("discord.js").IntegrationApplication;
var discord_$js_Invite = require("discord.js").Invite;
var discord_$js_Message = require("discord.js").Message;
var discord_$js_MessageAttachment = require("discord.js").MessageAttachment;
var discord_$js_MessageCollector = require("discord.js").MessageCollector;
var discord_$js_MessageEmbed = require("@discordjs/builders").EmbedBuilder;
var discord_$js_Field = function(name,value,in_line) {
	this.name = name;
	this.value = value;
	this.inline = in_line;
};
$hxClasses["discord_js.Field"] = discord_$js_Field;
discord_$js_Field.__name__ = "discord_js.Field";
discord_$js_Field.prototype = {
	name: null
	,value: null
	,inline: null
	,__class__: discord_$js_Field
};
var discord_$js_MessageManager = require("discord.js").MessageManager;
var discord_$js_MessageMentions = require("discord.js").MessageMentions;
var discord_$js_MessageReaction = require("discord.js").MessageReaction;
var discord_$js_NewsChannel = require("discord.js").NewsChannel;
var discord_$js_PartialGroupDMChannel = require("discord.js").PartialGroupDMChannel;
var discord_$js_PermissionOverwrites = require("discord.js").PermissionOverwrites;
var discord_$js_Permissions = require("discord.js").Permissions;
var discord_$js_Presence = require("discord.js").Presence;
var discord_$js_PresenceManager = require("discord.js").PresenceManager;
var discord_$js_ReactionCollector = require("discord.js").ReactionCollector;
var discord_$js_ReactionEmoji = require("discord.js").ReactionEmoji;
var discord_$js_ReactionManager = require("discord.js").ReactionManager;
var discord_$js_ReactionUserManager = require("discord.js").ReactionUserManager;
var discord_$js_RichPresenceAssets = require("discord.js").RichPresenceAssets;
var discord_$js_Role = require("discord.js").Role;
var discord_$js_RoleManager = require("discord.js").RoleManager;
var discord_$js_Shard = require("discord.js").Shard;
var discord_$js_ShardClientUtil = require("discord.js").ShardClientUtil;
var discord_$js_ShardingManager = require("discord.js").ShardingManager;
var discord_$js_StreamDispatcher = require("discord.js").StreamDispatcher;
var discord_$js_Team = require("discord.js").Team;
var discord_$js_TeamMember = require("discord.js").TeamMember;
var discord_$js_TextChannel = require("discord.js").TextChannel;
var discord_$js_ThreadChannel = require("discord.js").ThreadChannel;
var discord_$js_ThreadManager = require("discord.js").ThreadManager;
var discord_$js_ThreadMemberManager = require("discord.js").ThreadMemberManager;
var discord_$js_UserFlags = require("discord.js").UserFlags;
var discord_$js_UserManager = require("discord.js").UserManager;
var discord_$js_VoiceBroadcast = require("discord.js").VoiceBroadcast;
var discord_$js_VoiceChannel = require("discord.js").VoiceChannel;
var discord_$js_VoiceConnection = require("discord.js").VoiceConnection;
var discord_$js_VoiceReceiver = require("discord.js").VoiceReceiver;
var discord_$js_VoiceRegion = require("discord.js").VoiceRegion;
var discord_$js_VoiceState = require("discord.js").VoiceState;
var discord_$js_VoiceStateManager = require("discord.js").VoiceStateManager;
var discord_$js_WebSocketManager = require("discord.js").WebSocketManager;
var discord_$js_WebSocketShard = require("discord.js").WebSocketShard;
var discord_$js_Webhook = require("discord.js").Webhook;
var discord_$js_WebhookClient = require("discord.js").WebhookClient;
var discord_$js_rest_CDN = require("@discordjs/rest").CDN;
var node_Events = require("events");
var discord_$js_rest_REST = require("@discordjs/rest").REST;
var discord_$js_rest_RequestManager = require("@discordjs/rest").RequestManager;
var ecs_Components = function(_size) {
	var this1 = new Array(_size);
	this.components = this1;
};
$hxClasses["ecs.Components"] = ecs_Components;
ecs_Components.__name__ = "ecs.Components";
ecs_Components.prototype = {
	components: null
	,set: function(_entity,_component) {
		this.components[ecs_Entity.id(_entity)] = _component;
	}
	,get: function(_entity) {
		return this.components[ecs_Entity.id(_entity)];
	}
	,__class__: ecs_Components
};
var ecs_Entity = {};
ecs_Entity._new = function(_id) {
	return _id;
};
ecs_Entity.id = function(this1) {
	return this1;
};
var ecs_Family = function(_id,_cmpMask,_resMask,_size) {
	this.id = _id;
	this.componentsMask = _cmpMask;
	this.resourcesMask = _resMask;
	this.onEntityAdded = new ecs_ds_Signal_$ecs_$Entity();
	this.onEntityRemoved = new ecs_ds_Signal_$ecs_$Entity();
	this.onActivated = new ecs_ds_Signal_$ecs_$ds_$Unit();
	this.onDeactivated = new ecs_ds_Signal_$ecs_$ds_$Unit();
	this.entities = new ecs_ds_SparseSet(_size);
	this.active = false;
};
$hxClasses["ecs.Family"] = ecs_Family;
ecs_Family.__name__ = "ecs.Family";
ecs_Family.prototype = {
	id: null
	,componentsMask: null
	,resourcesMask: null
	,onActivated: null
	,onDeactivated: null
	,onEntityAdded: null
	,onEntityRemoved: null
	,entities: null
	,active: null
	,add: function(_entity) {
		if(!this.entities.has(_entity)) {
			this.entities.insert(_entity);
			if(this.isActive()) {
				this.onEntityAdded.notify(_entity);
			}
		}
	}
	,remove: function(_entity) {
		if(this.entities.has(_entity)) {
			if(this.isActive()) {
				this.onEntityRemoved.notify(_entity);
			}
			this.entities.remove(_entity);
		}
	}
	,has: function(_entity) {
		return this.entities.has(_entity);
	}
	,activate: function() {
		if(!this.active) {
			this.active = true;
			this.onActivated.notify(ecs_ds_Unit.unit);
			var _g = 0;
			var _g1 = this.entities.size();
			while(_g < _g1) {
				var i = _g++;
				this.onEntityAdded.notify(this.entities.getDense(i));
			}
		}
	}
	,deactivate: function() {
		if(this.active) {
			var _g = 0;
			var _g1 = this.entities.size();
			while(_g < _g1) {
				var i = _g++;
				this.onEntityRemoved.notify(this.entities.getDense(i));
			}
			this.onDeactivated.notify(ecs_ds_Unit.unit);
			this.active = false;
		}
	}
	,size: function() {
		return this.entities.size();
	}
	,isActive: function() {
		return this.active;
	}
	,iterator: function() {
		return new ecs__$Family_FamilyIterator(this.entities,this.isActive());
	}
	,__class__: ecs_Family
};
var ecs__$Family_FamilyIterator = function(_set,_active) {
	this.set = _set;
	this.active = _active;
	this.idx = _set.size() - 1;
};
$hxClasses["ecs._Family.FamilyIterator"] = ecs__$Family_FamilyIterator;
ecs__$Family_FamilyIterator.__name__ = "ecs._Family.FamilyIterator";
ecs__$Family_FamilyIterator.prototype = {
	set: null
	,active: null
	,idx: null
	,hasNext: function() {
		if(this.active) {
			return this.idx >= 0;
		} else {
			return false;
		}
	}
	,next: function() {
		return this.set.getDense(this.idx--);
	}
	,__class__: ecs__$Family_FamilyIterator
};
var ecs_Phase = function(_enabled,_name,_systems,_enabledSystems) {
	this.enabled = _enabled;
	this.name = _name;
	this.systems = _systems;
	this.enabledSystems = _enabledSystems;
};
$hxClasses["ecs.Phase"] = ecs_Phase;
ecs_Phase.__name__ = "ecs.Phase";
ecs_Phase.prototype = {
	enabled: null
	,systems: null
	,enabledSystems: null
	,name: null
	,update: function(_dt) {
		if(!this.enabled) {
			return;
		}
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].update(_dt);
			}
		}
	}
	,enable: function() {
		if(this.enabled) {
			return;
		}
		this.enabled = true;
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].onEnabled();
			}
		}
	}
	,disable: function() {
		if(!this.enabled) {
			return;
		}
		this.enabled = false;
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].onDisabled();
			}
		}
	}
	,__class__: ecs_Phase
};
var ecs_TableType = {};
ecs_TableType._new = function(value) {
	return value;
};
ecs_TableType.fromClass = function(input) {
	return ecs_TableType._new(input.__name__);
};
var ecs_Universe = function(_entities,_components,_resources,_families,_phases) {
	this.entities = _entities;
	this.components = _components;
	this.resources = _resources;
	this.families = _families;
	this.phases = _phases;
};
$hxClasses["ecs.Universe"] = ecs_Universe;
ecs_Universe.__name__ = "ecs.Universe";
ecs_Universe.prototype = {
	entities: null
	,components: null
	,resources: null
	,families: null
	,phases: null
	,update: function(_dt) {
		var _g = 0;
		var _g1 = this.phases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			phase.update(_dt);
		}
	}
	,createEntity: function() {
		return this.entities.create();
	}
	,deleteEntity: function(_entity) {
		this.families.whenEntityDestroyed(_entity);
		this.components.clear(_entity);
		this.entities.destroy(ecs_Entity.id(_entity));
	}
	,getPhase: function(_name) {
		var _g = 0;
		var _g1 = this.phases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			if(phase.name == _name) {
				return phase;
			}
		}
		throw new haxe_Exception("Unable to find a phase with the name " + _name);
	}
	,__class__: ecs_Universe
};
var ecs_core_ComponentManager = function(_entities,_components) {
	this.entities = _entities;
	this.components = _components;
	var this1 = new Array(_entities.capacity());
	var v = this1;
	var _g = 0;
	var _g1 = v.length;
	while(_g < _g1) {
		var i = _g++;
		var this1 = [0];
		var this2 = this1;
		v[i] = this2;
	}
	this.flags = v;
};
$hxClasses["ecs.core.ComponentManager"] = ecs_core_ComponentManager;
ecs_core_ComponentManager.__name__ = "ecs.core.ComponentManager";
ecs_core_ComponentManager.prototype = {
	entities: null
	,components: null
	,flags: null
	,getTable: function(_compID) {
		return this.components[_compID];
	}
	,set: function(_entity,_id,_component) {
		this.components[_id].set(_entity,_component);
		bits_Bits.set(this.flags[ecs_Entity.id(_entity)],_id);
	}
	,remove: function(_entity,_id) {
		bits_Bits.unset(this.flags[ecs_Entity.id(_entity)],_id);
	}
	,clear: function(_entity) {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var set = _g1[_g];
			++_g;
			set.set(_entity,null);
		}
		bits_Bits.clear(this.flags[ecs_Entity.id(_entity)]);
	}
	,__class__: ecs_core_ComponentManager
};
var ecs_core_EntityManager = function(_max) {
	var this1 = new Array(_max);
	this.storage = this1;
	var this1 = new Array(_max);
	this.recycleBin = this1;
	this.nextID = 0;
	this.binSize = 0;
};
$hxClasses["ecs.core.EntityManager"] = ecs_core_EntityManager;
ecs_core_EntityManager.__name__ = "ecs.core.EntityManager";
ecs_core_EntityManager.prototype = {
	storage: null
	,recycleBin: null
	,nextID: null
	,binSize: null
	,create: function() {
		if(this.binSize > 0) {
			return this.storage[this.recycleBin[--this.binSize]];
		}
		var idx = this.nextID++;
		if(idx >= this.storage.length) {
			throw haxe_Exception.thrown("ECS entity limit exceeded");
		}
		var e = ecs_Entity._new(idx);
		this.storage[idx] = e;
		return e;
	}
	,destroy: function(_id) {
		this.recycleBin[this.binSize++] = _id;
	}
	,get: function(_id) {
		return this.storage[_id];
	}
	,capacity: function() {
		return this.storage.length;
	}
	,__class__: ecs_core_EntityManager
};
var ecs_core_FamilyManager = function(_components,_resources,_families) {
	this.components = _components;
	this.resources = _resources;
	this.families = _families;
	this.number = this.families.length;
};
$hxClasses["ecs.core.FamilyManager"] = ecs_core_FamilyManager;
ecs_core_FamilyManager.__name__ = "ecs.core.FamilyManager";
ecs_core_FamilyManager.prototype = {
	components: null
	,resources: null
	,families: null
	,number: null
	,get: function(_index) {
		return this.families[_index];
	}
	,tryActivate: function(_id) {
		if(!this.families[_id].isActive() && bits_Bits.areSet(this.resources.flags,this.families[_id].resourcesMask)) {
			this.families[_id].activate();
		}
	}
	,tryDeactivate: function(_id,resourceID) {
		if(!bits_Bits.isSet(this.resources.flags,resourceID)) {
			return;
		}
		if(!this.families[_id].isActive()) {
			return;
		}
		if(bits_Bits.isSet(this.families[_id].resourcesMask,resourceID)) {
			this.families[_id].deactivate();
		}
	}
	,whenEntityDestroyed: function(_entity) {
		var _g = 0;
		var _g1 = this.families;
		while(_g < _g1.length) {
			var family = _g1[_g];
			++_g;
			family.remove(_entity);
		}
	}
	,__class__: ecs_core_FamilyManager
};
var ecs_core_ResourceManager = function(_flags,_resources) {
	this.flags = _flags;
	this.resources = _resources;
};
$hxClasses["ecs.core.ResourceManager"] = ecs_core_ResourceManager;
ecs_core_ResourceManager.__name__ = "ecs.core.ResourceManager";
ecs_core_ResourceManager.prototype = {
	flags: null
	,resources: null
	,get: function(_id) {
		return this.resources[_id];
	}
	,insert: function(_id,_resource) {
		this.resources[_id] = _resource;
		bits_Bits.set(this.flags,_id);
	}
	,remove: function(_id) {
		bits_Bits.unset(this.flags,_id);
		this.resources[_id] = null;
	}
	,__class__: ecs_core_ResourceManager
};
var ecs_ds_Signal = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal"] = ecs_ds_Signal;
ecs_ds_Signal.__name__ = "ecs.ds.Signal";
ecs_ds_Signal.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) {
			var func = _g1[_g];
			++_g;
			func(_data);
		}
	}
	,__class__: ecs_ds_Signal
};
var ecs_ds_Signal_$ecs_$Entity = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal_ecs_Entity"] = ecs_ds_Signal_$ecs_$Entity;
ecs_ds_Signal_$ecs_$Entity.__name__ = "ecs.ds.Signal_ecs_Entity";
ecs_ds_Signal_$ecs_$Entity.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) {
			var func = _g1[_g];
			++_g;
			func(_data);
		}
	}
	,__class__: ecs_ds_Signal_$ecs_$Entity
};
var ecs_ds_Signal_$ecs_$ds_$Unit = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal_ecs_ds_Unit"] = ecs_ds_Signal_$ecs_$ds_$Unit;
ecs_ds_Signal_$ecs_$ds_$Unit.__name__ = "ecs.ds.Signal_ecs_ds_Unit";
ecs_ds_Signal_$ecs_$ds_$Unit.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) {
			var func = _g1[_g];
			++_g;
			func(_data);
		}
	}
	,__class__: ecs_ds_Signal_$ecs_$ds_$Unit
};
var ecs_ds_SparseSet = function(_size) {
	var this1 = new Array(_size);
	this.sparse = this1;
	var this1 = new Array(_size);
	this.dense = this1;
	this.number = 0;
	var _g = 0;
	var _g1 = this.sparse.length;
	while(_g < _g1) {
		var i = _g++;
		this.sparse[i] = 0;
	}
	var _g = 0;
	var _g1 = this.dense.length;
	while(_g < _g1) {
		var i = _g++;
		this.dense[i] = ecs_Entity.none;
	}
};
$hxClasses["ecs.ds.SparseSet"] = ecs_ds_SparseSet;
ecs_ds_SparseSet.__name__ = "ecs.ds.SparseSet";
ecs_ds_SparseSet.prototype = {
	sparse: null
	,dense: null
	,number: null
	,has: function(_entity) {
		if(this.sparse[ecs_Entity.id(_entity)] < this.number) {
			return this.dense[this.sparse[ecs_Entity.id(_entity)]] == _entity;
		} else {
			return false;
		}
	}
	,insert: function(_entity) {
		this.dense[this.number] = _entity;
		this.sparse[ecs_Entity.id(_entity)] = this.number;
		this.number++;
	}
	,remove: function(_entity) {
		var temp = this.dense[this.number - 1];
		this.dense[this.sparse[ecs_Entity.id(_entity)]] = temp;
		this.sparse[ecs_Entity.id(temp)] = this.sparse[ecs_Entity.id(_entity)];
		this.number--;
	}
	,getDense: function(_idx) {
		return this.dense[_idx];
	}
	,getSparse: function(_entity) {
		return this.sparse[ecs_Entity.id(_entity)];
	}
	,size: function() {
		return this.number;
	}
	,__class__: ecs_ds_SparseSet
};
var ecs_ds_Unit = {};
ecs_ds_Unit._new = function() {
	var this1 = null;
	return this1;
};
var externs_Fetch = require("node-fetch");
var externs_FuzzySort = require("fuzzysort");
var firebase_web_app_FirebaseApp = require("firebase/app");
var firebase_web_auth_Auth = require("firebase/auth");
var firebase_web_firestore_Query = require("firebase/firestore");
var firebase_web_firestore_Firestore = require("firebase/firestore");
var firebase_web_firestore_QueryConstraint = require("firebase/firestore");
var firebase_web_firestore_Timestamp = require("firebase/firestore").Timestamp;
var firebase_web_firestore_Unsubscribe = require("firebase/firestore");
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
haxe_StackItem.__empty_constructs__ = [haxe_StackItem.CFunction];
var haxe_CallStack = {};
haxe_CallStack.__properties__ = {get_length:"get_length"};
haxe_CallStack.get_length = function(this1) {
	return this1.length;
};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
haxe_CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var j = _g++;
			if(haxe_CallStack.equalItems(this1[i],stack[j])) {
				if(startIndex < 0) {
					startIndex = i;
				}
				++i;
				if(i >= this1.length) {
					break;
				}
			} else {
				startIndex = -1;
			}
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.copy = function(this1) {
	return this1.slice();
};
haxe_CallStack.get = function(this1,index) {
	return this1[index];
};
haxe_CallStack.asArray = function(this1) {
	return this1;
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				return item1.m == item2.m;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				if(item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
					return haxe_CallStack.equalItems(item1.s,item2.s);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				if(item1.classname == item2.classname) {
					return item1.method == item2.method;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				return item1.v == item2.v;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.exceptionToString = function(e) {
	if(e.get_previous() == null) {
		var tmp = "Exception: " + e.toString();
		var tmp1 = e.get_stack();
		return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
	}
	var result = "";
	var e1 = e;
	var prev = null;
	while(e1 != null) {
		if(prev == null) {
			var result1 = "Exception: " + e1.get_message();
			var tmp = e1.get_stack();
			result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
		} else {
			var prevStack = haxe_CallStack.subtract(e1.get_stack(),prev.get_stack());
			result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
		}
		prev = e1;
		e1 = e1.get_previous();
	}
	return result;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var _g = s.m;
		b.b = (b.b += "module ") + (_g == null ? "null" : "" + _g);
		break;
	case 2:
		var _g = s.s;
		var _g1 = s.file;
		var _g2 = s.line;
		var _g3 = s.column;
		if(_g != null) {
			haxe_CallStack.itemToString(b,_g);
			b.b += " (";
		}
		b.b = (b.b += _g1 == null ? "null" : "" + _g1) + " line ";
		b.b += _g2 == null ? "null" : "" + _g2;
		if(_g3 != null) {
			b.b = (b.b += " column ") + (_g3 == null ? "null" : "" + _g3);
		}
		if(_g != null) {
			b.b += ")";
		}
		break;
	case 3:
		var _g = s.classname;
		var _g1 = s.method;
		b.b = (b.b += Std.string(_g == null ? "<unknown>" : _g)) + ".";
		b.b += _g1 == null ? "null" : "" + _g1;
		break;
	case 4:
		var _g = s.v;
		b.b = (b.b += "local function #") + (_g == null ? "null" : "" + _g);
		break;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
	,__class__: haxe_IMap
};
var haxe_DynamicAccess = {};
haxe_DynamicAccess._new = function() {
	var this1 = { };
	return this1;
};
haxe_DynamicAccess.get = function(this1,key) {
	return this1[key];
};
haxe_DynamicAccess.set = function(this1,key,value) {
	return this1[key] = value;
};
haxe_DynamicAccess.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
haxe_DynamicAccess.remove = function(this1,key) {
	return Reflect.deleteField(this1,key);
};
haxe_DynamicAccess.keys = function(this1) {
	return Reflect.fields(this1);
};
haxe_DynamicAccess.copy = function(this1) {
	return Reflect.copy(this1);
};
haxe_DynamicAccess.iterator = function(this1) {
	return new haxe_iterators_DynamicAccessIterator(this1);
};
haxe_DynamicAccess.keyValueIterator = function(this1) {
	return new haxe_iterators_DynamicAccessKeyValueIterator(this1);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			return _g;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,get___exceptionStack: function() {
		return this.__exceptionStack;
	}
	,set___exceptionStack: function(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	,get___skipStack: function() {
		return this.__skipStack;
	}
	,set___skipStack: function(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	,get___nativeException: function() {
		return this.__nativeException;
	}
	,set___nativeException: function(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	,get___previousException: function() {
		return this.__previousException;
	}
	,set___previousException: function(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	,__class__: haxe_Exception
	,__properties__: {set___exceptionStack:"set___exceptionStack",get___exceptionStack:"get___exceptionStack",get_native:"get_native",get_previous:"get_previous",get_stack:"get_stack",get_message:"get_message"}
});
var haxe_Int32 = {};
haxe_Int32.negate = function(this1) {
	return ~this1 + 1 | 0;
};
haxe_Int32.preIncrement = function(this1) {
	this1 = ++this1 | 0;
	return this1;
};
haxe_Int32.postIncrement = function(this1) {
	var ret = this1++;
	this1 |= 0;
	return ret;
};
haxe_Int32.preDecrement = function(this1) {
	this1 = --this1 | 0;
	return this1;
};
haxe_Int32.postDecrement = function(this1) {
	var ret = this1--;
	this1 |= 0;
	return ret;
};
haxe_Int32.add = function(a,b) {
	return a + b | 0;
};
haxe_Int32.addInt = function(a,b) {
	return a + b | 0;
};
haxe_Int32.sub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.subInt = function(a,b) {
	return a - b | 0;
};
haxe_Int32.intSub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.mul = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.mulInt = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.toFloat = function(this1) {
	return this1;
};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
haxe_Int32.clamp = function(x) {
	return x | 0;
};
var haxe_Int64 = {};
haxe_Int64.__properties__ = {get_low:"get_low",get_high:"get_high"};
haxe_Int64._new = function(x) {
	return x;
};
haxe_Int64.copy = function(this1) {
	return new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
};
haxe_Int64.make = function(high,low) {
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.ofInt = function(x) {
	return new haxe__$Int64__$_$_$Int64(x >> 31,x);
};
haxe_Int64.toInt = function(x) {
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	return x.low;
};
haxe_Int64.is = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.isInt64 = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.getHigh = function(x) {
	return x.high;
};
haxe_Int64.getLow = function(x) {
	return x.low;
};
haxe_Int64.isNeg = function(x) {
	return x.high < 0;
};
haxe_Int64.isZero = function(x) {
	var b_high = 0;
	var b_low = 0;
	if(x.high == b_high) {
		return x.low == b_low;
	} else {
		return false;
	}
};
haxe_Int64.compare = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	if(a.high < 0) {
		if(b.high < 0) {
			return v;
		} else {
			return -1;
		}
	} else if(b.high >= 0) {
		return v;
	} else {
		return 1;
	}
};
haxe_Int64.ucompare = function(a,b) {
	var v = haxe_Int32.ucompare(a.high,b.high);
	if(v != 0) {
		return v;
	} else {
		return haxe_Int32.ucompare(a.low,b.low);
	}
};
haxe_Int64.toStr = function(x) {
	return haxe_Int64.toString(x);
};
haxe_Int64.toString = function(this1) {
	var i = this1;
	var b_high = 0;
	var b_low = 0;
	if(i.high == b_high && i.low == b_low) {
		return "0";
	}
	var str = "";
	var neg = false;
	if(i.high < 0) {
		neg = true;
	}
	var ten = new haxe__$Int64__$_$_$Int64(0,10);
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(i.high != b_high || i.low != b_low)) {
			break;
		}
		var r = haxe_Int64.divMod(i,ten);
		if(r.modulus.high < 0) {
			var x = r.modulus;
			var low = ~x.low + 1 | 0;
			str = low + str;
			var x1 = r.quotient;
			var high = ~x1.high;
			var low1 = ~x1.low + 1 | 0;
			if(low1 == 0) {
				++high;
				high = high | 0;
			}
			i = new haxe__$Int64__$_$_$Int64(high,low1);
		} else {
			str = r.modulus.low + str;
			i = r.quotient;
		}
	}
	if(neg) {
		str = "-" + str;
	}
	return str;
};
haxe_Int64.parseString = function(sParam) {
	return haxe_Int64Helper.parseString(sParam);
};
haxe_Int64.fromFloat = function(f) {
	return haxe_Int64Helper.fromFloat(f);
};
haxe_Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe_Exception.thrown("divide by zero");
		case 1:
			return { quotient : new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low), modulus : new haxe__$Int64__$_$_$Int64(0,0)};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	} else {
		modulus = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		divisor = new haxe__$Int64__$_$_$Int64(high,low);
	}
	var quotient = new haxe__$Int64__$_$_$Int64(0,0);
	var mask = new haxe__$Int64__$_$_$Int64(0,1);
	while(!(divisor.high < 0)) {
		var v = haxe_Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high << 1 | divisor.low >>> 31,divisor.low << 1);
		mask = new haxe__$Int64__$_$_$Int64(mask.high << 1 | mask.low >>> 31,mask.low << 1);
		if(cmp >= 0) {
			break;
		}
	}
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(mask.high != b_high || mask.low != b_low)) {
			break;
		}
		var v = haxe_Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			quotient = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			var high = modulus.high - divisor.high | 0;
			var low = modulus.low - divisor.low | 0;
			if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
				--high;
				high = high | 0;
			}
			modulus = new haxe__$Int64__$_$_$Int64(high,low);
		}
		mask = new haxe__$Int64__$_$_$Int64(mask.high >>> 1,mask.high << 31 | mask.low >>> 1);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high >>> 1,divisor.high << 31 | divisor.low >>> 1);
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		quotient = new haxe__$Int64__$_$_$Int64(high,low);
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return { quotient : quotient, modulus : modulus};
};
haxe_Int64.neg = function(x) {
	var high = ~x.high;
	var low = ~x.low + 1 | 0;
	if(low == 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.preIncrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return x;
};
haxe_Int64.postIncrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return ret;
};
haxe_Int64.preDecrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return x;
};
haxe_Int64.postDecrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return ret;
};
haxe_Int64.add = function(a,b) {
	var high = a.high + b.high | 0;
	var low = a.low + b.low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.addInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var high = a.high + b_high | 0;
	var low = a.low + b_low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.sub = function(a,b) {
	var high = a.high - b.high | 0;
	var low = a.low - b.low | 0;
	if(haxe_Int32.ucompare(a.low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.subInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var high = a.high - b_high | 0;
	var low = a.low - b_low | 0;
	if(haxe_Int32.ucompare(a.low,b_low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.intSub = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var high = a_high - b.high | 0;
	var low = a_low - b.low | 0;
	if(haxe_Int32.ucompare(a_low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.mul = function(a,b) {
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b.low & 65535;
	var bh = b.low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b.high) + haxe_Int32._mul(a.high,b.low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.mulInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b_low & 65535;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b_high) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.div = function(a,b) {
	return haxe_Int64.divMod(a,b).quotient;
};
haxe_Int64.divInt = function(a,b) {
	return haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).quotient;
};
haxe_Int64.intDiv = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).quotient;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.mod = function(a,b) {
	return haxe_Int64.divMod(a,b).modulus;
};
haxe_Int64.modInt = function(a,b) {
	var x = haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.intMod = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.eq = function(a,b) {
	if(a.high == b.high) {
		return a.low == b.low;
	} else {
		return false;
	}
};
haxe_Int64.eqInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	if(a.high == b_high) {
		return a.low == b_low;
	} else {
		return false;
	}
};
haxe_Int64.neq = function(a,b) {
	if(a.high == b.high) {
		return a.low != b.low;
	} else {
		return true;
	}
};
haxe_Int64.neqInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	if(a.high == b_high) {
		return a.low != b_low;
	} else {
		return true;
	}
};
haxe_Int64.lt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.ltInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) < 0;
};
haxe_Int64.intLt = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.lte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.lteInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) <= 0;
};
haxe_Int64.intLte = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.gt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gtInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) > 0;
};
haxe_Int64.intGt = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.gteInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) >= 0;
};
haxe_Int64.intGte = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.complement = function(a) {
	return new haxe__$Int64__$_$_$Int64(~a.high,~a.low);
};
haxe_Int64.and = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high & b.high,a.low & b.low);
};
haxe_Int64.or = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high | b.high,a.low | b.low);
};
haxe_Int64.xor = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high ^ b.high,a.low ^ b.low);
};
haxe_Int64.shl = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high << b | a.low >>> 32 - b,a.low << b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.low << b - 32,0);
	}
};
haxe_Int64.shr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.high >> 31,a.high >> b - 32);
	}
};
haxe_Int64.ushr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(0,a.high >>> b - 32);
	}
};
haxe_Int64.get_high = function(this1) {
	return this1.high;
};
haxe_Int64.set_high = function(this1,x) {
	return this1.high = x;
};
haxe_Int64.get_low = function(this1) {
	return this1.low;
};
haxe_Int64.set_low = function(this1,x) {
	return this1.low = x;
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,toString: function() {
		return haxe_Int64.toString(this);
	}
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Int64Helper = function() { };
$hxClasses["haxe.Int64Helper"] = haxe_Int64Helper;
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
haxe_Int64Helper.parseString = function(sParam) {
	var base_high = 0;
	var base_low = 10;
	var current = new haxe__$Int64__$_$_$Int64(0,0);
	var multiplier = new haxe__$Int64__$_$_$Int64(0,1);
	var sIsNegative = false;
	var s = StringTools.trim(sParam);
	if(s.charAt(0) == "-") {
		sIsNegative = true;
		s = s.substring(1,s.length);
	}
	var len = s.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var digitInt = HxOverrides.cca(s,len - 1 - i) - 48;
		if(digitInt < 0 || digitInt > 9) {
			throw haxe_Exception.thrown("NumberFormatError");
		}
		if(digitInt != 0) {
			var digit_high = digitInt >> 31;
			var digit_low = digitInt;
			if(sIsNegative) {
				var al = multiplier.low & 65535;
				var ah = multiplier.low >>> 16;
				var bl = digit_low & 65535;
				var bh = digit_low >>> 16;
				var p00 = haxe_Int32._mul(al,bl);
				var p10 = haxe_Int32._mul(ah,bl);
				var p01 = haxe_Int32._mul(al,bh);
				var p11 = haxe_Int32._mul(ah,bh);
				var low = p00;
				var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
				p01 <<= 16;
				low = p00 + p01 | 0;
				if(haxe_Int32.ucompare(low,p01) < 0) {
					++high;
					high = high | 0;
				}
				p10 <<= 16;
				low = low + p10 | 0;
				if(haxe_Int32.ucompare(low,p10) < 0) {
					++high;
					high = high | 0;
				}
				high = high + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_high = high;
				var b_low = low;
				var high1 = current.high - b_high | 0;
				var low1 = current.low - b_low | 0;
				if(haxe_Int32.ucompare(current.low,b_low) < 0) {
					--high1;
					high1 = high1 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high1,low1);
				if(!(current.high < 0)) {
					throw haxe_Exception.thrown("NumberFormatError: Underflow");
				}
			} else {
				var al1 = multiplier.low & 65535;
				var ah1 = multiplier.low >>> 16;
				var bl1 = digit_low & 65535;
				var bh1 = digit_low >>> 16;
				var p001 = haxe_Int32._mul(al1,bl1);
				var p101 = haxe_Int32._mul(ah1,bl1);
				var p011 = haxe_Int32._mul(al1,bh1);
				var p111 = haxe_Int32._mul(ah1,bh1);
				var low2 = p001;
				var high2 = (p111 + (p011 >>> 16) | 0) + (p101 >>> 16) | 0;
				p011 <<= 16;
				low2 = p001 + p011 | 0;
				if(haxe_Int32.ucompare(low2,p011) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				p101 <<= 16;
				low2 = low2 + p101 | 0;
				if(haxe_Int32.ucompare(low2,p101) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				high2 = high2 + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_high1 = high2;
				var b_low1 = low2;
				var high3 = current.high + b_high1 | 0;
				var low3 = current.low + b_low1 | 0;
				if(haxe_Int32.ucompare(low3,current.low) < 0) {
					++high3;
					high3 = high3 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high3,low3);
				if(current.high < 0) {
					throw haxe_Exception.thrown("NumberFormatError: Overflow");
				}
			}
		}
		var al2 = multiplier.low & 65535;
		var ah2 = multiplier.low >>> 16;
		var bl2 = base_low & 65535;
		var bh2 = base_low >>> 16;
		var p002 = haxe_Int32._mul(al2,bl2);
		var p102 = haxe_Int32._mul(ah2,bl2);
		var p012 = haxe_Int32._mul(al2,bh2);
		var p112 = haxe_Int32._mul(ah2,bh2);
		var low4 = p002;
		var high4 = (p112 + (p012 >>> 16) | 0) + (p102 >>> 16) | 0;
		p012 <<= 16;
		low4 = p002 + p012 | 0;
		if(haxe_Int32.ucompare(low4,p012) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		p102 <<= 16;
		low4 = low4 + p102 | 0;
		if(haxe_Int32.ucompare(low4,p102) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		high4 = high4 + (haxe_Int32._mul(multiplier.low,base_high) + haxe_Int32._mul(multiplier.high,base_low) | 0) | 0;
		multiplier = new haxe__$Int64__$_$_$Int64(high4,low4);
	}
	return current;
};
haxe_Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe_Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe_Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe_Exception.thrown("Conversion underflow");
	}
	var result = new haxe__$Int64__$_$_$Int64(0,0);
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(a_high,a_low) : b < 32 ? new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b) : new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe_Int32.ucompare(low,result.low) < 0) {
				++high;
				high = high | 0;
			}
			result = new haxe__$Int64__$_$_$Int64(high,low);
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		result = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return result;
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.lastError = null;
haxe_NativeStackTrace.wrapCallSite = null;
haxe_NativeStackTrace.saveStack = function(e) {
	haxe_NativeStackTrace.lastError = e;
};
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.exceptionStack = function() {
	return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	var stack = e.stack;
	Error.prepareStackTrace = oldValue;
	return stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				var className = fullName.substring(0,idx);
				var methodName = fullName.substring(idx + 1);
				method = haxe_StackItem.Method(className,methodName);
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	while(true) if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			skip = --skip;
			pos += 1;
			continue;
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Rest = {};
haxe_Rest.__properties__ = {get_length:"get_length"};
haxe_Rest.get_length = function(this1) {
	return this1.length;
};
haxe_Rest.of = function(array) {
	return array;
};
haxe_Rest._new = function(array) {
	return array;
};
haxe_Rest.get = function(this1,index) {
	return this1[index];
};
haxe_Rest.toArray = function(this1) {
	return this1.slice();
};
haxe_Rest.iterator = function(this1) {
	return new haxe_iterators_RestIterator(this1);
};
haxe_Rest.keyValueIterator = function(this1) {
	return new haxe_iterators_RestKeyValueIterator(this1);
};
haxe_Rest.append = function(this1,item) {
	var result = this1.slice();
	result.push(item);
	return result;
};
haxe_Rest.prepend = function(this1,item) {
	var result = this1.slice();
	result.unshift(item);
	return result;
};
haxe_Rest.toString = function(this1) {
	return "[" + this1.toString() + "]";
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var hrtime = process.hrtime();
	var t0 = hrtime[0] + hrtime[1] / 1e9;
	var r = f();
	var tmp = haxe_Log.trace;
	var hrtime = process.hrtime();
	tmp(hrtime[0] + hrtime[1] / 1e9 - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	var hrtime = process.hrtime();
	return hrtime[0] + hrtime[1] / 1e9;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.__interfaces__ = [haxe_IMap];
haxe_ds_BalancedTree.iteratorLoop = function(node,acc) {
	while(true) {
		if(node != null) {
			haxe_ds_BalancedTree.iteratorLoop(node.left,acc);
			acc.push(node.value);
			node = node.right;
			continue;
		}
		return;
	}
};
haxe_ds_BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return true;
			} else if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		haxe_ds_BalancedTree.iteratorLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,copy: function() {
		var copied = new haxe_ds_BalancedTree();
		copied.root = this.root;
		return copied;
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) {
			throw haxe_Exception.thrown("Not_found");
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return this.merge(node.left,node.right);
		} else if(c < 0) {
			return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right);
		} else {
			return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) {
			return t2;
		}
		if(t2 == null) {
			return t1;
		}
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) {
			throw haxe_Exception.thrown("Not_found");
		} else if(t.left == null) {
			return t;
		} else {
			return this.minBinding(t.left);
		}
	}
	,removeMinBinding: function(t) {
		if(t.left == null) {
			return t.right;
		} else {
			return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,toString: function() {
		if(this.root == null) {
			return "{}";
		} else {
			return "{" + this.root.toString() + "}";
		}
	}
	,clear: function() {
		this.root = null;
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,toString: function() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
	,__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,copy: function() {
		var copied = new haxe_ds_EnumValueMap();
		copied.root = this.root;
		return copied;
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_HashMap = {};
haxe_ds_HashMap._new = function() {
	var this1 = new haxe_ds__$HashMap_HashMapData();
	return this1;
};
haxe_ds_HashMap.set = function(this1,k,v) {
	var _this = this1.keys;
	var key = k.hashCode();
	_this.h[key] = k;
	var _this = this1.values;
	var key = k.hashCode();
	_this.h[key] = v;
};
haxe_ds_HashMap.get = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h[key];
};
haxe_ds_HashMap.exists = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h.hasOwnProperty(key);
};
haxe_ds_HashMap.remove = function(this1,k) {
	this1.values.remove(k.hashCode());
	return this1.keys.remove(k.hashCode());
};
haxe_ds_HashMap.keys = function(this1) {
	return this1.keys.iterator();
};
haxe_ds_HashMap.copy = function(this1) {
	var copied = new haxe_ds__$HashMap_HashMapData();
	copied.keys = this1.keys.copy();
	copied.values = this1.values.copy();
	return copied;
};
haxe_ds_HashMap.iterator = function(this1) {
	return this1.values.iterator();
};
haxe_ds_HashMap.keyValueIterator = function(this1) {
	return new haxe_iterators_HashMapKeyValueIterator(this1);
};
haxe_ds_HashMap.clear = function(this1) {
	this1.keys.h = { };
	this1.values.h = { };
};
var haxe_ds__$HashMap_HashMapData = function() {
	this.keys = new haxe_ds_IntMap();
	this.values = new haxe_ds_IntMap();
};
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe_ds__$HashMap_HashMapData;
haxe_ds__$HashMap_HashMapData.__name__ = "haxe.ds._HashMap.HashMapData";
haxe_ds__$HashMap_HashMapData.prototype = {
	keys: null
	,values: null
	,__class__: haxe_ds__$HashMap_HashMapData
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_IntMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b = "{";
		var it = this.keys();
		while(it.hasNext()) {
			var i = it.next();
			s_b += i == null ? "null" : "" + i;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { };
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,first: function() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	,last: function() {
		if(this.q == null) {
			return null;
		} else {
			return this.q.item;
		}
	}
	,pop: function() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe_ds__$List_ListKeyValueIterator(this.h);
	}
	,toString: function() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b = "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += Std.string(Std.string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	,join: function(sep) {
		var s_b = "";
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += Std.string(l.item);
			l = l.next;
		}
		return s_b;
	}
	,filter: function(f) {
		var l2 = new haxe_ds_List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			if(f(v)) {
				l2.add(v);
			}
		}
		return l2;
	}
	,map: function(f) {
		var b = new haxe_ds_List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			b.add(f(v));
		}
		return b;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
$hxClasses["haxe.ds._List.ListIterator"] = haxe_ds__$List_ListIterator;
haxe_ds__$List_ListIterator.__name__ = "haxe.ds._List.ListIterator";
haxe_ds__$List_ListIterator.prototype = {
	head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: haxe_ds__$List_ListIterator
};
var haxe_ds__$List_ListKeyValueIterator = function(head) {
	this.head = head;
	this.idx = 0;
};
$hxClasses["haxe.ds._List.ListKeyValueIterator"] = haxe_ds__$List_ListKeyValueIterator;
haxe_ds__$List_ListKeyValueIterator.__name__ = "haxe.ds._List.ListKeyValueIterator";
haxe_ds__$List_ListKeyValueIterator.prototype = {
	idx: null
	,head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return { value : val, key : this.idx++};
	}
	,__class__: haxe_ds__$List_ListKeyValueIterator
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.count = null;
haxe_ds_ObjectMap.assignId = function(obj) {
	return (obj.__id__ = $global.$haxeUID++);
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_ObjectMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.set(key1,this.h[key1.__id__]);
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b = "{";
		var it = this.keys();
		while(it.hasNext()) {
			var i = it.next();
			s_b += Std.string(Std.string(i));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { __keys__ : { }};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_ReadOnlyArray = {};
haxe_ds_ReadOnlyArray.__properties__ = {get_length:"get_length"};
haxe_ds_ReadOnlyArray.get_length = function(this1) {
	return this1.length;
};
haxe_ds_ReadOnlyArray.get = function(this1,i) {
	return this1[i];
};
haxe_ds_ReadOnlyArray.concat = function(this1,a) {
	return this1.concat(a);
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.createCopy = function(h) {
	var copy = new haxe_ds_StringMap();
	for (var key in h) copy.h[key] = h[key];
	return copy;
};
haxe_ds_StringMap.stringify = function(h) {
	var s = "{";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "}";
};
haxe_ds_StringMap.prototype = {
	h: null
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe_ds__$StringMap_StringMapKeyValueIterator(this.h);
	}
	,copy: function() {
		return haxe_ds_StringMap.createCopy(this.h);
	}
	,clear: function() {
		this.h = Object.create(null);
	}
	,toString: function() {
		return haxe_ds_StringMap.stringify(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_ds__$StringMap_StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe_ds__$StringMap_StringMapValueIterator;
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe_ds__$StringMap_StringMapValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe_ds__$StringMap_StringMapValueIterator
};
var haxe_ds__$StringMap_StringMapKeyValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyValueIterator"] = haxe_ds__$StringMap_StringMapKeyValueIterator;
haxe_ds__$StringMap_StringMapKeyValueIterator.__name__ = "haxe.ds._StringMap.StringMapKeyValueIterator";
haxe_ds__$StringMap_StringMapKeyValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		var key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyValueIterator
};
var haxe_ds_Vector = {};
haxe_ds_Vector.__properties__ = {get_length:"get_length"};
haxe_ds_Vector._new = function(length) {
	var this1 = new Array(length);
	return this1;
};
haxe_ds_Vector.get = function(this1,index) {
	return this1[index];
};
haxe_ds_Vector.set = function(this1,index,val) {
	return this1[index] = val;
};
haxe_ds_Vector.get_length = function(this1) {
	return this1.length;
};
haxe_ds_Vector.blit = function(src,srcPos,dest,destPos,len) {
	if(src == dest) {
		if(srcPos < destPos) {
			var i = srcPos + len;
			var j = destPos + len;
			var _g = 0;
			while(_g < len) {
				++_g;
				--i;
				--j;
				src[j] = src[i];
			}
		} else if(srcPos > destPos) {
			var i = srcPos;
			var j = destPos;
			var _g = 0;
			while(_g < len) {
				++_g;
				src[j] = src[i];
				++i;
				++j;
			}
		}
	} else {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			dest[destPos + i] = src[srcPos + i];
		}
	}
};
haxe_ds_Vector.toArray = function(this1) {
	return this1.slice(0);
};
haxe_ds_Vector.toData = function(this1) {
	return this1;
};
haxe_ds_Vector.fromData = function(data) {
	return data;
};
haxe_ds_Vector.fromArrayCopy = function(array) {
	return array.slice(0);
};
haxe_ds_Vector.copy = function(this1) {
	var this2 = new Array(this1.length);
	var r = this2;
	haxe_ds_Vector.blit(this1,0,r,0,this1.length);
	return r;
};
haxe_ds_Vector.join = function(this1,sep) {
	var b_b = "";
	var len = this1.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b_b += Std.string(Std.string(this1[i]));
		if(i < len - 1) {
			b_b += sep == null ? "null" : "" + sep;
		}
	}
	return b_b;
};
haxe_ds_Vector.map = function(this1,f) {
	var length = this1.length;
	var this2 = new Array(length);
	var r = this2;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var v = f(this1[i]);
		r[i] = v;
	}
	return r;
};
haxe_ds_Vector.sort = function(this1,f) {
	this1.sort(f);
};
var haxe_ds_WeakMap = function() {
	throw new haxe_exceptions_NotImplementedException("Not implemented for this platform",null,{ fileName : "haxe/ds/WeakMap.hx", lineNumber : 39, className : "haxe.ds.WeakMap", methodName : "new"});
};
$hxClasses["haxe.ds.WeakMap"] = haxe_ds_WeakMap;
haxe_ds_WeakMap.__name__ = "haxe.ds.WeakMap";
haxe_ds_WeakMap.__interfaces__ = [haxe_IMap];
haxe_ds_WeakMap.prototype = {
	set: function(key,value) {
	}
	,get: function(key) {
		return null;
	}
	,exists: function(key) {
		return false;
	}
	,remove: function(key) {
		return false;
	}
	,keys: function() {
		return null;
	}
	,iterator: function() {
		return null;
	}
	,keyValueIterator: function() {
		return null;
	}
	,copy: function() {
		return null;
	}
	,toString: function() {
		return null;
	}
	,clear: function() {
	}
	,__class__: haxe_ds_WeakMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase;
haxe_http_HttpBase.__name__ = "haxe.http.HttpBase";
haxe_http_HttpBase.prototype = {
	url: null
	,responseBytes: null
	,responseAsString: null
	,postData: null
	,postBytes: null
	,headers: null
	,params: null
	,emptyOnData: null
	,setHeader: function(name,value) {
		var _g = 0;
		var _g1 = this.headers.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.headers[i].name == name) {
				this.headers[i] = { name : name, value : value};
				return;
			}
		}
		this.headers.push({ name : name, value : value});
	}
	,addHeader: function(header,value) {
		this.headers.push({ name : header, value : value});
	}
	,setParameter: function(name,value) {
		var _g = 0;
		var _g1 = this.params.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.params[i].name == name) {
				this.params[i] = { name : name, value : value};
				return;
			}
		}
		this.params.push({ name : name, value : value});
	}
	,addParameter: function(name,value) {
		this.params.push({ name : name, value : value});
	}
	,setPostData: function(data) {
		this.postData = data;
		this.postBytes = null;
	}
	,setPostBytes: function(data) {
		this.postBytes = data;
		this.postData = null;
	}
	,request: function(post) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/http/HttpBase.hx", lineNumber : 186, className : "haxe.http.HttpBase", methodName : "request"});
	}
	,onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
	,__class__: haxe_http_HttpBase
	,__properties__: {get_responseData:"get_responseData"}
};
var haxe_http_HttpNodeJs = function(url) {
	haxe_http_HttpBase.call(this,url);
};
$hxClasses["haxe.http.HttpNodeJs"] = haxe_http_HttpNodeJs;
haxe_http_HttpNodeJs.__name__ = "haxe.http.HttpNodeJs";
haxe_http_HttpNodeJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpNodeJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	req: null
	,cancel: function() {
		if(this.req == null) {
			return;
		}
		this.req.abort();
		this.req = null;
	}
	,request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var parsedUrl = new js_node_url_URL(this.url);
		var secure = parsedUrl.protocol == "https:";
		var host = parsedUrl.hostname;
		var path = parsedUrl.pathname;
		var port = parsedUrl.port != null ? Std.parseInt(parsedUrl.port) : secure ? 443 : 80;
		var h = { };
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var arr = Reflect.field(h,i.name);
			if(arr == null) {
				arr = [];
				h[i.name] = arr;
			}
			arr.push(i.value);
		}
		if(this.postData != null || this.postBytes != null) {
			post = true;
		}
		var uri = null;
		var _g = 0;
		var _g1 = this.params;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(uri == null) {
				uri = "";
			} else {
				uri += "&";
			}
			var s = p.name;
			var uri1 = encodeURIComponent(s) + "=";
			var s1 = p.value;
			uri += uri1 + encodeURIComponent(s1);
		}
		var question = path.split("?").length <= 1;
		if(uri != null) {
			path += (question ? "?" : "&") + uri;
		}
		var opts = { protocol : parsedUrl.protocol, hostname : host, port : port, method : post ? "POST" : "GET", path : path, headers : h};
		var httpResponse = function(res) {
			res.setEncoding("binary");
			var s = res.statusCode;
			if(s != null) {
				_gthis.onStatus(s);
			}
			var data = [];
			res.on("data",function(chunk) {
				data.push(js_node_buffer_Buffer.from(chunk,"binary"));
			});
			res.on("end",function(_) {
				var buf = data.length == 1 ? data[0] : js_node_buffer_Buffer.concat(data);
				var httpResponse = buf.buffer.slice(buf.byteOffset,buf.byteOffset + buf.byteLength);
				_gthis.responseBytes = haxe_io_Bytes.ofData(httpResponse);
				_gthis.req = null;
				if(s != null && s >= 200 && s < 400) {
					_gthis.success(_gthis.responseBytes);
				} else {
					_gthis.onError("Http Error #" + s);
				}
			});
		};
		this.req = secure ? js_node_Https.request(opts,httpResponse) : js_node_Http.request(opts,httpResponse);
		if(post) {
			if(this.postData != null) {
				this.req.write(this.postData);
			} else if(this.postBytes != null) {
				this.req.setHeader("Content-Length","" + this.postBytes.length);
				this.req.write(js_node_buffer_Buffer.from(this.postBytes.b.bufferValue));
			}
		}
		this.req.end();
	}
	,__class__: haxe_http_HttpNodeJs
});
var haxe_io_ArrayBufferView = {};
haxe_io_ArrayBufferView.__properties__ = {get_byteLength:"get_byteLength",get_byteOffset:"get_byteOffset",get_buffer:"get_buffer"};
haxe_io_ArrayBufferView._new = function(size) {
	var this1 = new Uint8Array(size);
	return this1;
};
haxe_io_ArrayBufferView.get_byteOffset = function(this1) {
	return this1.byteOffset;
};
haxe_io_ArrayBufferView.get_byteLength = function(this1) {
	return this1.byteLength;
};
haxe_io_ArrayBufferView.get_buffer = function(this1) {
	return haxe_io_Bytes.ofData(this1.buffer);
};
haxe_io_ArrayBufferView.sub = function(this1,begin,length) {
	return new Uint8Array(this1.buffer,begin,length == null ? this1.buffer.byteLength - begin : length);
};
haxe_io_ArrayBufferView.getData = function(this1) {
	return this1;
};
haxe_io_ArrayBufferView.fromData = function(a) {
	return a;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			++_g;
			this.b[pos++] = value;
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length ? this.length : other.length;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			if(b1[i] != b2[i]) {
				return b1[i] - b2[i];
			}
		}
		return this.length - other.length;
	}
	,initData: function() {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setUint16(pos,v,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		return new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b.bufferValue;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = "haxe.io.BytesBuffer";
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,get_length: function() {
		return this.pos;
	}
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset,src.length);
		this.u8.set(sub,this.pos);
		this.pos += src.length;
	}
	,addString: function(v,encoding) {
		this.add(haxe_io_Bytes.ofString(v,encoding));
	}
	,addInt32: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setInt32(this.pos,v,true);
		this.pos += 4;
	}
	,addInt64: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setInt32(this.pos,v.low,true);
		this.view.setInt32(this.pos + 4,v.high,true);
		this.pos += 8;
	}
	,addFloat: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setFloat32(this.pos,v,true);
		this.pos += 4;
	}
	,addDouble: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setFloat64(this.pos,v,true);
		this.pos += 8;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
	,__properties__: {get_length:"get_length"}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:"haxe.io.Encoding",__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
haxe_io_Encoding.__empty_constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = "haxe.io.Eof";
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:"haxe.io.Error",__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = "haxe.io.FPHelper";
haxe_io_FPHelper._i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var e = i >> 23 & 255;
	if(e == 255) {
		if((i & 8388607) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = e == 0 ? (i & 8388607) << 1 : i & 8388607 | 8388608;
	return sign * m * Math.pow(2,e - 150);
};
haxe_io_FPHelper._i64ToDouble = function(lo,hi) {
	var sign = 1 - (hi >>> 31 << 1);
	var e = hi >> 20 & 2047;
	if(e == 2047) {
		if(lo == 0 && (hi & 1048575) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = 2.220446049250313e-16 * ((hi & 1048575) * 4294967296. + (lo >>> 31) * 2147483648. + (lo & 2147483647));
	if(e == 0) {
		m *= 2.0;
	} else {
		m += 1.0;
	}
	return sign * m * Math.pow(2,e - 1023);
};
haxe_io_FPHelper._floatToI32 = function(f) {
	if(f == 0) {
		return 0;
	}
	var af = f < 0 ? -f : f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp > 127) {
		return 2139095040;
	} else {
		if(exp <= -127) {
			exp = -127;
			af *= 7.1362384635298e+44;
		} else {
			af = (af / Math.pow(2,exp) - 1.0) * 8388608;
		}
		return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | Math.round(af);
	}
};
haxe_io_FPHelper._doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else if(!isFinite(v)) {
		i64.low = 0;
		i64.high = v > 0 ? 2146435072 : -1048576;
	} else {
		var av = v < 0 ? -v : v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		if(exp > 1023) {
			i64.low = -1;
			i64.high = 2146435071;
		} else {
			if(exp <= -1023) {
				exp = -1023;
				av /= 2.2250738585072014e-308;
			} else {
				av = av / Math.pow(2,exp) - 1.0;
			}
			var sig = Math.round(av * 4503599627370496.);
			var sig_l = sig | 0;
			var sig_h = sig / 4294967296.0 | 0;
			i64.low = sig_l;
			i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | sig_h;
		}
	}
	return i64;
};
haxe_io_FPHelper.i32ToFloat = function(i) {
	haxe_io_FPHelper.helper.setInt32(0,i,true);
	return haxe_io_FPHelper.helper.getFloat32(0,true);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	haxe_io_FPHelper.helper.setInt32(0,low,true);
	haxe_io_FPHelper.helper.setInt32(4,high,true);
	return haxe_io_FPHelper.helper.getFloat64(0,true);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	haxe_io_FPHelper.helper.setFloat64(0,v,true);
	i64.low = haxe_io_FPHelper.helper.getInt32(0,true);
	i64.high = haxe_io_FPHelper.helper.getInt32(4,true);
	return i64;
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = "haxe.io.Input";
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) {
			bufsize = 16384;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		var total = new haxe_io_BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				total.addBytes(buf,0,len);
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return total.getBytes();
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new haxe_io_BytesBuffer();
		var last;
		while(true) {
			last = this.readByte();
			if(!(last != end)) {
				break;
			}
			buf.addByte(last);
		}
		return buf.getBytes().toString();
	}
	,readLine: function() {
		var buf = new haxe_io_BytesBuffer();
		var last;
		var s;
		try {
			while(true) {
				last = this.readByte();
				if(!(last != 10)) {
					break;
				}
				buf.addByte(last);
			}
			s = buf.getBytes().toString();
			if(HxOverrides.cca(s,s.length - 1) == 13) {
				s = HxOverrides.substr(s,0,-1);
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof haxe_io_Eof)) {
				var e = _g1;
				s = buf.getBytes().toString();
				if(s.length == 0) {
					throw haxe_Exception.thrown(e);
				}
			} else {
				throw _g;
			}
		}
		return s;
	}
	,readFloat: function() {
		return haxe_io_FPHelper.i32ToFloat(this.readInt32());
	}
	,readDouble: function() {
		var i1 = this.readInt32();
		var i2 = this.readInt32();
		if(this.bigEndian) {
			return haxe_io_FPHelper.i64ToDouble(i2,i1);
		} else {
			return haxe_io_FPHelper.i64ToDouble(i1,i2);
		}
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) {
			return n - 256;
		}
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian ? ch2 | ch1 << 8 : ch1 | ch2 << 8;
		if((n & 32768) != 0) {
			return n - 65536;
		}
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian ? ch3 | ch2 << 8 | ch1 << 16 : ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) {
			return n - 16777216;
		}
		return n;
	}
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		if(this.bigEndian) {
			return ch3 | ch2 << 8 | ch1 << 16;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16;
		}
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,getDoubleSig: function(bytes) {
		return ((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * 4294967296. + (bytes[4] >> 7) * 2147483648 + ((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]);
	}
	,__class__: haxe_io_Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = "haxe.io.Output";
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,flush: function() {
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeDouble: function(x) {
		var i64 = haxe_io_FPHelper.doubleToI64(x);
		if(this.bigEndian) {
			this.writeInt32(i64.high);
			this.writeInt32(i64.low);
		} else {
			this.writeInt32(i64.low);
			this.writeInt32(i64.high);
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt24(x & 16777215);
	}
	,writeUInt24: function(x) {
		if(x < 0 || x >= 16777216) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 16);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,prepare: function(nbytes) {
	}
	,writeInput: function(i,bufsize) {
		if(bufsize == null) {
			bufsize = 4096;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		try {
			while(true) {
				var len = i.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				var p = 0;
				while(len > 0) {
					var k = this.writeBytes(buf,p,len);
					if(k == 0) {
						throw haxe_Exception.thrown(haxe_io_Error.Blocked);
					}
					p += k;
					len -= k;
				}
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
	}
	,writeString: function(s,encoding) {
		var b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe_io_Output
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = "haxe.io.Path";
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
haxe_io_Path.withExtension = function(path,ext) {
	var s = new haxe_io_Path(path);
	s.ext = ext;
	return s.toString();
};
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < paths.length) {
		var v = paths[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	if(_g.length == 0) {
		return "";
	}
	var path = _g[0];
	var _g1 = 1;
	var _g2 = _g.length;
	while(_g1 < _g2) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += _g[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var tmp = target.join(slash);
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = tmp;
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
haxe_io_Path.removeTrailingSlashes = function(path) {
	_hx_loop1: while(true) {
		var _g = HxOverrides.cca(path,path.length - 1);
		if(_g == null) {
			break;
		} else {
			switch(_g) {
			case 47:case 92:
				path = HxOverrides.substr(path,0,-1);
				break;
			default:
				break _hx_loop1;
			}
		}
	}
	return path;
};
haxe_io_Path.isAbsolute = function(path) {
	if(StringTools.startsWith(path,"/")) {
		return true;
	}
	if(path.charAt(1) == ":") {
		return true;
	}
	if(StringTools.startsWith(path,"\\\\")) {
		return true;
	}
	return false;
};
haxe_io_Path.unescape = function(path) {
	var regex = new EReg("-x([0-9][0-9])","g");
	return regex.map(path,function(regex) {
		var code = Std.parseInt(regex.matched(1));
		return String.fromCodePoint(code);
	});
};
haxe_io_Path.escape = function(path,allowSlashes) {
	if(allowSlashes == null) {
		allowSlashes = false;
	}
	var regex = allowSlashes ? new EReg("[^A-Za-z0-9_/\\\\\\.]","g") : new EReg("[^A-Za-z0-9_\\.]","g");
	return regex.map(path,function(v) {
		return "-x" + HxOverrides.cca(v.matched(0),0);
	});
};
haxe_io_Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
	,__class__: haxe_io_Path
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.__properties__ = {get_view:"get_view",get_length:"get_length"};
haxe_io_UInt8Array._new = function(elements) {
	var this1 = new Uint8Array(elements);
	return this1;
};
haxe_io_UInt8Array.get_length = function(this1) {
	return this1.length;
};
haxe_io_UInt8Array.get_view = function(this1) {
	return this1;
};
haxe_io_UInt8Array.get = function(this1,index) {
	return this1[index];
};
haxe_io_UInt8Array.set = function(this1,index,value) {
	return this1[index] = value;
};
haxe_io_UInt8Array.sub = function(this1,begin,length) {
	return this1.subarray(begin,length == null ? this1.length : begin + length);
};
haxe_io_UInt8Array.subarray = function(this1,begin,end) {
	return this1.subarray(begin,end);
};
haxe_io_UInt8Array.getData = function(this1) {
	return this1;
};
haxe_io_UInt8Array.fromData = function(d) {
	return d;
};
haxe_io_UInt8Array.fromArray = function(a,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	if(length == null) {
		length = a.length - pos;
	}
	if(pos < 0 || length < 0 || pos + length > a.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	if(pos == 0 && length == a.length) {
		return new Uint8Array(a);
	}
	var this1 = new Uint8Array(a.length);
	var i = this1;
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var idx = _g++;
		i[idx] = a[idx + pos];
	}
	return i;
};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_iterators_ArrayKeyValueIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe_iterators_ArrayKeyValueIterator;
haxe_iterators_ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
haxe_iterators_ArrayKeyValueIterator.prototype = {
	current: null
	,array: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return { value : this.array[this.current], key : this.current++};
	}
	,__class__: haxe_iterators_ArrayKeyValueIterator
};
var haxe_iterators_DynamicAccessIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe_iterators_DynamicAccessIterator;
haxe_iterators_DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
haxe_iterators_DynamicAccessIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		return this.access[this.keys[this.index++]];
	}
	,__class__: haxe_iterators_DynamicAccessIterator
};
var haxe_iterators_DynamicAccessKeyValueIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe_iterators_DynamicAccessKeyValueIterator;
haxe_iterators_DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
haxe_iterators_DynamicAccessKeyValueIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		var key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
	,__class__: haxe_iterators_DynamicAccessKeyValueIterator
};
var haxe_iterators_HashMapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys.iterator();
};
$hxClasses["haxe.iterators.HashMapKeyValueIterator"] = haxe_iterators_HashMapKeyValueIterator;
haxe_iterators_HashMapKeyValueIterator.__name__ = "haxe.iterators.HashMapKeyValueIterator";
haxe_iterators_HashMapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		var _this = this.map.values;
		var key1 = key.hashCode();
		return { value : _this.h[key1], key : key};
	}
	,__class__: haxe_iterators_HashMapKeyValueIterator
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
$hxClasses["haxe.iterators.MapKeyValueIterator"] = haxe_iterators_MapKeyValueIterator;
haxe_iterators_MapKeyValueIterator.__name__ = "haxe.iterators.MapKeyValueIterator";
haxe_iterators_MapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
	,__class__: haxe_iterators_MapKeyValueIterator
};
var haxe_iterators_RestIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestIterator"] = haxe_iterators_RestIterator;
haxe_iterators_RestIterator.__name__ = "haxe.iterators.RestIterator";
haxe_iterators_RestIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return this.args[this.current++];
	}
	,__class__: haxe_iterators_RestIterator
};
var haxe_iterators_RestKeyValueIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe_iterators_RestKeyValueIterator;
haxe_iterators_RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
haxe_iterators_RestKeyValueIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return { key : this.current, value : this.args[this.current++]};
	}
	,__class__: haxe_iterators_RestKeyValueIterator
};
var haxe_iterators_StringIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIterator"] = haxe_iterators_StringIterator;
haxe_iterators_StringIterator.__name__ = "haxe.iterators.StringIterator";
haxe_iterators_StringIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return this.s.charCodeAt(this.offset++);
	}
	,__class__: haxe_iterators_StringIterator
};
var haxe_iterators_StringIteratorUnicode = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe_iterators_StringIteratorUnicode;
haxe_iterators_StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
haxe_iterators_StringIteratorUnicode.unicodeIterator = function(s) {
	return new haxe_iterators_StringIteratorUnicode(s);
};
haxe_iterators_StringIteratorUnicode.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		var s = this.s;
		var index = this.offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	,__class__: haxe_iterators_StringIteratorUnicode
};
var haxe_iterators_StringKeyValueIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe_iterators_StringKeyValueIterator;
haxe_iterators_StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
haxe_iterators_StringKeyValueIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
	,__class__: haxe_iterators_StringKeyValueIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isInterface = function(o) {
	return o.__isInterface__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	while(true) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if(intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = _g++;
				var i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		cc = cc.__super__;
	}
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = "js.Browser";
js_Browser.__properties__ = {get_supported:"get_supported",get_self:"get_self"};
js_Browser.get_self = function() {
	return $global;
};
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
js_Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
js_Browser.alert = function(v) {
	window.alert(Std.string(v));
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = "js.Lib";
js_Lib.__properties__ = {get_undefined:"get_undefined"};
js_Lib.debug = function() {
	debugger;
};
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
js_Lib.eval = function(code) {
	return eval(code);
};
js_Lib.get_undefined = function() {
	return undefined;
};
js_Lib.rethrow = function() {
};
js_Lib.getOriginalException = function() {
	return null;
};
js_Lib.getNextHaxeUID = function() {
	return $global.$haxeUID++;
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = "js.html._CanvasElement.CanvasUtil";
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var ctx = canvas.getContext("webgl",attribs);
	if(ctx != null) {
		return ctx;
	}
	var ctx = canvas.getContext("experimental-webgl",attribs);
	if(ctx != null) {
		return ctx;
	}
	return null;
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = "js.lib._ArrayBuffer.ArrayBufferCompat";
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var js_lib_HaxeIterator = function(jsIterator) {
	this.jsIterator = jsIterator;
	this.lastStep = jsIterator.next();
};
$hxClasses["js.lib.HaxeIterator"] = js_lib_HaxeIterator;
js_lib_HaxeIterator.__name__ = "js.lib.HaxeIterator";
js_lib_HaxeIterator.iterator = function(jsIterator) {
	return new js_lib_HaxeIterator(jsIterator);
};
js_lib_HaxeIterator.prototype = {
	jsIterator: null
	,lastStep: null
	,hasNext: function() {
		return !this.lastStep.done;
	}
	,next: function() {
		var v = this.lastStep.value;
		this.lastStep = this.jsIterator.next();
		return v;
	}
	,__class__: js_lib_HaxeIterator
};
var js_lib_KeyValue = {};
js_lib_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_lib_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_lib_ObjectEntry = {};
js_lib_ObjectEntry.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_ObjectEntry.get_key = function(this1) {
	return this1[0];
};
js_lib_ObjectEntry.get_value = function(this1) {
	return this1[1];
};
var js_lib_SetKeyValueIterator = function(set) {
	this.index = 0;
	this.set = set;
	this.values = new js_lib_HaxeIterator(set.values());
};
$hxClasses["js.lib.SetKeyValueIterator"] = js_lib_SetKeyValueIterator;
js_lib_SetKeyValueIterator.__name__ = "js.lib.SetKeyValueIterator";
js_lib_SetKeyValueIterator.prototype = {
	set: null
	,values: null
	,index: null
	,hasNext: function() {
		return !this.values.lastStep.done;
	}
	,next: function() {
		var tmp = this.index++;
		var _this = this.values;
		var v = _this.lastStep.value;
		_this.lastStep = _this.jsIterator.next();
		return { key : tmp, value : v};
	}
	,__class__: js_lib_SetKeyValueIterator
};
var js_node_ChildProcess = require("child_process");
var js_node_DnsErrorCode = require("dns");
var js_node_Dns = require("dns");
var js_node_Fs = require("fs");
var js_node_Http = require("http");
var js_node_Https = require("https");
var js_node_KeyValue = {};
js_node_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_node_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_node_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_node_Path = require("path");
var js_node_events_EventEmitter = require("events").EventEmitter;
var js_node_Stream = require("stream");
var js_node_Tls = require("tls");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_buffer__$Buffer_Helper = function() { };
$hxClasses["js.node.buffer._Buffer.Helper"] = js_node_buffer__$Buffer_Helper;
js_node_buffer__$Buffer_Helper.__name__ = "js.node.buffer._Buffer.Helper";
js_node_buffer__$Buffer_Helper.bytesOfBuffer = function(b) {
	var o = Object.create(haxe_io_Bytes.prototype);
	o.length = b.byteLength;
	o.b = b;
	b.bufferValue = b;
	b.hxBytes = o;
	b.bytes = b;
	return o;
};
var js_node_buffer__$Buffer_BufferModule = require("buffer");
var js_node_stream_Readable = require("stream").Readable;
var js_node_stream_Writable = require("stream").Writable;
var js_node_http_Agent = require("http").Agent;
var js_node_http_ClientRequest = require("http").ClientRequest;
var js_node_http_IncomingMessage = require("http").IncomingMessage;
var js_node_net_Server = require("net").Server;
var js_node_http_Server = require("http").Server;
var js_node_http_ServerResponse = require("http").ServerResponse;
var js_node_https_Agent = require("https").Agent;
var js_node_tls_Server = require("tls").Server;
var js_node_https_Server = require("https").Server;
var js_node_stream_Duplex = require("stream").Duplex;
var js_node_net_Socket = require("net").Socket;
var js_node_stream_WritableNewOptionsAdapter = {};
js_node_stream_WritableNewOptionsAdapter.from = function(options) {
	if(!Object.prototype.hasOwnProperty.call(options,"final")) {
		Object.defineProperty(options,"final",{ get : function() {
			return options.final_;
		}});
	}
	return options;
};
var js_node_tls_TLSSocket = require("tls").TLSSocket;
var js_node_url_URL = require("url").URL;
var js_node_url_URLSearchParams = require("url").URLSearchParams;
var js_node_url_URLSearchParamsEntry = {};
js_node_url_URLSearchParamsEntry.__properties__ = {get_value:"get_value",get_name:"get_name"};
js_node_url_URLSearchParamsEntry._new = function(name,value) {
	var this1 = [name,value];
	return this1;
};
js_node_url_URLSearchParamsEntry.get_name = function(this1) {
	return this1[0];
};
js_node_url_URLSearchParamsEntry.get_value = function(this1) {
	return this1[1];
};
var node_buffer_Buffer = require("buffer").Buffer;
var node_$html_$parser_Node = require("node-html-parser").Node;
var node_$html_$parser_HTMLElement = require("node-html-parser").HTMLElement;
var node_$html_$parser_NodeType = require("node-html-parser").NodeType;
var safety_SafetyException = function(message,previous,native) {
	haxe_Exception.call(this,message,previous,native);
	this.__skipStack++;
};
$hxClasses["safety.SafetyException"] = safety_SafetyException;
safety_SafetyException.__name__ = "safety.SafetyException";
safety_SafetyException.__super__ = haxe_Exception;
safety_SafetyException.prototype = $extend(haxe_Exception.prototype,{
	__class__: safety_SafetyException
});
var safety_NullPointerException = function(message,previous,native) {
	safety_SafetyException.call(this,message,previous,native);
	this.__skipStack++;
};
$hxClasses["safety.NullPointerException"] = safety_NullPointerException;
safety_NullPointerException.__name__ = "safety.NullPointerException";
safety_NullPointerException.__super__ = safety_SafetyException;
safety_NullPointerException.prototype = $extend(safety_SafetyException.prototype,{
	__class__: safety_NullPointerException
});
var sys_FileSystem = function() { };
$hxClasses["sys.FileSystem"] = sys_FileSystem;
sys_FileSystem.__name__ = "sys.FileSystem";
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
};
sys_FileSystem.rename = function(path,newPath) {
	js_node_Fs.renameSync(path,newPath);
};
sys_FileSystem.stat = function(path) {
	return js_node_Fs.statSync(path);
};
sys_FileSystem.fullPath = function(relPath) {
	try {
		return js_node_Fs.realpathSync(relPath);
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
sys_FileSystem.absolutePath = function(relPath) {
	if(haxe_io_Path.isAbsolute(relPath)) {
		return relPath;
	}
	return js_node_Path.resolve(relPath);
};
sys_FileSystem.isDirectory = function(path) {
	try {
		return js_node_Fs.statSync(path).isDirectory();
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		var _g1 = haxe_Exception.caught(_g).unwrap();
		if(_g1.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _g2 ) {
				throw _g1;
			}
			if(!stat.isDirectory()) {
				throw _g1;
			}
		}
	}
};
sys_FileSystem.deleteFile = function(path) {
	js_node_Fs.unlinkSync(path);
};
sys_FileSystem.deleteDirectory = function(path) {
	if(sys_FileSystem.exists(path)) {
		var _g = 0;
		var _g1 = js_node_Fs.readdirSync(path);
		while(_g < _g1.length) {
			var file = _g1[_g];
			++_g;
			var curPath = path + "/" + file;
			if(sys_FileSystem.isDirectory(curPath)) {
				sys_FileSystem.deleteDirectory(curPath);
			} else {
				js_node_Fs.unlinkSync(curPath);
			}
		}
		js_node_Fs.rmdirSync(path);
	}
};
sys_FileSystem.readDirectory = function(path) {
	return js_node_Fs.readdirSync(path);
};
var sys_io_File = function() { };
$hxClasses["sys.io.File"] = sys_io_File;
sys_io_File.__name__ = "sys.io.File";
sys_io_File.append = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"a"));
};
sys_io_File.write = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"w"));
};
sys_io_File.read = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileInput(js_node_Fs.openSync(path,"r"));
};
sys_io_File.getContent = function(path) {
	return js_node_Fs.readFileSync(path,{ encoding : "utf8"});
};
sys_io_File.saveContent = function(path,content) {
	js_node_Fs.writeFileSync(path,content);
};
sys_io_File.getBytes = function(path) {
	return js_node_buffer__$Buffer_Helper.bytesOfBuffer(js_node_Fs.readFileSync(path));
};
sys_io_File.saveBytes = function(path,bytes) {
	var data = bytes.b;
	js_node_Fs.writeFileSync(path,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,bytes.length));
};
sys_io_File.update = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"r+"));
};
sys_io_File.copy = function(srcPath,dstPath) {
	var src = js_node_Fs.openSync(srcPath,"r");
	var stat = js_node_Fs.fstatSync(src);
	var dst = js_node_Fs.openSync(dstPath,"w",stat.mode);
	var bytesRead;
	var pos = 0;
	while(true) {
		bytesRead = js_node_Fs.readSync(src,sys_io_File.copyBuf,0,65536,pos);
		if(!(bytesRead > 0)) {
			break;
		}
		js_node_Fs.writeSync(dst,sys_io_File.copyBuf,0,bytesRead);
		pos += bytesRead;
	}
	js_node_Fs.closeSync(src);
	js_node_Fs.closeSync(dst);
};
var sys_io_FileInput = function(fd) {
	this.hasReachedEof = false;
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileInput"] = sys_io_FileInput;
sys_io_FileInput.__name__ = "sys.io.FileInput";
sys_io_FileInput.__super__ = haxe_io_Input;
sys_io_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	fd: null
	,pos: null
	,hasReachedEof: null
	,throwEof: function() {
		this.hasReachedEof = true;
		throw haxe_Exception.thrown(new haxe_io_Eof());
	}
	,readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,0,1,this.pos);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				this.hasReachedEof = true;
				throw haxe_Exception.thrown(new haxe_io_Eof());
			}
			throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
		}
		if(bytesRead == 0) {
			this.hasReachedEof = true;
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos++;
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,pos,len,this.pos);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				this.hasReachedEof = true;
				throw haxe_Exception.thrown(new haxe_io_Eof());
			}
			throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
		}
		if(bytesRead == 0) {
			this.hasReachedEof = true;
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos += bytesRead;
		return bytesRead;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		this.hasReachedEof = false;
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,eof: function() {
		return this.hasReachedEof;
	}
	,__class__: sys_io_FileInput
});
var sys_io_FileOutput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileOutput"] = sys_io_FileOutput;
sys_io_FileOutput.__name__ = "sys.io.FileOutput";
sys_io_FileOutput.__super__ = haxe_io_Output;
sys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	fd: null
	,pos: null
	,writeByte: function(b) {
		var buf = js_node_buffer_Buffer.alloc(1);
		buf[0] = b;
		js_node_Fs.writeSync(this.fd,buf,0,1,this.pos);
		this.pos++;
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var wrote = js_node_Fs.writeSync(this.fd,buf,pos,len,this.pos);
		this.pos += wrote;
		return wrote;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,__class__: sys_io_FileOutput
});
var sys_io_FileSeek = $hxEnums["sys.io.FileSeek"] = { __ename__:"sys.io.FileSeek",__constructs__:null
	,SeekBegin: {_hx_name:"SeekBegin",_hx_index:0,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekCur: {_hx_name:"SeekCur",_hx_index:1,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekEnd: {_hx_name:"SeekEnd",_hx_index:2,__enum__:"sys.io.FileSeek",toString:$estr}
};
sys_io_FileSeek.__constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
sys_io_FileSeek.__empty_constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
var util_DiscordUtil = function() { };
$hxClasses["util.DiscordUtil"] = util_DiscordUtil;
util_DiscordUtil.__name__ = "util.DiscordUtil";
util_DiscordUtil.setCommandPermission = function(command,permissions,succ,fail) {
	command.permissions.set({ guild : Main.guild_id, command : command.id, permissions : permissions}).then(function(_) {
		if(succ != null) {
			succ();
		}
		haxe_Log.trace("Updated permissions for " + command.name,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 24, className : "util.DiscordUtil", methodName : "setCommandPermission"});
	},function(err) {
		if(fail != null) {
			fail(err);
		}
		haxe_Log.trace(err,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 29, className : "util.DiscordUtil", methodName : "setCommandPermission"});
		haxe_Log.trace("Failed to update permissions for " + command.name,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 30, className : "util.DiscordUtil", methodName : "setCommandPermission"});
	});
};
util_DiscordUtil.reactionTracker = function(message,track,time) {
	if(time == null) {
		time = -1;
	}
	var filter = function(reaction,user) {
		if(reaction.emoji.name == "✅") {
			return true;
		}
		if(reaction.emoji.name == "❎") {
			return true;
		}
		reaction.remove();
		return false;
	};
	if(time == -1) {
		time = 172800000;
	}
	message.react("✅").then(null,function(err) {
		haxe_Log.trace(err,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 53, className : "util.DiscordUtil", methodName : "reactionTracker"});
		$global.console.dir(err);
	}).then(function(_) {
		message.react("❎").then(null,function(err) {
			haxe_Log.trace(err,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 57, className : "util.DiscordUtil", methodName : "reactionTracker"});
			$global.console.dir(err);
		}).then(function(_) {
			var collector = message.createReactionCollector({ filter : filter, time : time});
			var _g = track;
			var collector1 = collector;
			collector.on("collect",function(collected,user) {
				_g(collector1,collected,user);
			});
		});
	});
};
util_DiscordUtil.getChannel = function(channel_id,callback) {
	Main.client.channels.fetch(channel_id).then(callback,function(err) {
		haxe_Log.trace(err,{ fileName : "src/util/DiscordUtil.hx", lineNumber : 68, className : "util.DiscordUtil", methodName : "getChannel"});
		$global.console.dir(err);
	});
};
var util_Random = function() { };
$hxClasses["util.Random"] = util_Random;
util_Random.__name__ = "util.Random";
util_Random.bool = function() {
	return Math.random() < 0.5;
};
util_Random.int = function(from,to) {
	return from + Math.floor((to - from + 1) * Math.random());
};
util_Random.float = function(from,to) {
	return from + (to - from) * Math.random();
};
util_Random.string = function(length,charactersToUse) {
	if(charactersToUse == null) {
		charactersToUse = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	}
	var str = "";
	var _g = 0;
	while(_g < length) {
		++_g;
		str += charactersToUse.charAt(Math.floor((charactersToUse.length - 1 + 1) * Math.random()));
	}
	return str;
};
util_Random.date = function(earliest,latest) {
	var from = earliest.getTime();
	return new Date(from + (latest.getTime() - from) * Math.random());
};
util_Random.fromArray = function(arr) {
	if(arr != null && arr.length > 0) {
		return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
	} else {
		return null;
	}
};
util_Random.shuffle = function(arr) {
	if(arr != null) {
		var _g = 0;
		var _g1 = arr.length;
		while(_g < _g1) {
			var i = _g++;
			var j = Math.floor((arr.length - 1 + 1) * Math.random());
			var a = arr[i];
			var b = arr[j];
			arr[i] = b;
			arr[j] = a;
		}
	}
	return arr;
};
util_Random.fromIterable = function(it) {
	if(it != null) {
		var arr = Lambda.array(it);
		if(arr != null && arr.length > 0) {
			return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
util_Random.enumConstructor = function(e) {
	if(e != null) {
		var arr = e.__empty_constructs__.slice();
		if(arr != null && arr.length > 0) {
			return arr[Math.floor((arr.length - 1 + 1) * Math.random())];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
var vm2_NodeVM = require("vm2").NodeVM;
var vm2_VMScript = require("vm2").VMScript;
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
Main.logged_in = false;
Main.registered_commands = new haxe_ds_StringMap();
Main.commands_active = false;
Main.connected = false;
Main.dm_help_tracking = new haxe_ds_StringMap();
Main.active_systems = new haxe_ds_StringMap();
Main.guild_id = "162395145352904705";
CommandPermission.admin = 8;
CommandPermission.supermod = 4;
CommandPermission.everyone = 1024 | 2048;
haxe_SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe_SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
bits_BitsData.CELL_SIZE = 32;
commands_HelpType.run = "run";
commands_HelpType.rtfm = "rtfm";
commands_HelpType.notify = "notify";
commands_HelpType.helppls = "helppls";
commands_HelpType.helppls_dm = "helppls_dm";
commands_PollTime.fifteen = 900000;
commands_PollTime.thirty = 1800000;
commands_PollTime.one_hour = 3600000;
commands_PollTime.four_hours = 14400000;
commands_PollTime.eight_hours = 28800000;
commands_PollTime.twelve_hours = 43200000;
commands_PollTime.one_day = 86400000;
commands_PollTime.three_days = 259200000;
commands_PollTime.five_days = 432000000;
commands_PollTime.one_week = 604800000;
commands_PollTime.two_weeks = 1210000000;
commands_types_Duration.minute = 60000;
commands_types_Duration.hour = 3600000;
commands_types_Duration.day = 86400000;
commands_types_Duration.week = 604800000;
commands_types_Duration.month = 2419200000;
components_TextCommand.mention = "!mention";
components_TextCommand.run = "!run";
ecs_Entity.none = ecs_Entity._new(-1);
ecs_ds_Unit.unit = ecs_ds_Unit._new();
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
haxe_io_FPHelper.i64tmp = new haxe__$Int64__$_$_$Int64(0,0);
haxe_io_FPHelper.LN2 = 0.6931471805599453;
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
haxe_io_UInt8Array.BYTES_PER_ELEMENT = 1;
sys_io_File.copyBufLen = 65536;
sys_io_File.copyBuf = js_node_buffer_Buffer.alloc(65536);
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map