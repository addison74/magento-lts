(function(){var e=tinymce.explode("id,name,style,align,class,hspace,vspace,bgcolor,type"),U=tinymce.makeMap(e.join(",")),z=e.concat(tinymce.explode("width, height")),L=tinymce.makeMap(z.join(",")),$=tinymce.html.Node,d,O,R=tinymce.util.JSON;d=[["Flash","d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],["ShockWave","166b1bca-3f9c-11cf-8075-444553540000","application/x-director","http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0"],["WindowsMedia","6bf52a52-394a-11d3-b153-00c04f79faa6,22d6f312-b0f6-11d0-94ab-0080c74c7e95,05589fa1-c356-11ce-bf01-00aa0055595a","application/x-mplayer2","http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"],["QuickTime","02bf25d5-8c17-4b23-bc80-d3488abddc6b","video/quicktime","http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"],["RealMedia","cfcdaa03-8be4-11cf-b84b-0020afbbccfa","audio/x-pn-realaudio-plugin","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],["Java","8ad9c840-044e-11d1-b3e9-00805f499d93","application/x-java-applet","http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"],["Silverlight","dfeaf541-f3e1-4c24-acac-99c30715084a","application/x-silverlight-2"],["Iframe"],["Video"],["EmbeddedAudio"],["Audio"],["Object"]];function S(e){return typeof e=="string"?e.replace(/[^0-9%]/g,""):e}function I(e){var t,a;if(e&&!e.splice){t=[];for(a=0;true;a++){if(e[a]){t[a]=e[a]}else{break}}return t}return e}tinymce.create("tinymce.plugins.MediaPlugin",{init:function(r,e){var s=this,o={},t,a,i,c;function n(e){return e&&e.nodeName==="IMG"&&r.dom.hasClass(e,"mceItemMedia")}s.editor=r;s.url=e;O="";for(t=0;t<d.length;t++){c=d[t][0];i={name:c,clsids:tinymce.explode(d[t][1]||""),mimes:tinymce.explode(d[t][2]||""),codebase:d[t][3]};for(a=0;a<i.clsids.length;a++){o["clsid:"+i.clsids[a]]=i}for(a=0;a<i.mimes.length;a++){o[i.mimes[a]]=i}o["mceItem"+c]=i;o[c.toLowerCase()]=i;O+=(O?"|":"")+c}tinymce.each(r.getParam("media_types","video=mp4,m4v,ogv,webm;"+"silverlight=xap;"+"flash=swf,flv;"+"shockwave=dcr;"+"quicktime=mov,qt,mpg,mpeg;"+"shockwave=dcr;"+"windowsmedia=avi,wmv,wm,asf,asx,wmx,wvx;"+"realmedia=rm,ra,ram;"+"java=jar;"+"audio=mp3,ogg").split(";"),function(e){var t,a,i;e=e.split(/=/);a=tinymce.explode(e[1].toLowerCase());for(t=0;t<a.length;t++){i=o[e[0].toLowerCase()];if(i){o[a[t]]=i}}});O=new RegExp("write("+O+")\\(([^)]+)\\)");s.lookup=o;r.onPreInit.add(function(){r.schema.addValidElements("object[id|style|width|height|classid|codebase|*],param[name|value],embed[id|style|width|height|type|src|*],video[*],audio[*],source[*],track[*]");r.parser.addNodeFilter("object,embed,video,audio,script,iframe",function(e){var t=e.length;while(t--){s.objectToImg(e[t])}});r.serializer.addNodeFilter("img",function(e,t,a){var i=e.length,r;while(i--){r=e[i];if((r.attr("class")||"").indexOf("mceItemMedia")!==-1){s.imgToObject(r,a)}}})});r.onInit.add(function(){if(r.theme&&r.theme.onResolveName){r.theme.onResolveName.add(function(e,t){if(t.name==="img"&&r.dom.hasClass(t.node,"mceItemMedia")){t.name="media"}})}if(r&&r.plugins.contextmenu){r.plugins.contextmenu.onContextMenu.add(function(e,t,a){if(a.nodeName==="IMG"&&a.className.indexOf("mceItemMedia")!==-1){t.add({title:"media.edit",icon:"media",cmd:"mceMedia"})}})}});r.addCommand("mceMedia",function(){var a,i;i=r.selection.getNode();if(n(i)){a=r.dom.getAttrib(i,"data-mce-json");if(a){a=R.parse(a);tinymce.each(z,function(e){var t=r.dom.getAttrib(i,e);if(t){a[e]=t}});a.type=s.getType(i.className).name.toLowerCase()}}if(!a){a={type:"flash",video:{sources:[]},params:{}}}r.windowManager.open({file:e+"/media.htm",width:430+parseInt(r.getLang("media.delta_width",0)),height:500+parseInt(r.getLang("media.delta_height",0)),inline:1},{plugin_url:e,data:a})});r.addButton("media",{title:"media.desc",cmd:"mceMedia"});r.onNodeChange.add(function(e,t,a){t.setActive("media",n(a))})},convertUrl:function(e,t){var a=this,i=a.editor,r=i.settings,s=r.url_converter,o=r.url_converter_scope||a;if(!e){return e}if(t){return i.documentBaseURI.toAbsolute(e)}return s.call(o,e,"src","object")},getInfo:function(){return{longname:"Media",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media",version:tinymce.majorVersion+"."+tinymce.minorVersion}},dataToImg:function(e,t){var a=this,i,r,s,o,c;e.params.src=a.convertUrl(e.params.src,t);r=e.video.attrs;if(r){r.src=a.convertUrl(r.src,t)}if(r){r.poster=a.convertUrl(r.poster,t)}i=I(e.video.sources);if(i){for(o=0;o<i.length;o++){i[o].src=a.convertUrl(i[o].src,t)}}c=I(e.video.tracks);if(c){for(o=0;o<c.length;o++){c[o].src=a.convertUrl(c[o].src,t)}}s=a.editor.dom.create("img",{id:e.id,style:e.style,align:e.align,hspace:e.hspace,vspace:e.vspace,src:a.editor.theme.url+"/img/trans.gif",class:"mceItemMedia mceItem"+a.getType(e.type).name,"data-mce-json":R.serialize(e,"'")});e.width=S(e.width||(e.type=="audio"?"300":"320"));if(typeof e.width=="string"&&e.width.search(/[^0-9]/g)>0){s.style.width=e.width}else{s.width=e.width;s.style.width=e.width+"px"}e.height=S(e.height||(e.type=="audio"?"32":"240"));if(typeof e.height=="string"&&e.height.search(/[^0-9]/g)>0){s.style.height=e.height}else{s.height=e.height;s.style.height=e.height+"px"}return s},dataToHtml:function(e,t){return this.editor.serializer.serialize(this.dataToImg(e,t),{forced_root_block:"",force_absolute:t})},htmlToData:function(e){var t,a,i;i={type:"flash",video:{sources:[],tracks:[]},params:{}};t=this.editor.parser.parse(e);a=t.getAll("img")[0];if(a){i=R.parse(a.attr("data-mce-json"));i.type=this.getType(a.attr("class")).name.toLowerCase();tinymce.each(z,function(e){var t=a.attr(e);if(t){i[e]=t}})}return i},getType:function(e){var t,a,i;a=tinymce.explode(e," ");for(t=0;t<a.length;t++){i=this.lookup[a[t]];if(i){return i}}},imgToObject:function(a,e){var c=this,n=c.editor,o,d,t,i,m,l,r,s,p,h,f,u,g,v,w,y,b,x;function _(a,i){var e,t,r,s,o;o=n.getParam("flash_video_player_url",c.convertUrl(c.url+"/moxieplayer.swf"));if(o){e=n.documentBaseURI;l.params.src=o;if(n.getParam("flash_video_player_absvideourl",true)){a=e.toAbsolute(a||"",true);i=e.toAbsolute(i||"",true)}r="";t=n.getParam("flash_video_player_flashvars",{url:"$url",poster:"$poster"});tinymce.each(t,function(e,t){e=e.replace(/\$url/,a||"");e=e.replace(/\$poster/,i||"");if(e.length>0){r+=(r?"&":"")+t+"="+escape(e)}});if(r.length){l.params.flashvars=r}s=n.getParam("flash_video_player_params",{allowfullscreen:true,allowscriptaccess:true});tinymce.each(s,function(e,t){l.params[t]=""+e})}}function j(e,t,a,i){d=new $("object",1).attr({id:e.attr("id"),width:S(e.attr("width")),height:S(e.attr("height")),style:t});tinymce.each(a,function(e){var t=i[e];if(e=="class"&&t){t=t.replace(/mceItem.+ ?/g,"")}if(t&&e!="type"){d.attr(e,t)}});for(var r in i.params){var s;s=new $("param",1);s.shortEnded=true;m=i.params[r];if(r==="src"&&h.name==="WindowsMedia"){r="url"}s.attr({name:r,value:m});d.append(s)}if(i.object_html){m=new $("#text",3);m.raw=true;m.value=i.object_html;d.append(m)}if(o){o.append(d)}return d}l=a.attr("data-mce-json");if(!l){return}l=R.parse(l);h=this.getType(a.attr("class"));w=a.attr("data-mce-style");if(!w){w=a.attr("style");if(w){w=n.dom.serializeStyle(n.dom.parseStyle(w,"img"))}}l.width=a.attr("width")||l.width;l.height=a.attr("height")||l.height;if(h.name==="Iframe"){g=new $("iframe",1);tinymce.each(z,function(e){var t=a.attr(e);if(e=="class"&&t){t=t.replace(/mceItem.+ ?/g,"")}if(t&&t.length>0){g.attr(e,t)}});for(i in l.params){g.attr(i,l.params[i])}g.attr({style:w,src:l.params.src});a.replace(g);return}if(this.editor.settings.media_use_script){g=new $("script",1).attr("type","text/javascript");m=new $("#text",3);m.value="write"+h.name+"("+R.serialize(tinymce.extend(l.params,{width:a.attr("width"),height:a.attr("height")}))+");";g.append(m);a.replace(g);return}if(h.name==="Video"&&l.video.sources[0]){o=new $("video",1).attr(tinymce.extend({id:a.attr("id"),width:S(a.attr("width")),height:S(a.attr("height")),style:w},l.video.attrs));if(l.video.attrs){v=l.video.attrs.poster}s=l.video.sources=I(l.video.sources);for(f=0;f<s.length;f++){if(/\.mp4$/.test(s[f].src)){u=s[f].src}}if(!s[0].type){o.attr("src",s[0].src);s.splice(0,1)}for(f=0;f<s.length;f++){r=new $("source",1).attr(s[f]);r.shortEnded=true;o.append(r)}b=l.video.tracks=I(l.video.tracks);for(f=0;f<b.length;f++){if(/\.vtt$/.test(b[f].src)){}}for(f=0;f<b.length;f++){x=new $("track",1).attr(b[f]);x.shortEnded=true;o.append(x)}l.params.src=""}if(h.name==="Audio"&&l.video.sources[0]){y=new $("audio",1).attr(tinymce.extend({id:a.attr("id"),width:S(a.attr("width")),height:S(a.attr("height")),style:w},l.video.attrs));if(l.video.attrs){v=l.video.attrs.poster}s=l.video.sources=I(l.video.sources);if(!s[0].type){y.attr("src",s[0].src);s.splice(0,1)}for(f=0;f<s.length;f++){r=new $("source",1).attr(s[f]);r.shortEnded=true;y.append(r)}l.params.src=""}if(h.name==="EmbeddedAudio"){t=new $("embed",1);t.shortEnded=true;t.attr({id:a.attr("id"),width:S(a.attr("width")),height:S(a.attr("height")),style:w,type:a.attr("type")});for(i in l.params){t.attr(i,l.params[i])}tinymce.each(z,function(e){if(l[e]&&e!="type"){t.attr(e,l[e])}});l.params.src=""}if(l.params.src){if(/\.flv$/i.test(l.params.src)){_(l.params.src,"")}if(e&&e.force_absolute){l.params.src=n.documentBaseURI.toAbsolute(l.params.src)}d=j(a,w,z,l,o);if(this.editor.getParam("media_strict",true)){d.attr({data:l.params.src,type:h.mimes[0]})}else{if(h.clsids[0]){d.attr({classid:"clsid:"+h.clsids[0],codebase:h.codebase})}t=new $("embed",1);t.shortEnded=true;t.attr({id:a.attr("id"),width:S(a.attr("width")),height:S(a.attr("height")),style:w,type:h.mimes[0]});for(i in l.params){t.attr(i,l.params[i])}tinymce.each(z,function(e){if(l[e]&&e!="type"){t.attr(e,l[e])}});d.append(t)}}else if(h.name==="Object"){delete l.params.src;d=j(a,w,z,l,o)}if(o){if(l.video_html){m=new $("#text",3);m.raw=true;m.value=l.video_html;o.append(m)}}if(y){if(l.video_html){m=new $("#text",3);m.raw=true;m.value=l.video_html;y.append(m)}}var k=o||y||d||t;if(k){a.replace(k)}else{a.remove()}},objectToImg:function(e){var t,a,i,r,s,o,c,n,d,m,l,p,h,f,u,g,v,w,y=this.lookup,b,x,_=this.editor.settings.url_converter,j=this.editor.settings.url_converter_scope,k,I,M,A,C,T;function E(e){return new tinymce.html.Serializer({inner:true,validate:false}).serialize(e)}function N(e,t){return y[(e.attr(t)||"").toLowerCase()]}function P(e){var t=e.replace(/^.*\.([^.]+)$/,"$1");return y[t.toLowerCase()||""]}if(!e.parent){return}if(e.name==="script"){if(e.firstChild){b=O.exec(e.firstChild.value)}if(!b){return}w=b[1];v={video:{},params:R.parse(b[2])};n=v.params.width;d=v.params.height}v=v||{video:{},params:{}};s=new $("img",1);s.attr({src:this.editor.theme.url+"/img/trans.gif"});o=e.name;if(o==="video"||o=="audio"){i=e;t=e.getAll("object")[0];a=e.getAll("embed")[0];n=i.attr("width");d=i.attr("height");c=i.attr("id");v.video={attrs:{},sources:[],tracks:[]};x=v.video.attrs;for(o in i.attributes.map){x[o]=i.attributes.map[o]}u=e.attr("src");if(u){v.video.sources.push({src:_.call(j,u,"src",e.name)})}g=i.getAll("source");for(l=0;l<g.length;l++){u=g[l].remove();v.video.sources.push({src:_.call(j,u.attr("src"),"src","source"),type:u.attr("type"),media:u.attr("media")})}C=i.getAll("track");for(l=0;l<C.length;l++){T=C[l].remove();v.video.tracks.push({src:_.call(j,T.attr("src"),"src","track"),kind:T.attr("kind"),srclang:T.attr("srclang"),label:T.attr("label"),default:T.attr("default")})}if(x.poster){x.poster=_.call(j,x.poster,"poster",e.name)}}if(e.name==="object"){t=e;a=e.getAll("embed")[0]}if(e.name==="embed"){a=e}if(e.name==="iframe"){r=e;w="Iframe"}if(t){m=m||t.attr("style");c=c||t.attr("id");k=k||t.attr("hspace");I=I||t.attr("vspace");M=M||t.attr("align");A=A||t.attr("bgcolor");v.name=t.attr("name");v["class"]=t.attr("class");f=t.getAll("param");for(l=0;l<f.length;l++){h=f[l];o=h.remove().attr("name");if(!U[o]){v.params[o]=h.attr("value")}}n=n||t.attr("width")||v.params.width;d=d||t.attr("height")||v.params.height;v.params.src=v.params.src||t.attr("data")}if(a){n=n||a.attr("width");d=d||a.attr("height");m=m||a.attr("style");c=c||a.attr("id");k=k||a.attr("hspace");I=I||a.attr("vspace");M=M||a.attr("align");A=A||a.attr("bgcolor");for(o in a.attributes.map){if(!L[o]&&!v.params[o]){v.params[o]=a.attributes.map[o]}}}if(r){n=S(r.attr("width"));d=S(r.attr("height"));m=m||r.attr("style");c=r.attr("id");k=r.attr("hspace");I=r.attr("vspace");M=r.attr("align");A=r.attr("bgcolor");tinymce.each(z,function(e){s.attr(e,r.attr(e))});for(o in r.attributes.map){if(!L[o]&&!v.params[o]){v.params[o]=r.attributes.map[o]}}}if(v.params.movie){v.params.src=v.params.src||v.params.movie;delete v.params.movie}if(v.params.src){v.params.src=_.call(j,v.params.src,"src","object")}if(i){if(e.name==="video"){w=y.video.name}else if(e.name==="audio"){w=y.audio.name}}if(a&&!w){w=(N(a,"type")||P(v.params.src)||{}).name}if(t&&!w){w=(N(t,"clsid")||N(t,"classid")||N(t,"type")||{name:"Object"}).name}if(a&&w=="EmbeddedAudio"){v.params.type=a.attr("type")}e.replace(s);if(a){a.remove()}if(t){p=E(t.remove());if(p){v.object_html=p}}if(i){p=E(i.remove());if(p){v.video_html=p}}v.hspace=k;v.vspace=I;v.align=M;v.bgcolor=A;s.attr({id:c,class:"mceItemMedia mceItem"+(w||"Flash"),style:m,width:n||(e.name=="audio"?"300":"320"),height:d||(e.name=="audio"?"32":"240"),hspace:k,vspace:I,align:M,bgcolor:A,"data-mce-json":R.serialize(v,"'")})}});tinymce.PluginManager.add("media",tinymce.plugins.MediaPlugin)})();