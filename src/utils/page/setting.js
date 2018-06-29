import BScroll from 'better-scroll'
export function getHeights() {
	//  高度判断
	  var contentHeight = $(window).height() ;
	  var tableHeight = contentHeight - $(".tableTool").outerHeight(); 
	  $(".content").slimScroll({
	      height: tableHeight 
	  });
}
