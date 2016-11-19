(function($){
	$.fn.zslider = function(options){
		
		var settings = $.extend({
			imgRatio: 1.333333334
		});
		
		$(this).addClass('_loading');
		zSliderWrap = $(this);
		zSliderUL = $(this).find('ul');
		zSliderDireButn = $(this).find('a.butn-dir');
		zSliderDireButnPrev = $(this).find('a.butn-dir._prev');
		zSliderDireButnNext = $(this).find('a.butn-dir._next');
		
		
		
		function init(){ //Initialization start
			zSliderUL.css({left: 0});
			sliderWidthZS = $(this).innerWidth();
			sliderWidthOuterZS = 0;
			slideLengthZS = 0;
			
			zSliderWrap.find('li').each(function() {
				$(this).css({
					maxWidth: Math.round(sliderWidthZS*0.8), 
					maxHeight: Math.round((sliderWidthZS*0.8)*0.75)
				});
			});
			
			if(sliderWidthZS >= 768){
				zSliderWrap.find('li:nth-child(2n+1)').each(function() {
					sliderWidthOuterZS += $(this).width();
					
					if(slideLengthZS + $(this).outerWidth() <= sliderWidthZS)
						slideLengthZS += $(this).outerWidth();
				});
			}else{
				zSliderWrap.find('li').each(function() {
					sliderWidthOuterZS += $(this).width();
					
					if(slideLengthZS + $(this).outerWidth() <= sliderWidthZS){
						slideLengthZS += $(this).outerWidth();
					}
				});
			}
			
			
			maxSlideLengthZS = sliderWidthOuterZS-sliderWidthZS;
			
			
			
			zSliderDireButnPrev.addClass('_off');
			
		}//Initialization End
		
		
		init();
		$(this).removeClass('_loading');
		
		zSliderDireButn.click(function() {
			
			if($(this).hasClass('_prev') && parseInt(zSliderUL.css('left')) < 0){
				finSlideLength = parseInt(zSliderUL.css('left')) + slideLengthZS;
				if(finSlideLength > 0)
					finSlideLength = 0;
			}
			
			else if($(this).hasClass('_next') && parseInt(zSliderUL.css('left')) > maxSlideLengthZS*-1){
				finSlideLength = parseInt(zSliderUL.css('left')) - slideLengthZS;
				if(finSlideLength < maxSlideLengthZS*-1)
					finSlideLength = maxSlideLengthZS*-1;	
			}else{
				finSlideLength = 0;
			}
			
			
			if(finSlideLength == 0){
				zSliderDireButnPrev.addClass('_off');
				zSliderDireButnNext.removeClass('_off');
			}else if(finSlideLength == maxSlideLengthZS*-1){
				zSliderDireButnNext.addClass('_off');
				zSliderDireButnPrev.removeClass('_off');
			}else{
				zSliderDireButn.removeClass('_off');
			}
			
			zSliderUL.css('left', finSlideLength);	
			
        });
		
		
		zSliderWrap.swipe({
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				
				var finSlideLength = 0;
	
				switch(direction){
					
					case "left":
						finSlideLength = parseInt(zSliderUL.css('left')) - slideLengthZS;
						if(finSlideLength < maxSlideLengthZS*-1)
							finSlideLength = maxSlideLengthZS*-1;	
						break;
					
					case "right":
						finSlideLength = parseInt(zSliderUL.css('left')) + slideLengthZS;
						if(finSlideLength > 0)
							finSlideLength = 0;
						break;
					
					default:
						
				}
				
				if(finSlideLength == 0){
					zSliderDireButnPrev.addClass('_off');
					zSliderDireButnNext.removeClass('_off');
				}else if(finSlideLength == maxSlideLengthZS*-1){
					zSliderDireButnNext.addClass('_off');
					zSliderDireButnPrev.removeClass('_off');
				}else{
					zSliderDireButn.removeClass('_off');
				}
				
				zSliderUL.css('left', finSlideLength);	
				
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:50,
			allowPageScroll:"auto"
		});
		
		
		
		$(window).resize(init);
		
		
		
		return this;
	};
}(jQuery));


$(function(){
	$('.z-slider-wrap .fancybox').fancybox({
		padding: 0, 
		maxHeight: $(window).height()*0.75, 
		type: 'image',
		helpers: {
			title : {
				type : 'outside'
			}
		},
		afterShow : function(){
			$(".fancybox-wrap").addClass("zs-fancybox");
			zsFancyboxSwipe();
		}
	});
	
	function zsFancyboxSwipe(){
		$('.zs-fancybox').swipe({ //for fancybox galery sliding
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if($.fancybox.isOpen){
				switch(direction){
					case "left":
						$('.fancybox-nav.fancybox-next').trigger('click');
						break;
					case "right":
						$('.fancybox-nav.fancybox-prev').trigger('click');
						break;
					default:

					}				
				}
			},
			threshold:100
		});
	}
	
});