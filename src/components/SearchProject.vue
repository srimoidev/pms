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
        ></v-text-field>
        <v-row no-gutters>
          <v-col cols="3"> </v-col>
          <v-col cols="9">
            <v-card v-for="item in searchResult" :key="item.Project_ID" class="d-flex mb-2">
              <div>
                <v-card-title>{{ item.Project_NameTH }}</v-card-title>
                <v-card-subtitle
                  >zxczczxc sd fsd sd sd fsd fsd fsd fsdf sd sd sd s fsd fsd sd fsd as dasd asd asd asd asd as asdasd asdasd as dasdasd as dasdas
                  dasdasd</v-card-subtitle
                >
              </div>
              <v-spacer></v-spacer>
              <div class="ma-5">
                <v-chip label color="green" class="white--text" small>Hardware</v-chip>
              </div>
            </v-card>
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
      searchResult: []
    };
  },
  methods: {
    async submitSearch() {
      this.isSearch = true;
      this.searchResult = await this.Project.GetAll();
      // alert(this.searchText);
    }
  }
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border: 3px solid rgba(236, 239, 241, 0.8);
}
</style>
