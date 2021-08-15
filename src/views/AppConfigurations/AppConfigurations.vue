<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-toolbar flat>
      <v-toolbar-title>จัดการทรัพยากร</v-toolbar-title>
    </v-toolbar>
    <v-divider class="ma-2"></v-divider>
    <div class="overflow-y-auto px-6" :style="{ 'max-height': windowHeight - 82 + 'px' }">
      <v-container>
        <v-expansion-panels v-model="panels" multiple accordion flat>
          <!-- Panel Section -->
          <v-expansion-panel v-model="panels">
            <v-expansion-panel-header>Sections</v-expansion-panel-header>
            <v-divider class="mb-2"></v-divider>
            <v-expansion-panel-content>
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn color="primary mb-2" small @click="isAddSection = true">เพิ่ม Section</v-btn>
              </div>
              <v-data-table
                :headers="section_headers"
                :items="sections"
                class="elevation-1"
                show-expand
                single-expand
                item-key="SectionID"
                :loading="sec_loading"
                loading-text="Loading... Please wait"
                :items-per-page="-1"
              >
                <template v-if="isAddSection" v-slot:[`body.prepend`]="{ headers }">
                  <tr class="v-data-table__expanded v-data-table__expanded__content">
                    <td :colspan="headers.length">
                      <ValidationObserver ref="sectionAdd_observer">
                        <v-container class="px-16 py-4">
                          <v-row>
                            <v-col cols="2">
                              <span>วิชา</span>
                            </v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="วิชา" rules="required">
                                <v-select
                                  v-model="newSubject"
                                  :items="subjectText"
                                  item-text="text"
                                  item-value="id"
                                  outlined
                                  dense
                                  label="โปรดเลือก"
                                  :error-messages="errors"
                                  :disabled="user.UserTypeID != 4"
                                ></v-select>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2">
                              <span>ภาคเรียน</span>
                            </v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="ภาคเรียน" rules="required">
                                <v-select
                                  v-model="newTerm"
                                  :items="termText"
                                  item-text="text"
                                  item-value="id"
                                  outlined
                                  dense
                                  label="โปรดเลือก"
                                  :error-messages="errors"
                                ></v-select>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>อาจารย์ผู้สอน</span></v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="อาจารย์ผู้สอน" rules="required">
                                <v-autocomplete
                                  v-model="newInstructor"
                                  :items="allTeacher"
                                  item-text="Fullname"
                                  item-value="UserID"
                                  label="อาจารย์ผู้สอน"
                                  outlined
                                  dense
                                  :error-messages="errors"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>รายละเอียด</span></v-col>
                            <v-col cols="4">
                              <v-textarea v-model="newSecDetail" rows="3" outlined label="รายละเอียด" dense auto-grow></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>วัน</span></v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="วัน" rules="required">
                                <v-autocomplete
                                  v-model="newDayOfWeek"
                                  :items="dayText"
                                  label="วัน"
                                  item-text="text"
                                  item-value="id"
                                  outlined
                                  dense
                                  :error-messages="errors"
                                ></v-autocomplete>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>เวลาเริ่มเรียน</span></v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="เวลาเริ่มเรียน" rules="required">
                                <v-text-field v-model="newStartTime" type="time" dense :error-messages="errors"></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>เวลาเลิกเรียน</span></v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="เวลาเลิกเรียน" rules="required">
                                <v-text-field v-model="newEndTime" type="time" dense :error-messages="errors"></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <div class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn color="success" class="mr-2" small @click="sectionAddSubmit">Save</v-btn>
                            <v-btn class="elevation-0" color="white" small @click="sectionAddCancel(item)">Cancel</v-btn>
                          </div>
                        </v-container>
                      </ValidationObserver>
                    </td>
                  </tr>
                </template>
                <template v-slot:[`item.Subject`]="{ item }">
                  <span>{{ subjectText[item.Subject - 1].text }}</span>
                </template>
                <template v-slot:[`item.Term`]="{ item }">
                  <span>{{ `${item.Term}/${item.Year}` }}</span>
                </template>
                <template v-slot:[`item.DayOfWeek`]="{ item }">
                  <day-label :day="item.DayOfWeek"></day-label>
                </template>
                <template v-slot:[`item.StartTime`]="{ item }">
                  <span>{{ `${item.StartTime.slice(0, 5)} - ${item.EndTime.slice(0, 5)}` }}</span>
                </template>
                <template v-slot:[`item.Section_Instructor`]="{ item }">
                  <span>{{ item.Section_Instructor.Fullname }}</span>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="align-center">
                    <ValidationObserver ref="sectionEdit_observer">
                      <v-container class="px-16 py-4">
                        <v-row>
                          <v-col cols="2">
                            <span>วิชา</span>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="วิชา" rules="required">
                              <v-select
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].Subject"
                                :items="subjectText"
                                item-text="text"
                                item-value="id"
                                outlined
                                dense
                                label="โปรดเลือก"
                                :error-messages="errors"
                              ></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6" class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="sectionDelete(item)">ลบ Section</v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2">
                            <span>ภาคเรียน</span>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="ภาคเรียน" rules="required">
                              <v-select
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].Term"
                                :items="termText"
                                item-text="text"
                                item-value="id"
                                outlined
                                dense
                                label="โปรดเลือก"
                                :error-messages="errors"
                              ></v-select>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>อาจารย์ผู้สอน</span></v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="อาจารย์ผู้สอน" rules="required">
                              <v-autocomplete
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].Instructor"
                                :items="allTeacher"
                                item-text="Fullname"
                                item-value="UserID"
                                label="อาจารย์ผู้สอน"
                                outlined
                                dense
                                :error-messages="errors"
                              ></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>รายละเอียด</span></v-col>
                          <v-col cols="4">
                            <v-textarea
                              v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].Detail"
                              outlined
                              hide-details
                              rows="3"
                              counter
                              label="รายละเอียด"
                              dense
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>วัน</span></v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="วัน" rules="required">
                              <v-autocomplete
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].DayOfWeek"
                                :items="dayText"
                                item-text="text"
                                item-value="id"
                                label="วัน"
                                outlined
                                dense
                                hide-details
                                :error-messages="errors"
                              ></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>เวลาเริ่มเรียน</span></v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="เวลาเริ่มเรียน" rules="required">
                              <v-text-field
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].StartTime"
                                type="time"
                                dense
                                :error-messages="errors"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2"><span>เวลาเลิกเรียน</span></v-col>
                          <v-col cols="4">
                            <ValidationProvider v-slot="{ errors }" name="เวลาเลิกเรียน" rules="required">
                              <v-text-field
                                v-model="edited_section[edited_section.findIndex(o => o.SectionID == item.SectionID)].EndTime"
                                type="time"
                                dense
                                :error-messages="errors"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <div class="d-flex">
                          <v-spacer></v-spacer>
                          <v-btn color="success" class="mr-2" small @click="sectionUpdateSubmit(item)">Save</v-btn>
                          <v-btn class="elevation-0" color="white" small @click="sectionUpdateCancel(item)">Cancel</v-btn>
                        </div>
                      </v-container>
                    </ValidationObserver>
                  </td>
                </template>
                <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
                  <v-icon :ref="'collapse_s_' + item.SectionID" @click="expand(!isExpanded)">mdi-square-edit-outline</v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Panel เอกสาร -->
          <v-expansion-panel v-model="panels">
            <v-expansion-panel-header>เอกสารรายวิชา</v-expansion-panel-header>
            <v-divider class="mb-2"></v-divider>
            <v-expansion-panel-content>
              <div class="d-flex my-2">
                <v-spacer></v-spacer>
                <v-btn class="primary mr-2" small @click="isAddForm = true">เพิ่มเอกสาร</v-btn>
                <v-btn class="error" small>เริ่มปีการศึกษาใหม่</v-btn>
              </div>
              <v-data-table
                :headers="documents_header"
                :items="original_form"
                class="elevation-1"
                show-expand
                single-expand
                item-key="FormTypeID"
                :loading="form_loading"
                loading-text="Loading... Please wait"
                :items-per-page="-1"
              >
                <template v-if="isAddForm" v-slot:[`body.prepend`]="{ headers }">
                  <tr class="v-data-table__expanded v-data-table__expanded__content">
                    <td :colspan="headers.length">
                      <ValidationObserver ref="formAdd_observer">
                        <v-container class="px-16 py-4">
                          <v-row>
                            <v-col cols="2"><span>ชื่อ</span></v-col>
                            <v-col cols="4">
                              <ValidationProvider v-slot="{ errors }" name="ชื่อเอกสาร" rules="required">
                                <v-text-field v-model="newName" outlined dense label="ชื่อเอกสาร" :error-messages="errors"></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="2"><span>Deadline</span></v-col>
                            <v-col cols="4">
                              <div v-for="(i, index) in newDeadlines" :key="index">
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
                            <v-col cols="2"><span>เอกสารที่ต้องทำก่อน</span></v-col>
                            <v-col cols="8">
                              <div class="">
                                <v-autocomplete
                                  v-model="newRequireForm"
                                  :items="formTemp"
                                  item-text="FormTypeName"
                                  item-value="FormTypeID"
                                  hide-details
                                  dense
                                  outlined
                                  chips
                                  small-chips
                                  multiple
                                  label="เอกสารที่ต้องทำก่อน"
                                ></v-autocomplete>
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
                            <v-btn class="elevation-0" color="white" small @click="clearFormAdd">Cancel</v-btn>
                          </div>
                        </v-container>
                      </ValidationObserver>
                    </td>
                  </tr>
                </template>
                <template v-slot:[`item.Deadlines`]="{ item }">
                  <div class="my-2">
                    <div v-for="i in item.Deadlines" :key="i.DeadlineID" class="mb-2">
                      <span>{{ "[" + subjectText[i.Section.Subject - 1].text + "] Sec. " + i.Section.Sequence + " : " }}</span>
                      <span :class="{ 'green--text': i.OnDate }">{{ i.OnDate ? new Date(i.OnDate).toLocaleString("th-TH") : "ไม่กำหนด" }}</span>
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.RequireForms`]="{ item }">
                  <div v-for="obj in item.RequireForms" class="amber--text text--darken-2" :key="obj.FormTypeID">
                    {{ obj.FormTypeName }}
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
                    <ValidationObserver ref="formEdit_observer">
                      <v-container class="px-16 py-4">
                        <v-row>
                          <v-col cols="2"><span>ชื่อ</span></v-col>
                          <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="ชื่อเอกสาร" rules="required">
                              <v-text-field
                                v-model="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].FormTypeName"
                                outlined
                                hide-details
                                dense
                                label="ชื่อเอกสาร"
                                :error-messages="errors"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="2" class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="formDelete(item)">ลบฟอร์ม</v-btn>
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
                          <v-col cols="2"><span>เอกสารที่ต้องทำก่อน</span></v-col>
                          <v-col cols="8">
                            <div class="">
                              <v-autocomplete
                                v-model="selectedRequireType[selectedRequireType.findIndex(o => o.FormTypeID == item.FormTypeID)].Require"
                                :items="edited_form[edited_form.findIndex(o => o.FormTypeID == item.FormTypeID)].PrerequisiteForm"
                                item-text="FormTypeName"
                                item-value="FormTypeID"
                                hide-details
                                dense
                                outlined
                                chips
                                small-chips
                                multiple
                                label="เอกสารที่ต้องทำก่อน"
                              ></v-autocomplete>
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
                    </ValidationObserver>
                  </td>
                </template>
                <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
                  <v-icon :ref="'collapse' + item.FormTypeID" @click="expand(!isExpanded)">mdi-square-edit-outline</v-icon>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

import DayLabel from "@/components/DayLabel";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});
export default {
  components: {
    DayLabel,
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    panels: [0, 1],
    documents_header: [
      { text: "ชื่อ", value: "FormTypeName" },
      // { text: "รายละเอียด", value: "FormTypeDetail", width: 200 },
      { text: "Deadline", value: "Deadlines", sortable: false },
      { text: "เอกสารที่ต้องทำก่อน", value: "RequireForms", sortable: false },
      { text: "สิทธ์การมองเห็น", value: "Permission", sortable: false },
      { text: "สถานะ", value: "isActive" },
      { text: "", value: "data-table-expand" }
    ],
    section_headers: [
      { text: "วิชา", value: "Subject" },
      { text: "ภาคเรียน", value: "Term" },
      { text: "Section", value: "Sequence" },
      { text: "รายละเอียด", value: "Detail", sortable: false },
      { text: "วัน", value: "DayOfWeek" },
      { text: "เวลาเรียน", value: "StartTime", sortable: false },
      { text: "อาจารย์ผู้สอน", value: "Section_Instructor" },
      { text: "", value: "data-table-expand" }
    ],
    dayText: [
      { id: 1, text: "วันอาทิตย์" },
      { id: 2, text: "วันจันทร์" },
      { id: 3, text: "วันอังคาร" },
      { id: 4, text: "วันพุธ" },
      { id: 5, text: "วันพฤหัสบดี" },
      { id: 6, text: "วันศุกร์" },
      { id: 7, text: "วันเสาร์" }
    ],
    subjectText: [
      { id: 1, text: "Pre-Project" },
      { id: 2, text: "Project" }
    ],
    termText: [
      { id: 1, text: "ภาคเรียนที่ 1" },
      { id: 2, text: "ภาคเรียนที่ 2" },
      { id: 3, text: "ภาคฤดูร้อน" }
    ],
    isAddForm: false,
    isAddSection: false,
    form_loading: true,
    sec_loading: true,
    windowHeight: 0,
    allTeacher: [],
    //Form
    formTemp: [],
    selectedRequireType: [],
    original_form: [],
    edited_form: [],
    newName: null,
    newIsPreProject: false,
    newIsProject: false,
    newIsActive: false,
    newDeadlines: [],
    newRequireForm: [],

    //sec
    sections: [],
    edited_section: [],
    // newSubject: 1,
    newTerm: 1,
    newSubject: null,
    newSecDetail: null,
    newDayOfWeek: null,
    newStartTime: null,
    newEndTime: null,
    newInstructor: null
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
      let deadline;
      this.newDeadlines = [];
      this.allTeacher = await this.User.UserTeacher();
      if (this.user.UserTypeID == 3) {
        this.newSubject = 1; //Project
        this.sections = await this.Section.All(1);
        deadline = await this.Form.Deadline(1);
      } else if (this.user.UserTypeID == 5) {
        this.newSubject = 2; //Pre-Project
        this.sections = await this.Section.All(2);
        deadline = await this.Form.Deadline(2);
      } else {
        this.sections = await this.Section.All();
        deadline = await this.Form.Deadline();
      }

      form.forEach(element => {
        this.formTemp.push({ FormTypeID: element.FormTypeID, FormTypeName: element.FormTypeName });
        var typeTemp = [];
        element.RequireForms.forEach(element => {
          typeTemp.push(element.FormTypeID);
        });
        this.selectedRequireType.push({ FormTypeID: element.FormTypeID, Require: typeTemp });
      });
      form.map(item => {
        item.PrerequisiteForm = this.formTemp;
        item.Deadlines = deadline.filter(d => d.FormTypeID == item.FormTypeID);
      });

      this.original_form = form;
      this.edited_form = JSON.parse(JSON.stringify(form)); //หลบไม่ให้ Object ชี้ memory address เดียวกัน
      this.edited_form.map(item => {
        item.Deadlines.map(o => {
          o.OnDate = o.OnDate ? this.Utils.ConvertISOtoLocaleDateTime(o.OnDate) : null;
        });
      });
      this.form_loading = false;

      this.sections.forEach(item => {
        this.newDeadlines.push({ SectionID: item.SectionID, OnDate: null });
      });
      this.edited_section = JSON.parse(JSON.stringify(this.sections));
      this.sec_loading = false;
      console.log(this.edited_section);
    },
    resetDateTime(pItem, pDeadline) {
      const item_idx = this.edited_form.findIndex(item => item.FormTypeID == pItem.FormTypeID);
      const deadline_idx = this.edited_form[item_idx].Deadlines.findIndex(item => item.DeadlineID == pDeadline.DeadlineID);
      this.edited_form[item_idx].Deadlines[deadline_idx].OnDate = null;
    },
    async formUpdateSubmit(item) {
      var edited_obj = this.edited_form.find(o => o.FormTypeID == item.FormTypeID);
      var edited_form = {
        FormTypeName: edited_obj.FormTypeName,
        Project: edited_obj.Project,
        PreProject: edited_obj.PreProject,
        isActive: edited_obj.isActive
      };
      var edited_deadlines = [];
      edited_obj.Deadlines.forEach(item => {
        edited_deadlines.push({ DeadlineID: item.DeadlineID, OnDate: item.OnDate }); //แปลง datetime เป็น iso string
      });

      var edited_prerequisite = this.selectedRequireType.find(o => o.FormTypeID == item.FormTypeID).Require;
      edited_prerequisite.sort();
      if (await this.$refs.formEdit_observer.validate()) {
        this.Form.Update(this.user.UserID, item.FormTypeID, edited_form, edited_deadlines, edited_prerequisite).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.loadData();
          this.$refs["collapse" + item.FormTypeID].$el.click();
        });
      }
    },
    async formAddSubmit() {
      const newFormType = {
        FormTypeName: this.newName,
        FormTypeDetail: "",
        Project: this.newIsProject,
        PreProject: this.newIsPreProject,
        isActive: this.newIsActive
      };
      if (await this.$refs.formAdd_observer.validate()) {
        this.Form.Add(this.user.UserID, newFormType, this.newDeadlines, this.newRequireForm.sort()).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.clearFormAdd();
          this.loadData();
        });
      }
    },
    formUpdateCancel(item) {
      this.edited_form = JSON.parse(JSON.stringify(this.original_form));
      this.$refs["collapse" + item.FormTypeID].$el.click();
    },
    formDelete(item) {
      this.$swal
        .fire({
          title: `ยืนยันที่จะลบฟอร์มเอกสาร ${item.FormTypeName} ?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Form.Delete(item.FormTypeID).then(() => {
              this.$swal.fire({
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
                icon: "success",
                title: "Success"
              });
              this.clearFormAdd();
              this.loadData();
            });
          }
        });
    },
    async clearFormAdd() {
      this.newName = null;
      this.newIsPreProject = null;
      this.newIsProject = null;
      this.newIsActive = null;
      // this.newDeadlines = [];
      this.newRequireForm = [];
      this.isAddForm = false;
    },
    async sectionAddSubmit() {
      const newSection = {
        Subject: this.newSubject,
        Year: new Date().getFullYear().toString(),
        Term: this.newTerm,
        Detail: this.newSecDetail,
        DayOfWeek: this.newDayOfWeek,
        StartTime: this.newStartTime,
        EndTime: this.newEndTime,
        Instructor: this.newInstructor
      };
      console.log(newSection);
      if (await this.$refs.sectionAdd_observer.validate()) {
        this.Section.Add(this.user.UserID, newSection).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.loadData();
          this.sectionAddCancel();
        });
      }
    },
    async sectionUpdateSubmit(item) {
      var section_obj = this.edited_section.find(o => o.SectionID == item.SectionID);
      section_obj = {
        DayOfWeek: section_obj.DayOfWeek,
        Detail: section_obj.Detail,
        EndTime: section_obj.EndTime,
        StartTime: section_obj.StartTime,
        Instructor: section_obj.Instructor,
        Subject: section_obj.Subject,
        Term: section_obj.Term
      };
      console.log(section_obj);
      if (await this.$refs.sectionEdit_observer.validate()) {
        this.Section.Update(this.user.UserID, item.SectionID, section_obj).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.loadData();
          this.sectionUpdateCancel(item);
        });
      }
    },
    sectionUpdateCancel(item) {
      this.edited_section = JSON.parse(JSON.stringify(this.sections));
      this.$refs["collapse_s_" + item.SectionID].$el.click();
    },
    sectionAddCancel() {
      this.newSubject = 1;
      this.newTerm = 1;
      this.newSecDetail = null;
      this.newDayOfWeek = null;
      this.newStartTime = null;
      this.newEndTime = null;
      this.newInstructor = null;
      this.isAddSection = false;
    },
    sectionDelete(item) {
      this.$swal
        .fire({
          title: `ยืนยันที่จะลบ Section ${this.subjectText[item.Subject - 1].text}.Sec ${item.Sequence} ?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Section.Delete(item.SectionID).then(() => {
              this.$swal.fire({
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
                icon: "success",
                title: "Success"
              });
              this.loadData();
            });
          }
        });
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
