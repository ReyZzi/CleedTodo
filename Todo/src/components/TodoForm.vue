<!-- TodoForm.vue -->
<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1
      class="mt-4 ml-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
    >
      Add to list
    </h1>
    <form class="flex flex-grow" @submit.prevent="addTodo">
      <div class="mt-12">
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >Item Name</label
        >
        <div class="flex flex-grow relative mt-2 rounded-md shadow-sm">
          <input
            v-model="newTodoText"
            :class="[
              'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset sm:text-sm sm:leading-6 pl-1',
              errorMessage
                ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500'
                : 'text-black-900 ring-black-300 placeholder:text-black-300 focus:ring-2 focus:ring-inset focus:ring-black-500',
            ]"
            placeholder="Nouveau todo"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          <button
            type="submit"
            class="ml-5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ajouter
          </button>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          ></div>
        </div>
        <p
          v-if="errorMessage"
          class="mt-2 text-sm text-red-600"
          id="email-error"
        >
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { z } from "zod";

const store = useStore();
const newTodoText = ref("");
const errorMessage = ref("");

const TodoTextSchema = z
  .string()
  .min(1, "Le texte du todo ne peut pas être vide");

const addTodo = () => {
  try {
    TodoTextSchema.parse(newTodoText.value);
    store.dispatch("todo/addTodo", newTodoText.value);
    resetForm();
  } catch (error) {
    if (error instanceof z.ZodError) {
      errorMessage.value = error.errors[0].message;
    }
  }
};

const resetForm = () => {
  newTodoText.value = "";
  errorMessage.value = "";
};
</script>
