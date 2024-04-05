// nav.ts
import { Commit } from "vuex";
export interface NavItem {
  name: string;
  to: string;
}
interface State {
  currentNavItem: NavItem["name"];
  nav: NavItem[];
}

const state: State = {
  currentNavItem: "TodoList",
  nav: [
    { name: "TodoList", to: "/view" },
    { name: "Add To List", to: "/add" },
  ],
};

const mutations = {
  setCurrentNavItem(state: State, navItemName: NavItem["name"]) {
    state.currentNavItem = navItemName;
  },
};

const actions = {
  setCurrentNavItem(
    { commit }: { commit: Commit },
    navItemName: NavItem["name"]
  ) {
    commit("setCurrentNavItem", navItemName);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
