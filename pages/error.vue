<template>
  <div class="login-wrapper">
    <!--<div class="head404"></div>-->
 
   	<div class="txtbg404">
 
	  <div class="txtbox">
	 
	      <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
	 
	      <p class="paddingbox">请点击以下链接继续浏览网页</p>
	 
	 			<p>→<nuxt-link to="/"> 返回网站首页</nuxt-link></p>

	 
	    </div>
	  </div>

  </div>
</template>

<script>
export default {
  name: "error",
   props: ['error'],
  data() {
    return {
      msg:"404"
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>

.head404{ width:580px; height:234px; margin:50px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/head404.png) no-repeat; }
 
/*.txtbg404{ width:499px; height:169px; margin:10px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/txtbg404.png) no-repeat;}*/
 .txtbg404{ width:499px; height:169px; margin:100px auto 0 auto; color: #333;}
.txtbg404 .txtbox{ width:490px; position:relative; top:30px; left:60px; font-size:16px;}
 
.txtbg404 .txtbox p {margin:15px 0; line-height:18px;}
 
.txtbg404 .txtbox .paddingbox { padding-top:15px;}
 
.txtbg404 .txtbox p a { color:#333; text-decoration:none;}
 

</style>
