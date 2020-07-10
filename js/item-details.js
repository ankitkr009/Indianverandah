(function (){
	//call the function when user contact to seller and form validation
	$("#contactSellerForm").each(function() {
		$(this).validate({
			rules:{
				contactMessage:{
					required:true,
					maxlength:400
					}
			},
			messages:{
				contactMessage:{
					required:"Please enter your message."
				}
			},
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				$(label).remove();
			},
			submitHandler : function (form){
				contactSeller();
			}
		});
	});
	
	//this is modal that shown when user click on the contact button
	$("#contactToSeller").click(function(){
		$("#modelFormContactSeller").modal('show');
		return false;
	});
	
	//Report an item from the item details page form validation
	$("#reportThisItemForm").each(function() {
		$(this).validate({
			rules:{
				reportMessage:{
					required:true,
					maxlength:400
					}
			},
			messages:{
				reportMessage:{
					required:"Please enter your message."
				},
				emailId:{
					required:"Please enter your email address."
				}
			},
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				$(label).remove();
			},
			submitHandler : function (form){
				reportItem();
			}
		});
	});

	//this is modal that shown when user click on the contact button
	$("#reportThisItemBtn").click(function(){
		$("#modelReportThisItem").modal('show');
		return false;
	});
	
	//pricing varients when select an varient
	$("#itemDetailsForm .varients-val-select-option").change(function(){
		getItemPriceVarient();
	});
	getItemPriceVarient();
	
}).apply(this, [ jQuery ]);


//used for getting th price according to filter variations
function getItemPriceVarient(){
	//loader assign
	showFullPageLoader();
	var myForm 				=	$('#itemDetailsForm');
	var formData 			= 	new FormData(myForm[0]);
	$.ajax({
		url: siteRootPath+"action/do-get-item-price-varient.php",  // Url to which the request is send
		type: "POST",             			// Type of request to be send, called as method
		data: formData, 					// Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       			// The content type used when sending data to the server.
		cache: false,             			// To unable request pages to be cached
		processData:false,        			// To send DOMDocument or non processed data file it is set to false
		dataType: "json",
		success: function(data)  		 	// A function to be called if request succeeds
		{
			//loader remove
			hideFullPageLoader();
			if(data.response	==	"OK"){
				$("#basePrice").html(data.price);
				$("#priceAfterDiscount").html(data.priceAfterDiscount);
				$("#variantAvailableItems").html("AVAILABLE ITEMS: "+data.numberOfItems);
				if(data.numberOfItems <= 0){
					$("#inStockID div").html("OUT OF STOCK");
					$("#inStockID div").attr({"style":"color: #fff; background-color: brown;"});
					$("#itemQuantityDropDown").addClass("hidden");
					$("#numberOfItems").html("");
					$("#numberOfItems").selectpicker('refresh');
					$("#addToCart").html("NOT AVAILABLE").addClass('btn-3').attr({"onclick":""});
				}else{
					$("#inStockID div").html('<i class="fa fa-check-circle"></i> IN STOCK');
					$("#inStockID div").attr({"style":""});
					$("#itemQuantityDropDown").removeClass("hidden");
					//selectpicker reintilize by variant quntity.
					$("#numberOfItems").html(data.quantityDropDown);
					$("#numberOfItems").selectpicker('refresh');
					
					$("#addToCart").html("ADD TO CART").removeClass('btn-3').attr({"onclick":"return addToCart()"});
				}
				//$(".item-select").selectpicker(data.quantityDropDown);
			}else if(data.response	==	"NO_VARIANT"){
				displayMessageBox("",""+data.message);
			}else if(data.response	==	"FILTER_NOT"){
				
			}else{
				displayMessageBox("Error",""+data.message);
			}
		}
	});	
	return false;
}


//function used for when any user contact to seller then send a mail to that seller regarding item
function contactSeller(){
	//assign loader
	$('.hideOnsubmitC').hide();
	$('#contactSellerLoader').removeClass('hidden');
	$.post(siteRootPath+'action/do-contact-seller.php',$("#contactSellerForm").serialize(),function (data){
		//remove loader
		$('#contactSellerLoader').addClass('hidden');
		$('.hideOnsubmitC').show();
		$("#modelFormContactSeller").modal('hide');
		if(data == "OK"){
			displayMessageBox("Success","Your message has been sent to the shop owner.");
		}else{
			displayMessageBox("Error",""+data);
		}
	});
	return false;
}

//function used for report an item 
function reportItem(){
	//assign loader
	$('.hideOnSubmitR').hide();
	$('#reportItemLoader').removeClass('hidden');
	$.post(siteRootPath+'action/do-report-item.php',$("#reportThisItemForm").serialize(),function (data){
		//remove loader
		$('#reportItemLoader').addClass('hidden');
		$('.hideOnSubmitR').show();
		$("#modelReportThisItem").modal('hide');
		if(data == "OK"){
			displayMessageBox("Success","This item has been reported.");
		}else{
			displayMessageBox("Error",""+data);
		}
	});
	return false;
}