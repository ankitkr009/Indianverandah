var isLocal	=	false;
var siteRootPath	=	"";
if(isLocal){
	siteRootPath	=	"";
	siteSellerPath	=	"";
}else{
	siteRootPath	=	"/";
	siteSellerPath	=	"";
}

(function (){
	
   /*######## Start:: This is used for the scroller menu ##########*/
    $(".sticky").addClass('stickyOverflow');

    $(".shop-cart i").on('click', function () {
        $(".sticky").removeClass('activeLi_search-nav');
        showHideDD('shop-cart');
    });

    $('.search-nav i').on('click', function () {
        $(".sticky").removeClass('activeLi_shop-cart');
        showHideDD('search-nav');
    });

    function showHideDD(classOfLi) {
        if ($(".sticky").hasClass('activeLi_' + classOfLi)) {
            $(".sticky").removeClass('activeLi_' + classOfLi);
            if ($("." + classOfLi + " .dropdown").css("display") != 'none') {
                $(".sticky").addClass('stickyOverflow');
            }
        } else {
            $(".sticky").removeClass('stickyOverflow');
            $(".sticky").addClass('activeLi_' + classOfLi);
        }
    }
    /*######## End:: This is used for the scroller menu ##########*/
 /*
	 $('.search-nav i').hover(function() {
		    clearTimeout($(this).data('timeout'));
		    $('.search-nav > ul').css("display", "none");
		}, function() {
		    var t = setTimeout(function() {
		        $('.search-nav > ul').css("display", "block");
		    }, 2000);
		    $(this).data('timeout', t);
	});
 */
/*
    $(".dropdown li").on('mouseenter mouseleave', function (e) {
        if ($('ul', this).length) {
            var elm = $('ul:first', this);
            var off = elm.offset();
            var l = off.left;
            var w = elm.width();
            var docH = $(".container").height();
            var docW = $(".container").width();

            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
            	$(this).removeClass('edge');
            } else {
            	$(this).addClass('edge');
            }
        }
    });
    
*/
	$('.pagination a').on('click touchend', function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
	});
}).apply(this, [ jQuery ]);

//these function is used for masking the input

//###############START
function user_mask(textToShow,thisObj){
	if($("#"+thisObj.id).val() == ""){
		$("#"+thisObj.id).val(textToShow);
	}
}

function user_unmask(textToShow,thisObj){
	if($("#"+thisObj.id).val() == textToShow){
		$("#"+thisObj.id).val("");
	}
}
//###############END

function displayConfirmBox(msg, title){
	if (typeof(title)==='undefined') title = 'Confirm Box';
	
	$("#confirmTitleDiv").html(title);
	$("#confirmMsgDiv").html(msg);
	$("#confirmDisableDiv").show();
	$("#confirmMessagePopUp").show();
}

function closeConfirmMessagePopUp(){
	$("#confirmDisableDiv").hide();
	$("#confirmMessagePopUp").hide();
}

function clickOnConfirmBtn(id){
	$("#confirmDisableDiv").hide();
	$("#confirmMessagePopUp").hide();
	universalMethod(id);
}

function displayMessageBox(title,message){
	if(title == "Error" || title == ""){
		$("#checkIcon").addClass("hidden");
		$("#warningIcon").removeClass("hidden");
	}else if(title == "success_icon"){//Success
		title	=	"";
		$("#warningIcon").addClass("hidden");
		$("#checkIcon").removeClass("hidden");
	}else{
		$("#warningIcon").addClass("hidden");
		$("#checkIcon").removeClass("hidden");
	}
	$("#titleDiv").html(title);
	$("#msgDiv").html(message);
	
	$("#messageDisableDiv").show();
	$("#messagePopUp").show();
}

function closeMessagePopUp(){
	$("#messageDisableDiv").hide();
	$("#messagePopUp").hide();
}

function showFullPageLoader(){
	$("#loaderDisableDiv").show();
	$("#fullPageLoaderDiv").show();
}

function hideFullPageLoader(){
	$("#loaderDisableDiv").hide();
	$("#fullPageLoaderDiv").hide();
}

//This method used to validate image and show preview if validate field
function imageValidationAndPreview(imageThis,imageFieldId,imageDisplayClass,isImageTag,isImageSizeCheck,imageWidthValid,imageHeightValid){
	
	var imageValidationFlag		=	imageValidation(imageThis,imageFieldId,imageDisplayClass,isImageTag);
	if(imageValidationFlag == 1){
		readURL(imageThis,imageFieldId,imageDisplayClass,isImageTag,isImageSizeCheck,imageWidthValid,imageHeightValid);
	}
}

//This method used to validate images 
function imageValidation(imageThis,imageFieldId,imageDisplayClass,isImageTag){
	var flag		=	1;
	var errorType	=	"";
	
	var fileImage	=	$("#"+imageFieldId).val();
	var extension 	= 	fileImage.substring(fileImage.lastIndexOf('.') + 1).toLowerCase();
	
	if (extension == "gif" || extension == "png" || extension == "bmp"
        || extension == "jpeg" || extension == "jpg") {
		
		var fileSize	=	imageThis.files[0].size;//in Byts
		fileSize		=	(fileSize/1024).toFixed(2);//In KB
		fileSize		=	(fileSize/1024).toFixed(2);//In MB
		
		if(fileSize > 1){//File check For 1 mb 
			flag	=	0;
			errorType	=	"FILE_SIZE";	
		}
	}else {
		flag		=	0;
		errorType	=	"FILE_TYPE_ERROR";
	}
	
	if(flag == 0){
		if($("#"+imageFieldId).val() != ""){
			displayMessageBox("Error", getImageFileErrorMessage(errorType));
		}
		$("#"+imageFieldId).val('');
		
		$("#"+imageFieldId).closest( ".fileupload" ).fileupload('clear');
		var orginalSrc = $("#"+imageFieldId+"Original").attr('src');
		if(isImageTag){
    		$('.'+imageDisplayClass).attr('src', ''+orginalSrc);
    	}else {
    		$('.'+imageDisplayClass+' img').attr('src', ''+orginalSrc);
    	}
	}
	
	return flag;
}

//Show preview of image
function readURL(input,imageFieldId,displayFieldClassName,isImageTag,isImageSizeCheck,imageWidthValid,imageHeightValid) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        var flag	=	0;
        reader.onload = function (e) {
    		//Initiate the JavaScript Image object.
    		var image = new Image();
    		//Set the Base64 string return from FileReader as source.
    		image.src = e.target.result;
    		//Validate the File Height and Width.
    		image.onload = function () {
    			var height = this.height;
    			var width = this.width;
    			if(isImageSizeCheck){
        			if (height != imageHeightValid) {
        				flag	=	1;
        				$("#"+imageFieldId).val('');
        				$("#"+imageFieldId).closest( ".fileupload" ).fileupload('clear');
        				displayMessageBox("Error", getImageFileErrorMessageDimension("FILE_SIZE_HEIGHT",imageWidthValid,imageHeightValid));
        				return false;
        			}else if(width != imageWidthValid){
        				flag	=	1;
        				$("#"+imageFieldId).val('');
        				$("#"+imageFieldId).closest( ".fileupload" ).fileupload('clear');
        				displayMessageBox("Error", getImageFileErrorMessageDimension("FILE_SIZE_WIDTH",imageWidthValid,imageHeightValid));
        				return false;
        			}
    			}
				if(height >= width){
        			if(isImageTag){
                		$('.'+displayFieldClassName).css({'max-height':'100%'});
                		$('.'+displayFieldClassName).css({'width':'auto'});
                	}else {
                		$('.'+displayFieldClassName+' img').css({'max-height':'100%'});
                		$('.'+displayFieldClassName+' img').css({'width':'auto'});
                	}
        		}else {
        			if(isImageTag){
                		$('.'+displayFieldClassName).css({'max-width':'100%'});
                		$('.'+displayFieldClassName).css({'height':'auto'});
                	}else {
                		$('.'+displayFieldClassName+' img').css({'max-width':'100%'});
                		$('.'+displayFieldClassName+' img').css({'height':'auto'});
                	}
        		}
    				
	        	if(isImageTag){
	        		$('.'+displayFieldClassName).attr('src', e.target.result);
	        	}else {
	        		$('.'+displayFieldClassName+' img').attr('src', e.target.result);
	        	}
    		};
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//get error message for image files error type
function getImageFileErrorMessageDimension(errorType,width,height){
	var errMessage	=	"";
	if(errorType == "FILE_ERROR"){
		errMessage	=	"File has some error";
	}else if(errorType == "FILE_SIZE"){
		errMessage	=	"Please make sure that image size should be less than 1MB";
	}else if(errorType == "FILE_SIZE_WIDTH"){
		errMessage	=	"Please make sure that you are uploading an image of dimensions : "+width+"X"+height;
	}else if(errorType == "FILE_SIZE_HEIGHT"){
		errMessage	=	"Please make sure that you are uploading an image of dimensions : "+width+"X"+height;
	}else if(errorType == "FILE_UPLOAD_ERROR"){
		errMessage	=	"File upload error .Please try again.";
	}else if(errorType == "FILE_TYPE_ERROR"){
		errMessage	=	"Please select image type.";
	}else if(errorType == "NOTOK"){
		errMessage	=	"Some error Occured.Please try again. Error Code : NOTOK";
	}else {
		errMessage	=	"Some error Occured.Please try again. Error Code : "+errorType;
	}
	return errMessage;
}

//get error message for image files error type
function getImageFileErrorMessage(errorType){
	var errMessage	=	"";
	if(errorType == "FILE_ERROR"){
		errMessage	=	"File has some error";
	}else if(errorType == "FILE_SIZE"){
		errMessage	=	"Please make sure that image size should be less than 1MB";
	}else if(errorType == "FILE_SIZE_WIDTH"){
		errMessage	=	"File size is not not fit in width ";
	}else if(errorType == "FILE_SIZE_HEIGHT"){
		errMessage	=	"File size is not fit in height";
	}else if(errorType == "FILE_UPLOAD_ERROR"){
		errMessage	=	"File upload error .Please try again.";
	}else if(errorType == "FILE_TYPE_ERROR"){
		errMessage	=	"Please select image type.";
	}else if(errorType == "NOTOK"){
		errMessage	=	"Some error Occured.Please try again. Error Code : NOTOK";
	}else {
		errMessage	=	"Some error Occured.Please try again. Error Code : "+errorType;
	}
	return errMessage;
}

function changeCurrencyValue(siteName){
	var newVal = $("#currencyVal").val();
	$.post(siteName+'/action/do-change-currency.php?val='+newVal,function(data){
		if(data =="OK"){
			window.location.reload();
		}
	});
	return false;
}

//this function used for the add item item into favourite list	
function addToFavorite(itemId){
	showFullPageLoader();
	//this used for adding the items into the favorite list of users
	$.post(siteRootPath+'action/do-item-add-to-favorite.php?itemId='+itemId,function(data){
		hideFullPageLoader();
		if(data	==	"OK"){
			$("#favoriteItem_"+itemId+" i").addClass('favourite_item');
			displayMessageBox("success_icon","Item added to favorite list.");
		}else if(data == "NOT_SET"){
			displayMessageBox("Error","Oops! Look like there's an error. please try again!");
		}else if(data == "NOT_LOGIN"){
			displayMessageBox("","You must login to add items to your favorite list.");
		}else if(data == "ALREADY_FAV"){
			displayMessageBox("","Already in your favorite list.");
		}else {
			displayMessageBox("Error",""+data);
		}
	});
	return false;
}

function showItemPopUp(itemId,itemVariant){
	$("#itemDetailsQuickViewModal").modal('show');
	//$("#loader").show();
	$.post(siteRootPath+'action/do-get-item-details-popup.php?itemId='+itemId+'&itemVariant='+itemVariant,function(data){
		//$("#loader").hide();
		$("#item-details-container").html(data);
		$('.images-slider').flexslider({
		  animation: "fade",
		  controlNav: "thumbnails"
		});
	});
//	
}

function downloadPdf(txnId,type){
	showFullPageLoader();
	$.post('../action/do-get-download-order.php',{txnId:txnId,userType:type} ,function(data){
		hideFullPageLoader();	
		try {
		    var respObj	=	JSON.parse(data);
		    if(respObj.response == "OK"){
		    	var fullPath	=	respObj.pdfFullPath;
		    	
		    	//this is used to create a link element to download file
		    	var achorTagId	=	"ddPdf_order";
		    	$('body').append('<a href="#" id="'+achorTagId+'" class="hidden">orderPdf</a>');
		    	$("#"+achorTagId)
		    	.attr({
		    		'target': '_blank',
		    		'href': fullPath
		    	});
		    	document.getElementById(achorTagId).click();
		    	$("#"+achorTagId).remove();
		    	
		    }else{
		    	displayMessageBox("Error", respObj.message);
		    }
		} catch (e) {
		    // not json
			displayMessageBox("Error", "Oops! somthing goes wrong.");
		}
		
	});
	return false;
}
