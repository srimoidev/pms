<template>
  <v-card class="fill-height">
    <div v-if="data.type === 'burndown'">
      <burndown-chart :data="data"></burndown-chart>
      <!-- <project-activity></project-activity> -->
    </div>
    <div v-else-if="data.type === 'piechart'">
      <pie-chart></pie-chart>
    </div>
    <div v-else-if="data.type === 'activities'">
      <project-activities></project-activities>
    </div>
  </v-card>
</template>

<script>
import BurndownChart from "@/components/BurndownChart";
import PieChart from "@/components/PieChart";
import ProjectActivities from "@/components/ProjectActivities";
export default {
  components: {
    BurndownChart,
    PieChart,
    ProjectActivities
  },
  data() {
    return {};
  },
  props: {
    data: Object
  }
};
</script>

<style>
.card {
  width: 100%;
  height: 100%;
  max-height: 90vh;
}
</style>
