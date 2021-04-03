<template>
  <v-dialog v-if="confirm" v-model="active" persistent width="25%">
    <v-card>
      <v-card-title class="amber lighten-1 justify-center title-bg">
        <v-icon size="72" class="grey--text text--lighten-5">
          {{ icon ? icon : "mdi-progress-question" }}
        </v-icon>
      </v-card-title>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <div class="d-flex">
        <v-btn plain tile @click="submit" color="white" width="50%">
          <span class="accent--text">Yes</span>
        </v-btn>
        <v-btn plain tile @click="close" color="white" width="50%">
          <span class="grey--text text-lighten-3">Cancel</span>
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-else-if="error" v-model="active" persistent width="30%">
    <v-card>
      <v-card-title class="red lighten-1 justify-center">
        <v-icon size="72" class="grey--text text--lighten-5">
          {{ icon ? icon : "mdi-progress-alert" }}
        </v-icon>
      </v-card-title>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-btn block plain tile @click="close" color="white">
        <span class="accent--text">OK</span>
      </v-btn>
    </v-card>
  </v-dialog>
  <v-dialog
    v-else
    v-model="active"
    persistent
    width="420"
    style="border-radius: 1rem"
  >
    <v-card>
      <v-card-title class="light-green lighten-1 justify-center">
        <v-icon size="72" class="grey--text text--lighten-5">
          {{ icon ? icon : "mdi-progress-check" }}
        </v-icon>
      </v-card-title>
      <div class="ma-4">
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text class="grey--text text--darken-1">
          {{ text }}
        </v-card-text>
      </div>

      <v-divider class="mx-4"></v-divider>
      <v-btn block plain tile @click="close" color="white" height="50">
        <span class="accent--text">OK</span>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    confirm: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    summit() {
      this.$emit("submit");
    }
  }
};
</script>

<style>
.title-bg {
}
</style>
