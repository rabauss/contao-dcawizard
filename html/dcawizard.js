var dcaWizard=new Class({Implements:[Options],Binds:["sendOperation"],options:{baseURL:"",referer:"",scroll:false},initialize:function(b,a){this.element=document.id(b);this.setOptions(a);document.getElements(".tl_formbody_submit .tl_submit").each(function(c){c.set("_accesskey",c.get("accesskey"))});document.getElements("form.tl_form").each(function(c){c.addEvent("submit",function(){c.removeEvents();new Request({method:"get",url:(this.options.referer+"&dcaWizard=1"),onComplete:function(){c.submit()}}).send();return false}.bind(this));c.getElements("input.tl_submit").each(function(d){d.addEvent("click",function(){new Element("input",{type:"hidden",name:d.get("name"),value:d.get("value")}).inject(c)})})}.bind(this));this.request=new Request.HTML({link:"abort",evalScripts:false,onRequest:function(){AjaxRequest.displayBox("Loading data …")},onComplete:function(){AjaxRequest.hideBox();if(this.options.scroll){new Fx.Scroll(window).toElement(this.element)}},onCancel:function(){AjaxRequest.hideBox()},onFailure:function(){alert("failed")},onSuccess:function(e,c,f,d){$A(e).each(function(g){if($(g).get&&g.get("id")=="container"){document.getElements(".tl_formbody_submit .tl_submit").each(function(i){if(g.getElement(".tl_formbody_submit")){i.set("disabled",true).set("accesskey","")}else{i.set("disabled",false).set("accesskey",i.get("_accesskey"))}});this.element.empty().adopt(g.getElement("div[id=main]").getChildren());this.element.getElements(".tl_content_right a, .tl_right_nowrap a").each(function(i){i.dcaclick=i.onclick;i.onclick="";i.addEvent("click",this.sendOperation)}.bind(this));this.element.getElements("form.tl_form").each(function(i){i.addEvent("submit",function(){try{if($defined(tinyMCE)){i.getElements("textarea").each(function(k){tinyMCE.execCommand("mceRemoveEditor",false,k.get("id"))})}}catch(j){}this.request.send({url:(i.action+"&dcaWizard=1"),data:i.toQueryString(),method:"post"});return false}.bind(this));i.getElements("input.tl_submit").each(function(j){j.addEvent("click",function(){new Element("input",{type:"hidden",name:j.get("name"),value:j.get("value")}).inject(i)})}.bind(this))}.bind(this));this.adoptButtons();$exec(d.replace(/.*<!--.*|.*-->.*/g,""));try{if($defined(tinyMCE)){tinyMCE.dom.Event._pageInit(window)}}catch(h){}}}.bind(this))}.bind(this)});this.request.send({url:(this.options.baseURL+"&dcaWizard=1"),method:"get"})},sendOperation:function(a){button=a.target;if(button.getParent().get("tag")=="a"){button=button.getParent()}if(button.dcaclick&&button.dcaclick()==false){return false}new Request({method:"get",url:(this.options.baseURL+"&dcaWizard=1"),onSuccess:function(){this.request.send({url:(button.get("href")+"&dcaWizard=1"),method:"get"})}.bind(this)}).send();return false},adoptButtons:function(){if(this.element.getElement("div[id=tl_buttons]")){var a=this.element.getPrevious().getElement(".tl_content_right");if(!a){a=new Element("div",{"class":"tl_content_right"}).inject(this.element.getPrevious(),"top")}a.empty();var b=$defined(this.element.getElement(".tl_listing_container"));this.element.getElement("div[id=tl_buttons]").getElements("a").each(function(c){if(b&&c.hasClass("header_back")){return}if(c.hasClass("header_new")||c.hasClass("header_back")){c.dcaclick=c.onclick;c.onclick="";c.addEvent("click",this.sendOperation)}a.grab(c)}.bind(this))}}});var Group=new Class({initialize:function(){this.instances=Array.flatten(arguments);this.events={};this.checker={}},addEvent:function(b,a){this.checker[b]=this.checker[b]||{};this.events[b]=this.events[b]||[];if(this.events[b].contains(a)){return false}else{this.events[b].push(a)}this.instances.each(function(c,d){c.addEvent(b,this.check.bind(this,[b,c,d]))},this);return this},check:function(c,a,b){if(b==null&&a==null){a=c[1];b=c[2];c=c[0]}this.checker[c][b]=true;var d=this.instances.every(function(f,e){return this.checker[c][e]||false},this);if(!d){return}this.checker[c]={};this.events[c].each(function(e){e.call(this,this.instances,a)},this)}});Request.HTML=Class.refactor(Request.HTML,{options:{evalExternalScripts:true,evalExternalStyles:true},success:function(g){if(this.options.evalExternalStyles){var c=/<link.*href=('|")([^>'"\r\n]*)('|")[^>]*>/gi;var e=stylesheets=[];while(e=c.exec(g)){if(!/fixes.css/.exec(e[2])&&!document.getElement(("link[href="+e[2]+"]"))){Asset.css(e[2])}}}if(this.options.evalExternalScripts){var c=/<script.*src=('|")([^>'"\r\n]*)('|")[^>]*><\/script>/gi;var e=scripts=[];while(e=c.exec(g)){if(!document.getElement(("script[src="+e[2]+"]"))){scripts.push(e[2])}}if(scripts.length>0){var b=document.getElementsByTagName("head")[0];var d=[];scripts.each(function(h){d.push(new Element("script",{type:"text/javascript",src:h}));$(b).grab(d[d.length-1])});var a=this.previous;var f=new Group(d);f.addEvent("load",function(){a.apply(this,[g])}.bind(this)).addEvent("readystatechange",function(){a.apply(this,[g])}.bind(this))}else{this.previous(g)}}else{this.previous(g)}}});