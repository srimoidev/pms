<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <span class="circle-dot mr-2" :class="`status-${status}`"> </span>
        {{ statusText[status].text }}
      </span>
    </template>
    <span>{{ statusText[status].detail }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      statusText: [
        {},
        { text: "Draft", detail: "เตรียมการจัดกลุ่ม" },
        { text: "Wait Adviser", detail: "รอการรับเป็นที่ปรึกษา" },
        { text: "In Progress", detail: "กำลังดำเนินการ" },
        { text: "Incomplete", detail: "ไม่สมบูรณ์" },
        { text: "Failure", detail: "สอบตก" },
        { text: "Completed", detail: "สมบูรณ์" }
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
/* Draft */
.status-1 {
  background-color: #adadad !important;
}
/* Wait Adviser */
.status-2 {
  background-color: #ffea00 !important;
}
/* In Progress */
.status-3 {
  background-color: #29b6f6 !important;
}
/* Incomplete */
.status-4 {
  background-color: #fb6340 !important;
}
/* Failure */
.status-5 {
  background-color: #f5365c !important;
}
/* Completed */
.status-6 {
  background-color: #2dce89 !important;
}
</style>
