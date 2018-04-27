
/**
 * verto 初始化参数
 */
export function vertoParams () {
  let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
  let port = '8082'
  let username = '9000' // localStorage.getItem('xui.username')
  let password = '1234' // localStorage.getItem('xui.password')
  // let vidWidth = localStorage.getItem('phone.video.width')
  let host = window.location.hostname
  return {
    login: username + '@' + host,
    passwd: password,
    socketUrl: protocol + host + ':' + port,
    tag: 'audio-container',
    ringFile: '/assets/sounds/bell_ring2.mp3',
    iceServers: [],
    videoParams: {
      'minWidth': '1280',
      'minHeight': '720',
      'minFrameRate': 30
    },
    deviceParams: {
      useMic: 'any',
      useSpeak: 'any'
    }
  }
}
/**
 * verto 回调函数
 */
export const vertoCallbacks = {
  onWSLogin (verto, success) {
    // 登录回调
    _this.refresh()
    console.log('onWSLogin', success);
  },
  onWSClose(verto, success) {
    console.log('onWSClose', success);
  },
  onDialogState(d) {
    let arr = []
    let callType = d.direction.name
    if (d.cause == "USER_NOT_REGISTERED") {
      //do nothing
    } else {
      switch (d.state.name) {
        case "trying":
          break;
        case "ringing": // 振铃，装载进队列
          arr.push({
            curCall: d,
            state: d.state.name,
            caller: d.params.caller_id_number,
            des: d.params.callee_id_number
          })
          _this.$store.dispatch('setCallQueue', arr)
          break;
        case "requesting":
          arr.push({
            curCall: d,
            state: d.state.name,
            caller: d.params.caller_id_number,
            des: d.params.destination_number
          })
          _this.$store.dispatch('setCallQueue', arr)
          break;
        case "answering": // 接听电话，改变状态
          break;
        case "active":
          break;
        case "hangup": //  拒接，改变状态
          arr = _this.$store.getters.callQueue
          arr.forEach(function (a, i) {
            if (a.caller == d.params.caller_id_number && (a.des == d.params.destination_number || a
              .des == d.params.callee_id_number)) {
              arr.splice(i, 1);
            }
          })
          _this.$store.dispatch('setCallQueue', arr)
          console.log("Call ended with cause: " + d.cause);
          break;
        case "destroy":
          // Some kind of client side cleanup...
          break;
        default:
          console.log(d.state.name);
      }
    }
  },
  onMessage(verto, dialog, message, data) {
    // 会议监听
    debugger
  }
}
/**
 *  verto 拨打电话
 * @param {*} verto  // verto对象实例化
 * @param {*} params // 拨打电话需要的参数
 */
export function newCall (verto, params) {
  verto.newCall({
    destination_number: params.destination_number,
    caller_id_name: params.caller_id_name,
    caller_id_number: params.caller_id_number,
    outgoingBandwidth: 'default',
    incomingBandwidth: 'default',
    useStereo: true,
    dedEnc: false,
    tag: 'video-container',
    deviceParams: {
      useMic: 'any',
      useSpeak: 'any',
      useCamera: 'any'
    }
  })
}

/**
 * verto 订阅会议回调
 */
