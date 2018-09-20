var Mock = require("mockjs");
Mock.mock("/addnewcontact", {
  message: "post请求成功"
});

Mock.setup({
  timeout: "200"
});
