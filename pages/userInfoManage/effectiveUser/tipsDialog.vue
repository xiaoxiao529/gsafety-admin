<template>
  <div class="DialogStockWrap">
    <el-dialog custom-class="del-dialog-wrap"  :visible.sync="dialogTipsVisible" width="280px">
      <div class="del-dialog-main">
        <div class="icon-wrap">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="p-wrap" v-if="message.setType=='lock'">
          <p class="title-p">确认锁定该账号？</p>
          <p class="tips-p">锁定后该账号将禁止登录当前应用！</p>
        </div>
        <div class="p-wrap" v-else-if="message.setType=='unlock'">
          <p class="title-p">确认解锁账号？</p>
          <p class="tips-p">解锁后将恢复账号当前应用登录权限</p>
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
  export default {
    data() {
      return{
        dialogTipsVisible:false,//弹框是否显示
        isLoading:false,
        userObj:{},
        effectiveUser:{},
        message:{}
      }
    },
    mounted() {
      const that = this;
      that.userObj = that._Storage.getObj("userObj", "userObj");
    },
    computed: {},
    methods: {
      showDialog(index,row,message){
        const that = this;
        that.effectiveUser = row;
        that.dialogTipsVisible = true;
        that.message= message
      },
      /**
       * 提示确定按钮
       */
      sureHandle(){
        const that = this;
        that.isLoading = true;
        that.$axios
          .$POST_NEW({
            api_name: 'lockOrUnlock',
            params: {
              lockUserId:that.userObj.id,
              userId:that.effectiveUser.id,
              centerType: that.effectiveUser.sysCode,
              orgCode:that.effectiveUser.orgCode,
              operateType:that.message.operateType
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              that.isLoading = false;
              that.dialogTipsVisible = false;
              that.$message({
                message: res.data.message,
                type: 'success'
              });

              that.$emit('loadData');
            } else {
              that.isLoading = false;
              that.$message.error(res.data.message);
            }
          }).catch(res=>{
          that.$message.error(res.data.message);
        });
      },
      /**
       * 提示取消按钮
       */
      cancalHandle(){
        const that = this;
        that.dialogTipsVisible = false;
        this.$message('取消操作');
      },
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .DialogStockWrap{
    font-family:MicrosoftYaHei;
  }

</style>
