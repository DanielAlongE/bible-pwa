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
      <c-heading color="gray.700" mb="10px">Import Bible Translation</c-heading>
      <c-stack isInline>
        <c-input
          pr="4.5rem"
          type="text"
          placeholder="Bible Database URL"
          v-model="fileurl"
        />
        <c-button
          variant-color="gray"
          shadow="md"
          :disabled="loading"
          @click="handleImport"
        >
          Import
        </c-button>
      </c-stack>
      <c-circular-progress v-if="loading" is-indeterminate />
      <c-stack :mt="4" mx="auto" w="60vw" :spacing="5">
        <c-button
          shadow="md"
          v-for="(translation, i) in translationList"
          :key="i"
          @click="fileurl = translation.url"
          :disabled="loading"
        >
          {{ translation.name }}
        </c-button>
      </c-stack>
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
  CCircularProgress,
  CHeading
} from "@chakra-ui/vue";

export default Vue.extend({
  name: "BibleImport",
  components: {
    CInput,
    CStack,
    CButton,
    CBox,
    CCircularProgress,
    CHeading
  },
  data() {
    return {
      fileurl: "",
      loading: false,
      external: "./js/pizzip.js",
      translationList: [
        {
          name: "King James Version",
          url: "https://bibleroni.web.app/db/kjv.zip"
        },
        {
          name: "American Standard Version",
          url: "https://bibleroni.web.app/db/asv.zip"
        },
        {
          name: "Young's Literal Translation",
          url: "https://bibleroni.web.app/db/ylt.zip"
        }
      ]
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
  created() {
    if (this.$route.query.new) {
      this.showToast({
        title: "Welcome!",
        description: "Please import a Bible translation",
        status: "info",
        duration: 60000
      });
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
