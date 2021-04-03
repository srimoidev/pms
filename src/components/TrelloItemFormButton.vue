<template>
  <div class="modal-btn">
    <!-- <button type="button"
            :class="`button is-${type}`"
            @click="$emit('click')"
            v-bind="$attrs"
    > -->
    <v-btn @click="$emit('click')" v-bind="$attrs">
      <slot
        ><v-icon>{{ "mdi-dots-horizontal" }}</v-icon></slot
      >
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style lang="scss">
.modal-btn {
  padding: 5px;
}
</style>
