<template>
  <div>
    <el-dialog title="修改密码" v-bind:visible.sync="changePswVis" width="500px" :before-close="handleClose"><!--    -->
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm pswform"
      validate-on-rule-change>
      <el-form-item label="原密码" prop="oldPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.oldPass" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.newPass" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.checkPass" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="submitForm('ruleForm')">确认</el-button>
    </div>
    </el-dialog>
  </div>

</template>
<script>
	import md5 from "js-md5";
  export default {
     props:{
        changePswVis:{
          default:false
        }
    },
    data() {   	
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
		      //远程请求
		      return callback(new Error('*此处不可空白'));
		    } else if (value && value != '') {
		    	
					let password = value.trim()+this.salf
	        md5(password)
	        let hash = md5.create()
	        hash.update(password)
	        password = hash.hex(password)
		    	
		    	this.$axios.$POST({
		        api_name: "checkUserPassword",
		        params: {
		          userId: this.userObj.id,
		          password:password ,
		        }
		      }).then(res => {
		      	console.log(res,"res")
		        if (!res.data.data) {
		          return callback(new Error('*原密码错误！'));
		        }else{
		          callback()
		        }
		      })
		    } else {
		      callback();
		    }
		
		  };
		  var validateNewPass = (rule, value, callback) => {
		    if (value === '') {
		      return callback(new Error('*此处不可空白'));
		    }else {
		      callback()
		
		    }
		  };
		  var validateDoublePass = (rule, value, callback) => {
		    if (value === '') {
		      callback(new Error('*此处不可空白'));
		    } else if (value !== this.ruleForm.newPass) {
		      callback(new Error('*两次输入密码不一致!'));
		    } else {
		      callback();
		    }
		
		  };
		  return {
		    isTrue: true,
		    salf:'true',
		    userObj:{},
		    myChangePswVis:this.changePswVis,
		    ruleForm: {
		      oldPass: '',
		      newPass: '',
		      checkPass: ''
		    },
		    rules2: {
		      oldPass: [{
		        validator: validateOldPass,
		        required: true,
		        trigger: 'blur'
		      }],
		      newPass: [{
		        validator: validateNewPass,
		        required: true,
		        trigger: 'blur'
		      }],
		      checkPass: [{
		        validator: validateDoublePass,
		        required: true,
		        trigger: 'blur'
		      }],
		    }
		  };
},
methods: {
  handleClose(done) {
    this.myChangePswVis = false;
    this.$emit('success', this.myChangePswVis);
    this.$refs["ruleForm"].resetFields();
  },
  submitForm(formName) {
    let that = this;
    this.$refs[formName].validate((valid) => {
      if (valid) {
      	
      	this.$axios.$POST({
	        api_name: "modifyUserPassword",
	        params: {
	          updateUserId: this.userObj.id,
	          password: that.ruleForm.newPass,
	          userId:this.userObj.id,
	        }
	      }).then(res => {
          if (res.data.code == "success") {
          	console.log(res)
            that.$emit('success', that.myChangePswVis)
            that.$message.success("修改成功，请重新登录!");
            setTimeout(function () {
	             that.$router.push({
	              "path": "/login"
	            })
	          }, 1000)

          }
        })
      } else {
//19942416779
        return false;
      }
    });
  }
},
	mounted() {
	 	this.userObj = this._Storage.getObj("userObj", "userObj");
	},
}

</script>
<style lang="scss" scoped>
.el-dialog{
  height:300px;
  .el-dialog__body{
    padding:15px 10px;
  }
}
.el-form-item--small.el-form-item {
    margin-bottom: 18px;
}
  /* 修改密码 */
  .open-window-all {
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }

  .pswform {
    width: 450px;
    padding: 0 30px;
    box-sizing: border-box;
    text-align: center;
    .pswSure {
      margin-top: 20px;
    }

  }

</style>
<style lang="scss">
  /* .pswform{
  .el-form-item__content {
      text-align: center!important;
      margin-left: 0!important;
    }
}
    */

</style>
