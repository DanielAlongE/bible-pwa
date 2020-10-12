<template>
  <div class="bottom-menu" id="nav">
    <c-flex justify="space-between">
      <c-flex
        rounded="lg"
        bg="gray.200"
        h="50px"
        w="100px"
        align="center"
        justify="space-around"
      >
        <router-link to="/">
          <c-icon name="home" size="20px" />
        </router-link>
        <router-link to="/history">
          <c-icon name="history" size="20px" />
        </router-link>
      </c-flex>

      <c-flex
        rounded="lg"
        bg="gray.200"
        h="50px"
        w="100px"
        align="center"
        justify="space-around"
      >
        <router-link to="/about">
          <c-icon name="info-circle" size="20px" />
        </router-link>
        <router-link to="/settings">
          <c-icon name="cog" size="20px" />
        </router-link>
      </c-flex>
    </c-flex>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CIcon, CBox, CFlex } from "@chakra-ui/vue";

@Component({
  components: {
    CIcon,
    CBox,
    CFlex
  }
})
export default class BottomMenu extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 5px;
}
</style>
