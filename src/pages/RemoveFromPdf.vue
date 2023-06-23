<template>
  <q-page class="row items-center align-center justify-center column">
    <h2 class="font-google-sans">
      <span class="q-px-md text-grad">Remove</span>from my pdf :)
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
      </div>
    </div>

    <p class="">Enter intervals</p>

    <q-form style="width: 100%" ref="intervalForm" @submit="submitForm">
      <div
        class="row justify-center full-width"
        v-for="(input, index) in pageIntervalsC"
        :key="index"
      >
        <div class="col col-2">
          <q-input
            :rules="[isPositive]"
            v-model="pageIntervalsC[index].start"
            outlined
            type="number"
          />
        </div>
        <div class="col col-2">
          <q-input
            :rules="[
              isPositive,
              isBiggerThanStart(value, pageIntervalsC[index].start),
              ...isBiggerThanStart(pageIntervalsC[index].start),
            ]"
            v-model="pageIntervalsC[index].end"
            outlined
            type="number"
          />
        </div>

         <div class="col col-1">
          <q-btn
          @click="removeInterval(index)"
            class="btn-grad rounded"
            text-color="white"
            size="sm"
            rounded
            no-caps
            > - </q-btn
          >
        </div>

        <div class="col col-1">
          <q-btn
            :loading="loading"
            @click="addInterval"
            class="btn-grad rounded"
            text-color="white"
            size="sm"
            rounded
            no-caps
            ><span class="font-google-sans-text">+</span></q-btn
          >
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PdfRemoveAdapter } from '../adapters/PdfRemove.adapter';
import createAnchor from '../utils/createAnchor';
import { verifyIntervalEntry } from '../validators/verifyIntervalEntry';
import { extractIntervals  } from '../utils/extractIntervals';

const pageIntervalsC = ref<{ start: number; end: number }[]>([
  {
    start: 0,
    end: 0,
  },
]);

const filesListOne = ref<File>();

const fileName = ref<string>('file name');

const showButtons = ref<boolean>(false);

const pageIntervals = ref<string>('');

const intervalForm = ref<null>(null);

let url = ref<string>('');

let loading = ref<boolean>(false);

const isMounted = ref<boolean>(false);

onMounted(() => {
  isMounted.value = true;
});

function addInterval(): void {
  pageIntervalsC.value.push({
    start: 0,
    end: 0,
  });
}

function removeInterval(index: number):void {
  delete pageIntervalsC.value[index]
  pageIntervalsC.value = pageIntervalsC.value.filter(item => item)
}

function submitForm() {
  try {
    console.log('try');
  } catch (err) {
    console.log(err);
  } finally {
    console.log('finally');
  }
}



/* async function removePage() {
  if (filesListOne.value) {
    const pdfRemove = new PdfRemoveAdapter(
      filesListOne.value,
      extractIntervals(pageIntervals.value)
    );

    const file = await pdfRemove.getFileAsBlob();

    if (file) url.value = URL.createObjectURL(file);

    createAnchor({ url: url.value, fileName: fileName.value });
  }
} */

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

/* function setShowButtons(status: boolean) {
  showButtons.value = status;
} */

/* function verifyIntervalEntryField(intervalContent: string) {
  return verifyIntervalEntry(intervalContent) || 'Intervalo inválido.';
} */

/* Validações - EBLE - colocar fora */
function isPositive(value: string) {
  return Number(value) > 0 || 'Deve ser maior que zero';
}

const isBiggerThanStart = (start: string) => [
  (end: string) =>
    Number(end) >= Number(start) ||
    'A página final deve ser maior ou igual à inicial.',
];
/* Validações - EBLE - colocar fora */
</script>

<style lang="scss" scoped>
/* .body--light {
  
} */

/* .body--dark {
  background: #656565 !important;
} */
</style>
