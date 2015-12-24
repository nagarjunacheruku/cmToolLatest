$(".btnUTC").prop("disabled", true);
$("#btnUpdate").hide();
$("#btnDelete").hide();
// Handler for add user events.
var updateUtcHandler = {
		
		// it activates all other functions. 
		init : function(){
			updateUtcHandler.saveButtonEvent();
			updateUtcHandler.kendoValidation();
			updateUtcHandler.cancelButtonEvents();
			updateUtcHandler.headerActiveDeactive();
			updateUtcHandler.searchButtonEvent();
			updateUtcHandler.deleteButtonEvent();
		},
		getUserDetails : function(){
			$("#btnSearch").click(function() {			
				updateUtcHandler.autoSearch();
			});
			
		},
		searchButtonEvent : function(){
//			for auto complete on keyup of textbox : search
			$("#search").kendoAutoComplete({
				
				   filter: "contains",
                    minLength: 1,
                    change: onChangeUTC,
                    dataTextField: "utcName",
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
                            read: "obstreperus/orgchart/autoComplete",
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
		  $(".btnUTC").prop("disabled", false);
			var name = $("#search").val();
			$.ajax({

				url : "obstreperus/orgchart/readUTC/" + name,
				type : 'GET',
				dataType : 'json',
				contentType : 'application/json',
				mimeType : 'application/json',
				success : function(data) {
					$("#utcCode").val(data.utcIdentifier);
					$("#utcName").val(data.utcName);
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
		    $(document).on("click","#btnUpdate",function() {
		    	$("#btnUpdate").hide();
		    	$("#btnDelete").hide();
				sendAjax();
			});
		 },
		 deleteButtonEvent : function(){
			 // save button click event.
		    $(document).on("click","#btnDelete",function() {
				deleteAjax();
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
function deleteAjax() {

	
	var utcIdentifier = $("#utcCode").val();
	$.ajax({
		url : "obstreperus/orgchart/deleteUTC/" + utcIdentifier,
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
function onChangeUTC() {
	$("#btnSave").hide();
	$("#btnUpdate").show();
	$("#btnDelete").show();
	updateUtcHandler.autoSearch();
}
