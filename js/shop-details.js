
(function (){
	var noOfDisplayItemVal	= $("#showPerPage").val();
	//total cost
	getItemList(1,noOfDisplayItemVal,'item_id');
	
}).apply(this, [ jQuery ]);

function getItemList(pageNo,noOfItemsDisplay,shortBy){
	$("#loader").show();
	$.post(siteRootPath+'action/do-get-shop-items.php?pageNo='+pageNo+'&itemCount='+noOfItemsDisplay+'&shortBy='+shortBy,$("#shopSearchItemForm").serialize() ,function(data){
		$("#loader").hide();
		$("#shopItemsDiv").html(''+data);
	});
	return false;
}

function searchShopItems(){
	var noOfDisplayItemVal	= $("#showPerPage").val();
	getItemList(1,noOfDisplayItemVal,'item_id');
	return false;
}

function clickonNumberOfItemDisplayLink(){
	var noOfDisplayItemVal	= $("#showPerPage").val();
	getItemList(1,noOfDisplayItemVal,'item_id');
}

function clickonItemPagination(pageNo ,noOfDisplayItemVal, thisObj){
	$(".pagination li a").each( function(){
		$(this).removeClass('selectedPagination');
	});
	$(thisObj).addClass('selectedPagination');
//	var shortBy = $("#shortByFilter").val();
	var shortBy = 'item_id';
	getItemList(pageNo,noOfDisplayItemVal,shortBy);
}