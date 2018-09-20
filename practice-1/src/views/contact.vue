<template>
<div class="f-page">
  <div class="message-card">
<img :src='getphotoUrl($route.params.floorid)' alt="加载失败" class="photo">
<div>
<p>{{getname($route.params.floorid)}}</p>
<p>{{contactMessage}}</p>
</div>
  </div>
 <div class="note">
   <h3>备注信息：</h3>
   <form action="">
   <label for="grade">班级:</label>
   <input type="text" placeholder="xx系xx支部" id="grade" v-model="grade"><br>
   <label for="phone-number">手机:</label>
   <input type="text" placeholder="11位手机号码" id="phone-number" v-model="phoneNumber"><br>
   <button :disabled="buttonState" type="button" @click='editor' :class='{disableedbt:btnState}'>确定</button>
   </form>
 </div>
 <router-link class="mormessage" :to='"/detailed/"+this.$route.params.floorid' >更多信息<span>&gt;</span></router-link>
</div>
</template>
<style scoped lang="scss">
.f-page {
  // width: 30%;
  margin: 20px auto;
  text-align: center;
  .message-card {
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
    .photo {
      width: 30%;
      float: left;
    }
    div {
      float: left;
    }
  }
  .note {
    text-align: left;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    label {
      margin-right: 10%;
    }
    input {
      width: 70%;
    }
    .disableedbt {
      width: 40%;
      text-align: center;
      margin-left: 30%;
      margin-top: 10px;
      background-color: #eee;
    }
    button {
      width: 40%;
      text-align: center;
      margin-left: 30%;
      margin-top: 10px;
    }
  }
  .mormessage {
    display: block;
    text-align: center;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 5px;
    text-decoration: none;
    color: black;
    span {
      float: right;
    }
  }
  .mormessage:active {
    background-color: #eee;
  }
}
@media screen and (min-width: 900px) {
  .f-page {
    width: 30%;
  }
}
</style>
<script>
//那么我们如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，
//从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Fpage",
  data: function() {
    return {
      grade: "精机一支部",
      phoneNumber: "18818218765",
      contactMessage: "备注： 精机一支部 18818218765",
      // "备注：" + this.$store.state.contactClass + " " + "18818218765",
      btnState: false,
      items: [
        { id: "F1", name: "张三" },
        { id: "F2", name: "李四" },
        { id: "F3", name: "赵五" },
        { id: "F4", name: "刘六" }
      ],
      my: "./2.jpg",
      cardPhoto: {
        F1: "/1.jpg",
        F2: "/2.jpg",
        F3: "/3.jpg",
        F4: "/4.jpg"
      }
      // window.location.origin + '/8.jpg'
    };
  },
  computed: {
    //优点：当计算属性所依赖的值改变之后，会立刻触发计算属性，改变DOM的值
    //也可用方法改变data的值，
    //虽然Vuex 的状态存储是响应式的。
    //但不改变依赖于stor数据的data的值，stor的数据变化不会立即反应在dom里。
    buttonState: function() {
      if (this.grade == "" || this.phoneNumber == "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState({
      storGrade: "contactClass"
    })
  },
  methods: {
    ...mapMutations([
      "refreshClass", // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      "refreshGrade"
    ]),
    ...mapActions([
      "increment" //将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    ]),
    editor: function() {
      console.log(this.grade);
      this.contactMessage = "备注:" + this.grade + " " + this.phoneNumber;
      this.$store.commit("refreshGrade", {
        id: this.$route.params.floorid,
        grade: this.grade
      });
      //this.$store.dispatch('increment',this.$store,this.grade);
      this.grade = "";
      this.phoneNumber = "";
    },
    getphotoUrl: function(id) {
      // `this` 指向 vm 实例
      if (id != undefined) {
        return this.cardPhoto[id];
      } else {
        return this.my;
      }
    },
    getname: function(id) {
      for (var i = 0, len = this.items.length; i < len; i++) {
        if (id === this.items[i].id) {
          return this.items[i].name;
        }
      }
      return "张三";
    }
  },
  watch: {
    grade: function(val) {
      if (val == "" || this.phoneNumber == "") {
        this.btnState = true;
      } else {
        this.btnState = false;
      }
    },
    phoneNumber: function(val) {
      if (val == "" || this.grade == "") {
        this.btnState = true;
      } else {
        this.btnState = false;
      }
    }
  },
  beforeCreate: function() {
    console.log("Fpage创建前");
  },
  created: function() {
    console.log("Fpage创建完成");
  },
  beforeMount: function() {
    console.log("Fpage载入前");
  },
  mounted: function() {
    console.log("Fpage载入后");
  },
  beforeUpdate: function() {
    console.log("Fpage更新前");
  },
  updated: function() {
    console.log("Fpage更新后");
  }
};
</script>

