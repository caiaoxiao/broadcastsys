<template>
  <div>
    <leftPhone></leftPhone>
    <div class="middleCon">
      <div class="memberList">
        <div class="module">
          <div class="moduleList">

            <div class="singleM">
              <div class="moduleStyle calling ">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling01">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling01">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>

          </div>
        </div>
        <div class="functionMenu">
          <ul class="nav nav-justified menuList">
            <li id="a1"><i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i><span>结束会议</span></li>
            <li id="a2"><i class="fa fa-microphone fa-2x" aria-hidden="true"></i><span>允许发言</span></li>
            <li id="a3"><i class="fa fa-microphone-slash fa-2x" aria-hidden="true"></i><span>禁止发言</span></li>
            <li id="a4"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i><span>踢出会议</span></li>
            <li id="a5"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i><span>会议录音</span></li>
          </ul>
        </div>
      </div>
      <div class="memberList">
        <div class="module">
          <ul class="nav nav-justified choose" data-name="title">
            <li class="on">全部</li>
            <li>分组</li>
          </ul>
          <div data-name="con">
            <div class="moduleList"  >
              <div class="singleM" v-for="item in deviceAll">
                <div class="moduleStyle online " @click.stop="itemClick">
                  <div class="moduleNum">{{ item.userName }}</div>
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
              <div class="singleM">
                <div class="moduleStyle calling " @click.stop="itemClick">
                  <div class="moduleNum">600<span>800</span></div>
                  <div class="moduleKind">
                    视频终端

                  </div>
                  <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
                </div>
              </div>
              <div class="singleM">
                <div class="moduleStyle calling01" @click.stop="itemClick">
                  <div class="moduleNum">600<span>800</span></div>
                  <div class="moduleKind">
                    视频终端
                    <span><img src="../../assets/img/record.gif" /></span>
                  </div>
                  <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
                </div>
              </div>
              <div class="singleM">
                <div class="moduleStyle waitting " @click.stop="itemClick">
                  <div class="moduleNum">600</div>
                  <div class="moduleKind">视频终端</div>
                  <div class="moduleState">振铃中</div>
                </div>
              </div>
              <div class="singleM">
                <div class="moduleStyle offline">
                  <div class="moduleNum">600</div>
                  <div class="moduleKind">视频终端</div>
                  <div class="moduleState">离线</div>
                </div>
              </div>


            </div>
            <div>
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
        <div class="functionMenu">
          <ul class="nav nav-justified menuList">
            <li id="a1" @click="startMeting"><i class="fa fa-fire fa-2x" aria-hidden="true"></i><span>开始会议</span></li>
            <li id="a2"><i class="fa fa-user-plus fa-2x" aria-hidden="true"></i><span>加入成员</span></li>


          </ul>
        </div>
      </div>
    </div>
    <rightPhone></rightPhone>
    <confirm-dialog v-if="dialogShow">
      <slot name="content">确定要呼叫到</slot>
    </confirm-dialog>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/meeting'
  import { mapGetters,mapActions } from 'vuex'
  import {leftPhone,rightPhone,confirmDialog} from 'components'
  export default {

    data() {
      return {
        shows: false,
        deviceAll: [],
        vertoHandle: null
      }
    },
    computed: {
      ...mapGetters({
        dialogShow: 'dialogShow',
      }),
    },
    components: {
      leftPhone,
      rightPhone,
      confirmDialog
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()

        $.verto.init({}, this.bootstrap);


      })
    },
    methods: {
      bootstrap(status) {
        let $this = this
        this.vertoHandle = new jQuery.verto({
          login: 1008+'@'+ window.location.hostname,
          passwd: '1234',
          socketUrl: 'wss://'+ window.location.hostname +':8082',
          ringFile: 'sounds/bell_ring2.wav',
          tag: "webcam",
          videoParams: {
            "minWidth": "1280",
            "minHeight": "720",
            "minFrameRate": 30
          },
          iceServers: true,
          deviceParams: {
            useMic: true,
            useSpeak: true
          },
          audioParams: {
            googAutoGainControl: true,
            googNoiseSuppression: true,
            googHighpassFilter: true
          },

        }, {
          onWSLogin: function(verto, success) {
            $this.refresh()
            console.log('onWSLogin', success);


          },
          onWSClose: function(verto, success) {
            console.log('onWSClose', success);
          },
          onDialogState: function(d) {
            switch (d.state.name) {
              case "trying":
                break;
              case "answering":
                break;
              case "active":
                break;
              case "hangup":
                console.log("Call ended with cause: " + d.cause);
                break;
              case "destroy":
                // Some kind of client side cleanup...
                break;
            }
          }
        });
      },
      refresh() {
        this.$ajax.get('api/groups/group_users',{})
          .then(function(res)  {
            let result = res.data
            this.deviceAll = result
            this.handleFSEventRegister()
          }.bind(this))
      },
      handleFSEventRegister() {
        this.vertoHandle.sendMethod("jsapi",{
          command:"fsapi",
          data:{
            cmd:"show",
            arg:"registrations as xml"
          },
        },function(data) {
            debugger
            console.log("succese:"+data)
        },function(data) {
          console.log("error:"+data)
        })
        console.log(this.vertoHandle)

      },

      itemClick(e) {
        let target = e.currentTarget
        if($(target).hasClass('online')) {
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

      },
      startMeting() {

      }
    },

  }
</script>

<style scoped>

</style>
