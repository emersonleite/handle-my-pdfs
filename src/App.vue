<template>
  <q-layout>
    <q-header class="bg-grey-10">
      <div class="row">
        <q-btn @click="changeTheme">Change Theme</q-btn>
        <q-item class="font-google-sans-mono" :to="{ name: 'merge-pdf' }"
          >Merge</q-item
        >
        <q-item class="font-google-sans-mono" :to="{ name: 'split-pdf' }"
          >Split</q-item
        >
        <q-item class="font-google-sans-mono" :to="{ name: 'remove-page' }"
          >Remove</q-item
        >
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
