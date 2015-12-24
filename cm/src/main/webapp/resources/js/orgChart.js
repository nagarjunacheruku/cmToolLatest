var av=[];
var docsJSon2;
var docsJSon;
var abc = [];
var jqgridata;
var jqgridHandler ={
		init : function(data){
			
			jqgridHandler.loadjQGrid(data);
			jqgridHandler.selectCheckBox();
			jqgridHandler.exportToGrid();
		},
		loadjQGrid : function(data){
			
			var applicationGrid = $("#grid");
			//var data = [[48803, ++, "02200220", "actType"], [48769, "APPR", "77733337", "acttye"]];

		 jqgridata=	$("#grid").jqGrid({
			    datatype: "local",
			    
			    colNames: ['Document No', 'Document Name', 'UTC Type', 'Arctefact Type'],
			    colModel: [{
			        name: 'Document_No',
			        index: 'Document_No',
			        /*width: 100,*/
			        sorttype: "int"},
			    {
			        name: 'Document_Name',
			        index: 'Document_Name',
			       /* width: 100,*/
			        sorttype: "string"},
			    {
			        name: 'UTC_Type',
			        index: 'UTC_Type',
			        /*width: 100,*/
			        sorttype:"string"},
			    {
			        name: 'Arctefact_Type',
			        index: 'Arctefact_Type',
			        /*width: 100,*/
			        sorttype: "float"},
			    
			    ],
			    height: 250,
			    //width: '100%',
			    autowidth: true,
			    caption: "Documents",
			    // ondblClickRow: function(rowid,iRow,iCol,e){alert('double clicked');}
			});
	
			$(window).on("resize", function () {
   			 var newWidth = $("#grid").closest(".ui-jqgrid").parent().width();
   			 applicationGrid.jqGrid("setGridWidth", newWidth, true);
			});
			var names = ['Document_No', 'Document_Name', 'UTC_Type', 'Arctefact_Type'];
			var mydata = [];

			for (var i = 0; i < data.length; i++) {
			    mydata[i] = {};
			    for (var j = 0; j < data[i].length; j++) {
			        mydata[i][names[j]] = data[i][j];
			    }
			}

			for (var i = 0; i <= mydata.length; i++) {
			    $("#grid").jqGrid('addRowData', i + 1, mydata[i]);
			}

			/*
			$("#grid").jqGrid('setGridParam', {onSelectRow: function(rowid,iRow,iCol,e){alert('row clicked');}});
			*/
			
			$("#grid").jqGrid('setGridParam', {ondblClickRow: function(rowid,iRow,iCol,e){alert('double clicked');}});
			$(document).off('click').on('click','.node-h6',function(e){
				//$('.label_node').click(function(e){
			    	console.log(e.target.innerText);
			    	$('.data, .exporttoExcel').remove();
			    	$("#popup_box").append('<input type="radio" name="sitprj" value="++" checked> CUS');
			    	loadPopupBox();
			    	$("input:radio[name=sitprj]").click(function(){
			    		alert($(this).val());
			    	});
			    	 docsJSon=[
			    	          {
			    			"docid": "001",
			    		    "utcCode": "SOL-901",
			    		    "atcCode": "222.0-",
			    		    "documentName":"Requirements Specification",
			    		    "docmentlink": "Administration",
			    			"priority":"M"
			    			 },
			    			 {
			    	    			"docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "222.1-",
			    	    		    "documentName":"Deployment Guide",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"M"
			    	    			 },
			    	    			 {
			    	    	    			"docid": "001",
			    	    	    		    "utcCode": "SOL-901",
			    	    	    		    "atcCode": "223.0",
			    	    	    		    "documentName":"CM Plan",
			    	    	    		    "docmentlink": "Administration",
			    	    	    			"priority":"M"
			    	    	    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "223.1",
			    	    		    "documentName":"Master Configuration Index",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"M"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "223.2",
			    	    		    "documentName":"Baseline Report",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"M"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "222.3",
			    	    		    "documentName":"Site Engineering Data",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"O"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "222.2",
			    	    		    "documentName":"CustomerQuistioner",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"O"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "222.5",
			    	    		    "documentName":"Site Survey",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"C"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "222.6",
			    	    		    "documentName":"Site installation Reports",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"C"
			    			 },
			    			 {
			    				 "docid": "001",
			    	    		    "utcCode": "SOL-901",
			    	    		    "atcCode": "225.1",
			    	    		    "documentName":"Migration Plan",
			    	    		    "docmentlink": "Administration",
			    	    			"priority":"C"
			    			 }
			    			 
			    			 
			    			 
			    		]
			    	 docsJSon2=[
			        	          {
			        			"docid": "001",
			        		    "utcCode": "PRJ-901",
			        		    "atcCode": "202-",
			        		    "documentName":"Investigation Report",
			        		    "docmentlink": "Administration",
			        			"priority":"O"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "206-",
			        	    		    "documentName":"Resource Plan",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"M"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "207-",
			        	    		    "documentName":"Time Plan",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"M"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "208-",
			        	    		    "documentName":"Purchase Order",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"M"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "209-",
			        	    		    "documentName":"Solution Map",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"M"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "201.0-",
			        	    		    "documentName":"Cost BudgetPlan",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"M"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "201.2-",
			        	    		    "documentName":"Audit Report",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"O"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "201.9-",
			        	    		    "documentName":"Change Request",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"O"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "205-",
			        	    		    "documentName":"Technical Report",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"O"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "202.2-",
			        	    		    "documentName":"Root Cause Analysis",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"O"
			        			 },
			        			 {
			        				 "docid": "001",
			        	    		    "utcCode": "PRJ-901",
			        	    		    "atcCode": "202.6-",
			        	    		    "documentName":"Acceptance Certificate",
			        	    		    "docmentlink": "Administration",
			        	    			"priority":"O"
			        			 },
			        		]
			    	
			    	
			    	 docsJSon3=[
				        	          {
				        			"docid": "001",
				        		    "utcCode": "PRD-150",
				        		    "atcCode": "221.0-",
				        		    "documentName":"Requirement Specifications",
				        		    "docmentlink": "Administration",
				        			"priority":"O"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.1-",
				        	    		    "documentName":"Support Plan",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"M"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.2-",
				        	    		    "documentName":"Release Plan",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"M"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.4-",
				        	    		    "documentName":"System Design Guide",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"M"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.5-",
				        	    		    "documentName":"Technical Product Description",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"M"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.6-",
				        	    		    "documentName":"Commercial Product Description",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"M"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.12-",
				        	    		    "documentName":"Exemption Record,Decision",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"C"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.19-",
				        	    		    "documentName":"Product Package Description",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"C"
				        			 },
				        			 {
				        				 "docid": "001",
				        	    		    "utcCode": "PRD-150",
				        	    		    "atcCode": "221.22-",
				        	    		    "documentName":"Export Control",
				        	    		    "docmentlink": "Administration",
				        	    			"priority":"C"
				        			 }
				        			
				        		]
			    	
			    	
			    	
			    	
			    	if(e.target.innerText == "SOL-901-001"){
			    		$.each(docsJSon, function(i, obj){
			        		if(obj.priority == "M"){
			        			var html = "<div class='data mandatory'><br><input type='checkbox' class='docCheckbox' checked>"	+
			                	"<div class='docName'>"+obj.documentName+ "</div><div>M</div></div>";
			            	    $('.docFields').append(html);
//			            	    var data = [[obj.docid+i,obj.documentName,obj.utcCode,obj.atcCode]];
//			            	    jqgridHandler.loadjQGrid(data);
			            	    deleteGridRow(obj);
			        		}else if(obj.priority == "C"){
			        	    var html = "<div class='data condition'><br><input type='checkbox' class='docCheckbox'>"	+
			            	"<div class='docName'>"+obj.documentName+ "</div><div>C</div></div>";
			        	    $('.docFields').append(html);
			        		}else{
			        			 var html = "<div class='data '><br><input type='checkbox' class='docCheckbox'>"	+
			        	        	"<div class='docName'>"+obj.documentName+ "</div><div>O</div></div>";
			        	    	    $('.docFields').append(html);
			        		}
			        	});
			    		$('.documents').append("<div class='exporttoExcel'></div>");
			        	/* $('.docFields').append(
			        	"<div class='data'><br><input type='checkbox' class='docCheckbox'>"	+
			        	"<div class='docName'>"+docsJSon[0].utcCode+"-"+docsJSon[0].Reference+ "</div></div>"
			        	); */
			        	$('.docFields').show();
			    	}else if(e.target.innerText=="PRJ-901-001"){
			    		$.each(docsJSon2, function(i, obj){
			        		if(obj.priority == "M"){
			        			var html = "<div class='data mandatory'><br><input type='checkbox' class='docCheckbox' checked>"	+
			                	"<div class='docName'>"+obj.documentName+ "</div><div>M</div></div>";
			            	    $('.docFields').append(html);
//			            	    var data = [[obj.docid+i,obj.documentName,obj.utcCode,obj.atcCode]];
//			            	    jqgridHandler.loadjQGrid(data);
			            	    deleteGridRow(obj);
			        		}else if(obj.priority == "C"){
			        	    var html = "<div class='data condition'><br><input type='checkbox' class='docCheckbox'>"	+
			            	"<div class='docName'>"+obj.documentName+ "</div><div>C</div></div>";
			        	    $('.docFields').append(html);
			        		}else{
			        			 var html = "<div class='data '><br><input type='checkbox' class='docCheckbox'>"	+
			        	        	"<div class='docName'>"+obj.documentName+ "</div><div>O</div></div>";
			        	    	    $('.docFields').append(html);
			        		}
			        	});
			        	$('.documents').append("<div class='exporttoExcel'></div>");
			        	/* $('.docFields').append(
			        	"<div class='data'><br><input type='checkbox' class='docCheckbox'>"	+
			        	"<div class='docName'>"+docsJSon[0].utcCode+"-"+docsJSon[0].Reference+ "</div></div>"
			        	); */
			        	$('.docFields').show();
			    		
			    	}else if(e.target.innerText=="PRD-150-001"){
			    		$.each(docsJSon3, function(i, obj){
			        		if(obj.priority == "M"){
			        			var html = "<div class='data mandatory'><br><input type='checkbox' class='docCheckbox' checked>"	+
			                	"<div class='docName'>"+obj.documentName+ "</div><div>M</div></div>";
			            	    $('.docFields').append(html);
//			            	    var data = [[obj.docid,obj.documentName,obj.utcCode,obj.atcCode]];
//			            	    jqgridHandler.loadjQGrid(data);
			            	    deleteGridRow(obj);
			        		}else if(obj.priority == "C"){
			        	    var html = "<div class='data condition'><br><input type='checkbox' class='docCheckbox'>"	+
			            	"<div class='docName'>"+obj.documentName+ "</div><div>C</div></div>";
			        	    $('.docFields').append(html);
			        		}else{
			        			 var html = "<div class='data '><br><input type='checkbox' class='docCheckbox'>"	+
			        	        	"<div class='docName'>"+obj.documentName+ "</div><div>O</div></div>";
			        	    	    $('.docFields').append(html);
			        		}
			        	});
			        	$('.documents').append("<div class='exporttoExcel'></div>");
			        	/* $('.docFields').append(
			        	"<div class='data'><br><input type='checkbox' class='docCheckbox'>"	+
			        	"<div class='docName'>"+docsJSon[0].utcCode+"-"+docsJSon[0].Reference+ "</div></div>"
			        	); */
			        	$('.docFields').show();
			    	}
			    	
			    });
			
			
			//search 
			   $(document).on("keyup","#filter",function(){
				   	 
			        // Retrieve the input field text and reset the count to zero
			        var filter = $(this).val(), count = 0;
			 
			        // Loop through the comment list
			        $(".node select option").each(function(e){
			        	
			            // If the list item does not contain the text phrase fade it out
			            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			                $(this).fadeOut();
			               
			 
			            // Show the list item if the phrase matches and increase the count by 1
			            } else {

			            	
			                $(this).show();
//			                 $(".node select option").attr('selected', true);
			                count++;
			            }
			        });
			  });
			   $('#test').click(function(){
					  fnExcelReport();
				  });
				  
			
		},
		selectCheckBox : function(){
	
//	  $('.docCheckbox').change(function() {
		  $(document).on("change",".docCheckbox",function(e){
			  console.log(e);
			  if($(this).is(':checked') == true){
		      		
		        	$.each(docsJSon2, function(i, obj){
		        		
		        		if(obj.documentName == e.currentTarget.nextSibling.innerText){
		        			deleteGridRow(obj);	        			

		        		}
		        	});
		        	$.each(docsJSon, function(i, obj){
		        		if(obj.documentName == e.currentTarget.nextSibling.innerText){
		        			
		        			deleteGridRow(obj);	  
		        		}
		        	});
		        	$.each(docsJSon3, function(i, obj){
		        		if(obj.documentName == e.currentTarget.nextSibling.innerText){
		        			
		        			deleteGridRow(obj);	  
		        		}
		        	});
		        	
		        }else{
		        
		        
		        var data = $("#grid").jqGrid('getGridParam', 'data');
	for (var i = 0; i < data.length; i++) {
		
			if(data[i].Document_Name == e.currentTarget.nextSibling.innerText){
				 $('#grid').jqGrid('delRowData',data[i].id);
			}
	   		
	    }

		        
		        	
		        	
		        }
	        	});
	        	
	        	
	        	/*alert(JSON.stringify(av));
	        	$.each(av, function(i, obj){
	        		
	        		if(!obj.documentName == e.currentTarget.nextSibling.innerText){
	        			abc.push(obj);
	        			jqgridHandler.loadjQGrid(abc);
	        		}
	        	});*/
	        	
	        },
exportToGrid : function(){
	jqgridHandler.loadjQGrid(abc);
	
}
	
}
function fnExcelReport() {

    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Documents Sheet</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('.ui-jqgrid-htable').html();
    tab_text = tab_text + $('#grid').html();
    tab_text = tab_text + '</table></body></html>';

    var data_type = 'data:application/vnd.ms-excel';

    $('#test').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
    $('#test').attr('download', 'Test file.xlsx');

}
function deleteGridRow(obj){
	
	var p = $('#grid').getGridParam();
    if (p.data){
        var newData = {Document_No: obj.atcCode, Document_Name: obj.documentName,UTC_Type:obj.utcCode,Arctefact_Type:obj.atcCode+"xxx/"+obj.utcCode+"-"+obj.docid+"/xxx"};
        var rowId = $.jgrid.randId();
        $("#grid").jqGrid('addRowData', rowId, newData);
        
    }
}
function unloadPopupBox() {	// TO Unload the Popupbox
	$('#popup_box').fadeOut("slow");
	$("#container").css({ // this is just for style		
		"opacity": "1"  
	}); 
}	

function loadPopupBox() {	// To Load the Popupbox
	$('#popup_box').fadeIn("slow");
	$("#container").css({ // this is just for style
		"opacity": "0.3"  
	}); 		
}