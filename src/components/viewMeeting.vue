<template>
  <v-card>
    <v-card-title>
      <v-icon large class="blue--text text--lighten-2 ma-2 mr-5">mdi-file-document-multiple-outline</v-icon>
      <span>สร้างนัดหมายใหม่</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container>
      <v-text-field v-model="meetingName" label="เรื่องนัดหมาย" outlined dense readonly></v-text-field>
      <v-textarea v-model="meetingDetail" outlined rows="3" no-resize label="รายละเอียด" readonly></v-textarea>
      <v-select
        :items="teachers"
        v-model="meetingTeacherID"
        label="อาจารย์"
        item-value="User_ID"
        :item-text="selectText"
        bottom
        outlined
        dense
        required
      >
      </v-select>
      <v-text-field v-model="meetingDateTime" type="datetime-local" label="เวลานัดหมาย" outlined dense></v-text-field>
      <!-- <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" @click="submit">Create</v-btn>
      </div> -->
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      meetingName: null,
      meetingDetail: null,
      meetingTeacher: null,
      meetingDateTime: null
    };
  },
  methods: {
    async loadData() {
      this.allMeeting = await this.Meeting.GetAll();
      this.loading = false;
    },
    close() {
      this.meetingName = null;
      this.meetingDetail = null;
      this.meetingTeacherID = null;
      this.meetingDateTime = null;
      this.$emit("close");
    }
  }
};
</script>

<style>
.icons {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>
