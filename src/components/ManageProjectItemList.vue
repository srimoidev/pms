<template>
  <div class="my-4">
    <div class="d-flex">
      <slot name="header"></slot>
      <div style="flex-grow: 1 !important;"></div>
      <v-btn
        class="mr-6"
        @click="edit_field"
        v-if="!edit && header.editable"
        small
        color="primary"
        >edit</v-btn
      >
    </div>
    <span class="mx-6 mt-4 d-block" ref="content"></span>
    <div ref="field" class="mt-4" v-if="edit && header.type == `textfield`">
      <v-text-field
        class="mx-6"
        v-model="editedData"
        outlined
        :label="header.header"
        dense
        :autofocus="edit"
        @keydown.enter="submit"
        @keydown.esc="cancel"
      ></v-text-field>
    </div>
    <div v-if="header.type == `preview_only`" class="mt-4">
      <div v-if="typeof data[header.title] === `string`">
        <span class="mx-6">{{ data[header.title] }}</span>
      </div>
      <div v-else>
        <span
          class="mx-6 d-block"
          v-for="(item, i) in data[header.title]"
          :key="item.id"
          >{{ i + 1 + ". " }}{{ item.name }}</span
        >
      </div>
    </div>
    <div v-else-if="edit && header.type == `editor`" class="mt-4 mb-2">
      <ckeditor
        class="mx-6"
        :editor="editor"
        v-model="editedData"
        :config="editorConfig"
        :read-only="!edit"
      ></ckeditor>
    </div>
    <div v-else-if="edit && header.type == `table`">
      {{ editedData }}
      ตาราง
    </div>

    <div class="d-flex" v-if="edit">
      <div style="flex-grow: 1 !important;"></div>
      <div class="mr-6">
        <v-btn class="mr-2" @click="submit" small color="success">Save</v-btn>
        <v-btn @click="cancel" small color="error">Cancel</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
export default {
  data() {
    return {
      editor: ClassicEditor,
      editedData: this.data[this.header.title],
      edit: false,
      editorConfig: {
        // plugins:[Base64UploadAdapter],
        height: "40vh",
        readOnly: true,
        startupFocus: true,
        tabSpaces: 4,
        filebrowserUploadUrl: "/uploader/upload.php"
      }
    };
  },
  props: {
    data: Object,
    header: Object,
    iterator: Number
  },
  methods: {
    edit_field() {
      this.edit = !this.edit;
      this.$refs.content.innerHTML = "";
    },
    submit() {
      this.edit = !this.edit;
      this.$refs.content.innerHTML = this.editedData;
      this.$emit("submit", {
        val: this.editedData,
        field: this.header.title
      });
    },
    cancel() {
      this.edit = !this.edit;
      this.editedData = this.data[this.header.title];
      this.$refs.content.innerHTML = this.data[this.header.title];
    }
  },
  mounted() {
    if (this.header.type != "preview_only") {
      this.$refs.content.innerHTML = this.editedData;
    }
  }
};
</script>

<style></style>
