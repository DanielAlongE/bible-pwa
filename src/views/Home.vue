<template>
  <div class="home">
    <BibleChapter msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import BibleChapter from "@/components/BibleChapter.vue";

export default {
  name: "Home",
  components: {
    BibleChapter
  }
};
</script>
