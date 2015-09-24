(function(c) {
	c.Zebra_Dialog = function(g, p) {
		var u = {
			animation_speed_hide: 250,
			animation_speed_show: 0,
			auto_close: !1,
			buttons: !0,
			center_buttons: !1,
			custom_class: !1,
			keyboard: !0,
			max_height: 0,
			message: "",
			modal: !0,
			overlay_close: !0,
			overlay_opacity: ".9",
			position: "center",
			reposition_speed: 500,
			show_close_button: !0,
			source: !1,
			title: "",
			type: "information",
			vcenter_short_message: !0,
			width: 0,
			onClose: null
		}, a = this,
			k = {}, q;
		a.settings = {};
		"string" == typeof g && (k.message = g);
		if ("object" == typeof g || "object" == typeof p) k = c.extend(k, "object" == typeof g ? g : p);
		a.init = function() {
			var d;
			a.settings = c.extend({}, u, k);
			a.isIE6 = "explorer" == m.name && 6 == m.version || !1;
			a.settings.modal && (a.overlay = jQuery("<div>", {
				"class": "ZebraDialogOverlay"
			}).css({
				position: a.isIE6 ? "absolute" : "fixed",
				left: 0,
				top: 0,
				opacity: a.settings.overlay_opacity
			}), a.settings.overlay_close && a.overlay.bind("click", function() {
				a.close()
			}), a.overlay.appendTo("body"));
			a.dialog = jQuery("<div>", {
				"class": "ZebraDialog" + (a.settings.custom_class ? " " + a.settings.custom_class : "")
			}).css({
				position: a.isIE6 ? "absolute" : "fixed",
				left: 0,
				top: 0,
				visibility: "hidden"
			});
			!a.settings.buttons && a.settings.auto_close && a.dialog.attr("id", "ZebraDialog_" + Math.floor(9999999 * Math.random()));
			var b = parseInt(a.settings.width, 10);
			!isNaN(b) && b == a.settings.width && b.toString() == a.settings.width.toString() && 0 < b && a.dialog.css({
				width: a.settings.width
			});
			a.settings.title && (d = jQuery("<h3>", {
				"class": "ZebraDialog_Title"
			}).html(a.settings.title).appendTo(a.dialog));
			if (!0 === a.settings.buttons || c.isArray(a.settings.buttons)) {
				if (!0 === a.settings.buttons) switch (a.settings.type) {
					case "question":
						a.settings.buttons = ["Yes", "No"];
						break;
					default:
						a.settings.buttons = ["Ok"]
				}
				b = a.settings.buttons
			} else b = !1;
			var h = jQuery("<div>", {
				"class": "ZebraDialog_BodyOuter" + (a.settings.title ? "" : " ZebraDialog_NoTitle") + (b ? "" : " ZebraDialog_NoButtons")
			}).appendTo(a.dialog);
			a.message = jQuery("<div>", {
				"class": "ZebraDialog_Body" + ("" !== r() ? " ZebraDialog_Icon ZebraDialog_" + r() : "")
			});
			0 < a.settings.max_height && (a.message.css("max-height", a.settings.max_height), a.isIE6 && a.message.attr("style", "height: expression(this.scrollHeight > " + a.settings.max_height + ' ? "' + a.settings.max_height + 'px" : "85px")'));
			a.settings.vcenter_short_message ? jQuery("<div>").html(a.settings.message).appendTo(a.message) : a.message.html(a.settings.message);
			if (a.settings.source && "object" == typeof a.settings.source) {
				var f = a.settings.vcenter_short_message ? c("div:first", a.message) : a.message,
					e;
				for (e in a.settings.source) switch (e) {
					case "ajax":
						var l = "string" == typeof a.settings.source[e] ? {
							url: a.settings.source[e]
						} : a.settings.source[e],
							g = jQuery("<div>").attr("class", "ZebraDialog_Preloader").appendTo(f);
						l.success = function(a) {
							g.remove();
							f.append(a);
							n(!1)
						};
						c.ajax(l);
						break;
					case "iframe":
						l = c.extend({
							width: "100%",
							height: "100%",
							marginheight: "0",
							marginwidth: "0",
							frameborder: "0"
						}, "string" == typeof a.settings.source[e] ? {
							src: a.settings.source[e]
						} : a.settings.source[e]);
						f.append(jQuery("<iframe>").attr(l));
						break;
					case "inline":
						f.append(a.settings.source[e])
				}
			}
			a.message.appendTo(h);
			if (b) {
				b.reverse();
				var s = jQuery("<div>", {
					"class": "ZebraDialog_Buttons"
				}).appendTo(a.dialog);
				c.each(b, function(b, d) {
					var e = jQuery("<a>", {
						href: "javascript:void(0)",
						"class": "ZebraDialog_Button_" + b
					});
					c.isPlainObject(d) ? e.html(d.caption) : e.html(d);
					e.bind("click", function() {
						var b = !0;
						void 0 !== d.callback && (b = d.callback(a.dialog));
						!1 !== b && a.close(void 0 !== d.caption ? d.caption : d)
					});
					e.appendTo(s)
				});
				s.wrap(c("<div>").addClass("ZebraDialog_ButtonsOuter" + (a.settings.center_buttons ? " ZebraDialog_Buttons_Centered" : "")))
			}
			a.dialog.appendTo("body");
			a.settings.show_close_button && (e = c('<a href="javascript:void(0)" class="ZebraDialog_Close">&times;</a>').bind("click", function(b) {
				b.preventDefault();
				a.close()
			}).appendTo(d ? d : a.message), d && e.css({
				right: parseInt(d.css("paddingRight"), 10),
				top: (parseInt(d.css("height"), 10) + parseInt(d.css("paddingTop"), 10) + parseInt(d.css("paddingBottom"), 10) - e.height()) / 2
			}));
			c(window).bind("resize.Zebra_Dialog", function() {
				clearTimeout(q);
				q = setTimeout(function() {
					n()
				}, 100)
			});
			a.settings.keyboard && c(document).bind("keyup.Zebra_Dialog", function(b) {
				27 == b.which && a.close();
				return !0
			});
			a.isIE6 && c(window).bind("scroll.Zebra_Dialog", function() {
				t()
			});
			!1 !== a.settings.auto_close && (a.dialog.bind("click", function() {
				clearTimeout(a.timeout);
				a.close()
			}), a.timeout = setTimeout(a.close, a.settings.auto_close));
			n(!1);
			return a
		};
		a.close = function(d) {
			c(document).unbind(".Zebra_Dialog");
			c(window).unbind(".Zebra_Dialog");
			a.overlay && a.overlay.animate({
				opacity: 0
			}, a.settings.animation_speed_hide, function() {
				a.overlay.remove()
			});
			a.dialog.animate({
				top: 0,
				opacity: 0
			}, a.settings.animation_speed_hide, function() {
				a.dialog.remove();
				if (a.settings.onClose && "function" == typeof a.settings.onClose) a.settings.onClose(void 0 !== d ? d : "")
			})
		};
		var n = function(d) {
			var b = c(window).width(),
				h = c(window).height(),
				f = a.dialog.width(),
				e = a.dialog.height(),
				b = {
					left: 0,
					top: 0,
					right: b - f,
					bottom: h - e,
					center: (b - f) / 2,
					middle: (h - e) / 2
				};
			a.dialog_left = void 0;
			a.dialog_top = void 0;
			c.isArray(a.settings.position) && 2 == a.settings.position.length && "string" == typeof a.settings.position[0] && a.settings.position[0].match(/^(left|right|center)[\s0-9\+\-]*$/) && "string" == typeof a.settings.position[1] && a.settings.position[1].match(/^(top|bottom|middle)[\s0-9\+\-]*$/) && (a.settings.position[0] = a.settings.position[0].toLowerCase(), a.settings.position[1] = a.settings.position[1].toLowerCase(), c.each(b, function(b, d) {
				for (var c = 0; 2 > c; c++) {
					var e = a.settings.position[c].replace(b, d);
					e != a.settings.position[c] && (0 === c ? a.dialog_left = eval(e) : a.dialog_top = eval(e))
				}
			}));
			if (void 0 === a.dialog_left || void 0 === a.dialog_top) a.dialog_left = b.center, a.dialog_top = b.middle;
			a.settings.vcenter_short_message && (b = a.message.find("div:first"), h = b.height(), f = a.message.height(), h < f && b.css({
				"padding-top": 0
			}));
			"boolean" == typeof d && !1 === d || 0 === a.settings.reposition_speed ? a.dialog.css({
				left: a.dialog_left,
				top: a.dialog_top,
				visibility: "visible",
				opacity: 0
			}).animate({
				opacity: 1
			}, a.settings.animation_speed_show) : (a.dialog.stop(!0), a.dialog.css("visibility", "visible").animate({
				left: a.dialog_left,
				top: a.dialog_top
			}, a.settings.reposition_speed));
			a.dialog.find("a[class^=ZebraDialog_Button]:first").focus();
			a.isIE6 && setTimeout(t, 500)
		}, t = function() {
				var d = c(window).scrollTop(),
					b = c(window).scrollLeft();
				a.settings.modal && a.overlay.css({
					top: d,
					left: b
				});
				a.dialog.css({
					left: a.dialog_left + b,
					top: a.dialog_top + d
				})
			}, r = function() {
				switch (a.settings.type) {
					case "confirmation":
					case "error":
					case "information":
					case "question":
					case "warning":
						return a.settings.type.charAt(0).toUpperCase() + a.settings.type.slice(1).toLowerCase();
					default:
						return !1
				}
			}, m = {
				init: function() {
					this.name = this.searchString(this.dataBrowser) || "";
					this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || ""
				},
				searchString: function(a) {
					for (var b = 0; b < a.length; b++) {
						var c = a[b].string,
							f = a[b].prop;
						this.versionSearchString = a[b].versionSearch || a[b].identity;
						if (c) {
							if (-1 != c.indexOf(a[b].subString)) return a[b].identity
						} else if (f) return a[b].identity
					}
				},
				searchVersion: function(a) {
					var b = a.indexOf(this.versionSearchString);
					if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
				},
				dataBrowser: [{
					string: navigator.userAgent,
					subString: "MSIE",
					identity: "explorer",
					versionSearch: "MSIE"
				}]
			};
		m.init();
		return a.init()
	}
})(jQuery);