<template>
  <div>
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined color="blue darken-1" v-on="on"
          >Clone or Download</v-btn
        >
      </template>
      <v-card class="mx-auto" max-width="300" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Clone with HTTPS</v-list-item-title>

            <v-list-item-subtitle
              >Use Git or checkout with SVN using the web
              URL.</v-list-item-subtitle
            >
            <v-text-field
              v-model="url"
              single-line
              outlined
              dense
              append-icon="mdi-clipboard-text-multiple-outline"
              @click:append="copyText"
              ref="textToCopy"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text>Downlaod ZIP</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    url: String
  },
  methods: {
    copyText() {
      let textToCopy = this.$refs.textToCopy.$el.querySelector("input");
      textToCopy.select();
      document.execCommand("copy");
    }
  }
};
</script>

<style></style>
