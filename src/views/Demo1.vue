<template>
  <div class="demo1">
    <h1>{{ title }}</h1>
    <span>{{ counter }}</span>
    <button @click="count">add</button><br />
    <span v-if="test != ''">hello {{ test }}</span>
    <input type="text" v-model="test" />
    <button @click="test = ''">reset</button>
    <p>{{ fullname() }}</p>
    <img
      :src="Image.ImageURL"
      :width="Image.ImageWidth"
      :height="Image.ImageHeight"
    />
    <a :href="Link" :target="Target">MERLIN-ANIME</a>
    <p :class="[{ active: isActive }, hasError]">Class</p>
    <p :style="StyleObject">Style</p>
  </div>
</template>

<script>
export default {
  name: "demo1",
  data() {
    return {
      title: "this is a demo1 page",
      counter: 0,
      test: "",
      firstname: "srimoi",
      lastname: " dev",
      Image: {
        URL: "https://merlin-anime.com/assets/img/logo.png?v=1000",
        Width: 200,
        Height: 100,
      },
      Link: "https://merlin-anime.com",
      Target: "_blank",
      StyleObject: {
        color: "darkred",
        fontSize: "50px",
        fontWeight: "bold",
      },
      isActive: true,
      hasError: "error",
    };
  },
  methods: {
    count() {
      this.counter = this.counter + 1;
    },
    fullname() {
      return this.firstname + " " + this.lastname;
    },
  },
};
</script>

<style>
.active {
  font-weight: bold;
  font-size: 90px;
}
.error {
  color: red;
}
</style>
