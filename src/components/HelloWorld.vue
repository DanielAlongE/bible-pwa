<template>
  <div>
    <c-button @click="showToast">Show Toast</c-button>
    <c-radio-button-group
      :value="value"
      is-inline
      @change="
        e => {
          value = e;
        }
      "
      spacing="4"
    >
      <CustomRadio value="item-1" m="2">Custom Radio 1</CustomRadio>
      <CustomRadio value="item-2" m="2">Custom Radio 2</CustomRadio>
      <CustomRadio value="item-3" m="2">Custom Radio 3</CustomRadio>
      <CustomRadio is-disabled value="item-4" m="2">Custom Radio 4</CustomRadio>
    </c-radio-button-group>
  </div>
</template>

<script>
import { CRadioButtonGroup } from "@chakra-ui/vue";
import CustomRadio from "@/components/CustomRadio.vue";

export default {
  components: {
    CRadioButtonGroup,
    CustomRadio
  },
  data: function() {
    return {
      value: "item-1"
    };
  },
  methods: {
    showToast() {
      this.$toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "info",
        duration: 10000
      });
    }
  }
};
</script>
