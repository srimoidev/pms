<template>
  <v-card>
    <!-- <v-card-subtitle>{{ data.date }}</v-card-subtitle> -->
    <!-- <span class="pl-4 pb-4">งานที่ทำ</span> -->
    <v-card-title style="font-size:16px">งานที่ทำ</v-card-title>
    <v-card-text class="ml-4">
      {{ data.job_desc }}
    </v-card-text>
    <!-- <span class="ml-4 mb-4">ปัญหา และ วิธีแก้ไข</span> -->
    <v-card-title style="font-size:16px">ปัญหา และ วิธีแก้ไข</v-card-title>
    <v-card-text class="ml-4">
      {{ data.job_solution }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style></style>
