(function (){
	//validation
	$("#formSignUp").each(function() {
		$(this).validate({
			rules:{
				"contactNumber" :{
					required : true,
					digits:true,
					minlength:7,
                                        maxlength:15
				},
				"password":{
					required:true,
					minlength:8
				},
				"confirmPassword":{
					required:true,
					equalTo:password
				}
			},
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
				$('.error').removeClass('hidden');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				$(label).addClass('hidden');
			},
			submitHandler : function (){
				userSignUp();
			}
		});
	});
	
	
	
}).apply(this, [ jQuery ]);

function userSignUp(){
	$("#signUpSuccessMsg").addClass("hidden");
	$("#signUpErrorMsg").addClass("hidden");
	//loader assign
	$('.hideOnSubmit').hide();
	$('#signUploader').removeClass('hidden');
	//action page for when user register.
	$.post('action/do-sign-up.php',$('#formSignUp').serialize(), function(data){
		if(data	==	"OK"){
			location.href	=	"user/dashboard.php";
			$('#formSignUp')[0].reset();
			//$("#signUpSuccessMsg").html("Congrats ! You have been registered. Please check your email for details.").removeClass("hidden");
		}else {
			//loader remove
			$('#signUploader').addClass('hidden');
			$('.hideOnSubmit').show();
			$("#signUpErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}
	
