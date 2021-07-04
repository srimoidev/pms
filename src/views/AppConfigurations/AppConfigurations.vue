<template>
  <v-card class="ma-2 elevation-1" tile>
    <v-toolbar flat>
      <v-toolbar-title>จัดการทรัพยากร</v-toolbar-title>
    </v-toolbar>
    <v-divider class="ma-2"></v-divider>
    <v-container>
      <v-expansion-panels v-model="panels" multiple accordion flat>
        <v-expansion-panel v-model="panels">
          <v-expansion-panel-header>เอกสารรายวิชา</v-expansion-panel-header>

          <v-expansion-panel-content>
            <!-- asdasd -->
            <v-data-table :headers="documents_header" :items="form" class="elevation-1">
              <template v-slot:[`item.actions`]="{ item }">
                <div>
                  <v-btn small outlined color="primary" @click="showDetail(item)">แก้ไข</v-btn>
                </div>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    panels: [0],
    documents_header: [
      { id: 1, text: "ชื่อ", value: "FormTypeName" },
      { id: 2, text: "รายละเอียด", value: "FormTypeDetail" },
      { id: 3, text: "", value: "actions", width: 100 }
    ],
    form: []
  }),
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },

  watch: {
    user() {
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.form = await this.Form.Type();
      console.log(this.form);
    }
  }
};
</script>

<style></style>
