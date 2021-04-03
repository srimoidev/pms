<template>
  <div class="input-repo">
    <div class="text-field">
      <v-text-field
        v-model="url"
        :label="label"
        :hint="hint"
        append-icon="mdi-send"
        outlined
        dense
        autofocus
        @click:append="onClick"
        @keydown.enter="onEnter"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    url: String,
    hint: String,
    label: String
  },
  methods: {
    onEnter() {
      this.$emit("url", this.url);
    },
    onClick() {
      this.$emit("url", this.url);
    }
  }
};
</script>

<style>
.input-repo {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.text-field {
  margin: 0 auto;
  width: 500px;
}
</style>
