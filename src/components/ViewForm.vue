<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row justify="space-between mb-2">
          <v-btn outlined text color="primary">
            <v-icon left>mdi-chevron-left</v-icon> Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mx-2">
            Current Version
          </v-btn>
          <v-btn outlined text color="primary">
            Others Versions <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <iframe
            width="100%"
            height="1000"
            src="https://drive.google.com/file/d/15y67YnALkSYge8Rk3efxiho1vdSlsFEb/preview"
            frameborder="0"
          ></iframe>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-btn
          block
          outlined
          class="mb-3"
          color="info"
          @click="isActive = !isActive"
          :class="{ hid: isActive }"
        >
          <v-icon left>mdi mdi-comment-plus</v-icon> Comment
        </v-btn>
        <v-card :class="{ hid: !isActive }" class="mx-auto mb-2">
          <v-app-bar color="primary" dark dense>
            <span class="font-weight-bold">
              <v-icon>mdi mdi-comment-text</v-icon>
              COMMENTs
            </span>
          </v-app-bar>
          <v-card-text class="headline font-weight-bold">
            <v-form>
              <v-textarea
                label="Message"
                counter
                maxlength="120"
                single-line
                v-model="message.msg"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="AddComment">Submit</v-btn>
            <v-btn
              color="primary"
              outlined
              text
              @click="(isActive = !isActive), (message.msg = '')"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card
          class="mx-auto mb-2"
          v-for="(item, index) in comments"
          :key="index"
        >
          <v-app-bar color="primary" dark dense flat>
            <span class="font-weight-bold overline">
              {{ item.name }}
            </span>
          </v-app-bar>
          <v-card-text class="overline font-weight-bold pt-3 pb-0">
            "{{ item.msg }}"
          </v-card-text>
          <v-divider class="mx-2"></v-divider>
          <v-app-bar dense flat>
            <span class="overline"> December 9, 2020</span>
          </v-app-bar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      message: {
        name: "Test",
        msg: "",
      },
      comments: [
        {
          name: "Jarn Pratch",
          msg: "Nice!",
        },
        {
          name: "Jarn Srimoi",
          msg: "Nice!",
        },
      ],
    };
  },
  methods: {
    AddComment() {
      this.comments.push(this.message);
      this.message = {
        name: "",
        msg: "",
      };
      //   alert("test");
    },
  },
};
</script>

<style scoped>
.hid {
  display: none;
}
</style>
