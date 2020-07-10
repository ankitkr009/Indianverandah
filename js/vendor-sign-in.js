(function (){
	//validation
	$("#vendorSignInForm").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				vendorSignIn();
			}
		});
	});
	
}).apply(this, [ jQuery ]);

function vendorSignIn(){
	$("#vendorSignInErrorMsg").addClass("hidden");
	$(".hideOnSubmit").hide();
	$("#signInLoader").removeClass("hidden");
	$.post('action/do-vendor-sign-in.php',$('#vendorSignInForm').serialize(), function(data){
		if(data	==	"OK"){
			window.location.href	=	"seller/dashboard.php";
		}else {
			$("#signInLoader").addClass("hidden");
			$(".hideOnSubmit").show();
			$("#vendorSignInErrorMsg").html(data).removeClass("hidden");
		}
	});
	
	return false;
}
