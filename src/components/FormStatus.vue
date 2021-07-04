<template>
  <v-tooltip v-if="status != undefined" bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <span class="circle-dot mr-2" :class="`f-status-${status.FormStatusID}`"> </span>
        {{ status.StatusName }}
      </span>
    </template>
    <span>{{ status.StatusDetail }}</span>
  </v-tooltip>
  <v-tooltip v-else bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <span class="circle-dot mr-2 f-status-0"></span>
        None
      </span>
    </template>
    <span>ยังไม่ได้ดำเนินการ</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    status: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      // formStatus: [
      //   { text: "None", detail: "ยังไม่ได้ดำเนินการ" },
      //   { text: "Pending", detail: "กำลังดำเนินการ" },
      //   { text: "Wait Adviser", detail: "รออาจารย์ที่ปรึกษาตรวจสอบ" },
      //   { text: "Wait Instructor", detail: "รออาจารย์ประจำวิชาตรวจสอบ" },
      //   {
      //     text: "Rejected",
      //     detail: "ถูกปฏิเสธจากอาจารย์ที่ปรึกษา หรือ อาจารย์ประจำวิชา"
      //   },
      //   { text: "Completed", detail: "ดำเนินการเรียบร้อย" }
      // ]
    };
  }
};
</script>

<style scoped>
.circle-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-flex;
}
</style>
