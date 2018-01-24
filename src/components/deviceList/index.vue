<template>
  <div class="playList">
    <i class="fa fa-chevron-right" aria-hidden="true"  @click="close"></i>
    <div class="listTitle">播放设备列表</div>
    <div class="musicList" id="end">
    </div>
    <div class="selectAll" @click="removeAll">全部移除</div>
  </div>
</template>

<script>
  export default {
    methods: {
      close() {
        $(".playList").removeClass("ListShow").addClass("ListHide");
      },
      removeAll() {
        $('#end').html('');
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
