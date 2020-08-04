<template>
  <div class="hello">
    <input type="text" v-model="fileurl" />
    <button :disabled="loading" @click="handleImport">Import</button>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { importBibleTranslation } from "@/shared/bibleService.ts";

@Component
export default class BibleImport extends Vue {
  @Prop() private msg!: string;
  fileurl: string = "";
  loading: boolean = false;
  external = "./js/pizzip.js";

  handleImport(){
    this.loading = true;
    importBibleTranslation(this.fileurl)
      .catch((err) => console.log(err))
      .finally(()=> this.loading = false);
  }

  mounted(){
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', this.external)
    document.head.appendChild(externalScript)
  }

  destroyed(){
    const el = document.querySelector('script[src="' + this.external + '"]');
    if(el){
      document.head.removeChild(el);
    }
    
    console.log("destroyed")
  }
}
</script>
