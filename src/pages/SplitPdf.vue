<template>
  <q-page class="row items-center align-center justify-center column">
    <h2 class="font-google-sans">
      <span class="q-px-md text-grad">Split</span>my pdf :)
    </h2>
    <div class="row justify-center full-width">
      <div class="col col-6">
        <q-file
          borderless
          color="orange"
          counter
          hide-hint
          :use-chips="true"
          label="Click select pdf"
          outlined
          v-model="filesListOne"
          accept=".pdf"
          @click="resetButton"
        ></q-file>

        <q-input v-model="pageIntervals" outlined type="text" />
      </div>
    </div>

    <div class="row q-mt-md">
      <q-btn
        :loading="loading"
        @click="splitPdf"
        class="btn-grad rounded"
        text-color="white"
        size="lg"
        rounded
        no-caps
        ><span class="font-google-sans-text">Split pdf</span></q-btn
      >
    </div>

    <div class="row q-mt-md">
      <div class="link-wrapper"></div>
      <div v-if="showButtons">
        <q-btn no-caps @click="viewPdfOnAnotherWindow(url)"
          >View {{ fileName }}</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import createAnchor from '../utils/createAnchor';
import { PdfSplitAdapter } from '../adapters/PdfSplit.adapter';

const filesListOne = ref<File>();

const fileName = ref<string>('file name');

const showButtons = ref<boolean>(false);

const pageIntervals = ref<string>('');

let url = ref<string>('');

let loading = ref<boolean>(false);

async function splitPdf() {
  if (filesListOne.value) {
    const pdfSplitAdapter = new PdfSplitAdapter(filesListOne.value, [
      { start: 1, end: 9 },
      { start: 10, end: 19 },
    ]);

    console.log(pdfSplitAdapter);

    const file = await pdfSplitAdapter.getFileAsBlob();

    if (file) {
      url.value = URL.createObjectURL(file);

      createAnchor({ url: url.value, fileName: fileName.value });
    }
  }
}

function viewPdfOnAnotherWindow(url: string) {
  window.open(url);
}

function resetButton() {
  showButtons.value = false;

  const anchor = document.querySelector('.anchor');

  if (anchor) {
    removeAnchor(anchor);
  }
}

function removeAnchor(element: Element) {
  element.remove();
}

function setShowButtons(status: boolean) {
  showButtons.value = status;
}
</script>

<style lang="scss" scoped>
/* .body--light {
  
} */

/* .body--dark {
  background: #656565 !important;
} */
</style>
