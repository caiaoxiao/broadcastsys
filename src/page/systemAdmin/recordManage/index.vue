<template>
  <div ><!--tab02录音管理-->
    <div class="tableTool">
      <button type="submit" @click="prePlay" class="btn btn-sm btn-info" id="play"><i :class="recordPlay(recordState)" aria-hidden="true"></i>{{recordState}}</button>
      <a download @click="downLoad()" class="btn btn-sm btn-info"><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</a>
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <label>呼叫时间</label>
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="color:#333;">
            </el-date-picker> 
          </div>
          <div class="form-group">
            <label>主叫号码</label>
            <input type="text" v-model.number="formData.callernumber" class="form-control" style="width:70px;">

          </div>
          <div class="form-group">
            <label>被叫号码</label>
            <input type="text" v-model.number="formData.calleenumber" class="form-control" style="width:70px;">
          </div>
          <div class="form-group" @click="typeSwitch">
            <label>文件类型</label>
            <span :class="fileType == '通话录音' ? 'selected' : ''">通话录音</span>
            <span :class="fileType == '会议录音' ? 'selected' : ''">会议录音</span>
          </div>
          <button @click="queryRecord()" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
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
            <td>{{item.startstamp}}</td>
            <td>{{item.callernumber}}</td>
            <td>{{item.calleenumber.substring(0,4)}}</td>
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
        recordState: '播放', 
        fileType: '通话录音',           // 默认文件类型
        formData: {
          calleenumber: '',
          callernumber: '',
          // startstamp: null,
          // endstamp: null,
          BeginTime: null,
          EndTime: null, 
        },
        dataAll: [], 
        downloadfile: null,
        instance : this.$ajax.create({
          baseURL: 'https://scc.ieyeplus.com:8001/'
        }), 
        mediaPath: '',
        value: '',
      }
    },
    created() {
     this.refresh()
    },
    computed: {
      ...mapGetters({
        pageData: 'pageData',
        // mediaPath: 'mediaPath',
        whetherPlayAnotherRecord: 'whetherPlayAnotherRecord',
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
      },  
      'mediaPath': function(newval, oldval) {
        if(oldval != ''){
          this.$store.dispatch('setWhetherPlayAnotherRecord','yes')
        }
      }
    },
    methods: {
      refresh() {
        this.formData = Object.assign( this.formData, this.pageData);
        this.$ajax.post('CallRecord/List', this.formData)
          .then(function(res) {
            if(res.data.code == 1) {
              console.log(res.data.result)
              this.dataAll = res.data.result
              this.pageData.total = res.data.total
            }
          }.bind(this))
      },
      selectClick(item, index) {
        let target = $(".table>tbody>tr").eq(index)
        this.downloadfile = item 
        var s7 = '';
        if(target.hasClass('selected')) {
          this.mediaPath = ''
        }else {
          var arr1 = item.startstamp.split("-");
          var s1 = arr1[0] + arr1[1] + arr1[2];
          var arr2 = s1.split(":");
          var s2 = arr2[0] + arr2[1] + arr2[2];
          var s3 = s2.replace(' ','');
          var s4 = s3.substr(0,12);
          var s5 = item.uuid.substr(1);
          var s6 = s4 + s5;
          s7 = 'https://scc.ieyeplus.com:8443/IpBcFiles/recording/'+s6+'.mp3';
          for(var i=0; i<10; i++) {
            if(i != index){
              let aaa=$(".table>tbody>tr").eq(i)
              if(aaa.hasClass('selected')){
                aaa.toggleClass("selected")
              }else {
              }
            }else{
            }
          }
        }
        target.toggleClass("selected")
        this.mediaPath = s7;
        this.$store.dispatch('setMediaPath',s7);
      },
      prePlay() {
        if(this.whetherPlayAnotherRecord == 'no') {
          console.log("The same record");
          if(this.recordState == '暂停') {
            this.recordState = '播放'
            var audio = document.getElementById("music");
            audio.src = this.mediaPath;
            audio.pause(); 
          }else {
            this.recordState = '暂停'
            var audio = document.getElementById("music");
            audio.src = this.mediaPath;
            audio.play();
          }
        }else {
         if(this.recordState == '播放') {
           console.log("Another song");
           this.recordState = '暂停'
           var audio = document.getElementById("music");
           audio.src = this.mediaPath;
           audio.play(); 
           this.$store.dispatch('setWhetherPlayAnotherRecord','no')
         }else {
           this.recordState = '播放'
           var audio = document.getElementById("music");
           audio.pause();    
         }
        }

      },
      downLoad() {
        if(this.downloadfile == null) {
        }else {
	/*
          this.instance({
          method: 'post',
          url: '/file/download/'+ this.downloadfile.callid,
          data:{
          }
          }).then((res)=>{
             console.log("下载成功")
          }) 
	*/
	window.open(`https://scc.ieyeplus.com:8001/file/download/${this.downloadfile.callid + '.mp3'}`)
        } 
      },
      queryRecord() {
        Date.prototype.format = function(format) {  
          var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
            "S" : this.getMilliseconds() //millisecond
          }
          if(/(y+)/.test(format)) format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(var k in o) 
            if(new RegExp("("+ k +")").test(format)) format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));    
          return format;
        }
        // if(this.formData.time != null && typeof(this.formData.time) != 'string') this.formData.time = this.formData.time.format('yyyy-MM-dd') 
        this.formData.BeginTime = this.value[0].format('yyyy-MM-dd hh:mm:ss')   
        this.formData.EndTime = this.value[1].format('yyyy-MM-dd hh:mm:ss') 
        this.refresh()
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
  .el-time-spinner__item {
    color: #555!important;
  }
  .el-picker-panel .el-date-range-picker .has-time, .el-picker-panel__body-wrapper, .el-picker-panel__body, .el-date-range-picker__time-header, .el-date-range-picker__editors-wrap, .el-date-range-picker__time-picker-wrap {
    color: #333;
  }
</style>
