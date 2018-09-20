<template>
<div class="infor">
  <div v-for='item in infor' :key="item.key" class="clearfix">
<p class="labelT ">{{item.label+":"}}</p>
<p class="valueT ">{{item.value}}</p>
  </div>
</div> 
</template>
<style scoped lang="scss">
.clearfix:after {
  content: "";
  clear: both;
  display: table;
}
.infor {
  margin: 20px 0px;
  text-align: center;
  div {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 0 20px;
    .labelT {
      float: left;
      margin-right: 10px;
    }
    .valueT {
      float: left;
    }
  }
}
</style>

<script>
export default {
  name: "detailedInfor",
  data: function() {
    return {
      responsedata: [],
      infor: {
        name: {
          label: "姓名",
          value: ""
        },
        email: {
          label: "邮箱",
          value: ""
        },
        star: {
          label: "星座",
          value: ""
        },
        birthday: {
          label: "生日",
          value: ""
        },
        years: {
          label: "年龄",
          value: ""
        },
        photo: {
          label: "照片",
          value: ""
        }
      }
    };
  },
  methods: {
    addURLParam: function(url, name, value) {
      url += url.indexOf("?") == -1 ? "?" : "&";
      url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
      return url;
    },
    //异步
    nostepGetter: function() {
      var xhr;
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (typeof ActiveXObject != "undefined") {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
          //console.log(xhr.responseText);
          this.responsedata = JSON.parse(xhr.responseText).contactor;
          this.getInfor();
        }
        // console.log(this)   // ***要用箭头函数，函数执行的this对象为xhr***
      };
      /*get传参，但mock.js不能识别参数*/
      // var url = "/src/mock.js/contactor/contactorlist.json";   //后台请求的路径
      // var paramsName = "contactId";   //参数名
      // var paramsValue = this.$route.params.detailId; //参数值
      // url = this.addURLParam(url, paramsName, paramsValue);
      xhr.open("get", "/contact"); //异步调用时，把要异步做的事情放在xhr.onreadystatechange事件中，同步没有该事件
      xhr.send(null);
    },
    //同步
    stepGetter: function() {
      var xhr;
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (typeof window.ActiveXObject != "undefined") {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("get", "/contact", false); //异步调用时，把要异步做的事情放在xhr.onreadystatechange事件中，同步没有该事件
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        this.responsedata = JSON.parse(xhr.responseText).contact;
        this.getInfor();
      }
      // console.log(this)   // ***要用箭头函数，函数执行的this对象为xhr***
    },
    getInfor: function() {
      var contactId = this.$route.params.detailId;
      //筛选响应联系人的信息数组保存到contactMessage中
      var contactMessage = this.responsedata.filter(item => {
        return item.contactId == contactId;
      })[0];
      //将对应联系人的各条信息保存到vue的data中
      if (contactMessage) {
        this.infor.name.value = contactMessage.contactName;
        this.infor.email.value = contactMessage.email;
        this.infor.star.value = contactMessage.constellation;
        this.infor.birthday.value = contactMessage.birthday;
        this.infor.years.value = contactMessage.years;
        this.infor.photo.value = contactMessage.photo;
      } else {
        alert("未匹配到该联系人的数据");
      }
    }
  },
  created: function() {
    //this.nostepGetter();
  },
  beforeMount: function() {
    console.log("detailedInfor加载前");
    //this.stepGetter;   //也能得到响应的数据
  },
  mounted: function() {
    //get请求操作DOM的话要在mounted阶段发出，不然可以在前面就发出
    this.nostepGetter();
    //this.stepGetter();
  },
  updated: function() {
    console.log("updata");
  }
};
</script>
