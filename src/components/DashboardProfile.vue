<template>
  <div>
    <v-menu v-model="menu" close-on-content-click :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar :size="size">
            <v-icon :size="size">{{ "mdi-account-circle" }}</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-card class="profile-avatar">
        <v-avatar class="mx-auto my-4" size="96">
          <v-icon size="96">{{ "mdi-account-circle" }}</v-icon>
        </v-avatar>
        <v-card-title class="mx-auto">{{
          data.User_Firstname + " " + data.User_Lastname
        }}</v-card-title>
        <v-card-subheader class="mx-auto">{{
          data.User_Email
        }}</v-card-subheader>
        <v-btn
          class="my-5 mx-auto"
          rounded
          small
          outlined
          color="grey"
          max-width="200"
          :to="`/student/profile`"
          >Manage Account</v-btn
        >
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="logout">Log out</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    size: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
      this.menu = false;
    }
  }
};
</script>

<style>
.profile-avatar {
  width: 300px;
  display: grid;
}
</style>
