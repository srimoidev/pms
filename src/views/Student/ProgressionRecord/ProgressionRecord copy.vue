<template>
  
  <div class="overflow-y-auto ma-2" style="max-height: 91vh">
    <v-toolbar height="56px" flat>
      <v-toolbar-title
        v-t="{ path: 'DASHBOARD.NAVIGATION_DRAWER.OVERVIEW' }"
      ></v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
    </v-toolbar>
    <v-container>
      <v-timeline dense>
        <v-timeline-item v-if="newItem" fill-dot small :color="cardColor">
          <v-card>
            <v-container>
              <v-textarea
                label="งานที่ทำ"
                dense
                clearable
                auto-grow
                rows="3"
                clear-icon="mdi-close-circle"
                outlined
              ></v-textarea>
              <v-textarea
                label="วิธีแก้"
                dense
                clearable
                auto-grow
                rows="3"
                clear-icon="mdi-close-circle"
                outlined
              ></v-textarea>
              <v-btn right>ยืนยัน</v-btn>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          v-for="item in data"
          :key="item.id"
          color="purple lighten-2"
          fill-dot
          small
        >
          <template v-slot:opposite>
            <span class="blue--text">
              {{ item.date }}
            </span>
          </template>
          <timeline-card :data="item"></timeline-card>
        </v-timeline-item>
      </v-timeline>
      <!-- <v-btn fab bottom right absolute color="blue" class="float-btn" @click="newItem = !newItem"
        ><v-icon color="white">mdi-plus</v-icon></v-btn
      > -->
      <v-speed-dial
        v-model="fab"
        absolute
        right
        bottom
        direction="left"
        transition="slide-x-reverse-transition"
        open-on-hover
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="success"
              @click="createCard"
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <span>New Item</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="indigo"
              v-bind="attrs"
              v-on="on"
              @click="currentTime"
            >
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </template>
          <span>Scroll Down</span>
        </v-tooltip>
      </v-speed-dial>
    </v-container>
  </div>
</template>

<script>
import TimelineCard from "@/components/TimelineCard";
export default {
  components: {
    TimelineCard,
  },
  data() {
    return {
      newItem: false,
      cardColor: null,
      fab: false,
      data: [
        {
          id: 1,
          date: "12-5-2563",
          job_desc: "ต่อ api",
          job_solution: "ติด CORS"
        },
        {
          id: 2,
          date: "5-8-2563",
          job_desc: "aaaa",
          job_solution: "bbb"
        },
        {
          id: 3,
          date: "5-8-2563",
          job_desc: "aaaa",
          job_solution: "bbb"
        },
        {
          id: 4,
          date: "5-8-2563",
          job_desc: "aaaa",
          job_solution: "bbb"
        }
      ]
    };
  },
  methods: {
    currentTime() {
      console.log(new Date().toTimeString());
    },
    createCard() {
      this.randomColor();
      this.newItem = !this.newItem;
    },
    randomColor() {
      var colorList = ["red", "blue"];
      this.cardColor = colorList[Math.floor(Math.random() * colorList.length)];
    }
  }
};
</script>

<style>
.float-btn {
  bottom: 20px !important;
}
</style>
