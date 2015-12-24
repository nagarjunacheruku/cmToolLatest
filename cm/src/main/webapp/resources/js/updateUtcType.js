
//$(".vertical_align").hide();
// Handler for add user events.
var updateUtcTypeHandler = {
		// it activates all other functions. 
		init : function(){
			$.getJSON('obstreperus/orgchart/getUtcCodes',function(adata){
				for(j=0;j<adata.length;j++){
	    			$("#applicableUtcNew").append("<option value='"+adata[j]+"'>"+adata[j]+"</option>");
	    		}
			});
			updateUtcTypeHandler.saveButtonEvent();
			updateUtcTypeHandler.kendoValidation();
			updateUtcTypeHandler.cancelButtonEvents();
			updateUtcTypeHandler.headerActiveDeactive();
			updateUtcTypeHandler.searchButtonEvent();
			updateUtcTypeHandler.deleteButtonEvent();
			updateUtcTypeHandler.applicableUtcChangeEvent();
		},
		getUserDetails : function(){
			$("#btnTypeSearch").click(function() {			
				updateUtcTypeHandler.autoSearch();
			});
			
		},
		applicableUtcChangeEvent : function(){
			$("#btnShift").click(function(){
				var res = $("#applicableUtcNew").val()+'';
				var existArray = [];
				$('#applicableUTC').find('option').each(function() {
				    existArray.push($(this).val());
				});
				var str_array = res.split(',');
				for(j=0;j<str_array.length;j++){
					if($.inArray(str_array[j], existArray) == -1){
						$("#applicableUtcNew option[value="+str_array[j]+"]").remove();
						$("#applicableUTC").append("<option selected value='"+str_array[j]+"'>"+str_array[j]+"</option>");
					}
	    		}
			});
			$("#btnLeftShift").click(function(){
				var res = $("#applicableUTC").val()+'';
				var existArray = [];
				$('#applicableUtcNew').find('option').each(function() {
				    existArray.push($(this).val());
				});
				var str_array = res.split(',');
				for(j=0;j<str_array.length;j++){
					if($.inArray(str_array[j], existArray) == -1){
						$("#applicableUTC option[value="+str_array[j]+"]").remove();
						$("#applicableUtcNew").append("<option selected value='"+str_array[j]+"'>"+str_array[j]+"</option>");
					}
	    		}
			});
		},
		searchButtonEvent : function(){
//			for auto complete on keyup of textbox : search
			$("#searchType").kendoAutoComplete({
				
				   filter: "contains",
                    minLength: 1,
                    change: onChangeTypeRef,
                    dataTextField: "utcTypeRef",
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
                            read: "obstreperus/orgchart/autoCompleteTypeRef",
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
			   $("#utcType").parent("li").addClass("active");
			   $(".responsivemenu").children("li").removeClass("active");
			   $(".responsiveUtcType").parent("li").addClass("active");
			   
	  },
	  autoSearch :function(){
		  $("#applicableUtcNew").show();
		  $("#applicableUTC").show();
		  $(".vertical_align").show();
		  $(".btn-user-save").prop("disabled", false);
		  $("#lbl").show();
			var name = $("#searchType").val();
			$.ajax({

				url : "obstreperus/orgchart/readUtcTypeRef/" + name,
				type : 'GET',
				dataType : 'json',
				contentType : 'application/json',
				mimeType : 'application/json',
				success : function(data) {
					$("#typeNumber").val(data.typeIdentity);
					$("#typeName").val(data.purposeOfRegistration);
					$("#applicableUTC").find('option').remove().end();
					for(i=0;i<data.applicableUTC.length;i++){
						$("#applicableUtcNew option[value="+data.applicableUTC[i]+"]").remove();
		    			$("#applicableUTC").append("<option selected value='"+data.applicableUTC[i]+"'>"+data.applicableUTC[i]+"</option>");
		    		}
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
		    $(document).on("click","#btnTypeUpdate",function() {
		    	updateTypeReference();
			});
		 },
		 deleteButtonEvent : function(){
			 // save button click event.
		    $(document).on("click","#btnTypeDelete",function() {
				deleteTypeReference();
			});
		 }
}
// Method to save user entered data into db.
function updateTypeReference() {
	var user = new Object();
	user.typeIdentity = $("#typeNumber").val();
	user.purposeOfRegistration = $("#typeName").val();
	var existA = [];
	 $('select#applicableUTC option').each(function(id, val)
			{
			    existA.push($(val).val());
//			    alert($(val).html()); // here's the display text
			});
	 user.applicableUTC = existA;
	if(user.typeIdentity == '' || user.purposeOfRegistration == ''){
		alert("please enter proper Type Source detatils");
	}else{
	$.ajax({
		url : "obstreperus/orgchart/updateUtcType?orgchart="+JSON.stringify(user),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		mimeType : 'application/json',
		success : function(data) {
			alert("Record Updated Successfully");
			window.location.href= "typeReferenceUTC";
		},
		error : function(data, status, er) {
			window.location.href= "typeReferenceUTC";
		}
	});
	}
}
function deleteTypeReference() {

	var user = new Object();
	user.typeNumber = $("#typeIdentity").val();
	user.typeName = $("#purposeOfRegistration").val();
	$.ajax({
		url : "obstreperus/orgchart/deleteUtcTypeRef?deleteTypeRef=" +JSON.stringify(user),
		type : 'GET',
		dataType : 'json',
		contentType : 'application/json',
		mimeType : 'application/json',
		success : function(data) {
			alert(" Deleted success");
			window.location.href= "typeReferenceUTC";
		},
		error : function(data) {
			alert(" Delete success");
			window.location.href= "typeReferenceUTC";
		}
	});
	
}
function onChangeTypeRef() {
	
	$("#btnTypeSave,#applicableUTCRef,#lblAppUTC").hide();
	
	$(".btnTypeEditDelete,#applicableUtcNew, #applicableUTC, #lblAddAppNewUTC, #spanExistingAppUTC,#btnShift,#btnLeftShift").show();
	updateUtcTypeHandler.autoSearch();
}
