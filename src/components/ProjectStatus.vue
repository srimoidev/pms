<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on" style="cursor: default;">
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
        { text: "Completed", detail: "สมบูรณ์" },
        { text: "Rejected", detail: "ไม่อนุมัติเป็นที่ปรึกษา" }
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
</style>
