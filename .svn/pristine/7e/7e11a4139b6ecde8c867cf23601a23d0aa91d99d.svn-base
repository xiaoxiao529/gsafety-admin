<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">硬件平台</el-breadcrumb-item>
        <el-breadcrumb-item>项目设备列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>项目设备列表</h3>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
          <el-form-item label="设备ID:" label-width="80px">
            <el-input placeholder="请输入" v-model="formData.deviceId"></el-input>
          </el-form-item>
          <el-form-item label="运营中心:"  label-width="">
            <el-input placeholder="请输入" v-model="formData.subCenterCode"></el-input>
          </el-form-item>
          <el-form-item label="单位名称:"  label-width="">
            <el-input placeholder="请输入" v-model="formData.unitName"></el-input>
          </el-form-item>
          <el-form-item label="硬件ID:"  label-width="">
            <el-input placeholder="请输入" v-model="formData.controlHost"></el-input>
          </el-form-item>
          <el-form-item label="设备名称:"  label-width="">
            <el-input placeholder="请输入" v-model="formData.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="设备类型:"  label-width="">
            <el-input placeholder="请输入" v-model="formData.deviceTypeName"></el-input>
          </el-form-item>
          <el-form-item label="当前状态:"  >
            <el-select v-model="value" placeholder="请选择" style="width: 185px;" v-model.trim="formData.onlineState">
					    <el-option
					      v-for="item in onlineStates"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" size="small" @click="lookFor()">查询</el-button>
            <el-button size="small" @click="reset('formData')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="设备ID" prop="deviceId" show-overflow-tooltip ></el-table-column>
            <el-table-column label="运营中心" prop="subCenterName" show-overflow-tooltip ></el-table-column>
            <el-table-column label="单位名称" prop="unitName" show-overflow-tooltip></el-table-column>
            <el-table-column label="安装位置" prop="deviceAddress" show-overflow-tooltip></el-table-column>
            <el-table-column label="物料名称" prop="deviceName" show-overflow-tooltip></el-table-column>
            <el-table-column label="设备类型" prop="deviceTypeName" show-overflow-tooltip></el-table-column>
            <el-table-column label="厂家" prop="sourceId" show-overflow-tooltip></el-table-column>
            <el-table-column label="品牌型号" prop="model" show-overflow-tooltip></el-table-column>
            <el-table-column label="当前状态" prop="onlineState" show-overflow-tooltip>
            	<template slot-scope="scope">
		            <div>{{transformOnlineState(scope.row.onlineState) }}</div>
		          </template>
            </el-table-column>
            <el-table-column label="信号最后上传时间" prop="lastOnlineTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="安装时间" prop="installTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-link type="primary" @click="getLineRecord(scope.row, scope.$index)">离/在线记录</el-link>
              </template>
            </el-table-column>
          </el-table>
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
      </div>
    </div>

    <!--离/在线记录弹框-->
    <el-dialog title="离在线历史记录" :visible.sync="dialogTableVisible">
    	
    	<div class="record-table">
    		<el-scrollbar style="height:100%">
	    		<el-table stripe :data="recordData">
				  	<el-table-column type="index" label="序号" width="100"></el-table-column>
				    <el-table-column prop="stateTime" label="时间" width=""></el-table-column>
				    <el-table-column prop="onlineState" label="当前状态" width="">
				    	<template slot-scope="scope">
		            <div>{{transformOnlineState(scope.row.onlineState) }}</div>
		          </template>
				    </el-table-column>
				    <el-table-column prop="offlineTime" label="离线时间"></el-table-column>
				  </el-table>
	    	</el-scrollbar>
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
      isLoading: false,
      formData: {}, //查询的formData
      tableData: [], //table查询结果
      loading: true,
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0,
      },
      onlineStates: [
      	{
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "离线"
        },
        {
          value: 1,
          label: "在线"
        }
      ],
      dialogTableVisible: false,
      recordData: []
    }
  },
  mounted() {
  },
  computed: {
		transformOnlineState(state) {
      //设备状态
      return function(state) {
        if (state == 0) {
          return "离线";
        } else if (state == 1) {
          return "在线";
        }
      };
    },
  },
  methods: {
  	
    // 硬件类别管理的列表
    getEquipmentListPage() {
      let that = this;
      that.isLoading = true;
      that.$axios.$POST({
        api_name: "findProjectDeviceList",
        params: {
          deviceId: that.formData.deviceId,
          //subCenterCode: that.formData.subCenterCode,
          subCenterCode: "340100YYZX201805230001",
          unitId: that.formData.unitId,
          controlHost: that.formData.controlHost,
          deviceName: that.formData.deviceName,
          deviceTypeName: that.formData.deviceTypeName,
          onlineState: that.formData.onlineState,
          pageNo: that.widgetInfo.pageNo,
          pageSize: that.widgetInfo.pageSize,
        }
      }).then(res => {
        if (res.data.code == 'success') {
          that.isLoading = false;
          let data = res.data.data;
          that.tableData = data.rows;
          that.widgetInfo.total = data.total === null ? 0 : data.total;
        } else {
          that.tableData = [];
          that.widgetInfo.list = data.rows;
          that.widgetInfo.total = 0;
          console.log('没有数值。。。。。')
        }

      })

    },
    getLineRecord(row, index){
    	var monitorId = row.id;
    	var that = this;
    	this.dialogTableVisible = true;
    	that.$axios.$POST({
        api_name: "findDeviceOfflineHisList",
        params: {
          monitorId: monitorId,
        }
      }).then(res => {
        if (res.data.code == 'success') {
        	console.log(res.data)
          let data = res.data.data;
          that.recordData = data;
        } else {
          that.recordData = [];
          console.log('没有数值。。。。。')
        }

      })
    	
    },

    //分页
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
      this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      this.getEquipmentListPage();
    },
    reset(formName) {//重置
      this.formData = {};
      this.getEquipmentListPage();
    },
    lookFor() {//查询
      this.getEquipmentListPage();
    }
  },


}
</script>
<style lang="scss" scoped="scoped">
	.record-table{
		height: 400px;
	}
	
  .add-btn-style{
    text-align: right;
    padding-right: 25px;
    box-sizing: border-box;
  }
.list-wrap {
    //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单132
    height: calc(100vh - 90px - 64px - 20px - 65px - 132px);
    overflow: hidden;
    /deep/.el-table {
      padding: 0;
      overflow: hidden;
      th {
        background: rgba(240, 243, 247, 1);
      }
      .el-table__body-wrapper {
        //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单132 分页85 头部高度48px
        height: calc(100vh - 90px - 64px - 20px - 65px - 132px - 85px - 48px);
        overflow-y: auto;
      }
    }
    /*.el-checkbox{ margin-top: 6px;}*/
  }
.hardware-form .el-form-item{
	width: 23%;
}
.hardware-form{
	padding-left: 25px;
}
</style>
<style type="text/css">
	.el-scrollbar__wrap{
		overflow-x: hidden;
	}
</style>
