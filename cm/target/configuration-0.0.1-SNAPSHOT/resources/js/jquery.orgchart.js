$("#selectMenu").hide();
var nodetype;
var prjCount=2;
var sitCount=3;
(function($) {
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);        
    }

    $.fn.orgChart.defaults = {
        data: [{id:1, name:'Root', parent: 0}],
        showControls: false,
        allowEdit: false,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: '&nbsp;'
    };
   

    function OrgChart($container, opts){
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function(){
            $container.empty().append(rootNodes[0].render(opts));
            $container.find('.node').click(function(){
                if(self.opts.onClickNode !== null){
                    self.opts.onClickNode(nodes[$(this).attr('node-id')]);
                }
            });

            if(opts.allowEdit){
                $container.find('.node h2').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId);
                    e.stopPropagation();
                });
            }

            // add "add button" listener
            $container.find('.org-add-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onAddNode !== null){
                    self.opts.onAddNode(nodes[thisId]);
                }
                else{
                    self.newNode(thisId);
                }
                e.stopPropagation();
            });
    	   $('#org-list-button').click(function(e){
    		   
    		   $.getJSON('obstreperus/orgchart/loadCustomers',function(data){
    			  
					for(var i=0;i<data.length;i++){
						$("#selectMenu").append("<option value='"+data[i].customerId+"'>"+data[i].customerName+"</option>");
					}
					
    		   });
//    		   $("#selectMenu").append("<option value='CUS-901-001'>Vekomy</option><option value='CUS-103-001'>Reliance</option>");
    		   $("#selectMenu").show();
    		   $("#filter").show();
    		   $(".drpCss").show();
            });
//		$(document).live("click","#selectMenu",function(){
    	   $("#selectMenu").click(function(){
			
			if($(this).val() == "CUS-901-001"){
				
		         var testData = [
		        {id: 1, name: 'CUS',uid:'CUS-901-001', parent: 0},
		        {id: 2, name: 'PRJ',uid:'PRJ-901-001', parent: 1},
		        {id: 3, name: 'PRJ',uid:'PRJ-901-002', parent: 1},
		        {id: 4, name: 'SIT',uid:'SIT-103-001', parent: 1},
		        {id: 5, name: 'SIT',uid:'SIT-103-002', parent: 1},
		        {id: 6, name: 'SIT',uid:'SIT-103-003', parent: 1},
		        {id: 7, name: 'SOL',uid:'SOL-901-001', parent: 4},
		        {id: 8, name: 'SOL',uid:'SOL-901-002', parent: 4},
		        {id: 9, name: 'SOL',uid:'SOL-901-003', parent: 5},
		        {id: 10, name: 'SOL',uid:'SOL-901-004', parent: 6},
		        {id: 11, name: 'PRD',uid:'PRD-150-001', parent: 7},
		        {id: 12, name: 'CSA',uid:'CSA-901-001', parent: 7},
		        {id: 13, name: 'SWC',uid:'SWC-901-001', parent: 12},
		        {id: 14, name: '3PP',uid:'3PP-320-001', parent: 8},
		        {id: 15, name: 'PRD',uid:'PRD-150-002', parent: 8},
		        {id: 16, name: '3PP',uid:'3PP-320-001', parent: 9},
		        {id: 17, name: 'CSA',uid:'CSA-901-002', parent: 9},
		        {id: 18, name: '3PP',uid:'3PP-320-001', parent: 10},
		        
		    ];
		    $(function(){
		        org_chart = $('#orgChart').orgChart({
		            data: testData,
		            showControls: true,
		            allowEdit: true,
		            onAddNode: function(node){ 
//		                log('Created new node on node '+node.data.id);
		            	console.log(data);
		            	loadPopupBox();
		           /* 	$("input:radio[name=sitprj]").click(function(){
		            		// alert($(this).val());
		            			if($(this).val() == "SIT"){
		            				console.log(rootNodes);
		            				nodetype = "SIT";
		            				org_chart.newNode(node.data.id); 
		            			}else{
		            				nodetype = "PRJ";
		            				org_chart.newNode(node.data.id); 
		            			}
		            			unloadPopupBox();
		            		});*/
//		                org_chart.newNode(node.data.id);
		                
		            },
		            onDeleteNode: function(node){
//		                log('Deleted node '+node.data.id);
		                org_chart.deleteNode(node.data.id); 
		            },
		            onClickNode: function(node){
		            
//		                log('Clicked node '+node.data.id);
		            }

		        });
		    });
		}else if($(this).val() == "CUS-103-001"){
		         var testData = [
		          {id: 1, name: 'CUS',uid:'CUS-103-001', parent: 0},
		        {id: 2, name: 'BDP',uid:'BDP-103-001', parent: 1},
		        {id: 3, name: 'SIT',uid:'SIT-123-001', parent: 1},
		        {id: 4, name: 'SOL',uid:'SOL-103-001', parent: 3},
		        
		        
		    ];
		    $(function(){
		        org_chart = $('#orgChart').orgChart({
		            data: testData,
		            showControls: true,
		            allowEdit: true,
		            onAddNode: function(node){ 
//		                log('Created new node on node '+node.data.id);
		                org_chart.newNode(node.data.id); 
		               
		            },
		            onDeleteNode: function(node){
//		                log('Deleted node '+node.data.id);
		                org_chart.deleteNode(node.data.id); 
		            },
		            onClickNode: function(node){
//		                log('Clicked node '+node.data.id);
		            }

		        });
		    });
		}
	$(this).hide();
});	
            $container.find('.org-del-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onDeleteNode !== null){
                    self.opts.onDeleteNode(nodes[thisId]);
                }
                else{
                    self.deleteNode(thisId);
                }
                e.stopPropagation();
            });
        }

        this.startEdit = function(id){
            var inputElement = $('<input class="org-input" type="text" value="'+nodes[id].data.name+'"/>');
            $container.find('div[node-id='+id+'] h2').replaceWith(inputElement);
            var commitChange = function(){
                var h2Element = $('<h2>'+nodes[id].data.name+'</h2>');
                if(opts.allowEdit){
                    h2Element.click(function(){
                        self.startEdit(id);
                    })
                }
                inputElement.replaceWith(h2Element);
            }  
            inputElement.focus();
            inputElement.keyup(function(event){
                if(event.which == 13){
                    commitChange();
                }
                else{
                    nodes[id].data.name = inputElement.val();
                }
            });
            inputElement.blur(function(event){
                commitChange();
            })
        }

        this.newNode = function(parentId){
            var nextId = Object.keys(nodes).length;
            while(nextId in nodes){
                nextId++;
            }
            if(nodetype=="SIT"){
            	self.addNode({id: nextId, name: 'SIT', parent: parentId});
            }else if(nodetype=="PRJ"){
            	self.addNode({id: nextId, name: 'PRJ', parent: parentId});
            }else{
            	self.addNode({id: nextId, name: '', parent: parentId});	
            }
            
        }

        this.addNode = function(data){
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);

            self.draw();
            self.startEdit(data.id);
        }

        this.deleteNode = function(id){
            for(var i=0;i<nodes[id].children.length;i++){
                self.deleteNode(nodes[id].children[i].data.id);
            }
            nodes[nodes[id].data.parent].removeChild(id);
            delete nodes[id];
            self.draw();
        }

        this.getData = function(){
            var outData = [];
            for(var i in nodes){
                outData.push(nodes[i].data);
            }
            return outData;
        }

        // constructor
        for(var i in data){
            var node = new Node(data[i]);
            nodes[data[i].id] = node;
        }

        // generate parent child tree
        for(var i in nodes){
            if(nodes[i].data.parent == 0){
                rootNodes.push(nodes[i]);
            }
            else{
                nodes[nodes[i].data.parent].addChild(nodes[i]);
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data){
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode){
            this.children.push(childNode);
        }

        this.removeChild = function(id){
            for(var i=0;i<self.children.length;i++){
                if(self.children[i].data.id == id){
                    self.children.splice(i,1);
                    return;
                }
            }
        }

        this.render = function(opts){
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
            var nodeColspan = childLength>0?2*childLength:2;
            mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

            if(childLength > 0){
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

                var linesCols = '';
                for(var i=0;i<childLength;i++){
                    if(childLength==1){
                        linesCols += "<td class='line left half'></td>";    // keep vertical lines aligned if there's only 1 child
                    }
                    else if(i==0){
                        linesCols += "<td class='line left'></td>";     // the first cell doesn't have a line in the top
                    }
                    else{
                        linesCols += "<td class='line left top'></td>";
                    }

                    if(childLength==1){
                        linesCols += "<td class='line right half'></td>";
                    }
                    else if(i==childLength-1){
                        linesCols += "<td class='line right'></td>";
                    }
                    else{
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

                mainTable += "<tr>";
                for(var i in self.children){
                    mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts){
            var nameString = '',
                descString = '';
            if(typeof data.name !== 'undefined'){
            	if(self.data.uid == undefined){
            		if(self.data.name == "SIT"){
            				sitCount = sitCount+1;
            			nameString = '<h2>SIT</h2><h6 class="node-h6">'+"SIT-103-00"+sitCount+'</h6>';
            		}else if(self.data.name == "PRJ"){
            			prjCount = prjCount+1;
            			nameString = '<h2>PRJ</h2><h6 class="node-h6">'+"PRJ-901-00"+prjCount+'</h6>';	
            		}
            			
            	}else{
            		nameString = '<h2>'+self.data.name+'</h2><h6 class="node-h6">'+self.data.uid+'</h6>';
            	}
                
            }
            if(typeof data.description !== 'undefined'){
            	
                descString = '<p>'+self.data.description+'</p>';
            }
            
            
            if(opts.showControls){
            	
            		var buttonsHtml = "<div class='org-add-button'>"+opts.newNodeText+"</div><div class='org-del-button'></div>";	
            	
                
            }
            else{
                buttonsHtml = '';
            }
            if(this.data.id == 1){
            	
            	var buttonsHtml = "<div class='org-add-button'>"+opts.newNodeText+"</div><div id='org-list-button'></div><div class='org-del-button'></div><div class='org-del-button'></div><div class='drpCss'><span><input type='text' id='filter' /></span><select id='selectMenu' size='4'></select></div>";
            	return "<div class='node' node-id='"+this.data.id+"'>"+nameString+descString+buttonsHtml+"</div>";
            }else{
            	return "<div class='node' node-id='"+this.data.id+"'>"+nameString+descString+buttonsHtml+"</div>";	
            }
            
        }
    }

})(jQuery);

