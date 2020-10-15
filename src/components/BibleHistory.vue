<template>
  <MyModal title="History" :isOpen="isOpen" :onClose="onClose">
    <c-stack v-if="historyList.length" :spacing="5">
      <c-button v-for="(history, i) in historyList" :key="i">{{
        `${history[0]} ${history[2]}`
      }}</c-button>
    </c-stack>
  </MyModal>
</template>

<script lang="ts">
import Vue from "vue";
import { CStack, CButton } from "@chakra-ui/vue";
import History, { HistoryList } from "@/shared/history.ts";
import MyModal from "@/components/MyModal.vue";

export default Vue.extend({
  components: {
    CStack,
    CButton,
    MyModal
  },
  props: {
    isOpen: Boolean,
    onClose: Function
  },
  data: function() {
    const historyList: HistoryList[] = [];
    return {
      historyList
    };
  },
  watch: {
    isOpen: function(isOpen) {
      if (isOpen) {
        this.historyList = History.getAll();
      }
    }
  }
});
</script>
