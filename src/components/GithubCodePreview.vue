<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <div
          class="grey lighten-2 fill-height scrollable overflow-y-auto"
          fluid
        >
          <v-treeview
            v-model="t"
            :active.sync="active"
            :items="tree[0]"
            :open.sync="open"
            activatable
            open-on-click
            style="max-height: 84.5vh;"
          >
            >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.file === `dir`">{{
                open ? "mdi-folder-open" : "mdi-folder"
              }}</v-icon>
              <v-icon v-else-if="item.file in files">{{
                files[item.file]
              }}</v-icon>
              <v-icon v-else>{{ "mdi-file-question-outline" }}</v-icon>
            </template>
          </v-treeview>
        </div>
      </v-col>

      <v-col cols="9" :key="selected.id">
        <div v-if="isCode" class="code-preview-wraper">
          <codemirror
            :value="code"
            :options="cmOptions"
            class="scrollable"
          ></codemirror>
        </div>
        <div
          class="align-center image"
          style="background-color:#1e1e1e;height:84.5vh;align:center"
          v-else
        >
          <img :src="code" class="mx-auto" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import "codemirror/theme/base16-dark.css";
import "codemirror/theme/material-darker.css";
import "../assets/styles/vscode-dark.css";
//codemirror modes
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/markdown/markdown";

// let id = 0;
// let temp = [];
// let temp2 = [];
// let temp3 = [];
// let empty_arr = [];
// let content = "";

export default {
  watch: {
    t: function() {
      console.log(this.t);
    }
  },
  data() {
    return {
      t: [],
      isCode: "true",
      tree: [],
      code: "",
      active: [],
      open: ["public"],
      MIME_types: {
        js: "text/javascript",
        html: "text/html",
        md: "text/x-markdown",
        json: "text/javascript",
        vue: "text/x-vue"
      },

      cmOptions: {
        tabSize: 4,
        mode: "text/plain",
        theme: "vscode-dark",
        lineNumbers: true,
        line: true,
        readOnly: "nocursor"
        // more CodeMirror options...
      },

      files: {
        html: "mdi-language-html5",
        js: "mdi-language-javascript",
        json: "mdi-code-json",
        md: "mdi-language-markdown",
        pdf: "mdi-file-pdf",
        png: "mdi-file-image",
        jpg: "mdi-file-image",
        txt: "mdi-file-document-outline",
        xls: "mdi-file-excel",
        vue: "mdi-vuejs",
        c: "mdi-language-c",
        cpp: "mdi-language-cpp",
        css: "mdi-language-css3",
        php: "mdi-language-php",
        asd: "mdi-account-circle",
        ico: "mdi-file-image"
      }
    };
  },
  props: {
    repo: String
  }
  //   methods: {
  //     findById(o, id) {
  //       if (o.id === id) {
  //         return o;
  //       }
  //       var result;
  //       for (const p in o) {
  //         if (o.hasOwnProperty(p) && typeof o[p] === "object") {
  //           result = this.findById(o[p], id);
  //           if (result) {
  //             return result;
  //           }
  //         }
  //       }
  //       return result;
  //     },

  //     get_type(name) {
  //       let temp = name.split(".");
  //       return temp[temp.length - 1];
  //     },
  //     async fetch_children(url) {
  //       let temp = [];
  //       temp = await Axios.get(url).then(async res => {
  //         // console.log(res.data.tree[0])
  //         for (const i in res.data.tree) {
  //           if (res.data.tree[i].type === "tree") {
  //             res.data.tree[i].id = id++;
  //             res.data.tree[i].type_n = "0";
  //             res.data.tree[i].children = await this.fetch_children(
  //               res.data.tree[i].url
  //             );
  //             res.data.tree[i].name = res.data.tree[i].path;
  //             res.data.tree[i].file = "dir";
  //           } else {
  //             res.data.tree[i].id = id++;
  //             res.data.tree[i].type_n = "1";
  //             res.data.tree[i].name = res.data.tree[i].path;
  //             res.data.tree[i].file = this.get_type(res.data.tree[i].name);
  //             res.data.tree[i].git_url = res.data.tree[i].url;
  //           }
  //         }

  //         return res.data.tree;
  //       });
  //       return temp.sort((a, b) => a.type_n - b.type_n);
  //     },
  //     async fetch_content() {
  //       this.tree.push(
  //         await Axios.get(
  //           "http://api.github.com/" + "repos/" + this.repo + "/contents"
  //         ).then(async res => {
  //           for (const i in res.data) {
  //             if (res.data[i].type === "dir") {
  //               res.data[i].file = "dir";
  //               res.data[i].id = id++;
  //               res.data[i].type_n = "0";
  //               res.data[i].children = await this.fetch_children(
  //                 res.data[i].git_url
  //               );
  //             } else {
  //               res.data[i].type_n = "1";
  //               res.data[i].id = id++;
  //               res.data[i].file = this.get_type(res.data[i].name);
  //             }
  //           }
  //           return res.data;
  //         })
  //       );
  //       this.tree[0].sort((a, b) => a.type_n - b.type_n);
  //       sessionStorage.setItem("githubRepoDetail", JSON.stringify(this.tree));
  //     }
  //   },
  //   computed: {
  //     async selected() {
  //       let sel = [];
  //       if (!this.active.length) return undefined;
  //       const selected_id = this.active[0];
  //       for (const i in this.tree[0]) {
  //         if (this.tree[0][i].id === selected_id) {
  //           sel = this.tree[0][i];
  //           break;
  //         } else {
  //           if (this.tree[0][i].children !== undefined) {
  //             sel = this.findById(this.tree[0][i].children, selected_id);
  //             if (sel !== undefined) {
  //               break;
  //             }
  //           }
  //         }
  //       }
  //       if (sel.type === "file" || sel.type === "blob") {
  //         await Axios.get(sel.git_url).then(res => {
  //           // console.log(sel.file)
  //           if (sel.file === "ico" || sel.file === "png" || sel.file === "jpg") {
  //             this.isCode = false;
  //             this.code =
  //               "data:image/" +
  //               sel.file +
  //               ";base64," +
  //               res.data.content.split("\n").join("");
  //           } else {
  //             this.isCode = true;
  //             this.cmOptions.mode = this.MIME_types[sel.file];
  //             this.code = atob(res.data.content);
  //           }
  //         });
  //       }
  //     }
  //   },
  //   mounted() {
  //     id = 0;
  //     if (JSON.parse(sessionStorage.getItem("githubRepoDetail")) == null) {
  //       this.fetch_content();
  //     } else {
  //       this.tree = JSON.parse(sessionStorage.getItem("githubRepoDetail"));
  //     }
  //   }
};
</script>

<style lang="scss">
.CodeMirror {
  height: 84.5vh !important;
}
// .CodeMirror-vscrollbar{
//   color: #666666;
// }
.CodeMirror-vscrollbar::-webkit-scrollbar-thumb {
  color: #666666ff;
}
.image {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  left: 25%;
}
</style>
