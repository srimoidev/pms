<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in documents"
        :key="index"
        cols="12"
        xl="3"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card
          max-width="250"
          class="mx-auto"
          img="https://picsum.photos/1920/1080?random"
        >
          <v-app-bar
            v-if="item.Status == 'Approved'"
            color="transparent"
            dark
            dense
            flat
          >
            {{ item.Name }}
            <span>
              <v-icon>mdi-check-decagram</v-icon>
            </span>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-app-bar>
          <v-app-bar
            v-else-if="item.Status == 'Declined'"
            color="transparent"
            dark
            dense
            flat
          >
            {{ item.Name }}
            <span>
              <v-icon>mdi-times</v-icon>
            </span>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-app-bar>
          <v-list-item>
            <v-list-item-content>
              <div
                v-if="item.Status == 'Approved'"
                class="overline white--text"
              >
                Approved
              </div>
              <div
                v-else-if="item.Status == 'Declined'"
                class="overline white--text"
              >
                Declined
              </div>
            </v-list-item-content>
          </v-list-item>
          <div class="overline mx-4 white--text">
            {{ item.CreatedDate }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      documents: [
        {
          Name: "CE01",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Approved",
          Comment: 5,
        },
        {
          Name: "CE02",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
        {
          Name: "CE03",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
        {
          Name: "CE04",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
        {
          Name: "CE05",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
        {
          Name: "CE06",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
        {
          Name: "CE07",
          CreatedBy: "Mr.Robot",
          CreatedDate: "Dec 20, 2020",
          Status: "Declined",
          Comment: 5,
        },
      ],
    };
  },
};
</script>

<style></style>
