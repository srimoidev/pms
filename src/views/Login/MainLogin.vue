<template>
  <div class="form-container">
    <v-card class="login">
      <v-avatar size="96" class="avatar">
        <v-icon size="80" color="white">mdi-account-outline</v-icon>
      </v-avatar>
      <div class="form-login">
        <v-card-title class="d-block">Login</v-card-title>
        <div class="mx-8">
          <ValidationObserver ref="observer">
            <form>
              <ValidationProvider
                v-slot="{ errors }"
                name="Username"
                rules="required"
              >
                <v-text-field
                  v-model="username"
                  label="ID"
                  :error-messages="errors"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Password"
                rules="required"
              >
                <v-text-field
                  v-model="password"
                  label="Password"
                  :error-messages="errors"
                  prepend-inner-icon="mdi-lock"
                  @keydown.enter="submit"
                  type="password"
                ></v-text-field>
              </ValidationProvider>
              <v-btn class="my-5" width="100%" color="primary" @click="submit"
                >Login</v-btn
              >
              <div class="d-flex">
                <!-- <v-checkbox
                  v-model="rememberChecked"
                  label="Remember me"
                ></v-checkbox> -->
                <v-spacer></v-spacer>
                <span class="forget-password">Forgot Password?</span>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <v-alert v-if="isLoggedIn.loggedIn == false" dense type="error"
          >Incorrect <strong>Username</strong> or <strong>Password</strong>
        </v-alert>
      </div>
    </v-card>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import Auth from "@/mixins/Auth";
// import { required, email, max, length } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { mapGetters } from "vuex";
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
      rememberChacked: false
    };
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        Auth.login(this.username, this.password);
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/loggedIn"
    })
  }
};
</script>

<style>
.form-container {
  height: 70vh;
  position: relative;
}
.login {
  background-color: rgba(255, 255, 255, 0.6) !important;
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.avatar {
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
  background-color: #1976d2bb;
  top: -48px;
}
.forget-password {
  margin-top: 16px;
  padding-top: 4px;
  color: #00000099;
}
.form-login {
  position: absolute;
  top: 60px;
  width: inherit;
}
</style>
