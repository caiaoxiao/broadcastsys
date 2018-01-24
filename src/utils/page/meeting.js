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
