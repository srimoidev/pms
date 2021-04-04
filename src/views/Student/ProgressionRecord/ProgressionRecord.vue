<template>
  <v-card class="ma-2">
    <v-toolbar height="56px" flat>
      <v-toolbar-title>บันทึกความคืบหน้า</v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="isAdd = !isAdd">เพิ่มบันทึก</v-btn>
    </v-toolbar>
    <v-container>
      <v-card v-if="isAdd" class="pa-4">
        <template>
          <v-textarea
            label="งานที่ทำ"
            outlined
            counter="120"
            rows="3"
          ></v-textarea>
          <v-textarea
            label="วิธีแก้ปัญหา"
            outlined
            counter="120"
            rows="3"
          ></v-textarea>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" small color="success" @click="isAdd = !isAdd">Save</v-btn>
            <v-btn class="elevation-0" small color="transparent" @click="isAdd = !isAdd">Cancel</v-btn>
          </div>
        </template>
      </v-card>

      <v-list three-line>
        <template v-for="item in records">
          <v-list-item :key="item.id">
            <v-list-item-content>
              <v-list-item-title>งานที่ทำ</v-list-item-title>
              <v-list-item-subtitle class="ma-4">{{
                item.detail
              }}</v-list-item-subtitle>
              <v-list-item-title>วิธีแก้ปัญหา</v-list-item-title>
              <v-list-item-subtitle class="ma-4">{{
                item.method
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-subtitle>{{
                new Date().toLocaleString("th-TH")
              }}</v-list-item-subtitle>
              <!-- <v-icon>mdi-star-outline</v-icon> -->
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="item.id"></v-divider>
        </template>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isAdd:false,
      records: [
        {
          id: 1,
          detail:
            "ต่อ API asda d asdas dasda sdas dasdasdas dad adasdadadas dasd asdas asd asdas dasdasd asdasda sda dasd asd asdasd asd asd asd asd as das dasdasdas dasd asdasd asdas das dasd ad",
          method:
            "ติด cors ฟห กาสฟสากืฟ สืกสฟาื หกสฟ ืสกื ฟสกาืฟสา กืฟสก ืฟสกาื ฟสืกฟสื สาฟืก นฟืหกนร ืฟนก ื าฟหยก ่ฟก่นรฟ่ นฟ ่ ฟนร่ฟหนร ก่ฟหนร ่ฟนห ่ก"
        },
        {
          id: 2,
          detail:
            "ต่อ API2 กฟ หกฟ กาฟ่กสา ฟ่กส าฟ่กส า่ฟหสก ่ฟสกร่ ฟสรก่สฟร่ก สรฟ่กสฟร ่สร่ก สฟร่ สฟห่ สฟ่ร กสรฟ่ก สฟร่ก ฟส้กสฟื้กฟ้ืกรีฟ้กรีฟเ้กรฟเกร ฟ้นกร่ฟส า่ฟสวกา่ฟสวก่าฟวหก่ฟวก่ฟว",
          method: "ติด cors 2"
        }
      ]
    };
  }
};
</script>

<style></style>
