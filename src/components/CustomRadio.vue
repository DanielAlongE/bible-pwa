<script>
import Vue from "vue";
import { CButton } from "@chakra-ui/vue";

export default Vue.component("CustomRadio", {
  name: "CustomRadio",
  props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number],
    m: String
  },
  render(h) {
    console.log(this)
    return h(
      CButton,
      {
        props: {
          ...this.$props,
          isDisabled: this.isDisabled,
          variantColor: this.isChecked ? "red" : "gray"
        },
        attrs: {
          role: "radio",
          "aria-checked": this.isChecked
        }
      },
      this.$slots.default
    );
  }
});
</script>
