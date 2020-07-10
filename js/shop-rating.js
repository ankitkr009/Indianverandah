(function (){
	//validation
	$("#addReview").click(function(){
		$(".reviewFormForShop").removeClass("hidden");
	});
	$("#shopReviewForm").each(function() {
		$(this).validate({
			messages:{
				"userReviewMsg":{
					required:"Please enter your review."
				}
			},
			highlight: function(label) {
				$(label).closest('.form-groups').removeClass('has-success').addClass('has-error');
				$('.error').css({'color':'red'});
			},
			success: function(label) {
				$(label).closest('.form-groups').removeClass('has-error');
				label.remove();
			},
			submitHandler : function (){
				shopRating();
			}
		});
	});
	
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
	
	$(".stars i").hover( function(){
		var id = this.id;
		var noA = id.split("s");
		var no = noA[1];
		for(var i =1 ; i <= 5 ; i++){
			var star = $("#s"+i);
			if(i <= no){
				star.addClass('star_golden');
			}else {
				star.removeClass('star_golden');
			}
		}
		$("#shopRating").val(no);
	});
}).apply(this, [ jQuery ]);

function shopRating(){
	$("#shopRatingSuccessMsg").addClass("hidden");
	$("#shopRatingErrorMsg").addClass("hidden");
	//loader assign
	$('.hideOnSubmit').hide();
	$('#shopRatingLoader').removeClass('hidden');
	//action page for when user register.
	$.post(siteRootPath+'action/do-shop-rating.php',$('#shopReviewForm').serialize(), function(data){
		//loader remove
		$('#shopRatingLoader').addClass('hidden');
		$('.hideOnSubmit').show();
		if(data	==	"OK"){
			$("#shopRatingSuccessMsg").html("Thanks for Rating.").removeClass("hidden");
			$('#shopReviewForm')[0].reset();
		}else {
			$("#shopRatingErrorMsg").html(data).removeClass("hidden");
		}
	});
	return false;
}

function addReviewBtn(){
	$(".nav-tabs li").removeClass("active");
	$("#reviewActive").addClass("active");
	$("#reviewActive a").attr("aria-expanded=true");
	$("#reviewActive a").focus();
}

function userSignIn(){
//	showFullPageLoader();
	$("#signInErrorMsg").addClass("hidden");
	$(".hideOnSubmitSignIn").addClass('hidden');
	$("#onShopSignInLoader").removeClass('hidden');
	$.post(siteRootPath+'action/do-sign-in.php',$('#formSignIn').serialize(), function(data){
		if(data	==	"OK"){
			window.location.reload();
		}else {
			$("#onShopSignInLoader").addClass('hidden');
			$(".hideOnSubmitSignIn").removeClass('hidden');
//			hideFullPageLoader();
			$("#signInErrorMsg").html(data).removeClass("hidden");
		}
	});
	
	return false;
}
	
