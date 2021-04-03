<template>
  <v-card tile class="" style="width:100%">
    <v-card-title>Activities</v-card-title>
    <v-list class="overflow-y-auto act-list">
      <template v-for="(item, index) in data">
        <div v-if="index != 0" :key="index">
          <v-subheader
            v-if="
              item.updateTime.toLocaleDateString('th-Th') ==
                new Date().toLocaleDateString('th-Th') &&
                item.updateTime.toLocaleDateString('th-Th') !=
                  data[index - 1].updateTime.toLocaleDateString('th-Th')
            "
            >วันนี้</v-subheader
          >
          <v-subheader
            v-else-if="
              item.updateTime.toLocaleDateString('th-Th') !=
                data[index - 1].updateTime.toLocaleDateString('th-Th')
            "
            >{{ item.updateTime.toLocaleDateString("th-Th") }}
          </v-subheader>
        </div>
        <div v-else :key="index">
          <v-subheader
            v-if="
              item.updateTime.toLocaleDateString('th-Th') ==
                new Date().toLocaleDateString('th-Th')
            "
            >วันนี้
          </v-subheader>
          <v-subheader v-else>
            {{ item.updateTime.toLocaleDateString("th-Th") }}
          </v-subheader>
        </div>

        <v-divider v-if="data.length != index" :key="index"></v-divider>

        <v-list-item :key="index">
          <v-list-item-avatar class="indigo accent-1 justify-center">
            <span>PK</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{
                item.updateBy.name +
                  " " +
                  act[item.act.actid] +
                  "ไฟล์ " +
                  type[item.act.type]
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.updateTime.toLocaleTimeString("th-TH") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentDate: null,
      act: ["", "เพิ่ม", "ลบ", "แก้ไข"],
      type: ["", "CE01", "CE02"]
    };
  },
  methods: {}
};
</script>

<style>
.act-list {
  max-height: calc(100vh - 64px - 64px);
}
</style>
