// template中不能使用模板语法吗
<template>
  <div class="menu">
<!-- <router-view></router-view>     -->
    <div class="menubar">   
      <p v-for="(item,index) in menuText" :key="item.id" @click="btnState(index)" :class="{clicked:item.click}">       
<router-link  to='/index'>{{item.text}}</router-link>
      </p>
    </div>   
  </div>
</template>

<script>
export default {
  name: "footerMenu",
  props: {
    menuText: 
    {
      type:Array,
      default: []
    }
  },
  methods:{
    btnState:function (index){
      this.menuText.forEach(element => {
        element.click=false;
      });
    this.menuText[index].click=true;
    }
  }
};
</script>
<style  scoped lang="scss">
.menu {
  width: 100%;
  .menubar {
    text-align: center;
    overflow: hidden;
    border: 1px solid #000;
    p {
      width: 25%;
      float: left;
      a {
        text-decoration: none;
        cursor: pointer;
        color: #888;
        font-size: 20px;
      }
    }
  }
  .clicked{
    background-color: blue;
  }
}
</style>
