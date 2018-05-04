<template>
  <div>
      <div class="phone right">
        <div class="phoneTitle">
            <i class="fa fa-user-circle" aria-hidden="true"></i>报警
          <div class="phoneMeeting ">
            <i aria-hidden="true" class="fa fa-sign-out"></i>进入
          </div>
          </div>
        <div class="numList">
          <div>
            <ul class="callNum">
              <li v-for="(item, index) in callQueue" :key="item.caller" @click="answerCall(item, index)">
		<i class="fa fa-circle red" aria-hidden="true"></i>
		{{ item.caller}}
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
            <div class="dial" @click="callDivert" @mousedown="$btnMousedown" @mouseup="$btnMouseup">呼叫转移</div>
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
	flag_confleft:false
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
	confAlarm: "confAlarm"
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

	}
    },
    methods: {
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
      }
    }
  };
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
