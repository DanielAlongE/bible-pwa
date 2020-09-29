<template>
  <c-button @click="showToast">Show Toast</c-button>
</template>

<script>
export default {
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
