<template>
  <div class="about">
    <BibleImport />
    <BottomMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import BottomMenu from "@/components/BottomMenu.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    BottomMenu
  }
};
</script>
