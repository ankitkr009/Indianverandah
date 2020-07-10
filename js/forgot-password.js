(function (){
	
	//validation
	$("#formForgotPassword").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				userForgortPassword();
			}
		});
	});
	
	
	
}).apply(this, [ jQuery ]);

function userForgortPassword(){
	$("#forgotPasswordErrorMsg").addClass("hidden");
	$("#forgotPasswordSuccessMsg").addClass("hidden");
	//loader assign
	$('.hideOnSubmit').hide();
	$('#forgotPasswordLoader').removeClass('hidden');
	$.post('action/do-forgot-password.php',$('#formForgotPassword').serialize(), function(data){
		//loader remove
		$('#forgotPasswordLoader').addClass('hidden');
		$('.hideOnSubmit').show();
		if(data	==	"OK"){
//			Your password has been sent to your email address.
			$("#forgotPasswordSuccessMsg").html("Please check your email to reset password.").removeClass("hidden");
			$('#formForgotPassword')[0].reset();
		}else {
			$("#forgotPasswordErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}
	
