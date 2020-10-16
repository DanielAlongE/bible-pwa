/* eslint-disable @typescript-eslint/ban-ts-ignore */
<template>
  <div class="hello">
    <c-box
      p="20px"
      rounded="lg"
      :m="['20px', '20px']"
      backgroundColor="gray.50"
      align="center"
    >
      <c-heading color="gray.700" mb="10px">Text Option</c-heading>
      <c-stack :spacing="5" is-inline>
        <c-box :p="5" shadow="md" border-width="1px">
          <c-select
            aria-labelledby="size-heading"
            v-model="size"
            placeholder="Font Size"
          >
            <option v-for="(s, i) in sizes" :value="s" :key="i">{{
              i + 1
            }}</option>
          </c-select>
        </c-box>
        <c-box :p="8" shadow="md" border-width="1px">
          <c-checkbox
            :is-checked="darkMode"
            @change="
              (val, $e) => {
                darkMode = $e.target.checked;
              }
            "
            >Dark Mode</c-checkbox
          >
        </c-box>
      </c-stack>
      <c-box m="4" :bg="darkMode ? '#1d1c1c' : 'white'" rounded="md">
        <c-text :fontSize="size" :color="darkMode ? 'white' : 'black'">
          <c-text fontWeight="bold" as="span">16</c-text>
          For God so loved the world that he gave his one and only Son, that
          whoever believes in him shall not perish but have eternal life.
        </c-text>
      </c-box>
    </c-box>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  CText,
  CSelect,
  CBox,
  CCheckbox,
  CStack,
  CHeading
} from "@chakra-ui/vue";
import { fontSize, darkMode } from "@/shared/helper.ts";

export default Vue.extend({
  name: "TextSettings",
  components: {
    CText,
    CSelect,
    CBox,
    CCheckbox,
    CStack,
    CHeading
  },
  data() {
    return {
      size: "",
      darkMode: false,
      sizes: ["xl", "2xl", "3xl", "4xl", "5xl", "6xl"]
    };
  },
  watch: {
    size: function(s) {
      fontSize.set(s);
    },
    darkMode: function(d) {
      darkMode.set(d);
    }
  },
  created: function() {
    this.size = fontSize.get();
    this.darkMode = darkMode.get();
  }
});
</script>
