<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">硬件平台</el-breadcrumb-item>
        <el-breadcrumb-item>硬件类型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>硬件类型</h3>
        </el-col>
        <el-col :span="12" class="add-btn-style">
          <el-button type="success" icon="el-icon-plus" @click="addOrEditDiglog('add')">新增</el-button>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
          <el-form-item label="ID:" label-width="30px">
            <el-input placeholder="请输入" v-model="formData.id"></el-input>
          </el-form-item>
          <el-form-item label="类型名称:" prop="unitName" label-width="95px">
            <el-input placeholder="请输入" v-model="formData.typeName"></el-input>
          </el-form-item>
          <el-form-item label="类型编号:" prop="unitName" label-width="95px">
            <el-input placeholder="请输入" v-model="formData.typeCode"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" size="small" @click="getHardwareTypePage('search')">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="ID" prop="id" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="硬件类型" prop="typeName" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="类型编号" prop="code" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="父类型" prop="parentTypeName" show-overflow-tooltip min-width="8%"></el-table-column>
            <el-table-column label="描述" prop="description" show-overflow-tooltip min-width="20%"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center"  min-width="8%">
              <template slot-scope="scope">
<!--                <el-link type="primary" @click="deleteHardwareType(scope.$index,scope.row)" >删除</el-link>-->
                <el-link type="primary" @click="addOrEditDiglog('edit', scope.row)">编辑</el-link>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :widgetInfo="widgetInfo"
            v-on:sonHandleCurrentChange="sonHandleCurrentChange"
          />
        </div>
      </div>
    </div>
    <el-dialog :title="optTitle" :visible.sync="dialogVisible" width="630px">
      <div class="dialog-body-diy-wrapper">
        <el-form
          class="dialog-form-style"
          :label-position="labelPosition"
          label-width="120px"
          :rules="rules"
          ref="plan"
          :model="plan"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="父类" prop="parentCode">
                <el-select v-model="plan.parentCode" placeholder="请选择">
                  <el-option
                    v-for="item in parentTypeNameList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="硬件类型" prop="typeName">
                <el-input v-model.trim="plan.typeName" maxlength="32"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="硬件编号" prop="code">
                <el-input v-model="plan.code" maxlength="16"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="描述">
              <el-input type="textarea" v-model.trim="plan.description" :rows="4" maxlength="100"
                        show-word-limit></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateForm('plan')">确 定</el-button>
      </span>
    </el-dialog>
<!--    删除  弹框-->
    <el-dialog custom-class="del-dialog-wrap"  :visible.sync="dialogDelVisible" width="280px">
      <div class="del-dialog-main">
        <div class="icon-wrap">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="p-wrap">
          <p class="title-p">是否确定删除？</p>
          <p class="tips-p">删除后将不可恢复</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureHandle">确 定</el-button>
         <el-button @click="cancalHandle">取 消</el-button>
      </span>
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
      dialogVisible: false, //新增修改弹出
      dialogDelVisible: false, //删除弹出框
      optTitle:null,
      labelPosition: "top",
      isLoading: false,
      hardwareTypeId:null,//删除的主键id
      optMode: null,
      formData: {
        id:null,
        typeCode:null,
        typeName:null
      }, //查询的formData
      tableData: [], //table查询结果
      parentTypeNameList:[],//父类型树
      loading: true,
      plan:{},
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      rules:{
        parentCode:[
          { required: true, message: '请选择父类型', trigger: 'change' }
        ],
        typeName:[
          { required: true, message: '硬件类型不能为空', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '硬件code不能为空', trigger: 'blur' },
          { pattern:/^[0-9]*$/, message: '长度在 1 到 16 个数字'}
        ]
      }
    };
  },
  mounted() {
    const that = this;

  },
  computed: {},
  methods: {
    /**
     * 新增或者是保存弹框显示
     * @param method  类型
     * @param planObj 参数
     */
    addOrEditDiglog(method, planObj) {
      const that = this;
      that.optMode = method;
      that.dialogVisible = true;
      that.getAllParentTypeInfo()
      if ("add" == method) {
        //新增
        that.optTitle = "新增";
        that.$nextTick(() => {
          that.plan = {};
          that.$refs["plan"].resetFields();
        });
      }else{
        //编辑
        that.optTitle = "编辑";
        that.plan = JSON.parse(JSON.stringify(planObj));
      }
    },
    /**
     * 保存和更新的确定按钮
     * @param formName
     */
    saveOrUpdateForm(formName){
       const that = this;
       if(that.optMode == 'add'){
         that.$refs[formName].validate((valid) => {
           if (valid) {
             that.$axios
               .$POST({
                 api_name: "addHardwareType",
                 params: {
                   id: '',
                   typeName: that.plan.typeName,
                   description: that.plan.description,
                   code: that.plan.code,
                   parentCode: that.plan.parentCode,
                   deleted:0
                 }
               })
               .then(res => {
                 if (res.data.code == "success") {
                   that.isLoading = false;
                   that.dialogVisible = false;
                   that.$message.success({
                     message: res.data.rspMsg,
                     type: 'success'
                   });
                   that.getHardwareTypePage('search');
                 } else {
                   that.isLoading = false;
                   that.$message.error(res.data.message);
                 }
               }).catch(res=>{
               that.$message.error('新增异常');
             });
           } else {
             console.log('error submit!!');
             return false;
           }
         });
       }else if(that.optMode == 'edit'){
         that.$refs[formName].validate((valid) => {
           if (valid) {
             that.$axios
               .$POST({
                 api_name: "updateHardwareType",
                 params: {
                   id: that.plan.id,
                   typeName: that.plan.typeName,
                   description: that.plan.description,
                   code: that.plan.code,
                   parentCode: that.plan.parentCode,
                   deleted:0
                 }
               })
               .then(res => {
                 if (res.data.code == "success") {
                   that.isLoading = false;
                   that.dialogVisible = false;
                   that.$message.success({
                     message: res.data.rspMsg,
                     type: 'success'
                   });
                   that.getHardwareTypePage('load');
                 } else {
                   that.isLoading = false;
                   that.$message.error(res.data.rspMsg);
                 }
               }).catch(()=>{
               that.$message.error('编辑硬件类型异常');
             });
           } else {
             console.log('验证失败')
             return false;
           }
         });

      }
    },
    /**
     * 硬件类别管理的列表
     * @param pagenoFlag
     */
    getHardwareTypePage(pagenoFlag) {
      const that = this;
      that.isLoading = true;
      if(pagenoFlag=='search'){
        that.widgetInfo.pageNo = 1;
      }
      that.$axios
        .$POST({
          api_name: "getHardwareTypePage",
          params: {
            id: that.formData.id,
            typeName: that.formData.typeName,
            typeCode: that.formData.typeCode,
            pageNo: that.widgetInfo.pageNo,
            pageSize: that.widgetInfo.pageSize
          }
        })
        .then(res => {
          that.isLoading = false;
          if (res.data.code == "success") {
            let data = res.data.data;
            that.tableData = data.rows;
            that.widgetInfo.total = data.total === null ? 0 : data.total;
          } else {

            that.tableData = [];
            that.widgetInfo.list = data.rows;
            that.widgetInfo.total = 0;
            console.log("没有数值。。。。。");
          }
        });
    },
    /**
     * 父类型下拉框
     */
    getAllParentTypeInfo(){
      const that = this;
      that.isLoading = true;
      that.$axios
        .$GET({
          api_name: "getAllParentTypeInfo"
        })
        .then(res => {
          that.isLoading = false;
          if (res.data.code == "success") {
            let data = res.data.data;
            that.parentTypeNameList = data;
          } else {
            that.parentTypeNameList = [];
            that.$message.error(res.data.rspMsg);
          }
        }).catch(()=>{
          that.$message.error('父类型下拉异常');
      });
    },
    /**
     * 删除弹框
     * @param index
     * @param row
     */
    deleteHardwareType(index,row) {
      const that = this;
      that.dialogDelVisible = true;
      that.hardwareTypeId = row.id;
    },
    /**
     * 删除确定按钮
     */
    sureHandle(){
      const that = this;
      that.isLoading = true;
      that.$axios
        .$POST({
          api_name: "deleteHardwareType",
          params: {
            hardwareTypeId: that.hardwareTypeId
          }
        })
        .then(res => {
          that.isLoading = false;
          if (res.data.code == "success") {
            that.isLoading = false;
            that.dialogDelVisible = false;
            that.$message({
              message: res.data.rspMsg,
              type: 'success'
            });
            that.getHardwareTypePage('load');
          } else {
            that.isLoading = false;
            that.$message.error(res.data.rspMsg);
          }
        }).catch(()=>{
        this.$message({
          message: '这里是异常',
          type: 'warning'
        });
      });
     },
    /**
     * 删除取消按钮
     */
    cancalHandle(){
      const that = this;
      that.dialogDelVisible = false;
      this.$message('取消删除操作');
    },
    /**
     * 弹框关闭取消按钮事件
     */
    handleClose(){
      const that = this;
      that.dialogVisible = false;
      that.$nextTick(() => {
        that.plan={}
        that.$refs["plan"].resetFields();
      });
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
      this.getHardwareTypePage('load');
    },
    /**
     * 查询重置
     */
    reset() {
      this.formData = {};
      this.getHardwareTypePage('search');
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.add-btn-style {
  text-align: right;
  padding-right: 25px;
  box-sizing: border-box;
}
.hardware-form{
  padding: 20px 25px 0 25px;
}
.list-wrap {
  //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
  height: calc(100vh - 90px - 64px - 20px - 65px - 76px);
  overflow: hidden;
  /deep/.el-table {
    padding: 0;
    overflow: hidden;
    th {
      background: rgba(240, 243, 247, 1);
    }
    .el-table__body-wrapper {
      //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
      height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 85px - 48px);
      overflow-y: auto;
    }
  }
}
</style>
