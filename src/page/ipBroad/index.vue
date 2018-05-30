<template>
  <div >
<left-phone  :select-phone="selectPhone" ></left-phone>
    <div class="middleCon">

      <div class="module">
        <ul class="nav nav-justified choose" data-name="title">
          <li class="on">全部</li>
          <li @click="refresh(userGroup[0])">分组</li>
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
		<div class="moduleState">{{ returnState(item.deviceState)  + "   " + ((item.timer.s>0 || item.timer.m>0 || item.timer.h>0)?
                        ((item.timer.h/10<1?"0"+item.timer.h+":":item.timer.h+":")+
                        (item.timer.m/10<1?"0"+item.timer.m+":":item.timer.m+":")+
			(item.timer.s/10<1?"0"+Math.floor(item.timer.s):Math.floor(item.timer.s))):"")}}
              </div>
              </div>
            </div>
          </div>
          <div class="moduleList">
            <div class="department">
              <ul data-name="title">
		<li
                @click="refresh(item)"
		:class="{on: item.selected}"
                 v-for='item in userGroup'>{{ item.name }}</li>
              </ul>
            </div>
            <div class="rightDetailList" data-name="con">
              <div class="departDetail">
                <div class="detailCon">
		<div class="singleM" v-show="returnGroup(item)" v-for="item in deviceList">
                    <div 
                      class = "moduleStyle"
                      :class="returnClass(item.deviceState)" 
                      @click.stop="itemClick($event, item)" >
                      <div class="moduleNum">{{ item.userID }}</div>
                      <div class="moduleKind">{{item.type == 1 ? "话机设备" : "视频设备" }}</div>
			<div class="moduleState">{{ returnState(item.deviceState)  + "   " + ((item.timer.s>0 || item.timer.m>0 || item.timer.h>0)?
                        ((item.timer.h/10<1?"0"+item.timer.h+":":item.timer.h+":")+
                        (item.timer.m/10<1?"0"+item.timer.m+":":item.timer.m+":")+
			(item.timer.s/10<1?"0"+Math.floor(item.timer.s):Math.floor(item.timer.s))):"")}}
              </div>
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
          <li id="a1" @click="tmute" @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i><span>管理员静音</span></li>
          <li id="a2" @click="shout" @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-bullhorn fa-2x" aria-hidden="true"></i><span>喊话</span></li>
          <li id="a3" @click="play" @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i><span>播放</span></li>
          <li id="a4" @click="allOver" @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i><span>全部结束</span></li>
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
    watch:{},
    data() {
      this.deviceList
      return {
        selectPhone: [],
        name: '9111' + '-' + window.location.hostname,
        playListShow: false,     //播放列表显示切换
	groupShow:""
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
	'callQueue',
	'userGroup',
	'confIpBoard'
      ]),
    },
    methods: {
      returnGroup(item){
      return item.groupid.some((it)=>{return it==this.groupShow})
    },
    returnClass(status){
      switch(status){
        case "registered":
          return "online"
          break
        case "unregistered":
          return "offline"
          break
        case "ringing":
          return "waitting"
          break
        case "active":
          return "calling"
          break
        case "register":
          return "online"
          break
      }
    },
    returnState(status){
      switch(status){
        case "registered":
          return "在线"
          break
        case "unregistered":
          return "离线"
          break
        case "ringing":
          return "振铃"
          break
        case "active":
          return "通话中"
          break
        case "register":
          return "在线"
          break
      }
    },
    refresh (item) {
      this.userGroup.forEach((r, i) => {
              r.selected = false
            })
      item.selected = true
      this.groupShow = item.deviceGroupId
    },
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
          destination_number: '9111',
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
	  //$('.onlineSelected').removeClass('onlineSelected').addClass('online')

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

	this.fsAPI('conference','9111-scc.ieyeplus.com'+' '+'hup'+' '+'all')
	this.selectPhone = []
	$('.onlineSelected').removeClass('onlineSelected').addClass('online')
      },
      tmute(){
        this.confIpBoard.forEach((item,index)=>{	
	if(item.caller_id_number=='9000')
	this.fsAPI('conference','9111-scc.ieyeplus.com'+' '+'tmute'+' '+item.conf_id)
	})
	}
    }
  }
</script>

<style scoped>

</style>
