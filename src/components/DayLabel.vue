<template>
  <v-chip class=" justify-center" :class="`day-${day}`" small style="width:86px">{{ dayText[day - 1].text }}</v-chip>
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dayText: [
        { text: "วันอาทิตย์" },
        { text: "วันจันทร์" },
        { text: "วันอังคาร" },
        { text: "วันพุธ" },
        { text: "วันพฤหัสบดี" },
        { text: "วันศุกร์" },
        { text: "วันเสาร์" }
      ]
    };
  }
};
</script>

<style>
/* Sunday */
.day-1 {
  background-color: #ffebee !important;
  color: #ff1744 !important;
}
/* Monday */
.day-2 {
  background-color: #fffde7 !important;
  color: #ffab00 !important;
}
/* Tuesday */
.day-3 {
  background-color: #fce4ec !important;
  color: #ff4081 !important;
}
/* Wednesday */
.day-4 {
  background-color: #e8f5e9 !important;
  color: #00e676 !important;
}
/* Thursday */
.day-5 {
  background-color: #fff3e0 !important;
  color: #ff9100 !important;
}
/* Friday */
.day-6 {
  background-color: #e1f5fe !important;
  color: #40c4ff !important;
}
/* Saturday */
.day-7 {
  background-color: #f3e5f5 !important;
  color: #e040fb !important;
}
</style>
