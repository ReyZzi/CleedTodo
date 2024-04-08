<!-- ViewTodos.vue -->
<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1
      class="mt-4 ml-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
    >
      TodoList View
    </h1>
    <NavTodo />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import NavTodo from "../components/NavTodo.vue";
import TodoList from "../components/TodoList.vue";
</script>
