<template>
  <div class="page">
<input type="search" class="item search"  v-model='searchName'>  
<!-- @keypress="searchContact1" -->
    <div class="floorMenu">
    <router-link class="item" v-for="(item,index) in items" :key="index" :to='"/floor/"+item.id'>{{item.name+getItemGrade(index)}}</router-link>  
    </div>  
    <router-link class="item" to="/addcontact">
      <span class="addNew">+</span>
      新建联系人
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import img from "../assets/8.jpg";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "page1",
  data: function() {
    return {
      searchName: "",
      //       { id: "F1", name: "张三" },
      // { id: "F2", name: "李四" },
      // { id: "F3", name: "赵五" },
      // { id: "F4", name: "刘六" }
      items: [],
      responseData: []
    };
  },
  methods: {
    getItems: function() {
      for (var i = 0, len = this.responseData.length; i < len; i++) {
        var item={};
        item.id = this.responseData[i].contactId;
        item.name = this.responseData[i].contactName;
        this.items.push(item);
      }
      console.log(this.items);
    },
    //异步响应事件，加载时就把数据请求到，后面只需要对请求到的数据进行过滤即可，不用，每次搜索都请求
    searchContact1: function() {
      var xhr;
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (typeof window.ActiveXObject != "undefined") {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
          this.responseData = JSON.parse(xhr.responseText).contactor;
          this.getItems();
          console.log(this.responseData);
        } else {
          //错误处理 状态返回不正确，弹窗提示
          //console.log("返回状态码错误");
        }
      };
      xhr.open("get","/contact");
      xhr.send(null);
    },
    //同步
    searchContact2: function(ev) {
      var xhr;
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (typeof window.ActiveXObject != "undefined") {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (ev.keyCode == 13) {
        if (this.searchName != "") {
          xhr.open("get", "/contact", false);
          xhr.send(null);
        } else {
          this.items = [
            { id: "F1", name: "张三" },
            { id: "F2", name: "李四" },
            { id: "F3", name: "赵五" },
            { id: "F4", name: "刘六" }
          ];
        }
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        var searched = JSON.parse(xhr.responseText).contactor.filter(item => {
          return item.contactName == this.searchName;
        });
        var contactname = "";
        var contactId = "";
        this.items = [];
        if (searched.length > 0) {
          contactname = searched[0].contactName;
          contactId = searched[0].contactId;
          this.items = [{ id: contactId, name: contactname }];
        }
      }
    },
    //axios方法写的get请求
    sendAxios: function(ev) {
      var instance = axios.create({
        timeout: 200
      });
      // 添加响应拦截器
      instance.interceptors.response.use(
        function(response) {
          // 对响应数据做点什么
          return response.data.data.contactor;
        },
        function(error) {
          // 对响应错误做点什么
          return Promise.reject(error);
        }
      );
      if (ev.keyCode == 13) {
        if (this.searchName != "") {
          instance({
            url:
              "https://easy-mock.com/mock/5b7cfe1a151681528a184c60/api/contact",
            method: "get"
          })
            .then(
              function(response) {
                var searched = response.filter(item => {
                  return item.contactName == this.searchName;
                });
                var contactname = "";
                var contactId = "";
                this.items = [];
                if (searched.length > 0) {
                  contactname = searched[0].contactName;
                  contactId = searched[0].contactId;
                  this.items = [{ id: contactId, name: contactname }];
                }
              }.bind(this)
            )
            .catch(function(error) {
              if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });
        } else {
          this.items = [
            { id: "F1", name: "张三" },
            { id: "F2", name: "李四" },
            { id: "F3", name: "赵五" },
            { id: "F4", name: "刘六" }
          ];
        }
      }
    },
    getItemGrade: function(index) {
      return this.contactClass[index].grade;
    }
  },
  //监听search框的内容变化，变化了就触发过滤事件
  //因为搜索框的内容用了v-model，所以内容改变时，绑定的数据也会响应式改变，监听这个数据即可
  watch: {
    searchName: function(val) {
        var searched = this.responseData.filter(item => {
          return item.contactName.indexOf( val)!=-1||!val;
        });
        this.items = [];
        for(var i=0;i<searched.length;i++){
          console.log(searched[i].contactName);
          this.items.push({id: searched[i].contactId, name: searched[i].contactName});
        }
    }
  },
  computed: {
    ...mapState({
      mainInfo: "contactMainInfo"
    }),
    contactClass: function() {
      return this.mainInfo;
    }
  },
  mounted: function() {
    this.searchContact1();
    this.getItems();
  }
};
</script>
<style scoped lang="scss">
.page {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 20px 0;
  text-align: center;
  .item {
    display: block;
    margin-bottom: 10px;
    background-color: #eee;
    color: black;
  }
  a {
    text-decoration: none;
  }
  .search {
    width: 80%;
    margin: 0 auto 10px;
    background-color: #fff;
    border: 1px solid #eee;
  }
  .addNew {
    font-size: 16px;
    color: red;
  }
}
</style>
