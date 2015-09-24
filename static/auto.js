var ZDurl = 'http://zc2.ayakashi.zynga.com/app.php';
var timestamp = new Date().getTime();
var clock;
var cfg_def;
var cfg_time;
var attack_T;

function toDou (n) {
	if (n<10) {
		return '0'+n;
	}else{
		return ''+n;
	}
}
function get_time(){
	var ot = new Date();
	return '[log]['+toDou(ot.getHours())+':'+toDou(ot.getMinutes())+':'+toDou(ot.getSeconds())+']';
}
//吃物资
function use_goods(i) {
	var setting = {
		url: ZDurl+'?_c=item&action=use&item_id='+i,
		success:function(){
		}
	}
	$.ajax(setting);
	$('#if_used').text('');
	setTimeout(function () {
		switch(i){
			case 6:
			$('#if_used').text('吃掉1糖果');
			break;
			case 5:
			$('#if_used').text('喝掉1灵水');
			break;
			case 4:
			$('#if_used').text('吃掉1丸子');
			break;
			case 1:
			$('#if_used').text('喝掉1妹汁');
			break;
		}
	},600);
}
//领公会灵
$('#get_public_sprit').click(function () {
	var setting = {
		url: ZDurl+'?_c=guild&action=ajax_claim_daily_spirit&tutorial_step=41&_='+timestamp,
		success:function(){
		}
	}
	$.ajax(setting);
	$('#if_used').text('');
	setTimeout(function () {
		$('#if_used').text('领完公会灵力了');
	},500);
});

//获取角色基本信息
$('#getinfo').click(function() {
	var setting = {
		url: ZDurl+'?_c=monster&action=jsonlist&list_type=all&order_by=rarity-desc&_='+timestamp,
		dataType: 'json',
		success:function(e){
			// console.log(e);
			$('#info_info').show();
			$("#info_level").text(e.user.level);
			$("#info_cash").text(e.user.cash);
			$("#info_coin").text(e.user.coin);
			$("#info_defense_guts").text(e.user.defense_guts);
			$("#info_defense_guts_max").text(e.user.defense_guts_max);
			$("#info_energy").text(e.user.energy);
			$("#info_energy_max").text(e.user.energy_max);
			$("#info_offense_guts").text(e.user.offense_guts);
			$("#info_offense_guts_max").text(e.user.offense_guts_max);
			$("#info_total_lost").text(e.user.total_lost);
			$("#info_total_won").text(e.user.total_won);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
		}
	}
	$.ajax(setting);
});
//秒刷221
$('#shua221').click(function(){shua221 (1.3);});
//分刷221
$('#m_shua221').click(function(){shua221 (30);});
function shua221 (i) {
	var setting = {
		url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			clock = setTimeout(function  () {
				$.ajax(setting);
			},i*1000);
		},
		error:function  () {
			clock = setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
}

$('#no_221').click(function() {
	clearInterval(clock);
});

//封印石互撸
$('#inter_att').click(function() {
	$('#def_list').show();
	cfg_hulu_color = $('#cfg_hulu_color').val();
	oppo_zid = $('#oppo_zid').val();

	var setting = {
		url: ZDurl+'?_c=battle&action=opponents_for_level&from_battle_tab=level&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$('#att_res1').text('');
			$('#curr_at_spr').text(e.battle_user_status.offense_guts);
			$('#max_at_spr').text(e.battle_user_status.offense_guts_max);
			$('#total_att').text(e.battle_user_status.total_attack);

			setTimeout(function() {
				attack_stone(oppo_zid,cfg_hulu_color);
				$('#att_res1').text(':)找到并攻击撸友:'+oppo_zid);

				attack_T = setTimeout(function() {
					$.ajax(setting);
				},2000);
			},500);
		},
		error:function  () {
			attack_T = setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
});


$('#get_fr').click(function(){
	$('#chuo').show();
	var setting = {
		url: 'http://zc2.ayakashi.zynga.com/app.php?_c=friend',
		type:"GET",
		dataType: 'html',
		success:function(e){
			var str1 = e.indexOf('var neighbors = ')+16;
			var str2 = e.lastIndexOf('var title = {}')-2;
			var str = e.slice(str1,str2);
			json = eval('('+str+')');
			var newarr = new Array();
			$.each(json, function(i) {
				newarr.push(i);
			});
			var count = 0;
			clock = setInterval(function () {
				chuo(newarr[count]);
				$('#chuoId').text(count+'-'+newarr[count]+'已戳');
				count++;
				if (count>newarr.length-1) {
					clearInterval(clock);
					$('#chuoId').text('都戳完了:)');
				};
			},1200);
		}
	}
	$.ajax(setting);
});
function chuo(i) {
	var setting = {
		url: ZDurl+'?_c=friend&action=touch&zid='+i+'&is_json=true&_='+ timestamp,
		dataType: 'json',
		// async:false,
		success:function(){
		}
	}
	$.ajax(setting);
}

//获取章节数
var tmp_island_id;
$('#get_chap').click(function(){
	$('#chap').show();
	$('#chap').text('');
	$('#chap_areas').text('');
	$('#chap_stages').text('');
	var setting = {
		url: ZDurl+'?_c=adventure&action=list_island',
		type:"GET",
		dataType: 'html',
		success:function(e){
			var str1 = e.indexOf('zjMonster.page.islandListPage = ')+32;
			var str2 = e.lastIndexOf('(function($, shared, pageId, data) {')-3;
			var str = e.slice(str1,str2);
			json = eval('('+str+')');
			var all_islands = json.data.islands;
			$.each(all_islands, function(i) {
				$('<span id="islands'+i+'">'+all_islands[i].name+'</span><br />').appendTo('#chap'); 
				$("#islands"+i).click(function() {
					choose_island(i,all_islands[i].island_id);
				});
			});
		}
	}
	$.ajax(setting);
});

function choose_island (argument1,argument2) {
	$("#islands"+argument1).siblings().hide();
	$('#chap_areas').text('');
	$('#chap_stages').text('');
	var setting = {
		url: ZDurl+'?_c=adventure&action=list_area&island_id='+argument2,
		type:"GET",
		dataType: 'html',
		success:function(e){
			var str1 = e.indexOf('zjMonster.page.areaListPage = ')+30;
			var str2 = e.lastIndexOf('(function($, shared, pageId, data) {')-3;
			var str = e.slice(str1,str2);
			json = eval('('+str+')');
			var all_areas = json.data.areas;
			$.each(all_areas, function(i) {
				$('<span id="areas'+i+'">'+'└─'+all_areas[i].name+'</span><br />').appendTo('#chap_areas');
				$("#areas"+i).click(function() {
					choose_area(i,all_areas[i].island_id,all_areas[i].area_id);
				});			
			});
		}
	}
	$.ajax(setting);
}

function choose_area (argument,argument1,argument2) {
	$("#areas"+argument).siblings().hide();
	$('#chap_stages').text('');
	var setting = {
		url: ZDurl+'?_c=adventure&action=list_stage&island_id='+argument1+'&area_id='+argument2,
		type:"GET",
		dataType: 'html',
		success:function(e){
			var str1 = e.indexOf('zjMonster.page.stageListPage = ')+31;
			var str2 = e.lastIndexOf('(function($, shared, pageId, data) {')-4;
			var str = e.slice(str1,str2);
			json = eval('('+str+')');
			var all_stages = json.data.stages;
			$.each(all_stages, function(i) {
				$('<span id="stages'+i+'">'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─'+all_stages[i].name+'</span><br />').appendTo('#chap_stages').css({cursor: 'pointer'});
				$("#stages"+i).click(function() {
					come_go(i,all_stages[i].island_id,all_stages[i].area_id,all_stages[i].stage_id);
				});		
			});
		}
	}
	$.ajax(setting);
}

// function come_go (argument,argument1,argument2,argument3) {
// 	$("#stages"+argument).siblings().hide();
// 	var setting = {
// 		url: ZDurl+'?_c=adventure&action=proceed&island_id='+argument1+'&area_id='+argument2+'&stage_id='+argument3+'&_='+timestamp,
// 		dataType: 'json',
// 		success:function(e){
// 			$("#show_en").text(e.user.energy);
// 			$("#info_energy").text(e.user.energy);
// 			$("#auto_progress").show();
// 			$("#bar").css({width: e.user.exp_percentage+'%'});
			
// 			if (e.events.length) {
				
// 				switch (e.events[0].type){
// 					case 'REDIRECT':
// 						$("#jude_info").text('');
// 						$('<span>GET<strong style="color:yellow">宝玉</strong></span>').appendTo($('#jude_info'));
// 						clock = setTimeout(function  () {
// 							$.ajax(setting);
// 							$("#jude_info").text('');
// 						},3000);
// 					break;

// 					case 'NO_ENOUGH_ENERGY':
// 						$("#jude_info").text('');
// 						$('<span>:(没体了,正在检测吃丸子否？</span><br />').appendTo($('#jude_info'));

// 						if ($('#jude_is_ball').is(":checked")) {
// 							setTimeout(function() {
// 								use_goods(4);
// 								$('<span>允许吃，且吃掉 _1_ 丸子...</span><br />').appendTo($('#jude_info'));
// 								$('<span>即将开始新一轮探索...</span><br />').appendTo($('#jude_info'));
// 								clock = setTimeout(function  () {
// 									$.ajax(setting);
// 								},3000);
// 							},3000);
							
// 						}else{
// 							$('<span>不吃！3分钟后尝试新一轮探索...</span><br />').appendTo($('#jude_info'));
// 							count_time("jude",3*60);
// 							clock = setTimeout(function() {
// 								$('<span>开启新一轮探索...</span><br />').appendTo($('#jude_info'));
// 								$.ajax(setting);
// 							},3*60*1000+5000);
// 						}
// 					break;

// 					default:
// 						setTimeout(function(){
// 							$('#jude_info').text('遭遇肥料/他人...');
// 						},500);
// 						clock = setTimeout(function  () {
// 							$.ajax(setting);
// 							$('#jude_info').text('');
// 						},2000);
// 					break;
// 				}
// 			}else{
// 				setTimeout(function(){
// 					$('#jude_info').text('空空如也...');
// 					clock = setTimeout(function  () {
// 						$.ajax(setting);
// 						$('#jude_info').text('');
// 					},2000);
// 				},500);

// 			}
// 		},
// 		error:function  () {
// 			clock = setTimeout(function() {
// 				$.ajax(setting);
// 			},2000);
// 		}
// 	}
// 	$.ajax(setting);
// }

function come_go (argument,argument1,argument2,argument3) {
	$("#stages"+argument).siblings().hide();
	var setting = {
		url: ZDurl+'?_c=adventure&action=proceed&island_id='+argument1+'&area_id='+argument2+'&stage_id='+argument3+'&_='+timestamp,
		dataType: 'json',
		success:function(e){
			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			
			if (e.events.length) {
				
				switch (e.events[0].type){
					case 'REDIRECT':
						$("#jude_info").text('');
						$('<span>GET<strong style="color:yellow">宝玉</strong></span>').appendTo($('#jude_info'));
						clock = setTimeout(function  () {
							$.ajax(setting);
							$("#jude_info").text('');
						},15000);
					break;

					case 'NO_ENOUGH_ENERGY':
						$("#jude_info").text('');
						$('<span>:(没体了,正在检测吃丸子否？</span><br />').appendTo($('#jude_info'));

						if ($('#jude_is_ball').is(":checked")) {
							setTimeout(function() {
								use_goods(4);
								$('<span>允许吃，且吃掉 _1_ 丸子...</span><br />').appendTo($('#jude_info'));
								$('<span>即将开始新一轮探索...</span><br />').appendTo($('#jude_info'));
								clock = setTimeout(function  () {
									$.ajax(setting);
								},3000);
							},3000);
							
						}else{
							$('<span>不吃！3分钟后尝试新一轮探索...</span><br />').appendTo($('#jude_info'));
							count_time("jude",3*60);
							clock = setTimeout(function() {
								$('<span>开启新一轮探索...</span><br />').appendTo($('#jude_info'));
								$.ajax(setting);
							},3*60*1000+5000);
						}
					break;

					default:
						setTimeout(function(){
							$('#jude_info').text('遭遇肥料/他人...');
						},500);
						clock = setTimeout(function  () {
							$.ajax(setting);
							$('#jude_info').text('');
						},2000);
					break;
				}
			}else{
				setTimeout(function(){
					$('#jude_info').text('空空如也...');
					clock = setTimeout(function  () {
						$.ajax(setting);
						$('#jude_info').text('');
					},2000);
				},500);

			}
		},
		error:function  () {
			clock = setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
}

//出示所有卡片
$('#show_all_cards').click(function() {
	$('#all_list').text('');
	var setting = {
		url: ZDurl+'?_c=monster&action=jsonlist&list_type=all&order_by=attack-desc&_='+timestamp,
		dataType: 'json',
		success:function(e){
			// console.log(e.monsters);
			$.each(e.monsters, function(i) {
				$('<input type="checkbox" name="card_list" id="card_list_'+i+'" value="'+e.monsters[i].inventory_monster_id+'" />'+e.monsters[i].name+'  '+e.monsters[i].attack_point+'<br />').appendTo($('#all_list'));
			});

		}
	}
	$.ajax(setting);
});

//换队长
$('#set_lead').click(function() {
	var e=$("input[name='card_list']:checked");
	// console.log(e[0].value);
	// console.log(e[0].nextSibling.data);
	set_leader(e[0].value);
	$('#if_set_leader_ok').text('');
	setTimeout(function() {
		$('#if_set_leader_ok').text('换队长成功');
	},600);
});

function set_leader(q) {
	var setting = {
		url: ZDurl+'?inventory_monster_id='+q+'&_c=monster&action=setLeader',
		error:function(){
			setTimeout(function() {
				$.ajax(setting);
			},1500);
		}
	}
	$.ajax(setting);
}
//选择teammate
$('#show4').click(function() {
	var e=$("input[name='card_list']:checked");
	// console.log(e);
	$('#att1').val(get_team_id(e[0].value,e[1].value,e[2].value,e[3].value));
	$('#att2').val(get_team_name(e[0].nextSibling.data,e[1].nextSibling.data,e[2].nextSibling.data,e[3].nextSibling.data));
});
function get_team_id(i1,i2,i3,i4){
	return i1+','+i2+','+i3+','+i4;
}
function get_team_name(i1,i2,i3,i4){
	return i1+','+i2+','+i3+','+i4;
}
//更换team4
$('#set_team4').click(function() {
	reset_team();
	$('#if_set_team_ok').text('');
	setTimeout(function  () {
		set_team($('#att1').val());
		$('#if_set_team_ok').text('换组员成功');
	},1000)
});

function set_team(q) {
	var setting = {
		url: ZDurl+'?_c=monster&action=AttackBulk&inventory_monster_ids='+q,
		error:function(){
			setTimeout(function() {
				$.ajax(setting);
			},1500);
		}
	}
	$.ajax(setting);
}

function reset_team() {
	var setting = {
		url: ZDurl+'?_c=monster&action=resetPriority&list_type=offense&_='+timestamp,
		error:function(){
			setTimeout(function() {
				$.ajax(setting);
			},1500);
		}
	}
	$.ajax(setting);
}

//分别show队长和组员
$('#show5').click(function() {
	var e=$("input[name='card_list']:checked");
	if (e.length == 1) {
		$('#leader1').val(e[0].value+';');
	}else{
		$('#team4').val(get_team_id(e[0].value,e[1].value,e[2].value,e[3].value));		
	}
});
//一键换攻组-队长加组员
function set_all_team(i){
	var p = $('#all_team'+i).val().split(';');
	$('#if_set_all_leader_ok').text('');
	setTimeout(function() {
		set_leader(p[0]);
		$('#if_set_all_leader_ok').text('换队长成功');
		$('<span>换队长成功...</span><br />').appendTo($('#tower_event_info'));

		setTimeout(function() {
			reset_team();
			$('#if_set_all_team_ok').text('清除优先度');
			$('<span>清除优先度...</span><br />').appendTo($('#tower_event_info'));

			setTimeout(function  () {
				set_team(p[1]);
				$('#if_set_all_team_ok').text('换组员成功,可以开打');
				$('<span>换组员成功,可以开打...</span><br />').appendTo($('#tower_event_info'));
			},24000);
		},14000);		
	},1200);
}
//计时器
var clock_count_time;
function count_time(arg,i) {
	$('#count_time_'+arg).show();
	$('#count_time_'+arg).text('');
		//倒计时10秒钟
	clock_count_time = setInterval(function(){
		$('#count_time_'+arg).text(i);
		--i;
		if (i<=0) {
			clearInterval(clock_count_time);
			$('#count_time_'+arg).hide();
		};
	},1000);
}

// 封印石----------------------------------------------------------------------------------------
//                                                                                         封印石
// 封印石----------------------------------------------------------------------------------------
//获取决斗列表防御值，并攻击——屯石
$('#get_defense').click(function(){

	$('#def_list').show();
	cfg_color = $('#cfg_color').val();
	cfg_def = $('#cfg_def').val();
	cfg_time = $('#cfg_time').val();
	stone_leader1 = $('#stone_leader1').val();
	stone_leader2 = $('#stone_leader2').val();

	var setting = {
			//封印石大活动
			// url: ZDurl+'?_c=parts_pvp_event&action=battle_opponents&evid=82&target_item_id='+cfg_color+'&_='+ timestamp,

			//抢兔子石头
			url: ZDurl+'?_c=battle&action=opponents_for_parts&target_parts_id=68'+cfg_color+'&from_battle_tab=parts&_='+ timestamp,
			//抢普通决斗
			// url: ZDurl+'?_c=battle&action=opponents_for_level&from_battle_tab=level&_='+ timestamp,
			//抢爬塔封印石
			// url: ZDurl+'?_c=battle&action=opponents_for_parts&target_parts_id=1599'+cfg_color+'&from_battle_tab=parts&_'+ timestamp,

			
			dataType: 'json',
			success:function(e){
				$('#att_res1').text('');
				$('#att_res2').text('');
				// console.log(e);
				$('#curr_at_spr').text(e.battle_user_status.offense_guts);
				$('#max_at_spr').text(e.battle_user_status.offense_guts_max);
				$('#total_att').text(e.battle_user_status.total_attack);
				if (e.battle_user_status.offense_guts > 29) {

					var newarr = new Array();
					$.each(e.opponents, function(i) {
						if (e.opponents[i].detail.defense < cfg_def) {
							newarr.push(e.opponents[i].detail.userId);
						};
					});
					// console.log(newarr);

					if (newarr.length != 0) {
						clearTimeout(attack_T);
						setTimeout(function () {
							$('#att_res1').text('切换成低防队长...');
							set_leader(stone_leader2);

							setTimeout(function () {
								// attack(newarr[0]);
								attack_stone(newarr[0],cfg_color);
								$('#att_res1').text(':)找到并攻击这货:'+newarr[0]);

								setTimeout(function () {
									$('#att_res1').text('切换回高防队长...');
									set_leader(stone_leader1);

									attack_T = setTimeout(function () {
										$.ajax(setting);
									},5500);

								},2500);

							},2000);

						},100);
					}else{
						$('#att_res2').text('本次无果防');
						attack_T = setTimeout(function () {
							// setTimeout(function () {
								$.ajax(setting);
								$('#att_res2').text('');
						},1100);
					}
				}else{
					if ($('#is_water_stone').is(":checked")) {
						$('#att_res2').text('允许喝水');
						setTimeout(function  () {
							$('#att_res2').text('喝掉1灵水');
							use_goods(5);

							attack_T = setTimeout(function() {
								$.ajax(setting);
							},1100);
						},2000);
					}else{
						$('#att_res2').text('检测结果【不喝水】。开始回灵...');
						count_time("stone",cfg_time*60);
						// clearTimeout(attack_T);
						attack_T = setTimeout(function() {
							$.ajax(setting);
						},cfg_time*60*1000+5000);						
					}

				}
			},
			error:function  () {
				attack_T = setTimeout(function() {
					$.ajax(setting);
				},2000);
			}
		}
		$.ajax(setting);
	});

//获取决斗列表防御值，并攻击——顺序
$('#get_defense_order').click(function(){

	$('#def_list').show();
	cfg_def = $('#cfg_def').val();
	cfg_time = $('#cfg_time').val();
	stone_leader1 = $('#stone_leader1').val();
	stone_leader2 = $('#stone_leader2').val();

	var setting_cfg_color = {
		url: ZDurl+'?_c=battle',
		success:function(e){
			var str1 = e.indexOf('data-target-item-id="')+21;
			// var str1 = e.indexOf('data-target-parts-id="1599')+26;
			var cfg_color = e.substr(str1,1);
			if ("123456".indexOf(cfg_color) == -1) {//出现了l
				setTimeout(function  () {
					$.ajax(setting_cfg_color);
				},5000);
				$('#att_res2').text('当前石头编号为:出现错误！');
				return false;
			}
			$('#att_res2').text('当前石头编号为:'+cfg_color);


			setTimeout(function  () {
				var setting = {
						url: ZDurl+'?_c=parts_pvp_event&action=battle_opponents&evid=82&target_item_id='+cfg_color+'&_='+ timestamp,
						// url: ZDurl+'?_c=battle&action=opponents_for_level&from_battle_tab=level&_='+ timestamp,
						// url: ZDurl+'?_c=battle&action=opponents_for_parts&target_parts_id=1599'+cfg_color+'&from_battle_tab=parts&_'+ timestamp,
									   
						dataType: 'json',
						success:function(e){
							$('#att_res1').text('');
							$('#att_res2').text('');
							$('#curr_at_spr').text(e.battle_user_status.offense_guts);
							$('#max_at_spr').text(e.battle_user_status.offense_guts_max);
							$('#total_att').text(e.battle_user_status.total_attack);
							if (e.battle_user_status.offense_guts > 29) {

								var newarr = new Array();
								$.each(e.opponents, function(i) {
									if (e.opponents[i].detail.defense < cfg_def) {
										newarr.push(e.opponents[i].detail.userId);
									};
								});

								if (newarr.length != 0) {
									clearTimeout(attack_T);
									setTimeout(function () {
										$('#att_res1').text('切换成低防队长...');
										set_leader(stone_leader2);

										setTimeout(function () {
											// attack(newarr[0]);
											attack_stone(newarr[0],cfg_color);
											$('#att_res1').text(':)找到并攻击这货:'+newarr[0]);

											setTimeout(function () {
												$('#att_res1').text('切换回高防队长...');
												set_leader(stone_leader1);

												attack_T = setTimeout(function () {
													$.ajax(setting_cfg_color);
												},5500);

											},2500);

										},2000);

									},100);

								}else{
									$('#att_res2').text('本次无果防');
									attack_T = setTimeout(function () {
											$.ajax(setting);
											$('#att_res2').text('');
									},1100);
								}
							}else{
								if ($('#is_water_stone').is(":checked")) {
									$('#att_res2').text('允许喝水');
									setTimeout(function  () {
										$('#att_res2').text('喝掉1灵水');
										use_goods(5);

										attack_T = setTimeout(function() {
											$.ajax(setting);
										},1100);
									},2000);
								}else{
									$('#att_res2').text('检测结果【不喝水】。开始回灵...');
									count_time("stone",cfg_time*60);
									
									attack_T = setTimeout(function() {
										$.ajax(setting);
									},cfg_time*60*1000+5000);						
								}
							}
						},
						error:function  () {
							attack_T = setTimeout(function() {
								$.ajax(setting);
							},6000);
						}
					}
				$.ajax(setting);
			},8000);
		},
		error:function  () {
			attack_T = setTimeout(function() {
				$.ajax(setting_cfg_color);
			},4000);
		}
	}
	$.ajax(setting_cfg_color);
});

//取消决斗
$('#no_att').click(function(){
	clearTimeout(attack_T);
})

//攻击封印石裸防
function attack_stone(i1,i2){
	var setting = {
		//封印石大活动
		// url: ZDurl+'?_c=parts_pvp_event&action=exec_battle&target_user_id='+i1+'&target_item_id='+i2+'&evid=82',

		//抢兔子石头
		url: ZDurl+'?_c=battle&action=exec_battle&target_user_id='+i1+'&target_parts_id=68'+i2+'&from_battle_tab=&ref=undefined',

		//爬塔封印石
		// url: ZDurl+'?_c=battle&action=exec_battle&target_user_id='+i1+'&target_parts_id=1599'+i2+'&from_battle_tab=&ref=undefined',
		error:function  () {
			setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
}

//攻击普通裸防
function attack(i){
	var setting = {
		url: ZDurl+'?_c=battle&action=exec_battle&target_user_id='+i+'&target_parts_id=0&from_battle_tab=&ref=undefined',
		error:function  () {
			setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
}

$('#hideinfo').click(function () {
	$('#info_info').slideToggle();
});
$('#att_hide').click(function () {
	$('#auto_battle').slideToggle();
});
$('#hide_normal_switch').click(function () {
	$('#normal_switch').slideToggle();
});
$('#hide_super_switch').click(function () {
	$('#super_switch').slideToggle();
});
$('#hide_all_list').click(function () {
	$('#all_list').slideToggle();
});
$('#hide_consume').click(function () {
	$('#goods_use').slideToggle();
});
$('#inter_att_showhide').click(function () {
	$('#inter_att_showhide_div').slideToggle();
});
$('#club_set').click(function () {
	$('#club_set_div').slideToggle();
});
$('#ped_showhide').click(function () {
	$('#single_ped_body').slideToggle();
});
