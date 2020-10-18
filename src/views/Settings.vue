<template>
  <div class="about">
    <BibleImport />
    <TextSettings />
    <BottomMenu :hideSettings="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleImport from "@/components/BibleImport.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import TextSettings from "@/components/TextSettings.vue";

export default {
  name: "Import",
  components: {
    BibleImport,
    BottomMenu,
    TextSettings
  }
};
</script>
