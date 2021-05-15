<template>
  <v-container class="fill-height">
    <transition name="fade" mode="out-in">
      <v-text-field
        v-if="!isSearch"
        v-model="searchText"
        style="margin:0 15% 0 15%"
        append-icon="mdi-magnify"
        label="คำค้นหา"
        solo
        autofocus
        @click:append="submitSearch"
        @keypress.enter="submitSearch"
      ></v-text-field>
      <div v-if="isSearch" style="width:inherit;align-self: flex-start;">
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
        <v-row no-gutters>
          <v-col cols="3"></v-col>
          <v-col cols="9">
            <div class="overflow-y-auto pr-2" style="max-height: calc(100vh - 180px);">
              <v-card v-for="item in searchResult" :key="item.Project_ID" class="d-flex mb-2">
                <div>
                  <v-card-title>{{ item.Project_NameTH }}</v-card-title>
                  <v-card-subtitle>
                    zxczczxc sd fsd sd sd fsd fsd fsd fsdf sd sd sd s fsd fsd sd fsd as dasd asd asd asd asd as asdasd asdasd as dasdasd as dasdas
                    dasdasd
                  </v-card-subtitle>
                </div>
                <!-- <v-spacer></v-spacer> -->
                <div class="ma-5">
                  <v-chip class=" white--text" :class="`type-${item.Project_TypeID}`" small label>
                    {{ allType[item.Project_TypeID - 1].ProjectType_Name }}
                  </v-chip>
                  <!-- <v-chip label color="green" class="white--text" small>Hardware</v-chip> -->
                </div>
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
      allType: []
    };
  },
  methods: {
    async submitSearch() {
      this.isSearch = true;
      this.allType = await this.Project.AllType();
      this.searchResult = await this.Project.GetAll();
      // alert(this.searchText);
    },
    sort(val) {
      console.log(val);
      switch (val.id) {
        case 1:
          this.searchResult.sort((a, b) => {
            return a.Project_ID - b.Project_ID;
          });
          break;
        case 2:
          this.searchResult.sort((a, b) => {
            return a.Project_ID - b.Project_ID;
          });
          break;
        case 3:
          this.searchResult.sort((a, b) => {
            return b.Project_ID - a.Project_ID;
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
