// todo.ts
import { Commit } from "vuex";
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  Selected?: boolean;
}
export interface NavTodoView {
  name: string;
  current: boolean;
}
interface State {
  todos: Todo[];
  filter: NavTodoView["name"];
  navView: NavTodoView[];
}

const state: State = {
  todos: [] as Todo[],
  filter: "all" as NavTodoView["name"],
  navView: [
    { name: "all", current: true },
    { name: "active", current: false },
    { name: "completed", current: false },
  ] as NavTodoView[],
};

const mutations = {
  addTodo(state: State, todo: Todo) {
    state.todos.push(todo);
  },
  updateTodo(state: State, updatedTodo: Todo) {
    const index = state.todos.findIndex(
      (todo: Todo) => todo.id === updatedTodo.id
    );
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
  toggleTodo(state: State, todoId: number) {
    const todo = state.todos.find((todo: Todo) => todo.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  removeTodo(state: State, todoId: number) {
    state.todos = state.todos.filter((todo: Todo) => todo.id !== todoId);
  },
  // Updates the current filter and updates the 'current' status of navigation elements
  setFilter(state: State, filter: NavTodoView["name"]) {
    state.filter = filter;
    state.navView.forEach((item) => {
      item.current = item.name === filter;
    });
  },
};

const actions = {
  addTodo({ commit }: { commit: Commit }, text: string) {
    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    commit("addTodo", todo);
  },
  updateTodo({ commit }: { commit: Commit }, updatedTodo: Todo) {
    commit("updateTodo", updatedTodo);
  },
  toggleTodo({ commit }: { commit: Commit }, todoId: number) {
    commit("toggleTodo", todoId);
  },
  removeTodo({ commit }: { commit: Commit }, todoId: number) {
    commit("removeTodo", todoId);
  },
  setFilter({ commit }: { commit: Commit }, filter: NavTodoView["name"]) {
    commit("setFilter", filter);
  },
};

const getters = {
  // Returns todos according to the current filter
  filteredTodos: (state: State) => {
    switch (state.filter) {
      case "all":
        return state.todos;
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      case "active":
        return state.todos.filter((todo) => !todo.completed);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
