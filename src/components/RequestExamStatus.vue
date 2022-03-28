<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on" style="cursor: default;">
        <span class="circle-dot mr-2" :class="`e-status-${status}`"> </span>
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
        { text: "Wait Adviser", detail: "รออาจารย์ที่ปรึกษาอนุมัติสอบ" },
        { text: "Wait Instructor", detail: "รออาจารย์ที่ประจำวิชาอนุมัติสอบ" },
        { text: "Wait For Exam", detail: "รอดำเนินการสอบ" },
        { text: "Reject by Advisor", detail: "อาจารย์ที่ปรึกษาไม่อนุมัติ" },
        { text: "Reject by Instructor", detail: "อาจารย์ที่ประจำวิชาไม่อนุมัติ" }
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
