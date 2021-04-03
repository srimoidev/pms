<template>
  <div>
    <v-card v-for="item in activitys" :key="item" flat>
      <v-card-subtitle>{{ item.date }}</v-card-subtitle>
      <div class="d-flex">
        <v-avatar color="blue" size="32" class="ma-4"
          ><span class="white--text">{{ item.by }}</span></v-avatar
        >
        <v-card-subtitle>
          <span v-if="item.type == 0">{{ item.by }} ได้ทำการแก้ไข CE01</span>
          <span v-if="item.type == 1">{{ item.by }} ได้ทำการส่ง CE01</span>
        </v-card-subtitle>
      </div>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activitys: [
        { type: "0", date: "Sep 3,2020", by: "PK" },
        { type: "1", date: "5/12/2563", by: "AM" }
      ]
    };
  }
};
</script>

<style></style>
