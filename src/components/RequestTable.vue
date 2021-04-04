<template>
  <v-card class="ma-2" tile style="height:inherit">
    <v-data-table
      :headers="allGroupHeaders"
      :items="filteredItems"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      class="elevation-1"
      :height="windowHeight"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            Manage Group
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-2"
          ></v-text-field>
          <v-select
            v-model="typeFilter"
            :items="projectType"
            item-text="ProjectType_Name"
            item-value="ProjectType_ID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width:1%"
          ></v-select>
          <v-select
            v-model="statusFilter"
            :items="projectStatus"
            item-text="ProjectStatus_Name"
            item-value="ProjectStatus_ID"
            hide-details
            outlined
            dense
            label="Status"
            style="width:2%"
          ></v-select>
        </v-toolbar>
      </template>
      <template v-slot:[`item.ProjectType_Name`]="{ item }">
        <v-chip
          class=" white--text"
          :class="`type-${item.ProjectType_ID}`"
          small
        >
          {{ item.ProjectType_Name }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_MaxMember`]="{ item }">
        {{ 1 + " / " + item.Project_MaxMember }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
          mdi-magnify
        </v-icon>
      </template>
      <template v-slot:[`item.Project_StatusID`]="{ item }">
        <group-status :status="item.Project_StatusID"></group-status>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>