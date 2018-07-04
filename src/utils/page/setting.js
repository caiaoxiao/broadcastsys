import BScroll from 'better-scroll'
export function getHeights() {
	//  高度判断
	  var contentHeight = $(window).height();
	  var maxHeight = contentHeight - $(".sysName").outerHeight(); 
	  var contentHeight = $(".content").outerHeight()
	  console.log(maxHeight,contentHeight)
	  if(contentHeight > maxHeight)
	{
		  $(".content").css('height',maxHeight)
	}
}
