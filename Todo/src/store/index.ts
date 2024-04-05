// index.ts
import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import nav from "./nav";
import todo from "./todo";

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

export default createStore({
  plugins: [vuexPersist.plugin],
  modules: {
    todo,
    nav,
  },
});
