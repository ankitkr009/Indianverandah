(function (){
	
	$(".client-slide").owlCarousel({
		responsive:{
			0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1200:{
	            items:3
	        }},
		"singleItem": false,
		"autoPlay": true,
		"navigation": true,
		"pagination": true,
		"margin":10,
		"loop":false,
		"dots":true,
		"stagePadding":10
	});
	
	$(".fur-slide").owlCarousel({ 
		responsive:{
			0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        767:{
	        	items:3
	        },
	        980:{
	            items:3
	        },
	        1200:{
	            items:5
	        }}
	});	
	
	/*
	$(".test-a-a").owlCarousel({ 
		autoplay:true,
		autoplayHoverPause:true,
		singleItem	: true,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		lazyLoad:true,
		nav: false,
		margin:0,
		"dots":true,
		responsive:{
	        0:{
	            items:5
	        },
	        1000:{
	            items:5,
	        }}
	});
	*/
	
	
}).apply(this, [ jQuery ]);