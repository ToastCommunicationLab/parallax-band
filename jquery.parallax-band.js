/*
	jQuery parallax band plugin - giving depth to outstanding titles since 2014.
	Copyright (c) 2014 Roman Steiner <roman@toastlab.ch>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
 */

(function($) {
	function makeband(top, left, bandcolor, edgecolor, hInset, vOffset, height) {
		var $b = $('<span>'); 
		var $child = $('<span>');
		
		$b.css({
			width: 0,
			height: 0,
			position: 'absolute',
			background: bandcolor,
			visibility: 'hidden'
		});
		
		$child.css({
			display: 'block',
		    width: '9999px',
		    position: 'absolute',
		    height: height + 'px',
		    background: bandcolor
		});
		
		if(left) {
			$b.css({
				borderLeft: hInset + 'px solid transparent',
				borderRight: '0px solid transparent',
				left: 0
			});
			$child.css({
				right: hInset + 'px',
			});
		} else {
			$b.css({
				borderLeft: '0px solid transparent',
				borderRight: hInset + 'px solid transparent',
				right: 0
			});
			$child.css({
				left: hInset + 'px',
			});
		}
		
		if(!top) {
			$b.css({
				top: height + 'px',
				borderTop: (vOffset) + 'px solid ' + edgecolor
			});
			$b.attr({
				'data-center': 'border-top-width:' + (0) +'px',
				'data-top': 'border-top-width:' + (vOffset) +'px'
			});
			$child.css({
				top: (-height) + 'px'
			});
		} else {
			$b.css({
				borderBottom: (vOffset) + 'px solid ' + edgecolor,
				bottom: height + 'px'
			});
			$b.attr({
				'data-center': 'border-bottom-width:' + (0) +'px',
				'data-bottom': 'border-bottom-width:' + (vOffset) +'px'
			});
			$child.css({
				top: '0px'
			});
		}
		
		$b.append($child);
		return $b;
	}
	
	$.fn.parallaxBand = function(options) {
		var defaults = { 
			bandcolor:'#cccccc',
			edgecolor:'#999999',
			forecolor:'#E4E4E4',
			vOffset: 40,
			hInset: 30,
			height: 80
		};
		
		options = $.extend({}, defaults, options); 
		
		var bandcolor = options.bandcolor,
			edgecolor = options.edgecolor,
			forecolor = options.forecolor,
			vOffset = options.vOffset,
			hInset = options.hInset,
			height = options.height;
			
		this.each(function() {
			var $this = $(this);
			var $wrapper = $('<div>');
			var $inner = $('<span>');
			
			$wrapper.css({
				marginTop: -vOffset + 'px',
				paddingTop: vOffset + 'px',
				overflow: 'hidden'
			});
			$inner.css({
				display: 'inline-block',
				top: -vOffset + 'px',
				position: 'relative',
				lineHeight: height + 'px',
				padding: '0 20px',
				background: forecolor,
				verticalAlign: 'middle'
			});
			$inner.attr({
				'data-bottom': 'top:' + (vOffset) +'px',
				'data-top': 'top:' + (-vOffset) +'px'
			});
			var $upper_before = makeband(false, true, bandcolor, edgecolor, hInset, vOffset, height);
			var $upper_after = makeband(false, false, bandcolor, edgecolor, hInset, vOffset, height);
			
			var $lower_before = makeband(true, true, bandcolor, edgecolor, hInset, vOffset, height);
			var $lower_after = makeband(true, false, bandcolor, edgecolor, hInset, vOffset, height);
			
			var update = function() {
				var st = $(window).scrollTop() + $(window).innerHeight() / 2;
				var it = $inner.position().top + height / 2;
				if(st > it) {
					$upper_before.css('visibility', 'visible');
					$upper_after.css('visibility', 'visible');
					$lower_before.css('visibility', 'hidden');
					$lower_after.css('visibility', 'hidden');
				} else {
					$upper_before.css('visibility', 'hidden');
					$upper_after.css('visibility', 'hidden');
					$lower_before.css('visibility', 'visible');
					$lower_after.css('visibility', 'visible');
				}
			};
			
			$(window).scroll(update).resize(update);
			
			$this.wrapAll($wrapper);
			$inner.append($upper_before, $lower_before, $this.contents(), $upper_after, $lower_after);
			$this.append($inner);
			update();
		});
		
        return this;
    };
})(jQuery);