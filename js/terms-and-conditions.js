(function() {
	

}).apply( this, [ jQuery ]);

function showPolicyDiv(divCounter){
	$(".faqs .panel-group").each( function(){
		if($(this).hasClass("accordion-"+divCounter)){
			$(this).removeClass("hidden");
		}else {
			$(this).addClass("hidden");
		}
		
	});
}


function showReturnPolicyDiv(divCounter){
	showPolicyDiv(divCounter);
}
