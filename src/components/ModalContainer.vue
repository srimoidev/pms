<template>
  <v-dialog v-model="active" persistent class="modal-container" width="600">
    <div>
      <slot></slot>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: Boolean,
    cancellable: [Number, Boolean]
  },

  mounted() {
    window.addEventListener("keydown", this.onKeyDown);
  },

  destroyed() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    cancel() {
      if (this.cancellable) {
        this.close();
      }
    },

    close() {
      this.$emit("close");
    },

    onKeyDown(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    onClickOutside() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-container {
  width: 500px;
}
</style>
