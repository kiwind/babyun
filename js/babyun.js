var Babyun = Babyun || {};
Babyun.index = (function($){
	var indexSlider = function(opt){
		var defaults = {
			box:".slider",
			item:"li",
			prev:".prev",
			next:".next",
			sbtn:".s-btn",
			sbtnEl:"a",
			auto:false,
			delay:4000
		}

		var _opt = $.extend({}, defaults, opt );

		var _box = $(_opt.box),
			_items = _box.find(_opt.item),
			_prev = _box.find(_opt.prev),
			_next = _box.find(_opt.next),
			_sbtn = _box.find(_opt.sbtn),
			_sbtns = _sbtn.find(_opt.sbtnEl),
			_timer,
			_len = _items.length,
			_index = 0;

		initItems();
		bind();
		if(opt.auto)
		{
			_timer = setInterval(onTimer,_opt.delay);
		}

		function bind(){
			_prev.on("click",function(){
				_index--;
				if(_index < 0)
				{
					_index = _len - 1;
				}
				show(_index);
			});

			_next.on("click",function(){
				_index++;
				if(_index > _len - 1)
				{
					_index = 0;
				}
				show(_index);
			});

			_sbtns.on("click",function(){
				_index = $(this).index();
				show(_index);
			});

			_box.on({
				mouseenter:function(){
					clearInterval(_timer);
				},
				mouseleave:function(){
					_timer = setInterval(onTimer,_opt.delay);
				}
			});
		}

		function onTimer(){
			_index++;
			if(_index > _len - 1)
			{
				_index = 0;
			}
			show(_index);
		}

		function initItems(){
			_items.each(function(index){
				$(this).css("background","url("+$(this).attr("data-img")+") no-repeat 50% 0");
			});
			_items.eq(0).show();
			_box.removeClass("loading");
		}

		function show(index)
		{
			_items.eq(index).fadeIn(1000).siblings().fadeOut(1000);
			_sbtns.eq(index).addClass("cur").siblings().removeClass("cur");
		}
	};

	var pserviceSlider = function(){
		 $("#pserviceSlider").owlCarousel({
		 	items:4,
		 	navigation:true,
		 	navigationText:false
		 });
	};

	var newsSlider = function(){
		var _box = $("#newsSlider"),
			_prev = _box.find(".prev"),
			_next = _box.find(".next"),
			_list = _box.find("ul"),
			_index = 0,
			_step = 657;
			_len = Math.round(_list.find("li").length / 2);

		_prev.on("click",function(){
			_index--;
			if(_index < 0)
			{
				_index = 0;
				return;
			}
			_list.animate({marginLeft: -_index * _step});
		});

		_next.on("click",function(){
			_index++;
			if(_index > _len - 1)
			{
				_index = _len - 1;
			}
			_list.animate({marginLeft: -_index * _step});
		});
	}

	return {
		init:function(){
			indexSlider({
				box:"#indexSlider",
				auto:true
			});
			pserviceSlider();
			Babyun.widget("Tab",{
				tabBox:"#indexClient",
				tabBtn:".c-tab",
				tabBoxClass:".c-item",
				tabType:"mouseover"
			});
			newsSlider();
		}
	}
})(jQuery);

Babyun.news = (function($){
	var imgSlider = function(){
		var _box = $("#newsSlider"),
			_showImg = _box.find(".showimg").find("img"),
			_prev = _box.find(".prev"),
			_next = _box.find(".next"),
			_thumbs = _box.find(".thumbs").find("ul"),
			_thumbItems = _thumbs.find("li"),
			_len = _thumbItems.length - 3,
			_index = 0,
			_step = 160;

		_thumbItems.on("click",function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			_showImg.attr("src",$(this).data("img"));
		});

		_prev.on("click",function(){
			_index--;
			if(_index < 0)
			{
				_index = 0;
				return;
			}
			_thumbs.animate({marginLeft:-_index * _step});
		});

		_next.on("click",function(){
			_index++;
			if(_index > _len)
			{
				_index = _len;
				return;
			}
			_thumbs.animate({marginLeft:-_index * _step});
		});
	}

	var hotNewsSlider = function(){
		var _box = $("#hotNews"),
			_prev = _box.find(".prev"),
			_next = _box.find(".next"),
			_list = _box.find(".ht-list"),
			_index = 0,
			_len = _list.length;

		_prev.on("click",function(){
			_index--;
			if(_index < 0)
			{
				_index = _len - 1;
			}
			_list.eq(_index).fadeIn().siblings().fadeOut();
		});

		_next.on("click",function(){
			_index++;
			if(_index > _len - 1)
			{
				_index = 0;
			}
			_list.eq(_index).fadeIn().siblings().fadeOut();
		});
	}

	return {
		init:function(){
			imgSlider();
			hotNewsSlider();
		}
	}
})(jQuery);