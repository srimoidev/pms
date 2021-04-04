<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" color="cyan">
      <v-tab v-for="item in category" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list>
          <v-list-item three-line v-for="(item, i) in data" :key="i" link>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.advisor }}</v-list-item-subtitle>
              <div class="d-lg-flex">
                <div v-for="tag in item.tags" :key="tag">
                  <v-chip :color="chip_color[tag]" class="mr-2" x-small>
                    {{ tag }}
                  </v-chip>
                </div>
                <v-spacer></v-spacer>จำนวนครั้งที่ชม 15
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      category: ["Recently viewed", "Most viewed"],
      icon: {
        Vuejs: "mdi-vuejs",
        Software: "mdi-application",
        Hardware: "mdi-chip"
      },
      chip_color: {
        Vuejs: "cyan",
        Software: "green",
        Hardware: "yellow",
        Iot: "blue",
        Arduino: "red"
      }
    };
  },
  props: {
    data: Array
  }
};
</script>

<style></style>
