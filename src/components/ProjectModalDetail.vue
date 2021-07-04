<template>
  <v-card width="600">
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
            <span>{{ item.text }}</span>
          </v-col>
          <v-col cols="9">
            <div v-if="item.name == 'Project_Members' || item.name == 'Project_Advisors'">
              <template v-for="i in data[item.name]">
                <div :key="i.UserID">
                  <v-chip label class="mb-2">
                    <v-avatar left class="d-flex justify-center" color="blue">
                      <v-icon color="white" small>mdi-account</v-icon>
                    </v-avatar>
                    <span class="grey--text text--darken-1">{{ i.User_Firstname + " " + i.User_Lastname }}</span>
                  </v-chip>
                </div>
              </template>
            </div>
            <div v-else-if="item.name == 'Project_Section'">
              {{ data[item.name].Section_Name }}
            </div>
            <span v-else class="grey--text text--darken-1">{{ data[item.name] }}</span>
          </v-col>
        </v-row>
      </v-card>
      <div class="d-flex mr-2 justify-end">
        <div v-if="confirm">
          <v-btn class="mr-2" color="primary" @click="submit(1)" small>Confirm</v-btn>
          <v-btn class="mr-2" color="error" @click="submit(2)" small>Reject</v-btn>
        </div>
        <v-btn v-if="join" class="mr-2" color="success" @click="submit" small>Join</v-btn>
        <v-btn color="white elevation-0" small @click="close">Close</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
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
    }
  },
  data() {
    return {
      title: [
        { name: "Project_NameTH", text: "ชื่อภาษาไทย" },
        { name: "Project_NameEN", text: "ชื่อภาษาอังกฤษ" },
        { name: "Project_Detail", text: "รายละเอียด" },
        { name: "Project_Members", text: "สมาชิก" },
        { name: "Project_Advisors", text: "อาจารย์ที่ปรึกษา" },
        { name: "Project_Section", text: "คาบเรียน" }
      ]
    };
  },
  methods: {
    submit(val) {
      if (val == 1) this.$emit("submit", 1, this.data.Project_ID);
      else this.$emit("submit", 2, this.data.Project_ID);
    },
    close() {
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
