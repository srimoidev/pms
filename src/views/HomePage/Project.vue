<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet class="pa-4">
        <v-avatar class="mb-4" color="primary darken-1" size="64">
          <v-icon color="white">mdi mdi-leaf</v-icon>
        </v-avatar>
        <div>{{ item.ProjectNameEN }} ({{ item.ProjectNameTH }})</div>
        <div>{{ item.Project_Type.ProjectTypeNameEN }} ({{ item.Project_Type.ProjectTypeNameTH }})</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>{{ item.ProjectNameEN }}({{ item.ProjectNameTH }})</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')"><v-icon>mdi mdi-keyboard-backspace</v-icon> Back To HomePage</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-8 px-6 overflow-y-auto" fluid style="max-height: 100vh">
        <!-- Detail -->
        <v-row v-if="selectedItem == 0">
          <v-col cols="12">
            <v-card>
              <v-toolbar color="primary" flat outlined dark dense>ข้อมูล</v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ชื่อโครงงานภาษาไทย: {{ item.ProjectNameTH }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ชื่อโครงงานภาษาอังกฤษ: {{ item.ProjectNameEN }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ประเภทโครงงานภาษาไทย: {{ item.Project_Type.ProjectTypeNameTH }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ประเภทโครงภาษาอังกฤษ: {{ item.Project_Type.ProjectTypeNameEN }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>จำนวนสมาชิก: {{ item.MaxMember }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ปีการศึกษา: {{ item.Project_Section.Year }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>สถานะ: {{ item.Project_Status.ProjectStatusDetail }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>รายละเอียด: {{ item.ProjectDetail }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Member -->
        <v-row v-if="selectedItem == 1">
          <v-col cols="12">
            <v-card>
              <v-toolbar color="primary" flat outlined dark dense>สมาชิก</v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(item, index) in item.Project_Members" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.Fullname }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Advisors -->
        <v-row v-if="selectedItem == 2">
          <v-col cols="12">
            <v-card>
              <v-toolbar color="primary" flat outlined dark dense>อาจารย์ที่ปรึกษา</v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(item, index) in item.Project_Advisors" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.Fullname }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Committees -->
        <!-- <v-row v-if="selectedItem == 3">
          <v-col cols="12">
            <v-card>
              <v-toolbar color="primary" flat outlined dark dense>กรรมการสอบ</v-toolbar>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(item, index) in item.Project_Committees" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.Fullname }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row> -->
        <!-- Download -->
        <v-row v-if="selectedItem == 4">
          <v-col cols="12">
            <v-card>
              <v-toolbar color="primary" flat outlined dark dense>ดาวน์โหลด</v-toolbar>
              <v-card-text> file </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cards: ["Today", "Yesterday"],
      drawer: null,
      item: {},
      selectedItem: 0,
      items: [
        { text: "รายละเอียด", icon: "mdi-chevron-double-right" },
        { text: "สมาชิกกลุ่ม", icon: "mdi-chevron-double-right" },
        { text: "อาจารย์ที่ปรึกษา", icon: "mdi-chevron-double-right" },
        // { text: "กรรมการสอบ", icon: "mdi-chevron-double-right" },
        { text: "ดาวน์โหลด", icon: "mdi-chevron-double-right" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    projectId() {
      return this.$route.query.pid;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    changeState(item) {
      this.tabState = item;
    },
    async loadData() {
      this.item = await this.Public.Project(this.projectId);
    }
  }
};
</script>
