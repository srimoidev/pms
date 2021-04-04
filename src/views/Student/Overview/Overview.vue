<template>
  <div>
    <!-- <v-toolbar height="56px" flat>
        <v-toolbar-title
          v-t="{ path: 'DASHBOARD.NAVIGATION_DRAWER.OVERVIEW' }"
        ></v-toolbar-title>
        <v-divider class="mx-4" vertical inset></v-divider>
        <v-spacer></v-spacer>
        <v-btn icon small>
          <v-icon @click="showModal">{{ "mdi-cog-outline" }}</v-icon>
        </v-btn>
      </v-toolbar> -->
    <div class="d-flex">
      <div style="width:75%">
        <div class="d-flex" style="width:100%">
          <v-card class="ma-2 main-graph" width="70%">
            <burndown-chart class="mr-5"></burndown-chart>
          </v-card>
          <div class="mt-2 mr-2 mb-2" style="width:30%">
            <v-card class="mb-2">
              <v-card-title>สมาชิก</v-card-title>
              <v-list>
                <template v-for="item in members">
                  <v-list-item :key="item.id">
                    <v-list-item-avatar
                      class="justify-center"
                      :style="{ background: getColor() }"
                    >
                      <span>PK</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <v-card class="mb-2">
              <v-card-title>อาจารย์ที่ปรึกษา</v-card-title>
              <v-list>
                <template v-for="item in members">
                  <v-list-item :key="item.id">
                    <v-list-item-avatar
                      class="justify-center"
                      :style="{ background: getColor() }"
                    >
                      <span>PK</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <v-card class="mb-2">
              <v-card-title>อาจารย์ประจำวิชา</v-card-title>
              <v-list>
                <template v-for="item in instructors">
                  <v-list-item :key="item.id">
                    <v-list-item-avatar
                      class="justify-center"
                      :style="{ background: getColor() }"
                    >
                      <span>PK</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <!-- <v-card style="height:20%">11111</v-card> -->
          </div>
        </div>
        <!-- <v-stepper class="ma-2" value="2">
            <v-stepper-header>
              <v-stepper-step step="1" complete color="success">
                สร้างกลุ่ม
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2">
                อาจารย์รับเป็นที่ปรึกษา
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                ส่ง CE
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">
                ขอสอบ
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="5">
                ทำรูปเล่ม
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="6">
                ทำรูปเล่ม
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper> -->
        <v-card class="d-flex pa-2 px-5 mx-2">
          <div class="mx-5 text-center" style="width:25%">
            <div class="yellow--text text--accent-3" style="font-size:24px">
              {{ new Date().toLocaleDateString("th-TH") }}
            </div>
            <div>สร้างกลุ่มเมื่อ</div>
          </div>
          <div class="mx-5 text-center" style="width:25%">
            <div class="cyan--text text--accent-3" style="font-size:24px">
              {{ "5 วัน" }}
            </div>
            <div>เข้าร่วมแล้ว</div>
          </div>
          <div class="mx-5 text-center" style="width:25%">
            <div class="amber--text text--darken-3" style="font-size:24px">
              {{ "20%" }}
            </div>
            <div>ความคืบหน้า</div>
          </div>
          <div class="mx-5 text-center" style="width:25%">
            <div class="green--text text--accent-2" style="font-size:24px">
              {{ new Date().toLocaleDateString("th-TH") }}
            </div>
            <div>วันที่อัพเดตล่าสุด</div>
          </div>
        </v-card>
      </div>

      <div class="d-flex" style="width:25%">
        <overview-activities
          class="act"
          :data="activities"
        ></overview-activities>
      </div>
    </div>
  </div>
</template>

<script>
import BurndownChart from "@/components/BurndownChart";
import OverviewActivities from "@/components/OverviewActivities";
export default {
  components: {
    BurndownChart,
    OverviewActivities
  },
  data() {
    return {
      a: false,
      members: [
        { id: 1, name: "asdasd" },
        { id: 2, name: "zxczxczxc" }
      ],
      instructors: [{ id: 1, name: "asdasd" }],
      activities: [
        {
          id: 1,
          updateBy: { name: "peter" },
          updateTime: new Date(),
          act: { actid: 1, type: 1 }
        },
        {
          id: 2,
          updateBy: { name: "peter" },
          updateTime: new Date(),
          act: { actid: 2, type: 2 }
        },
        {
          id: 3,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-04-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 4,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-04-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 5,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-08-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 6,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-05-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 7,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-05-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 8,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-05-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        },
        {
          id: 9,
          updateBy: { name: "peter" },
          updateTime: new Date("2011-05-20T09:30:51.01"),
          act: { actid: 1, type: 2 }
        }
      ]
    };
  },
  methods: {
    getColor() {
      return `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
    }
  }
};
</script>

<style>
.main-graph {
  width: 100%;
  height: fit-content;
}
.act {
  height: calc(100vh - 64px - 16px - 64px);
}
</style>
