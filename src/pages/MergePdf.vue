<template>
  <q-page class="row items-center align-center justify-center column">
    <h2 class="font-google-sans">
      <span class="q-px-md text-grad">Merge</span>my pdf :)
    </h2>
    <div class="row justify-center full-width">
      <div class="col col-6">
        <q-file
          borderless
          color="orange"
          counter
          max-files="200"
          multiple
          hide-hint
          :use-chips="true"
          label="Click select pdf"
          outlined
          v-model="filesList"
          accept=".pdf"
          @click="resetButton"
        ></q-file>
      </div>
    </div>
    <div v-if="!showButtons" class="row q-mt-md">
      <q-btn
        :loading="loading"
        @click="mergePdfs"
        class="btn-grad rounded"
        text-color="white"
        size="lg"
        rounded
        no-caps
        ><span class="font-google-sans">Merge pdfs</span></q-btn
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
import { PdfMergerAdapter } from '../adapters/PdfMerger.adapter';
import createAnchor from '../utils/createAnchor';

const filesList = ref<File[]>([]);

const fileName = ref<string>('file name');

const showButtons = ref<boolean>(false);

let url = ref<string>('');

let loading = ref<boolean>(false);

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

async function mergePdfs() {
  if (filesList.value.length > 0) {
    try {
      const pdfMerger = new PdfMergerAdapter(filesList.value);

      const file = await pdfMerger.getFileAsBlob();

      if (file) {
        url.value = URL.createObjectURL(file);

        createAnchor({ url: url.value, fileName: fileName.value });

        setShowButtons(true);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
/* .body--light {
} */

/* .body--dark {
  background: #656565 !important;
} */
</style>
