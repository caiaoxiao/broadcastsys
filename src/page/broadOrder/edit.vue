<template>
  <div class="popSp"  id="ccc">
    <div>
      <div class="planName padding">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-1 control-label">预案名称</label>
            <div class="col-sm-11">
              <input type="text" class="form-control" placeholder="请输入预案名称" v-model="formData.PlanName">
            </div>
          </div>

        </form>
      </div>
      <div class="filesSelect">
        <ul class="nav nav-justified broadcast" data-name="title">
          <li class="on">播放列表</li>
          <li>实时文本</li>
        </ul>
        <div class="con" data-name="con">
          <div>
            <div class="selection">

              <div class="menuType"><i class="fa fa-outdent" aria-hidden="true"></i>播放列表</div>
              <div id="songListHeight">
                <div class="songSheet" v-for="songlist in playList" @click="(()=> songlist.unfold = !songlist.unfold)">
                  <div class="songSheetName" :class="songlist.selected ? 'songSheetNameSelect' : ''">
                    <div class="songSetting">
                      <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                      <p contenteditable="false">{{songlist.FolderName}}</p>
                      <span class="musicNum">[{{ songlist.Files ? songlist.Files.length :0}}]</span>
                    </div>
                    <span class="songSheetTool" @click.stop="selectSonglist(songlist)">选择</span>
                  </div>
                  <ul class="musicList" v-if="songlist.unfold">
                    <li v-for="fileItem in songlist.Files">
                      <p>{{fileItem.FileName}}</p>
                      <ul class="musicListTools">
                        <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>

                      </ul>
                      <span class="totalTime">05:12</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="textFlies">
              <textarea class="form-control" v-model="xData.path"  id="textarea01"></textarea>

            </div>
          </div>
        </div>

      </div>
      <div class="detailSeclet ">
        <ul class="nav nav-justified broadcast" data-name="title">
          <li class="on">在线列表</li>
          <li>分组列表</li>
        </ul>
        <div class="con" data-name="con">
          <div>
            <div class="selectedList" id="height04">
              <div class="singleFlies"
                   :class="device.selected ? 'selected' : ''"
                   v-for="device in deviceList"
                   @click="selectItem(device)">{{device.userID}}</div>
            </div>
            <div class="selectAll" @click="selectAll(1)">全选</div>
          </div>
          <div>
            <div class="sp-department">
              <ul data-name="title">
                <li class="on">部门一</li>
                <li>部门二bum</li>
              </ul>
            </div>
            <div class="sp-right" data-name="con">
              <div>
                <div class="selectedList" id="height05">
                  <div class="singleFlies">1002</div>
                  <div class="singleFlies">2008</div>
                  <div class="singleFlies">9281</div>
                  <div class="singleFlies">9809</div>
                </div>
                <div class="selectAll">全部</div>
              </div>
              <div>
                <div class="selectedList" id="height06">
                  <div class="singleFlies">123</div>
                  <div class="singleFlies">98760</div>
                  <div class="singleFlies">8866</div>
                  <div class="singleFlies">01928</div>
                </div>
                <div class="selectAll">全部</div>
              </div>
            </div>

          </div>
        </div>
        <div class="">
          <div class="menuType"><i class="fa fa-th-large" aria-hidden="true"></i>播放设备列表</div>
          <div class="selectedList" id="height07">
            <div class="singleFlies selectDelate" v-for="device in selectDevice" @click="deleteDevice(device)">
              {{device.userID}}</div>
          </div>
          <div class="selectAll" @click="deleteAll()">全部删除</div>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="settingMoudle">
        <div class="settingTitle">选择时间</div>
        <div class="settingCon">
          <el-date-picker
            v-model="formData.PlanPreTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
   
      <div class="settingMoudle">
        <div class="settingTitle">循环周期</div>
        <div class="settingCon">
          <span class="times" @click="subtract">-</span>
          <input type="text" v-model="cycleIndex" class="cycleIndex"/>
          <span class="times" @click="add">+</span>
          <span>天</span>
        </div>

      </div>
      <div class="settingMoudle">
        <div class="settingTitle">播放文件类型</div>
        <div class="settingCon">
          <span class="moudle"
                :class="xData.cmdtype==2 ? 'moudleSelected' : ''"
                @click="textPlay">文本播放</span>
          <span class="moudle"
                :class="xData.cmdtype==1 ? 'moudleSelected' : ''"
                @click="musicPlay">音乐播放</span>
        </div>
      </div>
    </div>
    <div class="btnDiv">
      <button type="button" class="btn btn-info " @click="submitPlan">确定</button>
      <button type="button" class="btn btn-default" @click="close">取消</button>
    </div>
    <tool-tip :dialogShow="dialogShow"  @close="closeTip">
      <p slot="content">{{dialogText}}</p>
    </tool-tip>

  </div>


</template>

<script>
  import parseXML from 'utils/xml_parser'
  import {isArray,isObject,isString} from 'utils/tool'
  import { mapGetters,mapActions } from 'vuex'
  import {toolTip} from 'components'
  import {getHeight} from 'utils/height'
  import {getHeights} from 'utils/page/broadOrder'
  import {GET_USER_INFO} from 'store/getters/type'
  export default {
    data() {
      return {
        playList: [],       // 歌单列表
        selectDevice: [],   // 已勾选的设备
        checkplaylist: [],
        deviceList: [],     // 在线设备列表
        isSelectAll: false, // 是否全选
        playCount: 0,
        cycleIndex: 0,      // 预案循环次数
        formData: {
          CreateUserID: '133585596bb04c9cbe311d0859dd7196',
          PlanName: '',
          PlanPreModel: 1,
          PlanModel: 2,
          PlanPreTime: new Date(),
          PlanActualTxt: '',
          Files: [],         // 已勾选的歌单
          deviceId: '1005',
          FeatureBases: [],
          FeatureCode: [],
        },

        selectSongList: [],
        xData: {
          path: '',
          time: '',
          meeting: '',
          cmdtype: 0,
          period: '',
        },
        verto: '',
        meeting: '',
	voice: '',
	alarm: '',
	broad: '',
        dialogShow: false,
        dialogText: null,
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
        this.refresh()
        this.verto = this.get_user_info.freeswitchData.VertoID
	this.meeting = this.get_user_info.freeswitchData.MeetingID
	this.voice = this.get_user_info.freeswitchData.VoiceCallID
    	this.alarm = this.get_user_info.freeswitchData.AlarmID
	this.broad = this.get_user_info.freeswitchData.BroadID
      })
    },
    components: {
      toolTip
    },
    computed: {
      ...mapGetters({
        vertoHandle:'vertoHandle',
        currentLoginUser: 'currentLoginUser',
	get_user_info: GET_USER_INFO,
      }),
    },
    methods: {
      refresh() {
        // 1、查询歌单数组
        this.$ajax.get('Folder/getTreeFiles', {params: {UserID: '133585596bb04c9cbe311d0859dd7196'}})
          .then(res => {
            if(res.data.code == 1) {
              let result = res.data.result
              result.forEach(function(r,i){
                r.unfold = false
                r.selected = false
              })
              this.playList = result
            }
          })
        // 2、查询所有在线设备
        this.vertoHandle.sendMethod("jsapi",{command:"fsapi", data:{cmd:"show", arg:"registrations as xml"}},
          function(data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.message, "text/xml");
            const msg = parseXML(doc);

            let registrations = [];
            let deviceList = []
            if(msg) {
              if (isArray(msg.row)) {
                registrations = msg.row;
              } else if (isObject(msg.row)) {
                registrations.push(msg.row);
              } else if (isArray(msg)) {
                registrations = msg;
              } else if (isObject(msg)) {
                registrations.push(msg);
              }
            }

            registrations.forEach(function(r) {
              let user = {}
              user.deviceState = "registered"
              user.userID = r.reg_user
              user.callDirection = null
              user.selected = false
              deviceList.push(user)
            })
            if (deviceList.length) this.deviceList = deviceList

          }.bind(this),function(data) {
            console.log("error:"+data)
          }.bind(this))

        // 订阅注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::register", {handler: this.handleFSEventRegister.bind(this)});
        // 订阅取消注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::unregister", {handler: this.handleFSEventRegister.bind(this)});
      },
      // 注册事件 和 取消注册事件
      handleFSEventRegister(v, e) {
        let _this = this;
        let deviceList = _this.deviceList;
        if (e.eventChannel == 'FSevent.custom::sofia::register') {
          let isContinue = true
          deviceList.forEach(function(d, i) {
            if(d.userID == e.data.username) {
              isContinue=false
              return;
            }
          })

          if(isContinue) {
            let user = {}
            user.deviceState = "registered"
            user.userID = e.data['to-user']
            user.callDirection = null
            user.selected = false
            deviceList.push(user)

          }

        }else if( e.eventChannel =='FSevent.custom::sofia::unregister') {
          deviceList.forEach(function(d, i) {
            if (d.userID == e.data.username) {
              deviceList.splice(i,1)
            }
          })
        }

        _this.deviceList = Object.assign([], deviceList)
      },
      textPlay() {
        this.xData.cmdtype = 2
      },
      musicPlay() {
        this.xData.cmdtype = 1
      },
      subtract() {
        if(this.cycleIndex > 0) {
          this.cycleIndex = this.cycleIndex -1
        }
      },
      add() {
        if(this.cycleIndex < 10) {
          this.cycleIndex = this.cycleIndex +1
        }
      },
      selectSonglist(songlist){


        if(!songlist.selected) {
            
           songlist.Files.forEach(function(c,i) {
            this.formData.Files.push(c);
            this.selectSongList.push(c);
           }.bind(this))
           
        }else {
          this.selectSonglist.forEach(function(c,i) {
            if(songlist.FolderID == c.FolderID) {
              this.selectSongList.splice(i, 1)
            }
          }.bind(this))
          this.formData.Files.forEach(function(c,i) {
            if(songlist.FolderID == c.FolderID) {
              this.formData.Files.splice(i, 1)
            }
          }.bind(this))
        }

 
        songlist.selected = !songlist.selected
      },
      selectItem(device) {
        if(!device.selected) {
          this.selectDevice.push(device)
        }else {
          this.deleteDevice(device)
        }
        device.selected = !device.selected

      },
      selectAll(type) {
        if(type == 1) {
          if(!this.isSelectAll) {
            this.deviceList.forEach(function(d,i){
              d.selected = true
            })
            this.selectDevice = this.deviceList
          }else {
            this.deviceList.forEach(function(d,i){
              d.selected = false
            })
          }
          this.isSelectAll = !this.isSelectAll
        }
      },
      deleteDevice(device) {
        this.selectDevice.forEach(function(s,i) {
          if(device.userID == s.userID) {

            this.selectDevice.splice(i,1)
          }
        }.bind(this))
      },
      deleteAll() {
        this.selectDevice = []
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
      closeTip() {
        this.dialogShow = false
      },
      submitPlan() {
 	console.log("broad is:" ,this.broad)
        this.xData.period = String(this.cycleIndex * 86400);
        let path = '';
        this.xData.time = this.formData.PlanPreTime.toString()
        this.xData.meeting = this.broad
        if(this.xData.cmdtype == 1) {
           this.selectSongList.forEach(function(c,i) {
             path = path + ' ' + c.MediaPath
           }.bind(this))
           this.xData.path = path
        }
        this.$ajax.post('QzTask/add',this.xData)
          .then((res) => {
            if(res.data.code == 1) {
              let device_ids = ""
              this.selectDevice.forEach((element,i) => {
                if(i!=0)
                device_ids+="-"
                device_ids+=element.userID
              })
              this.$ajax.get('https://scc.ieyeplus.com:8082/api/scheds/'+res.data.result.id+'%'+device_ids)
            }else {
            }
          })
        // 提交预案
        if(this.formData.PlanName == ''){
          this.dialogText = '预案名称不能为空'
          this.dialogShow = true
        }else {
          if(this.xData.path == ''){
            this.dialogText = '歌单选择或者实时文本输入不能为空'
            this.dialogShow = true
          }else {
              this.selectDevice.forEach(function(s,i) {
                s.deviceId = s.userID;
              }.bind(this))
              this.formData.FeatureBases = this.selectDevice
              console.log("777777");
              console.log(this.formData.Files[0]); 
                this.$ajax.post('Plan/Create', this.formData)
                  .then((res) => {
                    if(res.data.code == 1) {
                      console.log("success"); 
                      console.log(res.data.result.planID);
                      this.$ajax.post(''+res.data.result.planID) 
                      this.$emit('close',1)
                    }else {
                      console.log(res)
                    }
                  })
         

            
          }
        }
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
