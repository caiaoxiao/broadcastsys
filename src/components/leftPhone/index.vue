<template>
  <div class="phone left">
    <div class="phoneTitle">
      <div class="onair">
        <div class="cloud onair"></div>
      </div>语音
      <div class="phoneMeeting meetingOut">
        <i aria-hidden="true" class="fa fa-plus"></i>退出</div>
    </div>
    <div class="numList">
      <div>
        <ul class="callNum">
          <!--<li v-for="item in callQueue">-->
          <!--<i  class="fa fa-circle red" aria-hidden="true"></i>-->
          <!--1005-->
          <!--<span>00:00:01</span>-->
          <!--</li>-->
          <li class ="unselected" v-for="item in confLeft" @click.stop="select($event,item)">
          <i class="fa fa-circle orange" aria-hidden="true"></i>
		             {{ item.caller_id_number + ' id : ' + item.conf_id }}
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
    { name: '会话录音', class: 'fa-play-circle' },
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
    computed: {
      ...mapGetters({
        vertoHandle: 'vertoHandle',
        group_users: 'group_users',
        users: 'users',
        currentLoginUser: 'currentLoginUser',
        callQueue: 'callQueue',
	confLeft : 'confLeft',
      }),
    },
    methods: {
      toggle_enter(){
      var end = this.confLeft.length
      for(var i = 0 ; i< end ; i++){
      if(this.confLeft[i].caller_id_number=='9000')
                  {        
                  this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"hup"+" "+this.confLeft[i].conf_id)
		  this.status = "进入"
	          break	
		  }
      } 
      if(i==end)
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
		  this.status = "离开"


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
                console.log('please select before click')
		break
          case '允许通话':
              if(this.selected.length > 0){
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"unmute"+" "+a.conf_id)})
		
           	$('.selected').removeClass().addClass('unselected')
           	this.selected = []
                }
	            else
                console.log('please select before unmute')
		break
          case '排队等待':
	      console.log('waiting clicked')
              if(this.selected.length > 0){
                this.selected.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"mute"+" "+a.conf_id		   )})
           	$('.selected').removeClass().addClass('unselected')
           	this.selected = []
                }
	            else
                console.log('please select before unmute')
		break
	  case '结束服务':
              console.log('killing clicked')
	      console.log(_this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"list"))
              this.confLeft.forEach(function(a,i){
              _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"kick"+" "+a.conf_id)
	        }) 
	        break
	   case '用户转出':
              if(this.selected.length > 0)
		this.userDeflect = this.selected[0]
	      else
		console.log('please select brfore deflect')
	      break
	   case '确认转出':
	      if(this.userDeflect && this.selectPhone.length > 0){
		 _this.fsAPI('uuid_deflect',this.userDeflect.channel_uuid+ " "+"sip:"+this.selectPhone[0].userID+"@"+this.selectPhone[0].networkIP+":"+this.selectPhone[0].networkPort)	
	      }
              else
                console.log('please select brfore deflect')
	      this.userDeflect = null
	      $('.selected').removeClass().addClass('unselected')
               this.selected = []
	      break
	   case '取消转出':
	      this.userDeflect = null
               $('.selected').removeClass().addClass('unselected')
               this.selected = []
	      break
	   case '邀请成员':
	       if(this.selectPhone.length > 0){
                 this.selectPhone.forEach(function(a,i){
                  _this.fsAPI('conference',"9100-scc.ieyeplus.com"+" "+"bgdial"+" "+"user/"+  a.userID)
                })	
           	$('.selected').removeClass().addClass('unselected')
           	this.selected = []}
		
                    else
                console.log('please select before invite')
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
