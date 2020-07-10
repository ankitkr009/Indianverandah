(function (){
	//validation
//	  jQuery.validator.addMethod("checkurl", function(value, element) {
//		// now check if valid url
//		return /^(www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/.test(value);
//		}, "Please enter a valid URL."
//		);

			 // connect it to a css class
//			  jQuery.validator.addClassRules({
//			checkurl : { checkurl : true }    
//			 });
			   
	$("#vendorSignUpForm").each(function() {
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
				},
				 'linkToCreation': {
			         url: true
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
				vendorSignUp();
			}
		});
		
	});
	
	
	$('#linkToCreation').blur(function (){
		user_unmask("http://",this);
	});
	
	$('#linkToCreation').focus(function (){
		user_mask("http://",this);
	});
	
	
}).apply(this, [ jQuery ]);

/*
function user_mask(textToShow,thisObj){
	if($("#"+thisObj.id).val() == ""){
		$("#"+thisObj.id).val(textToShow);
		//$("#"+thisObj.id).attr("value",""+textToShow);
	}
}

function user_unmask(textToShow,thisObj){
	if($("#"+thisObj.id).val() == textToShow){
		//$("#"+thisObj.id).removeAttr("value");
		$("#"+thisObj.id).val("");
	}
}
*/

function vendorSignUp(){
	$("#vendorSignUpErrorMsg").addClass("hidden");
	$("#vendorSignUpSuccessMsg").addClass("hidden");
	
	//loader assign
	$('.hideOnSubmit').hide();
	$('#vendorSignUploader').removeClass('hidden');
	//action page for when user register.
	$.post('action/do-vendor-sign-up.php',$('#vendorSignUpForm').serialize(), function(data){
		//loader remove
		$('#vendorSignUploader').addClass('hidden');
		$('.hideOnSubmit').show();
		if(data	==	"OK"){
			$(".hideOnSubmitForm").addClass("hidden");
			location.href	=	"seller/dashboard.php";
			$("#vendorSignUpSuccessMsg").html("Congrats ! You have been registered. Please check your email for details.");
			$('#vendorSignUpForm')[0].reset();
		}else {
			$("#vendorSignUpErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}

//here this popup used to show shopmatic terms and policy
function showShopmaticPopup(modalId) {
    $("#"+modalId).modal('show');
}

function clickOnAgreeCheckBox(modalId,checkboxId){
    $("#"+checkboxId).prop('checked',true);
    $("#"+modalId).modal('hide');
    
}
