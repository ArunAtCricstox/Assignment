<script setup>
import { useDataStore } from "../stores/data";
const dataStore = useDataStore();
</script>
<template>
  <div class="franchise-card-container">
    <div v-for="franchise in dataStore.franchise"></div>
  </div>
</template>
