
declare module "@chakra-ui/vue" {
  import Vue, { PluginObject }  from "vue/types";

  export default class Chakra {
    static install(v: typeof Vue, o?: PluginObject<unknown>): void
  }

  export class CThemeProvider extends Vue {}
  export class CReset extends Vue {}
  export class CStack extends Vue {}
  export class CBox extends Vue {}
  export class CIcon extends Vue {}
  export class CText extends Vue {}
  export class CFlex  extends Vue {}
  export class CRadio  extends Vue {}
  export class CRadioGroup  extends Vue {}
  export class CRadioButtonGroup  extends Vue {}
  export class CButton  extends Vue {}
  export class CInput  extends Vue {}
  export class CInputElement  extends Vue {}
  export class CInputRightElement extends Vue {}
  export class CInputAddon extends Vue {}
  export class CInputGroup extends Vue {}
  export class CCircularProgress extends Vue {}
  export class CDrawer extends Vue {}
  export class CDrawerBody extends Vue {}
  export class CDrawerFooter extends Vue {}
  export class CDrawerHeader extends Vue {}
  export class CDrawerOverlay extends Vue {}
  export class CDrawerContent extends Vue {}
  export class CDrawerCloseButton extends Vue {}
  export class CHeading extends Vue {}
}