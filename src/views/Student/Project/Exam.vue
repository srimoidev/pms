<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-toolbar flat color="white">
      <v-toolbar-title>ขออนุมัติสอบ</v-toolbar-title>
    </v-toolbar>
    <v-divider class="mx-2"></v-divider>
    <v-container>
      <v-row dense>
        <v-col cols="3" class="align-self-end text-right"><label>วัน-เวลา สอบ : </label></v-col>
        <v-col cols="4"><v-text-field type="datetime-local" class="" name="datetime" hide-details></v-text-field></v-col>
      </v-row>
      <v-row dense class="mt-2">
        <v-col cols="3" class="align-self-center text-right"><label>เอกสารแนบ (ถ้ามี) : </label></v-col>
        <v-col cols="4"><v-file-input class="" outlined dense></v-file-input></v-col>
      </v-row>
      <v-row dense class="mt-2 justify-end">
        <v-btn class="success mr-2" small>ส่ง</v-btn>
        <v-btn class="" small>ยกเลิก</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>
_

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      windowHeight: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    // user() {
    //   this.loadData(); //จับตอน reload
    // }
  },
  methods: {
    async loadData() {},
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    }
  }
};
</script>
<style scoped>
.tb-row {
  height: calc(100% / 20);
}
</style>
