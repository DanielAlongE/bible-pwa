<template>
  <div class="about">
    <h1>Import Bible translation</h1>
    <BibleImport />
    <c-box>
      <c-button>
        Chakra Consumed! ⚡️
      </c-button>
    </c-box>
  </div>

</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import { CBox, CButton } from '@chakra-ui/vue'
export default {
  name: "Import",
  components: {
    BibleImport,
    CBox,
    CButton
  }
};
</script>