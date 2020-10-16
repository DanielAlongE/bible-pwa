/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="bookChapter">
    <div style="position:fixed; width: 100vw; display: block; top:0">
      <c-flex
        align="center"
        :m="[0, '10px']"
        bg="white"
        justify="space-between"
      >
        <c-button @click="goToPreviousChapter()">
          <c-icon name="angle-left" size="24px" />
        </c-button>
        <c-button ref="btnRef" @click="isOpenDrawer = true">{{
          title
        }}</c-button>
        <c-button @click="goToNextChapter()">
          <c-icon name="angle-right" size="24px" />
        </c-button>
      </c-flex>
      <DrawerMenu
        :isOpen="isOpenDrawer"
        :onClose="onCloseDrawer"
        :title="title"
      >
        <c-flex width="100vw" align="start">
          <c-flex :flex="1" height="50vh" overflowY="scroll">
            <c-radio-button-group
              :value="translationId"
              v-if="translations"
              @change="
                e => {
                  translationId = e;
                }
              "
              width="100%"
              :px="2"
            >
              <CustomRadio
                v-for="translation in translations"
                :key="translation.uuid"
                :value="translation.uuid"
                :my="1"
                width="100%"
                >{{ translation.code }}</CustomRadio
              >
            </c-radio-button-group>
          </c-flex>

          <c-flex :flex="2" height="50vh" overflowY="scroll" bg="green.50">
            <c-radio-button-group
              v-if="books"
              :value="_bookId"
              @change="
                e => {
                  _bookId = e;
                }
              "
              width="100%"
              :px="2"
            >
              <CustomRadio
                v-for="book in filteredBooks"
                :key="book.index"
                :value="`${book.index}`"
                width="100%"
                :my="1"
                >{{ book.name }}</CustomRadio
              >
            </c-radio-button-group>
          </c-flex>

          <c-flex :flex="1" height="50vh" overflowY="scroll">
            <c-radio-button-group
              v-if="chapters"
              :value="_chapterId"
              @change="
                e => {
                  _chapterId = e;
                }
              "
              width="100%"
              :px="2"
            >
              <CustomRadio
                v-for="chapter in chapters"
                :key="`some-${chapter}`"
                :value="`${chapter}`"
                width="60%"
                :my="1"
                >{{ chapter }}</CustomRadio
              >
            </c-radio-button-group>
          </c-flex>
        </c-flex>
      </DrawerMenu>
    </div>

    <c-box my="12" mx="6">
      <c-box class="chapter" :spacing="3">
        <c-text v-for="verse in verses" :key="verse.id" :fontSize="fontSize">
          <c-text fontWeight="bold" as="span">{{ verse.v }}</c-text>
          {{ verse.text }}
        </c-text>
      </c-box>
    </c-box>
    <BibleHistory
      :isOpen="isOpenHistory"
      :onClose="onCloseHistory"
      @setChapter="setChapter"
    ></BibleHistory>
    <BottomMenu :handleHistory="openHistory" />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { getChapter, getTranslations } from "@/shared/idbService.ts";
import {
  bibleData,
  nextChapterKey,
  previousChapterKey
} from "@/shared/bibleService.ts";
import { BibleBookData, BibleVerse, BibleInfo } from "../shared/types";
import DrawerMenu from "./DrawerMenu.vue";
import BibleHistory from "@/components/BibleHistory.vue";
import { fontSize } from "@/shared/helper.ts";

import {
  CIcon,
  CStack,
  CBox,
  CText,
  CFlex,
  CRadio,
  CRadioGroup,
  CRadioButtonGroup,
  CButton
} from "@chakra-ui/vue";

import CustomRadio from "@/components/CustomRadio.vue";
import History from "@/shared/history.ts";
import BottomMenu from "@/components/BottomMenu.vue";

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
    CRadioButtonGroup,
    CustomRadio,
    DrawerMenu,
    BibleHistory,
    BottomMenu
  }
})
export default class BibleChapter extends Vue {
  @Prop() private msg!: string;

  translations: BibleInfo[] = [];
  books: BibleBookData[] = [];
  verses: BibleVerse[] = [];

  availableBooks: number[] = [];

  fontSize = "2xl";
  darkMode = false;

  bookName = "";

  isOpenDrawer = false;
  isOpenHistory = false;

  onCloseDrawer() {
    this.isOpenDrawer = false;
  }

  onCloseHistory() {
    this.isOpenHistory = false;
  }

  openHistory() {
    this.isOpenHistory = true;
  }

  goToDebounceId: ReturnType<typeof setTimeout> = 0;

  getBookName(bookId: number) {
    return (
      (this.books && this.books[bookId] && this.books[bookId]["name"]) || ""
    );
  }

  get title(): string {
    const translation = this.translations.find(
      x => x.uuid == this.translationId
    );
    const currentTranslation = (translation && translation["code"]) || "";
    const bookName = this.getBookName(this.bookId);

    const chapter = this.chapterId;

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
    const currentBook = this.books[this.bookId];
    const count = currentBook ? currentBook.chapters : 0;
    console.log(count, this.chapterId);
    if (count < this.chapterId) {
      this.chapterId = 1;
    }
    return Array(count)
      .fill(null)
      .map((_, i) => i + 1);
  }

  translationId = "";
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
    this.fontSize = fontSize.get();

    this.init();
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
    this.isOpenDrawer = false;
  }

  goToChapter() {
    const { translationId, bookId, chapterId } = this;
    if (this.goToDebounceId) {
      clearTimeout(this.goToDebounceId);
    }
    console.log(`${translationId}-${bookId}-${chapterId}`);
    this.goToDebounceId = setTimeout(() => {
      const key = `${translationId}-${bookId}-${chapterId}`;
      getChapter(key).then(res => (this.verses = res));
      console.log(`GoTo ${translationId}-${bookId}-${chapterId}`);
      this.addToHistory();
    }, 100);
  }

  setChapter(bookId: number, chapterId: number) {
    this.bookId = bookId;
    this.chapterId = chapterId;
    this.isOpenHistory = false;
  }

  async goToNextChapter() {
    const { translationId, bookId, chapterId } = this;
    const key = nextChapterKey(translationId, bookId, chapterId);
    if (key) {
      this.translationId = `${key[0]}`;
      this.bookId = +key[1];
      this.chapterId = +key[2];
    }
  }

  async goToPreviousChapter() {
    const { translationId, bookId, chapterId } = this;
    const key = previousChapterKey(translationId, bookId, chapterId);
    if (key) {
      this.translationId = `${key[0]}`;
      this.bookId = +key[1];
      this.chapterId = +key[2];
    }
  }

  async init() {
    this.books = [...bibleData];

    await this.initTranslations();

    this.getLastHistory();

    this.goToChapter();
  }

  getFirstTranslationId() {
    const tId = localStorage.getItem("translationId");
    if (tId) {
      return tId;
    } else if (this.translations.length > 0) {
      return this.translations[0].uuid;
    }
    return "";
  }

  addToHistory() {
    localStorage.setItem("translationId", this.translationId);
    // localStorage.setItem("bookId", `${this.bookId}`);
    // localStorage.setItem("chapterId", `${this.chapterId}`);
    setTimeout(() => {
      const bookName = this.getBookName(this.bookId);
      History.add([bookName, this.bookId, this.chapterId]);
    }, 5000);
  }

  getLastHistory() {
    this.translationId = this.getFirstTranslationId();
    const [, bookId, chapterId] = History.getLast() || ["", 0, 1];
    this.bookId = bookId; //+(localStorage.getItem("bookId") || 0);
    this.chapterId = chapterId; //+(localStorage.getItem("chapterId") || 1);
  }

  initTranslations() {
    return getTranslations().then(r => (this.translations = r));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
