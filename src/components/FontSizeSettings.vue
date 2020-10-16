/* eslint-disable @typescript-eslint/ban-ts-ignore */
<template>
  <div class="hello">
    <c-box
      p="20px"
      rounded="md"
      :m="['20px', '20px']"
      backgroundColor="indigo.50"
      align="center"
    >
      <c-heading id="size-heading" color="indigo.700">Font Size</c-heading>
      <c-select
        aria-labelledby="size-heading"
        v-model="size"
        placeholder="Font Size"
      >
        <option v-for="(s, i) in sizes" :value="s" :key="i">{{ i + 1 }}</option>
      </c-select>
      <c-text :fontSize="size">
        <c-text fontWeight="bold" as="span">16</c-text>
        For God so loved the world that he gave his one and only Son, that
        whoever believes in him shall not perish but have eternal life.
      </c-text>
    </c-box>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CText, CSelect, CBox, CHeading } from "@chakra-ui/vue";
import { fontSize } from "@/shared/helper.ts";

export default Vue.extend({
  name: "BibleImport",
  components: {
    CText,
    CSelect,
    CBox,
    CHeading
  },
  data() {
    return {
      size: "",
      sizes: ["xl", "2xl", "3xl", "4xl", "5xl", "6xl"]
    };
  },
  watch: {
    size: function(s) {
      fontSize.set(s);
    }
  },
  created: function() {
    this.size = fontSize.get();
  }
});
</script>
