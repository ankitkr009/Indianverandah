
//TEMPLATE HOW TO USE POPOVER
/*
<button data-toggle="popover" data-container="body" data-placement="top" 
title="This one have a title" data-content="Example of top popover, click again to close :)">Top</button>
*/

//TEMPLATE HOW TO USE TOOLTIP
//<i class='fa fa-exclamation-circle' data-toggle='tooltip'  data-placement='right' title='here text for tooltip'></i>

//popover
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['popover'] ) ) {
		$( '[data-toggle=popover]' ).popover({ container: 'body' });
	}

}).apply( this, [ jQuery ]);

// Tooltip
(function( $ ) {

	'use strict';

	if ( $.isFunction( $.fn['tooltip'] ) ) {
		$( '[data-toggle=tooltip],[rel=tooltip]' ).tooltip({ container: 'body' });
		
	}

}).apply( this, [ jQuery ]);