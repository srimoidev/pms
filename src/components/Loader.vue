<template>
  <div class="loader">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12">Loading...</v-col>
      <v-col cols="4">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="10"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.loader {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
