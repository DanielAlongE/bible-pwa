<template>
  <div class="bookChapter">
    <h1>{{ msg }}</h1>
    <div>
      <select v-model="translationId">
        <option v-for="translation in translations" :key="translation.uuid" :value="translation.uuid">
          {{translation.code}}
        </option>
      </select>

      <select v-model="bookId">
        <option v-for="book in books" :key="book.index" :value="book.index">{{book.name}}</option>
      </select>

      <select v-model="chapterId">
        <option v-for="chapter in chapters" :key="chapter" :value="chapter">{{chapter}}</option>
      </select>
      <button @click="goToChapter">Go</button>
    </div>
    <p v-for="verse in verses" :key="verse.id">{{verse.v}} {{verse.text}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getChapter, addVerses, add, getTranslations } from "@/shared/idbService.ts";
import bibleData, { BibleData } from "@/shared/bibleService.ts";

@Component
export default class BibleChapter extends Vue {
  @Prop() private msg!: string;
  translations: any[] = [];
  books: BibleData[] = [];
  verses: any[] = [];

  get chapters(){
    const count = this.books[this.bookId].chapters;
    console.log(count, this.chapterId)
    if(count < this.chapterId){
      this.chapterId = 1;
    }
    return Array(count).fill(null).map((_,i) => i+1)
  }

  translationId: string = "kjv";
  bookId: number = 0;
  chapterId: number = 1;
  verseId: number = 1;

  created(){
    console.log("Yaay I have been created!");

    this.initTranslations();

    this.initBooks();

    getChapter("kjv-0-1").then(res => this.verses = res);

    //add({uuid:"kjv", code:"KJV", name:"King James Version"}, "translations")

    //this.populateDB();
  }

  goToChapter(){
    const { translationId, bookId, chapterId } = this;
    const key = `${translationId}-${bookId}-${chapterId}`;
    getChapter(key).then(res => this.verses = res);
  }

  initBooks(){
    this.books = [ ...bibleData ];
  }

  async initTranslations(){
    this.translations = await getTranslations();
  }


  populateDB(){
    fetch("http://127.0.0.1:5500/app/kjv.json")
      .then( r => r.json())
      .then( (data: any[]) => {
        
        const nData = data.map(x => {
          const uuid = `${x.cId}-${x.v}`
          return ({...x, uuid})
        })

        console.log(nData)
        //addVerses(nData, "verses")
      })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
