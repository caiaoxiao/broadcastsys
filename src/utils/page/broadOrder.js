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
}
