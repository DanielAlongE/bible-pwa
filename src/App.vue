<template>
  <div id="app">
    <router-view />
    <BottomMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import BottomMenu from "./components/BottomMenu";

export default {
  name: "Import",
  components: {
    BottomMenu
  }
};
</script>
