var infodata='';
$(function(){
	$("#get_info").live('click',function(){
		$(this).attr('disabled','disabled');
		$.getJSON(ZDurl+"?_c=monster&action=jsonlist&list_type=all&order_by=rarity-desc&_="+timestamp,
		function(e){
			if(e){
				$('#info_info').show();
				$("#info_level").text(e.user.level);
				$("#info_cash").text(e.user.cash);ee
				$("#info_coin").text(e.user.coin);
				$("#info_defense_guts").text(e.user.defense_guts);
				$("#info_defense_guts_max").text(e.user.defense_guts_max);
				$("#info_energy").text(e.user.energy);
				$("#info_energy_max").text(e.user.energy_max);
				$("#info_exp").text(e.user.exp);
				$("#info_exp_for_next").text(e.user.exp_for_next_level-e.user.exp_for_current_level);
				$("#info_exp_for_current_level").text(e.user.exp_for_next_level-e.user.exp);
				$("#info_offense_guts").text(e.user.offense_guts);
				$("#info_offense_guts_max").text(e.user.offense_guts_max);
				$("#info_total_lost").text(e.user.total_lost);
				$("#info_total_won").text(e.user.total_won);
				$.post(site_url+'info/get_monsters?zid='+ZID,{monsters:e.monsters},function(e){
					if(e){
						$("#hz").show();
					}
				});
			}
		},
		function(){
			$.Zebra_Dialog( '获取失败,请重新获取!',{'type':'error','buttons':false,'modal':false,'auto_close': 2000});
		});
	});
    
	$(".showinfo").live('click',function(e){
		html="<div class='previews'>";
		html+="<ul><li><a href='javascript:;'style='color:#000;' id='"+this.id+"' class='set_leader'>设为队长</a></li>";
		html+="<li><a href='javascript:;'style='color:#000;' id='"+this.id+"' class='set_member'>添加到队员</a></li></ul></div>";
		$('body').append(html);
		$(".previews").css("top",(e.pageY) + "px").css("left",(e.pageX) + "px").fadeIn("fast");	
	});
	
	$('.set_leader').live('click',function(){
		var id=this.id;
		var group=$("#select_group").val();
		if(group=='请选择'||group==0)return;
		$.get(site_url+'info/set_leader.html?zid='+ZID+"&groupid="+group+"&mid="+id,function(){
			var id=$("#get_page").val();;
			var groupid=$('#select_group').val();
			var where='&groupid='+groupid;
			var url=site_url+'info/show.html?zid='+ZID+'&ajax=1&page='+id+where;
			$(".ZebraDialog_Body").html('').load(url);
		});
	});
	
	$('.set_member').live('click',function(){
		var id=this.id;
		var group=$("#select_group").val();
		if(group=='请选择'||group==0)return;
		$.get(site_url+'info/set_member.html?zid='+ZID+"&groupid="+group+"&mid="+id,function(e){
			if(e<4&&e!=-1){
				var id=$("#get_page").val();
				var groupid=$('#select_group').val();
				var where='&groupid='+groupid;
				var url=site_url+'info/show.html?zid='+ZID+'&ajax=1&page='+id+where;
				$(".ZebraDialog_Body").html('').load(url);
			}else if(e==-1){
				alert('不能添加相同的队员!');
			}else{
				alert('队员数已经超过5个,请换组添加或者删除队员');
			}
		});
	});
	$(".showinfos").live('click',function(e){
		html="<div class='previews'>";
		html+="<ul><li><a href='javascript:;'style='color:#000;' id='"+this.id+"' class='set_leader'>设为队长</a></li>";
		html+="<li><a href='javascript:;'style='color:#000;' id='"+this.id+"' class='del_member'>删除此成员</a></li></ul></div>";
		$('body').append(html);
		$(".previews").css("top",(e.pageY) + "px").css("left",(e.pageX) + "px").fadeIn("fast");	
	});
	
	$('.del_member').live('click',function(){
		var id=this.id;
		var group=$("#select_group").val();
		if(group=='请选择'||group==0)return;
		$.get(site_url+'info/del_member.html?zid='+ZID+"&groupid="+group+"&mid="+id,function(e){
			var id=page;
			var groupid=$('#select_group').val();
			var where='&groupid='+groupid;
			var url=site_url+'info/show.html?zid='+ZID+'&ajax=1&page='+id+where;
			$(".ZebraDialog_Body").html('').load(url);
			alert('删除队员成功!');
		});
	});
	
	$(".previews").live("mouseleave",function(){
		$(this).fadeOut('fast').remove();
	});

});