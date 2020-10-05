<template>
  <c-drawer
    :isOpen="isOpen"
    :placement="placement"
    :on-close="onClose"
    :initialFocusRef="() => $refs.inputInsideModal"
  >
    <c-drawer-overlay />
    <c-drawer-content>
      <c-drawer-close-button />
      <c-drawer-header>{{ title }}</c-drawer-header>

      <c-drawer-body>
        <slot v-if="isOpen"></slot>
      </c-drawer-body>
    </c-drawer-content>
  </c-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import {
  CDrawer,
  CDrawerBody,
  CDrawerHeader,
  CDrawerOverlay,
  CDrawerContent,
  CDrawerCloseButton
} from "@chakra-ui/vue";
export default Vue.extend({
  components: {
    CDrawer,
    CDrawerBody,
    CDrawerHeader,
    CDrawerOverlay,
    CDrawerContent,
    CDrawerCloseButton
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
    title: String,
    placement: {
      type: String,
      default: "top"
    }
  },
  data: function() {
    return {};
  }
});
</script>
