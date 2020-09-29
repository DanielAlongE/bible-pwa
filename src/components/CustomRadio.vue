<template>
    <c-button
      v-bind="$props"
      :variant-color="isChecked ? 'red' : 'gray'"
      role="radio"
      :aria-checked="isChecked"
    >
      <slot>
    <c-button>
</template>

<script>
import Vue from "vue";
import { CButton } from '@chakra-ui/vue';

export default Vue.extend({
  name: "CustomRadio",
  components: {
    CButton
  },
    props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number],
    mx: [String, Number]
  }
});
</script>
