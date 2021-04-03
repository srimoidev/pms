<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import store from "./store/index";
export default {
  store
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=K2D:wght@100;200;300;400;500;600;700;800&display=swap");
@import "./src/assets/styles/style.scss";
#app {
  font-family: "K2D", sans-serif !important;
}
</style>
