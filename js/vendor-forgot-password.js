(function (){
	
	//validation
	$("#vendorForgotPasswordForm").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				vendorForgortPassword();
			}
		});
	});
	
	
	
}).apply(this, [ jQuery ]);

function vendorForgortPassword(){
	$("#vendorForgotPasswordErrorMsg").addClass("hidden");
	$("#vendorForgotPasswordSuccessMsg").addClass("hidden");
	//loader assign
	$('.hideOnSubmit').hide();
	$('#forgotPasswordloader').removeClass('hidden');
	$.post('action/do-vendor-forgot-password.php',$('#vendorForgotPasswordForm').serialize(), function(data){
		//loader remove
		$('#forgotPasswordloader').addClass('hidden');
		$('.hideOnSubmit').show();
		if(data	==	"OK"){
			//Your password has been sent to your email address.
			$("#vendorForgotPasswordSuccessMsg").html("Please check your email to reset password.").removeClass("hidden");
			$('#vendorForgotPasswordForm')[0].reset();
		}else {
			$("#vendorForgotPasswordErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}
	
