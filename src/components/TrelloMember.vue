<template>
  <div class="text-center">
    <v-menu v-model="menu" close-on-content-click :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn fab outlined small v-on="on" color="blue">{{ initial }}</v-btn>
      </template>
      <v-card width="250px" style="display:flex">
        <div class="icon-container">
          <v-btn fab color="gray">{{ initial }}</v-btn>
        </div>
        <div class="icon-container">
          <span>{{ fullname }}</span>
          <v-subheader class="text-id">@{{ username }}</v-subheader>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  props: {
    initial: String,
    fullname: String,
    username: String
  }
};
</script>

<style>
.icon-container {
  padding: 8px;
}
.text-id {
  padding: 5px 0px;
  height: auto;
}
</style>
