<template>
  <div>
    <div class="text-center mt-16">
      <v-icon class="blue-grey--text text--lighten-5" style="font-size:86px">
        mdi-account-group-outline
      </v-icon>
    </div>
    <v-card class="mx-auto elevation-0 form-container" width="400">
      <v-card-title class="blue-grey--text text--lighten-5 justify-center">
        Login
      </v-card-title>
      <v-container>
        <ValidationObserver ref="observer">
          <ValidationProvider v-slot="{ errors }" name="Username" rules="required">
            <v-text-field
              v-model="username"
              solo
              prepend-inner-icon="mdi-account"
              label="Username"
              @keypress.enter="submit"
              :error-messages="errors"
              color="cyan accent-4"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
            <v-text-field
              v-model="password"
              solo
              prepend-inner-icon="mdi-lock"
              label="Password"
              type="password"
              @keypress.enter="submit"
              :error-messages="errors"
              color="cyan accent-4"
            ></v-text-field>
          </ValidationProvider>
        </ValidationObserver>
        <v-alert v-if="!isLoggedIn && authMsg" dense type="error">
          <span v-html="authMsg"></span>
        </v-alert>
        <v-btn dark width="100%" class="white--text cyan accent-4 elevation-1" @click="submit">Login</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
// import Auth from "@/mixins/Auth";
// import UserAuthen from "@/mixins/UserAuthen"
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is require"
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      username: null,
      password: null,
      rememberChacked: false,
      loginFail: false,
      returnUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn",
      authMsg: "authentication/msg"
    })
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          const { username, password } = this;
          this.$store.dispatch("authentication/login", { username, password });
        } catch (ex) {
          console.log(ex);
          this.loginFail = true;
        }
      }
    }
  }
};
</script>

<style>
.form-container {
  border: 3px solid rgba(236, 239, 241, 0.8) !important;
  border-radius: 16px !important;
  background: transparent !important;
}
</style>
