<template>
  <div class="about">
    <AboutModal />
    <BibleImport />
    <FontSizeSettings />
    <BottomMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import AboutModal from "@/components/AboutModal.vue";
import FontSizeSettings from "@/components/FontSizeSettings.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    BottomMenu,
    AboutModal,
    FontSizeSettings
  }
};
</script>
