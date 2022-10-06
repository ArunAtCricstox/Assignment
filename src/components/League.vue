<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data";
const useData = useDataStore();
onMounted(() => {
  useData.fetchLeague();
});
</script>
<template>League</template>
