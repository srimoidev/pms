<template>
  <!-- <div class="container">
    <div class="search-box">
      <span class="text-lg-h6" v-t="{ path: 'APP.FULL_NAME' }"></span>
      <v-text-field
        class="pt-5"
        label="กรอกคำค้นหา..."
        append-icon="mdi-send"
        @click:append="submit"
        @keydown.enter="submit"
        outlined
        dense
      ></v-text-field>
    </div>
  </div> -->
  <v-container style="height:100%">
    <div class="text-center" style="font-size:32px">
      <span>มหาวิทยาลัยเทคโนโลยีราชมงคล ล้านนา</span>
    </div>

    <v-text-field
      class="mb-8 mt-8"
      style="margin:0 15%"
      label="ค้นหาโปรเจ็ค"
      append-icon="mdi-send"
      outlined
      dense
      hide-details
    ></v-text-field>
    <v-row justify="center" style="height:calc(100vh - 330px)">
      <v-col cols="5">
        <v-card height="100%">
          <v-card-title>การเข้าชมมากที่สุด</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card height="100%">
          <v-card-title>ข่าวสาร</v-card-title>
          <v-list class="mx-6 overflow-y-auto" max-height="calc(100vh - 480px)">
            <template v-for="(item, index) in news">
              <div :key="item.id">
                <v-list-item link three-line>
                  <v-list-item-icon>
                    <v-img
                      src="../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg"
                      height="90"
                      width="160"
                      :aspect-ratio="16 / 9"
                    ></v-img>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.detail
                    }}</v-list-item-subtitle>
                    <v-spacer></v-spacer>
                    <v-list-item-subtitle>{{
                      new Date().toLocaleDateString("th-TH")
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < news.length - 1"
                  class="mx-2"
                ></v-divider>
              </div>
            </template>
          </v-list>
        </v-card>
        <div class="" style="position:relative;bottom:60px">
          <v-divider class="mx-2 mt-2"></v-divider>
          <div class="d-flex" style="height: 50px;align-items: center;">
            <v-spacer></v-spacer>
            <router-link class="text-none mr-2" to="#">
              >> ดูเพิ่มเติม</router-link
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      news: [
        {
          id: 1,
          title: "Verify Project",
          detail:
            "A new project please upload your project image to the follow link for verify your project."
        },
        {
          id: 2,
          title: "แจ้งนักศึกษาที่ติด F",
          detail:
            "ให้นักศึกษาที่ติด F เข้าพบอาจารย์ประจำวิชาภายในวันที่่ 15 มิถุนายน 2654"
        },
        {
          id: 3,
          title: "แจ้งนักศึกษาที่ติด F",
          detail:
            "ให้นักศึกษาที่ติด F เข้าพบอาจารย์ประจำวิชาภายในวันที่่ 15 มิถุนายน 2654"
        },
        {
          id: 4,
          title: "แจ้งนักศึกษาที่ติด F",
          detail:
            "ให้นักศึกษาที่ติด F เข้าพบอาจารย์ประจำวิชาภายในวันที่่ 15 มิถุนายน 2654"
        }
      ]
    };
  },
  methods: {
    submit() {
      alert("submit");
    }
  }
};
</script>

<style scoped>
.container {
  height: 500px;
  position: relative;
}
.search-box {
  /* width: 500px; */
  max-width: 500px;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
