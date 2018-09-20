# Vuepractice
基于vue框架以及vue router开发的类似于微信的单页面应用

一:页面
1.通讯录首页
a.搜索：可输入联系人名字，筛选出对应的联系人 （watch+v-model+数组 filter）
b.新建联系人：跳转到新建联系人页面（Vue Router,因为要整页覆盖，所以不能用二级路由，二级路由的 link 与 view 要在同一页面。用同级路由）
c.联系人列表：根据 get 请求来的联系人数据渲染列表 （vue 组件 data,ajax-get，页面加载后请求一次数据，保存在 vue data 中，每次搜索时从 data 读取数据，不用每次搜索都发送请求。）

2.新建联系人页面
a.向后台发送 post 请求,（保存提交的数据）（ajax+mock.js）

3.联系人信息页面
a.点击首页每一个联系人 item，即可跳转到联系人信息列表（动态路由：每个联系人信息页面格式一样内容不同，所以都是跳转到同一页面，在 contact.vue 中，定义数据，根据动态路由参数（floorid）来筛选数据，渲染 DOM）
b.修改备注信息，同时可改变联系人首页上的备注（Vuex）
c.点击更多信息，跳转到详细信息页面

4.联系人详细信息页面
get 请求从后台获取数据，根据 detailId 筛选对应联系人的数据。

二：用到的知识：Vue,vue Router,Vuex,ajax,数组操作
1.vue 计算属性 computed,侦听器 watch,方法 methods 区别
computed：只是属性，不要是方法，不可传参数，一次可监听多个变量的变化。基于它们的依赖进行缓存的， watch：一次只能监听一个数据的变化，相对麻烦 methods：方法，每次触发都要执行函数

2.数组遍历
查询数组中的项是否满足某个条件 every() some()
对每一项进行操作 forEach()
生成一个新的数组 map()
过滤 filter()

3.this
