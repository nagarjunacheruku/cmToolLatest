<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Configuration Management Tool</title>
<jsp:include page="csslinks.jsp" />

 <style type="text/css">
  #getjson {
    width: 100px;
    height: 50px;
    border-radius: 3px;
    margin-left: 20px;
    margin-top: 20px;
    float: left;
  }
  /*
#chart{
    height: 300px;
    overflow: scroll;
    width: 500px;
    resize:both;
overflow:auto;
}
*/
  
  ul#upload-chart {
    float: right;
    list-style: none outside none;
  }
  
  ul#upload-chart li {
    background: none repeat scroll 0 0 #ECDC20;
    border: 1px solid #808080;
    border-radius: 2px;
    height: 44px;
    margin-top: 2px;
    padding-top: 5px;
    width: 200px;
  }
  </style>
</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
       <jsp:include page="header.jsp" />

        <div id="page-wrapper">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa"></i> Configuration Management Structure</h3>
                            </div>
                          <div class="panel-body divHeight p0">
                           <div id="orgChartContainer" class="divHeight">
     					 <div id="orgChart" class="orgchartDivHeight" ></div>
    						</div>                        
                            </div>
                            <div id="popup_box">	<!-- OUR PopupBox DIV-->
<form>
  <input type="radio" name="sitprj" value="CUS" checked> CUS
  <br>
  <input type="radio" name="sitprj" value="PRJ"> PRJ
  <br>
  <input type="radio" name="sitprj" value="SIT"> SIT
  <br>
  <input type="radio" name="sitprj" value="SOL"> SOL
  <br>
  <input type="radio" name="sitprj" value="PRD"> PRD
  <br>
  <input type="radio" name="sitprj" value="CSA"> CSA
  <br>
  <input type="radio" name="sitprj" value="3PP"> 3PP
  <br>
  <input type="radio" name="sitprj" value="SWC"> SWC
</form> 
	<a id="popupBoxClose">Close</a>	
</div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa"></i> Documents</h3>
                            </div>
                            <div class="panel-body documents">
                              <div class="">
  									<div class="docFields">
  
  									</div>
  								</div>	
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
                <!-- Morris Charts -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa"></i> Grid View</h3>
                            </div>
                            <div class="panel-body">
                              <table id="grid"></table>
                                <a href='#' id='test' onClick='javascript:fnExcelReport();'>Export to Excel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->

        </div>  
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
<%--     <script src="<%=request.getContextPath()%>/resources/js/jquery.js"></script> --%>
      <jsp:include page="jslinks.jsp"/>
         <script type="text/javascript">
    var testData = [
        {id: 1, name: 'CUS',uid:'CUS-xxx-000', parent: 0},
       
        
       
        
    ];
    $(function(){
        org_chart = $('#orgChart').orgChart({
            data: testData,
            showControls: true,
            allowEdit: true,
            onAddNode: function(node){ 
//                 log('Created new node on node '+node.data.id);
                org_chart.newNode(node.data.id); 
            },
            onDeleteNode: function(node){
//                 log('Deleted node '+node.data.id);
                org_chart.deleteNode(node.data.id); 
            },
            onClickNode: function(node){
//                 log('Clicked node '+node.data.id);
					console.log(node.data.uid);
            }

        });
    });

    // just for example purpose
    function log(text){
        $('#consoleOutput').append('<p>'+text+'</p>')
    }
    </script><script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script >
$(document).ready(function(){
	var data = [];
	jqgridHandler.init(data);	
	$('#popupBoxClose').click( function() {			
		unloadPopupBox();
	});
	
	$('#container').click( function() {
		unloadPopupBox();
	});
	$(".nav").children("li").removeClass("active");
	$("#chart").addClass("active");


});
</script>
<script>
$(document).ready(function() {
	
		$(".navbar-toggle" ).click(function() {  
   $(".side-nav").css("width", "100%");
     
  
});
		
	   
	 $( ".side-nav" )
    .mouseover(function() {
		//alert($('#navbar-header:visible').length);
		//alert($(window).width());
      //$(this).css( "mouse over" );
 if($(window).width()>768){
     $(this).css("width", "225px");
       $("#wrapper").css("padding-left", "225px");
 }
       
    })
    .mouseout(function() {
		//alert($(window).width());
		//alert($('#navbar-header:visible').length);
		 if($(window).width()>768){
     $(this).css("width", "38px");
       $("#wrapper").css("padding-left", "38px");
		 }
    } );
	

    
});
</script>
  


</body>

</html>
