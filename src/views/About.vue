<template>
  <div class="about">
    <c-box>
      <c-heading as="h2" size="xl">
        In love with Vue & Nuxt
      </c-heading>
    </c-box>
  </div>
</template>

<script>
import { CBox, CHeading } from "@chakra-ui/vue";
export default {
  name: "Import",
  components: {
    CBox,
    CHeading
  }
};
</script>
