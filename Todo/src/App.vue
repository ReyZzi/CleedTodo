<!-- App.vue -->
<template>
  <!-- Navbar est le composant de la barre de navigation horizontale -->
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
