<template>
  <div>
    <div v-if="!entry">
      <entry
        @url="getUrl"
        :hint="url"
        :url="url"
        :label="`Google Drive Folder`"
      ></entry>
    </div>
    <div v-else>
      <frame-embedded :src="src"></frame-embedded>
    </div>
  </div>
</template>

<script>
import Entry from "@/components/Entry";
import FrameEmbedded from "@/components/FrameEmbedded";
export default {
  components: {
    Entry,
    FrameEmbedded
  },
  data() {
    return {
      url:
        "https://drive.google.com/drive/folders/1gLYh4bf8dBCBqkSi_TV3f9GKSmW1FSyk",
      entry: false,
      ggFolderId: "1gLYh4bf8dBCBqkSi_TV3f9GKSmW1FSyk",
      src:
        "https://drive.google.com/embeddedfolderview?id=1gLYh4bf8dBCBqkSi_TV3f9GKSmW1FSyk#list"
    };
  },
  methods: {
    getUrl(val) {
      this.src =
        val.replace(
          "https://drive.google.com/drive/folders/",
          "https://drive.google.com/embeddedfolderview?id="
        ) + "#list";
      this.entry = true;
    }
  }
};
</script>

<style></style>
