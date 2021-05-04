<template>
  <v-card v-resize="onResize" tile class="ma-2 elevation-1">
    <v-data-table :headers="headers" :items="project" :height="windowHeight">
      <template v-slot:[`item.name`]="{ item }">
        <div>
          <router-link class="text-none" to="#">{{ item.name }}</router-link>
        </div>
      </template>
      <template v-slot:[`item.members`]="{ item }">
        <div v-for="member in item.members" :key="member.id">
          {{ member.name }}
        </div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div>
          <group-status :status="item.status"></group-status>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import GroupStatus from "@/components/GroupStatus";
export default {
  components: {
    GroupStatus
  },
  data() {
    return {
      windowHeight: 0,
      headers: [
        {
          text: "Project Name",
          align: "start",
          sortable: false,
          value: "Project_NameTH"
        },
        { text: "Member", value: "members", sortable: false },
        { text: "Type", value: "Project_TypeID", sortable: false },
        { text: "Status", value: "status" }
      ],
      project: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },
  watch: {
    user() {
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const temp = await this.Project.GetProjectByAdvisor(this.user.User_ID);
      console.log(temp);

      temp.map(item => this.project.push(item.Advisor_Project));
      console.log(this.project);
    },
    onResize() {
      //header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16 - 59;
    }
  }
};
</script>

<style></style>
