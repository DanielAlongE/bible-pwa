/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="bookChapter">
    <div style="position:fixed; width: 100vw; display: block; top:0">
      <c-flex align="center" :m="[0, '10px']" justify="space-between">
        <c-button>
          <c-icon name="angle-left" size="24px" />
        </c-button>
        <c-button ref="btnRef" @click="isOpen = true">{{ title }}</c-button>
        <c-button>
          <c-icon name="angle-right" size="24px" />
        </c-button>
      </c-flex>

      <c-drawer
        :isOpen="isOpen"
        placement="top"
        :on-close="close"
        :initialFocusRef="() => $refs.inputInsideModal"
      >
        <c-drawer-overlay />
        <c-drawer-content>
          <c-drawer-close-button />
          <c-drawer-header>{{ title }}</c-drawer-header>

          <c-drawer-body>
            <c-flex width="100vw" align="start">
              <c-flex :flex="1" height="50vh" overflowY="scroll">
                <c-radio-group
                  :value="translationId"
                  v-if="translations"
                  @change="
                    e => {
                      translationId = e;
                    }
                  "
                >
                  <CustomRadio
                    v-for="translation in translations"
                    :key="translation.uuid"
                    :value="translation.uuid"
                    size="lg"
                    >{{ translation.code }}</CustomRadio
                  >
                </c-radio-group>
              </c-flex>

              <c-flex :flex="2" height="50vh" overflowY="scroll" bg="green.50">
                <c-radio-group v-if="books" v-model="_bookId">
                  <c-radio
                    v-for="book in filteredBooks"
                    :key="book.index"
                    :value="`${book.index}`"
                    >{{ book.name }}</c-radio
                  >
                </c-radio-group>
              </c-flex>

              <c-flex :flex="1" height="50vh" overflowY="scroll" bg="blue.50">
                <c-radio-group v-if="chapters" v-model="_chapterId">
                  <c-radio
                    v-for="chapter in chapters"
                    :key="`some-${chapter}`"
                    :value="`${chapter}`"
                    >{{ chapter }}</c-radio
                  >
                </c-radio-group>
              </c-flex>
            </c-flex>
          </c-drawer-body>
        </c-drawer-content>
      </c-drawer>
    </div>

    <c-box my="12" mx="6">
      <c-box class="chapter" :spacing="3">
        <c-text v-for="verse in verses" :key="verse.id" fontSize="2em">
          <c-text fontWeight="bold" color="red.900" as="span">{{
            verse.v
          }}</c-text>
          {{ verse.text }}
        </c-text>
      </c-box>
    </c-box>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { getChapter, getTranslations } from "@/shared/idbService.ts";
import { bibleData } from "@/shared/bibleService.ts";
import { BibleBookData, BibleVerse, BibleInfo } from "../shared/types";

import {
  CIcon,
  CStack,
  CBox,
  CText,
  CFlex,
  CRadio,
  CRadioGroup,
  CButton,
  CDrawer,
  CDrawerBody,
  CDrawerFooter,
  CDrawerHeader,
  CDrawerOverlay,
  CDrawerContent,
  CDrawerCloseButton
} from "@chakra-ui/vue";

import CustomRadio from "@/components/CustomRadio.vue";

@Component({
  components: {
    CIcon,
    CStack,
    CBox,
    CText,
    CFlex,
    CRadio,
    CRadioGroup,
    CButton,
    CDrawer,
    CDrawerBody,
    CDrawerFooter,
    CDrawerHeader,
    CDrawerOverlay,
    CDrawerContent,
    CDrawerCloseButton,
    CustomRadio
  }
})
export default class BibleChapter extends Vue {
  @Prop() private msg!: string;

  translations: BibleInfo[] = [];
  books: BibleBookData[] = [];
  verses: BibleVerse[] = [];

  availableBooks: number[] = [];

  bookName = "";

  isOpen = false;

  close() {
    this.isOpen = false;
  }

  get title(): string {
    const translation = this.translations.find(
      x => x.uuid == this.translationId
    );
    const currentTranslation = (translation && translation["code"]) || "";
    const bookName = (this.books && this.books[this.bookId]["name"]) || "";
    const chapter = this.chapterId;

    console.log(this.translations, {
      translation,
      currentTranslation,
      bookName,
      chapter
    });

    return `${bookName} ${chapter} - ${currentTranslation}`;
  }

  get filteredBooks() {
    if (this.availableBooks.length == 0) {
      return this.books;
    }

    return this.books.filter(x => {
      return this.availableBooks.includes(x.index);
    });
  }

  get chapters() {
    const count = this.books[this.bookId].chapters;
    console.log(count, this.chapterId);
    if (count < this.chapterId) {
      this.chapterId = 1;
    }
    return Array(count)
      .fill(null)
      .map((_, i) => i + 1);
  }

  translationId = "kjv";
  bookId = 0;
  chapterId = 1;
  verseId = 1;

  get _bookId(): string {
    return `${this.bookId}`;
  }
  set _bookId(val: string) {
    this.bookId = +val;
  }

  get _chapterId(): string {
    return `${this.chapterId}`;
  }
  set _chapterId(val: string) {
    this.chapterId = +val;
  }

  created() {
    console.log("Yaay I have been created!");

    this.initTranslations();

    this.initBooks();

    this.getLastHistory();

    this.goToChapter();

    //getChapter(`${this.translationId}-0-1`).then(res => this.verses = res);

    //add({uuid:"kjv", code:"KJV", name:"King James Version"}, "translations")

    //this.populateDB();
  }

  @Watch("translationId")
  actionOnTranslationId() {
    console.log("watch translationId");
    const bibleInfo = this.translations.find(x => x.uuid == this.translationId);
    this.availableBooks = (bibleInfo && bibleInfo.bookIndexes) || [];
    this.goToChapter();
  }

  @Watch("bookId")
  actionOnBookId() {
    console.log("watch bookId");
    const translation = this.translations.find(
      x => x.uuid == this.translationId
    );
    this.bookName = (translation && translation["code"]) || "";

    this.goToChapter();
  }

  @Watch("chapterId")
  actionOnChapterId() {
    console.log("watch chapterId");
    this.goToChapter();
  }

  goToChapter() {
    const { translationId, bookId, chapterId } = this;
    const key = `${translationId}-${bookId}-${chapterId}`;
    getChapter(key).then(res => (this.verses = res));

    this.addToHistory();
  }

  initBooks() {
    this.books = [...bibleData];
  }

  addToHistory() {
    localStorage.setItem("translationId", this.translationId);
    localStorage.setItem("bookId", `${this.bookId}`);
    localStorage.setItem("chapterId", `${this.chapterId}`);
  }

  getLastHistory() {
    this.translationId = localStorage.getItem("translationId") || "";
    this.bookId = +(localStorage.getItem("bookId") || 1);
    this.chapterId = +(localStorage.getItem("chapterId") || 1);
  }

  async initTranslations() {
    this.translations = await getTranslations();
  }

  populateDB() {
    fetch("http://127.0.0.1:5500/app/kjv.json")
      .then(r => r.json())
      .then((data: any[]) => {
        const nData = data.map(x => {
          const uuid = `${x.cId}-${x.v}`;
          return { ...x, uuid };
        });

        console.log(nData);
        //addVerses(nData, "verses")
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
