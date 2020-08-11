<template>
  <div class="about">
    <h1>Import Bible translation</h1>
    <BibleImport />
    <c-box>
      <c-button>
        Chakra Consumed! ⚡️
      </c-button>
    </c-box>
    <c-box bg="tomato" w="100%" p="4" color="white">
      This is the Box
    </c-box>


  </div>

</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import { CStack, CText, CBox, CButton } from '@chakra-ui/vue'

export default {
  name: "Import",
  components: {
    BibleImport,
    CBox,
    CButton,

    CText,
    CStack
  }
};
</script>