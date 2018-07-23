import BScroll from 'better-scroll'
export function getHeights() {
	//  高度判断
	  var windowHeight = $(window).height();
	  var maxHeight = windowHeight - $(".sysName").outerHeight(); 
	  var contentHeight = $(".content").outerHeight()
	  var popUp = $(".popUp")
	  var popUpHeight = 0
	  if (popUp!=undefined){
	  popUpHeight = popUp.offsetTop + popUp.offsetHeight
          contentHeight = Math.max( contentHeight,popUpHeight)
	  }
	  
	  if(contentHeight > maxHeight)
	{
		  $(".content").css('height',maxHeight)
	}
}
