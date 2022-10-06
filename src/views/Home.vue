<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <ul>
      <li>
        <RouterLink to="/">Stocks</RouterLink>
      </li>
      <li>
        <RouterLink to="/country">Country</RouterLink>
      </li>
      <li>
        <RouterLink to="/league">League</RouterLink>
      </li>
      <li>
        <RouterLink to="/franchise">Franchise</RouterLink>
      </li>
    </ul>
  </header>
  <div class="content-wrapper">
    <RouterView />
  </div>
</template>
<style scoped>
header {
  background-color: rgb(31, 29, 29);
}
ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(31, 29, 29);
  height: 100px;
  padding: 10px;
  margin-bottom: 50px;
  border-radius: 5px;
  max-width: 1300px;
  margin: 0 auto;
}
li {
  list-style: none;
  font-size: 1.3rem;
}
.router-link-active {
  border-bottom: 3px solid #288fff;
  color: #288fff;
}

a {
  text-decoration: none;
  /* color: #288fff; */
  color: white;
  padding-bottom: 5px;
}
a:hover {
  border-bottom: 3px solid #288fff;
}
.content-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 clamp(0rem, -0.23rem + 1.03vw, 1rem);
}
</style>
