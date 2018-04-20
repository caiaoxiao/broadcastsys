<remplate>
  <!--设备信息新增-->
  <div class="popUp" style="display: block;" :visible.sync="dialogFormVisible">
    <div class="popContent">
      <form class="form-horizontal">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备类型</label>
              <div class="col-sm-8"><label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                单话机
              </label>
                <label class="radio-inline">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                  视频终端
                </label></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">绑定摄像头IP</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" >
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btnDiv">
      <button type="submit" class="btn btn-sm btn-info">确定</button>
      <button type="submit" class="btn btn-sm btn-default">取消</button>
    </div>
  </div>
</remplate>
