<template>
  <div class="about">
    <h1>Import Bible translation</h1>
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