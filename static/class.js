/***
***/

var  ZDurl = "http://zc2.ayakashi.zynga.com/app.php";//公共URL
var url= "http://zc2.ayakashi.zynga.com/app.php";//公共URL

var timestamp=new Date().getTime();
(function($){
$.get=function(url,success,error,dataType) {
	$.ajax({ url: url,error:error,success: success,timeout: 180000,dataType: dataType,complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});	
};
$.get=function(url,success,error) {
	$.ajax({ url: url,error:error,success: success,timeout: 30000,complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});	
};
$.getJSON=function(url,success,error) {
	$.ajax({ url: url,error:error,success: success,timeout: 30000,dataType: 'json',complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});	
};
$.postJSON=function(url,data,success){
	$.post(url,data,success,'json');
};
$.Post=function(url,data,success,error){
	$.ajax({ url: url,error:error,success: success,timeout: 30000,data:data,type:'POST',complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});
};


$.Get = function(url,success,error,dataType) {
	$.ajax({ url: url,error:error,success: success,timeout: 30000,dataType: dataType,complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});
	 };
$.Get = function(url,success,error) {
	$.ajax({ url: url,error:error,success: success,timeout: 30000,complete:function(XHR, TS){
		if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
			window.location.reload();
		}
	}});
	 };
 $.Gets = function(url,success,error) {
		$.ajax({ url: url,error:error,success: success,async:false,timeout: 30000,complete:function(XHR, TS){
			if(XHR.getAllResponseHeaders().indexOf("x-zid: "+ZID)==-1&&url.indexOf(loadUrl)==-1&&TS=='success'){
		window.location.reload();
	}
}});
 };

$.buttonstart=function(obj){
	$(obj).css('background-color','#ccc').attr('disabled','disabled');
};
$.buttonstop=function(obj){
	$(obj).removeAttr('disabled').css('background-color','#F05D18');
};

})(jQuery);

