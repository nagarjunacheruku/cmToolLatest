// Handler for add user events.
var utcHandler = {
		// it activates all other functions. 
		init : function(){
			
			utcHandler.saveButtonEvent();
			utcHandler.kendoValidation();
			utcHandler.cancelButtonEvents();
			utcHandler.headerActiveDeactive();
		},
		
		
		// Function contains add user screens cancel button events.
		cancelButtonEvents : function(){
			$(".btn-user-cancel").click(function(){
				$(".k-window").hide();
				$(".k-overlay").hide();
			});
		},
		// Function enables header page tab's to be active or inactive.
		headerActiveDeactive : function(){
			   $(".nav").children("li").removeClass("active");
			   $("#utc").parent("li").addClass("active");
			   $(".responsivemenu").children("li").removeClass("active");
			   $(".responsiveUtc").parent("li").addClass("active");
	  },
	
	  // function for kendo validations.
	  kendoValidation : function(){
		    var validator = $("#addUserForm").kendoValidator().data("kendoValidator"), status = $(".status");
		 },
		 // Function for add user screen's save button.
		 saveButtonEvent : function(){
			 // save button click event.
		    $(document).on("click","#btnSave",function() {
				sendAjax();
			});
		 }
		 
}
// Method to save user entered data into db.
function sendAjax() {

	var user = new Object();
	user.utcIdentifier = $("#utcCode").val();
	user.utcName = $("#utcName").val();
	console.log(user.utcCode);
	if(user.utcIdentifier == '' || user.utcName == ''){
		alert("please enter correct UTC details");
		}else{
	$.ajax({
		url : "obstreperus/orgchart/saveUTC?orgchart="+JSON.stringify(user),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		mimeType : 'application/json',
		success : function(data) {
			alert("Record Inserted Successfully");
			
		},
		error : function(data, status, er) {

		}
	});
		}
}
