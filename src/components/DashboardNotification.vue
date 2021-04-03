<template>
  <div>
    <v-menu
      v-model="notif"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-badge :content="noti_count" color="red" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="400" tile>
        <v-list three-line>
          <v-subheader>Notifications</v-subheader>
          <v-list-item-group v-model="noti_count" color="primary">
            <v-list-item
              v-for="(item, i) in noti"
              :key="i"
              :inactive="inactive"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-if="twoLine || threeLine"
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    noti: Array
  },
  data() {
    return {
      noti_count: 5,
      twoLine: true,
      notif: false,
      inactive: false
    };
  }
};
</script>

<style></style>
