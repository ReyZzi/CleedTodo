<!-- NavTodo.vue -->
<template>
  <nav
    class="flex flex-row sm:flex-col mt-12 w-auto sm:w-32"
    aria-label="Sidebar"
  >
    <div v-for="item in nav" :key="item.name">
      <!-- Met à jour l'élément actuel lors du clic -->
      <a
        :class="[
          item.current
            ? 'bg-gray-50 text-indigo-600'
            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
          'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold cursor-pointer',
        ]"
        @click="updateCurrent(item)"
      >
        {{ item.name }}
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { NavTodoView } from "../store/todo";

const store = useStore();
const nav = computed<NavTodoView[]>(() => store.state.todo.navView);

const updateCurrent = (clickeditem: NavTodoView) => {
  store.dispatch("todo/setFilter", clickeditem.name as NavTodoView["name"]);
};
</script>
