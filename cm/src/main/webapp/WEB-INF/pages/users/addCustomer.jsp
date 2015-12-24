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
                                <h3 class="panel-title"><i class="fa"></i> Add UTC Codes</h3>
                            </div>
                            <div class="panel-body divHeight">
<!-- BEGIN FORM-->
				
				<form id="addUserForm" method="post">
                <ul id="fieldlist">
                            <li>
                        <div class="k-edit-label"><label for="customerId" class="required control-label w140px">Customer Id: </label> </div>
                       <input type="text" id="customerId" name=" Customer Id" class="k-textbox w30p k-state-disabled" placeholder="Customer Id" required validationMessage="Enter {0}"  />
                        
                    </li>
                     <li>
                        <div class="k-edit-label"><label for="customerName" class="required control-label w140px">Customer Name: </label> </div>
                       <input type="text" id="customerName" name=" Customer Name" class="k-textbox  w30p k-state-disabled" placeholder="Customer Name" required validationMessage="Enter {0}"  />
                        
                    </li>
                    <li>
                     <div class="k-edit-label"><label for="utcName" class="required control-label w140px"></label> </div>
                     <button class="k-button k-button-icontext k-primary" id="btnSaveCustomer" >
															<span class="k-icon k-update"></span>Save</button>
															
															 <div class="k-edit-label"><label for="utcName" class="required control-label w140px"></label> </div>
                     <button class="k-button k-button-icontext k-primary btnUTCCustomer" id="btnUpdateCustomer" >
															<span class="k-icon k-update"></span>Update</button>
															 <button class="k-button k-button-icontext k-primary btnUTCCustomer" id="btnDeleteCustomer" >
															<span class="k-icon k-update"></span>Delete</button>
                    </li>
                </ul>
            </form>
				
				
				
								<!-- END FORM-->
                            </div>
                            <div id="popup_box">	<!-- OUR PopupBox DIV-->
<form>
  <input type="radio" name="sitprj" value="SIT" checked> SIT
  <br>
  <input type="radio" name="sitprj" value="PRJ"> PRJ
</form> 
	<a id="popupBoxClose">Close</a>	
</div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa"></i> Search And Update Customer</h3>
                            </div>
                            <div class="panel-body documents">
<!-- BEGIN FORM-->
				
			
			<div class="search-form-default">
							<div class="col-md-12">
								<form action="#">
									<div class="input-group m1t">
										<div class="input-cont">
											<input type="text" id="searchCustomer" placeholder="Search..."
												class="form-control" />
										</div>
										<span class="input-group-btn">
											<button type="button" class="btn blue" id="btnSearchCustomer">
												Search &nbsp; <i class="m-icon-swapright m-icon-white"></i>
											</button>
										</span>
									</div>
								</form>
							</div>
						</div>
													
								<!-- END FORM-->
								
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
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
<%--     <script src="<%=request.getContextPath()%>/resources/js/jquery.js"></script> --%>
         <jsp:include page="jslinks.jsp" />
    <script type="text/javascript">

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
    <script type="text/javascript">

    
$(document).ready(function(){
	var data = [];
	jqgridHandler.init(data);	
	customerHandler.init();
	updateCustomerHandler.init();

	$(".nav").children("li").removeClass("active");
	$("#utc").addClass("active");


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
