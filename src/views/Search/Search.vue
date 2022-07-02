<template>
  <v-container style="max-width: 1080px">
    <v-row>
      <v-col>
        <v-select
          v-model="typeSelected"
          :items="typeLists"
          item-text="ProjectTypeNameTH"
          item-value="ProjectTypeID"
          label="ประเภทโครงงาน"
          clearable
          clear-icon="mdi-close-circle"
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select v-model="yearSelected" :items="yearList" label="ปีการศึกษา" clearable clear-icon="mdi-close-circle"> </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="teacherSelected"
          :items="teacherLists"
          item-text="Fullname"
          item-value="UserID"
          label="อาจารย์ที่ปรึกษา"
          clearable
          clear-icon="mdi-close-circle"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="searchMsg"
          append-outer-icon="mdi-magnify"
          clear-icon="mdi-close-circle"
          clearable
          label="คำค้นหา"
          type="text"
          @click:append-outer="changeURL"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="overflow-y-auto" style="max-height: calc(100vh - 290px)">
          <v-list>
            <v-subheader>ผลการค้นหา</v-subheader>
            <template v-for="(item, index) in searchResult">
              <v-divider :key="index"></v-divider>
              <v-list-item :key="index">
                <v-list-item-icon class="d-block text-center" style="width: 120px">
                  <v-chip class="d-block mb-2 text-center" label color="#b99f4a" text-color="white" small>
                    <span class="text-truncate"> [{{ item.Project_Section.Term }}/{{ item.Project_Section.Year }}] </span>
                  </v-chip>
                  <v-chip class="d-block white--text text-center" style="width: 120px" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
                    <span class="text-truncate"> {{ item.Project_Type.ProjectTypeNameTH }} </span>
                  </v-chip>
                </v-list-item-icon>
                <v-list-item-content>
                  <router-link :to="{ path: '/project', query: { pid: item.ProjectID } }" class="text-none">
                    <v-list-item-title>
                      {{ item.ProjectNameTH }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.ProjectNameEN }}
                    </v-list-item-subtitle>
                  </router-link>
                  <v-row>
                    <v-col>
                      <v-list-item-title>สมาชิก</v-list-item-title>
                      <template v-for="(memberItem, index) in item.Project_Members">
                        <v-list-item-subtitle :key="index">
                          {{ memberItem.StudentID }} {{ memberItem.Prefix }} {{ memberItem.Firstname }} {{ memberItem.Lastname }}
                        </v-list-item-subtitle>
                      </template>
                    </v-col>
                    <v-col>
                      <v-list-item-title>อาจารย์ที่ปรึกษา</v-list-item-title>
                      <template v-for="(memberItem, index) in item.Project_Advisors">
                        <v-list-item-subtitle :key="index">
                          {{ memberItem.Prefix }} {{ memberItem.Firstname }} {{ memberItem.Lastname }}
                        </v-list-item-subtitle>
                      </template>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {
      typeLists: [],
      teacherLists: [],
      typeSelected: "",
      teacherSelected: "",
      yearSelected: "",
      searchMsg: "",
      searchParams: "",
      searchResult: []
    };
  },
  computed: {
    yearList() {
      var startYear = 2560;
      var maxYear = new Date().toLocaleDateString(`th-TH`, { year: `numeric` }).substring(5, 10);
      return lodash.range(startYear, parseInt(maxYear) + 5).map((n) => String(n));
    }
  },
  beforeMount() {
    this.initial();
  },
  methods: {
    async initial() {
      this.typeLists = await this.Public.AllType();
      this.teacherLists = await this.Public.teacherLists();
      this.typeSelected = parseInt(this.$route.query.type);
      this.teacherSelected = parseInt(this.$route.query.teacher);
      this.yearSelected = this.$route.query.year;
      this.searchMsg = this.$route.query.q;
      this.changeURL();
    },
    changeURL() {
      const url = new URL(window.location);
      url.searchParams.set("q", !this.searchMsg ? "" : this.searchMsg);
      url.searchParams.set("type", !this.typeSelected ? "" : this.typeSelected);
      url.searchParams.set("teacher", !this.teacherSelected ? "" : this.teacherSelected);
      url.searchParams.set("year", !this.yearSelected ? "" : this.yearSelected);
      window.history.pushState({}, "", url);
      this.search();
    },
    async search() {
      this.searchResult = await this.Public.GetAll(this.searchMsg ? this.searchMsg.trim() : "");
      if (this.typeSelected) {
        this.searchResult = this.searchResult.filter((item) => {
          return item.Project_Type.ProjectTypeID == this.typeSelected;
        });
      }
      if (this.yearSelected) {
        this.searchResult = this.searchResult.filter((item) => {
          return item.Project_Section.Year == this.yearSelected;
        });
      }
      if (this.teacherSelected) {
        this.searchResult = this.searchResult.filter((item) => {
          return item.Project_Advisors.some((paItem) => {
            return paItem.UserID == this.teacherSelected;
          });
        });
      }
      console.log(this.searchResult);
    }
  }
};
</script>

<style scope>
.chip-overflow {
  max-width: 150px;
  padding: 2px 5px;
  display: block;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>