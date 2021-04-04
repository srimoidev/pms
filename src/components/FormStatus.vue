<template>
  <v-tooltip v-if="status != undefined" bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <span class="circle-dot mr-2" :class="`status-${status}`"> </span>
        {{ statusText[status].text }}
      </span>
    </template>
    <span>{{ statusText[status].detail }}</span>
  </v-tooltip>
  <v-tooltip v-else bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <span class="circle-dot mr-2 status-0"></span>
        {{ statusText[0].text }}
      </span>
    </template>
    <span>{{ statusText[0].detail }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      statusText: [
        { text: "None", detail: "ยังไม่ได้ดำเนินการ" },
        { text: "Pending", detail: "กำลังดำเนินการ" },
        { text: "Wait Adviser", detail: "รออาจารย์ที่ปรึกษาตรวจสอบ" },
        { text: "Wait Instructor", detail: "รออาจารย์ประจำวิชาตรวจสอบ" },
        {
          text: "Rejected",
          detail: "ถูกปฏิเสธจากอาจารย์ที่ปรึกษา หรือ อาจารย์ประจำวิชา"
        },
        { text: "Completed", detail: "ดำเนินการเรียบร้อย" }
      ]
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
/* None */
.status-0 {
  background-color: #adadad !important;
}
/* pending */
.status-1 {
  background-color: #fb6340 !important;
}
/* Wait Adviser */
.status-2 {
  background-color: aquamarine !important;
}
/* Wait Instructor */
.status-3 {
  background-color: aqua !important;
}
/* Rejected */
.status-4 {
  background-color: #f5365c !important;
}
/* Approved */
.status-5 {
  background-color: #2dce89 !important;
}
</style>
