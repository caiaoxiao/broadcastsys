<template>
  <div >	<!--tab01文件管理-->
    <div class="musicMenuHalf">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>播放列表
        <p @click="addMenu();"><i class="fa fa-plus" aria-hidden="true"></i></p>
      </div>
      <div id="height08">
        <div class="songSheet">
          <div class="songSheetName">
            <div class="songSetting">
              <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
              <p contenteditable="false">歌单名称</p>
              <span class="musicNum">[10]</span>
              <span class="nameSetting">重命名</span>
            </div>

          </div>
          <ul class="musicList">
            <li>
              <p>洗刷刷.mp3</p>
              <ul class="musicListTools">
                <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
                <li>
                  <i class="fa fa-plus" aria-hidden="true"></i>添加到
                  <div>
                    <span>歌单一</span>
                    <span>歌单二</span>
                    <span>歌单三</span>
                  </div>
                </li>
              </ul>
              <span class="totalTime">05:12</span>
            </li>
            <li>
              <p>噢噢噢噢.text</p>
              <ul class="musicListTools">
                <li><i class="fa fa-file-text-o" aria-hidden="true"></i>预览</li>
                <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
                <li>
                  <i class="fa fa-plus" aria-hidden="true"></i>添加到
                  <div>
                    <span>歌单一</span>
                    <span>歌单二</span>
                    <span>歌单三</span>
                  </div>
                </li>
              </ul>
              <span class="totalTime">05:12</span>
            </li>
            <li>
              <p>xixix.wma</p>
              <ul class="musicListTools">
                <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
                <li>
                  <i class="fa fa-plus" aria-hidden="true"></i>添加到
                  <div>
                    <span>歌单一</span>
                    <span>歌单二</span>
                    <span>歌单三</span>
                  </div>
                </li>
              </ul>
              <span class="totalTime">05:12</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="musicMenuHalf">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>默认列表
      </div>
      <div class="tableTool">
        <ul class="musicListTools">
          <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
          <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
          <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
          <li>
            <i class="fa fa-plus" aria-hidden="true"></i>添加到
            <div>
              <span>歌单一</span>
              <span>歌单二</span>
              <span>歌单三</span>
            </div>
          </li>
        </ul>
        <div class="operate">
          <form class="form-inline">
            <div class="form-group">
              <label>文件名</label>
              <input type="text" class="form-control">
            </div>
            <button type="submit" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
          </form>
        </div>
      </div>
      <ul class="musicList" id="height09">
        <li>
          <p>洗刷刷.mp3</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li id="add">
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>噢噢噢噢.text</p>
          <ul class="musicListTools">
            <li><i class="fa fa-file-text-o" aria-hidden="true"></i>预览</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
        <li>
          <p>xixix.wma</p>
          <ul class="musicListTools">
            <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
            <li><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li>
              <i class="fa fa-plus" aria-hidden="true"></i>添加到
              <div>
                <span>歌单一</span>
                <span>歌单二</span>
                <span>歌单三</span>
              </div>
            </li>
          </ul>
          <span class="totalTime">05:12</span>
        </li>
      </ul>
      <div class="menuType">
        <i class="fa fa-file" aria-hidden="true"></i>添加文本
      </div>
      <div class="padding">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">文本标题</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputEmail3" placeholder="Email">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">文本内容</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3"></textarea>
            </div>
          </div>
        </form>
        <div class="localFile">
          <button class="btn btn-info " type="button">添加</button>

        </div>
      </div>
      <!--<div class="localFile">
        <button type="button" class="btn btn-info ">选择本地文件</button>
        <button type="button" class="btn btn-info ">选择本地文件夹</button>
    </div>-->


    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      addMenu() {
        var dd;
        dd = "<div class='songSheet'>";
        dd += "<div class='songSheetName'><div class='songSetting'><span class='toggle'>";
        dd += "<i class='fa fa-angle-right' aria-hidden='true'></i></span>";
        dd += "<p contenteditable='true'>新建歌单</p>";
        dd += "<span class='musicNum'>[0]</span>";
        dd += "</div></div></div>";
        dd+="<div class='addFlies'>";
        dd+="<span><i class='fa fa-file-o' aria-hidden='true'></i>添加文件</span>";
        dd+="<span><i class='fa fa-folder-open-o' aria-hidden='true'></i>添加文件夹</span>";
        dd+="</div>";
        $("#height08").append(dd);
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
