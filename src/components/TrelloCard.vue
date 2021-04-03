<template>
  <v-card class="card" :class="classes" :data-id="item.id">
    <v-chip
      class="ma-2 card-chip"
      v-if="item.labels.length !== 0"
      :color="item.labels[0].color"
    ></v-chip>
    <div class="icons">
      <span
        v-if="isDue"
        class="icon icon-due has-text-warning"
        :title="`Item is due on ${item.date}`"
      >
        <v-icon>{{ "mdi-star" }}</v-icon>
        <i class="fas fa-star"></i>
      </span>
      <span
        v-else-if="timestamp"
        class="icon icon-date"
        :title="`Item is due on ${item.date}`"
      >
        <v-icon>{{ "mdi-bell-alert-outline" }}</v-icon>
      </span>
      <span class="icon icon-edit" @click="edit">
        <v-icon>{{ "mdi-square-edit-outline" }}</v-icon>
      </span>
    </div>
    <div>
      <v-card-text style="padding:8px">{{ item.name }}</v-card-text>
      <v-card-subtitle v-if="item.desc">{{ item.desc }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object
  },

  computed: {
    classes() {
      return {
        "is-due": this.isDue,
        "is-overdue": this.isOverdue
      };
    },

    timestamp() {
      return Number(new Date(this.item.date));
    },

    isOverdue() {
      return this.timestamp && this.timestamp < Date.now();
    },

    isDue() {
      const date = this.timestamp;
      const due = date - 1000 * 60 * 60 * 24 * 3;
      const now = Date.now();
      return date > now && now > due;
    }
  },

  methods: {
    edit() {
      this.$emit("edit", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 5px;
  cursor: default;
}

.card-chip {
  width: 40px;
  height: 8px;
}
.card-lebel {
  position: relative;
  left: 10px;
}

.item-description {
  font-size: 0.7em;
}

.icons {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}

.is-overdue {
  color: red;
  border: 1px solid red;
}

.card:hover {
  background: rgb(247, 247, 247);
  .icon-due,
  .icon-date {
    display: none;
  }
}

.icon-edit,
.icon-date {
  color: #ddd;
}

.icon-edit {
  display: none;
  margin-right: -5px;
  .card:hover & {
    display: block;
  }
}
</style>
