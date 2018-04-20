<template>
  <div>
    <div class="content" >
      <div class="groupList">
        <div class="menuType">
          <i class="fa fa-list-ul" aria-hidden="true"></i>设备组列表
          <p @click="addgroup()"><i class="fa fa-plus" aria-hidden="true"></i></p>
        </div>
        <form>
          <input type="text" class="form-control form-lighter" placeholder="快速查找组" />
        </form>
        <!--<ul id="height01" class="devGroup">
          <li v-for="(item , index) in groupLength" >
            <p :contenteditable="p" v-model="groupName">{{index}}</p>
            <ul>
              <li><i class="fa fa-edit" @click="changeName(index)"></i></li>
              <li><i class="fa fa-times" @click="displayPop(index)" ></i></li>
            </ul>
          </li>

        </ul>-->
        <ul id="height01" class="devGroup">
          <li>
            <p></p>
            <ul>
              <li><i class="fa fa-edit"></i></li>
              <li><i class="fa fa-times" ></i></li>
            </ul>
          </li>

        </ul>
      </div>
      <div class="singleDevice ">
        <div class="menuType">
          <i class="fa fa-list-ul" aria-hidden="true"></i>组成员
          <p onclick="display();"><i class="fa fa-plus" aria-hidden="true"></i>添加设备</p>
        </div>
        <div class="removeDev">
          <button class="btn btn-sm btn-danger" type="button">全部移除</button>
        </div>
        <div class="musicList">
          <div id="groupMember" class="aa">
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">1<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">2<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">3<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">4<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">5<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">6<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">7<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">8<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">9<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">10<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">11<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">12<span>十堰收费站1号亭</span></div>
          </div>
        </div>
      </div>
      <div class="allDevice ">
        <div class="menuType">
          <i class="fa fa-list-ul" aria-hidden="true"></i>设备列表
          <p>全部添加</p>
        </div>
        <form style="padding:5px 10px">
          <input type="text" class="form-control form-lighter" placeholder="快速查找设备" />
        </form>
        <div class="musicList" id="height02">
          <div id="SelectedMembers" class="aa">
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies selected">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
            <div class="singleFlies ">700<span>十堰收费站1号亭</span></div>
          </div>
        </div>
        <div class="sidder" onclick="Devhidden();"><i class="fa fa-2x fa-angle-double-right"></i><span>收起</span></div>
      </div>
    </div>
    <div>
      <div class="popUp" >
        <p>确定删除吗？</p>
        <div class="btn">
          <button type="button" class="btn btn-info">确定</button>
          <button type="button" class="btn btn-default">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  function display() {
    $(".singleDevice").removeClass("moveRightMiddle").addClass("moveLeftMiddle");
    $(".allDevice").removeClass("moveRightDev").addClass("moveLeftDev");
  }
  function Devhidden() {
    $(".singleDevice").removeClass("moveLeftMiddle").addClass("moveRightMiddle");
    $(".allDevice").removeClass("moveLeftDev").addClass("moveRightDev");
  }
</script>
<script>
  $(function height () {
    //高度判断
    var contentHeight = $(window).height() - 184;
    $("#height01").height(contentHeight);
    $("#height02").height(contentHeight);
  })
</script>
