<template>
  <v-container class="fill-height">
    <transition name="fade" mode="out-in">
      <v-text-field
        v-if="!isSearch"
        v-model="searchText"
        style="margin: 0 15% 0 15%"
        append-icon="mdi-magnify"
        label="คำค้นหา"
        solo
        autofocus
        @click:append="submitSearch"
        @keypress.enter="submitSearch"
      ></v-text-field>
      <div v-if="isSearch" style="width: inherit; align-self: flex-start">
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="คำค้นหา"
          solo
          autofocus
          @click:append="submitSearch"
          @keypress.enter="submitSearch"
          hide-details
        ></v-text-field>
        <div class="d-flex my-2">
          <span class="text-caption">ผลการค้นหา {{ searchResult.length }} รายการ</span>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="transparent elevation-0" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-sort-variant</v-icon>จัดเรียงตาม</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in sortBy" :key="item.id" dense @click="sort(item)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-row>
          <v-col cols="3">
            <v-select v-model="typeFilter" :items="allType" item-text="ProjectTypeNameTH" item-value="ProjectTypeID" solo dense> </v-select>
          </v-col>
          <v-col cols="9">
            <div class="overflow-y-auto pr-2" style="max-height: calc(100vh - 180px)">
              <v-card v-for="item in filteredItems" :key="item.Project_ID" class="mb-2">
                <div class="d-flex">
                  <v-card-title style="width: 100%">
                    <router-link :to="'/project/' + item.ProjectID" class="text-none"
                      >{{ `${item.ProjectNameTH} (${item.ProjectNameEN})` }}
                    </router-link>
                  </v-card-title>
                  <div class="mt-5 mx-5">
                    <v-chip class="white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
                      {{ item.Project_Type.ProjectTypeNameTH }}
                    </v-chip>
                  </div>
                </div>
                <v-card-subtitle>
                  <div style="text-indent: 2em">{{ item.ProjectDetail }}</div>
                  <v-divider class="my-2"></v-divider>
                  <v-row no-gutters>
                    <v-col cols="8">
                      <span class="grey--text text--darken-3">สมาชิก</span>
                      <div v-for="(item, index) in item.Project_Members" :key="index" class="ml-4">
                        {{ index + 1 + ". " + item.Firstname + " " + item.Lastname }}
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <span class="grey--text text--darken-3">อาจารย์ที่ปรึกษา</span>
                      <div v-for="(item, index) in item.Project_Advisors" :key="index" class="ml-4">
                        {{ index + 1 + ". " + item.Firstname + " " + item.Lastname }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      isSearch: false,
      sortBy: [
        { id: 1, title: "ยอดนิยม" },
        { id: 2, title: "วันที่เพิ่ม (ล่าสุด)" },
        { id: 3, title: "วันที่เพิ่ม (เก่าสุด)" }
      ],
      searchResult: [],
      allType: [],
      a: 1,
      typeFilter: 0,
      statusFilter: 0
    };
  },
  computed: {
    filteredItems() {
      return this.searchResult
        .filter((item) => {
          return !this.typeFilter || item.Project_Type.ProjectTypeID == this.typeFilter;
        })
        .filter((item) => {
          return !this.statusFilter || item.Project_Status.ProjectStatusID == this.statusFilter;
        });
    }
  },
  methods: {
    async submitSearch() {
      this.isSearch = true;
      // this.allType = [{ ProjectType_ID: 1, ProjectType_Name: "ทั้งหมด" }];
      this.allType = await this.Project.AllType();
      this.allType.splice(0, 0, {
        ProjectTypeID: 0,
        ProjectTypeNameTH: "ทั้งหมด"
      });
      // console.log("alltype", await this.Project.AllType());
      this.searchResult = await this.Project.GetAll(this.searchText.trim());
      console.log(this.searchResult);
      console.log(this.allType);
    },
    sort(val) {
      console.log(val);
      switch (val.id) {
        case 1:
          this.searchResult.sort((a, b) => {
            return a.ProjectID - b.ProjectID;
          });
          break;
        case 2:
          this.searchResult.sort((a, b) => {
            return a.ProjectID - b.ProjectID;
          });
          break;
        case 3:
          this.searchResult.sort((a, b) => {
            return b.ProjectID - a.ProjectID;
          });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
/* Hardware */
.type-1 {
  background-color: #69f0ae !important;
}
/* Software */
.type-2 {
  background-color: #ffd54f !important;
}
/* Sofware and Hardware */
.type-3 {
  background-color: #b388ff !important;
}
.v-text-field--outlined >>> fieldset {
  border: 3px solid rgba(236, 239, 241, 0.8);
}
</style>
