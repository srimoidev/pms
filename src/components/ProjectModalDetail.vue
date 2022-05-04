<template>
  <v-card width="1000">
    <v-card-title>
      รายละเอียดโครงงาน<v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn></v-card-title
    >
    <v-divider> </v-divider>
    <v-container>
      <v-card class="ma-2 px-4 pa-2 elevation-0" outlined>
        <v-row dense v-for="item in title" :key="item.name">
          <v-col cols="3">
            <span v-if="item.name == 'RejectedRemark' && data.Project_Status.ProjectStatusID != 8"></span>
            <span v-else>{{ item.text }}</span>
          </v-col>
          <v-col cols="9">
            <div v-if="item.name == 'Project_Members' || item.name == 'Project_Advisors'">
              <template v-for="i in data[item.name]">
                <div :key="i.UserID">
                  <v-chip label class="mb-2">
                    <v-avatar v-if="i.ProfileImage" left class="d-flex justify-center" color="blue">
                      <v-img :src="i.ProfileImage" max-width="25"></v-img>
                    </v-avatar>
                    <v-avatar v-else left class="d-flex justify-center" color="blue">
                      <v-icon color="white" small>mdi-account</v-icon>
                    </v-avatar>
                    <span class="grey--text text--darken-1">{{ i.Firstname + " " + i.Lastname }}</span>
                  </v-chip>
                </div>
              </template>
            </div>
            <div v-else-if="item.name == 'Project_Section'">
              <div>{{ `Sec : ${data[item.name].Sequence}/${data[item.name].Year}` }}</div>
              <div>{{ `อาจารย์ : ${data[item.name].Section_Instructor.Fullname}` }}</div>
              <div>
                {{
                  `คาบเรียน : ${dayText[data[item.name].DayOfWeek - 1].text} ${data[item.name].StartTime.slice(0, 5)} - ${data[
                    item.name
                  ].EndTime.slice(0, 5)}`
                }}
              </div>
            </div>
            <div v-else-if="item.name == 'Project_Status'">
              <!-- <project-status :status="data.Project_Status.ProjectStatusID"></project-status> -->
              <span>{{ data.Project_Status.ProjectStatus_Name }}</span>
            </div>
            <div v-else-if="item.name == 'RejectedRemark' && data.Project_Status.ProjectStatusID == 8">
              <v-textarea v-model="data[item.name]" rows="3" background-color="amber lighten-5" outlined hide-details readonly></v-textarea>
              <div class="d-flex">
                <v-spacer></v-spacer>
                <span>{{ "- " + data["UpdatedUser"].Fullname }}</span>
              </div>
            </div>
            <span v-else class="grey--text text--darken-1">{{ data[item.name] }}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="confirm" class="elevation-0 mx-2 px-2" outlined>
        <ValidationObserver ref="observer">
          <ValidationProvider v-slot="{ errors }" rules="rdo_required">
            <v-radio-group v-model="comfirmOrReject" row :error-messages="errors">
              <v-radio label="Confirm" value="1"></v-radio>
              <v-radio label="Reject" value="0"></v-radio>
            </v-radio-group>
          </ValidationProvider>
          <!-- <ValidationProvider v-slot="{ errors }" name="Remark" :rules="comfirmOrReject == 0 ? 'required' : ''">
            <v-textarea
              v-if="comfirmOrReject == 0"
              v-model="txtRemark"
              rows="3"
              outlined
              :error-messages="errors"
              label="Remark"
              background-color="amber lighten-5"
            ></v-textarea>
          </ValidationProvider> -->
        </ValidationObserver>
      </v-card>
      <div class="d-flex mr-2 mt-2">
        <!-- <v-checkbox v-if="bypass" v-model="isBypass" class="mt-0 ml-2" hide-details dense label="รับเป็นที่ปรึกษาและอนุมัติโปรเจ็ค"></v-checkbox> -->
        <v-spacer></v-spacer>
        <div v-if="confirm">
          <v-btn class="mr-2" color="primary" @click="advisorSubmit" small>Submit</v-btn>
          <!-- <v-btn class="mr-2" color="error" @click="advisorSubmit(0)" small>Reject</v-btn> -->
        </div>
        <v-btn v-if="join" class="mr-2" color="success" @click="submit" small>Join</v-btn>
        <v-btn color="white elevation-0" small @click="close">Close</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("rdo_required", {
  ...required,
  message: "โปรดเลือก Confirm หรือ Reject"
});
extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    join: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    bypass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: [
        { name: "ProjectNameTH", text: "ชื่อภาษาไทย" },
        { name: "ProjectNameEN", text: "ชื่อภาษาอังกฤษ" },
        { name: "ProjectDetail", text: "รายละเอียด" },
        { name: "Project_Members", text: "สมาชิก" },
        { name: "Project_Advisors", text: "อาจารย์ที่ปรึกษา" },
        { name: "Project_Section", text: "Section" },
        // { name: "Project_Status", text: "สถานะ" },
        { name: "RejectedRemark", text: "เหตุผลที่ปฏิเสธ" }
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
      isBypass: false,
      comfirmOrReject: null,
      txtRemark: null
    };
  },
  beforeMount() {
    if (this.data.Project_Status.ProjectStatusID != 8) {
      this.title.pop(this.title.length);
    }
  },
  methods: {
    submit() {
      this.$emit("submit", this.data.ProjectID);
    },
    async advisorSubmit() {
      if (await this.$refs.observer.validate()) {
        //bypass กรณีเป็นที่ปรึกษารออนุมัติคนสุดท้ายและเป็นที่ปรึกษาด้วย
        if (this.bypass) {
          if (this.comfirmOrReject == 1) {
            this.$emit("submit", this.data.ProjectID, 1, this.txtRemark, this.isBypass); //1 Confirm
          } else {
            //reject ไม่สน bypass
            this.$emit("submit", this.data.ProjectID, 0, this.txtRemark, false); //0 Reject
          }
        } else {
          if (this.comfirmOrReject == 1) {
            this.$emit("submit", this.data.ProjectID, 1, this.txtRemark, false); //1 Confirm
          } else {
            this.$emit("submit", this.data.ProjectID, 0, this.txtRemark, false); //0 Reject
          }
        }
      }
    },
    close() {
      this.comfirmOrReject = null;
      this.txtRemark = null;
      if (this.confirm) {
        this.$refs.observer.reset();
      }
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.align-text-right {
  text-align: right;
  vertical-align: middle;
}
</style>
