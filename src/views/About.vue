<template>
  <div class="about">
    <h1>Import Bible translation</h1>
    <BibleImport />
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";

import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    HelloWorld
  }
};
</script>
