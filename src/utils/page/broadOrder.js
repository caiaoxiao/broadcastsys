export function getHeights() {
  //高度判断
  var contentHeight = $(window).height() - 130;
  var windowHeight = $(window).height();
  var maxHeight = windowHeight - $(".menubanner").outerHeight(); 
  var contentHeight = $(".content").outerHeight()
        if(contentHeight > maxHeight)
       {   
         $(".content").css('height',contentHeight)
       }   
    $("#textarea01").height(contentHeight - 300)
	  $("#songListHeight").slimScroll({
		      height: contentHeight  - 320
		    });
	  $(".gaodu>ul").slimScroll({
		      height: contentHeight / 2 - 220
		    });

	  $("#height07").slimScroll({
		      height: contentHeight / 2 - 220
		    });
	  $("#height04").slimScroll({
		      height: contentHeight / 2 - 170
		    });
	  $("#height05").slimScroll({
		      height: contentHeight / 2 - 170
		    });
	  $("#height06").slimScroll({
		      height: contentHeight / 2 - 170
		    });
	  $("#height08").slimScroll({
		      height: contentHeight - 138
		    });
	  $("#height09").slimScroll({
		      height: contentHeight - 257
		    });
}
