<template>
  <c-stack :spacing="5">
    <c-button v-for="(history, i) in historyList" :key="i">{{
      `${history[0]} ${history[3]}`
    }}</c-button>
  </c-stack>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CStack, CButton } from "@chakra-ui/vue";
import History from "@/shared/history.ts";

@Component({
  components: {
    CStack,
    CButton
  }
})
export default class BottomMenu extends Vue {
  @Prop() private show!: string;
  historyList = History.getAll();
}
</script>
