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

      <playList v-if="playListShow"  @closeDialog="close(2)"></playList>



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
      <i class="fa fa-chevron-right" aria-hidden="true"  @click="close(1)"></i>
      <div class="listTitle">播放设备列表</div>
      <div class="musicList" id="end">
        <div v-for="item in selectPhone" class="singleFlies selectDelate" @click="removeItem(item)">
          {{ item.userID }}
        </div>
      </div>
      <div class="selectAll" @click="removeAll">全部移除</div>
    </div>
    <callDivert v-if="phoneShow"></callDivert>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights,itemClicks} from 'utils/page/ipBroad'
  import { mapGetters,mapActions } from 'vuex'
  import playList from './playList.vue'
  import {leftPhone, rightPhone,switchs,callDivert} from 'components'

  export default {
    data() {
      return {
        selectPhone: [],
        name: '3000' + '-' + window.location.hostname,
        playListShow: false,     //播放列表显示切换
      }
    },
    components: {
      leftPhone,
      rightPhone,
      switchs,
      playList,
      callDivert
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    computed: {
      ...mapGetters([
        'phoneShow',
        'vertoHandle',           // verto初始化
        'deviceList',                       // 所有设备
        'currentLoginUser',  // 当前用户
	'callQueue'
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
      close(type) {
        if(type == 1) {
          $('.playList').removeClass("ListShow").addClass("ListHide");
        }else {
          $('.playMenu').removeClass('Show').addClass('Hide');
          this.playListShow = false
        }
      },
      removeItem(event) {
        let _this = this
        this.selectPhone.forEach(function(s,i) {
          if(s.userID == event.userID) {
            _this.selectPhone.splice(i, 1)
          }
        })
        this.deviceList.forEach(function(g, i) {
          if(g.userID == event.userID) {
            $('#height01 .singleM').eq(i).find('.moduleStyle').removeClass("onlineSelected")
          }
        })
      },
      removeAll() {
        if(this.selectPhone.length != 0) {
          this.selectPhone = []
          this.deviceList.forEach(function (g, i) {
            $('#height01 .singleM').eq(i).find('.moduleStyle').removeClass("onlineSelected")
          })
        }
      },

      shout() {
        // 喊话
        const laChannelName = this.getChannelName("liveArray");

        if(this.selectPhone.length != 0) {
	  //this.fsAPI('conference',this.name + ' ' + 'bgdial' + ' ' + "user/9000")
	  this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: '3000',
          caller_id_name: '9000',
          caller_id_number: '9000',
          outgoingBandwidth: 'default',
          incomingBandwidth: 'default',
          useStereo: true,
          dedEnc: false,
          tag: "video-container",
          deviceParams: {
            useMic: "any",
            useSpeak: "any",
            useCamera: "any"
          }
          })
          //  批量邀请设备开始会议
          this.selectPhone.forEach(function(s, i){
            var op =   this.name + '+flags{mute}'+  " " + "bgdial" + " " + "user/"+this.selectPhone[i].userID
	    console.log("************************************************",op)
            this.fsAPI("conference",op,
              function(res){
		console.log("邀请返回*********************************")
              });
          }.bind(this))

          //  重置勾选话机数组
          this.selectPhone = []

          // 创建会议室
          this.broadcast(laChannelName, {
            liveArray: {
              command: "bootstrap",
              context: laChannelName,
              name: this.name,
              obj: {}
            }
          });
        }
      },
      broadcast(channel, params) {

        let msg = {
          eventChannel: channel,
          data: {}
        }

        for (var i in params) {
          msg.data[i] = params[i]
        }
        this.vertoHandle.sendMethod("verto.broadcast", msg);
      },
      getChannelName(what) { // liveArray chat mod
        return "conference-" + what + "." + this.name + "@" + window.location.hostname
      },
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi", {
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
      allOver() {
        // 结束全部喊话和播放

      }
    }
  }
</script>

<style scoped>

</style>
