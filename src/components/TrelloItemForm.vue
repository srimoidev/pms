<template>
  <div class="query-form card">
    <div class="card-content">
      <h2 class="title">New task</h2>
      <v-text-field
        label="Title"
        v-model="name"
        :rules="[rules.required]"
        @enter="validate"
      ></v-text-field>
      <v-textarea label="Description" v-model="desc"></v-textarea>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted"
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
      <div class="button-wrap">
        <item-button type="primary" @click="validate">{{
          id ? "Update" : "Add"
        }}</item-button>
        <item-button type="text" @click="cancel">Cancel</item-button>
      </div>
    </div>
  </div>
</template>

<script>
import ItemButton from "./TrelloItemFormButton";
function data() {
  return {
    id: null,
    title: "",
    description: "",
    date: null,
    message: "",
    menu2: false,
    rules: {
      required: value => !!value || "Required."
    }
  };
}
export default {
  components: {
    ItemButton
  },
  data() {
    return data();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    values() {
      return this.$data;
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    validate() {
      if (this.title) {
        return this.submit();
      }
      this.message = "Please complete the required fields!";
    },
    show(data) {
      Object.assign(this, data);
      this.$el.querySelector("input").focus();
    },
    submit() {
      this.$emit("submit", this.values);
      this.reset();
    },
    reset() {
      Object.assign(this, data());
    },
    cancel() {
      this.$emit("cancel", this.values);
    }
  }
};
</script>

<style lang="scss">
.button-wrap {
  display: inline-flex;
}
</style>
