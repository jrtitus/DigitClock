DigitClock - A jQuery-based digital clock implementation
================================

DigitClock allows you to have a customizable digital clock on your web page, with digits that look like those of an actual digital clock.

\<head\> section includes
---
	<link rel="stylesheet" type="text/css" href="style.css"/>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="digitclock.min.js"></script>

Usage
---
	
	$('selector').DigitClock({options});
	
Customization Options
---

**mode** (Default: "24HR")
- "24HR"
- "12HR"

**clockBg** (Default: "#333")
- All background colors/gradients

**digitBg** (Default: "'-webkit-radial-gradient(center center, 50px 70px, #DF5, #333)")
- All background colors/gradients

**colonColor** (Default: "#EEE")
- All font colors

**segmentWidth** (Default: null)
- Integer
- String in the form of "#px"

**width** (Default: '445px')
- Integer
- String in the form of "#px"

**height** (Default: '85px')
- Integer
- String in the form of "#px"

**left** (Default: '10px')
- Integer
- String in the form of "#px"
- Position string ("auto" etc.)

**top** (Default: 'auto')
- Integer
- String in the form of "#px"
- Position string ("auto" etc.)

Example with Defaults Set
---

	$('#digit-clock').DigitClock({
		'mode' : '24HR',
		'width' : '445px',
		'height' : '85px',
		'left'	: '10px',
		'top' : 'auto',
		'clockBg' : '#333',
		'digitBg' : '-webkit-radial-gradient(center center, 50px 70px, #DF5, #333)',
		'colonColor' : '#EEE',
		'segmentWidth': null
	});

Feel free to use the provided **sample.html** for testing.

Enjoy!