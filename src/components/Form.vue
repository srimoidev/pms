<template>
  <div class="mb-10">
    <h1 class="mb-2">{{ formLabel }}</h1>
    <div
      v-if="formType == 'textEditor'"
      :class="[{ hideIt: isActive == false }]"
    >
      <ckeditor :editor="editor" v-model="preContent"></ckeditor>
    </div>
    <div
      v-else-if="formType == 'textField'"
      :class="[{ hideIt: isActive == false }]"
    >
      <v-text-field v-model="preContent"></v-text-field>
    </div>
    <div :class="[{ hideIt: isActive == true }]" ref="Content">
      {{ content }}
    </div>
    <div class="my-2">
      <v-btn small :color="btnColor" @click="Edit">{{ editButton }}</v-btn>
      <v-btn
        small
        text
        class="mx-2"
        :class="[{ hideIt: isActive == false }]"
        @click="Cancel"
      >
        Cancel
      </v-btn>
    </div>
    {{ JSON.stringify(preContent)}}
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "Form",
  props: {
    data: Object,
  },
  data() {
    return {
      formLabel: this.data.formLabel,
      formType: this.data.formType,
      editor: ClassicEditor,
      content: "test",
      preContent: "test",
      editButton: null,
      btnColor: null,
      isActive: false,
    };
  },
  mounted() {
    this.changeBtn();
  },
  updated() {
    this.changeBtn();
  },
  methods: {
    Edit() {
      this.content = this.preContent;
      this.$refs.Content.innerHTML = this.content;
      this.isActive = !this.isActive;
    },
    Cancel() {
      this.preContent = this.content;
      this.isActive = !this.isActive;
    },
    changeBtn() {
      if (this.isActive) {
        this.btnColor = "primary";
        this.editButton = "Save";
      } else {
        this.btnColor = "warning";
        this.editButton = "Edit";
      }
    },
  },
};
</script>

<style scoped>
.hideIt {
  display: none !important;
}
</style>
