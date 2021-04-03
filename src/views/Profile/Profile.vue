<template>
  <div class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="2" md="3" align="center">
        <v-container>
          <v-avatar tile color="indigo" size="160">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </v-container>
      </v-col>
      <v-col cols="10" sm="6" md="9">
        <v-list class="grey lighten-5">
          <v-list-item v-for="(item, i) in user" :key="i">
            <v-list-item-content>
              <v-list-item-title
                v-text="item.name"
                class="headline"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.position"
                class="blue--text text--lighten-2"
              ></v-list-item-subtitle>
              <v-header class="pt-5"
                >Personal Informations<v-divider></v-divider
              ></v-header>
              <v-row>
                <v-col md="2">
                  <v-list-item-title class="py-5">Phone</v-list-item-title>
                  <v-list-item-title class="py-5">Address</v-list-item-title>
                  <v-list-item-title class="py-5">E-mail</v-list-item-title>
                </v-col>
                <v-col md="7">
                  <v-list-item-title class="py-5"
                    >061-3300130</v-list-item-title
                  >
                </v-col>
              </v-row>
              <v-header class="pt-5"
                >Education Informations<v-divider></v-divider
              ></v-header>
              <v-row>
                <v-col md="2">
                  <v-list-item-title class="py-5">Course</v-list-item-title>
                </v-col>
                <v-col md="7">
                  <v-list-item-title class="py-5"
                    >Faculty of Computer Engineering</v-list-item-title
                  >
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [{ name: "Ponlachet Kammung", position: "Developer" }]
    };
  }
};
</script>

<style></style>
