<template>
  <div class="popSp"  id="ccc">
    <div>
      <div class="planName padding">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-1 control-label">预案名称</label>
            <div class="col-sm-11">
              <input type="text" class="form-control" placeholder="">
            </div>
          </div>

        </form>
      </div>
      <div class="filesSelect">
        <ul class="nav nav-justified broadcast" data-name="title">
          <li class="on">播放列表</li>
          <li>实时文本</li>
        </ul>
        <div class="con" data-name="con">
          <div>
            <div class="selection">

              <div class="menuType"><i class="fa fa-outdent" aria-hidden="true"></i>播放列表</div>
              <div id="songListHeight">
                <div class="songSheet">
                  <div class="songSheetName">
                    <div class="songSetting">
                      <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                      <p contenteditable="false">歌单名称</p>
                      <span class="musicNum">[10]</span>

                    </div>
                    <span class="songSheetTool"><i class="fa fa-plus" aria-hidden="true"></i></span>
                  </div>
                  <ul class="musicList">
                    <li>
                      <p>洗刷刷.mp3</p>
                      <ul class="musicListTools">
                        <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>

                      </ul>
                      <span class="totalTime">05:12</span>
                    </li>
                    <li>
                      <p>噢噢噢噢.text</p>
                      <ul class="musicListTools">
                        <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>

                      </ul>
                      <span class="totalTime">05:12</span>
                    </li>
                    <li>
                      <p>xixix.wma</p>
                      <ul class="musicListTools">
                        <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>

                      </ul>
                      <span class="totalTime">05:12</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>




          </div>

          <div>
            <div class="textFlies">
              <textarea class="form-control"  id="textarea01"></textarea>

            </div>
          </div>
        </div>

      </div>
      <div class="detailSeclet ">
        <ul class="nav nav-justified broadcast" data-name="title">
          <li class="on">在线列表</li>
          <li>分组列表</li>
        </ul>
        <div class="con" data-name="con">
          <div>
            <div class="selectedList" id="height04">
              <div class="singleFlies">1002</div>
              <div class="singleFlies">2008</div>
              <div class="singleFlies">9281</div>
              <div class="singleFlies">9809</div>
            </div>
            <div class="selectAll">全选</div>
          </div>
          <div>
            <div class="sp-department">
              <ul data-name="title">
                <li class="on">部门一</li>
                <li>部门二bum</li>
              </ul>
            </div>
            <div class="sp-right" data-name="con">
              <div>
                <div class="selectedList" id="height05">
                  <div class="singleFlies">1002</div>
                  <div class="singleFlies">2008</div>
                  <div class="singleFlies">9281</div>
                  <div class="singleFlies">9809</div>
                </div>
                <div class="selectAll">全部</div>
              </div>
              <div>
                <div class="selectedList" id="height06">
                  <div class="singleFlies">123</div>
                  <div class="singleFlies">98760</div>
                  <div class="singleFlies">8866</div>
                  <div class="singleFlies">01928</div>
                </div>
                <div class="selectAll">全部</div>
              </div>
            </div>

          </div>
        </div>
        <div class="">
          <div class="menuType"><i class="fa fa-th-large" aria-hidden="true"></i>播放列表</div>
          <div class="selectedList" id="height07">
            <div class="singleFlies selectDelate">10092</div>
            <div class="singleFlies selectDelate">2006</div>
            <div class="singleFlies selectDelate">1009</div>
            <div class="singleFlies selectDelate">29009</div>
          </div>
          <div class="selectAll">全部删除</div>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="settingMoudle">
        <div class="settingTitle">选择时间</div>
        <div class="settingCon"></div>
      </div>
      <div class="settingMoudle">
        <div class="settingTitle">预约模式</div>
        <div class="settingCon">
          <span class="moudle moudleSelected">定时播放</span>
          <span class="moudle">XX播放</span>
        </div>
      </div>
      <div class="settingMoudle">
        <div class="settingTitle">播放次数</div>
        <div class="settingCon">
          <span class="times">-</span>
          <input type="text" value="1"/>
          <span class="times">+</span>
        </div>

      </div>
      <div class="settingMoudle">
        <div class="settingTitle">播放模式</div>
        <div class="settingCon">
          <span class="moudle moudleSelected">循环播放</span>
          <span class="moudle">按次播放</span>
        </div>
      </div>
    </div>
    <div class="btnDiv">
      <button type="button" class="btn btn-info " @click="close">确定</button>
      <button type="button" class="btn btn-default" @click="close">取消</button>
    </div>
  </div>


</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights} from 'utils/page/broadOrder'
  export default {
    data() {
      return {
        playCount: 0
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    methods: {
      compute(e) {
        let type = e.target.innerText
        if(type == '-') {
          if(this.playCount !== 0) {
            this.playCount = this.playCount - 1
          }
        }else if(type == '+') {
          this.playCount = this.playCount + 1
        }

      },
      close() {
        this.$store.dispatch('setDialogShow', false)
        $('#aa').show()
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
