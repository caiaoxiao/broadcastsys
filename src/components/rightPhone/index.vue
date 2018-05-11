<template>
  <div>
      <div class="phone right">
	    <div class="phoneTitle">
       <i class="fa fa-phone" aria-hidden="true"></i>语音
       <span class="cloud "></span><!--正在语音中-->
      <div
                :class="(!this.flag_confalarm)&&(this.confAlarm.length>0)?'phoneMeeting meetingOut':'phoneMeeting'"
                @click="toggle_enter"><!--进入为phoneMeeting 离开添加meetingOut-->
        <i aria-hidden="true"
                :class="this.flag_confalarm ? 'fa fa-sign-out fixed-nav' :(this.confLeft.length>0?'fa fa-volume-control-phone fixed-nav':'fa fa-plus fixed-nav')"></i>
                {{this.flag_confalarm?'离开':'进入'}}
                </div><!--进入为fa-plus 离开为fa-sign-out 有语音呼入为fa-volume-control-phone fixed-nav-->
    </div>
        <div class="numList">
          <div>
            <ul class="callNum">
                <li class ="unselected" v-if="item.caller_id_number!='9000'" v-for="item in confAlarm" @click.stop="select($event,item)">	
		<i class="fa fa-circle red" aria-hidden="true"></i>
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
          <div class="numDisplay">
            <span>{{destination_number}}</span>
            <img @click="clear" src="../../assets/img/delate.fw.png" />
          </div>
          <div class="dialDisplay">
            <div v-for="(item,index) in btnData"
            @click="keypad(item.name)"
            @mousedown="$btnMousedown"
            @mouseup="$btnMouseup"
            class="dial">{{item.name}}</div>
          </div>
          <div class="dialAction">

            <div 
              :class ="!(flag_confleft || flag_callqueue)?'dial ring active':'dial ring disable'"
	      @click ="!(flag_confleft || flag_callqueue)? makeCall():''" 
	      @mouseup = "!(flag_confleft || flag_callqueue)? $btnMouseup($event) : ''" 
	      @mousedown = "!(flag_confleft || flag_callqueue)? $btnMousedown($event) : ''" 
		 >
              <i :class="!(flag_confleft || flag_callqueue)? 'fa fa-phone fa-2x' : 'fa fa-microphone fa-2x'" aria-hidden="true"></i>
            </div>
            <div class="dial hangup" @click="hangupCall" @mousedown="$btnMousedown" @mouseup="$btnMouseup">挂断</div>
          </div>
        </div>
        </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { getHeight } from "utils/height";

  export default {
    data() {
      return {
        destination_number: "",
	status:"进入",
        btnData: [
          {name: '1'},
          {name: '2'},
          {name: '3'},
          {name: '4'},
          {name: '5'},
          {name: '6'},
          {name: '7'},
          {name: '8'},
          {name: '9'},
          {name: '*'},
          {name: 0},
          {name: '#'},
        ],
	flag_callqueue:false,
	flag_confleft:false,
	flag_confalarm:false,

      };
    },
    created() {
      this.$nextTick(function () {
        getHeight();
        //$.verto.init({}, this.bootstrap);
      });
    },
    computed: {
      ...mapGetters({
        vertoHandle: "vertoHandle",
        group_users: "group_users",
        users: "users",
        currentLoginUser: "currentLoginUser",
	confLeft: "confLeft",
        callQueue: "callQueue",
	confAlarm: "confAlarm",
	selectedAlarm: "selectedAlarm",
      })
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
	for(var i = 0;i < confleft.length;i++)
		  if(confleft[i].caller_id_number == '9000')
			{   this.flag_confleft = true 
			    break
	                }
	if(i==confleft.length)
	     this.flag_confleft = false	

	},
	confAlarm:function(confalarm)
        {
        for(var i = 0;i < confalarm.length;i++)
                  if(confalarm[i].caller_id_number == '9000')
                        {   this.flag_confalarm = true
                            break
                        }
        if(i==confalarm.length)
             this.flag_confalarm = false

        },

    },
     methods: {
      toggle_enter(){
      let _this = this
      if(this.flag_confalarm ==true)
 	this.confAlarm.forEach(function(item,index,array){
	if(item.caller_id_number=='9000')
          _this.fsAPI('conference',"9110-scc.ieyeplus.com"+" "+"hup"+" "+item.conf_id)
	})
      else
               this.vertoHandle.newCall({
                        destination_number: "9110",
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
      },
	select(e,item){
        let _this = this
        let target = e.currentTarget
              if($(target).hasClass('unselected')){
            $(target).removeClass().addClass('selected')
            if(this.selectedAlarm.findIndex(function(caller,index,array){return caller.conf_id==item.conf_id})==-1 ){
          this.selectedAlarm.push(item)}
        }
        else if ($(target).hasClass('selected')){
            $(target).removeClass().addClass('unselected')
            this.selectedAlarm.forEach(function(a,i){if(a.conf_id==item.conf_id) _this.selected.splice(i,1)})
        }

            },
      clear() {
        this.destination_number = this.destination_number.substring(
          0,
          this.destination_number.length - 1
        );
      },
      keypad(value) {
        this.destination_number = this.destination_number + value;
      },
      answerCall(item, index) {
        let type = true;
        this.callQueue.forEach((c, i) => {
          if (c.state == "answering") {
            type = false;
          }
        })
        if (type) {
          this.callQueue[index].curCall.answer();
        }
      },
      callDivert() {
        // 呼叫转移
	console.log(this.flag_confleft)
	console.log(this.flag_callqueue)
        if (this.destination_number != "") {
          this.$store.dispatch("CallDivert", {
            type: true,
            num: this.destination_number
          });
        }
      },
      makeCall() {
        this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: this.destination_number,
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
        });
      },
      hangupCall() {
        this.vertoHandle.hangup();
      },
      btnMousedown(event) {
        let target = event.currentTarget
        $(target).css('background','#575E64');
      },
      btnMouseup(event) {
        let target = event.currentTarget
        $(target).css('background','none');
      },
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi",{
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      }
    }
  };
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
