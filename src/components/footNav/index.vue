<template>
  <div class="bottomTools">
    <div class="userInfo">
      <div class="userName">
        <span>张三<a @click="logout">[退出]</a>
          所属机构
          <a @click="setting()"><i class="fa fa-cogs"></i>系统设置</a></span>

      </div>
    </div>

    <div class="span_large">
      <div class="location_indicator"></div>
    </div>
    <!--正在进行-->
    <div class="deviceStatus" style="display:none;">
      <div class="deviceModule">
        <table class="table">
          <thead><tr><td colspan="3"><i class="fa fa-circle-o-notch fa-spin"></i>语音通话[2]</td></tr></thead>
          <tbody>
          <tr>
            <td>600</td>
            <td>正在通话</td>
            <td><a>查看</a></td>
          </tr>
          <tr>
            <td>600</td>
            <td>正在通话</td>
            <td><a>查看</a></td>
          </tr>
          </tbody>

        </table>
      </div>
      <div class="deviceModule">
        <table class="table">
          <thead><tr><td colspan="4"><i class="fa fa-music fa-spin"></i>IP广播[4]</td></tr></thead>
          <tbody>
          <tr>
            <td>600</td>
            <td colspan="2">正在喊话</td>
            <td><a>查看</a></td>
          </tr>
          <tr>
            <td>600</td>
            <td colspan="2">正在喊话</td>
            <td><a>查看</a></td>
          </tr>
          <tr>
            <td>部门一</td>
            <td>正在播放</td>
            <td>歌单：我们的心向着太阳！</td>
            <td><a>查看</a></td>
          </tr>
          <tr>
            <td>600</td>
            <td>正在播放</td>
            <td>洗刷刷.mp3</td>
            <td><a>查看</a></td>
          </tr>
          </tbody>

        </table>
      </div>
      <div class="deviceModule">
        <table class="table">
          <thead><tr><td colspan="3"><div class="circle p"></div> 会议[16]</td></tr></thead>
          <tbody>
          <tr>
            <td>600,部门一,8009</td>
            <td>会议中</td>
            <td><a>查看</a></td>
          </tr>

          </tbody>

        </table>
      </div>
      <div class="deviceModule">
        <table class="table">
          <thead><tr><td colspan="3"><div class="eye p"></div>视频[16]</td></tr></thead>
          <tbody>
          <tr>
            <td>6001</td>
            <td>视频中</td>
            <td><a>查看</a></td>
          </tr>

          </tbody>

        </table>
      </div>
      <div class="deviceModule">
        <table class="table">
          <thead><tr><td colspan="4"><div class="timer p"></div>预约播放[3]</td></tr></thead>
          <tbody>
          <tr>
            <td>预案名称一</td>
            <td>2017-12-31 12:00:00</td>
            <td><a>查看</a><a>立即执行</a></td>
          </tr>

          </tbody>

        </table>
      </div>
    </div>
    <div class="audio-box">
      <audio ref="audio" ></audio>
      <span class="fa fa-times" @click="close"></span>
      <div class="audio-container">
        <div class="audio-view">
          <div class="audio-title">{{ activeIndex == -1 ? '' : playlist[activeIndex].FileName }}</div>
          <div class="audio-body">
            <div class="audio-backs">
              <div class="audio-this-time">{{now}}</div>
              <div class="audio-count-time">{{ activeIndex == -1 ? '' : playlist[activeIndex].FileTime }}</div>
              <div class="audio-setbacks">
                <i class="audio-this-setbacks">
                  <span class="audio-backs-btn"></span>
                </i>
                <span class="audio-cache-setbacks">
								</span>
              </div>
            </div>
          </div>
          <div class="audio-btn">
            <div class="audio-select">
              <div class="audio-prev" @click="prev"></div>
              <div class="audio-play" @click="playToggle()"></div>
              <div class="audio-next" @click="next"></div>
              <div class="audio-menu" @click="openSonglist"></div>
              <div class="audio-volume" @click="mute"></div>
            </div>
            <div class="audio-set-volume">9
              <div class="volume-box">
                <i><span></span></i>
              </div>
            </div>
            <div class="audio-list" v-show="songlistShow">
              <div class="audio-list-head">
                <p>☺随心听</p>
                <span class="menu-close" @click="openSonglist">关闭</span>
              </div>
              <ul class="audio-inline">
                <li v-for="song in playlist" style="">{{ song.FileName }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  import {SET_USER_INFO} from 'store/actions/type'
  export default {
    data() {
      return {
        activeIndex: -1,            //  当前播放歌曲角标
        songlistShow: false,        //  播放列表显示或隐藏
        playSwitch: true,
        totalTime: "00:00",
        now: "00:00",
        caonima: null

      }
    },
    mounted() {
      this.$refs.audio.addEventListener('play', function() {
        // 播放时长解析
        // 1. 进度条移动
        let progressWidth = parseInt($('.audio-setbacks').css('width'))
        let totalTime = this.transformSeconds(this.playlist[this.activeIndex].FileTime)
        let speed = progressWidth/totalTime
        this.now = this.transformTime(this.$refs.audio.currentTime)

        this.caonima = setInterval(() => {
          this.now = this.transformTime(this.$refs.audio.currentTime)
          $('.audio-backs-btn').css('right', this.transformSeconds(this.now )*speed * - 1 +'px')
        }, 1000);
      }.bind(this), false)

      this.$refs.audio.addEventListener('ended', function () {
        // 监听播放器是否播放完成
        if(this.playlist.length != 0) {
          if(this.activeIndex + 2 < this.playlist.length) {
            this.$refs.audio.src = this.playlist[this.activeIndex].MediaPath
            this.$refs.audio.play()
          }else {
            if(this.playlist.length == 1) {
              this.activeIndex = 0
            }else {
              this.activeIndex =  this.activeIndex +1
            }


          }
        }
        clearInterval(this.caonima)
            this.now = '00:00'
         $('.audio-backs-btn').css('right', "-4px")
      }.bind(this), false);
    },
    created() {
    },
    computed: {
      ...mapGetters({
        play: 'play',
        playlist: 'playlist'
      }),
    },
    watch: {
      'play': function() {
        if(this.play && this.playlist.length != 0) {
          this.$nextTick(() => {
            this.activeIndex = 0
            this.$refs.audio.src = this.playlist[this.activeIndex].MediaPath
            this.$refs.audio.playbackRate = 12
            this.$refs.audio.play()
            this.playSwitch = false
          })
        }

      },
    },
    methods: {
       ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      transformSeconds(total) {
        // 秒数转换
        let arr = total.split(':').reverse()
        let time = parseInt(arr[0])
        arr.forEach((t, i) =>{
          if(i > 0) {
            time = time + parseInt(t)*Math.pow(60,i)
          }
        })
        return time
      },
      logout() {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success("退出成功")
          this.set_user_info(null)
          setTimeout(this.$router.replace({name: "login"}), 500)
        }).catch(() => {

        })
      },
      setting(){
        this.$router.push('/setting')
      },
      prev() {
        if(this.playlist.length > 1) {
          if(this.activeIndex - 1 >= 0) {
            this.activeIndex = this.activeIndex - 1
            this.$refs.audio.src = this.playlist[this.activeIndex].MediaPath
            this.$refs.audio.play()
          }else {
            this.activeIndex = this.playlist.length -1
            this.$refs.audio.src = this.playlist[this.playlist.length -1].MediaPath
            this.$refs.audio.play()
          }
        }
      },
      next() {
        if(this.playlist.length > 1) {
          if(this.activeIndex + 2 <= this.playlist.length) {
            this.activeIndex = this.activeIndex + 1
            this.$refs.audio.src = this.playlist[this.activeIndex].MediaPath
            this.$refs.audio.play()
          }else {
            this.activeIndex = 0
            this.$refs.audio.src = this.playlist[0].MediaPath
            this.$refs.audio.play()
          }
        }

      },
      playToggle() {
        if(this.playlist.length != 0) {
          if(this.playSwitch) {
            this.$refs.audio.play()
          }else {
            this.$refs.audio.pause()
          }
          this.playSwitch = !this.playSwitch
        }
      },
      openSonglist() {
        // 播放列表显示或隐藏
        this.songlistShow = !this.songlistShow
      },
      mute() {
        this.$refs.audio.muted = !this.$refs.audio.muted
      },
      transformTime(seconds) {
        let m, s;
        m = Math.floor(seconds / 60);
        m = m.toString().length == 1 ? ('0' + m) : m;
        s = Math.floor(seconds - 60 * m);
        s = s.toString().length == 1 ? ('0' + s) : s;
        return m + ':' + s;
      },
      close() {

      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">
  .audio-inline {
    li {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
  }
</style>
