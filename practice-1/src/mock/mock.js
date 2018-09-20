// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
Random.extend({
  constellation: function(date) {
    var constellations = [
      "白羊座",
      "金牛座",
      "双子座",
      "巨蟹座",
      "狮子座",
      "处女座",
      "天秤座",
      "天蝎座",
      "射手座",
      "摩羯座",
      "水瓶座",
      "双鱼座"
    ];
    return this.pick(constellations);
  }
});

 Mock.mock("/contact", {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  // "list|1-10": [
  //   {
  //     // 属性 id 是一个自增数，起始值为 1，每次增 1
  //     "id|+1": 1
  //   }
  // ],
  "contactor|4": [
    {
      "contactId|+1": ["F1", "F2", "F3", "F4"], //数组内的同学id不重复,且与route的detailId参数相等
      "contactName|+1": ["张三", "李四", "赵五", "刘六"], //数组内的同学名字不重复
      constellation: "@CONSTELLATION", //星座
      email: "@email", //邮箱
      birthday: "@date", //生日
      "years|18-26": 0, //年龄
      photo: "@image"
    }
  ]
});

Mock.setup({
  timeout: "200"
});
