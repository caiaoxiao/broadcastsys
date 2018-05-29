
import {cookieStorage} from 'common/storage'

export default {
  // 用户信息和是否登录
  user_info: cookieStorage.get('user_info'),
  count: 10,
  LoginId: '',
  // 分页数据
  pageData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  },
  // 按钮权限
  btns:  cookieStorage.get('btns'),
  // 批量选择数组
  batchSelectArr: [],
  // 编辑框的显示
  dialogFormVisible: false,
  // 是否刷新
  updateState: 0,
  // 点击树菜单的 data
  TreeData: {},
  // 点击树菜单的 obj
  TreeObj: {},
  // 呼叫转移弹窗显示或隐藏
  dialogShow: false,
  dialogStatu: null,
  // 话机相关数据和操作
  phoneShow: false,
  phoneNum: '',
  // 待播放的列表
  playlist: [],
  // 是否可以播放
  play: false,
  // verto初始化
  vertoHandle: null,
  group_users: [],
  // 所有设备列表
  deviceList: cookieStorage.get('deviceList'),
  // 当前登录的话机
  currentLoginUser: [],
  //  设置通话队列
  callQueue: [],
  whetherPlayAnotherSong: 'no',
  confLeft: [],
  confAlarm:[],
  confMeeting:[],
  confIpBoard:[],
  userGroup:[],
  selectedAlarm:[],
  // 是否订阅会议回调
  use_livearray: false
}
