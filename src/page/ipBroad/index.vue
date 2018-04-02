<template>
  <div >
    <left-phone></left-phone>

    <div class="middleCon">

      <div class="module">
        <ul class="nav nav-justified choose" data-name="title">
          <li class="on">全部</li>
          <li>分组</li>
        </ul>
        <div data-name="con">
          <div class="moduleList" id="height01">
            <div class="singleM" v-for="item in deviceList">
              <div class="moduleStyle"
                   :class="returnClass(item.deviceState)"
                   @click="itemClick($event, item)">
                <div class="moduleNum">
                  {{ item.userID}}
                  <span v-if="item.calleeNumber || item.callerNumber">
                    {{ item.calleeNumber ? item.calleeNumber : item.callerNumber}}
                  </span>
                </div>
                <div class="moduleKind">语音终端</div>
                <div class="moduleState">{{ returnState(item.deviceState) }}</div>
              </div>
            </div>
          </div>
          <div class="moduleList">
            <div class="department">
              <ul data-name="title">
                <li class="on">部门一</li>
                <li>部门二</li>
              </ul>
            </div>
            <div class="rightDetailList" data-name="con">
              <div class="departDetail">
                <div class="detailCon">
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                </div>
                <div class="selectAll">全部选择</div>
              </div>
              <div class="departDetail">
                <div class="detailCon">
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">800</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">6001</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>

                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                </div>
                <div class="selectAll">全部选择</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <playList v-if="playListShow"  @closeDialog="close"></playList>



      <div class="functionMenu">
        <ul class="nav nav-justified menuList">
          <li id="a2" @click="shout"><i class="fa fa-bullhorn fa-2x" aria-hidden="true"></i><span>喊话</span></li>
          <li id="a3" @click="play"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i><span>播放</span></li>
          <li id="a4" @click="allOver"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i><span>全部结束</span></li>
        </ul>
      </div>
    </div>

    <right-phone></right-phone>
    <switchs></switchs>

    <div class="playList">
      <i class="fa fa-chevron-right" aria-hidden="true"  @click="close"></i>
      <div class="listTitle">播放设备列表</div>
      <div class="musicList" id="end">
        <div v-for="item in selectPhone" class="singleFlies selectDelate" @click="removeItem(item)">
          {{ item.userExten }}
        </div>
      </div>
      <div class="selectAll" @click="removeAll">全部移除</div>
    </div>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights,itemClicks} from 'utils/page/ipBroad'
  import { mapGetters,mapActions } from 'vuex'
  import playList from './playList.vue'
  import {leftPhone, rightPhone,switchs} from 'components'

  export default {
    data() {
      return {
        selectPhone: [],
        playListShow: false,     //播放列表显示切换
      }
    },
    components: {
      leftPhone,
      rightPhone,
      switchs,
      playList
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    computed: {
      ...mapGetters([
        'dialogShow',
        'vertoHandle',           // verto初始化
        'group_users',           // 分组设备(不包括当前用户)
        'deviceList',                       // 所有设备
        'currentLoginUser'  // 当前用户
      ]),
    },
    methods: {

      itemClick(e, row) {
        let _this = this
        let target = e.currentTarget
        if($(target).hasClass('online')) {
          if($(target).hasClass("onlineSelected") ){
            $(target).removeClass("onlineSelected")
            this.selectPhone.forEach(function(s,i) {
              if(s.userID == row.userID) {
                _this.selectPhone.splice(i, 1)
              }
            })
          }else {
            $(target).addClass("onlineSelected");
            $(".playList").removeClass("ListHide").addClass("ListShow");
            this.selectPhone.push(row)
          }
        }

      },
      play() {
        this.playListShow = true
        this.$nextTick(function(){
          $('.playMenu').removeClass('Hide').addClass('Show');

        })
      },
      close() {
        $('.playMenu').removeClass('Show').addClass('Hide');
        this.playListShow = false

      },
      removeItem(event) {
        let _this = this
        this.selectPhone.forEach(function(s,i) {
          if(s.userID == event.userID) {
            _this.selectPhone.splice(i, 1)
          }
        })
        this.group_users.forEach(function(g, i) {
          if(g.userExten == event.userExten) {
            $('#height01 .singleM').eq(i).find('.moduleStyle').removeClass("onlineSelected")
            debugger
          }
        })
      },
      removeAll() {
        if(this.selectPhone.length != 0) {
          this.selectPhone = []
          this.group_users.forEach(function (g, i) {
            $('#height01 .singleM').eq(i).find('.moduleStyle').removeClass("onlineSelected")
          })
        }
      },
      shout() {
        // 对播放列表的设备进行喊话
        this.selectPhone
      },
      allOver() {
        // 结束全部喊话和播放

      }
    }
  }
</script>

<style scoped>

</style>
