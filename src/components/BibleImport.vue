<template>
  <div class="hello">

    <c-box p="20px" rounded="md" :m="['20px', '20px']" backgroundColor="vue.50" align="center">
      <c-stack isInline>
        <c-input
          pr="4.5rem"
          type="text" 
          placeholder="Bible Database URL"
          v-model="fileurl"
        />
        <c-button :disabled="loading" @click="handleImport">
          Import
        </c-button>
      </c-stack>
      <c-circular-progress v-if="loading" is-indeterminate/>    
    </c-box>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { importBibleTranslation } from "@/shared/bibleService.ts";
import { CInput, CStack, CButton, CBox, CCircularProgress } from "@chakra-ui/vue"

@Component({
  components:{
    CInput, CStack, CButton, CBox, CCircularProgress
}
})
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
