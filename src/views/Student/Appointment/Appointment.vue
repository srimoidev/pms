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
            style="width:0"
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
            style="width:0"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="addModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เพิ่มนัดหมาย
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Meeting_Name`]="{ item }">
        <router-link :to="`appointment/${item.Meeting_ID}`">{{ item.Meeting_Name }}</router-link>
      </template>
      <template v-slot:[`item.Meeting_RequestStatusID`]="{ item }">
        <v-chip class="white--text" :class="`m-status-${item.Meeting_RequestStatusID}`" small label>
          {{ allMeetingStatus[item.Meeting_RequestStatusID].name }}
        </v-chip>
      </template>
      <template v-slot:[`item.Meeting_TypeID`]="{ item }">
        <v-chip class="white--text" small label>
          {{ allMeetingType[item.Meeting_TypeID].name }}
        </v-chip>
      </template>
      <template v-slot:[`item.Meeting_DateTime`]="{ item }">
        {{ formatDatetime(item.Meeting_DateTime) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="item.Meeting_TypeID !== meetingType" class="mr-2" color="green" @click="approveItem(item.Meeting_ID)">
          mdi-tooltip-check
        </v-icon>
        <v-icon v-if="item.Meeting_TypeID !== meetingType" class="mr-2" color="red" @click="decilneItem(item.Meeting_ID)">
          mdi-tooltip-remove
        </v-icon>
        <v-icon v-if="item.Meeting_TypeID == meetingType" class="mr-2" @click="deleteItem(item.Meeting_ID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <ModalContainer
      :active="modalVisable"
      :teachers="allTeacher"
      :projects="allProject"
      :meetingType="meetingType"
      :cancellable="1"
      @close="hideModal"
    >
      <NewMeeting
        v-if="modalType == 'add'"
        :teachers="allTeacher"
        :projects="allProject"
        :meetingType="meetingType"
        @close="hideModal"
        @submit="submit"
      />
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
        { id: 3, name: "ถูกปฏิเสธ" }
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
      meetingData: null,
      data: {
        Meeting_Name: null,
        Meeting_Detail: null,
        Meeting_TeacherName: null,
        Meeting_DateTime: null
      },
      modalType: null,
      meetingType: "",
      Headers: [
        {
          text: "หัวข้อนัดหมาย",
          align: "start",
          sortable: true,
          value: "Meeting_Name",
          width: 600
        },
        { text: "ประเภท", value: "Meeting_TypeID", sortable: false },
        { text: "เวลา", value: "Meeting_DateTime" },
        { text: "สถานะ", align: "center", value: "Meeting_RequestStatusID" },
        { text: "Action", value: "actions" }
      ]
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
        .filter(item => {
          return !this.filterType || item.Meeting_TypeID == this.filterType;
        })
        .filter(item => {
          return !this.filterStatus || item.Meeting_RequestStatusID == this.filterStatus;
        })
        .filter(item => {
          return item.Meeting_ProjectID == this.user.ProjectID;
        });
    }
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
      this.allProject = await this.Project.GetAll();
      this.meetingType = this.user.UserTypeID;
      this.loading = false;
    },
    async submit(pData) {
      if (this.meetingType == 1) {
        //นักศึกษานัดอาจารย์
        await this.Meeting.New({
          Meeting_Name: pData.Meeting_Name,
          Meeting_ProjectID: this.user.ProjectID,
          Meeting_Detail: pData.Meeting_Detail,
          Meeting_TeacherID: pData.Meeting_TeacherID,
          Meeting_TypeID: this.meetingType,
          Meeting_DateTime: pData.Meeting_DateTime,
          Meeting_CreatedBy: this.user.UserID,
          Meeting_RequestStatusID: "1"
        }).then(() => {
          this.loadData();
        });
      } else {
        // อาจารย์นัดนักศึกษา
        await this.Meeting.New({
          Meeting_Name: pData.Meeting_Name,
          Meeting_ProjectID: pData.Meeting_ProjectID,
          Meeting_Detail: pData.Meeting_Detail,
          Meeting_TeacherID: this.user.UserID,
          Meeting_TypeID: this.meetingType,
          Meeting_DateTime: pData.Meeting_DateTime,
          Meeting_CreatedBy: this.user.UserID,
          Meeting_RequestStatusID: "1"
        }).then(() => {
          this.loadData();
        });
      }
    },
    addModal() {
      this.modalVisable = true;
      this.modalType = "add";
    },
    viewItem(pID) {
      this.meetingData = this.Meeting.findOne(pID);
      this.data.Meeting_Name = this.meetingData.Meeting_Name;
      this.modalVisable = true;
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
        .then(result => {
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
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.Approve(pID).then(() => {
              this.loadData();
            });
          }
        });
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
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.Decline(pID).then(() => {
              this.loadData();
            });
          }
        });
    },
    hideModal() {
      this.modalVisable = false;
      this.modalType = null;
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
