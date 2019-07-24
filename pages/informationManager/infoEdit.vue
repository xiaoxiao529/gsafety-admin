<template>
	<div>
		<div class="Crumbs">
	      <el-breadcrumb separator-class="el-icon-arrow-right">
	        <el-breadcrumb-item>运营中心</el-breadcrumb-item>
	        <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
	        <el-breadcrumb-item>编辑资讯</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>
		<div>

			<a href="javascript:;" class="yy-form-back" @click="backHandle"><i class="iconfont icon-arrow-2 backC"></i></a>

			<el-form :model="formData" ref="formData" class="hardware-form">
	          	<el-form-item label="资讯标题:"  :label-width="labelWidth">
		            <el-input placeholder="请输入" v-model.trim="formData.informationTitle"></el-input>
		        </el-form-item>
		        <el-form-item label="资讯来源:" :label-width="labelWidth">
		           	<el-input placeholder="请输入" v-model.trim="formData.informationSource"></el-input>
		        </el-form-item>
		        <el-form-item label="发布对象:" :label-width="labelWidth">
	                <a class="yy-publish-object--item" @click="clickA(this);" :class="{isActive:isTrue}" style="cursor: pointer;" date-item="0">App<b class="el-icon-success"></b></a>
                    <a class="yy-publish-object--item" @click="clickA(this);" :class="{isActive:isTrue}"  style="cursor: pointer;" date-item="1">web<b class="el-icon-success"></b></a>
                    <a class="yy-publish-object--item" @click="clickA(this);" :class="{isActive:isTrue}"  style="cursor: pointer;" date-item="2">大屏<b class="el-icon-success"></b></a>
		        </el-form-item>
		        <el-form-item label="App缩略图:" :label-width="labelWidth">
	                <el-upload
					  class="upload-demo"
		              action="/gsafetyclound/userCenter/enclosureManage/uploadfile"

		              :limit="1"

>
					  <el-button size="small" type="primary"><i class="el-icon-circle-plus"></i>上传文件</el-button>
					  <div slot="tip" class="el-upload__tip">* 支持jpg/png/bmp格式</div>
					</el-upload>
		        </el-form-item>
		        <el-form-item label="资讯内容:" :label-width="labelWidth">
	                <div id="zxfbUeditorId"></div>
		        </el-form-item>
		        <el-form-item label="发布时间:" :label-width="labelWidth">
		           	<el-date-picker
				      v-model="formData.publishDate"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
		        </el-form-item>
		        <el-form-item label="发布时间:" :label-width="labelWidth">
		           	<el-button type="primary">完成并提交</el-button>
		        </el-form-item>
	        </el-form>
		</div>
	</div>
</template>


<script type="text/javascript">
import $ from 'jquery'
export default {
	data: function () {
	  return {
	    inforId:"",
	    labelWidth:"100px",
	    isTrue:false,
	    formData:{
	    	informationTitle:"",
	    	informationSource:"",
	    	fileList: [],
	    	infoTime:"",
	    	publishDate:""
	    }
	  }
	},
	methods:{
		clickA(obj,num){
			this.isTrue = true;
		},
		showDetail(){
			var that = this;
			this.$axios.$POST_NEW({
	              api_name: "queryInformationById",
	              params: {
	                "inforId":that.inforId
	              }	
	            })
	            .then(res => {

	              if("success"==res.data.code&&res.data.data){
					var obj = res.data.data;
					console.log(obj)
					//富文本页面加载
	  				/*$("#zxfbUeditorId").load(forent_url.localHostName +"/page/information-manager/ueditorIfram.html",function(){
	  					//判断iframe是否加载完成
	  					document.getElementById("zxfbIframeId").onload = function () { 
	  						//判断富文本编辑器的对象是否创建完成
	  						document.getElementById('zxfbIframeId').contentWindow.ue.ready(function(){
	  							document.getElementById('zxfbIframeId').contentWindow.ue.setContent(obj.informationContent);
	  						});
						} 
	  				});*/
	  				that.formData = obj;
					}else{
						$("#inforDetail").html("暂无数据。");
					}
	            });
		},
		backHandle(){
			this.$router.push({
		        name: "informationManager",
		      });
		},
		
	},
	mounted() {
		this.inforId = localStorage.getItem('inforId');
		this.showDetail();
		
	},
}
</script>

<style scoped lang="scss">
body{
	color: red;
}
.yy-publish-object--item {
    position: relative;
    display: inline-block;
    width: 74px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 16px;
    color: #666;
    border: 1px solid #cacaca;
}
.yy-publish-object--item b{
    position: absolute;
    bottom: -3px;
    right: -2px;
    font-size: 20px;
    color: #009cff;
    display: none;
}
.yy-publish-object--item.isActive {
    color: #009cff;
    background-color: #fff;
    border-color: #009cff;
    b{
    	display: block;
    }
}

.yy-form-back{
	text-decoration: none;
}
.yy-form-back .iconfont {
    font-size: 26px;
    color: #737373;
}
#inforDetail{
	padding: 10px;
	background: #fff;
}
</style>


