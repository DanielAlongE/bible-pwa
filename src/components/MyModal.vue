<template>
  <c-modal
    :is-open="isOpen"
    :on-close="close"
    :closeOnOverlayClick="false"
    is-centered
  >
    <c-modal-content ref="content">
      <c-modal-header>{{ title }}</c-modal-header>
      <c-modal-close-button />
      <c-modal-body>
        <slot></slot>
      </c-modal-body>
    </c-modal-content>
    <c-modal-overlay />
  </c-modal>
</template>

<script lang="ts">
import Vue from "vue";
import {
  CModal,
  CModalContent,
  CModalBody,
  CModalHeader,
  CModalCloseButton,
  CModalOverlay
} from "@chakra-ui/vue";
export default Vue.extend({
  components: {
    CModal,
    CModalContent,
    CModalBody,
    CModalHeader,
    CModalCloseButton,
    CModalOverlay
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
    title: String
  },
  data: function() {
    return {};
  }
});
</script>
