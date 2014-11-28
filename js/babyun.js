var Babyun = Babyun || {};
Babyun.index = (function($){
	var indexSlider = function(opt){
		var defaults = {
			box:".slider",
			item:"li",
			prev:".prev",
			next:".next",
			sbtn:".sbtn",
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
		}
	};

	return {
		init:function(){
			indexSlider({
				box:"#indexSlider",
				auto:true
			});
		}
	}
})(jQuery);