// ver:0125
// ver:0126
// ver:0130
// ver:0132
// ver:0133
// ver:0134
// ver:0135
// ver:0136
// ver:0139
// ver:0143
// ver:0147

setTimeout( function() { console.log("---- timeout 0"); } , 0 );
setTimeout( function() { console.log("---- timeout 1"); } , 1 );

var upixel = upixel || {};
upixel.logs = false; 
upixel.debug = false; 
upixel.init = false;	
upixel.plugin = null;
upixel.plugins = {};
upixel.msgno = 0;	
upixel.src = "";
upixel.max_history_length = 100;
upixel.utm_source_exdays = 3;
upixel.url_short_visit_delay = 3;
upixel.max_length_short = 200;
upixel.max_length_long = 2048;
upixel.session_minutes = 30;
upixel.button_clicked_attr_name = "data-upixel-event";
upixel.domain = null;
upixel.webservice = null;
upixel.cart = [];
upixel.StructuredDataTypes = ["Product","ProductGroup"];

//
upixel.data = {};
upixel.data.ukey = null;
upixel.data.token = null;
upixel.data.Anonymous = false;
upixel.data.ContactRefId = null;
upixel.data.ContactData = null;
upixel.data.EventType = null;
upixel.data.EventName = null;
upixel.data.URL = null;
upixel.data.Title = null;
upixel.data.Description = null;
upixel.data.Keywords = null;
upixel.data.Param1 = null;
upixel.data.Param2 = null;
upixel.data.utm_source = null;
upixel.data.StructuredData = null;

//
upixel.awake = function() {
		
	//
	upixel.views = parseInt(localStorage.getItem("upixel.views")) || 0;	
	upixel.visits = parseInt(localStorage.getItem("upixel.visits")) || 0;
	var lastview = localStorage.getItem("upixel.lastview");
	var now = new Date();
	if ( !!!upixel.visits || !!!lastview || (new Date(lastview).getTime() + upixel.session_minutes * 60 * 1000) < now.getTime() ) {
		upixel.views = 0;
		upixel.visits++;
		localStorage.setItem("upixel.visits", upixel.visits);
		}
	localStorage.setItem("upixel.lastview",now.toISOString());
	upixel.views++;
	localStorage.setItem("upixel.views",upixel.views);	

	// set ukey
	const scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		if (scripts[i].src.indexOf("upixel2.js")==-1) continue;
		upixel.src = scripts[i].src;
		break;
		}
	
	// set site top domain
	var hostname = window.location.hostname;
	var firstTLDs  = "il|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt".split('|');
	var secondTLDs = "com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc".split('|');
	var s = hostname;
	s = s.replace(/^www\./, '');
	var parts = s.split('.');
	while (parts.length > 3) parts.shift();
	if (
		parts.length === 3 && 
		(
			(parts[1].length > 2 && parts[2].length > 2) || 
			(secondTLDs.indexOf(parts[1]) === -1) && 
			firstTLDs.indexOf(parts[2]) === -1
		)
		) parts.shift();
	upixel.domain = parts.join('.');	
	
	//
	if (upixel.debug) upixel.url_short_visit_delay = 0;
	if (upixel.debug) upixel.max_history_length = 3;
	
	//
	if (!!upixel.get_url_parameter("upixel_logs")) {
		upixel.logs = true;
		upixel.cookie("upixel.logs","true",1);
		} else if (!!upixel.cookie("upixel.logs")) {
		upixel.logs = true;
		}
		
	//	
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {	
			upixel.start();	
			upixel.popup.start();
			});
		} else {
		upixel.start();		
		upixel.popup.start();		
		}
	
	};
	
upixel.start = function() {
	if (upixel.init) return;
	upixel.init = true;

	//	
	var org = JSON.parse(JSON.stringify(upixel.data));	
		
	// set ukey
	const urlParams = new URLSearchParams(upixel.src.split('?')[1]);
	upixel.data.ukey = urlParams.get("ukey");
	
	// set webservice
	var src = upixel.src.split("/");
	src.splice(-1,1);
	src = src.join("/")+"/upixel2.php?";
	upixel.webservice = src;		
	
	//
	upixel.data.ContactData = upixel.GetContactData( upixel.cookie("upixel.ContactData") );	
	if (!!upixel.data.ContactData) {
		if (!!upixel.data.token || upixel.data.ContactRefId) upixel.ClearCache(true);
		upixel.data.ContactRefId = null;
		upixel.data.token = null;
		upixel.cookie("upixel.ContactRefId","");
		upixel.cookie("upixel.token","");
		}
		
	//
	upixel.data.ContactRefId = upixel.cookie("upixel.ContactRefId");	
	if (!!upixel.data.ContactRefId) {
		if (!!upixel.data.token || !!upixel.data.ContactData) upixel.ClearCache(true);
		upixel.data.ContactData = null;
		upixel.data.token = null;
		upixel.cookie("upixel.ContactData","");
		upixel.cookie("upixel.token","");
		}

	// set user token
	upixel.data.token = upixel.get_url_parameter("upixel");
	if (!!upixel.data.token) {
		if (!!upixel.data.ContactData || !!upixel.data.ContactRefId || upixel.data.token!=upixel.cookie("upixel.token")) upixel.ClearCache(true);
		upixel.cookie("upixel.token",upixel.data.token);
		if (!!upixel.data.ContactData) {
			upixel.data.ContactData = null;
			upixel.cookie("upixel.ContactData","");
			}
		if (!!upixel.data.ContactRefId) {
			upixel.data.ContactRefId = null;
			upixel.cookie("upixel.ContactRefId","");
			}			
	    } else {
		upixel.data.token = upixel.cookie("upixel.token");
		}
	
	//
	if (!!org.ContactData) {
		if (!!upixel.data.ContactRefId || !!upixel.data.token || !upixel.CompareContactData(upixel.data.ContactData,org.ContactData)) upixel.ClearCache(true);
		upixel.data.ContactData = org.ContactData;
		upixel.cookie("upixel.ContactData", JSON.stringify(org.ContactData) );
		upixel.data.ContactRefId = null;
		upixel.data.token = null;
		upixel.cookie("upixel.token","");		
		upixel.cookie("upixel.ContactRefId","");		
		}
	
	//
	if (!!org.ContactRefId) {
		if (!!upixel.data.ContactData || !!upixel.data.token || upixel.data.ContactRefId!=org.ContactRefId) upixel.ClearCache(true);
		upixel.data.ContactRefId = org.ContactRefId;
		upixel.cookie("upixel.ContactRefId",org.ContactRefId);
		upixel.data.token = null;
		upixel.data.ContactData = null;
		upixel.cookie("upixel.token","");		
		upixel.cookie("upixel.ContactData","");		
		}
		
	// set utm_source
	upixel.data.utm_source = upixel.trim( upixel.get_url_parameter("utm_source") , upixel.max_length_short );
	if (!!upixel.data.utm_source) upixel.cookie("upixel.utm_source",upixel.data.utm_source,upixel.utm_source_exdays);
		else upixel.data.utm_source = upixel.trim( upixel.cookie("upixel.utm_source") , upixel.max_length_short );

	//
	upixel.data.URL = 				upixel.trim(window.location.href , upixel.max_length_long );
	upixel.data.Title = 			upixel.trim(document.title , upixel.max_length_short );
	upixel.data.Description = 		upixel.trim(document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').getAttribute('content') : null , upixel.max_length_short );
	upixel.data.Keywords = 			upixel.trim(document.querySelector('meta[name="keywords"]') ? document.querySelector('meta[name="keywords"]').getAttribute('content') : null , upixel.max_length_short );
	upixel.data.StructuredData = 	upixel.trim(upixel.GetStructuredData(),upixel.max_length_short);
	
	// UpixelEvent
	const elements = document.querySelectorAll('['+upixel.button_clicked_attr_name+']');
	elements.forEach((element)=> {
		element.addEventListener('click', (event)=> {
			const EventName = element.getAttribute(upixel.button_clicked_attr_name);
			if (!!!EventName) return;
			upixel.send("ButtonClicked",EventName);
			});
		});
		
	//
	if (!!org.Param1) upixel.data.Param1 = org.Param1;
	if (!!org.Param2) upixel.data.Param2 = org.Param2;
	if (!!org.StructuredData) upixel.data.StructuredData = org.StructuredData;
		
	//	
	upixel.data.Anonymous = !!upixel.data.ContactData || !!upixel.data.ContactRefId || !!upixel.data.token ? false: true;
	
	//
	try {
		upixel.cart = JSON.parse( localStorage.getItem("upixel.cart") );
		if (!!!upixel.cart || !Array.isArray(upixel.cart)) upixel.cart = [];
		} catch (e) {
		upixel.cart = [];
		}
		
	//
	// upixel.plugin = upixel.GetPlugin(); // uncomment...
	if (upixel.plugin) upixel.message("INITIALIZED"+(upixel.plugin?" / "+upixel.plugin.name:""),upixel.data);
	
	upixel.flush();
	setTimeout( () => { upixel.send("UrlShortVisit"); } , 1000*upixel.url_short_visit_delay );
	
	//
	window.addEventListener("message", (event) => {
		// console.log("message",event.data);
		if (!!event.data && typeof event.data == "object" && !!event.data.method && event.data.method=="SetUpixel") upixel.SetUpixel(event.data.value);
		});
		
	if (upixel.plugin) upixel.plugin.init();	
	
	
	};
	
upixel.flush = function() {
	
	if (!!!upixel.data.token && !!!upixel.data.ContactRefId && !!!upixel.data.ContactData) return;
	
	var json = localStorage.getItem("upixel.history");
	localStorage.removeItem("upixel.history");
	if (!!!json) return;
	
	var rows = null;
	try {
		var rows = JSON.parse(json);
		if (!!!rows || !Array.isArray(rows)) rows = [];
		} catch (e) {
		rows = [];	
		}	
	
	rows.forEach(function(data) {
		data.Anonymous = true;	
		data.token = upixel.data.token;
		data.ContactRefId = upixel.data.ContactRefId;
		data.ContactData = upixel.data.ContactData;
		data.secoffset = Math.round((Date.now() - data._created)/1000);
		delete data._created;
		// console.log( JSON.stringify(data, null, 2) );
		upixel.message("SEND / "+data.EventType,data);
		
		fetch(upixel.webservice+"action=flush", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify(data)
			}).then(response => {
				if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
				return response.json();
			}).then(data => {
			if (upixel.debug) console.log('Flush:', JSON.stringify(data, null, 2) );
			}).catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
			});
		
		});
			
	};
	
upixel.send = function(EventType,EventName,EventData,StructuredData) {

	//
	if (!!!upixel.data.ukey) return;
	if (!!!EventType) return;
	if (!!!EventName) EventName = null;
	if (!!!EventData) EventData = null;
	if (!!!StructuredData) StructuredData = null;
		
	var data = JSON.parse(JSON.stringify(upixel.data));
	data.EventType = upixel.trim(EventType,upixel.max_length_short);
	data.EventName = upixel.trim(EventName,upixel.max_length_short);
	data.EventData = upixel.trim(EventData,upixel.max_length_short);
	if (!!StructuredData) data.StructuredData = upixel.trim(StructuredData,upixel.max_length_short);
	
	data.Anonymous = false;
	data.secoffset = 0;

	if (!!!upixel.data.token && !!!upixel.data.ContactRefId && !!!upixel.data.ContactData) {
		data._created = Date.now();
		data.Anonymous = true;
		//
		var json = localStorage.getItem("upixel.history");
		var rows = null;
        try {
            rows = JSON.parse(json);
			if (!!!rows || !Array.isArray(rows)) rows = [];
			} catch (e) {
			rows = [];
			}		
		rows.push(data);
		if (rows.length>upixel.max_history_length) rows.shift();
		localStorage.setItem("upixel.history",  JSON.stringify(rows, null, 2) );
		upixel.message("SAVE / " + data.EventType ,data);
		return;
		}	
	
	upixel.message("SEND / "+data.EventType,data);
	
	// var qs = [];
	// for(var key in data) qs.push(key+"="+encodeURIComponent(data[key]));
	// var url = upixel.webservice+qs.join("&");
	// var script = document.createElement('script');
	// script.src = url;
	// document.getElementsByTagName("head")[0].appendChild(script);	
	
	fetch(upixel.webservice+"action=send", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(data)
		}).then(response => {
			if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
			return response.json();
		}).then(data => {
		if (upixel.debug) console.log('Send:', JSON.stringify(data, null, 2) );
		}).catch((error) => {
		console.error('There was a problem with the fetch operation:', error);
		});	
	
	};
	
upixel.message = function(name,data) {
	if (!upixel.logs) return;
	
	upixel.msgno++;
		
	if (typeof data === "undefined") {
	
		console.log(
			"%c UPIXEL %c "+name+ " %c "+upixel.msgno,
			"color: white; background-color: #007700; border: 1px solid #007700; padding: 4px 0px 4px 0px; margin-left: 5px;",
			"color: #007700; background-color: white; border: 1px solid #007700; padding: 4px 0px 4px 0px;",
			"color: #007700; padding: 4px 0px 4px 0px;"
			);		
		
		} else {

		console.groupCollapsed(
			"%c UPIXEL %c "+name+ " %c "+upixel.msgno,
			"color: white; background-color: #007acc; border: 1px solid #007acc; padding: 4px 0px 4px 0px;",
			"color: #007acc; background-color: white; border: 1px solid #007acc; padding: 4px 0px 4px 0px;",
			"color: #007acc; padding: 4px 0px 4px 0px;"
			);		
		console.log( JSON.stringify(data, null, 2) );
		console.groupEnd();
		
		}
	};
	
upixel.cookie = function(name,value,exdays) {
		
	if (typeof value === "undefined") {
		var cname = name + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(cname) == 0) {
				value = c.substring(cname.length, c.length);
				if (!value || value=="") return null;
				return value;
				}
			}
		return null;		
		}
		
		
	if (typeof exdays === "undefined") exdays = 30;
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	// var domain = "."+upixel.domain; // 3rd party script cannot set cross domain cookies
	var domain = window.location.host;
	document.cookie = name + "=" + value + ";" + expires + ";domain="+domain+";path=/";		
		
	};

upixel.get_url_parameter = function(name) {
	if (!name || name=="") return null;
	var url = window.location.href;
	var tmp = url.split("?");
	if (tmp.length<2) return null;
	tmp = tmp[1].split("&");
	if (tmp.length<1) return null;
	for(var i=0; i<tmp.length; i++) {
		var str = tmp[i].split("=");
		if (str.length<2) continue;
		if (str[0]!=name) continue;
		if (!str[1] || str[1]=="") return null;
		return str[1];
		}
	return null;
	};
	
upixel.trim = function (value,len) {
	
	//
	if (!!!value) return value;
	
	//
	if (typeof value === 'object' ) {
		for (let key in value) {
			value[key] = upixel.trim(value[key],len);
			}
		return value;	
		}
	
	//
	var str = value.toString();
	if (str<=len) return value;
	str = str.substr(0,len);
	return str;
	
	};

upixel.md5 = function(inputString) {
	var hc="0123456789abcdef";
	function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
	function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
	function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
	function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
	function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
	function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
	function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
	function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
	function sb(x) {
		var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
		for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
		blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
		}
	var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
	for(i=0;i<x.length;i+=16) {
		olda=a;oldb=b;oldc=c;oldd=d;
		a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
		b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
		c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
		d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
		a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
		b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
		c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
		d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
		a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
		b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
		c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
		d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
		a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
		b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
		c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
		d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
		a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
		b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
		c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
		d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
		a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
		b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
		}
	return rh(a)+rh(b)+rh(c)+rh(d);
	};
		
upixel.ExtractMicrodata = function(el) {
	const result = {};
	if (el.hasAttribute('itemtype')) result['@type'] = el.getAttribute('itemtype').split('/').pop();
	for (const child of el.children) {
		if (!child.hasAttribute('itemprop')) {
			if (child.children.length > 0) {
				const nested = upixel.ExtractMicrodata(child);
				for (const key in nested) {
					if (!result[key]) {
						result[key] = nested[key];
						} else {
						if (!Array.isArray(result[key])) result[key] = [result[key]];
						result[key].push(nested[key]);
						}
					}
				}
			continue;
			}

		const key = child.getAttribute('itemprop');
		let value = null;
		if (child.hasAttribute('itemscope')) 			value = upixel.ExtractMicrodata(child);
			else if (child.hasAttribute('content')) 	value = child.getAttribute('content');
			else if (child.hasAttribute('src')) 		value = child.getAttribute('src');
			else 										value = child.textContent.trim();

		if (!result[key]) {
			result[key] = value;
			} else {
			if (!Array.isArray(result[key])) result[key] = [result[key]];
			result[key].push(value);
			}
		}
	return result;
	};
	
upixel.GetStructuredData = function() {
	
	//
	var data = null;

	// JSON LD
	var scripts = document.querySelectorAll('script[type="application/ld+json"]');
	scripts.forEach(function(script) {
		//
		if (data) return;
		
		//
        try {
			
            var json = JSON.parse(script.innerHTML);
			if (typeof json !== 'object') return;
			if (Array.isArray(json)) return;

			//
		
			if (!!json["@type"] && upixel.StructuredDataTypes.indexOf(json["@type"])>=0) {
				data = json;
				return;
				}				
		
			//
			if (!!json["@graph"] && typeof json["@graph"]=='object' && Array.isArray(json["@graph"])) {
				json["@graph"].forEach(function(graph) {
					if (data) return;
					if (typeof graph !== 'object') return;
					if (Array.isArray(graph)) return;
					if (!!!graph["@type"] || upixel.StructuredDataTypes.indexOf(graph["@type"])<0) return;
					data = graph;
					return;		
					});
				}
			
			} catch (e) {
				
			}

		});
		
	//	
	if (data) return data;	
		
	// MICRODATA	
	const productScope = document.querySelector('[itemscope][itemtype*="schema.org/Product"]');
	if (productScope) {
		const productData = upixel.ExtractMicrodata(productScope);
		if (!!productData && !!productData["@type"] && upixel.StructuredDataTypes.indexOf(productData["@type"])>=0) {
			// console.log(productData);
			data = productData;
			return data;
			}
		}	
		
	// console.log(JSON.stringify(data));		
	return data;		
	
	};
	
//

upixel.Order = function(params) {
/*
{
  "OrderNumber": "220183",
  "OrderId": 6561025556658,
  "OrderTime": "2026-01-06T15:12:09",
  "OrderAmount": 120.00,
  "OrderStatus": "Some status",
  "OrderState": "some state example",
  "BillingAddress": "נתניה",
  "ShippingAddress": "באר שבע",
  "PaymentDescription": "PayPlus - Payment Gateway",
  "ShippingDescription": "משלוח עד הבית",
  "ShippingTrackingUrl": null,
  "Currency": "ILS",
  "OrderItems": [
    {
      "ProductId": "46925621264562",
      "ProductCode": "93-9916-06-OS",
      "ProductName": "חולצת קיידן",
      "ProductQty": 2.0,
      "ProductPrice": 75.00,
      "ProductPrice2": 60.00
    }
  ]
}
*/

	//
	if (!!!params) return;
	if (typeof params !== 'object') return false;
	if (Array.isArray(params)) return false;
	
	//
	var data = {};	
	if (!!params.OrderNumber) data.OrderNumber = params.OrderNumber;
	if (!!params.OrderId) data.OrderId = params.OrderId;
	if (!!params.OrderTime) data.OrderTime = params.OrderTime;
	if (!!params.OrderAmount) data.OrderAmount = params.OrderAmount;
	if (!!params.OrderStatus) data.OrderStatus = params.OrderStatus;
	if (!!params.OrderState) data.OrderState = params.OrderState;
	if (!!params.BillingAddress) data.BillingAddress = params.BillingAddress;
	if (!!params.BillingAddress) data.BillingAddress = params.BillingAddress;
	if (!!params.ShippingAddress) data.ShippingAddress = params.ShippingAddress;
	if (!!params.PaymentDescription) data.PaymentDescription = params.PaymentDescription;
	if (!!params.ShippingDescription) data.ShippingDescription = params.ShippingDescription;
	if (!!params.ShippingTrackingUrl) data.ShippingTrackingUrl = params.ShippingTrackingUrl;
	if (!!params.Currency) data.Currency = params.Currency;
	
	//
	if (params.OrderItems && Array.isArray(params.OrderItems)) {
		data.OrderItems = [];
		params.OrderItems.forEach( (row,index) => {
			if (!row || Object.prototype.toString.call(row) !== '[object Object]') return;
			var item = {};
			if (!!row.ProductId) item.ProductId = row.ProductId;
			if (!!row.ProductCode) item.ProductCode = row.ProductCode;
			if (!!row.ProductName) item.ProductName = row.ProductName;
			if (!!row.ProductPrice) item.ProductPrice = row.ProductPrice;
			if (!!row.ProductPrice2) item.ProductPrice2 = row.ProductPrice2;
			if (!!row.ProductQty) item.ProductQty = row.ProductQty;
			data.OrderItems.push(item);
			});		
		}

	//
	upixel.send("EcommerceEvent","Order",data);
	return true;
	
	};

upixel.FormSubmission = function(params) {
	/*
{
  "FormId": "123",
  "FormName": "Stam Form",
  "PhoneNumber": "0541234567",
  "CustomerEmail": "customerEmail@gmail.com",
  "FormFields": [
    {"name": "SomeField",  "value": "value1"},
    {"name": "SomeField2", "value": "value2"}
  ]
}
	
	*/
	
	//
	if (!!!params) return;
	if (typeof params !== 'object') return false;
	if (Array.isArray(params)) return false;
	
	//
	var data = {};	
	if (!!params.FormId) data.FormId = params.FormId;
	if (!!params.FormName) data.FormName = params.FormName;
	if (!!params.PhoneNumber) data.PhoneNumber = params.PhoneNumber;
	if (!!params.CustomerEmail) data.CustomerEmail = params.CustomerEmail;

	//
	if (params.FormFields && Array.isArray(params.FormFields)) {
		data.FormFields = [];
		params.FormFields.forEach( (row,index) => {
			if (!row || Object.prototype.toString.call(row) !== '[object Object]') return;
			var item = {};
			if (!!row.name) item.name = row.name;
			if (!!row.value) item.value = row.value;
			data.FormFields.push(item);
			});		
		}

	//
	upixel.send("EcommerceEvent","FormSubmission",data);
	return true;
	
	};
	
upixel.ProfileUpdate = function(params) {
	
	// UpdatedFields	{"FirstName":"__new_value_"}
	// PreviousValues	{"FirstName":"__old_value_"}
	
	//
	if (!!!params) return;
	if (typeof params !== 'object') return false;
	if (Array.isArray(params)) return false;
	
	//
	var data = {};	

	//
	if (params.UpdatedFields && Object.prototype.toString.call(params.UpdatedFields) === '[object Object]') {
		data.UpdatedFields = {};
		for (const [key, value] of Object.entries(params.UpdatedFields)) {
			data.UpdatedFields[key] = typeof val !== 'object' && typeof val !== 'function' ? value : null;
			}
		} else {
		return false;	
		}
	
	//
	if (params.PreviousValues && Object.prototype.toString.call(params.PreviousValues) === '[object Object]') {
		data.PreviousValues = {};
		for (const [key, value] of Object.entries(params.PreviousValues)) {
			data.PreviousValues[key] = typeof val !== 'object' && typeof val !== 'function' ? value : null;
			}
		}	

	//
	upixel.send("EcommerceEvent","ProfileUpdate",data);
	return true;
	
	};
	
upixel.CustomerRegister = function(params) {
/*
{
  "ContactRefId": "qwerty123456",
  "PhoneNumber": "0541234567",
  "CustomerEmail": "customerEmail@gmail.com",
  "CustomerFirstName": "משה",
  "CustomerLastName": "ונטילטור",
  "CustomerBirthDate": "1972-01-01",
  "CustomerGender": 1, // male 1, female 2
  "EmailSubscriberStatus": "Subscribed",
  "PhoneSubscriberStatus": "Subscribed"
}
*/
	
	//
	if (!!!params) return;
	if (typeof params !== 'object') return false;
	if (Array.isArray(params)) return false;
	
	//
	if (!!params.ContactRefId) upixel.SetContactRefId(params.ContactRefId);
		else if (!!params.CustomerEmail || !!params.PhoneNumber) upixel.SetContactData( params.CustomerEmail ?? null , params.EmailSubscriberStatus ?? null , params.PhoneNumber ?? null , params.PhoneSubscriberStatus ?? null );
		// else return false;
	
	//
	var data = {};	
	if (!!params.ContactRefId) data.ContactRefId = params.ContactRefId;
	if (!!params.PhoneNumber) data.PhoneNumber = params.PhoneNumber;
	if (!!params.CustomerEmail) data.CustomerEmail = params.CustomerEmail;
	if (!!params.CustomerFirstName) data.CustomerFirstName = params.CustomerFirstName;
	if (!!params.CustomerLastName) data.CustomerLastName = params.CustomerLastName;
	if (!!params.CustomerBirthDate) data.CustomerBirthDate = params.CustomerBirthDate;
	if (!!params.CustomerGender) data.CustomerGender = params.CustomerGender;
	if (!!params.EmailSubscriberStatus) data.EmailSubscriberStatus = params.EmailSubscriberStatus;
	if (!!params.PhoneSubscriberStatus) data.PhoneSubscriberStatus = params.PhoneSubscriberStatus;
	
	//
	upixel.send("EcommerceEvent","CustomerRegister",data);
	return true;

	};

//		
		
upixel.SetShoppingCart = function(items) {
	// item: ProductCode, ProductName, ProductPrice, ProductDescription, ProductLink, ProductImage, ProductQty
	if (!!!items || !Array.isArray(items)) items = [];
	var changed = JSON.stringify(items) == JSON.stringify(upixel.cart) ? false : true;
	if (!changed) return;
	
	//
	upixel.cart = items;
	localStorage.setItem("upixel.cart",  JSON.stringify(upixel.cart, null, 2) );
	upixel.send("CustomEvent","CartUpdate",upixel.cart);
		
	};
	
upixel.EventTrigger = function(EventName,EventData,StructuredData) {
	if (!!!EventName) return;
	upixel.send("CustomEvent",EventName,EventData,StructuredData);
	};
		
upixel.SetParam1 = function(value) {
	if (!!value) upixel.data.Param1 = upixel.trim(value,upixel.max_length_short);
	else upixel.data.Param1 = null;
	
	upixel.message("SetParam1 / "+value);
	
	};
	
upixel.SetParam2 = function(value) {
	if (!!value) upixel.data.Param2 = upixel.trim(value,upixel.max_length_short);
	else upixel.data.Param2 = null;
	
	upixel.message("SetParam2 / "+value);
	};	
	
upixel.SetStructuredData = function(json) {
	// https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
	if (!!!json) return;
	if (typeof json !== 'object') return;
	if (Array.isArray(json)) return;	
	if (!!!json["@type"]) return;
	if (upixel.StructuredDataTypes.indexOf(json["@type"])<0) return;
	upixel.data.StructuredData = upixel.trim(json,upixel.max_length_short);
	upixel.message("SetStructuredData",upixel.data.StructuredData);
	};

upixel.SetUpixel = function(str) {
	
	upixel.message("SetUpixel / "+str);
	if (!!!str) return;
	if (upixel.data.token==str) return;
		
	if (!!upixel.data.token || !!upixel.data.ContactRefId || !!upixel.data.ContactData) upixel.ClearCache(true);
		
	upixel.data.Anonymous = false;
	upixel.data.ContactRefId = null;
	upixel.data.ContactData = null;
	upixel.data.token = str;
	
	upixel.cookie("upixel.ContactData","");
	upixel.cookie("upixel.ContactRefId","");
	upixel.cookie("upixel.token",upixel.data.token);
	upixel.flush();	
	
	};
	
upixel.SetContactRefId = function(str) {
	
	upixel.message("SetContactRefId / "+str);
	
	if (!!!str) {
		if (!!upixel.data.ContactRefId) upixel.ClearCache(true);
		upixel.data.ContactRefId = null;
		upixel.cookie("upixel.ContactRefId","");
		return;
		}

	//
	var newContactRefId = upixel.trim(str,upixel.max_length_short);
	if (!!upixel.data.token || !!upixel.data.ContactData || upixel.data.ContactRefId!=newContactRefId) upixel.ClearCache(true);

	//
	upixel.data.ContactRefId = newContactRefId;
	upixel.cookie("upixel.ContactRefId",upixel.data.ContactRefId);
	
	//
	upixel.data.token = null;
	upixel.data.ContactData = null;
	upixel.cookie("upixel.token","");
	upixel.cookie("upixel.ContactData","");
	
	//
	upixel.flush();
	
	};

upixel.SetContactData = function(Email,EmailSubscriberStatus,PhoneNumber,PhoneSubscriberStatus) {
	
	var value = upixel.GetContactData({Email:Email,EmailSubscriberStatus:EmailSubscriberStatus,PhoneNumber:PhoneNumber,PhoneSubscriberStatus:PhoneSubscriberStatus});
	upixel.message("SetContactData / "+ JSON.stringify(value) );
	
	if (!!!value) {
		if (!!upixel.data.ContactData) upixel.ClearCache(true);
		upixel.data.ContactData = null;
		upixel.cookie("upixel.ContactData","");
		return;
		}

	//
	if (!!upixel.data.token || !!upixel.data.ContactRefId || !upixel.CompareContactData(upixel.data.ContactData,value)) upixel.ClearCache(true);
	upixel.data.ContactData = value;

	
	upixel.cookie("upixel.ContactData",JSON.stringify(value));
	
	//
	upixel.data.token = null;
	upixel.data.ContactRefId = null;
	upixel.cookie("upixel.token","");
	upixel.cookie("upixel.ContactRefId","");
	
	//
	upixel.flush();

	
	};

upixel.GetContactData = function(value) {
	try {
		if (!!!value) return null;
		if (Object.prototype.toString.call(value) === '[object String]') value = JSON.parse(value); // isString
		if (Object.prototype.toString.call(value) === '[object object]') value = JSON.parse(value); // isPlainObject
		if (!!!value) return null;
		if (!!!value.Email && !!!value.PhoneNumber) return null;	
		var data = {};
		
		//
		data.Email = !!value.Email ? value.Email : null;
		data.EmailSubscriberStatus = null;
		if (!!data.Email && !!value.EmailSubscriberStatus && value.EmailSubscriberStatus=="Subscribed") data.EmailSubscriberStatus = "Subscribed"; 
		if (!!data.Email && !!value.EmailSubscriberStatus && value.EmailSubscriberStatus=="Unsubscribed") data.EmailSubscriberStatus = "Unsubscribed"; 

		//
		data.PhoneNumber = !!value.PhoneNumber ? value.PhoneNumber : null;
		data.PhoneSubscriberStatus = null;
		if (!!data.PhoneNumber && !!value.PhoneSubscriberStatus && value.PhoneSubscriberStatus=="Subscribed") data.PhoneSubscriberStatus = "Subscribed"; 
		if (!!data.PhoneNumber && !!value.PhoneSubscriberStatus && value.PhoneSubscriberStatus=="Unsubscribed") data.PhoneSubscriberStatus = "Unsubscribed"; 		
				
		return data;
		} catch (err) {	
		// console.log(err);
		return null;
		}
	};

upixel.CompareContactData = function(v1,v2) {
	v1 = upixel.GetContactData(v1);
	v2 = upixel.GetContactData(v2);
	if (!v1 && !v2) return true;
	if (!v1 || !v2) return false;
	if (v1.Email != v2.Email) return false;
	if (v1.EmailSubscriberStatus != v2.EmailSubscriberStatus) return false;
	if (v1.PhoneNumber != v2.PhoneNumber) return false;
	if (v1.PhoneSubscriberStatus != v2.PhoneSubscriberStatus) return false;
	return true;	
	};	

upixel.GetPlatform = function() {
	if (window.matchMedia("(max-width: 768px)").matches) return "Mobile";
	return "Desktop";
	};

upixel.ClearCache = function(all) {
	
	function expired(key) {
		if (!!!key) return true;
		var row = localStorage.getItem(key);
		if (!!!row) return true;
		row = JSON.parse(row);
		if (!!!row) return true;
		if (!!!row.expire) return true;
		if (new Date() > new Date(row.expire)) return true;
		return false;		
		}
	
	const keys = Object.keys(localStorage);
	for(const key of keys) {
		if (key.indexOf("upixel.cache")!==0) continue;
		var remove = false;
		if (!remove && all) remove = true;
		if (!remove && expired(key)) remove = true;
		if (remove)  localStorage.removeItem(key);	
		// console.log(remove,key);
		}	
	
	};

upixel.GetPlugin = function() {
		
	var doc = document;
	var win = window;		
		
	function detectShopify() {
		var score = 0;
		if (win.Shopify) score += 3;
		if (win.ShopifyAnalytics) score += 2;
		if (doc.querySelector('meta[name="shopify-checkout-api-token"]')) score += 3;
		if (doc.querySelector('script[src*="cdn.shopify.com"]')) score += 2;
		if (location.pathname.indexOf('/cart.js') !== -1) score += 1;
		return score;
		}

	function detectWoo() {
		var score = 0;
		if (win.woocommerce_params) score += 3;
		if (win.wc_add_to_cart_params) score += 3;
		var body = doc.body;
		if (body) {
			var cls = body.className || "";
			if (/\bwoocommerce\b/.test(cls) || /\bwoocommerce-page\b/.test(cls) || /\bwoocommerce-js\b/.test(cls)) score += 2;
			}
		var metaGen = doc.querySelector('meta[name="generator"]');
		if (metaGen && /WordPress/i.test(metaGen.content || "")) score += 1;
		if (doc.querySelector('link[href*="wp-content/plugins/woocommerce"], script[src*="wp-content/plugins/woocommerce"]')) score += 2;
		return score;
		}

	function detectMagento() {
		var score = 0;
		if (doc.querySelector('[data-mage-init]')) score += 3;
		if (doc.querySelector('script[src*="/static/"], script[src*="/pub/static/"]')) score += 2;
		var cookies = document.cookie || "";
		if (/mage-cache-storage/.test(cookies)) score += 2;
		var metaGen = doc.querySelector('meta[name="generator"]');
		if (metaGen && /Magento/i.test(metaGen.content || "")) score += 3;
		return score;
		}
	
	//
	var tests = [];
	tests.push({plugin:"Shopify",score:detectShopify()});
	tests.push({plugin:"WooCommerce",score:detectWoo()});
	tests.push({plugin:"Magento",score:detectMagento()});
	
	//
	var plugin = null;
	var score = 0;
	tests.forEach( (row,index) => {
		if (row.score<=score) return;
		score = row.score;
		plugin = upixel.plugins[row.plugin];
		});	
		
	return plugin;
	
	};

//
upixel.plugins.Shopify = {};
upixel.plugins.Shopify.name = "Shopify";

upixel.plugins.Shopify.init = function() {
	
	// update cart items
	setTimeout( function() { upixel.plugins.Shopify.UpdateCartItems(); } , 1000 );

	// Registration	
	document.querySelector("form#create_customer")?.addEventListener("submit", function(event) {
		var data = {};
		data.Email = document.querySelector("#RegisterForm-email")?.value ?? "";
		data.FirstName = document.querySelector("#RegisterForm-FirstName1")?.value ?? "";
		data.LastName = document.querySelector("#RegisterForm-LastName")?.value ?? "";
		if (!!!data.Email) return;
		// upixel.SetContactData(data.Email,"Subscribed",null,null);
		upixel.EventTrigger("Registration",data);
		});
  
	// RegistrationUpdate
	document.body.addEventListener('submit', (e) => {
		if (!e.target.matches('form[id^="address_form_"]')) return;
		var data = {};
		data.FirstName = e.target.querySelector('[name="address[first_name]"]')?.value ?? "";
		data.LastName = e.target.querySelector('[name="address[last_name]"]')?.value ?? "";
		data.PhoneNumber = e.target.querySelector('[name="address[phone]"]')?.value ?? "";
		upixel.EventTrigger("RegistrationUpdate",data);
		});
		
	};

upixel.plugins.Shopify.UpdateCartItems = function() {
	fetch("/cart.js")
		.then(res => res.json())
		.then(cart => {
			if (!!!cart) return;
			if (!!!cart.items) return;
			var items = [];
			cart.items.forEach( (row,index) => {
				// console.log(row);
				var item = {};
				if (!!row.sku) item.ProductCode = row.sku;
				if (!!row.product_title) item.ProductName = row.product_title;
				if (!!row.price) item.ProductPrice = row.price/100;
				if (!!row.product_description) item.ProductDescription = row.product_description;
				if (!!row.url) item.ProductLink = row.url;
				if (!!row.image) item.ProductImage = row.image;
				if (!!row.quantity) item.ProductQty = row.quantity;
				items.push(item);
				});	
			upixel.SetShoppingCart(items);
			// console.log( "UpdateCartItems" , items.length );
			setTimeout( function() { upixel.plugins.Shopify.UpdateCartItems(); } , 60000 );
		});	
	};

//
upixel.plugins.WooCommerce = {};
upixel.plugins.WooCommerce.name = "WooCommerce";

upixel.plugins.WooCommerce.init = function() {
	
	// console.log("hi WooCommerce");
	
	};
	
//
upixel.plugins.Magento = {};
upixel.plugins.Magento.name = "Magento";

upixel.plugins.Magento.init = function() {
	
	// console.log("hi Magento");
	
	};

//

upixel.popup = {};
upixel.popup.init = false; 
upixel.popup.timeout = 0; 
upixel.popup.triggered = false; 

upixel.popup.start = function() {
	if (upixel.popup.init) return;
	upixel.popup.init = true;	
	upixel.ClearCache(false);
	upixel.popup.fetch();
	};
	
upixel.popup.fetch = function() {

	// get from cache
	var keys = [];
	keys.push("upixel.cache.All.All");
	keys.push("upixel.cache.All.Desktop");
	keys.push("upixel.cache.All.Mobile");
	keys.push("upixel.cache.Url"+upixel.md5(upixel.data.URL)+".All");
	keys.push("upixel.cache.Url"+upixel.md5(upixel.data.URL)+".Desktop");
	keys.push("upixel.cache.Url"+upixel.md5(upixel.data.URL)+".Mobile");
	for(const key of keys) {
		var row = localStorage.getItem(key);
		if (!!!row) continue;
		row = JSON.parse(row);
		if (!!!row) continue;
		if (!!!row.expire) continue;
		if (new Date() > new Date(row.expire)) {
			localStorage.removeItem(key);
			continue;
			}
		upixel.popup.register(row.data);
		return;
		}

	// get from server
	var data = {};
	data.ukey = upixel.data.ukey;
	data.token = upixel.data.token;
	data.ContactRefId = upixel.data.ContactRefId;
	data.ContactData = upixel.data.ContactData;
	data.Url = upixel.data.URL;
	data.Platform = upixel.GetPlatform();
	fetch(upixel.webservice+"action=popup", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(data)
		}).then(response => {
			if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
			return response.json();
			// response.json();
		}).then(data => {
		// if (upixel.debug) console.log('Popup:', JSON.stringify(data, null, 2) );
		if (!!!data.success) {
			console.log("PopupResult:", JSON.stringify(data, null, 2) );
			return;
			}

		// try again
		if (!!!data.ready) {
			upixel.popup.timeout += 1;
			if (upixel.popup.timeout>60) return;
			setTimeout( function() { upixel.popup.fetch(); } , upixel.popup.timeout * 1000 );
			return;
			}
		
		// save to cache
		var key = [];
		key.push("upixel.cache");
		key.push( data.Url=="All" ? data.Url : "Url"+upixel.md5(data.Url) );
		key.push( data.Platform );
		key = key.join(".");
		var cache = {};
		cache.expire = new Date(new Date().getTime() + data.ttl * 1000).toISOString();
		cache.data = data;
		localStorage.setItem(key,JSON.stringify(cache));		
		
		// register popups
		upixel.popup.register(data);
		
		}).catch((error) => {
		console.error('There was a problem with the fetch operation:', error);
		});		

	//
	return null;

	};
	
upixel.popup.zindex = function() {
	let highestZIndex = 1000;
	document.querySelectorAll('*').forEach(element => {
		const zIndex = window.getComputedStyle(element).zIndex;
		if (!isNaN(zIndex) && parseInt(zIndex) > highestZIndex) {
			highestZIndex = parseInt(zIndex);
			}
		});
	return highestZIndex + 1;
	};
	
upixel.popup.register = function(data) {
	// console.log( JSON.stringify(data, null, 2) );
	if (!!!data.Popups) return;
	
	// for(var k in data.Popups) upixel.popup.trigger(data.Popups[k]);
	data.Popups.forEach( (popup,index) => {
		upixel.popup.trigger(popup);
		});
		
	};
	
upixel.popup.trigger = function(popup) {
	
	// console.log("popup.trigger",popup.Id);
	
	//
	if (!!popup.ForNewVisitors && upixel.visits>1) return false;
	
	//
	switch( !!popup.Recurrence && popup.Recurrence.Interval ? popup.Recurrence.Interval : "Once" ) {
		
		case "Once":
			var key = "upixel.popup-"+popup.Id+"-lastview";
			if (!!localStorage.getItem(key)) return false;
			break;
			
		case "OnceADay":
			var key = "upixel.popup-"+popup.Id+"-lastview";
			var last = localStorage.getItem(key);
			var now = new Date().toISOString();	
			var today = now.split("T")[0];
			if (!!last && last.split("T")[0]==today) return false;
			break;

		case "EveryVisit":
			var key = "upixel.popup-"+popup.Id+"-lastvisit";
			var last = localStorage.getItem(key);
			if (!!!last) last = 0;
			last = parseInt(last);
			if (isNaN(last)) last = 0;
			if (last>=upixel.visits) return false;
			break;
			
		case "EveryXDays":
			var days = parseInt(!!popup.Recurrence && !!popup.Recurrence.Value ? popup.Recurrence.Value : 0 );
			var key = "upixel.popup-"+popup.Id+"-lastview";
			var last = localStorage.getItem(key);
			var now = new Date();
			if (!!last && (new Date(last).getTime() + days * 24 * 60 * 60 * 1000) > now.getTime() ) return false;
			break;			
		
		default:
			return false;
		
		}	
	
	//
	if (!!!popup.Trigger || !!!popup.Trigger.Display || popup.Trigger.Display=="Immediate") {
		if (upixel.popup.triggered) return false;
		upixel.popup.triggered = true;
		upixel.popup.show(popup);
		return true;
		}
	
	//
	if (popup.Trigger.Display!="Event" || !!!popup.Trigger.Event || !!!popup.Trigger.Event.Name) {
		return false;
		}
	
	//
	switch(popup.Trigger.Event.Name) {
		
		case "OnExitIntent":
			document.addEventListener('mouseleave' , (event) => {
				if (event.clientY > 0 ) return;
				if (upixel.popup.triggered) return;
				upixel.popup.triggered = true;
				upixel.popup.show(popup);
				});
			return true;	
			
		case "OnXSecondsOfActivity":
			var seconds = parseInt(!!popup.Trigger.Event.Value?popup.Trigger.Event.Value:0);
			var func = function() {
				setTimeout(function(){
					if (upixel.popup.triggered) return;
					upixel.popup.triggered = true;
					upixel.popup.show(popup);					
					},seconds*1000);
				};			
			document.addEventListener("mousemove", func);
			document.addEventListener("keydown", func);
			document.addEventListener("scroll", func);
			document.addEventListener("click", func);
			return true;
			
		case "OnXSecondsOfNoActivity":
			var seconds = parseInt(!!popup.Trigger.Event.Value?popup.Trigger.Event.Value:0);
			let timeout = null;
			var func = function() {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					if (upixel.popup.triggered) return;
					upixel.popup.triggered = true;
					upixel.popup.show(popup);					
					},seconds*1000);
				};
			document.addEventListener("mousemove", func);
			document.addEventListener("keydown", func);
			document.addEventListener("scroll", func);
			document.addEventListener("click", func);
			func();
			return true;		
			
		case "OnScrollMoreThanXPercentageOfPage":
			var percentage = parseInt(!!popup.Trigger.Event.Value?popup.Trigger.Event.Value:0);
			window.addEventListener("scroll", function(){
				const scrollTop = window.scrollY || document.documentElement.scrollTop;
				const windowHeight = window.innerHeight;
				const documentHeight = document.documentElement.scrollHeight;
				const scrollPercent = (scrollTop + windowHeight) / documentHeight * 100;
				if (scrollPercent <= percentage) return;
				if (upixel.popup.triggered) return;
				upixel.popup.triggered = true;
				upixel.popup.show(popup);				
				});
			return true;	
			
		case "OnMoreThanXPageViewes":
			var count = parseInt(!!popup.Trigger.Event.Value?popup.Trigger.Event.Value:0);
			if (upixel.views>count && !upixel.popup.triggered) {
				upixel.popup.triggered = true;
				upixel.popup.show(popup);				
				}
			return true;
			
		case "OnMoreThanXSiteVisits":
			var count = parseInt(!!popup.Trigger.Event.Value?popup.Trigger.Event.Value:0);
			if (upixel.visits>count && !upixel.popup.triggered) {
				upixel.popup.triggered = true;
				upixel.popup.show(popup);				
				}
			return true;
			
		default:
			return false;
		}
		
	};
	
upixel.popup.show = function(popup) {
	
	// console.log("popup.show",popup.Id);
	
	if (!!!popup.Data) popup.Data = {};
	
	var now = new Date();
	// var last = localStorage.getItem("upixel.popup-"+popup.Id+"-lastview");
	// var diff = ( last ?  Math.floor((now - new Date(last))/1000) : 0 );
	localStorage.setItem("upixel.popup-"+popup.Id+"-lastview",now.toISOString());
	localStorage.setItem("upixel.popup-"+popup.Id+"-lastvisit",upixel.visits);
	
	//
	var force = null;
	if (!force && popup.Data.Platform == "Mobile") force = "mobile"
	if (!force && popup.Data.Platform == "Desktop") force = "desktop"
	if (!force) force = window.innerWidth <= 768 ? "mobile" : "desktop";
	
	//
	var src = popup.Link;
	src += "&force="+force;
	
	// mask
	const mask = document.createElement('div');
	// mask.style.all = 'unset';
	mask.style.position = 'fixed';
	// mask.style.overflow = 'hidden';
	mask.style.top = '0';
	mask.style.left = '0';
	mask.style.right = '0';
	mask.style.bottom = '0';
	mask.style.padding = '0px';
	mask.style.margin = '0px';
	mask.style.display = 'block'; 
	// mask.style.display = 'flex'; 
	// mask.style.alignItems = 'center'; 
	// mask.style.justifyContent = 'center'; 
	if (!!popup.Data.Background) mask.style.backgroundColor = popup.Data.Background; 
	mask.style.zIndex = upixel.popup.zindex();
	document.body.appendChild(mask);
	mask.addEventListener('click', (e) => {
		// if (e.target!== mask) return;
		// document.body.removeChild(mask);
		});
	
	// dialog
	const dialog = document.createElement('div');
	dialog.style.all = 'unset';
	dialog.style.display = 'block';
	dialog.style.position = 'absolute';
	dialog.style.top = '50%';
	dialog.style.left = '50%';
	dialog.style.padding = '0px';
	dialog.style.transform = 'translate(-50%,-50%)';
	dialog.style.margin = '0px';
	dialog.style.zIndex = 1;
	if (force == "desktop" ) {
		dialog.style.width = popup.Width+'px';
		dialog.style.height = popup.Height+'px';
		dialog.style.maxWidth = '100%'; 
		dialog.style.maxHeight = '100%'; 
		} else {
		dialog.style.width = "calc(100% - 40px)";	
		dialog.style.height = "0px";	
		dialog.style.maxWidth = '480px'; 
		dialog.style.maxHeight = 'calc(100% - 80px)'; 
		window.addEventListener("message", (e) => {
			if (e.data.indexOf("InfoPageEmbedHeight")==-1) return;
			var data = e.data.split("=");
			var iframe_height = parseInt(data[1]); // + 5;
			dialog.style.height = iframe_height+"px";
			},false);
		}
	mask.appendChild(dialog);
	// dialog.style.backgroundColor = "pink";
	// dialog.innerHTML = "loading...";
	
	// iframe
	const iframe = document.createElement('iframe');
	iframe.src = src;
	iframe.frameborder = "0";
	iframe.style.all = 'unset';
	iframe.style.display = "block";
	iframe.style.border = "none";
	iframe.style.margin = '0px';
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.zIndex = 1;
	if (!!popup.Data.Shadow) iframe.style.boxShadow = "0px 0px 15px 0px rgba(0,0,0,0.75)";
	dialog.appendChild(iframe);
	
	const close = document.createElement('div');
	close.style.all = 'unset';
	close.style.display = 'block';
	close.style.position = 'absolute';
	close.style.top = '-30px';
	close.style.left = '0px';
	close.style.padding = '0px';
	close.style.margin = '0px';
	close.style.zIndex = 1;
	close.style.width = "20px";	
	close.style.height = "20px";
	close.style.cursor = "pointer";
	close.style.color = "black";
	close.style.fontWeight = "bold";
	close.style.textAlign = "center";
	close.style.lineHeight = "20px";
	close.style.fontSize = "12px";
	close.style.fontWeight = "bold";
	close.style.backgroundColor = "white";
	close.style.borderRadius = "50%";
	close.style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.95)";
	close.style.zIndex = 2;	
	close.innerHTML = "✕";
	dialog.appendChild(close);
	close.addEventListener('click', (e) => {
		document.body.removeChild(mask);
		});	
	
	};

//	
upixel.awake();
