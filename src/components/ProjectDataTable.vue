<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize">
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            จัดการกลุ่ม
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-10"
          ></v-text-field>
          <v-select
            v-model="typeFilter"
            :items="type"
            item-text="ProjectType_Name"
            item-value="ProjectType_ID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width:1%"
          ></v-select>
          <v-select
            v-model="statusFilter"
            :items="status"
            item-text="ProjectStatus_Name"
            item-value="ProjectStatus_ID"
            hide-details
            outlined
            dense
            label="Status"
            style="width:2%"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="showProposalModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เสนอหัวข้อใหม่
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Project_MaxMember`]="{ item }">
        {{ 1 + " / " + item.Project_MaxMember }}
      </template>
      <template v-slot:[`item.Project_TypeID`]="{ item }">
        <v-chip
          class=" white--text"
          :class="`type-${item.Project_TypeID}`"
          small
        >
          {{ item.Project_TypeID }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_NameTH`]="{ item }">
        {{ `${item.Project_NameTH} (${item.Project_NameEN})` }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
          mdi-magnify
        </v-icon>
      </template>
      <template v-slot:[`item.Project_StatusID`]="{ item }">
        <group-status :status="item.Project_StatusID"></group-status>
      </template>
    </v-data-table>
    <template>
      <modal-container
        :active="proposal_modal"
        :cancellable="1"
        @close="hideModal"
      >
        <new-topic
          @close="hideModal"
          @newProject="add"
          :data="teacher"
          :alltype="type"
        ></new-topic>
      </modal-container>
    </template>
    <template>
      <modal-container
        :active="joinGroup_modal"
        :cancellable="1"
        @close="hideModal"
      >
        <join-group @submit="join" @close="hideModal" :data="selectedGroup">
        </join-group>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import ModalContainer from "@/components/ModalContainer";
import NewTopic from "@/components/NewTopic";
import JoinGroup from "@/components/TopicProposalJoinGroup";
import GroupStatus from "@/components/GroupStatus";

export default {
  components: {
    ModalContainer,
    NewTopic,
    JoinGroup,
    GroupStatus
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    },
    type: {
      type: Array,
      default: () => []
    },
    status: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    teacher: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedGroup: null,
      typeFilter: 0,
      statusFilter: 0,
      searchText: "",
      proposal_modal: false,
      joinGroup_modal: false,
      teacher_list: [],
      windowHeight: 0,
    };
  },
  computed: {
    filteredItems() {
      return this.data
        .filter(item => {
          return !this.typeFilter || item.Project_TypeID == this.typeFilter;
        })
        .filter(item => {
          return (
            !this.statusFilter || item.Project_StatusID == this.statusFilter
          );
        });
    }
  },
  methods: {
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    async add(val) {
      this.$emit("newProject", val);
      // await DB.Project.proposeNewProject(val);
      // this.getGroupData();
    },

    async join(val) {
      this.$emit("joinProject", val);
      // await DB.join(val, JSON.parse(localStorage.getItem("user")).user.STD_ID);
      this.hideModal();
    },
    async getAllTeacher() {
      // this.teacher_list = await DB.User.GetAllTeacher();
    },
    hideModal() {
      this.proposal_modal = false;
      this.joinGroup_modal = false;
    },
    showProposalModal() {
      this.getAllTeacher();
      this.proposal_modal = true;
    },
    showJoinGroupModal(Group) {
      this.selectedGroup = Group;
      this.joinGroup_modal = true;
    }
  },
};
</script>

<style scoped>
/* Hardware */
.type-1 {
  background-color: #69f0ae !important;
}
/* Software */
.type-2 {
  background-color: #ffd54f !important;
}
/* Sofware and Hardware */
.type-3 {
  background-color: #b388ff !important;
}
</style>
