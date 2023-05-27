<template>
  <q-page class="row items-center align-center justify-center column">
    <h2 class="font-google-sans">
      <span class="q-px-md">Merge</span>my pdf :)
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
          label="Click to add"
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
        class="bg-deep-orange-10 rounded"
        text-color="white"
        size="xl"
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

const filesList = ref<File[]>([]);

const fileName = ref<string>('file name');

const showButtons = ref<boolean>(false);

let url = ref<string>('');

let loading = ref<boolean>(false);

// Notas
// https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0

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

function createAnchor(url: string) {
  const wrapper = document.querySelector('.link-wrapper');

  const a = document.createElement('a');

  a.classList.add('anchor');

  a.href = url;

  a.download = fileName.value || 'download';

  a.innerText = `Download ${fileName.value}`;

  wrapper?.appendChild(a);
}

function removeAnchor(element: Element) {
  element.remove();
}

function setShowButtons(status: boolean) {
  showButtons.value = status;
}

async function mergePdfs() {
  if (filesList.value.length > 0) {
    const pdfMergerAdapter = new PdfMergerAdapter(
      filesList.value,
      fileName.value
    );

    try {
      await pdfMergerAdapter.addPdfFile();

      const file = await pdfMergerAdapter.saveAsBlob();

      url.value = URL.createObjectURL(file);

      setShowButtons(true);

      createAnchor(url.value);
    } finally {
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
