<template>
  <div class="hello">
    <input type="text" v-model="fileurl" />
    <button @click="handleImport">Import</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { importBibleTranslation } from "@/shared/bibleService.ts";

@Component
export default class BibleImport extends Vue {
  @Prop() private msg!: string;
  fileurl: string = "";

  handleImport(){
    importBibleTranslation(this.fileurl);
  }
}
</script>
