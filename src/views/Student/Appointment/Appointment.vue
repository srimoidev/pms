<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-data-table
      :headers="Headers"
      :items="allMeeting"
      :loading="loading"
      :item-class="rowStyle"
      loading-text="Loading... Please wait"
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> การนัดหมาย </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-10"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="showModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เพิ่มนัดหมาย
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Meeting_Type`]="{ item }">
        {{ item.Meeting_Type.MeetingType_Name }}
      </template>
      <template v-slot:[`item.Meeting_DateTime`]="{ item }">
        {{ new Date(item.Meeting_DateTime).toLocaleString("th-TH") }}
      </template>
      <template v-slot:[`item.Meeting_RequestStatusID`]="{ item }">
        <v-chip class="white--text" :class="`m-status-${item.Meeting_RequestStatusID}`" small label>
          {{ allMeetingStatus[item.Meeting_RequestStatusID - 1] }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <group-status :status="item.Project_Status.ProjectStatus_ID"></group-status>
      </template>
    </v-data-table>
    <modal-container :active="modalVisable" :teachers="allTeacher" :cancellable="1" @close="hideModal">
      <new-meeting @close="hideModal" />
    </modal-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import NewMeeting from "@/components/NewMeeting";
// import NewTopic from "@/components/NewTopic";
export default {
  components: {
    // GroupStatus,
    // NewTopic,
    ModalContainer,
    NewMeeting
    // ProjectModalDetail
  },
  data() {
    return {
      loading: true,
      windowHeight: 0,
      modalVisable: false,
      allMeeting: [],
      allMeetingStatus: ["Waiting", "Approved", "Declined"],
      allTeacher: [],
      data: {},
      Headers: [
        {
          text: "หัวข้อนัดหมาย",
          align: "start",
          sortable: true,
          value: "Meeting_Name",
          width: 600
        },

        { text: "ประเภท", value: "Meeting_Type", sortable: false },
        { text: "เวลา", value: "Meeting_DateTime" },
        { text: "สถานะ", value: "Meeting_RequestStatusID" },
        { text: "Action", value: "actions" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    // user() {
    //   this.loadData(); //จับตอน reload
    // }
  },
  methods: {
    async loadData() {
      this.allMeeting = await this.Meeting.GetAll();
      this.allTeacher = await this.User.UserTeacher();
      // console.log(this.allMeeting);
      this.loading = false;
    },
    showModal() {
      this.modalVisable = true;
    },
    hideModal() {
      this.modalVisable = false;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    },
    rowStyle() {
      return "tb-row";
    }
  }
};
</script>
<style scoped>
.tb-row {
  height: calc(100% / 20);
}
</style>
