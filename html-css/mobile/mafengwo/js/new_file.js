(function(b) {
	var f = {
		init: function() {
			this.landingInit();
			this.seckillInit();
			this.suggestInit();
			this.browserDetectiveInit();
			this.appDownloadInit();
			this.lazyLoadInit()
		},
		isInViewport: function(a) {
			if (!a || 1 !== a.nodeType) return !1;
			a = a.getBoundingClientRect();
			return 0 > a.bottom ? !1 : a.top < Math.max(window.innerHeight, document.documentElement.clientHeight)
		},
		images: function(a) {
			var b = new Image,
				e = a.attr("imgsrc");
			b.onload = function() {
				!0 == b.complete && (a.attr("src", e), a.removeClass("lazy"), a.removeAttr("imgsrc"))
			};
			b.src =
				e
		},
		browserDetectiveInit: function() {
			var a = navigator.userAgent;
			this.browser = {
				versions: {
					trident: -1 < a.indexOf("Trident"),
					presto: -1 < a.indexOf("Presto"),
					webKit: -1 < a.indexOf("AppleWebKit"),
					gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
					mobile: !!a.match(/AppleWebKit.*Mobile.*/),
					ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
					android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
					iPhone: -1 < a.indexOf("iPhone"),
					iPad: -1 < a.indexOf("iPad"),
					webApp: -1 == a.indexOf("Safari"),
					uc: !!a.match(/UCBrowser/)
				},
				language: (navigator.browserLanguage ||
					navigator.language).toLowerCase()
			}
		},
		landingInit: function() {
			b(".landing").on("touchmove", function(a) {
				0 < b(a.target).parents("#landing").length && a.preventDefault()
			}, !1)
		},
		appDownloadInit: function() {
			var a = this;
			b(".landing .top span").on("click", function() {
				a.appDownload(window.landingUrlConfig)
			});
			b(".landing-app-download").on("click", function() {
				a.appDownload(window.landingAppUrlConfig)
			});
			b("#closeLanding").on("click", function() {
				b(".landing").remove();
				a.tempClose("landing")
			});
			b(".app-download-wrapper").find(".full").each(function(c,
				e) {
				b(this).on("click", function() {
					a.appDownload(window.appUrlConfig[0])
				})
			});
			b(".app-download-wrapper").find(".half").each(function(c, e) {
				b(this).on("click", function() {
					a.appDownload(window.appUrlConfig[c % 2])
				})
			});
			b(".close-app-download").on("click", function() {
				b(this).parent().remove();
				a.tempClose(b(this).parent().data("pos"))
			})
		},
		openApp: function(a, b) {
			var e = Date.now(),
				d = document.createElement("IFRAME");
			d.src = a;
			d.style.position = "absolute";
			d.style.left = "-1000px";
			d.style.top = "-1000px";
			d.style.width = "1px";
			d.style.height = "1px";
			d.style.webkitTransition = "all 2s";
			document.body.appendChild(d);
			setTimeout(function() {
				d.addEventListener("webkitTransitionEnd", function() {
					document.body.removeChild(d);
					3E3 > Date.now() - e && "function" === typeof b && b()
				}, !1);
				d.style.left = "-10px"
			}, 0)
		},
		appDownload: function(a) {
			var b = this;
			!a.app_url && (a.app_url = "dangdang://");
			this.openApp(a.app_url, function() {
				b.browser.versions.android ? location.href = a.android_url : b.browser.versions.ios && (location.href = a.iphone_url)
			})
		},
		slideInit: function(a) {
			var b =
				this;
			a.on("scrollStart", function() {
				window.clearInterval(a.timer);
				a.timer = setInterval(function() {
					a.directionX = 1;
					b.slidePic(a)
				}, 5E3)
			});
			a.on("scrollEnd", function() {
				b.slidePic(this)
			});
			b.slideRun(a)
		},
		slidePic: function(a) {
			0 != a.directionX && (a.pageNum += a.directionX, a.pageNum >= a.pageSize ? a.pageNum = 0 : 0 > a.pageNum && (a.pageNum = a.pageSize - 1), a.scrollToElement(b(a.scroller).find("li").eq(a.pageNum)[0], 300), b(a.wrapper).find(".on").removeClass("on"), b(a.wrapper).find(".dot").eq(a.pageNum).addClass("on"), a.directionX =
				0)
		},
		slideRun: function(a) {
			var b = this;
			a.timer = setInterval(function() {
				a.directionX = 1;
				b.slidePic(a)
			}, 5E3)
		},
		topSliderInit: function() {
			if (0 < b(".J_top_slider").length) {
				var a = new IScroll(".J_top_slider", {
					scrollX: !0,
					scrollY: !1,
					snap: !1,
					momentum: !1,
					click: !1,
					eventPassthrough: !0,
					preventDefault: !0
				});
				a.pageNum = 0;
				a.pageSize = b(".J_top_slider li").length;
				this.slideInit(a)
			}
		},
		bannerSliderInit: function() {
			var a = this;
			b(".J_banner_slider").each(function() {
				var c = b(this)[0].id,
					c = new IScroll("#" + c, {
						scrollX: !0,
						scrollY: !1,
						snap: !1,
						momentum: !1,
						click: !1,
						eventPassthrough: !0,
						preventDefault: !0
					});
				c.pageNum = 0;
				c.pageSize = b(this).find("li").length;
				a.slideInit(c)
			})
		},
		suggestInit: function() {
			this.suggest = new Suggest({
				ajaxUrl: index_url + "h5ajax.php",
				defaultVal: b("#keyword").attr("placeholder"),
				formEl: "#index_search_form",
				wrapEl: ".search_list"
			})
		},
		seckillInit: function() {
			this.seckill = (new Countdown({
				target: "[data-widget='countdown']",
				endTime: b("[data-widget='countdown']").data("end-time"),
				leftTime: b("[data-widget='countdown']").data("left-time"),
				el_hour: "[data-countdown-role='hour']",
				el_min: "[data-countdown-role='min']",
				el_sec: "[data-countdown-role='sec']",
				speed: 1
			})).start()
		},
		lazyLoadInit: function() {
			window.rec_last_page = 0;
			var a = this;
			b(".lazy").each(function() {
				a.isInViewport(this) && a.images(b(this))
			});
			window.onscroll = function() {
				f.goTop();
				b(".lazy").each(function() {
					a.images(b(this))
				});
				0 == b(".rec-prds").length && !0 != b(".rec-prds-wrapper").data("lazyLoad") && b(window).scrollTop() + window.innerHeight > b(".rec-prds-wrapper").offset().top - 150 && (b(".rec-prds-wrapper").data("lazyLoad", !0), a.recPrdsInit())
			}
		},
		recPrdsInit: function() {
			this.recPrdsWrapperTpl = '<h2 class="title">\u63a8\u5e7f\u5546\u54c1</h2><div class="rec-prds"><ul></ul></div>';
			this.recPrdsTpl = ['<li data-page-nubmer="<%= pageNum %>" >\n<a href="<%= callback_url %>">', '<img class="lazy" src="' + window.proxyAssets + '/coreimages/bg_pic.png" imgsrc="<%= image_url %>" alt="">', '<div class="rec-prds-detail">\n<p class="rec-prds-name"><%= name%></p>\n<p class="price">\n    <span class="rob">\n        <span class="sign">&yen;</span>\n        <span class="num"><%=price%></span>\n        <span class="tail"></span>\n    </span>\n</p>\n</div>\n</a>\n</li>'].join("\n");
			var a = this,
				c = b("html").css("font-size").replace("px", "");
			window.rec_prds = {
				pageSize: 4,
				currentPageNum: 1,
				maxPageNum: 1,
				liWidth: 5.25 * c,
				pageWidth: 21 * c
			};
			window.recUnlock = !0;
			this.loadRecPrds(1, window.rec_prds.pageSize);
			setTimeout(function() {
				a.loadRecPrds(2, window.rec_prds.pageSize)
			}, 300)
		},
		recPrdsScroller: function() {
			var a = this;
			window.rec_prds_scroller = new IScroll(".rec-prds", {
				scrollX: !0,
				scrollY: !1,
				snap: !1,
				momentum: !0,
				deceleration: 0.005,
				click: !1,
				eventPassthrough: !0,
				preventDefault: !0,
				useTransition: !1,
				disableMouse: !0,
				disablePointer: !0
			});
			rec_prds_scroller.on("scrollEnd", function() {
				rec_prds.currentPage = Math.ceil(this.x / -rec_prds.pageWidth) + 1;
				this.x > this.startX ? (!0 == b('.rec-prds li[data-page-nubmer="' + rec_prds.currentPage + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage, rec_prds.pageSize, "destroyed"), 1 != rec_prds.currentPage && 0 == b('[data-page-nubmer="' + (rec_prds.currentPage - 1) + '"]').length && a.loadRecPrds(rec_prds.currentPage - 1, rec_prds.pageSize, "destroyed"), !0 == b('.rec-prds li[data-page-nubmer="' + (rec_prds.currentPage -
					1) + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage - 1, rec_prds.pageSize, "destroyed"), !0 == b('.rec-prds li[data-page-nubmer="' + (rec_prds.currentPage - 2) + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage - 2, rec_prds.pageSize, "destroyed"), !0 == b('.rec-prds li[data-page-nubmer="' + (rec_prds.currentPage - 3) + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage - 3, rec_prds.pageSize, "destroyed")) : (0 == b('[data-page-nubmer="' + (rec_prds.currentPage + 1) + '"]').length && a.moreRecPrds(rec_prds.currentPage +
					1, rec_prds.pageSize), !0 == b('.rec-prds li[data-page-nubmer="' + rec_prds.currentPage + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage, rec_prds.pageSize, "destroyed"), 1 != rec_prds.currentPage && 0 == b('[data-page-nubmer="' + (rec_prds.currentPage - 1) + '"]').length && a.loadRecPrds(rec_prds.currentPage - 1, rec_prds.pageSize, "insert"), b('[data-page-nubmer="' + (rec_prds.currentPage - 4) + '"]').html("").data("destroyed", !0), !0 == b('.rec-prds li[data-page-nubmer="' + rec_prds.currentPage + '"]').data("destroyed") && a.loadRecPrds(rec_prds.currentPage,
					rec_prds.pageSize, "destroyed"))
			})
		},
		loadRecPrds: function(a, c, e) {
			var d = this,
				f = "";
			window.recUnlock && (window.recUnlock = !1, b.ajax({
				type: "POST",
				url: index_url + "h5ajax.php",
				data: {
					action: "ad_cpc",
					page: a,
					pagesize: c,
					lastpage: window.rec_last_page
				},
				dataType: "json",
				success: function(g) {
					if (0 == g.errorCode) {
						window.rec_last_page = g.lastpage || window.rec_last_page;
						0 == b(".rec-prds").length && 0 < g.products.length && b(".rec-prds-wrapper").html(d.recPrdsWrapperTpl);
						if (1 < a && g.products.length < c) {
							window.recUnlock = !0;
							return
						}
						_.each(g.products,
							function(b, c, e) {
								b.pageNum = a;
								f += _.template(d.recPrdsTpl)(b)
							});
						e ? "destroyed" == e ? (g = b(".rec-prds ul").find("[data-page-nubmer='" + a + "']"), g.not(g.eq(0)).remove(), g = b(".rec-prds ul").find("[data-page-nubmer='" + a + "']"), g.replaceWith(f)) : "insert" == e && (g = b(".rec-prds ul").find("[data-page-nubmer='" + (a + 1) + "']"), b(f).insertBefore(g.eq(0))) : (b(".rec-prds ul").width(parseFloat(b(".rec-prds ul").css("width").replace("px", "")) + window.rec_prds.pageWidth), b(".rec-prds ul").append(f), setTimeout(function() {
								window.rec_prds_scroller.refresh()
							},
							200), b(".rec-prds ul li").length == c && d.recPrdsScroller());
						b(".lazy").each(function() {
							d.images(b(this))
						})
					}
					window.recUnlock = !0
				},
				error: function(a, b, c) {
					console.log(c);
					window.recUnlock = !0
				}
			}))
		},
		moreRecPrds: function(a, b) {
			this.loadRecPrds(a, b)
		},
		tempClose: function(a) {
			var b = new Date;
			b.setDate(b.getDate() + 1);
			b.setHours(0);
			b.setMinutes(0);
			b.setSeconds(0);
			str = "MDD_temp_close_" + a + "=1; expires=" + b.toGMTString();
			document.cookie = str
		},
		fontSizeInit: function() {
			var a = document.documentElement,
				b = a.clientWidth;
			b && (b /= 320,
				2 < b && (b = 2), a.style.fontSize = 20 * b + "px")
		},
		goTop: function() {
			var a = document.body.scrollTop || document.documentElement.scrollTop,
				c = b(window).height(),
				e = b(".fixed_box"),
				d = b(".top")[0];
			a > c ? e.show() : e.hide();
			this.isInViewport(d) && e.hide()
		}
	};
	b(document).ready(function() {
		f.fontSizeInit();
		FastClick.attach(document.body);
		f.init();
		window.submit_search = function() {
			"" == b("#keyword").val() && b("#keyword").val(b("#keyword").attr("placeholder"));
			return !0
		}
	});
	window.onresize = function() {
		f.fontSizeInit()
	};
	window.onload = function() {
		f.topSliderInit();
		f.bannerSliderInit()
	}
})(Zepto);