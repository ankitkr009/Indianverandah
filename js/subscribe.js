(function (){
	//$("#subscribeMsg").addClass('hidden');
	//validation
	$("#subscribeForm").each(function() {
		$(this).validate({
			highlight: function(label) {
				$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(label) {
				$(label).closest('.form-group').removeClass('has-error');
				label.remove();
			},
			submitHandler:function(){
				subscribeUser();
			}
		});
	});
	
}).apply(this, [ jQuery ]);

function subscribeUser(){
	showFullPageLoader();
	$("#subscribeMsgError").addClass('hidden');
	$("#subscribeMsgSuccess").addClass('hidden');
	//this is action url for subscribe to access from all pages
	var actionPage	=	$('#actionPageSubscribe').html();
	
	$.post(actionPage,$('#subscribeForm').serialize(), function(data){
		hideFullPageLoader();
		if(data.response == "OK"){
			$("#subscribeMsgSuccess").html(''+data.message).removeClass('hidden');
		}else{
			$("#subscribeMsgError").html(''+data.message).removeClass('hidden');
		}
	},'json');
	
	return false;
}