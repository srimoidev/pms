<template>
  <v-card>
    <v-card-title>
      <v-icon large class="blue--text text--lighten-2 ma-2 mr-5">mdi-file-document-multiple-outline</v-icon>
      <span>เสนอหัวข้อใหม่</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container class="overflow-y-auto px-6" style="max-height:540px">
      <ValidationObserver ref="observer">
        <form class="new-topic">
          <v-row no-gutters>
            <v-col cols="6" class="pr-2">
              <ValidationProvider v-slot="{ errors }" name="ชื่อภาษาไทย" rules="required">
                <v-text-field v-model="th_name" :error-messages="errors" label="ชื่อภาษาไทย" outlined dense></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="6" class="pl-2">
              <ValidationProvider v-slot="{ errors }" name="ชื่อภาษาอังกฤษ" rules="required">
                <v-text-field v-model="en_name" :error-messages="errors" label="ชื่อภาษาอังกฤษ" outlined dense></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-textarea v-model="detail" outlined rows="4" no-resize label="รายละเอียด" counter="255" maxlength="255"></v-textarea>
          <v-row no-gutters>
            <v-col cols="4">
              <ValidationProvider v-slot="{ errors }" name="ประเภท" rules="select_required">
                <v-select
                  v-model="type"
                  :items="alltype"
                  label="ประเภท"
                  item-text="ProjectTypeNameTH"
                  item-value="ProjectTypeID"
                  :error-messages="errors"
                  outlined
                  dense
                  class="mr-5"
                >
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col cols="8">
              <ValidationProvider v-slot="{ errors }" name="Section" rules="select_required">
                <v-select v-model="selectedSection" :items="sections" label="Section" item-value="SectionID" :error-messages="errors" outlined dense>
                  <template v-slot:selection="sections">
                    <div>
                      {{
                        `Sec : ${sections.item.Sequence}/${sections.item.Year} อาจารย์ : ${sections.item.Section_Instructor.Fullname} คาบเรียน : ${
                          dayText[sections.item.DayOfWeek - 1].text
                        } ${sections.item.StartTime.slice(0, 5)} - ${sections.item.EndTime.slice(0, 5)}`
                      }}
                    </div>
                  </template>
                  <template v-slot:item="sections">
                    <div>
                      {{
                        `Sec : ${sections.item.Sequence}/${sections.item.Year} อาจารย์ : ${sections.item.Section_Instructor.Fullname} คาบเรียน : ${
                          dayText[sections.item.DayOfWeek - 1].text
                        } ${sections.item.StartTime.slice(0, 5)} - ${sections.item.EndTime.slice(0, 5)}`
                      }}
                    </div>
                  </template>
                </v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <ValidationProvider v-slot="{ errors }" name="สมาชิก" :rules="`${teacher ? '' : 'select_required'}`">
                <v-autocomplete
                  :error-messages="errors"
                  v-model="members"
                  :items="students"
                  chips
                  color="blue-grey lighten-2"
                  label="สมาชิก"
                  item-text="Fullname"
                  item-value="UserID"
                  multiple
                  hide-no-data
                  outlined
                  dense
                >
                  <template v-slot:selection="students">
                    <v-chip
                      v-bind="students.attrs"
                      :input-value="students.selected"
                      @click="students.select"
                      @click:close="remove(students.item)"
                      class="mt-2"
                    >
                      <v-avatar v-if="students.item.ProfileImage" left class="d-flex justify-center grey lighten-3">
                        <v-img :src="students.item.ProfileImage"></v-img>
                      </v-avatar>
                      <v-avatar v-else left class="d-flex justify-center grey lighten-3" color="blue">
                        <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
                      </v-avatar>
                      {{ students.item.Fullname }}
                    </v-chip>
                  </template>
                  <template v-slot:item="students">
                    <v-list-item-avatar v-if="students.item.ProfileImage" class="d-flex justify-center">
                      <v-img :src="students.item.ProfileImage"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else class="d-flex justify-center grey lighten-2">
                      <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title :key="students.item.UserID">{{ students.item.Fullname }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12">
              <ValidationProvider v-slot="{ errors }" name="อาจารย์ที่ปรึกษา" rules="select_required">
                <v-autocomplete
                  :error-messages="errors"
                  v-model="advisors"
                  :items="teachers"
                  chips
                  color="blue-grey lighten-2"
                  label="อาจารย์ที่ปรึกษา"
                  item-text="Fullname"
                  item-value="UserID"
                  multiple
                  hide-no-data
                  clearable
                  outlined
                  dense
                >
                  <template v-slot:selection="teacher">
                    <v-chip
                      v-bind="teacher.attrs"
                      :input-value="teacher.selected"
                      @click="teacher.select"
                      @click:close="remove(teacher.item)"
                      class="mt-2"
                    >
                      <v-avatar v-if="teacher.item.ProfileImage" left class="d-flex justify-center">
                        <v-img :src="teacher.item.ProfileImage"></v-img>
                      </v-avatar>
                      <v-avatar v-else left class="d-flex justify-center grey lighten-3">
                        <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
                      </v-avatar>
                      {{ teacher.item.Fullname }}
                    </v-chip>
                  </template>
                  <template v-slot:item="teacher">
                    <v-list-item-avatar v-if="teacher.item.ProfileImage" class="d-flex justify-center">
                      <v-img :src="teacher.item.ProfileImage"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else class="d-flex justify-center grey lighten-2">
                      <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title :key="teacher.item.UserID">{{ teacher.item.Fullname }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
      <div class="d-flex justify-end">
        <v-btn class="mb-2" color="success" @click="submit">Create</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});

extend("select_required", {
  ...required,
  message: "โปรดเลือก {_field_}"
});
extend("file_required", {
  ...required,
  message: "โปรดแนบเอกสาร {_field_}"
});

extend("max", {
  ...max,
  message: "{_field_} จำกัด {length} ตัวอักษร"
});
// extend("memberValidation",{
//   message: "{_field_} exceeded member count",
//   validate: function()
// })
// extend("maxSelected", {
//   message: "{_field_}เกินจำนวนที่กำหนด",
//   validate: (value, maxCount) => !!(value.length <= maxCount[0])
// });
extend("thaiLang", {
  message: "{_field_} must be Thai language ",
  validate: value => /^[ก-๏\s\d\\.]+$/.test(value)
});
extend("engLang", {
  message: "{_field_} must be English language ",
  validate: value => /^[a-zA-Z\s\d\\.]+$/.test(value)
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    teachers: {
      type: Array,
      default: () => []
    },
    students: {
      type: Array,
      default: () => []
    },
    sections: {
      type: Array,
      default: () => []
    },
    createUser: {
      type: Object,
      default: () => {}
    },
    alltype: {
      type: Array,
      default: () => []
    },
    teacher: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      th_name: "",
      en_name: "",
      selectedSection: null,
      detail: "",
      number: 1,
      type: null,
      advisors: [],
      members: [],
      fileImport: null,
      dayText: [
        { id: 1, text: "วันอาทิตย์" },
        { id: 2, text: "วันจันทร์" },
        { id: 3, text: "วันอังคาร" },
        { id: 4, text: "วันพุธ" },
        { id: 5, text: "วันพฤหัสบดี" },
        { id: 6, text: "วันศุกร์" },
        { id: 7, text: "วันเสาร์" }
      ]
    };
  },
  computed: {
    // memberRules() {
    //   //ถ้าเป็นอาจารย์ไม่จำเป็นต้องเพิ่มนักศึกษา แต่ถ้าเพิ่มต้องไม่เกินที่กำหนด
    //   return !this.teacher ? "select_required|maxSelected:" + this.number : "maxSelected:" + this.number;
    // }
  },
  beforeMount() {
    if (this.teacher) {
      this.advisors.push(this.createUser.UserID);
    } else {
      this.members.push(this.createUser.UserID);
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
          ProjectNameTH: this.th_name,
          ProjectNameEN: this.en_name,
          ProjectDetail: this.detail,
          ProjectTypeID: this.type,
          MaxMember: this.number,
          SectionID: this.selectedSection
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
      this.en_name = "";
      this.detail = "";
      this.type = "";
      this.number = 1;
      this.$refs.observer.reset();
      this.advisors = [];
      this.members = [];
      if (this.teacher) {
        this.advisors.push(this.createUser.UserID);
      } else {
        this.members.push(this.createUser.UserID);
      }
      this.$emit("close");
    }
  }
};
</script>

<style></style>
