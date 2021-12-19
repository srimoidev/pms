<template>
  <div>
    <v-menu v-model="notif" :close-on-content-click="false" :nudge-width="200" offset-y max-height="80%">
      <template v-slot:activator="{ on }">
        <v-btn v-if="noti.length > 0" icon v-on="on">
          <v-badge :content="noti_count" color="red" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <v-btn v-else icon v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="400" tile>
        <v-list three-line>
          <v-subheader>Notifications</v-subheader>
          <v-list-item-group v-model="noti_count">
            <v-list-item v-for="(item, i) in noti" :key="i">
              <v-list-item-avatar>
                <v-img :src="item.ProfileImage"></v-img>
              </v-list-item-avatar>
              <v-list-item-content :class="{ 'grey--text': item.IsRead }">
                <v-list-item-title v-html="item.Title"></v-list-item-title>
                <v-list-item-subtitle v-if="twoLine || threeLine" :class="{ 'grey--text': item.IsRead }">
                  <span :class="{ 'grey--text text--darken-3': !item.IsRead }">{{ item.CreatedUser.Firstname + " " + item.CreatedUser.Lastname }}</span> &mdash; {{ item.Message }}
                </v-list-item-subtitle>
                <span :class="{ 'grey--text': item.IsRead, 'primary--text': !item.IsRead }" class=" caption">{{ item.TimeInterval }}</span>
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
    noti: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    noti_count() {
      return this.noti.filter(item => !item.IsRead).length;
    }
  },
  data() {
    return {
      twoLine: true,
      notif: false,
      inactive: false
    };
  }
};
</script>

<style></style>
