import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contactMainInfo: [
      { id: "F1", grade: "精机" },
      { id: "F2", grade: "精机一支部" },
      { id: "F3", grade: "精机一支部" },
      { id: "F4", grade: "精机一支部" }
    ],
    contactClass: "精机一支部" //当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  },
  mutations: {
    //你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。
    refreshClass(state, grade) {
      state.contactClass = grade;
    },
    //传入的参数infor是一个对象，因为vuex的方法要传入多个参数，需要传入一个对象，多个参入作为该对象的属性传入
    refreshGrade(state, infor) {
      for (var i = 0, len = state.contactMainInfo.length; i < len; i++) {
        if (state.contactMainInfo[i].id == infor.id) {
          state.contactMainInfo[i].grade = infor.grade;
        }
      }
    }
  },
  actions: {
    increment(a, grade) {
      a.commit("refreshClass", grade);
    }
  }
});
