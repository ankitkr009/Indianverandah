var tagNameList	=	"";
var isClickPriceFilter	=	false;
var randSeed 		= Math.floor((Math.random() * 1000) + 1); 
(function (){
	var priceMin = $('#price-min').html();
	var priceMax = $('#price-max').html();
	
	if(priceMin == undefined){
		priceMin	=	0;
	}
	if(priceMax == undefined){
	}
	priceMax	=	1000000000;
	priceFilter(parseInt(priceMin,10),parseInt(priceMax,10));
	//total cost
	var noOfDisplayItemVal	= $("#showPerPage").val();
	getItemList(1,noOfDisplayItemVal,shortBy,tagNameList,priceMin,priceMax);
	
}).apply(this, [ jQuery ]);

function getFilterItemsList(){
	isClickPriceFilter	=	true;
	var priceMin = $('#price-min').html();
	var priceMax = $('#price-max').html();
	var pageNo 				= 	1;
	var noOfItemsDisplay	= 	$("#showPerPage").val();
	var shortBy = $("#shortByFilter").val();
	getItemList(pageNo,noOfItemsDisplay,shortBy,tagNameList,priceMin,priceMax);
}

function OnCheckFilterApply(){
	isClickPriceFilter	=	false;
	var priceMin = $('#price-min').html();
	var priceMax = $('#price-max').html();
	var pageNo 				= 	1;
	var noOfItemsDisplay	= 	$("#showPerPage").val();
	var shortBy = $("#shortByFilter").val();
	getItemList(pageNo,noOfItemsDisplay,shortBy,tagNameList,0,priceMax);
}

function getItemList(pageNo,noOfItemsDisplay,shortBy,tagNameList,priceMin,priceMax){
	$("#loader2").show();
	$("#itemContentList").html('');
	$("#itemContentList").hide();
        //here apply the cod filter
        var codFilterVal    =   $("#codFilter").prop('checked');
	$.post(siteRootPath+'action/do-get-items-list.php?pageNo='+pageNo+'&itemCount='+noOfItemsDisplay+'&shortBy='+shortBy+'&seed='+randSeed+'&tagName='+tagNameList+'&priceMin='+priceMin+'&priceMax='+priceMax+'&onlyCOD='+codFilterVal,$("#filterItemForm").serialize() ,function(data){
		var itemList 	= 	data.split("##:##");
		$("#itemContentList").html(''+itemList[0]);
		$(".itemTagContainer").html(''+itemList[1]);
		//price range filter reintialize
		if($('#priceMinVal').html() !=	""){
			var newPriceMin	=	parseInt($('#priceMinVal').html(),10);
			var newPriceMax	=	parseInt($('#priceMaxVal').html(),10);
                        var slabRange   =   getSlabRange(newPriceMin,newPriceMax);
			$("#price-range").noUiSlider({'range':slabRange,snap: true},true);
			if(isClickPriceFilter	==	true){
				$("#price-range").noUiSlider({'start':[priceMin,priceMax]},true);
			}else{
				$("#price-range").noUiSlider({'start':[newPriceMin,newPriceMax]},true);
			}
		}
		
		$("#itemContentList").fadeIn();
		$("#loader2").hide();
	});
	return false;
}

function getSlabRange(minPrice,maxPrice){

    var slabRange   =   {};
    slabRange['min']    =   minPrice;
    var slabArray = [];
    if ( 100*minPrice/maxPrice <= 0.01 ) {
        slabArray = [0.01,0.02,0.04,0.08,0.1,1,5,10,50,100];
    } else if ( 100*minPrice/maxPrice <= 0.10 ) {
        slabArray = [0.2,0.4,0.6,0.8,1.0,2,5,10,50,100];
    } else if ( 100*minPrice/maxPrice <= 0.50 ) {
        slabArray = [1,2,5,10,20,40,60,70,90,100];
    } else if ( 100*minPrice/maxPrice <= 1 ) {
        slabArray = [2,5,7,10,15,25,40,60,80,100];
    } else {
        for ( var i = 2 ; i <= 10 ; i++) {
                if ( maxPrice*i/10 > minPrice ) {
                        slabArray.push(i*10);
                }
        }
        //slabArray = [10,20,30,40,50,60,70,80,90,100];
    }
    var value = minPrice;
    for ( var i = 1 ; i <= slabArray.length ; i++) {
        value = maxPrice*slabArray[i-1]/100;
        slabRange[''+i*10*(10/slabArray.length)+'%']     =   value;
    };
    slabRange['max']    =   maxPrice;
    return slabRange;
}

function clickonNumberOfItemDisplayLink(){
	var priceMin = $('#price-min').html();
	var priceMax = $('#price-max').html();
	var noOfDisplayItemVal	= $("#showPerPage").val();
	var shortBy 			= $("#shortByFilter").val();
	getItemList(1,noOfDisplayItemVal,shortBy,tagNameList,priceMin,priceMax);
}

function clickonItemPagination(pageNo ,noOfDisplayItemVal, thisObj){
	var priceMin = $('#price-min').html();
	var priceMax = $('#price-max').html();
	$(".pagination li a").each( function(){
		$(this).removeClass('selectedPagination');
	});
	$(thisObj).addClass('selectedPagination');
	
	var shortBy = $("#shortByFilter").val();
	getItemList(pageNo,noOfDisplayItemVal,shortBy,tagNameList,priceMin,priceMax);
}

function showItemsWithShortBy(){
	getFilterItemsList();
}

function getItemsFromTags(thisObj){
	$(".tags li a").each( function(){
		if(this != thisObj){
			$(this).removeClass('itemSelectedTag');
		}
	});
	
	if($(thisObj).hasClass("itemSelectedTag")){
		$(thisObj).removeClass('itemSelectedTag');
		tagNameList	= 	$(thisObj).html();
	}else {
		$(thisObj).addClass("itemSelectedTag");
		tagNameList	= 	$(thisObj).html();
	}
	
	var priceMin 			= 	$('#price-min').html();
	var priceMax 			= 	$('#price-max').html();
	var pageNo 				= 	1;
	var noOfDisplayItemVal	= 	$("#showPerPage").val();
	var shortBy 			= 	$("#shortByFilter").val();
	getItemList(pageNo,noOfDisplayItemVal,shortBy,tagNameList,priceMin,priceMax);
	tagNameList	=	"";
	
	return false;
}


function priceFilter(minVal,maxVal){
	
	$("#price-range").noUiSlider({
	    range: {
		    'min': [ minVal ],
                        'max': [ maxVal ]
	    },
	    step:100,
	    connect:true,
	    
	    start: [minVal, maxVal],
        serialization:{
        	lower: [
			        $.Link({
			          target: $("#price-min")
			        }),
			       ],
	        upper: [
			        $.Link({
			          target: $("#price-max")
			        }),
			      ],
	        format: {
	      // Set formatting
	        decimals:0,
	        prefix: ''
	        }
        }
	  });
}

function seeMoreFilter(filterId){
	$("#"+filterId+" ul li").each( function(){
		if($(this).hasClass('hidden')){
			$(this).removeClass('hidden').addClass("hiddenOff");
		}
	});
	$("#"+filterId+" ul .btnLink").html("see less");
	$("#"+filterId+" ul .btnLink").attr({"onclick":"return seeLessFilter('"+filterId+"')"});
	
}

function seeLessFilter(filterId){
	$("#"+filterId+" ul li").each( function(){
		if($(this).hasClass('hiddenOff')){
			$(this).addClass('hidden').removeClass('hiddenOff');
		}
	});
	$("#"+filterId+" ul .btnLink").html("see more");
	$("#"+filterId+" ul .btnLink").attr({"onclick":"return seeMoreFilter('"+filterId+"')"});
}


$(document).ready(function(){
//   if($(".more-content .footer-des-p").get(0).scrollHeight >= "129") {
//       $('.readMoreLink').hide();
//   }
});
function readMoreToggle(thisObj){
    $(thisObj).closest(".more-content").toggleClass('show-more');
    if( $(thisObj).closest(".more-content").hasClass('show-more')){
        $(".more-content .footer-des-p").animate({
            maxHeight: $(".more-content .footer-des-p").get(0).scrollHeight,
        });
        $(".more-content .footer-des-p").addClass('hiddenAfter');
        $(thisObj).html('Read Less');
    }else{
        $(".more-content .footer-des-p").animate({
            maxHeight: "129",
        });
        $(".more-content .footer-des-p").removeClass('hiddenAfter');
        $(thisObj).html('Read More');
    }
}
