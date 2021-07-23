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
            <v-text-field v-model="Title" :error-messages="errors" label="เรื่องนัดหมาย" outlined dense></v-text-field>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }" name="รายละเอียด">
            <v-textarea v-model="Detail" outlined rows="3" :error-messages="errors" no-resize label="รายละเอียด"></v-textarea>
          </ValidationProvider>
          <ValidationProvider rules="required_select" v-slot="{ errors }" name="อาจารย์ หรือ กลุ่มโครงงาน">
            <v-select
              v-if="meetingType == 1"
              :items="teachers"
              v-model="TeacherID"
              label="อาจารย์"
              :error-messages="errors"
              item-value="UserID"
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
              v-model="ProjectID"
              label="กลุ่มโครงงาน"
              :error-messages="errors"
              item-value="ProjectID"
              item-text="ProjectNameTH"
              bottom
              outlined
              dense
              required
            >
            </v-select>
          </ValidationProvider>
          <ValidationProvider rules="required_select" v-slot="{ errors }" name="เวลานัดหมาย">
            <v-text-field v-model="OnDate" type="datetime-local" :error-messages="errors" label="เวลานัดหมาย" outlined dense></v-text-field>
          </ValidationProvider>
        </form>
      </ValidationObserver>
      ProjectID: {{ ProjectID }}
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
      type: Number,
      default: null
    }
  },
  data() {
    return {
      Title: null,
      Detail: null,
      TeacherID: null,
      ProjectID: null,
      OnDate: null
    };
  },
  computed: {},
  methods: {
    selectText(item) {
      return item.Firstname + " " + item.Lastname;
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        this.submitForm();
        this.close();
      }
    },
    submitForm() {
      this.$emit("submit", {
        Title: this.Title,
        Detail: this.Detail,
        TeacherID: this.TeacherID,
        ProjectID: this.ProjectID,
        OnDate: this.OnDate
      });
    },
    close() {
      this.Title = null;
      this.Detail = null;
      this.TeacherID = null;
      this.ProjectID = null;
      this.OnDate = null;
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
