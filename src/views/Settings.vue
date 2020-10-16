<template>
  <div class="about">
    <AboutModal />
    <BibleImport />
    <BottomMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import AboutModal from "@/components/AboutModal.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    BottomMenu,
    AboutModal
  }
};
</script>
