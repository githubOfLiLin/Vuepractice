<template>
<div class="add-new">
  <div class="main-info">
  <input type="text" placeholder="姓名" id="name" v-model="name"><br>
  <input type="text" placeholder="班级" id="grade" v-model="grade"><br>
  </div>
  <div class="item">
  <label for="phone"  class="label">电话</label>
  <input type="text" id="phone" class="textin" v-model="phone">
  </div>
<div class="item">
  <label for="email" class="label">邮箱</label>
  <input type="text" id="email" class="textin" v-model="email">
</div>
<button type="button" @click='sureAdd'>确定</button>
<p>{{message}}</p>
</div>

</template>

<style scoped lang="scss">
.add-new {
  text-align: center;
  padding: 10px 20px;
  input {
    display: block;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .main-info {
    input {
      width: 100%;
    }
  }
  .item {
    margin-bottom: 10px;
    overflow: hidden;
    .label {
      text-align: left;
      float: left;
    }
    .textin {
      float: right;
      width: 80%;
    }
  }
  button {
    width: 50%;
    padding: 5px;
    margin: 0 auto;
    background-color: rgb(189, 232, 247);
    border-radius: 5px;
  }
}
</style>

<script>
export default {
  name: "addcontact",
  data: function() {
    return {
      message: "",
      name: "",
      grade: "",
      phone: "",
      email: ""
    };
  },
  methods: {
    sureAdd: function() {
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
          console.log(JSON.parse(xhr.responseText).message);
          this.message = JSON.parse(xhr.responseText).message;
        }
      };
      var postData =
        "&name=" +
        this.name +
        "&grade=" +
        this.grade +
        "&phone=" +
        this.phone +
        "&email=";
      this.email;
      xhr.open("post", "/addnewcontact");
      xhr.send(postData);

      this.name="";
      this.grade="";
    }

  }
};
</script>
