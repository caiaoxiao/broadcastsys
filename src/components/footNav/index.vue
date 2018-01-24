<template>
  <div class="bottomTools">
    <div class="userInfo">
      <div class="userImg"><img src="../../assets/img/ouba.jpg" /></div>
      <div class="userName"><span>张三<a @click="logout">[退出]</a></span><span class="org">所属机构</span></div>
    </div>

    <div class="span_large">
      <div class="location_indicator"></div>
    </div>

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
      <span class="fa fa-times" aria-hidden="true"></span>
      <div class="audio-container">
        <div class="audio-cover"><i class="fa fa-2x fa-music fa-spin"></i></div>
        <div class="audio-view">
          <div class="audio-title">未知歌曲</div>
          <div class="audio-body">
            <div class="audio-backs">
              <div class="audio-this-time">00:00</div>
              <div class="audio-count-time">00:00</div>
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
              <div class="audio-prev"></div>
              <div class="audio-play"></div>
              <div class="audio-next"></div>
              <div class="audio-menu"></div>
              <div class="audio-volume"></div>
            </div>
            <div class="audio-set-volume">
              <div class="volume-box">
                <i><span></span></i>
              </div>
            </div>
            <div class="audio-list">
              <div class="audio-list-head">
                <p>☺随心听</p>
                <span class="menu-close">关闭</span>
              </div>
              <ul class="audio-inline"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    created() {
      this.$nextTick(function (){
        $(".audio-box").hide();
        $(".musicList>div>p").click(function () {
          $(this).parent("div").toggleClass("selected");
        })
        $("i.fa-play-circle").click(function () {
          $(".audio-box").show();

        })
        $(".audio-box span.fa").click(function () {
          $(".audio-box").hide();
        })
      })

    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()  // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style scoped>

</style>
