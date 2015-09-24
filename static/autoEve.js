//自动爬塔
const wandering = {
    10101590:'[神]怪獸貓詩織-？档-防:',
    10101591:'[九]濃姬的髮簪-？档-防:',
    10101592:'[神]瀧夜叉姬-？档-防:',
    10101593:'[九]成衣-？档-防:',
    10101594:'[神]伊索德-？档次绝-防:',
    10101598:'[九]山高神代櫻-？档超绝-防:',

    10111590:'[神]怪獸貓詩織-？档-勾玉',
    10111591:'[九]濃姬的髮簪-？档-勾玉',
    10111592:'[神]瀧夜叉姬-？档-勾玉',
    10111593:'[九]成衣-？档-勾玉',
    10111594:'[神]伊索德-？档次绝-勾玉',
    10111598:'[九]山高神代櫻-？档超绝-勾玉'
};
const keeper = {
    1015901:'5层守怪-[神]怪獸貓詩織-防:',
    1015902:'10层守怪-[神]怪獸貓詩織-防:',
    1015903:'15层守怪-[神]怪獸貓詩織-防:',
    1015904:'20层守怪-[神]怪獸貓詩織-防:',
    1015905:'25层守怪-[神]怪獸貓詩織-防:',

    1015910:'30层守怪-[九]濃姬的髮簪-防:',
    1015911:'30层守怪-[九]濃姬的髮簪-防:',
    1015912:'35层守怪-[九]濃姬的髮簪-防:',
    1015913:'40层守怪-[九]濃姬的髮簪-防:',
    1015914:'45层守怪-[九]濃姬的髮簪-防:',
    1015915:'50层守怪-[九]濃姬的髮簪-防:',
    1015916:'50层守怪-[九]濃姬的髮簪-防:',

    1015921:'55层守怪-[神]瀧夜叉姬-防:',
    1015922:'60层守怪-[神]瀧夜叉姬-防:',
    1015923:'65层守怪-[神]瀧夜叉姬-防:',
    1015924:'70层守怪-[神]瀧夜叉姬-防:',
    1015925:'75层守怪-[神]瀧夜叉姬-本体-防:',

    1015931:'80层守怪-[九]成衣-防:',
    1015932:'85层守怪-[九]成衣-防:',
    1015933:'90层守怪-[九]成衣-防:',
    1015934:'95层守怪-[九]成衣-防:',
    1015935:'100层守怪-[九]成衣-本体-防:',

    1015941:'110层守怪-[神]伊索德-防:',
    1015942:'120层守怪-[神]伊索德-防:',
    1015943:'130层守怪-[神]伊索德-防:',
    1015944:'140层守怪-[神]伊索德-防:',
    1015945:'150层守怪-[神]伊索德-本体-防:',

    1015951:'160层守怪-[妖]利維坦-防:',
    1015952:'170层守怪-[妖]利維坦-防:',
    1015953:'180层守怪-[妖]利維坦-防:',
    1015954:'190层守怪-[妖]利維坦-防:',
    1015955:'200层守怪-[妖]利維坦-本体-防:'
};
const low_save = [
"1015901",
"1015902",
"1015903",
"1015904",
"1015905",

"1015910",
"1015911",
"1015912",
"1015913",
"1015914",
"1015915",
"1015916",

"1015921",
"1015922",
"1015923",

"1015931",
"1015932",
"1015933",

"1015941",
"1015942",

"1015951"
];

//全自动爬塔
$('#tower_auto').click(function(){
	var woman_leader = $('#woman_leader').val();
	var cfg_lowest_gut = $('#cfg_lowest_gut').val();
	var cfg_recover_time_energy = $('#cfg_recover_time_energy').val();
	var get_list_wanger_temp = $("input[name='club_list']:checked");
	
	var get_list_wanger = new Array();
	$.each(get_list_wanger_temp, function(i) {
		 get_list_wanger.push(get_list_wanger_temp[i].value);
	});

	if (!$('#is_ball').is(":checked") && !cfg_recover_time_energy) {
		alert("不吃丸子可以，但需要设置体力恢复间隔");
		return false;
	};

	var setting = {
		url: ZDurl+'?_c=ExtraQuestEventAdventure&action=proceed&island_id=1&area_id=1&stage_id=1&evid=80&newest=1&_='+ timestamp,
		// url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$('#tower_event_info').text('');
			// console.log(e);
			$('#progress').text(e.stage.progress);
			switch (e.events.length)
				{
				case 0:
					setTimeout(function(){
						$('#tower_event_info').text('空空如也...');
					},300);
					clock = setTimeout(function(){$.ajax(setting);},4000);
			    break;
				
				case 1:
					switch(e.events[0].type){
						case "LEVEL_UP":
							$('#tower_event_info').text('');
							$('<span>已升级</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},4000);
						break;

						case "GET_PARTS":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.partsName+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},4000);
						break;

						case "GET_MONSTER":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.monster.name+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},4000);
						break;

						case "GET_EVENT_ITEM":
							$('#total_gifts_show').show();
							$('#tower_event_info').text('');
							$('<span>收获额外礼物数：'+e.events[0].values.discovery.additionalCount+'</span><br />').appendTo($('#tower_event_info'));
							$('<span>收获普通礼物数：'+e.events[0].values.discovery.count+'</span><br />').appendTo($('#tower_event_info'));
							$('#total_gifts').text(e.events[0].values.discovery.totalCount);
							clock = setTimeout(function(){$.ajax(setting);},4000);
						break;

						case "STAGE_COMPLETE":
							$('#tower_event_info').text('');
							$('<span>完成该层</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},4000);
						break;

						case "REDIRECT":
							// clearTimeout(clock);
							$('#tower_event_info').text('');
							$('<span>自动爬塔已暂停！</span><br />').appendTo($('#tower_event_info'));
							var battle_id = get_battle_id(e.events[0].values.url);

							if (battle_id[1] == '1') {//是勾玉，直接询问是否兑换
								$('<span>'+get_time()+'勾玉发现:<br /><strong style="color:yellow">'+wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
								$('<a href="'+e.events[0].values.url+'">→勾玉链接</a><br />').appendTo($('.log_info'));
								$('<span>正在检测是否收取...</span><br />').appendTo($('.log_info'));
								setTimeout(function  () {
									
									if (contains(get_list_wanger, battle_id)) {//需要收取
										var setting2 = {
											url: e.events[0].values.url,
											error:function(){
												setTimeout(function() {
													$.ajax(setting2);
												},2000);
											}
										}
										$.ajax(setting2);
										setTimeout(function  () {
											$('<span>需要收，且正在收取...</span><br />').appendTo($('.log_info'));
											get_wander();

											clock = setTimeout(function  () {
                                                $('<span>收完了。进行下一轮探索...</span><br />').appendTo($('.log_info'));
												$.ajax(setting);
											},8000);
										},8000);
									}else{//不需要收取,直接进行下一轮探索
                                        $('<span>不收。进行下一轮探索...</span><br />').appendTo($('.log_info'));
										clock = setTimeout(function  () {
											$.ajax(setting);
										},6000);
									}
								},6000);
							}else{//是游荡
								$('<span>'+get_time()+'狭路相逢:<br /><strong style="color:yellow">'+wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
								$('<a href="'+e.events[0].values.url+'">→游荡链接</a><br />').appendTo($('.log_info'));
								$('<span>'+get_time()+'正在检测要不要打...</span><br />').appendTo($('.log_info'));

								switch	($("#"+battle_id).val()) {
									case "1":
										//打，但不收
										$('<span>'+get_time()+'【打+不收】正在换组...</span><br />').appendTo($('.log_info'));
										setTimeout(function () {
											set_all_team(battle_id);
										},3000);
										setTimeout(function  () {
											var setting1 = {
												url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+ timestamp,
												success:function(f){
													$('#tower_event_info').text('');
		                                            $('<span>'+get_time()+'正在检测攻灵:</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'当前攻灵值为:'+f.user.offense_guts+'</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'当前攻组必要攻灵值为:'+f.totalGuts+'</span><br />').appendTo($('.log_info'));
													
													if (f.user.offense_guts >= f.totalGuts) {//实时攻灵大于必要攻灵，可以开战
														$('<span>'+get_time()+'攻灵充足:)...开打...</span><br />').appendTo($('.log_info'));
														setTimeout(function  () {
															att_both(battle_id,1);
															$('<span>'+get_time()+'已经攻击完毕！正在清除交涉页面...</span><br />').appendTo($('.log_info'));
															setTimeout(function  () {
																clear_wander();

																//=======>继续爬<=======
																setTimeout(function  () {
																	set_leader(woman_leader);
																	$('<span>'+get_time()+'正在更换女忍为队长...</span><br />').appendTo($('.log_info'));
																	$('<span>'+get_time()+'3分后...进行下一轮探索...</span><br />').appendTo($('.log_info'));
																	count_time("tower",3*60);

																	clock = setTimeout(function  () {
																		$.ajax(setting);
																	},3*60*1000+5000);
																},6000);
															},6000);
														},6000);

													}else{//需要回灵或喝水
														if ($('#is_water').is(":checked")) {//选中喝水了,检测喝水线
															if (f.user.offense_guts <= cfg_lowest_gut) {
																setTimeout(function  () {//喝水
																	use_goods(5);
																	$('<span>'+get_time()+'攻灵不足,允许喝水。喝掉 _1_ 灵水...</span><br />').appendTo($('.log_info'));
																	
																	setTimeout(function  () {
																		$.ajax(setting1);
																		$('<span>'+get_time()+'即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																	},3000);
																},3000);
															}else{//当前攻灵大于所设置的最低喝水线，不能喝水，需要回灵
																$('<span>'+get_time()+'未达到喝水线,不喝。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
																// var time_to_attack = f.totalGuts - f.user.offense_guts;
																count_time("tower",5*60);

																setTimeout(function() {
																	$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																	$.ajax(setting1);
																},5*60*1000+5000);
															}
														}else{//没选中喝水，即回灵
															$('<span>'+get_time()+'攻灵不够:(且禁止喝水。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
															// var time_to_attack = f.totalGuts - f.user.offense_guts;
															count_time("tower",5*60);

															setTimeout(function() {
																$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																$.ajax(setting1);
															},5*60*1000+5000);

														}
													};
												},
												error:function  () {
													setTimeout(function() {
														$.ajax(setting1);
													},3000);
												}
											}
											$.ajax(setting1);
										},60000);
									break;

									case "2":
										//打+收
										$('<span>'+get_time()+'【打+收】正在换组...</span><br />').appendTo($('.log_info'));
										setTimeout(function () {
											set_all_team(battle_id);
										},3000);
										setTimeout(function  () {
											var setting1 = {
												url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+ timestamp,
												success:function(f){
													$('#tower_event_info').text('');
		                                            $('<span>'+get_time()+'正在检测攻灵:</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'当前攻灵值为:'+f.user.offense_guts+'</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'当前攻组必要攻灵值为:'+f.totalGuts+'</span><br />').appendTo($('.log_info'));
													
													if (f.user.offense_guts >= f.totalGuts) {//实时攻灵大于必要攻灵，可以开战
														$('<span>'+get_time()+'攻灵充足:)...开打...</span><br />').appendTo($('.log_info'));
														setTimeout(function  () {
															att_both(battle_id,1);
															$('<span>'+get_time()+'已经攻击完毕！正在收取...</span><br />').appendTo($('.log_info'));
															
															setTimeout(function  () {
																get_wander();//执行收取操作
																$('<span>'+get_time()+'已执行收取</span><br />').appendTo($('.log_info'));

																//=======>继续爬<=======先换女忍做队长
																setTimeout(function  () {
																	set_leader(woman_leader);
																	$('<span>'+get_time()+'正在更换女忍为队长...</span><br />').appendTo($('.log_info'));
	                                                                $('<span>'+get_time()+'3分后...进行下一轮探索...</span><br />').appendTo($('.log_info'));
																	count_time("tower",3*60);

																	clock = setTimeout(function  () {
																		$.ajax(setting);
																	},3*60*1000+5000);
																},5000);
															},6000);
															
														},6000);

													}else{//需要回灵或喝水
														if ($('#is_water').is(":checked")) {//选中喝水了,检测喝水线
															if (f.user.offense_guts <= cfg_lowest_gut) {
																setTimeout(function  () {//喝水
																	use_goods(5);
																	$('<span>'+get_time()+'攻灵不足,允许喝水。喝掉 _1_ 灵水...</span><br />').appendTo($('.log_info'));
																	
																	setTimeout(function  () {
																		$.ajax(setting1);
																		$('<span>'+get_time()+'即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																	},3000);
																},3000);
															}else{//当前攻灵大于所设置的最低喝水线，不能喝水，需要回灵
																$('<span>'+get_time()+'未达到喝水线,不喝。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
																count_time("tower",5*60);

																setTimeout(function() {
																	$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																	$.ajax(setting1);
																},5*60*1000+5000);
															}
														}else{//没选中喝水，即回灵
															$('<span>'+get_time()+'攻灵不够:(且禁止喝水。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
															count_time("tower",5*60);

															setTimeout(function() {
																$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																$.ajax(setting1);
															},5*60*1000+5000);
														}
													};
												},
												error:function  () {
													setTimeout(function() {
														$.ajax(setting1);
													},3000);
												}
											}
											$.ajax(setting1);
										},60000);
									break;

									case "3":
										//不打，直接放走
										$('<span>'+get_time()+'【不打】绕开这货...直接进行下一轮探索</span><br />').appendTo($('.log_info'));
										setTimeout(function  () {
											$.ajax(setting);
										},3000);
									break;
								}
							}
						break;

						case "NO_ENOUGH_ENERGY":
							// clearTimeout(clock);
							$('#tower_event_info').text('');
							$('<span>没体力了！</span><br />').appendTo($('#tower_event_info'));
							$('<span>自动爬塔已暂停！检测吃不吃丸子...</span><br />').appendTo($('#tower_event_info'));
							if ($('#is_ball').is(":checked")) {//选中了吃丸子
								setTimeout(function  () {
									use_goods(4);
									$('<span>'+get_time()+'吃掉 _1_ 丸子...</span><br />').appendTo($('.log_info'));
									$('<span>'+get_time()+'立即开启新一轮探索...</span><br />').appendTo($('.log_info'));
									setTimeout(function  () {
										$.ajax(setting);
									},3000);
								},3000);
							}else{//没选中吃丸子，即回灵。每隔?分钟重新探索一次
								$('<span>'+get_time()+'不吃。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
								count_time("tower",cfg_recover_time_energy*60);
								clock = setTimeout(function() {
									$('<span>'+get_time()+'尝试新一轮探索...</span><br />').appendTo($('.log_info'));
									$.ajax(setting);
								},cfg_recover_time_energy*60*1000+5000);
							}
						break;
					}
			    break;
			    
			    case 2://遇到守层
					if (e.events[0].type == "STAGE_COMPLETE" && e.events[1].type == "STAGE_BATTLE_MODE") {
						// clearTimeout(clock);
						$('#tower_event_info').text('');
						$('<span>自动爬塔已暂停！</span><br />').appendTo($('#tower_event_info'));
						var battle_id = e.battleId+'';
						$('<span>'+get_time()+'遇到<strong style="color:red">'+keeper[e.battleId]+'</strong>,必须得打！</span><br />').appendTo($('.log_info'));
						$('<span>'+get_time()+'正在换组...</span><br />').appendTo($('.log_info'));

						if (contains(low_save, battle_id)) {
							setTimeout(function () {
								set_all_team(10);
							},3000);
						}else{
							setTimeout(function () {
								set_all_team(e.battleId);
							},3000);
						}

						setTimeout(function  () {
							var setting1 = {
								url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+ timestamp,
								success:function(f){
									$('#tower_event_info').text('');
                                    $('<span>'+get_time()+'换组完毕...开始检测攻灵</span><br />').appendTo($('.log_info'));
									$('<span>'+get_time()+'当前攻灵值为:'+f.user.offense_guts+'</span><br />').appendTo($('.log_info'));
									$('<span>'+get_time()+'当前攻组必要攻灵值为:'+f.totalGuts+'</span><br />').appendTo($('.log_info'));
									
									if (f.user.offense_guts >= f.totalGuts) {//实时攻灵大于必要攻灵，可以开战
										$('<span>'+get_time()+'攻灵充足:)...开打...</span><br />').appendTo($('.log_info'));
										setTimeout(function  () {
											att_both(e.battleId,0);
											$('<span>'+get_time()+'已经攻击完毕！尝试纳入囊中...</span><br />').appendTo($('.log_info'));
											
											setTimeout(function  () {
												get_keeper();//执行收取操作

												//=======>继续爬<=======
												setTimeout(function  () {
													set_leader(woman_leader);
													$('<span>'+get_time()+'正在更换女忍为队长...</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'3分后...进行下一轮探索...</span><br />').appendTo($('.log_info'));
													count_time("tower",3*60);

													clock = setTimeout(function  () {
														$.ajax(setting);
													},3*60*1000+5000);
												},6000);
											},6000);
										},6000);

									}else{//需要回灵或喝水
										$('<span>'+get_time()+'攻灵不够:(...检测是否喝水</span><br />').appendTo($('.log_info'));
										if ($('#is_water').is(":checked")) {//选中喝水了,检测喝水线
											if (f.user.offense_guts <= cfg_lowest_gut) {
												setTimeout(function  () {//喝水
													use_goods(5);
													$('<span>'+get_time()+'喝掉 _1_ 灵水...</span><br />').appendTo($('.log_info'));
													$('<span>'+get_time()+'立即重新检测攻灵...</span><br />').appendTo($('.log_info'));
													setTimeout(function  () {
														$.ajax(setting1);
													},3000);
												},3000);
											}else{//当前攻灵大于所设置的最低喝水线，不能喝水，需要回灵
												$('<span>'+get_time()+'未达到喝水线,不喝。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
												// var time_to_attack = f.totalGuts - f.user.offense_guts;
												count_time("tower",5*60);

												setTimeout(function() {
													$('<span>'+get_time()+'回灵完毕,开始重新检测攻灵...</span><br />').appendTo($('.log_info'));
													$.ajax(setting1);
												},5*60*1000+5000);
											}
										}else{//没选中喝水，即回灵
											$('<span>'+get_time()+'压根不喝水...开始回灵倒计时...</span><br />').appendTo($('.log_info'));
											count_time("tower",5*60);

											setTimeout(function() {
												$('<span>'+get_time()+'回灵完毕,开始重新检测攻灵...</span><br />').appendTo($('.log_info'));
												$.ajax(setting1);
											},5*60*1000+5000);
										}
									};
								},
								error:function  () {
									setTimeout(function() {
										$.ajax(setting1);
									},3000);
								}
							}
							$.ajax(setting1);
						},45000);
					}else if (e.events[0].type == "STAGE_COMPLETE" && e.events[1].type == "STAGE_AFTER_DRAMA_MODE") {
						$('#tower_event_info').text('');
						$('<span>完成该层</span>').appendTo($('#tower_event_info'));
						clock = setTimeout(function(){$.ajax(setting);},4000);
					}else if (e.events[0].type == "LEVEL_UP") {
						$('#tower_event_info').text('');
						$('<span>已升级</span>').appendTo($('#tower_event_info'));
						clock = setTimeout(function(){$.ajax(setting);},4000);
					};
					
			    break;
			  }	

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			log10 ();
		},
		error:function  () {
			clock = setTimeout(function() {
				$.ajax(setting);
			},3000);
		}
	}
	$.ajax(setting);
});

//半自动爬塔
$('#tower').click(function(){
	var setting = {
		url: ZDurl+'?_c=ExtraQuestEventAdventure&action=proceed&island_id=1&area_id=1&stage_id=1&evid=80&newest=1&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$('#tower_event_info').text('');
			// console.log(e);
			$('#progress').text(e.stage.progress);
			switch (e.events.length)
				{
				case 0:
					setTimeout(function(){
						$('#tower_event_info').text('空空如也...');
					},300);
					clock = setTimeout(function(){$.ajax(setting);},1100);

			    break;
				
				case 1:
					switch(e.events[0].type){
						case "GET_PARTS":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.partsName+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "GET_MONSTER":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.monster.name+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "GET_EVENT_ITEM":
							$('#total_gifts_show').show();
							$('#tower_event_info').text('');
							$('<span>收获额外礼物数：'+e.events[0].values.discovery.additionalCount+'</span><br />').appendTo($('#tower_event_info'));
							$('<span>收获普通礼物数：'+e.events[0].values.discovery.count+'</span><br />').appendTo($('#tower_event_info'));
							$('#total_gifts').text(e.events[0].values.discovery.totalCount);
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "STAGE_COMPLETE":
							$('#tower_event_info').text('');
							$('<span>完成该层</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "REDIRECT":
							$('#tower_event_info').text('');
							$('<span>自动爬塔已停止！</span><br />').appendTo($('#tower_event_info'));
							var battle_id = get_battle_id(e.events[0].values.url);

							if (battle_id[1] == '1') {//证明是勾玉，直接询问是否兑换
								$('<span>'+get_time()+'勾玉发现:<br /><strong style="color:yellow">'+wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
								$('<a href="'+e.events[0].values.url+'">→勾玉链接</a><br />').appendTo($('.log_info'));
								$('<span>请选择:<br />1.手动模式,右击↑链接在新页面换取;不换就继续爬塔~</span><br />').appendTo($('#tower_event_info'));
								// $('<span id="get_magatama" style="color:#abcdef">2.自动模式,点我直接换,注意礼物数！</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
								// $('#get_magatama').click(function() {
								// 	setTimeout(function() {
								// 		get_wander();
								// 		$('<span>'+get_time()+'已将'+wandering[battle_id]+'纳入囊中！请继续...</span><br />').appendTo($('.log_info'));
								// 	},1000);
								// });
							}else{
								$('<span>'+get_time()+'狭路相逢:<br /><strong style="color:yellow">'+wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
								$('<a href="'+e.events[0].values.url+'">→游荡链接</a><br />').appendTo($('.log_info'));
								$('<span>请选择:<br />1.手动模式,右击↑链接在新页面开干;不干就继续爬塔~</span><br />').appendTo($('#tower_event_info'));
								
								$('<span id="att_wander" style="color:#abcdef">2.自动模式,点我直接打,注意攻灵和攻组！</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
								$('#att_wander').click(function() {
									setTimeout(function(){
										att_both(battle_id,1);
										$('<span>'+get_time()+'攻击成功！是否要用礼物换?</span><br />').appendTo($('#tower_event_info'));
										$('<span id="get_wander" style="color:yellow">'+get_time()+'要换点我,不换就继续...</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
											$('#get_wander').click(function  () {
												setTimeout(function  () {
													get_wander();
													$('<span>'+get_time()+'已将'+wandering[battle_id]+'纳入囊中！请继续...</span><br />').appendTo($('.log_info'));
												},1300);
											});
									},1400);
								});
							}
						break;

						case "NO_ENOUGH_ENERGY":
							$('#tower_event_info').text('');
							$('<span>没体力了！</span><br />').appendTo($('#tower_event_info'));
							$('<span>自动爬塔已停止！</span><br />').appendTo($('#tower_event_info'));
						break;
					}
			    break;
			    
			    case 2:
					if (e.events[0].type == "STAGE_COMPLETE" && e.events[1].type == "STAGE_BATTLE_MODE") {
						$('#tower_event_info').text('');
						$('<span>自动爬塔已停止！</span><br />').appendTo($('#tower_event_info'));
						var battle_id = e.battleId+'';
						$('<span>'+get_time()+'遇到<strong style="color:red">'+keeper[e.battleId]+'</strong>,必须得打！</span><br />').appendTo($('.log_info'));
						$('<span id="att_keeper" style="color:#abcdef">点我直接打，注意攻灵和攻组！</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
						$('#att_keeper').click(function() {
							setTimeout(function(){
								att_both(e.battleId,0);
								$('<span>'+get_time()+'已经攻击完毕！请继续...</span><br />').appendTo($('#tower_event_info'));
								if (battle_id[6] == '5') {
									$('<span id="get_keeper" style="color:yellow">'+get_time()+'可以收服这货了。点我直接收服！</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
									$('#get_keeper').click(function  () {
										setTimeout(function  () {
											get_keeper();
											$('<span>'+get_time()+'已将这货纳入囊中！请继续...</span><br />').appendTo($('.log_info'));
										},1300);
									});
								};
							},1400);
						});
					};
			    break;
			  }	

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			log10 ();
		}
	}
	$.ajax(setting);
});

$('#no_tower').click(function() {
	clearTimeout(clock);
});
//获取游荡id
function get_battle_id (u) {
    var str1 = u.indexOf('battle_id=')+10;
    var str2 = u.indexOf('&encounter');
    return u.slice(str1,str2);
}
//攻击守层、游荡
function att_both(u,m){
	var setting = {
		url: ZDurl+'?target_user_id='+u+'&evid=80&encounter_battle_mode='+m+'&_c=extra_quest_event_npc_battle&action=exec_battle',
		error:function(){
			setTimeout(function() {
				$.ajax(setting);
			},2000);
		}
	}
	$.ajax(setting);
}
//攻击神社式神
function att_club(u){
	var setting = {
		url: ZDurl+'?target_user_id='+u+'&evid=13&encounter_battle_mode=1&_c=weekly_dungeon_npc_battle&action=exec_battle',
		error:function(){
			setTimeout(function() {
				$.ajax(setting);
			},1300);
		}
	}
	$.ajax(setting);
}

//清除游荡剧情残留
$('#clear_wander').click(function(){
	var setting = {
		url: ZDurl+'?_c=extra_quest_event_negotiation&action=resign&evid=80',
		error:function(){
		}
	}
	$.ajax(setting);
	$('#tower_event_info').text('');
	setTimeout(function  () {
		$('#tower_event_info').text('游荡交涉残留已清除');
	},1000);
});
function clear_wander(){
	var setting = {
		url: ZDurl+'?_c=extra_quest_event_negotiation&action=resign&evid=80',
		error:function(){
		}
	}
	$.ajax(setting);
}

//清除神社交涉
function clear_club_wander(){
	var setting = {
		url: ZDurl+'?_c=weekly_dungeon_negotiation&action=resign&evid=13',
		error:function(){
		}
	}
	$.ajax(setting);
}

//交涉获取守层式神
function get_keeper(){
	var setting = {
		url: ZDurl+'?_c=extra_quest_event_negotiation&action=negotiate&evid=80',
		error:function(){
		}
	}
	$.ajax(setting);
}
function get_wander(){
	var setting = {
		url: ZDurl+'?_c=extra_quest_event_negotiation&action=negotiate&method=use&evid=80',
		error:function(){
		}
	}
	$.ajax(setting);
}
//交涉获取神社式神
function get_club_wander(){
	var setting = {
		url: ZDurl+'?_c=weekly_dungeon_negotiation&action=negotiate&method=use&evid=13',
		error:function(){
		}
	}
	$.ajax(setting);
}

//日志功能
$('#log_on').click(function () {
	$('#log').slideToggle();
});
//清理日志，使不大于40条
function log10 () {
	var len = $('#log_cont').children().length;
	if (len > 40) {
		for (var i = 0; i < (len-40); i++) {
			$('#log_cont>:first').remove();
		};
	};
}

//检查某值是否存在一个数组中
function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == obj) {
			return true;
		}
	}
	return false;
}



// ===============================================================
// ===========================扫神社==============================
// ===============================================================
const club_wandering = {
	505850:"返魂香(返魂香)",
	505851:"返魂香(玉桂)",
	505852:"返魂香(弗兰肯二号)",
	505853:"返魂香(茉莉)",
	505860:"琵琶法师(琵琶法师)",
	505861:"琵琶法师(加拉迪亚)",
	505862:"琵琶法师(泰坦妮亚)",
	505863:"琵琶法师(奥布朗)",
	505864:"琵琶法师(波克)",
	506870:"彼列(彼列)",
	506871:"彼列(加拉迪亚)",
	506872:"彼列(香子蘭)",
	506873:"彼列(忒提斯)",
	505870:"僵尸(僵尸)",
	505871:"僵尸(麝香)",
	505872:"僵尸(琥珀)",
	505873:"僵尸(气精杰菲尔)",
	505874:"僵尸(沙罗蔓达)",
	506880:"春雷(春雷)",
	506881:"春雷(麝)",
	506882:"春雷(弗兰肯1号)",
	506883:"春雷(亚利安赫德)",
	506884:"春雷(蔷薇鞭)",
	506890:"甲贺忍者(甲贺忍者)",
	506891:"甲贺忍者(茉莉)",
	506892:"甲贺忍者(报丧女妖)",
	506893:"甲贺忍者(气精赛儿卡)",
	507440:"弗利艾(弗利艾)",
	507441:"弗利艾(长光)",
	507450:"科学怪人(科学怪人)",
	507451:"科学怪人(链锯珍)",
	507452:"科学怪人(黛芬妮)",
	507453:"科学怪人(溫蒂妮)",
	507454:"科学怪人(煙花)",
	507460:"妖魔(妖魔)",
	507461:"妖魔(芬妮尔)",
	507462:"妖魔(来蒂齐亚)",
	509510:"伊莉莎白巴托里(伊莉莎白巴托里)",
	509511:"伊莉莎白巴托里(米莉)",
	509512:"伊莉莎白巴托里(地精)",
	509520:"格莱希亚拉波斯(格莱希亚拉波斯)",
	509521:"格莱希亚拉波斯(莱拉·维加)",
	509522:"格莱希亚拉波斯(露西亚·维加)"
};

//半自动神社，遇到怪物就停止
$('#club').click(function(){
	var setting = {
		url: ZDurl+'?_c=weekly_dungeon_adventure&action=proceed&island_id=1&area_id=7&stage_id=13&evid=13&newest=1&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$('#tower_event_info').text('');
			$('#progress').text(e.stage.progress);
			switch (e.events.length)
				{
				case 0:
					setTimeout(function(){
						$('#tower_event_info').text('空空如也...');
					},300);
					clock = setTimeout(function(){$.ajax(setting);},1100);
			    break;
				
				case 1:
					switch(e.events[0].type){
						case "GET_PARTS":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.partsName+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "GET_MONSTER":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.monster.name+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;
//搞定
						case "GET_EVENT_ITEM":
							$('#total_gifts_show').show();
							$('#tower_event_info').text('');
							$('<span>收获额外礼物数：'+e.events[0].values.discovery.additionalCount+'</span><br />').appendTo($('#tower_event_info'));
							$('<span>收获普通礼物数：'+e.events[0].values.discovery.count+'</span><br />').appendTo($('#tower_event_info'));
							$('#total_gifts').text(e.events[0].values.discovery.totalCount);
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;
//搞定
						case "STAGE_COMPLETE":
							$('#tower_event_info').text('');
							$('<span>完成该层</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},1100);
						break;

						case "REDIRECT":
							$('#tower_event_info').text('');
							$('<span>半自动神社已停止！</span><br />').appendTo($('#tower_event_info'));
							var battle_id = get_battle_id(e.events[0].values.url);

								$('<span>'+get_time()+'狭路相逢:<br /><strong style="color:yellow">'+club_wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
								$('<a href="'+e.events[0].values.url+'">→游荡链接</a><br />').appendTo($('.log_info'));
								$('<span>请选择:<br />1.手动模式,右击↑链接在新页面开干;不干就继续爬~</span><br />').appendTo($('#tower_event_info'));
								
								$('<span id="att_wander" style="color:#abcdef">2.自动模式,点我直接打,注意攻灵和攻组！</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
								$('#att_wander').click(function() {
									setTimeout(function(){
										att_club(battle_id);
										$('<span>'+get_time()+'攻击成功！是否要用礼物换?</span><br />').appendTo($('#tower_event_info'));
										$('<span id="get_wander" style="color:yellow">'+get_time()+'要换点我,不换就继续...</span><br />').appendTo($('.log_info')).css({cursor: 'pointer'});
											$('#get_wander').click(function  () {
												setTimeout(function  () {
													get_club_wander();
													$('<span>'+get_time()+'已将'+club_wandering[battle_id]+'纳入囊中！请继续...</span><br />').appendTo($('.log_info'));
												},1300);
											});
									},1400);
								});
						break;

						case "NO_ENOUGH_ENERGY":
							$('#tower_event_info').text('');
							$('<span>没体力了！</span><br />').appendTo($('#tower_event_info'));
							$('<span>半自动神社已停止！</span><br />').appendTo($('#tower_event_info'));
						break;
					}
			    break;
			  }	

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			log10 ();
		}
	}
	$.ajax(setting);
});


/*全自动神社*/
$('#club_auto').click(function(){
	var woman_leader = $('#woman_leader').val();
	var cfg_lowest_gut = $('#cfg_lowest_gut').val();
	var cfg_recover_time_energy = $('#cfg_recover_time_energy').val();

	if (!$('#is_ball').is(":checked") && !cfg_recover_time_energy) {
		alert("不吃丸子可以，但需要设置体力恢复间隔");
		return false;
	};

	var setting = {
		url: ZDurl+'?_c=weekly_dungeon_adventure&action=proceed&island_id=1&area_id=7&stage_id=13&evid=13&newest=1&_='+ timestamp,
		// url: ZDurl+'?_c=adventure&action=proceed&island_id=3&area_id=8&stage_id=11&_='+ timestamp,
		dataType: 'json',
		success:function(e){
			$('#tower_event_info').text('');
			$('#progress').text(e.stage.progress);
			switch (e.events.length){
				case 0:
					setTimeout(function(){
						$('#tower_event_info').text('空空如也...');
					},300);
					clock = setTimeout(function(){$.ajax(setting);},2000);
			    break;
				
				case 1:
					switch(e.events[0].type){
						case "GET_PARTS":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.partsName+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},2000);
						break;

						case "GET_MONSTER":
							$('#tower_event_info').text('');
							$('<span>获得：'+e.events[0].values.settings.monster.name+'</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},2000);
						break;

						case "GET_EVENT_ITEM":
							$('#total_gifts_show').show();
							$('#tower_event_info').text('');
							$('<span>收获额外礼物数：'+e.events[0].values.discovery.additionalCount+'</span><br />').appendTo($('#tower_event_info'));
							$('<span>收获普通礼物数：'+e.events[0].values.discovery.count+'</span><br />').appendTo($('#tower_event_info'));
							$('#total_gifts').text(e.events[0].values.discovery.totalCount);
							clock = setTimeout(function(){$.ajax(setting);},2000);
						break;

						case "STAGE_COMPLETE":
							$('#tower_event_info').text('');
							$('<span>完成该层</span>').appendTo($('#tower_event_info'));
							clock = setTimeout(function(){$.ajax(setting);},2000);
						break;

						case "REDIRECT":
							$('#tower_event_info').text('');
							$('<span>自动爬塔已暂停！</span><br />').appendTo($('#tower_event_info'));
							var battle_id = get_battle_id(e.events[0].values.url);

							$('<span>'+get_time()+'狭路相逢:<br /><strong style="color:yellow">'+club_wandering[battle_id]+'</strong></span>').appendTo($('.log_info'));
							$('<a href="'+e.events[0].values.url+'">→游荡链接</a><br />').appendTo($('.log_info'));
							$('<span>'+get_time()+'正在检测要不要打...</span><br />').appendTo($('.log_info'));

							switch	($("#"+battle_id).val()) {
								case "1":
									//打，但不收
									$('<span>'+get_time()+'【打+不收】正在换组...</span><br />').appendTo($('.log_info'));
									setTimeout(function () {
										set_all_team(battle_id.slice(0, 5));
									},2000);
									setTimeout(function  () {
										var setting1 = {
											url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+ timestamp,
											success:function(f){
												$('#tower_event_info').text('');
	                                            $('<span>'+get_time()+'正在检测攻灵:</span><br />').appendTo($('.log_info'));
												$('<span>'+get_time()+'当前攻灵值为:'+f.user.offense_guts+'</span><br />').appendTo($('.log_info'));
												$('<span>'+get_time()+'当前攻组必要攻灵值为:'+f.totalGuts+'</span><br />').appendTo($('.log_info'));
												
												if (f.user.offense_guts >= f.totalGuts) {//实时攻灵大于必要攻灵，可以开战
													$('<span>'+get_time()+'攻灵充足:)...开打...</span><br />').appendTo($('.log_info'));
													setTimeout(function  () {
														att_club(battle_id);
														$('<span>'+get_time()+'已经攻击完毕！正在清除交涉页面...</span><br />').appendTo($('.log_info'));
														setTimeout(function  () {
															clear_club_wander();

															//=======>继续爬<=======
															setTimeout(function  () {
																set_leader(woman_leader);
																$('<span>'+get_time()+'正在更换女忍为队长...</span><br />').appendTo($('.log_info'));
																$('<span>'+get_time()+'即将进行下一轮探索...</span><br />').appendTo($('.log_info'));
																clock = setTimeout(function  () {
																	$.ajax(setting);
																},5000);
															},3000);
														},3000);
													},3000);

												}else{//需要回灵或喝水
													if ($('#is_water').is(":checked")) {//选中喝水了,检测喝水线
														if (f.user.offense_guts <= cfg_lowest_gut) {
															setTimeout(function  () {//喝水
																use_goods(5);
																$('<span>'+get_time()+'攻灵不足,允许喝水。喝掉 _1_ 灵水...</span><br />').appendTo($('.log_info'));
																
																setTimeout(function  () {
																	$.ajax(setting1);
																	$('<span>'+get_time()+'即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																},2500);
															},2500);
														}else{//当前攻灵大于所设置的最低喝水线，不能喝水，需要回灵
															$('<span>'+get_time()+'未达到喝水线,不喝。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
															count_time("tower",5*60);

															setTimeout(function() {
																$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																$.ajax(setting1);
															},5*60*1000+5000);
														}
													}else{//没选中喝水，即回灵
														$('<span>'+get_time()+'攻灵不够:(且禁止喝水。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
														count_time("tower",5*60);

														setTimeout(function() {
															$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
															$.ajax(setting1);
														},5*60*1000+5000);
													}
												};
											},
											error:function  () {
												setTimeout(function() {
													$.ajax(setting1);
												},2000);
											}
										}
										$.ajax(setting1);
									},15000);
								break;

								case "2":
									//打+收
									$('<span>'+get_time()+'【打+收】正在换组...</span><br />').appendTo($('.log_info'));
									setTimeout(function () {
										set_all_team(battle_id.slice(0, 5));
									},2000);
									setTimeout(function  () {
										var setting1 = {
											url: ZDurl+'?_c=monster&action=jsonlist&list_type=offense&order_by=attack-desc&_='+ timestamp,
											success:function(f){
												$('#tower_event_info').text('');
	                                            $('<span>'+get_time()+'正在检测攻灵:</span><br />').appendTo($('.log_info'));
												$('<span>'+get_time()+'当前攻灵值为:'+f.user.offense_guts+'</span><br />').appendTo($('.log_info'));
												$('<span>'+get_time()+'当前攻组必要攻灵值为:'+f.totalGuts+'</span><br />').appendTo($('.log_info'));
												
												if (f.user.offense_guts >= f.totalGuts) {//实时攻灵大于必要攻灵，可以开战
													$('<span>'+get_time()+'攻灵充足:)...开打...</span><br />').appendTo($('.log_info'));
													setTimeout(function  () {
														att_club(battle_id);
														$('<span>'+get_time()+'已经攻击完毕！正在收取...</span><br />').appendTo($('.log_info'));
														
														setTimeout(function  () {
															get_club_wander();//执行收取操作
															$('<span>'+get_time()+'已执行收取</span><br />').appendTo($('.log_info'));

															//=======>继续爬<=======先换女忍做队长
															setTimeout(function  () {
																set_leader(woman_leader);
																$('<span>'+get_time()+'正在更换女忍为队长...</span><br />').appendTo($('.log_info'));
                                                                $('<span>'+get_time()+'即将进行下一轮探索...</span><br />').appendTo($('.log_info'));
																clock = setTimeout(function  () {
																	$.ajax(setting);
																},5000);
															},3000);
														},3000);
													},3000);
												}else{//需要回灵或喝水
													if ($('#is_water').is(":checked")) {//选中喝水了,检测喝水线
														if (f.user.offense_guts <= cfg_lowest_gut) {
															setTimeout(function  () {//喝水
																use_goods(5);
																$('<span>'+get_time()+'攻灵不足,允许喝水。喝掉 _1_ 灵水...</span><br />').appendTo($('.log_info'));
																
																setTimeout(function  () {
																	$.ajax(setting1);
																	$('<span>'+get_time()+'即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																},2500);
															},2500);
														}else{//当前攻灵大于所设置的最低喝水线，不能喝水，需要回灵
															$('<span>'+get_time()+'未达到喝水线,不喝。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
															count_time("tower",5*60);

															setTimeout(function() {
																$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
																$.ajax(setting1);
															},5*60*1000+5000);
														}
													}else{//没选中喝水，即回灵
														$('<span>'+get_time()+'攻灵不够:(且禁止喝水。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
														count_time("tower",5*60);

														setTimeout(function() {
															$('<span>'+get_time()+'回灵完毕,即将重新检测攻灵...</span><br />').appendTo($('.log_info'));
															$.ajax(setting1);
														},5*60*1000+5000);
													}
												};
											},
											error:function  () {
												setTimeout(function() {
													$.ajax(setting1);
												},2000);
											}
										}
										$.ajax(setting1);
									},15000);
								break;

								case "3":
									//不打，直接放走
									$('<span>'+get_time()+'【不打】绕开这货...直接进行下一轮探索</span><br />').appendTo($('.log_info'));
									setTimeout(function  () {
										$.ajax(setting);
									},2500);
								break;
							}
						break;

						case "NO_ENOUGH_ENERGY":
							$('#tower_event_info').text('');
							$('<span>没体力了！</span><br />').appendTo($('#tower_event_info'));
							$('<span>自动爬塔已暂停！检测吃不吃丸子...</span><br />').appendTo($('#tower_event_info'));
							if ($('#is_ball').is(":checked")) {//选中了吃丸子
								setTimeout(function  () {
									use_goods(4);
									$('<span>'+get_time()+'吃掉 _1_ 丸子...</span><br />').appendTo($('.log_info'));
									$('<span>'+get_time()+'立即开启新一轮探索...</span><br />').appendTo($('.log_info'));
									setTimeout(function  () {
										$.ajax(setting);
									},2500);
								},2500);
							}else{//没选中吃丸子，即回灵。每隔?分钟重新探索一次
								$('<span>'+get_time()+'不吃。开始回灵倒计时...</span><br />').appendTo($('.log_info'));
								count_time("tower",cfg_recover_time_energy*60);
								clock = setTimeout(function() {
									$('<span>'+get_time()+'尝试新一轮探索...</span><br />').appendTo($('.log_info'));
									$.ajax(setting);
								},cfg_recover_time_energy*60*1000+5000);
							}
						break;
					}
			    break;
				}

			$("#show_en").text(e.user.energy);
			$("#info_energy").text(e.user.energy);
			$("#auto_progress").show();
			$("#bar").css({width: e.user.exp_percentage+'%'});
			log10 ();
		},
		error:function  () {
			clock = setTimeout(function() {
				$.ajax(setting);
			},3000);
		}
	}
	$.ajax(setting);
});

$("#att_noget").click(function() {
	$(".club_list").val(1);
});
$("#att_get").click(function() {
	$(".club_list").val(2);
});
$("#noatt").click(function() {
	$(".club_list").val(3);
});
