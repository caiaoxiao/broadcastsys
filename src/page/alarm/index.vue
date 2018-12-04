<script src="../../utils/page/meeting.js"></script>
<template>
  <div >
     <left-phone :select-phone="selectPhone" @reset='reset' ></left-phone>
    <div id="media">
      <video width=800 id="webcam" autoplay="autoplay" hidden="true"></video>
    </div>
    <div ref="conf" class="middleCon">
      <iframe  v-if="!alarm_address==''" allowTransparency="true" height = "20000" width = "100%" :src="alarm_address"></iframe>
      <div class="functionMenu">
      </div>
    </div>
    <right-phone></right-phone>
    <device-list></device-list>
    <switchs></switchs>
  </div>
</template>

<script>
import parseXML from 'utils/xml_parser';
import { mapGetters, mapActions } from 'vuex'
import { getHeight } from 'utils/height'
import { getHeights, itemClick } from 'utils/page/voiceCall'
import {GET_USER_INFO} from 'store/getters/type'
import { leftPhone, rightPhone, deviceList, switchs} from 'components'

export default {
  components: {
    leftPhone,
    rightPhone,
    deviceList,
    switchs,
  },
  data () {
    return {
      selectPhone: [],
      verto:"",
    }
  },
  created () {
    this.$nextTick(function () {
      getHeight()
      getHeights()
      this.height = this.$refs.conf.offsetHeight
      //console.log(this.height)
      this.verto = this.get_user_info.freeswitchData.VertoID
    })
  },
  computed: {

    ...mapGetters({
      dialogShow:'dialogShow',
      callQueue:'callQueue',
      vertoHandle:'vertoHandle',
      group_users:'group_users',
      users:'users',
      deviceList:'deviceList',
      currentLoginUser:'currentLoginUser',
      userGroup:'userGroup',
      get_user_info: GET_USER_INFO,
      alarm_address:'alarmAddress',
    })
  },
  methods: {
    // 获取设备分组数据
    reset(){
    },
  }
}
</script>

<style scoped>
iframe{
  background-color:transparent;
  border:none;
}
</style>
