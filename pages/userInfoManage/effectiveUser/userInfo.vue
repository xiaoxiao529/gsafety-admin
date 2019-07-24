
<template>
  <div class="DialogStockWrap">
    <el-dialog
      title="用户详情"
      :visible.sync="dialogSetupInfoVisible"
      width="650px">
      <div class="stock-mian">
         <table class="table-diy">
           <tr>
             <td class="tr-title">姓名</td>
             <td class="tr-center">{{userInfo.userName || '--'}}</td>
             <td class="tr-title">用户名</td>
             <td class="tr-center">{{userInfo.loginName || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">性别</td>
             <td class="tr-center">{{showLabel(userInfo.userSex,sexList) || '--'}}</td>
             <td class="tr-title">岗位</td>
             <td class="tr-center">{{userInfo.postName || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">邮箱</td>
             <td class="tr-center">{{userInfo.userEmail || '--'}}</td>
             <td class="tr-title">手机号</td>
             <td class="tr-center">{{userInfo.userTelphone || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">身份证</td>
             <td class="tr-center">{{userInfo.userCardNo || '--'}}</td>
             <td class="tr-title">应用</td>
             <td class="tr-center">{{userInfo.sysName || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">角色</td>
             <td class="tr-center">{{userInfo.roleName || '--'}}</td>
             <td class="tr-title">客服账号</td>
             <td class="tr-center">{{userInfo.exten || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">创建时间</td>
             <td class="tr-center">{{userInfo.createTime || '--'}}</td>
             <td class="tr-title">更新时间</td>
             <td class="tr-center">{{userInfo.updateTime || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">单位</td>
             <td class="tr-center"  colspan="3">{{userInfo.orgName || '--'}}</td>
           </tr>
           <tr>
             <td class="tr-title">最近一次登录</td>
             <td class="tr-center" colspan="3">{{userInfo.lastLoginTime || '--'}}</td>
           </tr>
         </table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  /**
   * @Description:有效用户--关联应用弹出层
   * @author liuxin
   * @date 2019-07-22
   */
  export default {
    data() {
      return {
        dialogSetupInfoVisible: false, //安装信息
        stepInfo:{
          roleName:'',
          system:'',
        },
        userInfo:{
          userSexName:'',//性别
          loginName:'',//用户名
          userEmail:'',//邮箱
          userTelphone:'',//手机号
          userCardNo:'',//身份证
          sysName:'',//应用
          roleName:'',//角色
          exten:'',//客服账号
          orgName:'',//单位
          postName:'',//岗位
          createTime:'',//创建时间
          lastLoginTime:'',//最近一次登录
          userStatus:''
        },
        statusList:[
          {value: 0, label: '正常'},
          {value: 2, label: '锁定'},
          {value: 1, label: '注销'},
          {value: 3, label: '删除'}
        ],
        sexList:[
          {value: 0, label: '男'},
          {value: 1, label: '女'},
        ]
      };
    },
    mounted() {

    },
    computed: {},
    methods: {
      /**
       *  @Description:部分字段数字对应的中文显示出来
       * @param key
       * @param list
       * @returns {string|*}
       */
      showLabel(key, list) {
        if (key === "" || key === null || key === undefined) {
          return "--";
        }
        return list.find(item => item.value == key).label;
      },
      /**
       * @Description:用户详情
       * @param val
       */
      initStupInfo(row){
        const that= this;
        that.dialogSetupInfoVisible=true;
        that.isLoading = true;
        that.$axios
          .$POST_NEW({
            api_name: "userfindUserByUserId",
            params: {
              userId: row.id,
              centerType: row.sysCode,
              orgCode: row.orgCode
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              let data = res.data.data;
              that.userInfo = data;
            } else {
              that.$message.error(res.data.message);
              return;
            }
          }).catch(err=>{
          that.$message.error(err);
        });

      }


    }
  };
</script>
<style lang="scss" scoped="scoped">
  .DialogStockWrap{
    font-family:MicrosoftYaHei;
    .stock-mian{
      margin: 8px 0;
      /deep/table.table-diy{
        width: 100%;
        border-collapse: collapse;
        border:1px solid #dfdfdf;
        td{
          border:1px solid #dfdfdf;
          padding: 9px 5px;
          line-height: 22px;
          font-size: 14px;
        }
        .tr-title{
          background:#f7f7f7;
          color: #666;
          width: 115px;
        }
        .tr-center{
          width: 195px;
          color: #999;
        }
      }

    }


  }
</style>
