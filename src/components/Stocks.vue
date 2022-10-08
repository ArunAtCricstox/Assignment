<script setup>
import { ref } from "vue";
import { onMounted, toRaw } from "vue";
import { useDataStore } from "../stores/data";
const dataStore = useDataStore();
const clicked = ref(false);
onMounted(() => {
  dataStore.fetchAllStocks();
  dataStore.fetchStockMetadata();
  dataStore.fetchCountry();
  // dataStore.fetchFranchise();
  // dataStore.fetchLeague();
  clicked.value = window.innerWidth > 768 ? true : false;
});
</script>

<template>
  <button class="toggle-button" @click="clicked = !clicked">Sort</button>
  <Transition name="slide-fade">
    <div v-if="clicked" class="input-container">
      <div class="marketwatch-filter-wrapper">
        <label for="marketwatch">Marketwatch</label>
        <select name="marketwatch" v-model="dataStore.selectedMarketwatch">
          <option selected="true" value="TRENDING">TRENDING</option>
          <option value="LOOSERS">LOSERS</option>
          <option value="GAINERS">GAINERS</option>
        </select>
      </div>
      <div class="country-filter-wrapper">
        <label for="country">Country</label>
        <select name="country" v-model="dataStore.selectedCountry">
          <option selected="true" value="ALL">ALL</option>
          <option
            v-for="{ name, id } in dataStore.country"
            :value="id"
            :id="id"
          >
            {{ name }}
          </option>
        </select>
      </div>

      <div class="stock-search-wrapper">
        <label for="">Search Stock</label>
        <input
          type="text"
          placeholder="Search Stock"
          v-model="dataStore.selectedStock"
        />
      </div>
      <div class="franchise-filter-wrapper">
        <label>Franchise</label>
        <select v-model="dataStore.selectedFranchise">
          <option value="ALL">ALL</option>
          <option
            v-for="franchise in dataStore.franchise"
            :value="franchise.id"
          >
            {{ franchise.name }}
          </option>
        </select>
      </div>
      <div class="league-filter-wrapper">
        <label for="league">League </label>
        <select name="league" id="league" v-model="dataStore.selectedLeague">
          <option value="ALL">ALL</option>
          <option v-for="league in dataStore.league" :value="league.id">
            {{ league.name }}
          </option>
        </select>
      </div>
      <div class="no-of-row-wrapper">
        <label>No. Of Stocks</label>
        <input
          placeholder="Type a No."
          v-model="dataStore.noOfRows"
          type="number"
        />
      </div>
    </div>
  </Transition>

  <div class="container">
    <div v-for="stock in toRaw(dataStore.filteredStock)">
      <div class="stock-card">
        <img
          :src="`https://cricstox-prod-data.s3.ap-south-1.amazonaws.com/${stock.avatarImage}`"
          alt="Avatar"
        />
        <div>
          <div class="stock-name">{{ stock.name }}</div>
          <div>
            <span> {{ dataStore.countryMapping[stock.country] + ". " }} </span>
            <span>
              {{
                stock.franchise
                  .map((e) =>
                    dataStore.franchiseIdNameMapping[e]
                      ? dataStore.franchiseIdNameMapping[e]
                      : null
                  )
                  .join("")
              }}
            </span>
          </div>
          <div>
            <span>₹{{ stock.currPrice }}</span>
            <span :class="stock.pctChange > 0 ? 'gainer' : 'looser'"
              >{{ stock.pctChange }}%</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.toggle-button {
  background-color: rgb(59, 59, 201);
  padding: 8px 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 1rem 0.5rem;
  font-size: 1.2rem;
}
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 1.5rem;
}
.stock-card {
  display: flex;
  height: 6rem;
  border-radius: 0.5rem;
  padding: 8px;
  background-color: rgb(156, 226, 226);

  /* box-shadow: 11px 9px 9px -3px rgba(106, 240, 240, 0.75); */
}
.stock-name {
  white-space: nowrap;
  font-weight: 500;
}
.gainer {
  color: green;
  padding-left: 5px;
}
.looser {
  color: red;
  padding-left: 5px;
}
.marketwatch-filter-wrapper,
.country-filter-wrapper,
.stock-search-wrapper,
.franchise-filter-wrapper,
.league-filter-wrapper,
.no-of-row-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}
label {
  font-weight: 1.2rem;
  font-size: 1.3rem;
  color: rgb(102, 150, 255);
}
select,
input {
  font-weight: 1.2rem;
  font-size: 1.2rem;
  padding: 4px 6px;
  border-radius: 5px;
  outline: none;
}

@media screen and (max-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem;
  }
  select,
  input {
    width: 150px;
  }

  .marketwatch-filter-wrapper,
  .country-filter-wrapper,
  .stock-search-wrapper,
  .franchise-filter-wrapper,
  .league-filter-wrapper,
  .no-of-row-wrapper {
    margin: 0.3rem 0;
  }
}
@media screen and (max-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem;
  }
  .input-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
  .input-container {
    position: sticky;
    top: 0;
  }
}

@media screen and (max-width: 480px) {
  .container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: 0.5rem;
  }
  select,
  input {
    font-weight: 1rem;
    font-size: 1rem;
    padding: 4px 6px;
    border-radius: 5px;
    outline: none;
  }
  label {
    font-size: 1.1rem;
  }
  .input-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0rem;
    margin: 0 8px;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50vw);
  opacity: 0;
}
@media screen and (min-width: 769px) {
  .slide-fade-leave-active,
  .slide-fade-leave-to,
  .slide-fade-enter-active,
  .slide-fade-enter-from {
    transition: none;
    display: block !important;
  }
  .toggle-button {
    display: none;
  }
}
</style>
