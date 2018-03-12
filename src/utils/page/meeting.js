export function getHeights() {

  //弹窗内元素高度判断
  var datailListHeight;//弹窗设备显示区1
  var datailDetailHeight;//弹窗设备显示区2
  datailListHeight = $(".popUpbig").outerHeight(true) - $(".btnDiv").outerHeight(true);
  datailDetailHeight = $(".popUpbig").outerHeight() * 0.9 / 2 - $(".selectAll").outerHeight() - 50;
  $(".detailList").slimScroll({
    height: datailListHeight
  })
  $(".detailCon").slimScroll({
    height: datailDetailHeight
  })
  $(".detailCon").slimScroll({
    height: datailDetailHeight
  })
//中间设备显示高度
  var moduleList;
  moduleList = ($(window).height() - 80 - $(".functionMenu").outerHeight() * 2) / 2;
  $(".moduleList").slimScroll({
    height: moduleList
  })
}

export function itemClick(e) {
  let target = e.currentTarget
  if($(target).hasClass('online')) {
    debugger
    if($(target).hasClass("onlineSelected")) {
      $(target).removeClass("onlineSelected");
    }else {
      $(target).addClass("onlineSelected");
    }
  }else if($(target).hasClass("calling")) {
    if($(target).hasClass("callingSelected")) {
      $(target).removeClass("callingSelected");
    }else {
      $(target).addClass("callingSelected");
    }
  }else if($(target).hasClass("waitting")) {
    if($(target).hasClass("waittingSelected")) {
      $(target).removeClass("waittingSelected");
    }else {
      $(target).addClass("waittingSelected");
    }
  }

}

export function isArray(obj) {
  if(Array.isArray){
    return Array.isArray(obj);
  }else{
    return Object.prototype.toString.call(obj) === "[object Array]";
  }
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}
