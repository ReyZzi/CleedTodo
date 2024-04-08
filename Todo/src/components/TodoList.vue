<!-- TodoList.vue -->
<template>
  <div class="mx-auto max-w-2xl">
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="flex items-center space-x-2 space-y-4"
      >
        <span
          v-if="!isEditing[todo.id]"
          :class="{ 'line-through': todo.completed }"
          class="flex-grow font-semi-bold"
          >{{ todo.text }}</span
        >
        <input
          v-else
          v-model="editedText[todo.id]"
          @blur="stopEditing(todo.id)"
          @keyup.enter="stopEditing(todo.id)"
          class="border rounded px-2 py-1 mt-4 flex-grow"
        />
        <button
          v-if="filter === 'active' || (filter === 'all' && !todo.completed)"
          @click="
            isEditing[todo.id] ? stopEditing(todo.id) : startEditing(todo.id)
          "
          @mousedown.prevent
          class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ isEditing[todo.id] ? "Validate" : "Edit" }}
        </button>
        <button
          v-if="filter === 'active' || (filter === 'all' && !todo.completed)"
          @click="toggleTodo(todo.id)"
          class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Complete
        </button>
        <button
          @click="removeTodo(todo.id)"
          class="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
      </li>
    </ul>
    <div class="mt-12">
      <button
        v-if="filter === 'active'"
        @click="removeSelectedTodos"
        class="rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Delete all
      </button>
      <button
        v-if="filter === 'active'"
        @click="completeSelectedTodos"
        class="ml-5 rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Complete all
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive } from "vue";
import { useStore } from "vuex";
import { z } from "zod";
import { NavTodoView, Todo } from "../store/todo";

const store = useStore();

const todos = computed<Todo[]>(() => store.state.todo.todos);
const filteredTodos = computed<Todo[]>(
  () => store.getters["todo/filteredTodos"]
);
const filter = computed<NavTodoView["name"]>(() => store.state.todo.filter);

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const completeSelectedTodos = () => {
  todos.value
    .filter((todo) => !todo.completed)
    .forEach((todo) => store.dispatch("todo/toggleTodo", todo.id));
};

const isEditing = reactive<Record<number, boolean>>({});
const editedText = reactive<Record<number, string>>({});

const startEditing = (id: number) => {
  isEditing[id] = true;
  editedText[id] = todos.value.find((todo) => todo.id === id)?.text || "";
};

const stopEditing = (id: number) => {
  if (editedText[id]) {
    const updatedTodo = {
      id,
      text: editedText[id],
      completed: todos.value.find((todo) => todo.id === id)?.completed || false,
    };
    if (TodoSchema.safeParse(updatedTodo).success) {
      store.dispatch("todo/updateTodo", updatedTodo);
    }
  }
  nextTick(() => {
    isEditing[id] = false;
  });
};

const toggleTodo = (id: number) => {
  store.dispatch("todo/toggleTodo", id);
};

const removeTodo = (id: number) => {
  store.dispatch("todo/removeTodo", id);
};

const removeSelectedTodos = () => {
  todos.value
    .filter((todo) => !todo.Selected)
    .forEach((todo) => store.dispatch("todo/removeTodo", todo.id));
};
</script>
