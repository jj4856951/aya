// var loadUrl='http://localhost/a.com/aya-Ajax/';
var loadUrl='http://zjw1918.xyz/aya/';
$.getlocalStorage=function(data){
	data=localStorage.getItem(data);	
	
	return data?JSON.parse(data):'';
}
$.setlocalStorage=function(type,data){
	data=JSON.stringify(data);
	localStorage.setItem(type,data);
}
$.updatelocalStorage=function(type,data){
	old_data=localStorage.getItem(type);
	new_data=JSON.parse(old_data);
	new_data=data;
	new_data=JSON.stringify(new_data);
	localStorage.setItem(type,new_data);
}
var option=$.getlocalStorage('option');
if(!option){
	$.setlocalStorage("option",{"memu":{"status":true}});
	option=$.getlocalStorage('option');
}

	if(option.memu.status==false){
		$(".athlon_memu").css("width",0).hide();
		$(".athlon_button_close").text('显示').removeClass().addClass('athlon_button_open');
	}else{
		$(".athlon_memu").show();
	}
$(".athlon_memu").hover(
	function(){
		$(this).fadeTo(500,1);
	},
	function(){
		$(this).fadeTo(500,0.5);
});
$(".athlon_button_close").live('click',function(){
	var _this=this;
	$(this).text('显示').die('click').removeClass('athlon_button_close');
	$.updatelocalStorage('option',{"memu":{"status":false}});
	$(".athlon_memu").stop().animate({width:0},1000,function(){
		$(".athlon_memu").hide();
		$(_this).addClass('athlon_button_open');
		window.location.reload();
	});
});
$(".athlon_button_open").live('click',function(){
	var _this=this;
	$(this).text('关闭').die('click').removeClass('athlon_button_open');
	$.updatelocalStorage('option',{"memu":{"status":true}});
	$(".athlon_memu").show().stop().animate({width:500},1000,function(){
		$(_this).addClass('athlon_button_close');
		$.getJSON(ZDurl+'?_c=deposit&action=getList&is_json=true&_='+timestamp,function(e){
			$(".athlon_memu").load(loadUrl+"login.php?zid="+e.currentUserZid,function(){		
			});	
		});
	});
});
$("head").append("<link type='text/css' rel='stylesheet' href='"+loadUrl+"resources/js.css' />");
$("head").append("<script type='text/javascript' src='"+loadUrl+"static/dialog.js'></script>");
var  ZDurl = "http://zc2.ayakashi.zynga.com/app.php";//公共URL
var timestamp=new Date().getTime();
if(option.memu.status==true){
$.getJSON(ZDurl+'?_c=deposit&action=getList&is_json=true&_='+timestamp,function(e){
	$(".athlon_memu").load(loadUrl+"login.php?zid="+e.currentUserZid,function(){		
	});	
});
}