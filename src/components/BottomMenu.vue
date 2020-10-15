<template>
  <div class="bottom-menu" id="nav">
    <c-flex w="96vw" :mx="2" align="center" justify="space-between">
      <c-flex
        rounded="lg"
        bg="gray.200"
        h="50px"
        w="50px"
        align="center"
        justify="space-around"
      >
        <c-link v-if="!handleHistory" as="router-link" to="/">
          <c-icon name="home" size="20px" />
        </c-link>
        <c-link v-if="handleHistory" @click="handleHistory()">
          <c-icon name="history" size="20px" />
        </c-link>
      </c-flex>

      <c-flex
        rounded="lg"
        bg="gray.200"
        h="50px"
        w="50px"
        align="center"
        justify="space-around"
      >
        <router-link to="/settings">
          <c-icon name="cog" size="20px" />
        </router-link>
      </c-flex>
    </c-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CIcon, CFlex, CLink } from "@chakra-ui/vue";

export default Vue.extend({
  components: {
    CIcon,
    CFlex,
    CLink
  },
  props: {
    isOpen: Boolean,
    handleHistory: Function
  },
  data: function() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 5px;
}
</style>
