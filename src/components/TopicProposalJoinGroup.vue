<template>
  <v-card width="600">
    <v-card-title class="blue"
      >รายละเอียดโครงงาน<v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn></v-card-title
    >
    <v-divider> </v-divider>
    <v-container>
      <v-row v-for="item in title" :key="item.name">
        <v-col cols="4" class="align-text-right"
          ><span>{{ item.text }}</span></v-col
        >
        <v-col cols="8">
          <div v-if="item.name == 'MEMBERS'">
            <div v-for="member in data.MEMBERS" :key="member.NAME">
              {{ member.NAME }}
            </div>
          </div>
          <div v-else>
            <span>{{ data[item.name] }}</span>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="submit">Join</v-btn>
      </div>
    </v-container>
  </v-card>
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
      title: [
        { name: "GROUP_TH_NAME", text: "ชื่อภาษาไทย" },
        { name: "Group_Name", text: "ชื่อภาษาอังกฤษ" },
        { name: "Group_advisor", text: "อาจารย์ที่ปรึกษา" },
        { name: "MEMBERS", text: "สมาชิก" }
      ]
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.data.Group_ID);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.align-text-right {
  text-align: right;
  vertical-align: middle;
}
</style>
