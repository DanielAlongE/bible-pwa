<template>
  <div class="home">
    <BibleChapter />
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
