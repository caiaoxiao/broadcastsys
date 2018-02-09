<template>
  <div >
    <left-phone></left-phone>
    <device-list></device-list>
    <div class="middleCon">

      <div class="module">
        <ul class="nav nav-justified choose" data-name="title">
          <li class="on">全部</li>
          <li>分组</li>
        </ul>
        <div data-name="con">
          <div class="moduleList" id="height01">
            <div class="singleM">
              <div class="moduleStyle online " @click="itemClick">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">在线</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle online ">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">在线</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle online ">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">在线</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling "  @click="itemClick">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端

                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                  <span><img src="../../assets/img/music.gif" /></span>
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle online ">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">振铃中</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle offline">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">离线</div>
              </div>
            </div>


          </div>
          <div class="moduleList">
            <div class="department">
              <ul data-name="title">
                <li class="on">部门一</li>
                <li>部门二</li>
              </ul>
            </div>
            <div class="rightDetailList" data-name="con">
              <div class="departDetail">
                <div class="detailCon">
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                </div>
                <div class="selectAll">全部选择</div>
              </div>
              <div class="departDetail">
                <div class="detailCon">
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">800</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">6001</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>

                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">600</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                </div>
                <div class="selectAll">全部选择</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <playList></playList>

      <div class="functionMenu">
        <ul class="nav nav-justified menuList">
          <li id="a2"><i class="fa fa-bullhorn fa-2x" aria-hidden="true"></i><span>喊话</span></li>
          <li id="a3" @click="play"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i><span>播放</span></li>
          <li id="a4"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i><span>全部结束</span></li>
        </ul>
      </div>
    </div>
    <right-phone></right-phone>
    <switchs></switchs>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights,itemClicks} from 'utils/page/ipBroad'
  import playList from './playList.vue'
  import {leftPhone, rightPhone, deviceList,switchs} from 'components'
  export default {
    data() {
      return {
      }
    },
    components: {
      leftPhone,
      rightPhone,
      deviceList,
      switchs,
      playList
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    methods: {

      itemClick(e) {
        itemClicks(e)
      },
      play() {
        $('.playMenu').removeClass('Hide').addClass('Show');
      }
    }
  }
</script>

<style scoped>

</style>
