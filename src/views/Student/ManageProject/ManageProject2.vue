<template>
  <div v-if="loaded" class="overflow-y-auto" style="max-height: 91vh">
    <v-card class="ma-2" tile min-height="88.5vh">
      <v-tabs v-model="tab" color="white" show-arrows background-color="blue">
        <v-tab
          v-for="(item, i) in tabs"
          :key="item.name"
          @click="fetchCE(item.name)"
        >
          <span v-if="update[i]"
            ><v-badge color="pink" dot>{{ item.name }} </v-badge></span
          >
          <span v-else>{{ item.name }}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.name">
          <div class="pa-2 pr-3 ml-2 pb-2">
            <!-- <div class="arrow-pointer">comments</div> -->
            <!-- <v-simple-table>
              <thead>
                <tr>
                  <th>ตำแหน่ง</th>
                  <th>ชื่อ</th>
                  <th>สถานะ</th>
                  <th>คอมเมนต์</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data.comments" :key="item">
                  <td>{{ item.role }}</td>
                  <td>{{ item.name }}</td>
                  <td><span :class="{'success white--text' : item.status,'error--text' : !item.status}">Rejected</span></td>
                  <td>{{ item.comment}}</td>
                </tr>
              </tbody>
            </v-simple-table> -->

            <!-- <v-expansion-panels>
              <v-expansion-panel v-for="item in advisors" :key="item" @click="alert('aaa')">
                <v-expansion-panel-header>
                  <div class="d-flex">
                    <span style="width:100px" class="mr-4">{{
                      item.role
                    }}</span>
                    <span style="width:300px" class="mr-4">{{
                      item.name
                    }}</span>
                    <span style="width:100px" class="success--text mr-4"
                      >approved</span
                    >
                    <span style="width:100px" class="mr-4">comment</span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <h4>Comment</h4>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels> -->
            <v-badge
              :color="!isSeenComment ? 'pink' : ''"
              :content="CECommentCount"
              class="bbt"
              overlap
            >
              <v-btn depressed @click="expandCommentTab" icon
                ><v-avatar color="purple lighten-2" size="48">
                  <v-icon color="white">mdi-comment-processing-outline</v-icon>
                </v-avatar>
              </v-btn>
            </v-badge>

            <div class="d-flex">
              <div style="width:100%; height:100%">
                <item-list
                  v-for="(header, i) in tab.headers"
                  :key="header.title"
                  :header="header"
                  :data="data"
                  @submit="submit"
                >
                  <template v-slot:header>
                    <h4 class="mr-2" style="height:28px">
                      {{ i + 1 + ". " }}{{ header.header }}
                    </h4>
                  </template>
                </item-list>
              </div>
            </div>
          </div>
          <div class="fill-height bbpop">
            <v-expand-x-transition>
              <v-card
                v-show="expand2"
                height="100%"
                width="300"
                class="mx-auto primary lighten-3 fill-height"
                flat
              >
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn icon @click="expand2 = !expand2">X</v-btn>
              </div>
              
                <comment-block
                  v-for="item in comments"
                  :key="item"
                  :comment="item"
                ></comment-block>
              </v-card>
            </v-expand-x-transition>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ItemList from "@/components/ManageProjectItemList";
import CommentBlock from "@/components/TeacherCommentBlock";
import DB from "@/mixins/Database";
import { CE_HEADER } from "@/utils/CEHeader.js";
export default {
  components: {
    ItemList,
    CommentBlock
  },
  data() {
    return {
      comments: ["asda", "12346", "qweqwe"],
      update: [true, false, true, false, true, false],
      expand2: false,
      loaded: false,
      tab: null,
      CECommentCount: 2,
      isSeenComment: false,
      tabs: CE_HEADER(),
      data: [],
      advisors: [
        { name: "a", role: "ที่ปรึกษา" },
        { name: "b", role: "ที่ปรึกษา" },
        { name: "c", role: "ประจำวิชา" }
      ]
    };
  },
  methods: {
    expandCommentTab() {
      this.expand2 = !this.expand2;
      this.CECommentCount = 0;
      this.isSeenComment = true;
    },
    async fetchCE(val) {
      this.data = {};
      // this.data = await DB.fetchCE(val);
      this.data = await DB.ManageProject.fetchCE(val);
      this.loaded = true;
      console.log(this.tabs);
    },
    submit({ val, field }) {
      this.data[field] = val;
      DB.ManageProject.update(this.data);
      // DB.update(this.data);
    }
  },
  mounted() {
    this.fetchCE("CE01");
  }
};
</script>

<style>
.arrow-pointer {
  vertical-align: middle;
  width: 80px;
  height: 38px;
  top: 20px;
  right: 0px;
  background: hotpink;
  position: absolute;
  z-index: 5;
}
.arrow-pointer:after {
  content: "";
  position: absolute;
  left: -25px;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 25px solid hotpink;
  border-top: 19px solid transparent;
  border-bottom: 19px solid transparent;
}
.bbt {
  position: fixed;
  top: 78px;
  right: 26px;
  z-index: 4;
}
.bbpop {
  position: fixed;
  top: 120px;
  right: 20px;
  z-index: 4;
  height: 82.5vh;
}
</style>
