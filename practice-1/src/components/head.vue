<template>
  <div class="head">
    <h2>
      <p @click="goback" v-if="gobackVisbale">返回</p>
      {{titleText}}
    </h2>
  </div>
</template>

<script>
export default {
  name: "headTitle",
  props: {
    titleText: String,
    gobackVisbale:Boolean,
  },
  methods: {
    goback: function() {
      window.history.back();//返回上一个地址
    }
  }
};
</script>

<style scoped lang="scss">
.head {
  h2 {
    text-align: center;
    background-color: #333;
    font-size: 24px;
    color: #fff;
    p {
      background-color: #333;
      color: #fff;
      float: left;
      font-size: 16px;
    }
  }
}
</style>