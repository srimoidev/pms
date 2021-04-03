<template>
  <project-data-table :data="allGroup" :loading="loading"></project-data-table>
</template>

<script>
import DB from "@/mixins/Database";

import ProjectDataTable from "@/components/ProjectDataTable";
export default {
  components: {
    ProjectDataTable
  },
  data() {
    return {
      user: null,
      loading: true,
      allGroup: [],
      GroupData: [],
      selfGroup: {}
    };
  },
  methods: {
    async loadData() {
      this.allGroup = await DB.Project.GetAll();
      this.loading = false;
    }
  },
  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.loadData();
  }
};
</script>
<style scoped></style>
