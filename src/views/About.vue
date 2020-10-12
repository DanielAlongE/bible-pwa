<template>
  <div class="about">
    <c-box
      mx="auto"
      mt="10vh"
      maxW="sm"
      border-width="1px"
      rounded="lg"
      overflow="hidden"
    >
      <c-image
        mx="auto"
        src="https://bibleroni.web.app/img/icons/android-chrome-192x192.png"
        alt="Bibleroni Logo"
      />
      <c-box p="6">
        <c-box>
          <c-list spacing="3">
            <c-list-item>
              <c-heading>{{ title }}</c-heading>
            </c-list-item>
            <c-list-item>
              <c-flex align="center" justify="space-between">
                <c-flex>
                  <c-text>
                    <c-link
                      href="https://github.com/DanielAlongE/bible-pwa"
                      color="indigo.500"
                      is-external
                      >Repository</c-link
                    >
                  </c-text>
                </c-flex>
                <c-flex>
                  <c-link
                    href="https://github.com/DanielAlongE/bible-pwa/issues"
                    color="indigo.500"
                    is-external
                    >Issues</c-link
                  >
                </c-flex>
              </c-flex>
            </c-list-item>
            <c-list-item>
              <c-box w="60px" mx="auto">&copy; {{ year }}</c-box>
            </c-list-item>
          </c-list>
        </c-box>
      </c-box>
    </c-box>
  </div>
</template>

<script>
import {
  CBox,
  CHeading,
  CLink,
  CList,
  CListItem,
  CImage,
  CFlex,
  CText
} from "@chakra-ui/vue";
export default {
  name: "About",
  data: function() {
    return {
      title: "Bible Roni App",
      year: new Date().getFullYear()
    };
  },
  components: {
    CBox,
    CHeading,
    CLink,
    CList,
    CListItem,
    CImage,
    CFlex,
    CText
  }
};
</script>
