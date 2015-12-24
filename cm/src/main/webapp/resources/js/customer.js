// Handler for add user events.
var customerHandler = {
		// it activates all other functions. 
		init : function(){
			
			customerHandler.saveButtonEvent();
			customerHandler.kendoValidation();
			customerHandler.cancelButtonEvents();
			customerHandler.headerActiveDeactive();
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
		    $(document).on("click","#btnSaveCustomer",function() {
				sendAjax();
			});
		 }
		 
}
// Method to save user entered data into db.
function sendAjax() {

	var user = new Object();
	user.customerId = $("#customerId").val();
	user.customerName = $("#customerName").val();
	console.log(user.customerId);
	if(user.customerId == '' || user.customerName == ''){
		alert("please enter correct UTC details");
		}else{
	$.ajax({
		url : "obstreperus/orgchart/saveCustomer?customer="+JSON.stringify(user),
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
