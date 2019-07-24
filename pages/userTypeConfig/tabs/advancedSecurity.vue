<template>
  <div>
    <div class="main-wrap">
      <el-container class="main-body">
        <el-aside width="220px" class="aside-wrap">
          <div class="aside-main-header">
            用户类型
          </div>
          <ul class="aside-main-panel">
            <li v-for="item of userType"
                :key="item.id"
                :class="item.typeCode==currentCode ? 'type-item active' : 'type-item' "
                @click="changeHandel(item)">
              <span>{{item.typeName}}</span>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-header height="60px" style="text-align: right; padding: 10px 15px">
            <el-button type="primary" @click="saveUserTypeConInfo">保存</el-button>
          </el-header>
          <el-main>
            <el-card class="box-card" style="margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <span>{{sysCode[0].name}}</span>
              </div>
              <div class="card-body">
                <el-checkbox-group v-model="checkedIds">
                  <el-checkbox v-for="item in gjWeb" :label="item.id"  :key="item.id"  @change="handleCheckedIdsChange(sysCode[0].id,item.id)">{{item.roleName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-card>
            <el-card class="box-card" style="margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <span>{{sysCode[1].name}}</span>
              </div>
              <div class="card-body">
                <el-checkbox-group v-model="checkedIds">
                  <el-checkbox v-for="item in gjApp" :label="item.id"  :key="item.id"  @change="handleCheckedIdsChange(sysCode[1].id,item.id)">{{item.roleName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
  /**
   * @Description:用户类型配置->高级安全模式
   * @author liuxin
   * @date 2019-07-23
   */
  //import Pagination from "~/components/Pagination";
  export default {
    components: {
    },
    data() {
      return {
        isLoading: false,
        tabPosition:'left',
        userType:[],//左侧用户类型树
        gjApp:[],
        gjWeb:[],
        currentCode:"01",
        checkAllApp: false,
        checkAllWeb: false,
        checkedIds: [],
        checkedIdsArry:[],
        isIndeterminate: false,
        sysCode:[{
          name:'消防管家Web',
          id:'10'
        },{
          name:'消防管家App',
          id:'11'
        }]
      };
    },
    mounted() {
      const that = this;
      that.userTypeTree();
      that.checkboxList();
      that.querySaveUserTypeConInfo();
    },
    computed: {},
    methods: {
      /**
       * @Description:checked点击事件
       * @param sysCode
       * @param id
       */
      handleCheckedIdsChange(sysCode,id) {
        const that = this;
        for(let i = 0; i<that.checkedIdsArry.length; i++){
          if(that.checkedIdsArry[i].roleId == id){
            that.checkedIdsArry.splice(i,1)
            return
          }
        }
        that.checkedIdsArry.push({
          sysCode:sysCode,
          roleId:id
        })
      },
      /**
       * @Description:用户类型树获取
       */
      userTypeTree(){
        //
        const that = this;
        that.$axios
          .$POST_NEW({
            api_name: "queryUserType"
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              let data = res.data.data;
              that.userType = data.userType;
            } else {
              that.userType = [];
              console.log("没有数值。。。。。");
            }
          });
      },
      /**
       * @Description:用户类型树切换事件
       * @param data（item=>id,sysCode,typeCode,typeName）
       */
      changeHandel(data){
        const that = this;
        that.currentCode = data.typeCode;
        that.querySaveUserTypeConInfo();
      },
      /**
       * @Description:查询已保存用户类型配置
       */
      querySaveUserTypeConInfo(){
        const that = this;
        that.$axios
          .$POST_NEW({
            api_name: "querySaveUserTypeConInfo",
            params: {
              modelType: '2',
              userType: that.currentCode
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              let data = res.data.data;
              let roleId = JSON.parse(data.roleInfo)
              that.checkedIds = [];
              that.checkedIdsArry = [];
              for(let i = 0; i < roleId.length; i++){
                that.checkedIds.push(roleId[i].roleId);
                that.checkedIdsArry.push(roleId[i])
              }
            } else {
              that.checkedIds = [];
            }
          })
          .catch(()=>{
            this.$message.error('查询已保存用户类型配置异常');
          });
      },
      /**
       * @Description:保存用户类型配置
       */
      saveUserTypeConInfo(){
        const that = this;
        if(that.checkedIdsArry.length == 0){
          that.$message.warning('未选中角色!');
          return
        }
        that.$axios
          .$POST_NEW({
            api_name: "saveUserTypeConInfo",
            params: {
              modelType: '2',
              userType: that.currentCode,
              roleInfo:JSON.stringify(that.checkedIdsArry)
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              that.$message.success('保存用户类型成功');
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(()=>{
            this.$message.error('保存用户类型配置异常');
          });
      },
      /**
       * @Description:右侧checkbox获取
       */
      checkboxList(){
        const that = this;
        that.$axios
          .$POST_NEW({
            api_name: "queryRole"
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              let data = res.data.data;
              that.gjApp = data.gjApp;
              that.gjWeb = data.gjWeb;
            } else {
              that.gjApp = [];
              that.gjWeb = [];
              that.$message({
                message: '右侧checkbox获取失败',
                type: 'error'
              });
            }
          }).catch(()=>{
          that.$message({
            message: '右侧checkbox获取异常',
            type: 'warning'
          });
        });
      },
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .main-body{
    height: calc(100vh - 90px - 64px - 20px - 65px);
    .el-main{
      padding: 0px 15px 10px 15px;
      .el-checkbox{
        margin-bottom: 10px;
      }
      .card-body{
        padding-top: 15px;
      }
    }
    .aside-wrap{
      border-right: 1px solid #dcdcdc;
      .aside-main-header{
        font-size: 16px;
        padding: 15px 20px;
        border-bottom: 1px solid #dcdcdc;
        line-height: 30px;
        font-weight: bold;
      }
      .type-item{
        padding: 10px 20px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        display: block;
        border-left: 3px solid #fff;
        user-select: none;
        cursor: pointer;
        &.active{
          border-left: 3px solid #1970ed;
          background: #f9f9f9;
        }
      }
    }
  }
</style>
