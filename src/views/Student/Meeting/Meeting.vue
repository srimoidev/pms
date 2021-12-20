<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-data-table
      :headers="Headers"
      :items="filteredItems"
      :loading="loading"
      :item-class="rowStyle"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> การนัดหมาย </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-10"></v-text-field>
          <v-select
            v-model="filterType"
            :items="allMeetingType"
            item-text="name"
            item-value="id"
            hide-details
            outlined
            dense
            label="ประเภท"
            class="mr-2"
            style="width: 0"
          ></v-select>
          <v-select
            v-model="filterStatus"
            :items="allMeetingStatus"
            item-text="name"
            item-value="id"
            hide-details
            outlined
            dense
            label="สถานะ"
            class="mr-2"
            style="width: 0"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn color="primary" icon @click="calendarDialog = !calendarDialog">
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
          <v-btn class="primary white--text" @click="addModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เพิ่มนัดหมาย
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Title`]="{ item }">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <router-link class="text-none" :to="`meeting/${item.MeetingID}`">{{ item.Title }}</router-link>
            </span>
          </template>
          <div>{{ item.Detail }}</div>
        </v-tooltip>
        <!-- <router-link>{{ item.Title }}</router-link> -->
      </template>
      <template v-slot:[`item.RequestStatus`]="{ item }">
        <v-chip class="white--text d-block" :class="`m-status-${item.RequestStatus}`" small label>
          {{ allMeetingStatus[item.RequestStatus].name }}
        </v-chip>
      </template>
      <template v-slot:[`item.MeetingType`]="{ item }">
        <v-chip class="white--text" small label>
          {{ allMeetingType[item.MeetingType].name }}
        </v-chip>
      </template>
      <template v-slot:[`item.OnDate`]="{ item }">
        {{ formatDatetime(item.OnDate) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="item.MeetingType != meetingType && item.RequestStatus == 1" class="mr-2" color="green" @click="approveItem(item.MeetingID)">
          mdi-tooltip-check
        </v-icon>
        <v-icon v-if="item.MeetingType != meetingType && item.RequestStatus == 1" class="mr-2" color="red" @click="decilneItem(item.MeetingID)">
          mdi-tooltip-remove
        </v-icon>
        <v-icon v-if="item.RequestStatus != 4 && item.RequestStatus != 1" class="mr-2" @click="deleteItem(item.MeetingID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="calendarDialog" width="1000">
      <v-card>
        <v-system-bar color="primary darken-2" dark>
          <v-spacer></v-spacer>
          <v-icon>mdi-window-minimize</v-icon>
          <v-icon>mdi-window-maximize</v-icon>
          <v-icon dense small @click="calendarDialog = false">mdi-close</v-icon>
        </v-system-bar>
        <v-card-text class="pa-3">
          <v-sheet height="64">
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </v-toolbar>
          </v-sheet>
          <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :events="events" @change="getEvents" @click:event="clickEvent"></v-calendar>
        </v-card-text>
      </v-card>
    </v-dialog>
    <ModalContainer
      :active="modalVisable"
      :teachers="allTeacher"
      :projects="allProject"
      :meetingType="meetingType"
      :cancellable="1"
      @close="hideModal"
    >
      <NewMeeting :teachers="allTeacher" :projects="allProject" :meetingType="meetingType" @close="hideModal" @submit="submit" />
    </ModalContainer>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import NewMeeting from "@/components/NewMeeting";
export default {
  components: {
    ModalContainer,
    NewMeeting
  },
  data() {
    return {
      searchText: "",
      loading: true,
      windowHeight: 0,
      modalVisable: false,
      allMeeting: [],
      allMeetingStatus: [
        { id: 0, name: "ทั้งหมด" },
        { id: 1, name: "กำลังนำเนินการ" },
        { id: 2, name: "อนุมัติแล้ว" },
        { id: 3, name: "ถูกปฏิเสธ" },
        { id: 4, name: "ยกเลิกการนัดหมาย" }
      ],
      allMeetingType: [
        { id: 0, name: "ทั้งหมด" },
        { id: 1, name: "นักศึกษานัดอาจารย์" },
        { id: 2, name: "อาจารย์นัดนักศึกษา" }
      ],
      filterType: 0,
      filterStatus: 0,
      allTeacher: [],
      allProject: [],
      meetingData: {},
      data: {
        Title: "",
        Detail: "",
        Meeting_TeacherName: "",
        OnDate: ""
      },
      meetingType: "",
      Headers: [
        {
          text: "หัวข้อนัดหมาย",
          align: "start",
          sortable: true,
          value: "Title",
          width: 600
        },
        { text: "ประเภท", value: "MeetingType", sortable: false },
        { text: "เวลา", value: "OnDate" },
        { text: "สถานะ", align: "center", value: "RequestStatus" },
        { text: "Action", value: "actions" }
      ],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: "",
      events: [],
      calendarDialog: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    filteredItems() {
      return this.allMeeting
        .filter((item) => {
          return !this.filterType || item.MeetingType == this.filterType;
        })
        .filter((item) => {
          return !this.filterStatus || item.RequestStatus == this.filterStatus;
        })
        .filter((item) => {
          return item.ProjectID == this.user.ProjectID;
        });
    }
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    events(newValue) {
      this.events = newValue;
    }
  },
  methods: {
    async loadData() {
      this.allMeeting = await this.Meeting.GetAll();
      this.allTeacher = await this.User.UserTeacher();
      this.allProject = await this.Project.GetAll();
      this.meetingType = this.user.UserTypeID;
      this.getEvents();
      this.loading = false;
    },
    getEvents() {
      const events = [];
      this.allMeeting.forEach((item) => {
        let onDate = new Date(item.OnDate);
        onDate = onDate = onDate.getFullYear() + "-" + (onDate.getMonth() + 1) + "-" + onDate.getDate();
        events.push({
          name: item.Title,
          start: onDate,
          end: onDate,
          id: item.MeetingID
        });
      });
      console.log(events);
      this.events = events;
    },
    async submit(pData) {
      await this.Meeting.New({
        Title: pData.Title,
        ProjectID: this.user.ProjectID,
        Detail: pData.Detail,
        TeacherID: pData.TeacherID,
        MeetingType: this.meetingType,
        OnDate: pData.OnDate,
        CreatedBy: this.user.UserID,
        RequestStatus: "1"
      }).then(() => {
        this.loadData();
      });
    },
    addModal() {
      this.modalVisable = true;
    },
    viewItem(pID) {
      this.meetingData = this.Meeting.findOne(pID);
      this.data.Title = this.meetingData.Title;
      this.modalVisable = true;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    deleteItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการยกเลิกการนัดหมายใช่หรือไม่ ?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.Meeting.Delete(pID).then(() => {
              this.loadData();
            });
          }
        });
    },
    approveItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการยืนยันการนัดหมายใช่หรือไม่?",
          text: "You won't be able to revert this!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.Meeting.Approve(pID).then(() => {
              this.loadData();
            });
          }
        });
    },
    clickEvent(item) {
      this.$router.push(`/student/meeting/${item.event.id}`);
    },
    decilneItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการปฎิเสธการนัดหมายใช่หรือไม่?",
          text: "You won't be able to revert this!",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.Meeting.Decline(pID).then(() => {
              this.loadData();
            });
          }
        });
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
    formatDatetime(data) {
      moment.locale("th");
      return moment(data).format("MMMM Do, YYYY");
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
