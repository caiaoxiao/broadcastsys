<template>
  <div >	<!--tab01文件管理-->
    <div class="musicMenuHalf">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>播放列表
        <p @click="addSongList"><i class="fa fa-plus" aria-hidden="true"></i></p>
      </div>
      <div id="height08">
        <div class="songSheet" v-for="(songList,index) in playList" @click="(()=> songList.unfold = !songList.unfold)">
          <div class="songSheetName">
            <div class="songSetting">
              <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
              <p :contenteditable="songList.contenteditable"  @blur="renameSongList(songList, $event)">
                {{songList.FolderName}}
              </p>
              <span class="musicNum" @click="qsss(songList, index)">[{{ songList.Files ? songList.Files.length :0}}]</span>
              <span class="nameSetting" @click.stop="(()=>{ songList.contenteditable = true })">重命名</span>
              <span  class="nameSetting" @click.stop="deleteSongList(songList.FolderID)">删除歌单</span>
            </div>
          </div>
          <div v-if="songList.unfold">
            <ul class="musicList" v-for="fileItem in songList.Files" >
              <li>
                <p>{{ fileItem.FileName }}</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li @click="upload(fileItem)"><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
                  <li @click="removeFile(songList, fileItem)"><i class="fa fa-times" aria-hidden="true"></i>移除</li>
                </ul>
                <span class="totalTime Grid-cell">05:12</span>
              </li>
              <!-- <li>
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
               </li>-->

            </ul>

          </div>
          <div class='addFlies'>
            <span @click="uploadFile(1, songList.FolderID)">
              <i class='fa fa-file-o' aria-hidden='true' ></i>
             
               <input type="file" :class="songlist(songList.FolderID)"
                     @change="uploadFileChange($event, songList.FolderID)"
                     style="display: none;"
                     accept="audio/*"
                     value="">
              添加文件
            </span>
            <span><i class='fa fa-folder-open-o' aria-hidden='true'></i>添加文件夹</span>
          </div>
        </div>

      </div>
    </div>


    <div class="musicMenuHalf">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>默认列表
      </div>
      <div class="tableTool Grid">
        <ul class="musicListTools Grid-cell">
          <li @click.stop="audition('')"><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
          <li @click.stop="download('')"><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
          <li @click.stop="deleteFileList"><i class="fa fa-times" aria-hidden="true"></i>删除</li>
          <li>
            <i class="fa fa-plus" ></i>
            <input type="button"
                   @click.stop="addBlur()"  value="添加到">
            <div v-if="songListShow" v-for="songList in playList" @mouseout="addBlur()">
              <span style="height:20px;width:20px;"  @click.self="addFileToPlaylist('', songList)">{{songList.FolderName}}</span>
            </div>

          </li>
        </ul>
        <div class="operate Grid-cell">
          <form class="form-inline">
            <div class="form-group">
              <label>文件名</label>
              <input type="text" class="form-control" v-model="queryFileName">
              <button type="button" @click="queryDefaultList" class="btn btn-info">
                <i class="fa fa-search" aria-hidden="true"></i>查询
              </button>

            </div>
          </form>
        </div>
      </div>
      <ul class="musicList" id="height09">
        <li class="Grid" :class="{selected: file.selected}"
            v-for="(file, index) in defaultList"  @click="fileClick(file,index)">
          <p class="Grid-cell" style="overflow:hidden;height: 35px;">{{ file.FileName }}</p>
          <ul class="musicListTools Grid-cell">
            <li v-if="file.MediaType == 3"  @click.stop="priview(file)">
              <i class="fa fa-file-text-o" aria-hidden="true"></i>预览
            </li>
            <li @click="audition(file)" v-if="file.MediaType == 1">
              <i class="fa fa-play-circle" aria-hidden="true"></i>试听
            </li>
            <li @click.stop="download(file)"><i class="fa fa-cloud-download" aria-hidden="true"></i>下载</li>
            <li @click.stop="deleteFile(file)"><i class="fa fa-times" aria-hidden="true"></i>删除</li>
            <li id="add">
              <i class="fa fa-plus" aria-hidden="true"></i>
              <input type="button"
                 @click.stop="addBlur(file)"  value="添加到">
             <div>
              <div :class="songlist(songList.FolderID)" v-if="file.songListShow" v-for="songList in playList">
                <span class="songlist(songList.FolderID)" value=songList.FolderName @click.self="addFileToPlaylist(file, songList)">{{songList.FolderName}}</option>
              </div>
             </div>
            </li>
          </ul>
          <span class="totalTime Grid-cell">
            <span  v-if="file.MediaType == 1"> {{ file.FileTime}}</span>

          </span>
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
              <input type="text" class="form-control" id="inputEmail3" v-model="TextSubject">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">文本内容</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3" v-model="Content"></textarea>
            </div>
          </div>
        </form>
        <div class="localFile">
          <button class="btn btn-info " type="button" @click="addText">添加</button>

        </div>
      </div>
      <!--<div class="localFile">
        <button type="button" class="btn btn-info ">选择本地文件</button>
        <button type="button" class="btn btn-info ">选择本地文件夹</button>
    </div>-->


    </div>
    <confirm-dialog @submit="confirm">
      <div slot="content">
        <p >{{dialogText}}</p>
      </div>
    </confirm-dialog>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  import {confirmDialog} from 'components'
  export default {
    data() {
      return {
        playList: [],             //播放列表,
        defulatList: [],          //默认列表
        submitType: 0,            //确定按钮的状态，1为歌单，2为文件
        deleteId: null,           //要删除的文件或歌单的id
        dialogText: null,         //弹窗显示的文本内容
        activeIndex: '',          //当前点击的添加歌单
        TextSubject: '',          //文本标题
        Content: '',              //文本内容
        defaultList:[],           //默认文件列表
        filePaths: [],            //勾选的默认文件列表
        songListShow: false,      //批量添加到歌单 显示隐藏
        queryFileName: ''
      }
    },
    created() {
      this.$nextTick(function() {
        this.refresh()
      })
    },
    components: {
      confirmDialog
    },
    computed: {
      ...mapGetters({
        dialogStatu: 'dialogStatu',
      }),
    },
    methods: {
      addBlur(file) {
        console.log(this.playList);
        if(file) {
          file.songListShow = !file.songListShow

        }else {
          this.songListShow = !this.songListShow
        }
      },
      refresh() {
        // 1、查询歌单数组
        this.$ajax.get('Folder/getTreeFiles', {params: {UserID: '133585596bb04c9cbe311d0859dd7196'}})
          .then(res => {
            if(res.data.code == 1) {
              let result = res.data.result
              result.forEach(function(r,i){
                r.contenteditable = false
                r.unfold = false
              })
              this.playList = result
            }
          })

        this.queryDefaultList()

      },
      queryDefaultList() {
        // 2、查询右侧所有文件
        if(this.queryFileName != '') {
          this.$ajax.post('File/List', {FileName: this.queryFileName})
            .then(res => {
              if(res.data.code == 1) {
                console.log("文件列表查询成功")
                let result =  res.data.result
                result.forEach(function(r,i){
                  r.songListShow = false
                  r.selected = false
                })
                this.defaultList = result
              }
            })
        }else {
          this.$ajax.post('File/List', '')
            .then(res => {
              if(res.data.code == 1) {
                console.log("文件列表查询成功")
                let result =  res.data.result
                result.forEach(function(r,i){
                  r.songListShow = false
                  r.selected = false
                })
                this.defaultList = result
              }
            })
        }

      },
      audition(file) {
        let playlist = this.$store.state.player.playlist
        if(file != '') {
          playlist.push(file)
          this.$store.dispatch('setPlaylist', playlist)
          this.$store.dispatch('setPlay', true)

        }else {
          if(this.filePaths.length != 0) {
            this.filePaths.forEach(function(r, i) {
              playlist.push(r)
            })
            debugger
            this.$store.dispatch('setPlaylist', playlist)
            this.$store.dispatch('setPlay', true)
          }
        }
      },
      addSongList() {
        // 添加歌单
        let request = {
          FolderName: '新建歌单',
          UserID: '133585596bb04c9cbe311d0859dd7196',
          FolderType: 1
        }
        this.$ajax.post('Folder/Create', request)
          .then(res => {
            let result = res.data.result
            if(res.data.code == 1) {
              result.FolderID
            }
          })
        this.playList.push({
          FolderName: '新建歌单',
          contenteditable: true,
          musicList: []
        })
      },

      addFileToPlaylist(file, songList) {
        // 添加文件至歌单
        if(file == '') {
          if(this.filePaths.length != 0) {
            this.$ajax.post(`FolderMedia/CreateList/${songList.FolderID}`, this.filePaths)
              .then(res => {
                if(res.data.code == 1) {

                }
              })
          }else {
            this.submitType = 6
            this.dialogText = "所选文件不能为空"
          }

        }else {
          let request = {
            FolderID: songList.FolderID,
            MediaID: file.MediaID
          }

          this.$ajax.post('FolderMedia/Create',request)
            .then(res => {
              file.songListShow = false

              if(res.data.code == 1) {
                this.refresh()
              }else {
                console.log("歌单中已有此文件，不能重复添加")
              }
            })
        }

      },

      renameSongList(item, event) {
        // 歌单重命名
        item.contenteditable = true
        let request = {
          FolderName: event.target.textContent,
          UserID: '133585596bb04c9cbe311d0859dd7196',
          FolderType: 1,
          FolderID: item.FolderID
        }
        this.$ajax.put('Folder/Edit',request)
          .then(res => {
            if(res.data.code == 1) {
              console.log("修改成功")
              this.refresh()
            }
          })
      },

      removeFile(songList,file) {
        // 从歌单删除文件
        this.$store.dispatch('setDialogShow', true)
        this.submitType = 2
        this.deleteId = [songList, file]
        this.dialogText = "您确定要从歌单移除此文件吗?"
      },
      deleteSongList(id) {
        // 删除歌单
        this.$store.dispatch('setDialogShow', true)
        this.submitType = 1
        this.deleteId = id
        this.dialogText = "您确定要删除此歌单吗?"
      },

      uploadFile(type,item) {
        /* type=1:点击文件上传，type=2:点击文件夹上传 */
        
        if(type == 1) {
          console.log("888888");
          $('.' + item).click()
        }else if(type == 2) {
          console.log("999999");
        }
      },


      uploadFileChange(event, id) {
        // 监听上传文件事件
      
        let files = event.target.files
        let request = new FormData();
        if(!files[0]) {return}
        request.append('folderId', id);
        request.append('file', files[0]);

        if(files.length != 0) {
          console.log("请选择文件")
          this.$ajax.post(`File/UploadFiles/${'133585596bb04c9cbe311d0859dd7196'}`, request)
            .then(res => {
              if(res.data.code == 1) {
                console.log("上传成功")
                this.refresh()

              }
            })
        }
      },

      confirm() {
        // 弹窗确定事件
        if(this.submitType == 1) {
          // 移除歌单
          this.$ajax.delete(`Folder/Remove/${this.deleteId}`,'')
            .then(res => {
              if(res.data.code == 1) {
                this.$store.dispatch('setDialogShow', false)
                this.refresh()
                this.deleteId = []
              }else {

              }
            })
        }
        else if(this.submitType == 2){
          //移除歌单中文件
          let request = [{
            FolderID: this.deleteId[0].FolderID,
            MediaID: this.deleteId[1].MediaID
          }]
          this.$ajax.post('FolderMedia/RemoveList', request)
            .then(res => {
              if(res.data.code == 1) {
                this.refresh()
                this.deleteId = []
                this.$store.dispatch('setDialogShow', false)
              }
            })
        }
        else if(this.submitType == 3){
          //删除文件
          this.$ajax.post('File/RemoveList',  this.filePaths)
            .then(res => {
              if(res.data.code == 1) {
                console.log("删除文件成功")
                this.refresh()
                this.$store.dispatch('setDialogShow', false)
              }
            })
        }else if(this.submitType == 4) {
          // 添加文本
          let request = {
            UserID: '133585596bb04c9cbe311d0859dd7196',
            TextSubject: this.TextSubject,
            Content: this.Content
          }
          this.$ajax.post('File/UploadText', request)
            .then(res => {
              if(res.data.code == 1) {
                this.refresh()
                this.Content = ''
                this.TextSubject =''
                console.log("添加文本成功")
                this.$store.dispatch('setDialogShow', false)

              }else {

              }
            })
        }else if(this.submitType == 5 ) {
          // 批量删除
          this.$ajax.post('File/RemoveList', this.filePaths)
            .then(res => {
              if(res.data.code == 1) {
                this.refresh()
                this.filePaths = []
                this.$store.dispatch('setDialogShow', false)

              }
            })
        }else if(this.submitType == 6) {
          // 确定事件为关闭弹窗
          this.$store.dispatch('setDialogShow', false)
        }
        this.submitType = 0
      },

      /* 默认列表相关事件 */
      deleteFile(file) {
        // 删除列表文件
        this.$store.dispatch('setDialogShow', true)
        this.filePaths = [file.MediaPath]
        this.submitType = 3
        this.dialogText = "您确定要从默认列表中删除此文件吗?"
      },
      deleteFileList() {
        // 批量删除列表文件
        if(this.filePaths.length != 0) {
          this.submitType = 5
          this.$store.dispatch('setDialogShow', true)
          this.dialogText = "您确定要从默认列表中删除这些文件吗?"
        }
      },

      download(file) {
        // 下载文件
        if(file =='') {
          if(this.filePaths.length !=0) {
            this.filePaths.forEach(function(f,i) {
              window.open(`https://scc.ieyeplus.com:8443/IpBc/File/Download/${f.MediaID}`)
            })
          }
        }else {
          window.open(`https://scc.ieyeplus.com:8443/IpBc/File/Download/${file.MediaID}`)
        }
      },
      addText() {
        // 添加文本
        if(this.TextSubject =='' || this.Content =='') {
          console.log("输入的文本不能为空")
          return;
        }

        this.$store.dispatch('setDialogShow', true)
        this.submitType = 4
        this.dialogText = "您确定要添加文本吗?"

      },
      fileClick(file, index) {
        // 文件点击事件
        if(file.selected) {
          this.filePaths.splice(index, 1)
        }else {
          this.filePaths.push(file)
        }
        file.selected = !file.selected
      },
      priview(file) {
        // 预览文本
        this.$ajax.get(`File/PreviewText/${file.MediaID}`)
          .then(res => {
            if(res.data.code == 1) {

              this.$store.dispatch('setDialogShow', true)
              this.submitType = 6
              this.dialogText = res.data.result.Content
            }
          })
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">
  .songSetting {
    display: flex;
    input{
      border: none;
      margin-left: 10px;
      background: #313439;
      color: #ddd;
      flex: 1;
    }


  }
  .Grid {
    display: flex;
    .Grid-cell:first-child {
      margin-left: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .Grid-cell:last-child {
      flex: 1;
    }
    .Grid-cell {
      flex: 3;
    }
    .totalTime {
      text-align: center;
    }
  }
  #height09 {
    .Grid {
      display: flex;
      .Grid-cell:first-child {
        flex: 2;
        margin-left: 10px;
      }
      .Grid-cell:last-child {
        flex: 1;
      }
      .Grid-cell {
        flex: 3;
      }
      .totalTime {
        text-align: center;
      }
    }
  }

  #add {
    input {
      background: none;
      border: none;
      padding: 0;
      outline: none;
    }
    input:hover {
      border: none;
      color: #fff;
      padding: 0;
    }
  }
  .musicListTools {
    a {
      color: #fff;
    }
    a:hover {
      text-decoration: none;
    }
  }
  #height09 .selected{
    background: #000;
  }
  .form-inline .form-group {
    margin-right: 0;
  }
  .tableTool {
    line-height: 35px;
    input[type="button"]{
      border: none;
      background: #313439;
      color: #fff;
      flex: 1;
      padding: 0;
      outline: none;
    }
    .musicListTools {
      flex: 1.3 !important;
    }
    .operate {
      flex: 1.5 !important;

    }
  }
</style>
