/*********************************************
DigitClock - A jQuery digital clock plugin

Copyright (c) 2012 Jeffrey Titus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Date: 12/2/2012

Requires:
- jQuery (any version)
- style.css
***********************************************/
(function($) {
	var _interval;
	
	var methods = {
		init: function(options){
			var settings = $.extend({
				'mode' : '12HR',
				'width' : '445px',
				'height' : '85px',
				'left'	: '10px',
				'top' : 'auto',
				'clockBg' : '#333',
				'digitBg' : '-webkit-radial-gradient(center center, 50px 70px, #DF5, #333)',
				'colonColor' : '#EEE',
				'segmentWidth': null
			}, options);
			
			return this.each(function(){
				$(this).html(
					'<div id="hTens" class="digit">' + printDigitSegments() + '</div>\
					<div id="hOnes" class="digit">' + printDigitSegments() + '</div>\
					<div id="colon1" class="colon">:</div>\
					<div id="mTens" class="digit">' + printDigitSegments() + '</div>\
					<div id="mOnes" class="digit">' + printDigitSegments() + '</div>\
					<div id="colon2" class="colon">:</div>\
					<div id="sTens" class="digit">' + printDigitSegments() + '</div>\
					<div id="sOnes" class="digit">' + printDigitSegments() + '</div>'
				);
			
				var hTensArr = $('#hTens div');
				var hOnesArr = $('#hOnes div');
				var mTensArr = $('#mTens div');
				var mOnesArr = $('#mOnes div');
				var sTensArr = $('#sTens div');
				var sOnesArr = $('#sOnes div');
				
				//Prime the clock so it doesn't show all 8's
				setTime(hTensArr, hOnesArr, mTensArr, mOnesArr, sTensArr, sOnesArr, settings.mode);
				//Set up the timer to display the digits as time passes
				_interval = setInterval(function(){
					setTime(hTensArr, hOnesArr, mTensArr, mOnesArr, sTensArr, sOnesArr, settings.mode);
				}, 1000);
				
				var w = parseInt(settings.width, 10);
				var h = parseInt(settings.height, 10);
				
				//Calculate CSS
				$(this).css({'background':settings.clockBg, 'width':w, 'height':settings.height, 'left':settings.left, 'top':settings.top});
				$(this).children('.colon').css({'color':settings.colonColor, 'font-size': (h*1.3)+'px', 'top': -(h*0.388)+'px', 'width': (w*0.014)+'px'});
				$(this).children('.digit').children().css({'background':settings.digitBg});
				$(this).children('.digit').css({'width': (w*0.112)+'px', 'height': (h*0.941)+'px'});
				$('#colon1').css({'left': (w*0.027)+'px'});
				$('#colon2').css({'left': (w*0.131)+'px'});
				
				$('#hOnes').css({'left': (w*0.018)+'px'});
				$('#mTens').css({'left': (w*0.102)+'px'});
				$('#mOnes').css({'left': (w*0.122)+'px'});
				$('#sTens').css({'left': (w*0.203)+'px'});
				$('#sOnes').css({'left': (w*0.223)+'px'});
				
				$('.zero').css({'width': (w*0.10337)+'px', 'height': settings.segmentWidth ? settings.segmentWidth : (h*0.0588)+'px'});
				$('.one').css({'height': (h*0.4235)+'px', 'top': (h*0.0235)+'px', 'width': settings.segmentWidth ? settings.segmentWidth : (w*0.0112)+'px'});
				$('.two').css({'height': (h*0.4235)+'px', 'top': (h*0.0235)+'px', 'left': (w*0.10337)+'px', 'width': settings.segmentWidth ? settings.segmentWidth : (w*0.0112)+'px'});
				$('.three').css({'width': (w*0.10337)+'px', 'top': (h*0.4471)+'px', 'height': settings.segmentWidth ? settings.segmentWidth : (h*0.0588)+'px'});
				$('.four').css({'height': (h*0.4235)+'px', 'top': (h*0.4941)+'px', 'width': settings.segmentWidth ? settings.segmentWidth : (w*0.0112)+'px'});
				$('.five').css({'height': (h*0.4235)+'px', 'top': (h*0.4941)+'px', 'left': (w*0.10337)+'px', 'width': settings.segmentWidth ? settings.segmentWidth : (w*0.0112)+'px'});
				$('.six').css({'width': (w*0.10337)+'px', 'top': (h*0.8941)+'px', 'height': settings.segmentWidth ? settings.segmentWidth : (h*0.0588)+'px'});
			});
		},
		destroy: function(){
			return this.each(function(){
				clearInterval(_interval);
			});
		}
	};
	
	//Prints common segments for each digit on initialization
	var printDigitSegments = function(){
		return '<div class="zero"></div>\
				<div class="one"></div>\
				<div class="two"></div>\
				<div class="three"></div>\
				<div class="four"></div>\
				<div class="five"></div>\
				<div class="six"></div>';
	};
	
	//Shows or hides segments of a given digit
	var showHideSegments = function(segmentArr, showArr, hideArr){
		for(var el = 0; el < showArr.length; el++)
			segmentArr.eq(showArr[el]).show();
		for(var el = 0; el < hideArr.length; el++)
			segmentArr.eq(hideArr[el]).hide();
	};
	
	//Creates a graphical representation of a number
	var getGraphicNumber = function(segmentArr, numStr){
		switch(numStr){
			case '0': showHideSegments(segmentArr, [0, 1, 2, 4, 5, 6], [3]);
			break;
			case '1': showHideSegments(segmentArr, [2, 5], [0, 1, 3, 4, 6]);
			break;
			case '2': showHideSegments(segmentArr, [0, 2, 3, 4, 6], [1, 5]);
			break;
			case '3': showHideSegments(segmentArr, [0, 2, 3, 5, 6], [1, 4]);
			break;
			case '4': showHideSegments(segmentArr, [1, 2, 3, 5], [0, 4, 6]);
			break;
			case '5': showHideSegments(segmentArr, [0, 1, 3, 5, 6], [2, 4]);
			break;
			case '6': showHideSegments(segmentArr, [0, 1, 3, 4, 5, 6], [2]);
			break;
			case '7': showHideSegments(segmentArr, [0, 2, 5], [1, 3, 4, 6]);
			break;
			case '8': showHideSegments(segmentArr, [0, 1, 2, 3, 4, 5, 6], []);
			break;
			case '9': showHideSegments(segmentArr, [0, 1, 2, 3, 5, 6], [4]);
			break;
		}
	};
	
	//Sets the HH:MM:SS on the clock
	var setTime = function(hTensArr, hOnesArr, mTensArr, mOnesArr, sTensArr, sOnesArr, mode){
		var hTens = '', hOnes = '', mTens = '', mOnes = '', sTens = '', sOnes = '';
		var currentTime = new Date();
		
		var hours = currentTime.getHours();
		if(mode === '12HR' && hours > 12){
			hours = hours - 12;
		}
		if(hours < 10){
			//hTens is 0
			hTens = '0';
			hOnes = ''+hours;
		}else{
			hTens = (hours.toString()).substring(0,1);
			hOnes = (hours.toString()).substring(1,2);
		}
		
		var minutes = currentTime.getMinutes();
		if(minutes < 10){
			//sTens is 0
			mTens = '0';
			mOnes = ''+minutes;
		}else{
			mTens = (minutes.toString()).substring(0,1);
			mOnes = (minutes.toString()).substring(1,2);
		}
		
		var seconds = currentTime.getSeconds();
		if(seconds < 10){
			//sTens is 0
			sTens = '0';
			sOnes = ''+seconds;
		}else{
			sTens = (seconds.toString()).substring(0,1);
			sOnes = (seconds.toString()).substring(1,2);
		}
		
		getGraphicNumber(hTensArr, hTens);
		getGraphicNumber(hOnesArr, hOnes);
		getGraphicNumber(mTensArr, mTens);
		getGraphicNumber(mOnesArr, mOnes);
		getGraphicNumber(sTensArr, sTens);
		getGraphicNumber(sOnesArr, sOnes);
	};
	
	$.fn.DigitClock = function(method) {
		// Method calling logic
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.digitalClock' );
		}
	}
})(jQuery);