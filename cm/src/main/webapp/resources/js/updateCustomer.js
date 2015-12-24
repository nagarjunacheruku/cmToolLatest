$(".btnUTCCustomer").prop("disabled", true);
$("#btnUpdateCustomer").hide();
$("#btnDeleteCustomer").hide();
// Handler for add user events.
var updateCustomerHandler = {
		
		// it activates all other functions. 
		init : function(){
			updateCustomerHandler.saveButtonEvent();
			updateCustomerHandler.kendoValidation();
			updateCustomerHandler.cancelButtonEvents();
			updateCustomerHandler.headerActiveDeactive();
			updateCustomerHandler.searchButtonEvent();
			updateCustomerHandler.deleteButtonEvent();
		},
		getUserDetails : function(){
			$("#btnSearchCustomer").click(function() {			
				updateCustomerHandler.autoSearch();
			});
			
		},
		searchButtonEvent : function(){
//			for auto complete on keyup of textbox : search
			$("#searchCustomer").kendoAutoComplete({
				
				   filter: "contains",
                    minLength: 1,
                    change: onChangeCustomer,
                    dataTextField: "customerList",
                   /*select: onSelect,
                    change: onChange,
                    close: onClose,
                    open: onOpen,
                    filtering: onFiltering,
                    dataBound: onDataBound
                    template: '<span class="k-state-default"><img src ="obstreperus/user/showImage?imageName=#: userId #" style="height:30px; !important;" width="30" alt="resources/images/user.png"></span>' +
                    '<span class="k-state-default">#: userName #</span>',*/
                    dataSource: {
                    	serverFiltering: true,
                        type: "json",
                        transport: {
                            read: "obstreperus/orgchart/autoCompleteCustomer",
                           	parameterMap: function(options) {
                           		   if(options.filter.filters[0].value.length == 0){
                           			$("#search-list").hide();
                           			   return "term=0";
                           		   }else{
                           			return "term=" + options.filter.filters[0].value;  
                           		   }
                                     
                            }
                        }
                    }
                });
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
	  autoSearch :function(){
		  $(".btnUTCCustomer").prop("disabled", false);
			var name = $("#searchCustomer").val();
			$.ajax({

				url : "obstreperus/orgchart/readCustomer/" + name,
				type : 'GET',
				dataType : 'json',
				contentType : 'application/json',
				mimeType : 'application/json',
				success : function(data) {
					$("#customerId").val(data.customerId);
					$("#customerName").val(data.customerName);
				},
				error : function(data) {
					console.log(data);
				}
			});
	  },
	  // function for kendo validations.
	  kendoValidation : function(){
		    var validator = $("#addUserForm").kendoValidator().data("kendoValidator"), status = $(".status");
		 },
		 // Function for add user screen's save button.
		 saveButtonEvent : function(){
			 // save button click event.
		    $(document).on("click","#btnUpdateCustomer",function() {
		    	$("#btnUpdateCustomer").hide();
		    	$("#btnDeleteCustomer").hide();
				sendAjax();
			});
		 },
		 deleteButtonEvent : function(){
			 // save button click event.
		    $(document).on("click","#btnDeleteCustomer",function() {
				deleteAjax();
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
		alert("please enter correct Customer details");
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
function deleteAjax() {

	
	var customerId = $("#customerId").val();
	$.ajax({
		url : "obstreperus/orgchart/deleteCustomer/" + customerId,
		type : 'GET',
		dataType : 'json',
		contentType : 'application/json',
		mimeType : 'application/json',
		success : function(data) {
			alert(utcCode+" Deleted success");
		},
		error : function(data) {
			alert(utcCode+" Deleted success");
		}
	});
	
}
function onChangeCustomer() {
	$("#btnSaveCustomer").hide();
	$("#btnUpdateCustomer").show();
	$("#btnDeleteCustomer").show();
	updateCustomerHandler.autoSearch();
}
