<template>
  <v-card v-resize="onResize" tile class="ma-2 elevation-1">
    <v-data-table
      :headers="headers"
      :items="data"
      :height="windowHeight"
    >
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
          value: "name"
        },
        { text: "Member", value: "members", sortable: false },
        { text: "Type", value: "types", sortable: false },
        { text: "Status", value: "status" }
      ],
      data: [
        {
          name: "PMS",
          members: [
            { id: 0, name: "พลเษฐ์ คำมุง" },
            { id: 1, name: "bdfdf hbtrh" }
          ],
          status: 3
        },
        {
          name: "PTT",
          members: [
            { id: 3, name: "csdf tyety" },
            { id: 4, name: "dfdg jytmtm" }
          ],
          status: 5
        }
      ]
    };
  },
  methods: {
    onResize() {
      //header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16 - 59;
    }
  },
};
</script>

<style></style>
