<template>
  <div class="about">
    <BibleImport />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";

export default {
  name: "Import",
  components: {
    BibleImport
  }
};
</script>
