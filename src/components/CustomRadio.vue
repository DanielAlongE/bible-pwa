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
    console.log(this.$props, this.$attrs);
    return h(
      CButton,
      {
        props: {
          isDisabled: this.isDisabled,
          variantColor: this.isChecked ? "red" : "gray",
          ...this.$props
        },
        attrs: {
          role: "radio",
          "aria-checked": this.isChecked,
          ...this.$attrs
        }
      },
      this.$slots.default
    );
  }
});
</script>
