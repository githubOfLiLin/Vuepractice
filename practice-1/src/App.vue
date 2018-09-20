<template>
  <div id="page1">
    <headTitle titleText="微信" :gobackVisbale="goback"/>
    <router-view></router-view>
     <footerMenu :menuText='menu' v-if='$route.path=="/index"'/>
     <!-- 当属性为数组时，虽然是静态属性，我们仍然需要 `v-bind` 来告诉 Vue 
    这是一个 JavaScript 表达式而不是一个字符串。 -->
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
}
</style>
<script>
import headTitle from "@/components/head.vue";
import footerMenu from "@/components/foot.vue";
export default {
  name: "page1",
  data: function() {
    return {
      menu: [
        { id: "page1", text: "首页" ,click:false},
        { id: "page2", text: "通讯录" ,click:false},
        { id: "page3", text: "朋友圈",click:false },
        { id: "page4", text: "我的" ,click:false}
      ]
    };
  },
  components: {
    headTitle,
    footerMenu
  },
  computed:{
    goback:function(){
if(this.$route.path=="/index")
{
return false;
}
else{
  return true;
}
    }
  },
  beforeCreate: function() {
    console.log("App创建前");
  },
  create: function() {
    console.log("App创建完成");
  },
  beforeMount: function() {
    console.log("App载入前");
  },
  mounted: function() {
    console.log("App载入后");
  },
  beforeUpdate: function() {
    console.log("App更新前");
  },
  update: function() {
    console.log("App更新后");
  }
};
</script>
