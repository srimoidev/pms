<template>
  <div style="height:100%">
    <v-card color="grey lighten-4" flat tile height="100%">
      <v-toolbar dense>
        <v-toolbar-title v-text="github_projectName"></v-toolbar-title>
        <v-spacer></v-spacer>
        <clone-menu :url="github_url"></clone-menu>
        <v-icon>{{ "mdi-cog-outline" }}</v-icon>
      </v-toolbar>
      <div>
        <div v-if="github_repoStatus">
          <code-preview :repo="github_repo"></code-preview>
        </div>
        <div v-else>
          <entry
            @url="getRepoDetails"
            :hint="hint"
            :url="`https://github.com/peteblackbone/PMS`"
            :label="`Github Repository`"
          ></entry>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
import CodePreview from "@/components/GithubCodePreview";
import Entry from "@/components/Entry";
import CloneMenu from "@/components/GithubCloneMenu";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CodePreview,
    Entry,
    CloneMenu
  },
  computed: {
    ...mapGetters({
      github_repoStatus: "github/repoStatus",
      github_repo: "github/repo",
      github_projectName: "github/projectName",
      github_url: "github/cloneUrl"
    })
  },
  data: () => ({
    hint: "https://github.com/owner/repos"
  }),
  methods: {
    ...mapActions({
      updateRepo: "github/updateRepoAction"
    }),
    async getRepoDetails(url) {
      const repoDetailUrl = url.replace(
        "https://github.com/",
        "https://api.github.com/repos/"
        // "http://localhost:3000/repos/"
      );
      const repoDetail = await Axios.get(repoDetailUrl).then(res => {
        return res.data;
      });
      this.updateRepo(repoDetail);
    }
  }
};
</script>

<style></style>
