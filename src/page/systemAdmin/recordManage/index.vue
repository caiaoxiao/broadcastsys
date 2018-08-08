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
            <input type="text" v-model.number="formData.calledNumber" class="form-control" style="width:70px;">
          </div>
          <div class="form-group" @click="typeSwitch">
            <label>文件类型</label>
            <span :class="fileType == '通话录音' ? 'selected' : ''">通话录音</span>
            <span :class="fileType == '会议录音' ? 'selected' : ''">会议录音</span>
          </div>
          <button @click="refresh" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
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
            <!--    <td>录音</td> -->
          </tr>
        </thead>
        <tbody>
          <tr @click="selectClick(item, index)" v-for="(item, index) in dataAll">
            <td>{{item.startStamp}}</td>
            <td>{{item.callerNumber}}</td>
            <td>{{item.calleeNumber}}</td>
            <td>{{item.duration}}</td>
            <td>应答</td>
            <!--    <td>
              <button type="submit" @click="prePlay(item)" class="btn btn-sm btn-info" id="play"><i class="fa fa-play" aria-hidden="true"></i>播放</button>
              <button type="submit" @click="stopRecord(item)" class="btn btn-sm btn-info"><i class="fa fa-pause" aria-hidden="true"></i>暂停</button>
            </td>   -->
          </tr>
        </tbody>
      </table>
    </div>
    <page></page>
    <audio id="music"></audio>
  </div>
</template>

<script>
  import { page } from 'components'
  import { mapGetters, mapActions } from 'vuex'
  import { Button, Select } from 'element-ui'
  export default {
    data() {
      return {
        fileType: '通话录音',           // 默认文件类型
        formData: {
          calleeNumber: '',
          callNumber: '',
          startStamp: null,
          endStamp: null,
        },
        dataAll: []
      }
    },
    created() {
     this.refresh()
    },
    computed: {
      ...mapGetters({
        pageData: 'pageData',
        mediaPath: 'mediaPath',
      })
    },
    components: {
      page
    },
    watch: {
      'pageData.pageSize': function() {
        this.refresh()
      },
      'pageData.pageIndex': function() {
        this.refresh()
      }
    },
    methods: {
      refresh() {
        this.formData = Object.assign( this.formData, this.pageData);
        this.$ajax.post('CallRecord/List', this.formData)
          .then(function(res) {
            if(res.data.code == 1) {
              this.dataAll = res.data.result
              this.pageData.total = res.data.total
            }
          }.bind(this))
      },
      selectClick(item, index) {
        let target = $(".table>tbody>tr").eq(index)
        var s7 = '';
        if(target.hasClass('selected')) {
          this.mediaPath = ''
        }else {
          console.log("here")
          var arr1 = item.startStamp.split("-");
          var s1 = arr1[0] + arr1[1] + arr1[2];
          var arr2 = s1.split(":");
          var s2 = arr2[0] + arr2[1] + arr2[2];
          var s3 = s2.replace(' ','');
          var s4 = s3.substr(0,12);
          var s5 = item.uuid.substr(1);
          var s6 = s4 + s5;
          s7 = 'https://scc.ieyeplus.com:8443/IpBcFiles/recording/'+s6+'.mp3';
        }
        target.toggleClass("selected")
        this.mediaPath = s7;
        this.$store.dispatch('setMediaPath',s7);
      },
      prePlay(item) {
        var arr1 = item.startStamp.split("-");
        var s1 = arr1[0]+arr1[1]+arr1[2];
        var arr2 = s1.split(":");
        var s2 = arr2[0]+arr2[1]+arr2[2];
        var s3 = s2.replace(' ','');
        var s4 = s3.substr(0,12);
        var s5 = item.uuid.substr(1);
        var s6 = s4 + s5;
        var audio = document.getElementById("music");
        audio.src = 'https://scc.ieyeplus.com:8443/IpBcFiles/recording/'+s6+'.mp3';
        audio.play();
        console.log(audio);
      },
      stopRecord(item) {
        console.log("888888");
      },
      typeSwitch(e) {
        this.fileType = e.target.innerText
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
