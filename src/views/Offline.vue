<template>
  <div class="about">
    <c-box>
      <c-text>
        Opps you seem to be offline
      </c-text>
    </c-box>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { CText, CBox } from '@chakra-ui/vue'

export default {
  name: "Import",
  components: {
    CBox,
    CText,
  }
};
</script>