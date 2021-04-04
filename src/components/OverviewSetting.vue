<template>
  <v-card width="600" height="400">
    <v-card-title class="blue">
      Setting
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="mx-6">
      layout
      <v-slider
        v-model="layout_index"
        :tick-labels="[1, 2, 3, 4, 5, 6]"
        :max="5"
        step="1"
        ticks="always"
        tick-size="3"
      ></v-slider>

      <v-btn @click="apply">Apply</v-btn>
    </div>
  </v-card>
</template>

<script>
// import { integer } from "vee-validate/dist/rules";
export default {
  props: {
    layout: Number
  },
  data() {
    return {
      layout_index: this.layout,
      radioGroup: true
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    apply() {
      this.$emit("apply", this.layout_index);
    }
  }
};
</script>

<style></style>
