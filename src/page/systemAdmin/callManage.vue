<template>
  <div><!--tab03呼叫记录-->
    <div class="tableTool">
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <label>呼叫时间</label>
            <input type="text" placeholder="开始时间" class="form-control select-width" style="width:200px;" calendar="YYYY-MM-DD hh:mm:ss" id="a1" />
            —
            <input type="text" placeholder="结束时间" class="form-control select-width" style="width:200px;" calendar="YYYY-MM-DD hh:mm:ss" id="a2" />
          </div>
          <div class="form-group">
            <label>主叫号码</label>
            <input type="text" class="form-control" style="width:70px;">

          </div>
          <div class="form-group">
            <label>被叫号码</label>
            <input type="text" class="form-control" style="width:70px;">
          </div>
          <button type="submit" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
        </form>
      </div>
    </div>
    <div class="table">
      <table class="table">
        <thead>
        <tr>
          <td>呼叫时间</td>
          <td>主叫号码</td>
          <td>被叫号码</td>
          <td>通话时长（秒）</td>
          <td>应答状态</td>
          <td>录音</td>
        </tr>
        </thead>
        <tbody>
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

</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
