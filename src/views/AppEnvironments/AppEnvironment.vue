<template>
  <v-card class="ma-2 elevation-1" tile>
    <v-toolbar flat>
      <v-toolbar-title>จัดการทรัพยากร</v-toolbar-title>
    </v-toolbar>
    <span>นักเรียน</span>
    <v-divider class="ma-2"></v-divider>
    <v-container>
      <v-row no-gutters>
        <v-col cols="4">
          <span>เอกสารประกอบวิชา</span>
        </v-col>
        <v-col cols="8">
          <v-list>
            <v-list-item v-for="item in ['CE01', 'CE02']" :key="item" dense>
              <v-checkbox :label="item"></v-checkbox>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
