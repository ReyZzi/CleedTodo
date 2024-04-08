<!-- NavBar.vue -->
<template>
  <nav class="w-full flex flex-row h-16 items-center" aria-label="Navbar">
    <div v-for="item in nav" :key="item.name">
      <RouterLink
        :to="item.to"
        :class="[
          item.name === currentNavItem &&
          (route.path === '/view' || route.path === '/add')
            ? 'bg-gray-50 text-indigo-600'
            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
          'rounded-md text-sm font-semibold ml-20',
        ]"
        @click="updateCurrent(item)"
        >{{ item.name }}</RouterLink
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "vuex";
import { NavItem } from "../store/nav";

const store = useStore();
const route = useRoute();

const nav = computed<NavItem[]>(() => store.state.nav.nav);

const updateCurrent = (clickeditem: NavItem) => {
  store.dispatch("nav/setCurrentNavItem", clickeditem.name);
};

const currentNavItem = computed<NavItem["name"]>(
  () => store.state.nav.currentNavItem
);

// Watcher to update the active item if there is a manual URL change
watch(route, (newRoute) => {
  const matchingNavItem = nav.value.find((item) => item.to === newRoute.path);
  if (matchingNavItem) {
    updateCurrent(matchingNavItem);
  }
});
watch(route, (newRoute) => {
  const matchingNavItem = nav.value.find((item) => item.to === newRoute.path);
  if (matchingNavItem) {
    updateCurrent(matchingNavItem);
  }
});
</script>
