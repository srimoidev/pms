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
    <v-container>
      <ValidationObserver ref="observer">
        <form class="new-topic">
          <ValidationProvider v-slot="{ errors }" name="ชื่อภาษาไทย" rules="required|thaiLang">
            <v-text-field v-model="th_name" :error-messages="errors" label="ชื่อภาษาไทย" outlined dense></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="ชื่อภาษาอังกฤษ" rules="required|engLang">
            <v-text-field v-model="en_name" :error-messages="errors" label="ชื่อภาษาอังกฤษ" outlined dense></v-text-field>
          </ValidationProvider>
          <v-textarea v-model="detail" outlined rows="3" no-resize label="รายละเอียด"></v-textarea>
          <div class="d-flex">
            <ValidationProvider v-slot="{ errors }" name="จำนวน" rules="required">
              <v-text-field v-model.number="number" :error-messages="errors" label="จำนวน" type="number" min="1" outlined dense class="mr-5">
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="ประเภท" rules="select_required">
              <v-select
                v-model="type"
                :items="alltype"
                label="ประเภท"
                item-text="ProjectType_Name"
                item-value="ProjectType_ID"
                :error-messages="errors"
                outlined
                dense
                class="mr-5"
              >
              </v-select>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Section" rules="select_required">
              <v-select
                v-model="section"
                :items="sections"
                label="Section"
                item-text="sec"
                item-value="Section_ID"
                :error-messages="errors"
                outlined
                dense
              >
                <template v-slot:item="sections">
                  <div>
                    {{ `Section : ${sections.item.sec} อาจารย์ : ${sections.item.teacher}` }}
                  </div>
                  <div>
                    {{ `${sections.item.day} ${sections.item.time_period} ` }}
                  </div>
                </template>
              </v-select>
            </ValidationProvider>
          </div>

          <ValidationProvider v-slot="{ errors }" name="อาจารย์ที่ปรึกษา" rules="select_required|advisors:2">
            <v-autocomplete
              :error-messages="errors"
              v-model="selected"
              :items="teacher"
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
              <template v-slot:selection="teacher">
                <v-chip v-bind="teacher.attrs" :input-value="teacher.selected" @click="teacher.select" @click:close="remove(teacher.item)" small>
                  <v-avatar left class="d-flex justify-center" color="blue">
                    <!-- <v-img :src="teacher.item.avatar"></v-img> -->
                    <v-icon>mdi-account</v-icon>
                  </v-avatar>
                  {{ `${teacher.item.User_Firstname} ${teacher.item.User_Lastname}` }}
                </v-chip>
              </template>
              <template v-slot:item="teacher">
                <v-list-item-avatar color="blue" class="d-flex justify-center">
                  <v-icon>mdi-account</v-icon>
                  <!-- <img :src="teacher.item.avatar" /> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title :key="teacher.item.User_ID">{{
                    `${teacher.item.User_Firstname} ${teacher.item.User_Lastname}`
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
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

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
extend("advisors", {
  message: "{_field_} limit exceeded (2)",
  validate: (value, maxCount) => !!(value.length <= maxCount[0])
});
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
    teacher: {
      type: Array,
      default: () => []
    },
    alltype: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      th_name: "",
      en_name: "",
      detail: "",
      number: 1,
      type: null,
      selected: [],
      sections: [{ Section_ID: 1, sec: 1, teacher: "จาร 1 - จาร 2", time_period: "13.00 - 15.00", day: "พุธ" }]
    };
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        this.submitForm();
        this.close();
      }
    },
    submitForm() {
      this.$emit("newProject", {
        Project_NameTH: this.th_name,
        Project_NameEN: this.en_name,
        Project_Detail: this.detail,
        Project_TypeID: this.type,
        Project_MaxMember: this.number,
        Project_SectionID: 1,
        Project_StatusID: 1
      });
    },
    remove(item) {
      const index = this.selected.indexOf(item.name);
      if (index >= 0) this.selected.splice(index, 1);
    },
    close() {
      this.th_name = "";
      this.en_name = "";
      this.detail = "";
      this.type = "";
      this.number = 1;
      this.selected = [];
      this.$refs.observer.reset();
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
.new-topic {
  margin: 10px;
}
</style>
