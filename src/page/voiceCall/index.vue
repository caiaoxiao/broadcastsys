<template>
  <div >
    <left-phone></left-phone>
    <div class="middleCon">
      <div class="module">
        <ul class="nav nav-justified choose" data-name="title">
          <li class="on">全部</li>
          <li>分组</li>
        </ul>
        <div data-name="con">
          <div class="moduleList" id="height01">
            <div class="singleM">
              <div class="moduleStyle online " @click.stop="itemClick">
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
                <div class="moduleNum">700</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">在线</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling " @click.stop="itemClick">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端

                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling01">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                  <span><img src="../../assets/img/record.gif" /></span>
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle waitting" @click.stop="itemClick">
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
                <li class ="on">部门一</li>
                <li >部门二</li>
              </ul>
            </div>
            <div class="rightDetailList" data-name="con">
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
                      <div class="moduleNum">900</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">1600</div>
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
                      <div class="moduleNum">1000</div>
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
      <div class="functionMenu">
        <ul class="nav nav-justified menuList">
          <li id="a1"><i class="fa fa-phone fa-2x" aria-hidden="true"></i><span>呼叫</span></li>
          <li id="a2"><i class="fa fa-volume-control-phone fa-2x" aria-hidden="true"></i><span>强行通话</span></li>
          <li id="a3"><i class="fa fa-window-close fa-2x" aria-hidden="true" onclick="$('#eeee').show();"></i><span>强拆</span></li>
          <li id="a4"><i class="fa fa-deaf fa-2x" aria-hidden="true"></i><span>强插</span></li>
          <li id="a5"><i class="fa fa-headphones fa-2x" aria-hidden="true"></i><span>监听</span></li>
          <li id="a6"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i><span>代接</span></li>
          <li id="a7"><i class="fa fa-reply fa-2x" aria-hidden="true" onclick="$('#noNum').show();"></i><span>转到</span></li>
          <li id="a8"><i class="fa fa-play fa-2x" aria-hidden="true"></i><span>录音</span></li>

        </ul>
      </div>
    </div>
    <right-phone></right-phone>
    <device-list></device-list>
    <switchs></switchs>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/voiceCall'
  import { leftPhone, rightPhone, deviceList, switchs} from 'components'
  export default {
    components: {
      leftPhone,
      rightPhone,
      deviceList,
      switchs
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    methods: {

      play() {
        $('.playMenu').removeClass('Hide').addClass('Show');
      }
    }
  }
</script>

<style scoped>


</style>
