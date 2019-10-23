<template>
  <div class="DialogStockWrap">
    <el-dialog
      title="批量下行"
      :visible.sync="batchDownlinkVisible"
      :lock-scroll="lockScroll"
      width="870px"
      :before-close="batchCancelHandel"
      :close-on-click-modal="clickModalFlag"
      :close-on-press-escape="clickModalFlag">
      <div class="tempDownlink-mian">
        <el-form :inline="true"
                 :model="formAllData"
                 ref="formData"
                 :label-position="labelPosition"
                 :label-width="labelWidth"
                 class="hardware-form hardware-form-diy">
          <el-form-item class="is-required" label="设备类型:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.deviceTypeName"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="品牌:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.brand"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="型号:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.model"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="厂家:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.sourceId"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="协议号:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.deviceVersion"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="设备状态:">
            <el-input placeholder="暂无" :disabled="disabledF" v-model="formAllData.onlineState"></el-input>
          </el-form-item>
          <el-form-item class="is-required" label="运营中心:">
            <el-select placeholder="全部"
                       filterable
                       v-model.trim="formAllData.subCenterCode"
                       @change="changeSubcenterCode()"
            >
              <el-option v-for="(item,index) of subCenterNames"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="is-required" label="业主单位:" prop="unitName">
            <el-select placeholder="全部"
                       filterable
                       v-model.trim="formAllData.unitId"
                       @change="changeUnit()"
              >
              <el-option v-for="(item,index) of units"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="">
          <div class="dialog-list-wrap">
            <el-table v-loading.lock="isLoading" :data="tableData" ref="table" stripe show-overflow-tooltip @selection-change="handleSelectionChange">
              <el-table-column type="selection" :selectable="selectInit"></el-table-column>
              <el-table-column label="设备id" prop="deviceId" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="序列号" prop="controlHost" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="数据库协议/参数结构" prop="brand" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="安装位置" prop="deviceAddress" show-overflow-tooltip min-width="8%"></el-table-column>
            </el-table>
          </div>
          <div class="page-footer">
            <div class="pf-left">
              <span class="span-yx">已选({{multipleSelectionAll.length}})</span>
            </div>
            <div class="pf-right">
              <Pagination
                :widgetInfo="widgetInfo"
                v-on:sonHandleCurrentChange="sonHandleCurrentChange"
              />
            </div>
          </div>

          <div class="" style="height: 10px"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchCancelHandel">取 消</el-button>
        <el-button type="primary"
                   @click="submitHandel(formAllData.sourceId)"
                   :disabled="sumbmitFlag"
                   v-loading.fullscreen.lock="batchFullscreenLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!--    提醒  弹框-->
    <el-dialog custom-class="del-dialog-wrap"  :visible.sync="czdialogDelVisible" width="280px">
      <div class="del-dialog-main">
        <div class="icon-wrap">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="p-wrap">
          <p class="title-p">您勾选了未获取协议/参数结构的设备。确认操作后将首先查询，再对相同协议号的设备批量下行。是否确认操作？？</p>
          <p class="tips-p">删除后将不可恢复</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "~/components/Pagination";
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        tanzerData:{},
        formAllData:{},
        isSelectLoading:false,
        id:null,
        disabledF:true,
        submitFlag:false,
        batchDownlinkVisible: false, //弹框显示标识
        labelPosition:'top',
        lockScroll:true,
        clickModalFlag:false,//不通过遮罩层关闭
        batchFullscreenLoading:false,
        czdialogDelVisible:false,
        labelWidth:'90px',
        controlHostList:[],
        monitorIds:[],
        ckCoapData:[],
        brands: [
          {
            value: "天泽盒子",
            label: "天泽盒子"
          }
        ],
        sourceIdList:[{
          value: "tanZer",
          label: "tanZer"
        }],
        widgetInfo: {
          pageSize: 10,
          pageNo: 1,
          total: 0
        },
        tableData: [], //table查询结果
        isLoading: false,
        multipleSelection: [], //选中
        multipleSelectionAll: [], //全选
        idKey: "id", // 标识列表数据中每一行的唯一键的名称
        defalutVal:null,//默认选中的
        subCenterNames: [
          {
            value: "",
            label: "全部"
          }
        ],
        units: [
          {
            value: "",
            label: "全部"
          }
        ],

      };
    },
    computed:{
       sumbmitFlag(){
         return this.multipleSelectionAll.length === 0 ? true :false
       }
    },
    mounted() {
      const that = this;

    },
    beforeDestroy(){
      const that = this;
      that.formAllData={
        subCenterCode:null,
        unitId:null
      },
      that.multipleSelection=[];
      that.multipleSelectionAll=[];
      that.tableData=[];
      that.isLoading=false;
      that.batchDownlinkVisible = false;
      that.controlHostList = [];
      that.monitorIds=[];
    },
    methods: {
      /**
       * 确认下发
       */
      submitHandel(val){
        const that = this;
        switch (val) {
          case "ckCoap":
            that.ckCoapsubmitHandel();
            break;
          case "tanZer":
            that.tanZerSubmitHandel(that.tanzerData);
            break;
          case "bjlnUDP":
            that.LaSubmitHandel();
            break;
          case "hnla":
            that.LaSubmitHandel();
            break;
          default:
            console.log('我是其他')
            break;
        }
      },
      /**
       * 辰控水压批量确定按钮，
       */
      ckCoapsubmitHandel(){
         const that = this;
        //将所有选中的controlHost提取出来
        that.multipleSelectionAll.forEach((item) => {
          return that.controlHostList.push(item.controlHost)
        })
        //将该设备controlHost添加到第一项
        that.controlHostList.unshift(that.formAllData.controlHost);
        that.$emit('ckBatchDownLink',that.controlHostList)
      },
      /**
       * 天泽批量确定按钮
       */
      tanZerSubmitHandel(data){
        const that = this;
        //将所有选中的controlHost提取出来
        that.multipleSelectionAll.forEach((item) => {
          return that.controlHostList.push(item.controlHost)
        })
        //将该设备controlHost添加到第一项
        that.controlHostList.unshift(that.formAllData.controlHost);
        data.controlHostList = that.controlHostList;
        that.$emit('tanzerBatchDownLink',data);
      },
      /**
       * 乐鸟批量确定按钮
       */
      LaSubmitHandel(){
        const that = this;
        that.multipleSelectionAll.forEach((item) => {
          that.controlHostList.push(item.controlHost);
          that.monitorIds.push(item.id)
        })
        //将该设备controlHost添加到第一项
        that.controlHostList.unshift(that.formAllData.controlHost);
        that.monitorIds.unshift(that.formAllData.id);
        console.log(that.controlHostList,that.monitorIds)
        that.$emit('laBatchDownLink',that.monitorIds,that.controlHostList)
      },
      /**
       * 乐鸟参数清空
       */
      LaNumClear(){
        this.controlHostList=[];
        this.monitorIds=[]
      },
      /**
       * 判断选中设备是否存在未获取协议
       */
      existProtocolParam(){
        const that = this;
        this.$axios
          .$POST({
            api_name: "existProtocolParam",
            params: {
              monitorIds: that.monitorIds,
              controlHosts: that.controlHostList,
              sourceId: that.fromParent.sourceId,
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              //如果state不存在 或者state值为空 直接
              if (res.data.data.length) {
                that.czdialogDelVisible = true
                // this.$message.error("命令发送失败");
                return;
              }
            } else {
              console.log("失败");
            }
          });
      },
      /**
       * 切换运营中心
       */
      changeSubcenterCode(){
        this.formAllData.unitId = '';
        this.units =  [{
          value: "",
          label: "全部"
        }];
        if(this.formAllData.subCenterCode){
          this.findUnitValue();
        }
        this.changeUnit()

      },
      /**
       * 切换业主单位
       */
      changeUnit(){
        this.findBatchDownDeviceList();
        this.multipleSelection=[];
        this.multipleSelectionAll=[]
      },
      /**
       * 获取单位列表
       */
      findUnitValue () {
        this.isSelectLoading = true;
        this.$axios
          .$POST({
            api_name: "findUnitsVal",
            params: {
              subCenterCode: this.formAllData.subCenterCode
            },
            time: 30000
          })
          .then(res => {
            if (res.data.code === "success") {
              this.isSelectLoading = false;
              this.units = [
                {
                  value: "",
                  label: "全部"
                }
              ];
              var list = [];
              list = res.data.data;
              for (var key in list) {
                var temp = {};
                temp.value = list[key].value;
                temp.label = list[key].label;
                this.units.push(temp);
              }
            } else {
              console.log("没有数值。。。。。");
            }
          });
      },
      /**
       * 获取运营中心列表
       */
      findSubCenterValue () {
        //硬件平台-下行控制列表
        this.$axios
          .$POST({
            api_name: "findSubCentersValue"
          })
          .then(res => {
            if (res.data.code == "success") {
              var list = [];
              list = res.data.data;
              for (var key in list) {
                var temp = {};
                temp.value = list[key].value;
                temp.label = list[key].label;
                this.subCenterNames.push(temp);
              }
            } else {
            }
          });
      },
      /**
       * 复选框按钮初始化时是否可编辑
       * @param row
       * @param index
       * @returns {boolean}
       */
      selectInit(row) {
        return row.controlHost == this.formAllData.controlHost ? false : true;
      },
      /**
       * 设置记录行
       */
      setSelectRow() {
        let that = this;
        if (!that.multipleSelectionAll || that.multipleSelectionAll.length <= 0) {
          return;
        }
        // 标识当前行的唯一键的名称
        let idKey = that.idKey;
        let selectAllIds = [];
        that.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey]);
        });
        that.$refs.table.clearSelection();
        for (let i = 0; i < that.tableData.length; i++) {
          if (selectAllIds.indexOf(that.tableData[i][idKey]) >= 0) {
            // 设置选中，记住table组件需要使用ref="table"
            that.$refs.table.toggleRowSelection(that.tableData[i], true);
          }
        }
      },

      /**
       * 跨页记忆分页选择数据
       */
      changePageCoreRecordData() {
        // 标识当前行的唯一键的名称
        const that = this;
        let idKey = that.idKey;

        // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
        if (that.multipleSelectionAll.length <= 0) {
          that.multipleSelectionAll = that.multipleSelection;
          return;
        }
        // 总选择里面的key集合
        let selectAllIds = [];
        that.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey]);
        });
        let selectIds = [];
        // 获取当前页选中的id
        that.multipleSelection.forEach(row => {
          selectIds.push(row[idKey]);
          // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
          if (selectAllIds.indexOf(row[idKey]) < 0) {
            that.multipleSelectionAll.push(row);
          }
        });
        let noSelectIds = [];
        // 得到当前页没有选中的id
        that.tableData.forEach(row => {
          if (selectIds.indexOf(row[idKey]) < 0) {
            noSelectIds.push(row[idKey]);
          }
        });
        noSelectIds.forEach(id => {
          if (selectAllIds.indexOf(id) >= 0) {
            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
              if (that.multipleSelectionAll[i][idKey] == id) {
                // 如果总选择中有未被选中的，那么就删除这条
                that.multipleSelectionAll.splice(i, 1);
                break;
              }
            }
          }
        });
      },
      /**
       * 复选框选中值
       */
      handleSelectionChange(val) {
        const that = this;
        console.log(val)
        that.multipleSelection = val;
        //实时记录选中的数据
        setTimeout(() => {
          that.changePageCoreRecordData();
        }, 50);
      },
      /**
       * 乐鸟批量下行显示
       * @param param
       */
      initLaDownLink(val) {
        const that = this;
        that.batchDownlinkVisible = true;
        that.ckCoapData = val;
        console.log(that.ckCoapData)
        that.formAllData = that._Storage.getObj("downListRow", "obj");
        that.$nextTick(() => {
          that.findBatchDownDeviceList('search');
          that.$refs["formData"].clearValidate();
          that.findSubCenterValue();
          that.findUnitValue();
        });
      },
      /**
       * 辰控批量下行显示
       * @param param
       */
      initTempDownLink(val) {
        const that = this;
        that.batchDownlinkVisible = true;
        that.ckCoapData = val;
        console.log(that.ckCoapData)
        that.formAllData = that._Storage.getObj("downListRow", "obj");
        that.$nextTick(() => {
          that.findBatchDownDeviceList('search');
          that.$refs["formData"].clearValidate();
          that.findSubCenterValue();
          that.findUnitValue();
        });
      },
      /**
       * 天泽批量下行显示
       * @param param
       */
      initTanzeDownLink(val,type,refName) {
        const that = this;
        that.tanzerData ={};
        that.controlHostList = [];
        that.batchDownlinkVisible = true;
        that.tanzerData.parData = val;//确定批量下发的参数
        that.tanzerData.tzType = type;//下发类型
        that.tanzerData.refsName = refName;//form的refs
        that.formAllData = that._Storage.getObj("downListRow", "obj");
        that.$nextTick(() => {
          that.findBatchDownDeviceList('search');
          that.findSubCenterValue();
          that.findUnitValue();
        });
      },
      /**
       * 批量下行取消按钮
       */
      batchCancelHandel(){
        const that = this;
        that.formAllData={
          subCenterCode:null,
          unitId:null
        },
        that.multipleSelection=[];
        that.multipleSelectionAll=[];
        that.controlHostList = [];
        that.monitorIds=[];
        that.tableData=[];
        that.tanzerData = {};
        that.isLoading=false;
        that.batchDownlinkVisible = false;
      },
      /**
       * 天泽批量下行失败时，父组件调用子组件此方法
       */
      tanZerBatchError(){
        const that = this;
        that.controlHostList = [];
        that.batchDownlinkVisible = true;
      },
      /**
       * 乐鸟批量下行失败时，父组件调用子组件此方法
       */
      tanZerBatchError(){
        const that = this;
        that.controlHostList = [];
        that.monitorIds=[]
        that.batchDownlinkVisible = true;
      },
      /**
       * 分页
       * @param widgetInfo
       */
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = widgetInfo.pageSize
          ? parseInt(widgetInfo.pageSize)
          : this.widgetInfo.pageSize;
        this.widgetInfo.pageNo = widgetInfo.pageNo
          ? parseInt(widgetInfo.pageNo)
          : this.widgetInfo.pageNo;
        this.changePageCoreRecordData();
        this.findBatchDownDeviceList('load');
      },
      /**
       * 批量下行的列表
       * @param pagenoFlag
       */
      findBatchDownDeviceList(pagenoFlag) {
        const that = this;
        that.isLoading = true;
        if(pagenoFlag=='search'){
          that.widgetInfo.pageNo = 1;
        }
        that.$axios
          .$POST({
            api_name: "findBatchDownDeviceList",
            params: {
              sourceId: that.formAllData.sourceId,
              deviceTypeId: that.formAllData.deviceTypeId,
              brand:that.formAllData.brand,
              model:that.formAllData.model,
              deviceVersion: that.formAllData.deviceVersion,
              controlHost: that.formAllData.controlHost,
              subCenterCode: that.formAllData.subCenterCode,
              unitId: that.formAllData.unitId,
              pageNo: that.widgetInfo.pageNo,
              pageSize: that.widgetInfo.pageSize
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              that.isLoading = false;
              let data = res.data.data;
              if(data){
                that.tableData = data.rows;
                that.widgetInfo.total = data.total === null ? 0 : data.total;
                setTimeout(() => {
                  that.setSelectRow();
                }, 50);
              }
            } else {
              that.isLoading = false;
              that.tableData = [];
              that.widgetInfo.list = res.data.data;
              that.widgetInfo.total = 0;
              that.$message.error(res.data.rspMsg || res.data.message);
            }
          });
      },
      /**
       * 重置
       */
      restForm(){
        const that = this;
        that.formData={
            brand:'天泽盒子',
            sourceId: "tanZer",
            deviceVersion:'',
            deviceId:'',
            model:'',
            controlHost:''
        }
        that.$nextTick(() => {
          that.$refs["formData"].resetFields();
        });
        that.findBatchDownDeviceList('search');
      },
      /**
       * 验证设备id是否存在
       */
      addData(){
        const that = this;
        that.$refs.formData.validate((valid) => {
          if (valid) {
            that.$axios
              .$POST({
                api_name: "checkTemporaryDownDeviceByDeviceId",
                params: {
                  deviceId: that.formData.deviceId,
                  sourceId: that.formData.sourceId
                }
              })
              .then(res => {
                if (res.data.code == "success") {
                  if(res.data.data){
                    that.$message.error('设备已存在');
                  }else{
                    that.addTemporaryDownDevice();
                  }

                } else {
                  that.$message.error(res.data.rspMsg);
                }
                that.submitFlag = true;
                setTimeout(function () {
                  that.submitFlag = false;
                },2000)
              }).catch(err=>{
              this.$message({
                message: err,
                type: 'warning'
              });
            });
          }
        })
      }

    }
  };
</script>
<style lang="scss" scoped="scoped">
  .tempDownlink-mian{
    height: auto;
    max-height: 450px;
    /deep/.el-form .el-form-item__content{
       width: 100%;
    }
  }
  /deep/.el-loading-mask{
    background-color: rgba(255,255,255,.5);
  }
  .hardware-form{
    padding-top: 0;
  }
  /deep/.el-form--label-top .el-form-item__label{
   padding: 0;
    height: 36px;
    display: block;
  }
 .dialog-list-wrap {
   height: 190px;
   overflow: hidden;

   /deep/ .el-table {
     padding: 0;
     overflow: hidden;

     th {
       background: rgba(240, 243, 247, 1);
     }

     .el-table__body-wrapper {
       height: 150px !important;
       overflow-y: auto;
     }
   }
 }
  .page-footer {
    display: flex;
    .pf-left {
      width: 150px;
      margin-top: 15px;
    }
    .pf-right {
      flex: 1;
    }
  }
  /deep/.hardware-form-diy{
     margin-top: -8px;
    .el-form-item{
      margin-bottom:7px;
    }
  }
  /deep/.el-pagination{
    margin-top: 8px;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #e1e1e1;
    padding-bottom: 10px;
  }
</style>

