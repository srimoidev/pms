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
      <ValidationObserver ref="observer">
        <form>
          <ValidationProvider rules="required" v-slot="{ errors }" name="เรื่องนัดหมาย">
            <v-text-field v-model="meetingName" :error-messages="errors" label="เรื่องนัดหมาย" outlined dense></v-text-field>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }" name="รายละเอียด">
            <v-textarea v-model="meetingDetail" outlined rows="3" :error-messages="errors" no-resize label="รายละเอียด"></v-textarea>
          </ValidationProvider>
          <ValidationProvider rules="required_select" v-slot="{ errors }" name="อาจารย์ หรือ กลุ่มโครงงาน">
            <v-select
              v-if="meetingType == 1"
              :items="teachers"
              v-model="meetingTeacherID"
              label="อาจารย์"
              :error-messages="errors"
              item-value="User_ID"
              :item-text="selectText"
              bottom
              outlined
              dense
              required
            >
            </v-select>
            <v-select
              v-else
              :items="projects"
              v-model="meetingProjectID"
              label="กลุ่มโครงงาน"
              :error-messages="errors"
              item-value="Project_ID"
              item-text="Project_NameTH"
              bottom
              outlined
              dense
              required
            >
            </v-select>
          </ValidationProvider>
          <ValidationProvider rules="required_select" v-slot="{ errors }" name="เวลานัดหมาย">
            <v-text-field v-model="meetingDateTime" type="datetime-local" :error-messages="errors" label="เวลานัดหมาย" outlined dense></v-text-field>
          </ValidationProvider>
        </form>
      </ValidationObserver>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" @click="submit">Create</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});

extend("required_select", {
  ...required,
  message: "โปรดเลือก {_field_}"
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    teachers: {
      type: Array,
      default: () => []
    },
    projects: {
      type: Array,
      default: () => []
    },
    meetingType: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      meetingName: null,
      meetingDetail: null,
      meetingTeacherID: null,
      meetingProjectID: null,
      meetingDateTime: null
    };
  },
  computed: {},
  methods: {
    selectText(item) {
      return item.User_Firstname + " " + item.User_Lastname;
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        this.submitForm();
        this.close();
      }
    },
    submitForm() {
      this.$emit("submit", {
        Meeting_Name: this.meetingName,
        Meeting_Detail: this.meetingDetail,
        Meeting_TeacherID: this.meetingTeacherID,
        Meeting_ProjectID: this.meetingProjectID,
        Meeting_DateTime: this.meetingDateTime
      });
    },
    close() {
      this.meetingName = null;
      this.meetingDetail = null;
      this.meetingTeacherID = null;
      this.meetingProjectID = null;
      this.meetingDateTime = null;
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
