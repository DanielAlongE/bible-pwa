<template>
  <h2 v-if="isOpen">DrawerMenu</h2>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isOpen: Boolean,
    onClose: Function
  },
  data: function() {
    return {};
  }
});
</script>
