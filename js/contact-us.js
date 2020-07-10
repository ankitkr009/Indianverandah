(function() {
	
	//validation
	$("#formContactUs").validate({
		rules:{
			'website':{
				url:true
			},
			'message':{
				maxlength:1000
			}
		},
		highlight: function( label ) {
			$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function( label ) {
			$(label).closest('.form-group').removeClass('has-error');
			label.remove();
		},
		submitHandler:function(){
			contactUs();
		}
	});
	/*
	 $('#message').maxlength({
    	alwaysShow:true,
    	warningClass: 'label label-maxlength',
    	limitReachedClass: 'label label-maxlength',
     	placement: 'bottom-left'
    });
*/

}).apply( this, [ jQuery ]);

function contactUs() {
	$("#contactUsSuccessMsg").addClass("hidden");
	$("#contactUsErrorMsg").addClass("hidden");
	//loader assign
	$('.hideOnSubmit').hide();
	$('#contactUsLoader').removeClass('hidden');
	$.post('action/do-contact-us.php',$('#formContactUs').serialize(), function(data){
		$('#contactUsLoader').addClass('hidden');
		$('.hideOnSubmit').show();
		if(data	==	"OK"){
			$("#contactUsSuccessMsg").html("Thanks for your query. We will reply at the earliest.").removeClass("hidden");
			$('#formContactUs')[0].reset();
                        grecaptcha.reset()
		}else {
			$("#contactUsErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}