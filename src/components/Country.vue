<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data";
const dataStore = useDataStore();
onMounted(() => {
  dataStore.fetchCountry();
  console.log(dataStore.country);
});
</script>
<template>
  <div class="container">
    <div
      v-for="country in dataStore.country"
      class="country-card"
      :style="`background :${country.jerseyColor}`"
    >
      <img
        class="flag"
        :src="`https://cricstox-prod-data.s3.ap-south-1.amazonaws.com/${country.flag}`"
        alt="Flag"
      />
      <div>
        <div class="country-name">{{ country.name }}</div>
        <div>Abbr : {{ country.abbr }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 1rem;
  padding: 1.5rem 0;
}

@media screen and (max-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 1rem;
  }
}
@media screen and (max-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 1rem;
  }
}
@media screen and (max-width: 480px) {
  .container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 1rem;
  }
}
.country-card {
  display: flex;
  height: 6rem;
  border-radius: 0.5rem;
  padding: 8px;
  background-color: rgb(156, 226, 226);
  gap: 1rem;
}
.flag {
  flex-shrink: 1;
}
.country-name {
  white-space: nowrap;
}
</style>
