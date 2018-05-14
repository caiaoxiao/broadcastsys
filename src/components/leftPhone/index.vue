<template>
  <div class="phone left">
    <div class="phoneTitle">
       <i class="fa fa-phone" aria-hidden="true"></i>语音
       <span class="cloud "></span><!--正在语音中-->
      <div 
		:class="(!this.flag_confleft)&&(this.confLeft.length>0)?'phoneMeeting meetingOut':'phoneMeeting'" 
		@click="toggle_enter"><!--进入为phoneMeeting 离开添加meetingOut-->
        <i aria-hidden="true" 	
		:class="this.flag_confleft ? 'fa fa-sign-out fixed-nav' :(this.confLeft.length>0?'fa fa-volume-control-phone fixed-nav':'fa fa-plus fixed-nav')"></i>
		{{this.flag_confleft?'离开':'进入'}}
		</div><!--进入为fa-plus 离开为fa-sign-out 有语音呼入为fa-volume-control-phone fixed-nav-->
    </div>
    <div class="numList">
      <div>
        <ul class="callNum">
          <!--<li v-for="item in callQueue">-->
          <!--<i  class="fa fa-circle red" aria-hidden="true"></i>-->
          <!--1005-->
          <!--<span>00:00:01</span>-->
          <!--</li>-->
          <li class ="unselected" v-if="item.caller_id_number!='9000'" v-for="item in confLeft" @click.stop="select($event,item)">
          <i class="fa fa-circle orange" aria-hidden="true"></i>
		             {{ item.caller_id_number}}
          </li>
          <!--<li><i class="fa fa-clock-o" aria-hidden="true"></i>1005</li>-->
        </ul>
      </div>
    </div>
    <div>
      <video width="800" id="video-container" autoplay="autoplay" hidden="true"></video>

    </div>
    <div class="phoneDial">
      <div class="dial rightdial" v-for="(item,index) in btnData" @click.stop='buttonclick(item.name)' @mousedown="$btnMousedown" @mouseup="$btnMouseup">
        <i aria-hidden="true" class="fa" :class="item.class"></i>
        <span>{{item.name}}</span>
      </div>


    </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  const btnData = [
    { name: '邀请成员', class: 'fa-user-plus' },
    { name: '允许通话', class: 'fa-microphone' },
    { name: '排队等待', class: 'fa-spinner' },
    { name: '踢出会话', class: 'fa-sign-out'},
    { name: '成员静音', class: 'fa-microphone-slash' },
    { name: '结束服务', class: 'fa-window-close-o' },
    { name: '用户转出', class: 'fa-user-times' },
    { name: '确认转出', class: 'fa-reply-all' },
    { name: '取消转出', class: 'fa-remove' },
  ]
  export default {
    props:{
	selectPhone:{
	type: Array,
	default: []},
    },
    data() {
      return {
        btnData,
	selected:[],
	status:"进入",
	userDeflect:null,
	flag_confleft:false,
	flag_confalarm:false,
        flag_callqueue:false
      }
    },
    created() {
      this.$nextTick(function () {
        // getHeight()
        // $.verto.init({}, this.bootstrap);
      })
    },
    mounted(){
    },
    watch: {

        callQueue:function(callqueue)
        {
        if(callqueue.length>0){
         if(callqueue[0].caller =='9000' || callqueue[0].des =='9000')
                this.flag_callqueue = true
         else
                this.flag_callqueue = false
        }
        else
                this.flag_callqueue = false
        },
        confLeft:function(confleft)
        {
        for(var  i = 0;i < confleft.length;i++)
                  if(confleft[i].caller_id_number == '9000')
                        {   this.flag_confleft = true
                            break
                        }
        if(i==confleft.length)
             this.flag_confleft = false

        },
	confAlarm:function(confalarm)
        {
        for(var  i = 0;i < confalarm.length;i++)
                  if(confalarm[i].caller_id_number == '9000')
                        {   this.flag_confalarm = true
                            break
                        }
        if(i==confalarm.length)
             this.flag_confalarm = false

        },
    },
    computed: {
      ...mapGetters({
        vertoHandle: 'vertoHandle',
        group_users: 'group_users',
        users: 'users',
        currentLoginUser: 'currentLoginUser',
        callQueue: 'callQueue',
	confLeft : 'confLeft',
	confAlarm : 'confAlarm',
	selectedAlarm : 'selectedAlarm',

      }),
    },
    methods: {
      toggle_enter(){
	let _this = this
	if(this.flag_confleft==true)
        this.confLeft.forEach(function(item,index,array){
        if(item.caller_id_number=='9000')
          _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"hup"+" "+item.conf_id)
	_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"mute"+" "+item.conf_id)
	_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"deaf"+" "+item.conf_id)
        })
      else			
	{
               this.vertoHandle.newCall({
          		destination_number: "9100",
            		caller_id_name: "LegalHigh",
          		caller_id_number: "9000",
          		outgoingBandwidth: "default",
          		incomingBandwidth: "default",
          		useStereo: true,
          		dedEnc: false,
          		tag: "video-container",
          		deviceParams: {
            		useMic: "any",
            		useSpeak: "any",
            		useCamera: "any"
          		}
        		})
	_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"stop"+" current "+_this.confLeft[0].conf_id)
	_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"unmute"+" "+_this.confLeft[0].conf_id)
	_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"undeaf"+" "+_this.confLeft[0].conf_id)
	}
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
      buttonclick(name){
        let _this = this
        switch(name){
          case '踢出会话':
              if(this.selected.length > 0)
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"hup"+" "+a.conf_id)
                })
	      if(this.selectedAlarm.length > 0)
                this.selectedAlarm.forEach(function(a,i){
                  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"hup"+" "+a.conf_id)
                })
		break
          case '允许通话':
              if(this.selected.length > 0){
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"unmute"+" "+a.conf_id)})
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"undeaf"+" "+a.conf_id)})
		
           	$('.selected').removeClass().addClass('unselected')
           	this.selected = []
                }
		if(this.selectedAlarm.length > 0){
                this.selectedAlarm.forEach(function(a,i){
                  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"unmute"+" "+a.conf_id)})
                //this.selectedAlarm.forEach(function(a,i){
                //  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"undeaf"+" "+a.conf_id)})
                $('.selected').removeClass().addClass('unselected')
		this.$store.dispatch('setSelectedAlarm',[])
                }
		break
          case '排队等待':
	      console.log('waiting clicked')
              if(this.selected.length > 0){
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"mute"+" "+a.conf_id		   )})
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"deaf"+" "+a.conf_id		   )})
           	$('.selected').removeClass().addClass('unselected')
           	this.selected = []
                }
		if(this.selectedAlarm.length > 0){
                this.selectedAlarm.forEach(function(a,i){
                  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"mute"+" "+a.conf_id)})
                // this.selectedAlarm.forEach(function(a,i){
                //  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"deaf"+" "+a.conf_id)})

                $('.selected').removeClass().addClass('unselected')
                this.$store.dispatch('setSelectedAlarm',[])
		}
		break
	  case '结束服务':
	      if(this.confLeft)
              this.confLeft.forEach(function(a,i){
              _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"kick"+" "+a.conf_id)
	        }) 
	      if(this.confAlarm)
              this.confAlarm.forEach(function(a,i){
              _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"kick"+" "+a.conf_id)
                })
	        break
	   case '用户转出':
	      if(this.flag_confalarm == true && this.selectedAlarm.length>0)
		this.userDeflect = this.selectedAlarm[0]
              else if(this.selected.length > 0)
                this.userDeflect = this.selected[0]
	      break
	   case '确认转出':
	      if(this.userDeflect){
		 _this.fsAPI('uuid_transfer',this.userDeflect.channel_uuid+ " "+"sip:"+this.selectPhone[0].userID+"@"+this.selectPhone[0].networkIP+":"+this.selectPhone[0].networkPort)	
	      }
	      this.userDeflect = null
	      $('.selected').removeClass().addClass('unselected')
               this.selected = []
                this.$store.dispatch('setSelectedAlarm',[])
	      break
	   case '取消转出':
	      this.userDeflect = null
              this.$store.dispatch('setSelectedAlarm',[])
              $('.selected').removeClass().addClass('unselected')
              this.selected = []
	      break
	   case '邀请成员':
		if(this.selectPhone.length > 0 && this.flag_confalarm == true){
                 this.selectPhone.forEach(function(a,i){
                  _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"bgdial"+" "+"user/"+  a.userID)
                })
                }
		else if(this.selectPhone.length > 0 ){
                 this.selectPhone.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"bgdial"+" "+"user/"+  a.userID)
                })
                }
                break
        }

      },
      select(e,item){
        let _this = this
        let target = e.currentTarget
	      if($(target).hasClass('unselected')){
            $(target).removeClass().addClass('selected')
            if(this.selected.findIndex(function(caller,index,array){return caller.conf_id==item.conf_id})==-1 ){
          this.selected.push(item)}
        }
        else if ($(target).hasClass('selected')){
            $(target).removeClass().addClass('unselected')
            this.selected.forEach(function(a,i){if(a.conf_id==item.conf_id) _this.selected.splice(i,1)})
        }

	    },
      clear() {
        this.destination_number = this.destination_number.substring(0, this.destination_number.length - 1)
      },
      keypad(value) {
        this.destination_number = this.destination_number + value
      },
      answerCall(item) {
        this.callQueue[0].curCall.answer();
      },
      callDivert() {
        // 呼叫转移
        if (this.destination_number != '') {
          this.$store.dispatch('CallDivert', { type: true, num: this.destination_number })
        }
      },
      makeCall() {
        this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: this.destination_number,
          caller_id_name: 'LegalHigh',
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
      },
      hangupCall() {
        this.vertoHandle.hangup();
      }

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
