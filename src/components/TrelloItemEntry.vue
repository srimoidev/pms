<template>
  <div>
    <v-text-field
      :placeholder="placeholder"
      outlined
      dense
      single-line
      append-outer-icon="mdi-send"
      @click:append-outer="onClick"
      @keydown.enter="onEnter"
    ></v-text-field>
  </div>
</template>

<script>
/**
 * @emits {id, text, more}   enter
 */
export default {
  props: {
    listId: [String, Number],
    placeholder: String,
    icon: {
      type: String,
      default: "angle-right"
    }
  },

  data() {
    return {
      input: ""
    };
  },

  methods: {
    onEnter($event) {
      this.emit($event.metaKey || $event.ctrlKey);
    },

    onClick() {
      this.emit(true);
    },

    emit(more) {
      if (this.input) {
        this.$emit("enter", {
          id: this.listId,
          text: this.input,
          more
        });
        this.input = "";
      }
    }
  }
};
</script>

<style lang="scss">
.ui-item-entry {
  margin: 5px;
}
</style>
