(function (){
	//total cost
}).apply(this, [ jQuery ]);

//this function is used to call the izooto push event function
function addToCartPushEventiZooto(){
    var pushInformation = $('#itemDetailsForm #addToCart').data('pusheventizooto');
    iZootoPushEvent('Add to Cart',pushInformation);
}

function addToCart(){
        //call function 
        addToCartPushEventiZooto();
	//action page for addToCart.
	//loader assign
	showFullPageLoader();
	$.post(siteRootPath+'action/do-item-add-to-cart.php',$("#itemDetailsForm").serialize() ,function(data){
		//loader remove
		var respObj	=	JSON.parse(data);
		if(respObj.response	==	"OK"){
			window.location.href= siteRootPath+"pay-viewcart.php";
		}else {
			hideFullPageLoader();
			if(respObj.response == "NOT_SET"){
				displayMessageBox("Error",""+respObj.message);
			}else if(respObj.response == "ALREADY_EXIST"){
				displayConfirmBox(""+respObj.message,"Update Cart");
			}else if(respObj.response == "ITEM_CART_EXCEED"){
				displayMessageBox("",""+respObj.message);
			}else if(respObj.response == "SHOP_SWITCH_OFF"){
				displayMessageBox("",""+respObj.message);
			}else if(respObj.response == "NOT_AVAILABLE"){
				displayMessageBox("",""+respObj.message);
			}
		}
	});
	return false;
}

function updateShopCart(){
	//action page for addToCart.
	//loader assign
	showFullPageLoader();
	$.post(siteRootPath+'action/do-item-add-to-cart.php?updateCart=1',$("#itemDetailsForm").serialize() ,function(data){
		//loader remove
		var respObj	=	JSON.parse(data);
		if(respObj.response	==	"OK"){
			window.location.href= siteRootPath+"pay-viewcart.php";
		}else {
			hideFullPageLoader();
			
			if(respObj.response == "NOT_SET"){
				displayMessageBox("Error",""+respObj.message);
			}else if(respObj.response == "ALREADY_EXIST"){
				displayConfirmBox(""+respObj.message,"Update Cart");
			}else if(respObj.response == "ITEM_CART_EXCEED"){
				displayMessageBox("",""+respObj.message);
			}else if(respObj.response == "SHOP_SWITCH_OFF"){
				displayMessageBox("",""+respObj.message);
			}
		}
	});
	return false;
}
	
