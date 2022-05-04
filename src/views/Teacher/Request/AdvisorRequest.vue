<template>
  <v-card class="ma-2 elevation-1" tile style="height:inherit" v-resize="onResize">
    <v-data-table
      v-model="selectedList"
      :headers="headers"
      :items="data"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight"
      item-key="ProjectID"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            คำขออนุมัติเป็นที่ปรึกษาโปรเจ็ค
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-2"></v-text-field>
          <v-spacer></v-spacer>
          <!-- <v-btn class="mr-2" color="success" small @click="approveSelectedList">อนุมัติรายการที่เลือก</v-btn> -->
          <!-- <v-btn color="error" small @click="rejectSelectedList">ไม่อนุมัติรายการที่เลือก</v-btn> -->
        </v-toolbar>
      </template>
      <template v-slot:[`item.ProjectNameTH`]="{ item }">
        <router-link :to="`project?pid=` + item.ProjectID" class="text-none">{{ item.ProjectNameTH }}</router-link>
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class=" white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
          {{ allType[item.Project_Type.ProjectTypeID - 1].ProjectTypeNameTH }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        <span
          >{{ `Sec : ${item.Project_Section.Sequence}/${item.Project_Section.Year}` }}
          <br />
          <span>
            {{ `อาจารย์ : ${item.Project_Section.Section_Instructor.Fullname}` }}
          </span>
          <br />
          <span>
            {{
              `คาบเรียน : ${dayText[item.Project_Section.DayOfWeek - 1].text} ${item.Project_Section.StartTime.slice(
                0,
                5
              )} - ${item.Project_Section.EndTime.slice(0, 5)}`
            }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn small outlined color="primary" @click="showDetail(item)">รายละเอียด</v-btn>
        </div>
      </template>
    </v-data-table>
    <template>
      <modal-container :active="modal" :cancellable="1">
        <project-modal-detail
          @submit="Confirm"
          @close="modal = !modal"
          confirm
          :data="selectedProject"
        ></project-modal-detail>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ModalContainer,
    ProjectModalDetail
  },
  data() {
    return {
      selectedProject: {},
      allType: [],
      modal: false,
      windowHeight: 0,
      searchText: "",
      loading: true,
      headers: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "ProjectNameTH",
          width: 500
        },
        {
          text: "ประเภท",
          value: "Project_Type"
        },
        {
          text: "จำนวนนักศึกษา",
          value: "MaxMember",
          sortable: true
        },
        {
          text: "คาบเรียน",
          value: "Project_Section"
        },
        {
          value: "actions",
          sortable: false
        }
      ],
      dayText: [
        { id: 1, text: "วันอาทิตย์" },
        { id: 2, text: "วันจันทร์" },
        { id: 3, text: "วันอังคาร" },
        { id: 4, text: "วันพุธ" },
        { id: 5, text: "วันพฤหัสบดี" },
        { id: 6, text: "วันศุกร์" },
        { id: 7, text: "วันเสาร์" }
      ],
      data: [],
      selectedList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID"
    })
  },
  beforeMount() {
    this.loadData();
  },
  watch: {
    user() {
      this.loadData(); //จับตอน reload
    }
  },
  methods: {
    async loadData() {
      if (this.user.UserID) {
        this.allType = await this.Project.AllType();
        //โปรเจ็ครอรับเป็นที่ปรึกษา
        this.data = await this.Project.WaitConfirmProject(this.user.UserID, 2);
        // this.data.map(async item => {
        //   await this.Project.Advisor(item.ProjectID).then(res => {
        //     if (res?.length == 1) {
        //       //คนอนุมัติคนสุดท้ายเป็นที่ปรึกษาและเป็นประจำวิชา
        //       item.isAllowBypass = this.user.UserID == res[0].UserID && this.typeID == 3;
        //     }
        //   });
        // });
      }
      this.loading = false;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    async showDetail(project) {
      this.selectedProject = project;
      await Promise.all(
        this.selectedProject.Project_Members.map(async item => {
          item.ProfileImage = await this.User.ProfileImage(item.UserID);
        })
      )
        .then(async () => {
          await Promise.all(
            this.selectedProject.Project_Advisors.map(async item => {
              item.ProfileImage = await this.User.ProfileImage(item.UserID);
            })
          );
        })
        .then(() => {
          this.modal = true;
        });
      // this.modal = true;
    },

    async Confirm(pProjectID, pStatus, pRemark, pIsBypass) {
      //TODO ส่ง UserID กับ array ProjectID ไป
      const advisor = await this.Project.Advisor(pProjectID, this.user.UserID);
      await this.Project.ConfirmOrRejectProject(this.user.UserID, advisor[0].AdvisorID, pStatus, pIsBypass, pRemark).then(() => {
        this.$swal.fire({
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
          icon: "success",
          title: "Success"
        });
        this.loadData();
        this.modal = false;
      });
    }
    // approveSelectedList() {
    //   if (this.selectedList.length > 0) {
    //     this.selectedList.forEach(item => {
    //       this.Confirm(item).then(() => {
    //         this.loadData();
    //       });
    //     });
    //     alert("c" + this.selectedList.length);
    //   } else {
    //     this.$swal.fire({
    //       icon: "error",
    //       text: "คุณไม่ได้เลือกรายการใด ๆ"
    //     });
    //   }
    // },
    // rejectSelectedList() {
    //   if (this.selectedList.length > 0) {
    //     alert("c" + this.selectedList.length);
    //   } else {
    //     this.$swal.fire({
    //       icon: "error",
    //       text: "คุณไม่ได้เลือกรายการใด ๆ"
    //     });
    //   }
    // }
  }
};
</script>

<style></style>
