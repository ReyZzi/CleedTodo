<!-- App.vue -->
<template>
  <header>
    <Navbar />
  </header>

  <div class="py-24">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/NavBar.vue";
</script>
