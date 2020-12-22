<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <dashboard />
      <view-form /> -->
      <mgr-form />
    </v-main>
  </v-app>
</template>

<script>
// import Dashboard from "./components/Dashboard.vue";
import MgrForm from "./components/MgrForm.vue";
// import ViewForm from "./components/ViewForm.vue";
export default {
  components: {
    // Dashboard,
    // ViewForm,
    MgrForm,
  },
  data() {
    return {
      name: "PROJECT MANAGEMENT SYSTEMS",
      drawer: false,
      group: null,
    };
  },
};
</script>

<style>
.v-application {
  font-family: "Kanit" !important;
}
</style>
