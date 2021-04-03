<template>
  <v-card class="ma-2 elevation-1" flat>
    <v-toolbar height="56px" flat>
      <v-toolbar-title>Project Descriptions</v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
    </v-toolbar>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="item in projectDesc" :key="item" cols="12">
            <v-row>
              <v-col cols="3" class="d-flex justify-end">
                {{ item.title }}
              </v-col>
              <v-col v-if="item.id == 3" cols="9">
                <div v-for="member in item.data" :key="member.id">
                  <v-card class="mb-2 elevation-1" width="50%">
                    <div class="d-flex ma-2 align-center">
                      <v-avatar class="mr-2 my-2" color="blue" size="48">
                        <span class="white--text">{{ member.legacy }}</span>
                      </v-avatar>
                      <span>
                        <div class="body-1">{{ member.name }}</div>
                        <div class="grey--text text--darken-1 body-2">
                          {{ member.major + ", ชั้นปีที่ " + member.year }}
                        </div>
                      </span>
                    </div>
                  </v-card>
                </div>
              </v-col>
              <v-col v-else-if="item.id == 4" cols="9">
                <div v-for="member in item.data" :key="member.id">
                  <v-card class="mb-2 elevation-1" width="50%">
                    <div class="d-flex ma-2 align-center">
                      <v-avatar class="mr-2 my-2" color="blue" size="48">
                        <span class="white--text">{{ member.legacy }}</span>
                      </v-avatar>
                      <span>
                        <div class="body-1">{{ member.name }}</div>
                        <div class="grey--text text--darken-1 body-2">
                          {{ "คณะ " + member.faculty }}
                        </div>
                        <div class="grey--text text--darken-1 body-2">
                          {{ "สาขาวิชา " + member.field }}
                        </div>
                      </span>
                    </div>
                  </v-card>
                </div>
              </v-col>
              <v-col v-else cols="9">
                {{ item.data }}
              </v-col>
            </v-row>
            <v-divider v-show="item.end"></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
  <!-- <div class="grey lighten-5">
    
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      projectDescTitle: [
        "ชื่อภาษาไทย",
        "ชื่อภาษาอังกฤษ",
        "สมาชิก",
        "อาจารย์ที่ปรึกษา",
        "บทคัดย่อ"
      ],
      projectDesc: [
        { id: 1, title: "ชื่อภาษาไทย", data: "ฟหกมฟหกงมฟงหกว" },
        { id: 2, title: "ชื่อภาษาอังกฤษ", data: "asdasd", end: true },
        {
          id: 3,
          title: "สมาชิก",
          data: [
            {
              id: 1,
              name: "Ponlachet Kammung",
              major: "วศ.บ.คพ 4ปี",
              year: "5",
              legacy: "PK"
            },
            {
              id: 2,
              name: "b",
              major: "วศ.บ.คพ เทียบโอน",
              year: "4",
              legacy: "BB"
            }
          ]
        },
        {
          id: 4,
          title: "อาจารย์ที่ปรึกษา",
          data: [
            {
              name: "asd zxc",
              legacy: "AZ",
              faculty: "วิศวกรรมศาสตร์",
              field: "ค.อ.บ.วิศวกรรมไฟฟ้า-วิศวกรรมคอมพิวเตอร์"
            }
          ],
          end: true
        },
        {
          id: 5,
          title: "บทคัดย่อ",
          data:
            "โครงงานนี้มีวัตถุประสงค์เพื่อช่วยจัดการ การทำโครงงานแก่นักศึกษาวิศวกรรมคอมพิวเตอร์ มทร.ล้านนาให้เป็นระบบมากยิ่งขึ้น และเป็นแนวทางในการทำโครงงาน เพื่อให้นักศึกษาสามารถส่งงานหรือเอกสารผ่านทางเว็บไซต์ได้ เพื่อจัดเก็บโครงงานของนักศึกษา เพื่อลดพื้นที่ในการเก็บเอกสาร โดยใช้ เว็บไซต์บริหารและจัดการโครงงานวิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เข้ามาเป็นสื่อกลางระหว่างอาจารย์และนักศึกษาในการทำโครงงาน รวมไปถึงระบบสนับสนุนการส่งโครงงานและเอกสารที่เกี่ยวข้องผ่านทางเว็บไซต์ให้กับอาจารย์และนักศึกษาผลที่คาดว่าจะได้รับ นักศึกษาจะได้รู้ว่าการทำโครงงานควรจะเริ่มต้นยังไงและทางเว็บไซต์จะสามารถช่วยบริหารว่า ช่วงเวลาไหนควรส่งเอกสารไหนอีก อีกทั้งยังลดเวลาและลดค่าใช้จ่ายต่าง ๆ และยังสามารถเพิ่มความสะดวกสบายในการทำโครงงานมากยิ่งขึ้น"
        }
      ]
      // projectDesc: []
    };
  }
};
</script>

<style></style>
