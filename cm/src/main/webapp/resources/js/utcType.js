var list =[];

$(".btnTypeEditDelete,#applicableUtcNew, #applicableUTC, #lblAddAppNewUTC, #spanExistingAppUTC,#btnShift,#btnLeftShift").hide();
// Handler for add user events.
var utcTypeHandler = {
		// it activates all other functions. 
		init : function(){
			utcTypeHandler.saveButtonEvent();
			utcTypeHandler.kendoValidation();
			utcTypeHandler.cancelButtonEvents();
			utcTypeHandler.headerActiveDeactive();
			$.getJSON('obstreperus/orgchart/getUtcCodes',function(data){
				for(i=0;i<data.length;i++){
	    			$("#applicableUTCRef").append("<option value='"+data[i]+"'>"+data[i]+"</option>");
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
			   $("#utcType").parent("li").addClass("active");
			   $(".responsivemenu").children("li").removeClass("active");
			   $(".responsiveUtcType").parent("li").addClass("active");
	  },
	  
	  // function for kendo validations.
	  kendoValidation : function(){
		    var validator = $("#addUserForm").kendoValidator().data("kendoValidator"), status = $(".status");
		 },
		 // Function for add user screen's save button.
		 saveButtonEvent : function(){
		    $(document).on("click","#btnTypeSave",function() {
				saveTypeReference();
			});
		   }
		 
}

function saveTypeReference() {

	var user = new Object();
	user.typeIdentity = $("#typeNumber").val();
	user.purposeOfRegistration = $("#typeName").val();
	user.applicableUTC = $("#applicableUTCRef").val();
	if(user.typeIdentity == '' || user.purposeOfRegistration == ''){
		alert("please enter proper Type Source detatils");
	}else{
		
	$.ajax({
		url : "obstreperus/orgchart/saveUtcType?orgchart="+JSON.stringify(user),
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