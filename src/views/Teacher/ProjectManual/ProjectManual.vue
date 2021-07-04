<template>
  <v-card class="ma-2 elevation-1" v-resize="onResize" tile :height="windowHeight">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :footer-props="{ disableItemsPerPage: true }"
      :search="search"
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>คู่มือปริญญานิพนธ์</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary">อัพโหลดไฟล์</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small class="mr-2" v-bind="attrs" v-on="on" @click="download(item)">mdi-download</v-icon>
          </template>
          <span>Download</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small class="mr-2" v-bind="attrs" v-on="on" @click="download(item)">mdi-open-in-new</v-icon>
          </template>
          <span>Open in new tab</span>
        </v-tooltip>

        <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>-->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    windowHeight: 0,
    headers: [
      {
        text: "ชื่อ",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "วันที่แก้ไข", value: "date" },
      { text: "ชนิดไฟล์", value: "type", sortable: false },
      { text: "ขนาด (KB)", value: "size" },
      { text: "", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    download(item) {
      alert("download " + item.name);
    },
    initialize() {
      this.desserts = [
        {
          name: "Project Manuel",
          date: "11/5/2563 05:45",
          type: "pdf",
          size: "4802541"
        },
        {
          name: "CE01 Example",
          date: "2/4/2563 12:21",
          type: "pdf",
          size: "457"
        },
        {
          name: "CE02 Example",
          date: "2/7/2563 02:34",
          type: "docx",
          size: "154218"
        }
      ];
    },
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
