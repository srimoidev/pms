<template>
  <v-tabs
    background-color="primary accent-4"
    class="elevation-2"
    dark
    grow
    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
  >
    <v-tabs-slider></v-tabs-slider>

    <v-tab v-for="(tab, index) in tabs" :key="index" :href="`#tab${index}`">
      {{ tab.tabTitle }}
    </v-tab>

    <v-tab-item
      v-for="(tab, index) in tabs"
      :key="index"
      :value="'tab' + index"
    >
      <v-card-text>
        <!--  -->
        <v-tabs
          class="elevation-2"
          vertical
          :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
          :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="(tabintab, index) in tab.tabs"
            :key="index"
            :href="`#tabintab${index}`"
          >
            {{ tabintab.tabTitle }}
          </v-tab>

          <v-tab-item
            v-for="(tabintab, index) in tab.tabs"
            :key="index"
            :value="'tabintab' + index"
          >
            <v-card-text>
              <div v-for="(item, index) in tab.form" :key="index">
                <Form :data="item" />
              </div>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
        <!--  -->
      </v-card-text>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Form from "../components/Form";

export default {
  components: {
    Form,
    // Component2,
  },
  data() {
    return {
      prevIcon: "",
      nextIcon: "",
      tabs: [
        {
          tabTitle: "CE01",
          tabs: [
            {
              tabTitle: "Management",
            },
            {
              tabTitle: "Comments",
            },
          ],
          form: [
            {
              formLabel: "ที่มาและความสำคัญ",
              formType: "textEditor",
            },
            {
              formLabel: "รายละเอียดโครงงาน",
              formType: "textField",
            },
          ],
        },
        {
          tabTitle: "CE02",
          form: [
            {
              formLabel: "ที่มาและความสำคัญ",
              formType: "textEditor",
            },
            {
              formLabel: "รายละเอียดโครงงาน",
              formType: "textField",
            },
          ],
        },
        {
          tabTitle: "CE03",
          form: [
            {
              formLabel: "ที่มาและความสำคัญ",
              formType: "textEditor",
            },
            {
              formLabel: "รายละเอียดโครงงาน",
              formType: "textField",
            },
          ],
        },
      ],
    };
  },
};
</script>
