<template>
  <div>
    <div v-if="!loaded">
      <loader></loader>
    </div>
    <div :class="{ 'frame-container': loaded }" fill-height>
      <iframe
        :src="src"
        ref="frame"
        @load="load"
        v-show="loaded"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  components: {
    Loader
  },
  data() {
    return {
      loaded: false
    };
  },
  props: {
    src: String
  },
  methods: {
    load() {
      this.loaded = true;
    }
  }
};
</script>
<style>
.frame-container {
  width: 100%;
  height: 91vh;
}
</style>
