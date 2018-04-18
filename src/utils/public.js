/** 2018-1-16
 * author: Legal High
 * function: 全局公用方法
 */
import vue from 'vue'

// 1、公用分页切换方法
vue.prototype.tabClick = function (e) {
  $(e.target).addClass('on').siblings().removeClass('on');
  var index = $('[data-name=title]').children().index(e.target);
  $('[data-name=con]').children().eq(index).show().siblings().hide();
}

/*// 2、公用按钮点击方法
vue.prototype.itemClick = function(e) {
  let target = e.currentTarget
  if ($(target).hasClass("online")) {
    $(".calling").removeClass("callingSelected");
    $(".waitting").removeClass("waittingSelected");
    $(".calling01").removeClass("callingSelected");
    $("ul.menuList li").removeClass("disabled");
    $("#a3").addClass("disabled");
    $("#a4").addClass("disabled");
    $("#a5").addClass("disabled");
    $("#a6").addClass("disabled");
    $("#a7").addClass("disabled");
    $("#a8").addClass("disabled");
    $(target).addClass("onlineSelected");
    var txt = $(target).children(".moduleNum").text();
    var dd = "<div class='singleFlies selectDelate'>" + txt + "</div>";
    $("#end").append(dd);
    $(".playList").removeClass("ListHide").addClass("ListShow");
  }
  else if ($(target).hasClass("calling")) {
    $(".online").removeClass("onlineSelected");
    $(".waitting").removeClass("waittingSelected");
    $(".calling01").removeClass("callingSelected");
    $("ul.menuList li").removeClass("disabled");
    $("#a1").addClass("disabled");
    $("#a2").addClass("disabled");
    $("#a6").addClass("disabled");
    $("#a7").addClass("disabled");
    $("#a8").addClass("disabled");
    $(target).addClass("callingSelected");
    $(".playList").removeClass("ListShow").addClass("ListHide");
  }
  else if ($(target).hasClass("calling01")) {
    $(".online").removeClass("onlineSelected");
    $(".waitting").removeClass("waittingSelected");
    $(".calling").removeClass("callingSelected");
    $("ul.menuList li").removeClass("disabled");
    $("#a1").addClass("disabled");
    $("#a2").addClass("disabled");
    $("#a3").addClass("disabled");
    $("#a4").addClass("disabled");
    $("#a5").addClass("disabled");
    $("#a6").addClass("disabled");
    $(target).addClass("callingSelected");
    $(".playList").removeClass("ListShow").addClass("ListHide");
  }
  else if ($(target).hasClass("waitting")) {
    $(".online").removeClass("onlineSelected");
    $(".calling").removeClass("callingSelected");
    $(".calling01").removeClass("callingSelected");
    $("ul.menuList li").removeClass("disabled");
    $("#a1").addClass("disabled");
    $("#a2").addClass("disabled");
    $("#a3").addClass("disabled");
    $("#a4").addClass("disabled");
    $("#a5").addClass("disabled");
    $("#a7").addClass("disabled");
    $("#a8").addClass("disabled");
    $(target).addClass("waittingSelected");
    $(".playList").removeClass("ListShow").addClass("ListHide");
  }
}*/

// 3、公用表格单行点击方法
vue.prototype.TrClick = function(index) {
  debugger
  console.log($(".table>tbody>tr"))
  $(".table>tbody>tr").eq(index).toggleClass("selected")
}

