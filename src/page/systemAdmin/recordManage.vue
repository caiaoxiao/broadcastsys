<template>
  <div ><!--tab02录音管理-->
    <div class="tableTool">
      <button type="submit" class="btn btn-sm btn-info" id="play"><i class="fa fa-play" aria-hidden="true"></i>播放</button>
      <button type="submit" class="btn btn-sm btn-info"><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</button>
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <label>呼叫时间</label>
            <el-date-picker
              v-model="formData.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="form-group">
            <label>主叫号码</label>
            <input type="text" v-model.number="formData.callNumber" class="form-control" style="width:70px;">

          </div>
          <div class="form-group">
            <label>被叫号码</label>
            <input type="text" v-model="formData.calledNumber" class="form-control" style="width:70px;">
          </div>
          <div class="form-group">
            <label>文件类型</label>
            <span class="selected">通话录音</span>
            <span>会议录音</span>
          </div>
          <button type="submit" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
        </form>
      </div>
    </div>
    <div class="table">
      <table class="table">
        <thead>
        <tr >
          <td>呼叫时间</td>
          <td>主叫号码</td>
          <td>被叫号码</td>
          <td>通话时长（秒）</td>
          <td>应答状态</td>
          <td>录音</td>
        </tr>
        </thead>
        <tbody>
        <tr @click="trClick(0)">
          <td>2017-11-05 13:00:00</td>
          <td>700</td>
          <td>300</td>
          <td>15</td>
          <td>应答</td>
          <td>11.MP3</td>
        </tr>
        <tr>
          <td>2017-11-05 13:00:00</td>
          <td>700</td>
          <td>300</td>
          <td>15</td>
          <td>应答</td>
          <td>11.MP3</td>
        </tr>
        <tr>
          <td>2017-11-05 13:00:00</td>
          <td>700</td>
          <td>300</td>
          <td>15</td>
          <td>应答</td>
          <td>11.MP3</td>
        </tr>
        <tr>
          <td>2017-11-05 13:00:00</td>
          <td>700</td>
          <td>300</td>
          <td>15</td>
          <td>应答</td>
          <td>11.MP3</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import { Button, Select } from 'element-ui'
  export default {
    data() {
      return {
        formData: {
          calledNumber: 2222,
          callNumber: '',
          time: new Date()
        }
      }
    },
    methods: {
      trClick(index) {
          debugger
        $(".table>tbody>tr").eq(index).toggleClass("selected")
      },
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">
  .form-group {
    .el-input__icon {
      color: #555;
    }
    .el-input__inner {
      background-color: #272D33;
      color: #555;
      border: none;
    }
  }

</style>
