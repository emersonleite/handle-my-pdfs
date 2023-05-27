<template>
  <q-layout>
    <q-header class="bg-grey-10">
      <div class="row">
        <q-btn @click="changeTheme">Change Theme</q-btn>
        <q-item :to="{ name: 'index-page' }">Merge</q-item>
        <q-item :to="{ name: 'remove-page' }">Split</q-item>
        <q-item :to="{ name: 'remove-page' }">Remove</q-item>
      </div>
    </q-header>
    <router-view />
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

function changeTheme() {
  $q.dark.toggle();
}
</script>
