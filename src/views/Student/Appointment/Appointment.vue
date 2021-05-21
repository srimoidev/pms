<template>
  <div>
    <v-card class="ma-2" tile style="height:inherit">
      <v-toolbar height="56px" flat>
        <v-toolbar-title>Appointment</v-toolbar-title>
        <v-divider class="mx-4" vertical inset></v-divider>
        <v-spacer></v-spacer>
        <!-- <v-btn icon small>
          <v-icon @click="showModal">{{ "mdi-cog-outline" }}</v-icon>
        </v-btn> -->
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: [
        { id: 1, name: "A", color: "red", visible: false },
        { id: 2, name: "B", color: "blue", visible: true },
        { id: 3, name: "C", color: "yellow", visible: true }
      ]
    };
  },
  methods: {}
};
</script>

<style></style>
