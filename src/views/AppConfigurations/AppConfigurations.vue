<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-toolbar flat>
      <v-toolbar-title>จัดการทรัพยากร</v-toolbar-title>
    </v-toolbar>
    <v-divider class="ma-2"></v-divider>
    <div class="overflow-y-auto" :style="{ 'max-height': windowHeight - 82 + 'px' }">
      <v-container>
        <v-expansion-panels v-model="panels" multiple accordion flat>
          <v-expansion-panel v-model="panels">
            <v-expansion-panel-header>เอกสารรายวิชา</v-expansion-panel-header>
            <v-divider class="mb-2"></v-divider>
            <v-expansion-panel-content>
              <!-- asdasd -->
              <div class="d-flex my-2">
                <v-spacer></v-spacer>
                <v-btn class="primary mr-2" small @click="isAdd = true">เพิ่มฟอร์ม</v-btn>
                <v-btn class="error" small>เริ่มปีการศึกษาใหม่</v-btn>
              </div>
              <v-data-table
                :headers="documents_header"
                :items="original_form"
                class="elevation-1"
                show-expand
                single-expand
                item-key="FormTypeID"
                :loading="loading"
                loading-text="Loading... Please wait"
              >
                <template v-if="isAdd" v-slot:[`body.prepend`]="{ headers }">
                  <tr>
                    <td :colspan="headers.length">
                      <v-container class="px-16 py-4">
                        <v-row>
                          <v-col cols="2"><span>ชื่อ</span></v-col>
                          <v-col cols="4">
                            <v-text-field v-model="newName" outlined hide-details dense></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>Deadline</span></v-col>
                          <v-col cols="4">
                            <div v-for="(i, index) in newDeadlines" :key="index">
                              <div class="d-flex">
                                <v-text-field
                                  v-model="i.value"
                                  prepend-icon="mdi-calendar"
                                  :label="`Sec. ${index + 1}`"
                                  type="datetime-local"
                                  format-value="yyyy-MM-dd"
                                  hide-details
                                  class="mb-2 mr-6"
                                ></v-text-field>
                                <v-btn class="mt-3" small @click="resetDateTime(item, i)">ไม่กำหนด</v-btn>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>สิทธ์การมองเห็น</span></v-col>
                          <v-col cols="9">
                            <div class="d-flex">
                              <v-checkbox v-model="newIsPreProject" class="mr-2 mt-0" label="Pre-Project" dense hide-details></v-checkbox>
                              <v-checkbox v-model="newIsProject" class="mt-0" label="Project" dense hide-details></v-checkbox>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>สถานะ</span></v-col>
                          <v-col cols="9">
                            <v-checkbox v-model="newIsActive" class="mr-2 mt-0" label="Active" dense hide-details></v-checkbox>
                          </v-col>
                        </v-row>
                        <div class="d-flex">
                          <v-spacer></v-spacer>
                          <v-btn color="success" class="mr-2" small @click="formAddSubmit">Save</v-btn>
                          <v-btn class="elevation-0" color="white" small @click="formAddCancel">Cancel</v-btn>
                        </div>
                      </v-container>
                    </td>
                  </tr>
                </template>
                <template v-slot:[`item.Deadlines`]="{ item }">
                  <div class="my-2">
                    <v-row no-gutters v-for="(i, index) in item.Deadlines" :key="i.DeadlineID" class="mb-2">
                      <v-col cols="4">{{ "Sec. " + (index + 1) + " : " }}</v-col>
                      <v-col cols="8" :class="{ 'green--text': i.OnDate }">{{
                        i.OnDate ? new Date(i.OnDate).toLocaleString("th-TH") : "ไม่กำหนด"
                      }}</v-col>
                    </v-row>
                  </div>
                </template>
                <template v-slot:[`item.Permission`]="{ item }">
                  <span v-if="item.PreProject && item.Project">
                    Project, Pre-Project
                  </span>
                  <span v-else-if="item.PreProject">Pre-Project</span>
                  <span v-else-if="item.Project">Project</span>
                </template>
                <template v-slot:[`item.isActive`]="{ item }">
                  <v-chip class="error" :class="{ success: item.isActive, 'px-4': item.isActive }" small>
                    {{ item.isActive ? "Active" : "Inactive" }}
                  </v-chip>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="align-center">
                    <v-container class="px-16 py-4">
                      <v-row>
                        <v-col cols="2"><span>ชื่อ</span></v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].FormTypeName"
                            outlined
                            hide-details
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2"><span>Deadline</span></v-col>
                        <v-col cols="4">
                          <div
                            v-for="(i, index) in edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].Deadlines"
                            :key="i.DeadlineID"
                          >
                            <div class="d-flex">
                              <v-text-field
                                v-model="i.OnDate"
                                prepend-icon="mdi-calendar"
                                :label="`Sec. ${index + 1}`"
                                type="datetime-local"
                                format-value="yyyy-MM-dd"
                                hide-details
                                class="mb-2 mr-6"
                              ></v-text-field>
                              <v-btn class="mt-3" small @click="resetDateTime(item, i)">ไม่กำหนด</v-btn>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2"><span>สิทธ์การมองเห็น</span></v-col>
                        <v-col cols="9">
                          <div class="d-flex">
                            <v-checkbox
                              v-model="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].PreProject"
                              class="mr-2 mt-0"
                              label="Pre-Project"
                              dense
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].Project"
                              class="mt-0"
                              label="Project"
                              dense
                              hide-details
                            ></v-checkbox>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2"><span>สถานะ</span></v-col>
                        <v-col cols="9">
                          <v-checkbox
                            v-model="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].isActive"
                            class="mr-2 mt-0"
                            label="Active"
                            dense
                            hide-details
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                      <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn color="success" class="mr-2" small @click="formUpdateSubmit(item)">Save</v-btn>
                        <v-btn class="elevation-0" color="white" small @click="formUpdateCancel(item)">Cancel</v-btn>
                      </div>
                    </v-container>
                  </td>
                </template>
                <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
                  <v-icon :ref="'collapse' + item.FormTypeID" @click="expand(!isExpanded)">mdi-square-edit-outline</v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- <v-expansion-panel v-model="panels">
            <v-expansion-panel-header>เอกสารรายวิชา</v-expansion-panel-header>
            <v-divider class="mb-2"></v-divider>
            <v-expansion-panel-content> </v-expansion-panel-content>
          </v-expansion-panel> -->
        </v-expansion-panels>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    panels: [0, 1],
    documents_header: [
      { text: "ชื่อ", value: "FormTypeName", sortable: false },
      // { text: "รายละเอียด", value: "FormTypeDetail" },
      { text: "Deadline", value: "Deadlines", sortable: false },
      { text: "สิทธ์การมองเห็น", value: "Permission", sortable: false },
      { text: "สถานะ", value: "isActive", sortable: false },
      { text: "", value: "data-table-expand" }
    ],
    newName: null,
    newIsPreProject: null,
    newIsProject: null,
    newIsActive: null,
    newDeadlines: [],
    isAdd: false,
    original_form: [],
    edited_form: [],
    allSection: [],
    loading: true,
    windowHeight: 0
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
      var form = await this.Form.AllType();
      let deadline = await this.Form.Deadline();
      form.map(item => {
        item.Deadlines = deadline.filter(d => d.FormTypeID == item.FormTypeID);
        item.Deadlines.map(function(o) {
          o.OnDate = o.OnDate ? o.OnDate.slice(0, 16) : null;
        });
      });
      this.original_form = form;
      this.edited_form = JSON.parse(JSON.stringify(form)); //หลบไม่ให้ Object ชี้ memory address เดียวกัน
      this.allSection = await this.Section.All();
      this.allSection.forEach(() => {
        this.newDeadlines.push({ value: null });
      });
      this.loading = false;
    },
    resetDateTime(pItem, pDeadline) {
      const item_idx = this.edited_form.findIndex(item => item.FormTypeID == pItem.FormTypeID);
      const deadline_idx = this.edited_form[item_idx].Deadlines.findIndex(item => item.DeadlineID == pDeadline.DeadlineID);
      this.edited_form[item_idx].Deadlines[deadline_idx].OnDate = null;
    },
    formUpdateSubmit(item) {
      var edited_obj = this.edited_form.find(o => o.FormTypeID == item.FormTypeID);
      var edited_form = {
        FormTypeName: edited_obj.FormTypeName,
        Project: edited_obj.Project,
        PreProject: edited_obj.PreProject,
        isActive: edited_obj.isActive
      };
      var edited_deadlines = [];
      edited_obj.Deadlines.forEach(item => {
        edited_deadlines.push({ DeadlineID: item.DeadlineID, OnDate: item.OnDate });
      });
      console.log(edited_form, edited_deadlines);
      this.Form.Setting(this.user.UserID, item.FormTypeID, edited_form, edited_deadlines).then(() => {
        this.loadData();
      });
      this.$refs["collapse" + item.FormTypeID].$el.click();
    },
    formUpdateCancel(item) {
      this.edited_form = JSON.parse(JSON.stringify(this.original_form));
      this.$refs["collapse" + item.FormTypeID].$el.click();
    },
    formAddSubmit() {
      // console.log(this.newDeadlines);

      this.formAddCancel();
    },
    formAddCancel() {
      this.newName = null;
      this.newIsPreProject = null;
      this.newIsProject = null;
      this.newIsActive = null;
      this.newDeadlines = [];
      this.allSection.forEach(() => {
        this.newDeadlines.push({ value: null });
      });
      this.isAdd = false;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    }
  }
};
</script>

<style></style>
