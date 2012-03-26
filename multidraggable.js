/**
 * JQuery MultiDraggable Plugin
 *
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Written by Sudheer Someshwara <sudheer.someshwara@gmail.com>
 *
 * MultiDraggable is a jQuery plugin which extends jQuery UI Draggable to add multi drag and live functionality.
 *
**/
(function ($) {
   $.fn.multiDraggable = function (opts) {
   	var initLeftOffset = []
   	    ,initTopOffset = [];
   	
   	if(opts == "destroy"){
    	return this.each(function(){
			$(this)
				.draggable("destroy")
       			.unbind(".multiDraggable")
       			.data("init","");
       		});
   	}
   	
   	return this.each (function (){
   		 $(this).bind("mouseover.multiDraggable", function() {
		         if (!$(this).data("init")) {
		            $(this).data("init", true).draggable(opts,{
				         start: function (event,ui) {
							var pos = $(this).position();
							
							if (typeof opts.group == "string"){
								opts.group = $(opts.group);
							}
							
							opts.group.not($(this));
							
							if(opts.group.length>0){
								$.each(opts.group || {}, function(key,value) {
									var elemPos = $(value).position();
									initLeftOffset[key] = elemPos.left - pos.left;
									initTopOffset[key] = elemPos.top - pos.top;			
								});
							}
							opts.startNative ? opts.startNative() : {};
						},
						drag: function(event,ui) {
							var pos = $(this).offset();
							
							if(opts.group.length>0){
								$.each(opts.group || {}, function(key,value) {
									$(value).offset({left: pos.left + initLeftOffset[key], 
									top: pos.top + initTopOffset[key]});				
								});
							}
							
							opts.dragNative ? opts.dragNative() : {};
						},
						stop: function(event,ui) {
							var pos = $(this).offset();
							
							if(opts.group.length>0){
								$.each(opts.group || {}, function(key,value) {
									$(value).offset({left: pos.left + initLeftOffset[key], 
									top: pos.top + initTopOffset[key]});								
								});
							}
							
							opts.stopNative ? opts.stopNative() : {};
						},
					});
		        }
	      });
 	 });
   };
 }(jQuery));