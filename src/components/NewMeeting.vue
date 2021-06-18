<template>
  <v-card>
    <v-card-title>
      <v-icon large class="blue--text text--lighten-2 ma-2 mr-5">mdi-file-document-multiple-outline</v-icon>
      <span>สร้างนัดหมายใหม่</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container>
      <form>
        <v-text-field v-model="meetingName" :error-messages="errors" label="เรื่องนัดหมาย" outlined dense></v-text-field>
        <v-textarea v-model="meetingDetail" outlined rows="3" no-resize label="รายละเอียด"></v-textarea>
        <v-autocomplete
          :error-messages="errors"
          v-model="advisors"
          :items="teachers"
          chips
          color="blue-grey lighten-2"
          label="อาจารย์ที่ปรึกษา"
          item-text="User_Firstname"
          item-value="User_ID"
          multiple
          hide-no-data
          clearable
          outlined
          dense
        >
          <template v-slot:item="teacher">
            <v-list-item-avatar color="blue" class="d-flex justify-center">
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title :key="teacher.item.User_ID">{{ `${teacher.item.User_Firstname} ${teacher.item.User_Lastname}` }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
        <v-text-field v-model="start" type="datetime-local" label="เวลานัดหมาย"></v-text-field>
      </form>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" @click="submit">Create</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    teachers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      meetingName: "test",
      meetingDetail: "test",
      meetingTeacher: [],
      meetingDateTime: ""
    };
  },
  computed: {
    memberRules() {
      return !this.teacher ? "select_required|maxSelected:" + this.number : "";
    }
  },
  beforeMount() {
    if (this.teacher) {
      this.advisors.push(this.createUser.User_ID);
    } else {
      this.members.push(this.createUser.User_ID);
    }
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        this.submitForm();
        this.close();
      }
    },
    submitForm() {
      this.$emit(
        "newProject",
        {
          Project_NameTH: this.th_name,
          Project_NameEN: this.en_name,
          Project_Detail: this.detail,
          Project_TypeID: this.type,
          Project_MaxMember: this.number,
          Project_SectionID: 1
        },
        this.advisors,
        this.members
      );
    },
    remove(item) {
      const index = this.advisors.indexOf(item.name);
      if (index >= 0) this.advisors.splice(index, 1);
    },
    disableItem(item) {
      if (item.disabled === true) {
        return true;
      }
      return false;
    },
    close() {
      this.th_name = "";
      this.$emit("close");
    }
  }
};
</script>

<style>
.icons {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>
