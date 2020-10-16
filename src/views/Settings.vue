<template>
  <div class="about">
    <AboutModal />
    <BibleImport />
    <TextSettings />
    <BottomMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import AboutModal from "@/components/AboutModal.vue";
import TextSettings from "@/components/TextSettings.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    BottomMenu,
    AboutModal,
    TextSettings
  }
};
</script>
