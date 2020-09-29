/* eslint-disable @typescript-eslint/ban-ts-ignore */
<template>
  <div class="hello">
    <c-box
      p="20px"
      rounded="md"
      :m="['20px', '20px']"
      backgroundColor="vue.50"
      align="center"
    >
      <c-stack isInline>
        <c-input
          pr="4.5rem"
          type="text"
          placeholder="Bible Database URL"
          v-model="fileurl"
        />
        <c-button :disabled="loading" @click="handleImport">
          Import
        </c-button>
      </c-stack>
      <c-circular-progress v-if="loading" is-indeterminate />
    </c-box>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { importBibleTranslation } from "@/shared/bibleService.ts";
import {
  CInput,
  CStack,
  CButton,
  CBox,
  CCircularProgress
} from "@chakra-ui/vue";

export default Vue.extend({
  name: "BibleImport",
  components: {
    CInput,
    CStack,
    CButton,
    CBox,
    CCircularProgress
  },
  data() {
    return {
      fileurl: "",
      loading: false,
      external: "./js/pizzip.js"
    };
  },

  methods: {
    showToast({ title = "", description = "", status = "", duration = 0 }) {
      /* @ts-ignore */
      this.$toast({
        title,
        description,
        status: status || "info",
        duration: duration || 10000
      });
    },

    handleImport() {
      this.loading = true;

      importBibleTranslation(this.fileurl)
        .then(() =>
          this.showToast({
            title: "Done!",
            description: "Bible Translation Added Successfully",
            status: "success"
          })
        )
        .catch(err => {
          this.showToast({
            title: "Error!",
            description: err.message,
            status: "error"
          });
        })
        .finally(() => (this.loading = false));
    }
  },
  mounted() {
    const externalScript = document.createElement("script");
    externalScript.setAttribute("src", this.external);
    document.head.appendChild(externalScript);
  },

  destroyed() {
    const target = `script[src="${this.external}"]`;
    const el = document.querySelector(target);
    if (el) {
      document.head.removeChild(el);
    }

    console.log("destroyed");
  }
});
</script>
