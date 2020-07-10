(function (){
	//total cost
	var total					=	0;
	var grandTotal				=	0;
	var itemIdToDelete			=	"NOT_SET";
	var promoCodeToDelete		=	"NOT_SET";
	var confirmUpdatePromoCode	=	"NOT_SET";
	var confirmUpdatePromoShop	=	"NOT_SET";
        var couponType                  =       "NOT_SET";
		
	$("#formNoteToSeller").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				noteToSeller();
			}
		});
	});
	
	$("#codeApplyForm").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-groups').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-groups').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				codeApply();
			}
		});
	});
	
	$("#clearShopCart").click(function(){
		clearShopCart();
	});
	
	 $('.totalNumberOfItems').multiselect({
	    	enableFiltering: false,
	        numberDisplayed: 1,
	        maxHeight: 150, //using for scroll
	        maxWidth:10
    });
	 
	$("#proceedToCheckout").click(function(){
		checkValidationOfCart();
	});
	
	$("#btnForFocus").click(function(){
		getFocus();
	});
        
        $("#userWalletAmountCheckBox").change(function(){
           if(this.checked) {
               applyWalletBalance('true');
           }else {
               applyWalletBalance('false');
           }
        });
        
        $("#forgotPasswordModelShow").click(function(){
		$("#formSignIn").addClass("hidden");
		$("#formForgotPassword").removeClass("hidden");
		$("#modelHeadingId").html("FORGOT PASSWORD");
		return false;
	});
	
	$("#backToSignIn").click(function(){
		$("#formSignIn").removeClass("hidden");
		$("#formForgotPassword").addClass("hidden");
		$("#modelHeadingId").html("SIGN IN");
		return false;
	});
	$("#formSignIn").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
				$('.error').removeClass('hidden');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				$(label).addClass('hidden');
			},
			submitHandler:function(){
				signIn();
			}
		});
	});
	 
}).apply(this, [ jQuery ]);

function getFocus(){
	$("#mainShopId").focus();
}

function checkValidationOfCart(){
	showFullPageLoader();
	$(".itemNotAvailable").addClass("hidden");
	$(".itemInventoryEnd").addClass("hidden");
	$.ajax({
		url: "action/do-checkout.php",  // Url to which the request is send
		type: "POST",             			// Type of request to be send, called as method
		contentType: false,       			// The content type used when sending data to the server.
		cache: false,             			// To unable request pages to be cached
		processData:false,        			// To send DOMDocument or non processed data file it is set to false
		dataType: "json",
		success: function(data)  		 	// A function to be called if request succeeds
		{
                    if(data.response == "OK"){
                        window.location.href	=	"pay-checkout.php";
                    }else {
                        hideFullPageLoader();
                        //focus on that items that is not available
                        $.each(data.itemIds,function(index,itemIdValue){
                            $("#itemNotAvailable_"+itemIdValue).removeClass("hidden");
                        });
                        $.each(data.outStockItemIds,function(index,itemIdVal){
                            $("#itemInventoryEnd_"+itemIdVal).removeClass("hidden");
                        });

                        $.each(data.shippingMismatchItemIds,function(index,itemIdVal){
                            $("#itemShippingMismatch_"+itemIdVal).removeClass("hidden");
                        });

                        $.each(data.itemCostMismatchItemIds,function(index,itemIdVal){
                            $("#itemCostMismatch_"+itemIdVal).removeClass("hidden");
                        });
                        $("#itemInventoryEnd_"+data.outStockItemIds[0]).focus();
                        $("#itemNotAvailable_"+data.itemIds[0]).focus();
                        $("#itemShippingMismatch_"+data.shippingMismatchItemIds[0]).focus();
                        $("#itemCostMismatch_"+data.itemCostMismatchItemIds[0]).focus();

                        if(data.response	==	"ORDER_CHECKOUT_ITEM_SHIPPING_MISMATCH_POPUP"  ||
                           data.response == "ORDER_CHECKOUT_ITEM_COST_MISMATCH_POPUP"){
                            displayMessagePopup("",""+data.message);
                        }else {
                            displayMessageBox("Error",""+data.message);
                        }
                    }
		}
	});	
	return false;
}

//this function used to show the message popup and also set the values for popup
function displayMessagePopup(title,message){
    var modalId =   "#payviewCartPopup";
    $(modalId).modal('show');
    
    $(modalId + " #payviewCartPopup_titleDiv").html(title);
    $(modalId + " #payviewCartPopup_msgDiv").html(message);
    
}

function payviewCartReload(){
    var modalId =   "#payviewCartPopup";
    $(modalId).modal('hide');
    $(modalId).on('hidden.bs.modal', function () {
        showFullPageLoader();
        $.ajax({
            url: "action/do-update-item-cart-session.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            dataType: "json",
            success: function (data)  		 	// A function to be called if request succeeds
            {
                //remove add new item loader
                if (data.response == "OK") {
                    window.location.reload();
                } else if(data.response == "ITEM_NOT_FOUND"){
                    hideFullPageLoader();
                }else {
                    hideFullPageLoader();
                    displayMessageBox("Error", ""+data.message);
                }
            },
            error: function () {
                hideFullPageLoader();
                displayMessageBox("Error", "Item View cart update error.");
            }
        });
        return false;
    });
    
}


function showCouponCodeConfirmBoxToUpdate(couponCode,couponShopId){
	confirmUpdatePromoCode	=	couponCode;
	confirmUpdatePromoShop	=	couponShopId;
	
	$("#couponConfirmDisableDiv").show();
	$("#couponConfirmMessagePopUp").show();
}

function closeCouponConfirmMessagePopUp(){
	$("#couponConfirmDisableDiv").hide();
	$("#couponConfirmMessagePopUp").hide();
}

//This function call from confirm box of coupon update
function updateCouponCode(){
	closeCouponConfirmMessagePopUp();
	
	//Here we update coupon code
	// Ajax Submit
	showFullPageLoader();
	
	sendUpdatePromoCodeRequest(confirmUpdatePromoCode,confirmUpdatePromoShop);
	
	return false;
}


function noteToSellerPopUp(shopId,messageToSeller){
	showFullPageLoader();
	$("#noteToSellerShopId").val(shopId);
	$.post('action/do-add-note-to-seller.php',{noteToSellerShowMsg:"show",shopId:shopId},function(data){
		hideFullPageLoader();
		$("#noteToSellerMessage").val(data);
		$("#modalNoteToSeller").modal('show');
	});
	return false;
}

function noteToSeller(){
	$("#noteToSellerLoader").removeClass("hidden");
	$(".hideOnSubmit").addClass("hidden");
	var shopId	=	$("#noteToSellerShopId").val();
	$.post('action/do-add-note-to-seller.php',$('#formNoteToSeller').serialize(),function(data){
		$("#noteToSellerLoader").addClass("hidden");
		$(".hideOnSubmit").removeClass("hidden");
		//loader remove
		if(data	==	"OK"){
			$("#modalNoteToSeller").modal('hide');
			$("#noteTosellerPopup_"+shopId).html("Edit note to seller");
			displayMessageBox("Success", "Note for seller added successfully.");
		}else{
			displayMessageBox("Error", ""+data);
		}
	});
	return false;
}

function codeApply(){
	$("#applyCodeLoader").removeClass("hidden");
	$(".applyPromoBtn").addClass("hidden");
	
	var $form = $('#codeApplyForm');
	// Ajax Submit
	$.ajax({
		type: 'POST',
		url: $form.attr('action'),
		data: {
			discountCode: $form.find('#discountCode').val()
		},
		dataType: 'json',
		complete: function(data) {
			$("#applyCodeLoader").addClass("hidden");
			$(".applyPromoBtn").removeClass("hidden");
			if (typeof data.responseJSON === 'object') {
				if (data.responseJSON.response == 'OK') {
					$(".promodiv").removeClass('hidden');
					displayMessageBox("Success",data.responseJSON.responseMsg);
                                        $("#walletPromoCodeAppliedContainer").html(data.responseJSON.walletPromoCodeContant);
					$("#promoDiscount").html(data.responseJSON.totalPromoDiscount);
                                        $("#siteLevelCouponDiscount").html(data.responseJSON.siteLevelCouponDiscount);
                                        $("#siteLevelCouponDiscountDiv").removeClass('hidden');
					$("#grandTotal").html(data.responseJSON.grandTotal);
                                        $("#walletAmountUsed").html(data.responseJSON.walletAmount);
					$(".promo_code_div").removeClass('hidden');
					$(".promo_code_div_contant").html(data.responseJSON.promoCodeTableContant);
					$(".promo_code_div_contant").removeClass('hidden');
				}else if(data.responseJSON.response == "SHOP_COUPON_ALREADY_APPLY"){
					//Show confirm box to update promo code
					showCouponCodeConfirmBoxToUpdate(data.responseJSON.disCode,data.responseJSON.disCodeShopId);
				}else {
					displayMessageBox("Error",data.responseJSON.responseMsg);
				}
			}	
		}
	});
}
function viewCartItem(){
	//action page for pay-viewcart.
}

function universalMethod(id){
	if(id == "YES"){
		$("#loader").show();
//		showFullPageLoader();
		//Delete item 
		if(itemIdToDelete != "NOT_SET"){
			$.post('action/do-item-remove-from-cart.php?cartIndex='+encodeURIComponent(itemIdToDelete), function(data){
				itemIdToDelete	=	"NOT_SET";
				if(data	==	"OK"){
					location.reload();
					//window.scrollTo(500, 300);
				}else {
					$("#loader").hide();
//					hideFullPageLoader();
					displayMessageBox("Error",""+data);
				}
			});
		//Delete promo code	
		}else if(promoCodeToDelete != "NOT_SET"){
			
			$.ajax({
				type: 'POST',
				url: 'action/do-delete-promo-code-from-cart.php',
				data: {
					promoCode: promoCodeToDelete,
                                        couponType:couponType
				},
				dataType: 'json',
				complete: function(data) {
					$("#loader").hide();
//					hideFullPageLoader();
					if (typeof data.responseJSON === 'object') {
						if (data.responseJSON.response == 'OK') {
							$("#couponCodeDiv_"+promoCodeToDelete).remove();
							$("#promoDiscount").html(data.responseJSON.totalPromoDiscount);
                                                        $("#siteLevelCouponDiscount").html(data.responseJSON.siteLevelCouponDiscount);
                                                        $("#walletAmountUsed").html(data.responseJSON.walletAmount);
							$("#grandTotal").html(data.responseJSON.grandTotal);
							if(data.responseJSON.totalPromoCodeCount == 0){
								//$(".promo_code_div_contant").html("<div class='text-center'><label>No coupon code applied.</label><div>");
							}
							displayMessageBox("Success",data.responseJSON.responseMsg);
						}else if(data.responseJSON.response == "OK_WALLET"){
                                                        $("#walletPromoCodeAppliedContainer").html('');
							displayMessageBox("Success",data.responseJSON.responseMsg);
						}else{
							displayMessageBox("Error",data.responseJSON.responseMsg);
                                                    
                                                }
					}
				}
			});
		}else {
			$("#loader").hide();
//			hideFullPageLoader();
		}
	}
	return false;
}

function removeFromCart(itemId){
	itemIdToDelete			=	itemId;
	promoCodeToDelete		=	"NOT_SET";
	displayConfirmBox("Do you really want to delete this item from your shopping cart!","Really ?");
}

function clearShopCart(){
	itemIdToDelete			=	'all';
	promoCodeToDelete		=	"NOT_SET";
	displayConfirmBox("Do you really want to clear your shopping cart. This will remove all items from your shopping cart.","Really ?");
}

function clickonCouponDeleteBtn(promoCode){
	promoCodeToDelete	=	promoCode;
        couponType              =       "instant";
	itemIdToDelete		=	"NOT_SET";
	displayConfirmBox("Do you really want to delete this coupon code from shopping cart!","Really ?");
}

function walletPromoCodeDeleteBtn(walletPromoCode){
        promoCodeToDelete	=	walletPromoCode;
        couponType              =       "wallet";
	itemIdToDelete		=	"NOT_SET";
	displayConfirmBox("Do you really want to delete this coupon code from shopping cart!","Really ?");
}


function clickonPromoUpdate(promoCode,promoShopId){
	
	showFullPageLoader();
	var $form = $('#codeApplyForm_'+promoCode);
	
	sendUpdatePromoCodeRequest($form.find('#discountCode_'+promoCode).val(),promoShopId);
	
}

function sendUpdatePromoCodeRequest(code,shopId){
	// Ajax Submit
	$.ajax({
		type: 'POST',
		url: "action/do-apply-discount-code.php",
		data: {
			discountCode: code,
			shopId: shopId
		},
		dataType: 'json',
		complete: function(data) {
			hideFullPageLoader();
			if (typeof data.responseJSON === 'object') {
				if (data.responseJSON.response == 'OK') {
                                        
                                        displayMessageBox("Success",data.responseJSON.responseMsg);
                                        $("#walletPromoCodeAppliedContainer").html(data.responseJSON.walletPromoCodeContant);
                                        $("#promoDiscount").html(data.responseJSON.totalPromoDiscount);
                                        $("#siteLevelCouponDiscount").html(data.responseJSON.siteLevelCouponDiscount);
                                        $("#grandTotal").html(data.responseJSON.grandTotal);
                                        $(".promo_code_div").removeClass('hidden');
                                        $(".promo_code_div_contant").html(data.responseJSON.promoCodeTableContant);
                                        $("#walletAmountUsed").html(data.responseJSON.walletAmount);
                                        $(".promo_code_div_contant").removeClass('hidden');
				}else {
					displayMessageBox("Error",data.responseJSON.responseMsg);
				}
			}	
		}
	});
	return false;
}

function clickonPromoCancel(promoCode){
	$("#discountCodeLabel_"+promoCode).show();
	$("#discountCode_"+promoCode).addClass('hidden');
	$("#promoCodeAction_"+promoCode).show();
	$("#promoCodeActionEdit_"+promoCode).addClass('hidden');
}

function clickonPromoEditBtn(promoCode){
	$("#discountCodeLabel_"+promoCode).hide();
	$("#discountCode_"+promoCode).removeClass('hidden');
	$("#promoCodeAction_"+promoCode).hide();
	$("#promoCodeActionEdit_"+promoCode).removeClass('hidden');
	return false;
}


// To updat ethe quantity of the cart 
function updateItemCart(cartIndex,count){
	var numberOfItems	=	$("#numberOfItems"+count).val();
	var quantityOrg 	= 	$("#numberOfItemsOrg"+count).html();
//	alert(numberOfItems);
//	alert(quantityOrg);
	if(numberOfItems ==	0){
		$("#numberOfItems"+count).val(quantityOrg);
		displayMessageBox("Error","Product quantity in cart can't be zero.");
		return false;
	}
	if(isNaN(parseInt(numberOfItems,10))){
		$("#numberOfItems"+count).val(quantityOrg);
		displayMessageBox("Error","please enter number only");
		return false;
	}
	$(".btnUpdateCartQuntity_"+count).addClass("hidden");
	$(".updateCartLoader_"+count).removeClass("hidden");
	$.post('action/do-update-item-cart.php?numberOfItems='+numberOfItems+'&cartIndex='+encodeURIComponent(cartIndex),function(data){
		//loader remove
		$(".updateCartLoader_"+count).addClass("hidden");
		$(".btnUpdateCartQuntity_"+count).removeClass("hidden");
		if(data	==	"OK"){
			window.location.reload();
		}else if(data	==	"ITEM_CART_EXCEED"){
			$("#numberOfItems"+count).val(quantityOrg);
			displayMessageBox("","No more quantity for buy.");
		}else if(data	==	"quantity_NaN"){
			displayMessageBox("Error","Please enter a numeric value.");
		}else{
			displayMessageBox("Error","Some error occurred. Please try again.");
		}
	});
	return false;
	
} 

function applyWalletBalance(isUseWallet){
//    showFullPageLoader();
    $.ajax({
        url:'action/do-get-payble-amount.php' ,
        type: 'POST',
        data:{'isUseWallet':isUseWallet},
        dataType:'json',
        success:function(data){
            hideFullPageLoader();
            if(data.response == "OK"){
                if(data.isWalletUsed == 'true'){
                    $("#walletAmountContainer").removeClass('hidden');
                    $("#walletAmountUsed").html(data.walletAmountUsedWithCurrency);
                    $("#grandTotal").html(data.grandTotalWithCurrency);
                }else{
                    $("#walletAmountUsed").html('');
                    $("#grandTotal").html(data.grandTotalWithCurrency);
                    $("#walletAmountContainer").addClass('hidden');
                }
            }else{
                $("#modelSignForm").modal('show');
            }
        },
        error:function(){
            
        }
    });
}

function signIn(){
	showFullPageLoader();
	$.post('action/do-sign-in.php',$('#formSignIn').serialize(), function(data){
		if(data == "OK"){
			window.location.reload();
		}else{
			hideFullPageLoader();
			displayMessageBox("Error"," "+data);
		}
	});
	
	return false;
}

function forgotPassword(){
	showFullPageLoader();
	$.post('action/do-forgot-password.php',$('#formForgotPassword').serialize(), function(data){
		hideFullPageLoader();
		if(data == "OK"){
			displayMessageBox("Success","Please check your email to reset password.");
			$('#formForgotPassword')[0].reset();
		}else{
			displayMessageBox("Error"," "+data);
		}
	});
	
	return false;
}
