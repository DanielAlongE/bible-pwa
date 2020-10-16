/* eslint-disable @typescript-eslint/ban-ts-ignore */
<template>
  <div class="hello">
    <c-box mb="3" w="300px">
      <c-select v-model="size" placeholder="Font Size">
        <option v-for="(s, i) in sizes" :value="s" :key="i">{{ s }}</option>
      </c-select>
    </c-box>
    <c-text :fontSize="size">
      <c-text fontWeight="bold" as="span">16</c-text>
      For God so loved the world that he gave his one and only Son, that whoever
      believes in him shall not perish but have eternal life.
    </c-text>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CText, CSelect } from "@chakra-ui/vue";

export default Vue.extend({
  name: "BibleImport",
  components: {
    CText,
    CSelect
  },
  data() {
    return {
      size: "",
      sizes: ["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs"]
    };
  }
});
</script>
