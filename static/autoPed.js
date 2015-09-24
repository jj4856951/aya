// var if_exist;
// //个讨
// $('#single_ped').click(function() {
// 	if_exist = null;
// 	cfg_offense_expect = $('#cfg_offense_expect').val();

// 	var setting = {
// 		url: ZDurl+'?_c=monster&action=jsonlist&list_type=all&order_by=rarity-desc&_='+timestamp,
// 		// url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
// 		// url: ZDurl+'?_c=raid_event&action=battle_confirm&evid=64',
// 		// dataType: 'json',
// 		success:function(e){

// 			// console.log(e);
// 			// console.log(e.events);
// 			// console.log(e.events[0].type);
// 			$('#single_ped_rpt').text('启动个讨进程');
// 			$("#curr_offense").text(e.user.offense_guts);

// 			setTimeout(function() {
// 				get_monster_info();
// 				setTimeout(function  () {
// 					if (if_exist != -1) {//有怪兽
// 						$('#single_ped_rpt').text('目前有怪兽');
// 						if (cfg_offense_expect > e.user.offense_guts) {//未达到期望攻灵，需要回灵
// 							count_time("ped",(cfg_offense_expect - e.user.offense_guts)*60);
// 							setTimeout(function  () {
// 								$('#single_ped_rpt').text('攻击怪兽');
// 								exec_battle();
// 								setTimeout(function(){$.ajax(setting);},2000);
// 							},(cfg_offense_expect - e.user.offense_guts)*60*1000+5000);
// 						}else{//不需要回灵，直接打
// 							setTimeout(function  () {
// 								$('#single_ped_rpt').text('攻击怪兽');
// 								exec_battle();
// 								setTimeout(function(){$.ajax(setting);},2000);
// 							},2000);
// 						}
// 					}else{//没有怪兽，需不需要找出怪兽

// 						if (cfg_offense_expect > e.user.offense_guts) {//回灵时，不要找怪兽
// 							count_time("ped",(cfg_offense_expect - e.user.offense_guts)*60);
// 							$('#single_ped_rpt').text('此时无怪兽，但攻灵较低，回灵ing...');
// 							setTimeout(function  () {
// 								$('#single_ped_rpt').text('正在搜索怪兽');
// 								digout();
// 								setTimeout(function(){$.ajax(setting);},2000);
// 							},(cfg_offense_expect - e.user.offense_guts)*60*1000+5000);
// 						}else{//不需要回灵，直接找怪兽
// 							setTimeout(function  () {
// 								$('#single_ped_rpt').text('目前无怪兽，正在搜索怪兽');
// 								digout();
// 								setTimeout(function(){$.ajax(setting);},2000);
// 							},2000);
							
// 						}
// 					}
// 					// console.log(if_exist);
// 				},3000);
				
// 			},1000);

// 			$("#show_en").text(e.user.energy);
// 			$("#info_energy").text(e.user.energy);

// 			$("#auto_progress").show();
// 			$("#bar").css({width: e.user.exp_percentage+'%'});
// 		},
// 		error:function  () {
// 			setTimeout(function() {
// 				$.ajax(setting);
// 			},3000);
// 		}

// 	}
// 	$.ajax(setting);
// });


function get_monster_info () {
	var setting = {
		url: ZDurl+'?_c=raid_event&action=battle_confirm&evid=64',
		success:function(i){
			if_exist = i.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=raid_event&action=exec_battle&evid=64');
		},
		error:function  () {
			setTimeout(function  () {$.ajax(setting);},1200);
		}
	}
	$.ajax(setting);
}

function exec_battle () {
	var setting = {
		url: ZDurl+'?_c=raid_event&action=exec_battle&evid=76',
		error:function  () {
			setTimeout(function  () {$.ajax(setting);},1200);
		}
	}
	$.ajax(setting);
}
function cion_let_sheep_go () {
	var setting = {
		url: ZDurl+'?_c=raid_event&action=skip_battle&evid=76',
		error:function  () {
			setTimeout(function  () {$.ajax(setting);},1200);
		}
	}
	$.ajax(setting);	
}

function digout () {
	var setting = {
		url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			if (e.events[0].type == 'REDIRECT') {
				$('#single_ped_rpt').text('怪兽出现');
			}else{
				$('#single_ped_rpt').text('未找出怪兽');
			}

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
		}
	}
	// clock = setInterval(function(){$.ajax(setting);},1200);
	$.ajax(setting);
}

//================================================================================================
//=====================================公讨=====================================
//================================================================================================
/*$('#guild_ped').click(function() {
	var cfg_sheep = $('#cfg_sheep').val();

	var setting = {
		url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+timestamp,
		success:function(e){
			$('#single_ped_rpt').text('启动讨伐进程');
			$("#curr_offense").text(e.user.offense_guts);
			$('#single_ped_rpt').text('检测当前是否有怪存在...');

			setTimeout(function() {
				get_jiduotian_info();

				setTimeout(function  () {
					if (get_jiduotian_info_res != -1) {
						//有怪兽，检查是否是第cfg_sheep级
						$('#single_ped_rpt').text('有怪兽存在');
						var setting_sheep = {
							url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+timestamp,
							success:function(e){
								$('#single_ped_rpt').text('正在检测是【羊】或【狼】？');
								$("#curr_offense").text(e.user.offense_guts);

								setTimeout(function() {
									get_sheep_info (cfg_sheep);

									setTimeout(function() {
										if (get_sheep_info_res != -1) {
											//是狼，倒2，全检（不打）
											$('#single_ped_rpt').text('是【狼】,不打,进入倒计时...');
											count_time("ped", 15);
											setTimeout(function(){
												$.ajax(setting);
											},15*1000+3000);

										}else{
											//不是狼，需要打，打完检测该级别怪兽是否继续存在
											$('#single_ped_rpt').text('是怪兽/【羊】,正在攻击...');
											setTimeout(function(){exec_battle();},2000);
											var setting_sheep_exist = {
												url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+timestamp,
												success:function(e){
													$('#single_ped_rpt').text('检测该级别怪兽/【羊】是否继续存在?');
													$("#curr_offense").text(e.user.offense_guts);

													setTimeout(function() {
														get_jiduotian_info();

														setTimeout(function  () {
															if (get_jiduotian_info_res != -1) {
																//羊存在
																$('#single_ped_rpt').text('怪兽/【羊】存在，进入倒计时...');
																count_time("ped", 5);
																setTimeout(function(){
																	$.ajax(setting_sheep_exist);
																},5*1000+2000);

															}else{
																//羊被打掉了，有没有本体，都上去打一下
																$('#single_ped_rpt').text('怪兽/【羊】已不存在');
																setTimeout(function(){
																	exec_battle();
																	$('#single_ped_rpt').text('尝试攻击本体(如果有的话)...');

																	count_time("ped", 15);
																	setTimeout(function(){
																		$.ajax(setting);
																	},15*1000+5000);
																},3000);
															}
														},6000);
													},3000);

													$("#show_en").text(e.user.energy);
													$("#info_energy").text(e.user.energy);
													$("#auto_progress").show();
													$("#bar").css({width: e.user.exp_percentage+'%'});
												},
												error:function  () {
													setTimeout(function() {
														$.ajax(setting_sheep_exist);
													},3000);
												}
											}
											setTimeout(function(){$.ajax(setting_sheep_exist);},6000);
										}
									},6000);
								},3000);

								$("#show_en").text(e.user.energy);
								$("#info_energy").text(e.user.energy);
								$("#auto_progress").show();
								$("#bar").css({width: e.user.exp_percentage+'%'});
							},
							error:function  () {
								setTimeout(function() {
									$.ajax(setting_sheep);
								},3000);
							}
						}
						setTimeout(function(){$.ajax(setting_sheep);},3000);
						
					}else{
						//无怪兽，倒2分，全检
						$('#single_ped_rpt').text('当前无怪兽，进入倒计时...');
						count_time("ped", 15);
						setTimeout(function(){
							$.ajax(setting);
						},15*1000+5000);
					}
				},6000);
			},3000);

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
		},
		error:function  () {
			setTimeout(function() {
				$.ajax(setting);
			},3000);
		}
	}
	$.ajax(setting);
});

//检查本体是否存在
var get_bt_info_res;
function get_bt_info () {
	$.ajax({
		url: ZDurl+'?_c=guild_raid_event&action=battle_confirm&evid=69',
		success:function(i){
			// if_exist = i.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=guild_raid_event&action=exec_battle&evid=69');
			get_bt_info_res = i.indexOf('<div class="name">女祭司</div>');
		}
	});
}

//检测“级堕天存不存在”
var get_jiduotian_info_res;
function get_jiduotian_info () {
	$.ajax({
		url: ZDurl+'?_c=guild_raid_event&action=battle_confirm&evid=69',
		success:function(i){
			// if_exist = i.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=guild_raid_event&action=exec_battle&evid=69');
			get_jiduotian_info_res = i.indexOf('級女祭司[反轉]</div>');
		}
	});
}

//检测“放羊级堕天存不存在”
var get_sheep_info_res;
function get_sheep_info (arg) {
	$.ajax({
		url: ZDurl+'?_c=guild_raid_event&action=battle_confirm&evid=69',
		success:function(i){
			// if_exist = i.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=guild_raid_event&action=exec_battle&evid=69');
			get_sheep_info_res = i.indexOf('<div class="name">第'+arg+'級女祭司[反轉]</div>');
		}
	});
}*/

/*
																		个讨

=====================================================================个讨2.0

																		个讨
*/

$('#single_ped_2').click(function() {
	var cfg_offense_expect = $('#cfg_offense_expect').val();
	var cfg_water_ped = $('#cfg_water_ped').val();
	var wolf_list = $('#wolf_list').val();
	var	sheep_switch = false;

	var setting = {
		url: ZDurl+'?_c=battle&action=opponents_for_level&from_battle_tab=level&_='+timestamp,
		success:function(e){

			$('#single_ped_rpt').text('启动个讨进程--->');
			$("#curr_offense").text(e.battle_user_status.offense_guts);

			$('<br /><span>正在检测当前有无怪兽...</span>').appendTo('#single_ped_rpt');
			setTimeout(function  () {
				var setting_if_exist = {
					url: ZDurl+'?_c=raid_event&action=battle_confirm&evid=76',
					success:function(i){
						var ped_curr_monster_if_exist = i.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=raid_event&action=exec_battle&evid=76');

						if (ped_curr_monster_if_exist != -1) {
							var str1 = i.indexOf('<div class="name">第')+19;
							var str2 = i.indexOf('級殺手生化熊</div>');//每个活动都要改
							var curr_level = i.slice(str1,str2);
							
							$('<br /><span>有怪！怪兽等级为：'+curr_level+'</span>').appendTo('#single_ped_rpt');
							$('<br /><span>正在检测是否放羊？</span>').appendTo('#single_ped_rpt');

							if ($('#is_sheep').is(":checked") && (wolf_list.indexOf(curr_level) != -1)) {
								$('<br /><span>准备放羊，检测放羊模式...</span>').appendTo('#single_ped_rpt');
								switch($("#sheep_model").val()) {
									case '1'://自然放羊
										$('<br /><span>【自然放羊】进入倒计时3分...</span>').appendTo('#single_ped_rpt');
										count_time('ped',3*60);
										setTimeout(function  () {
											$('<br /><span>重新检测放羊...</span>').appendTo('#single_ped_rpt');
											$.ajax(setting);
										},3*60*1000+5000);
									break;

									case '2'://银货放羊
										if (curr_level < 81) {
											$('<br /><span>【银货放羊】但狼<81，直接回灵3分...</span>').appendTo('#single_ped_rpt');
											count_time('ped',3*60);
											setTimeout(function  () {
												$('<br /><span>重新检测放羊...</span>').appendTo('#single_ped_rpt');
												$.ajax(setting);
											},3*60*1000+5000);
										}else{
											$('<br /><span>【银货放羊】进入倒计时11分...</span>').appendTo('#single_ped_rpt');
											count_time('ped',11*60);
											setTimeout(function  () {
												$('<br /><span>执行银货放羊...</span>').appendTo('#single_ped_rpt');
												cion_let_sheep_go ();

												setTimeout(function  () {
													$('<br /><span>重新启动个讨进程...</span>').appendTo('#single_ped_rpt');
													$.ajax(setting);
												},3000);
											},11*60*1000+5000);
										}
									break;
								}
							}else{
								//不放羊，直往上打
								$('<br /><span>【小肥羊】猛烈往上打ing...</span>').appendTo('#single_ped_rpt');
								$('<br /><span>正在检测攻灵状态...</span>').appendTo('#single_ped_rpt');
								if (e.battle_user_status.offense_guts < cfg_water_ped) {
									//没打掉怪兽。攻灵又太低了。检查是否喝水
									$('<br /><span>攻灵已经低于最低喝水线！检测是否喝水...</span>').appendTo('#single_ped_rpt');
									if ($('#is_water_ped').is(":checked")) {
										//可以喝水
										$('<br /><span>允许喝，喝掉_1_水...</span>').appendTo('#single_ped_rpt');
										
										setTimeout(function() {
											use_goods(5);
											$('<br /><span>即将重新开启讨伐进程...</span>').appendTo('#single_ped_rpt');
											setTimeout(function  () {
												$.ajax(setting);
											},8000);
										},8000);
									}else{
										//不能喝水。只能回灵
										$('<br /><span>完全禁止喝水，进入倒计时...</span>').appendTo('#single_ped_rpt');
										count_time('ped',3*60);
										setTimeout(function  () {
											$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
											$.ajax(setting);
										},3*60*1000+5000);
									}
								}else{//没打掉怪兽，但攻灵充足，直接上
									$('<br /><span>攻灵充足，正在攻击...</span>').appendTo('#single_ped_rpt');
									setTimeout(function  () {
										exec_battle ();
										sheep_model = true;
										$('<br /><span>攻击完毕，即将重新检测...</span>').appendTo('#single_ped_rpt');
										setTimeout(function  () {
											$.ajax(setting);
										},9000);
									},9000);
								}
							}
						}else{
							if ($('#is_sheep').is(":checked") && sheep_model == true) {//放羊模式立即找怪，找完立即回攻灵
								$('<br /><span>【放羊模式探索...】</span>').appendTo('#single_ped_rpt');
								setTimeout(function() {
									var setting_ped_explore_insheep = {
										url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
										success:function(e){
											$('#single_ped_rpt').text('');
											if (e.events.length != 0 && e.events[0].type == 'REDIRECT') {
												$('#single_ped_rpt').text('狼级怪兽出现...进入回灵10分...');
												//不管三七二十一，先回灵11分钟
												count_time('ped',11*60);
												setTimeout(function  () {//回灵完重新检测怪还在不在
													$('<br /><span>检测是否达到攻灵期望值？</span>').appendTo('#single_ped_rpt');
													setTimeout(function  () {
														var setting_check_guts_insheep = {
															url: ZDurl+'?_c=battle&action=opponents_for_level&from_battle_tab=level&_='+timestamp,
															success:function(q){
																$('#single_ped_rpt').text('');
																$("#curr_offense").text(q.battle_user_status.offense_guts);
																if (q.battle_user_status.offense_guts < cfg_offense_expect) {
																	$('<br /><span>攻灵不够，检测是否喝水...</span>').appendTo('#single_ped_rpt');
																	if ($('#is_water_ped').is(":checked")) {
																		//可以喝水
																		if (q.battle_user_status.offense_guts < cfg_water_ped) {//检测是否达到喝水线
																			$('<br /><span>允许喝，且达到喝水线，喝掉_1_水...</span>').appendTo('#single_ped_rpt');
																			
																			setTimeout(function() {
																				use_goods(5);
																				$('<br /><span>即将重新检测攻灵...</span>').appendTo('#single_ped_rpt');
																				setTimeout(function  () {
																					$.ajax(setting_check_guts_insheep);
																				},8000);
																			},7000);
																		}else{//为未达到喝水线,还是得回灵
																			$('<br /><span>未达到喝水线，不能喝水，进入倒计时...</span>').appendTo('#single_ped_rpt');
																			count_time('ped',3*60);
																			setTimeout(function  () {
																				$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
																				$.ajax(setting_check_guts_insheep);
																			},3*60*1000+5000);
																		}
																	}else{
																		//不能喝水。只能回灵
																		$('<br /><span>完全禁止喝水，进入倒计时...</span>').appendTo('#single_ped_rpt');
																		count_time('ped',3*60);
																		setTimeout(function  () {
																			$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
																			$.ajax(setting_check_guts_insheep);
																		},3*60*1000+5000);
																	}
																}else{
																	$('<br /><span>攻灵充足，检测是否有怪...</span>').appendTo('#single_ped_rpt');
																	var setting_if_exist_insheep = {
																		url: ZDurl+'?_c=raid_event&action=battle_confirm&evid=76',
																		success:function(l){
																			var ped_curr_monster_if_exist_insheep = l.indexOf('http://zc2.ayakashi.zynga.com/app.php?_c=raid_event&action=exec_battle&evid=76');

																			if (ped_curr_monster_if_exist_insheep != -1) {
																				var str1 = l.indexOf('<div class="name">第')+19;
																				var str2 = l.indexOf('級殺手生化熊</div>');//每个活动都要改
																				var curr_level = l.slice(str1,str2);
																				
																				$('<br /><span>有怪！怪兽等级为：'+curr_level+'</span>').appendTo('#single_ped_rpt');
																				$('<br /><span>正在检测放羊模式？</span>').appendTo('#single_ped_rpt');
																				if ($("#sheep_model").val() == '2') {//银货放羊
																					$('<br /><span>当前模式【银货放羊】...</span>').appendTo('#single_ped_rpt');
																					setTimeout(function  () {
																						cion_let_sheep_go ();
																						$('<br /><span>放完羊了，重新开启个讨进程...</span>').appendTo('#single_ped_rpt');
																						setTimeout(function  () {
																							sheep_model = false;
																							$.ajax(setting);
																						},9000);
																					},8000);

																				}else{//自然放羊
																					$('<br /><span>当前模式【自然放羊】...</span>').appendTo('#single_ped_rpt');
																					sheep_model = false;
																					setTimeout(function  () {
																						$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
																						$.ajax(setting);
																					},9000);
																				}

																			}else{
																				$('<br /><span>当前无怪，即将重新开启个讨进程...</span>').appendTo('#single_ped_rpt');
																				sheep_model = false;
																				setTimeout(function  () {
																					$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
																					$.ajax(setting);
																				},9000);
																			}

																		},
																		error:function  () {
																			setTimeout(function() {
																				$.ajax(setting_if_exist_insheep);
																			},3000);
																		}
																	}
																	$.ajax(setting_if_exist_insheep);
																}
															},
															error:function  () {
																setTimeout(function() {
																	$.ajax(setting_check_guts_insheep);
																},3000);
															}
														}
														$.ajax(setting_check_guts_insheep);
													},8000);
												},11*60*1000+5000);
											}else{
												setTimeout(function() {$('#single_ped_rpt').text('本次未找出怪兽...即将重新探索...');},300);
												setTimeout(function() {
													$.ajax(setting_ped_explore_insheep);
												},7000);
											}

											$("#show_en").text(e.user.energy);
											$("#info_energy").text(e.user.energy);
											$("#auto_progress").show();
											$("#bar").css({width: e.user.exp_percentage+'%'});
										},
										error:function  () {
											setTimeout(function() {
												$.ajax(setting_ped_explore_insheep);
											},3000);
										}
									}
									$.ajax(setting_ped_explore_insheep);
								},9000);

							}else{//非放羊模式
								$('<br /><span>【非放羊模式探索...】</span>').appendTo('#single_ped_rpt');
								$('<br /><span>当前无怪，检测攻灵是否达到找怪期望值</span>').appendTo('#single_ped_rpt');
								if (e.battle_user_status.offense_guts < cfg_offense_expect) {
									$('<br /><span>攻灵不够，检测是否喝水...</span>').appendTo('#single_ped_rpt');
									if ($('#is_water_ped').is(":checked")) {
										//可以喝水
										if (e.battle_user_status.offense_guts < cfg_water_ped) {//检测是否达到喝水线
											$('<br /><span>允许喝，且达到喝水线，喝掉_1_水...</span>').appendTo('#single_ped_rpt');
											
											setTimeout(function() {
												use_goods(5);
												$('<br /><span>即将重新开启讨伐进程...</span>').appendTo('#single_ped_rpt');
												setTimeout(function  () {
													$.ajax(setting);
												},9000);
											},8000);
										}else{//为未达到喝水线,还是得回灵
											$('<br /><span>未达到喝水线，不能喝水，进入倒计时...</span>').appendTo('#single_ped_rpt');
											count_time('ped',3*60);
											setTimeout(function  () {
												$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
												$.ajax(setting);
											},3*60*1000+5000);
										}
									}else{
										//不能喝水。只能回灵
										$('<br /><span>完全禁止喝水，进入倒计时...</span>').appendTo('#single_ped_rpt');
										count_time('ped',3*60);
										setTimeout(function  () {
											$('<br /><span>即将重新开启讨伐进程</span>').appendTo('#single_ped_rpt');
											$.ajax(setting);
										},3*60*1000+5000);
									}

								}else{
									//不需要回灵，直接探索
									$('<br /><span>攻灵充足，正在探索...</span>').appendTo('#single_ped_rpt');
									setTimeout(function() {
										var setting_ped_explore = {
											url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
											success:function(e){
												$('#single_ped_rpt').text('');
												if (e.events.length != 0 && e.events[0].type == 'REDIRECT') {
													$('#single_ped_rpt').text('怪兽出现...即将启动讨伐进程...');
													setTimeout(function  () {
														$.ajax(setting);
													},8000);
												}else{
													setTimeout(function  () {
														$('#single_ped_rpt').text('本次未找出怪兽...即将重新探索...');
													},300);
													
													setTimeout(function  () {
														$.ajax(setting_ped_explore);
													},7000);
												}

												$("#show_en").text(e.user.energy);
												$("#info_energy").text(e.user.energy);
												$("#auto_progress").show();
												$("#bar").css({width: e.user.exp_percentage+'%'});
											},
											error:function  () {
												setTimeout(function() {
													$.ajax(setting_ped_explore);
												},3000);
											}
										}
										$.ajax(setting_ped_explore);
									},9000);
								}
							}
						}
					},
					error:function  () {
						setTimeout(function() {
							$.ajax(setting_if_exist);
						},3000);
					}
				}
				$.ajax(setting_if_exist);
			},10000);

		},
		error:function  () {
			setTimeout(function() {
				$.ajax(setting);
			},3000);
		}
	}
	$.ajax(setting);
});
