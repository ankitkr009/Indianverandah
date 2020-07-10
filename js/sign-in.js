(function (){
	//validation
	$("#formSignIn").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				userSignIn();
			}
		});
	});
	
}).apply(this, [ jQuery ]);

function userSignIn(){
	$("#signInErrorMsg").addClass("hidden");
	
	$(".hideOnSubmit").hide();
	$("#signInLoader").removeClass("hidden");
	$.post('action/do-sign-in.php',$('#formSignIn').serialize(), function(data){
		if(data	==	"OK"){
			window.location.href	=	"user/dashboard.php";
		}else {
			$("#signInLoader").addClass("hidden");
			$(".hideOnSubmit").show();
			$("#signInErrorMsg").html(data).removeClass("hidden");
		}
	});
	
	return false;
}
