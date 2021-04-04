<template>
  <div ref="bg" class="board-bg">
    <v-app-bar dense>
      <v-toolbar-title>{{ board.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-for="(item, index) in board.memberships" :key="index">
        <member
          :initial="item.initials"
          :fullname="item.fullName"
          :username="item.username"
        ></member>
      </div>
    </v-app-bar>
    <div v-if="token" class="board scrollable">
      <Container
        lock-axis="x"
        orientation="horizontal"
        drag-handle-selector=".list-drag-handle"
        @drop="onListDrop"
      >
        <Draggable v-for="(list, listIndex) in board.lists" :key="list.id">
          <section class="list-container " ref="list" :data-id="list.id">
            <div class="list-header">
              <span class="list-drag-handle">&#x2630;</span>
              {{ list.name }}
            </div>

            <Container
              group-name="list"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              non-drag-area-selector=".icon"
              :animation-duration="100"
              @drop="e => onCardDrop(e, list, listIndex)"
              class="item-container scrollable"
            >
              <Draggable v-for="item in list.items" :key="item.id">
                <trello-Card :item="item" @edit="editItem" />
              </Draggable>
            </Container>

            <div class="item-entry">
              <item-entry
                :list-id="list.id"
                placeholder="Add an item"
                icon="ellipsis-h"
                @enter="onAddItem"
              />
            </div>
          </section>
        </Draggable>
        <div class="new-list">
          <item-entry placeholder="Add a list" @enter="onAddList" />
        </div>
      </Container>
    </div>
    <div v-else class="overflow-y-auto">
      <!-- <v-btn @click="Oauth">login with trello</v-btn> -->
      <!-- <v-btn @click="selectBoard">aaa</v-btn> -->
      <div style="display:flex;height:77vh">
        <div v-for="(item, index) in boards" :key="index"></div>
      </div>
      <div>
        <v-btn style="align:left">next</v-btn>
      </div>
    </div>

    <item-modal ref="modal" :active="modal" :cancellable="1" @close="hideModal">
      <item-form ref="form" @submit="onAddFullItem" @cancel="hideModal" />
    </item-modal>
    <!-- <div v-if="!entry">
      <entry @url="getUrl" :hint="hint" :url="`https://trello.com/b/igpjC3Q2`" :label="`Trello Board`"></entry>
    </div>
<div v-else>
  <frame-embedded :src="src"></frame-embedded>
    </div>-->
  </div>
</template>

<script>
//library
// import { makeDropHandler } from "@/utils/plugins";
// import Axios from "axios";
// import Trello from "@/utils/Trello";
import { Container, Draggable } from "vue-smooth-dnd";
//components
// import FrameEmbedded from "@/components/FrameEmbedded";
// import Entry from "@/components/Entry";
import TrelloCard from "@/components/TrelloCard";
import ItemForm from "@/components/TrelloItemForm";
import ItemEntry from "@/components/TrelloItemEntry";
import ItemModal from "@/components/ModalContainer";
import Member from "@/components/TrelloMember";

export default {
  components: {
    Container,
    Draggable,
    ItemEntry,
    ItemForm,
    ItemModal,
    TrelloCard,
    // FrameEmbedded,
    // Entry,
    Member
  },
  data() {
    return {
      src: "https://trello.com/b/igpjC3Q2.html",
      // src:"https://trello.com/b/kihdVcCZ.html",
      onLoad: true,
      modal: false,
      activeListId: null,
      project_name: "",
      input: "",
      token: true,
      hint: "https://trello.com/b/igpjC3Q2",
      // board: JSON.parse(sessionStorage.getItem("TrelloBoardDetail")),
      board: null,
      members: []
    };
  },

  computed: {
    lists() {
      return this.$store.state.board.lists;
    }
  },

  methods: {
    // async selectBoard() {},
    // async fetchBoardData() {
    //   if (this.board == null) {
    //     this.board = JSON.parse(sessionStorage.getItem("TrelloBoardDetail"));
    //     console.log(this.board);
    //   } else {
    //     console.log(this.board);
    //   }
    //   // else {
    //   //   this.board = sessionStorage.getItem("TrelloBoardDetail");
    //   //   console.log(JSON.parse(sessionStorage.getItem("TrelloBoardDetail")));
    //   // }
    //   // this.board.prefs.backgroundImage
    //   //   ? (this.$refs.bg.style.backgroundImage =
    //   //       "url(" + this.board.prefs.backgroundImage + ")")
    //   //   : (this.$refs.bg.style.backgroundColor = this.board.prefs.backgroundColor);
    // },
    // Oauth() {
    //   window.open(
    //     "http://localhost:3000/login",
    //     "_blank",
    //     "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    //   );
    // },
    // onAddList({ text }) {
    //   this.$store.commit("addList", { title: text });
    //   this.$nextTick(() => {
    //     const lists = this.$refs.list;
    //     lists[lists.length - 1].querySelector("input").focus();
    //   });
    // },
    // onAddItem({ id, text, more }) {
    //   if (more) {
    //     this.activeListId = id;
    //     this.modal = true;
    //     this.showModal({ title: text });
    //     return;
    //   }
    //   this.addItem(id, text);
    // },
    // onAddFullItem(item) {
    //   item.id
    //     ? this.$store.commit("updateItem", { itemId: item.id, ...item })
    //     : this.addItem(
    //         this.activeListId,
    //         item.title,
    //         item.description,
    //         item.date
    //       );
    //   this.hideModal();
    // },
    // addItem(listId, title, description, date) {
    //   this.$store.commit("addItem", { listId, title, description, date });
    // },
    // editItem(item) {
    //   this.showModal(item);
    // },
    // onListDrop: makeDropHandler("onListDropComplete"),
    // onListDropComplete: function(src, trg) {
    //   this.$store.commit("moveList", [src.index, trg.index]);
    // },
    // onCardDrop: makeDropHandler("onCardDropComplete"),
    // onCardDropComplete(src, trg) {
    //   this.$store.commit("moveItem", [
    //     src.params[1],
    //     src.index,
    //     trg.params[1],
    //     trg.index
    //   ]);
    // },
    // showModal(item) {
    //   this.modal = true;
    //   this.$nextTick(() => {
    //     this.$refs.form.show(item);
    //   });
    // },
    // hideModal() {
    //   this.focusInput(this.activeListId);
    //   this.modal = false;
    // },
    // focusInput(listId) {
    //   const index = this.lists.findIndex(list => list.id === listId);
    //   if (index > -1) {
    //     this.$refs.list[index].querySelector("input").focus();
    //   }
    // },
    // reset() {
    //   this.$store.commit("reset");
    //   // if (confirm("Are you sure you want to reset the board?")) {
    //   // }
    // }
  },
  mounted() {
    // this.selectBoard();
    // this.reset();
    // this.fetchBoardData();
  },
  beforeMount() {
    // Trello.getBoardDetail();
  }
};
</script>

<style lang="scss">
.board-bg {
  background-size: cover;
}
.item-container {
  overflow-y: auto;
  padding: 0 5px;
  min-height: 0px;
  max-height: 60vh;
}
.board {
  overflow-y: auto;
  max-height: 84.5vh;
  height: 84.5vh;
  white-space: nowrap;
  > * {
    display: inline-block;
  }

  .new-list {
    margin: 10px 10px;
  }
}

$column-width: 320px;

.list-container {
  width: $column-width;
  padding: 5px;
  margin: 5px;
  margin-right: 20px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
}

.lists-container {
  > * {
    display: inline-block;
    vertical-align: top;
  }
}

.list-header {
  margin: 5px 0 10px 0;
  color: rgb(39, 39, 39);
}

.card {
  margin-bottom: 5px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
}

.card-ghost {
  transition: 0.25s all;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  transform: scale(1.1);
}

.card-ghost-drop {
  transform: scale(1);
}

.list-header {
  font-size: 18px;
}

.list-drag-handle {
  cursor: move;
  padding: 5px;
}

.item-entry {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
}

.new-list {
  width: $column-width;
  margin-left: -10px;
}

.clear-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
