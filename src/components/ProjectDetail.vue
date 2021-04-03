<template>
  <div class="d-flex">
    <v-card class="elevation-1 mr-2" style="width:70%; min-height:89vh" tile>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          {{
            "Manage Group - " + (data.Project_NameTH ? data.Project_NameTH : "")
          }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="error white--text">
          <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
          ออกจากกลุ่ม
        </v-btn>
      </v-toolbar>
    </v-card>
    <div style="width:30%">
      <v-card class="elevation-1 mb-2" tile>
        <v-card-text>{{ "Member" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Members">
            <v-list-item :key="item.Member_Info.User_ID">
              <v-list-item-content>
                <v-list-item-title>{{
                  item.Member_Info.User_Firstname + " " + item.Member_Info.User_Lastname
                }}</v-list-item-title>
                <v-list-item-subtitle>asdasd</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index != data.Members.length - 1"
              class="mx-2"
              :key="item"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card tile class="elevation-1"
        ><v-card-text>{{ "Teacher" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
            <template v-for="(item, index) in data.Advisor">
              <v-list-item :key="item.Advisor_Info.User_ID">
                <v-list-item-content
                  ><v-list-item-title>{{ item.Advisor_Info.User_Firstname + " " + item.Advisor_Info.User_Firstname }}</v-list-item-title
                  ><v-list-item-subtitle
                    >asdasdasd</v-list-item-subtitle
                  ></v-list-item-content
                >
              </v-list-item>
              <v-divider
                v-if="index != ['a', 'b'].length - 1"
                class="mx-2"
                :key="item"
              ></v-divider>
            </template>
          </v-list>
        <!-- <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                data.Teacher_Firstname + " " + data.Teacher_Lastname
              }}</v-list-item-title>
              <v-list-item-subtitle>asdadadsadzxc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      groupHeader: [{ text: "ชื่อ", value: "Student_Name" }],
      projectDesc: [
        { id: 1, title: "ชื่อภาษาไทย", data: "Project_NameTH" },
        { id: 2, title: "ชื่อภาษาอังกฤษ", data: "Project_NameEN", end: true }
      ]
    };
  }
};
</script>

<style></style>
