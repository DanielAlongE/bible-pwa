<template>
  <div class="bookChapter">

    <c-flex width="100vw" align="start">
      <c-flex :flex="1" height="50vh" overflowY="scroll" >      
        <c-radio-group v-if="translations" v-model="translationId">
          <c-radio as="c-button" v-for="translation in translations" :key="translation.uuid" :value="translation.uuid">{{translation.code}}</c-radio>
        </c-radio-group>
      </c-flex>

      <c-flex :flex="1" height="50vh" overflowY="scroll" bg="green.50">
        <c-radio-group v-if="books" v-model="_bookId">
          <c-radio v-for="book in books" :key="book.index" :value="`${book.index}`">{{book.name}}</c-radio>
        </c-radio-group>
      </c-flex>

      <c-flex :flex="1" height="50vh" overflowY="scroll" bg="blue.50" align="center" justify="center">
        <c-radio-group v-if="chapters" v-model="_chapterId">
          <c-radio v-for="chapter in chapters" :key="`some-${chapter}`" :value="`${chapter}`">{{chapter}}</c-radio>
        </c-radio-group>
      </c-flex>

    </c-flex>

    <c-box :m="['2', '3']" >
      <c-box class="chapter" :spacing="3">
          <c-text v-for="verse in verses" :key="verse.id">
            <c-text fontWeight="bold" color="red.900" as="span">{{verse.v}}</c-text>
            {{verse.text}}
          </c-text>
      </c-box>      
    </c-box>


  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { getChapter, addVerses, add, getTranslations } from "@/shared/idbService.ts";
import { bibleData } from "@/shared/bibleService.ts";
import { BibleBookData, BibleVerse, BibleInfo } from '../shared/types';

import { CStack, CBox, CText, CFlex, CRadio, CRadioGroup, CButton } from "@chakra-ui/vue"

@Component({
  components: {
    CStack, 
    CBox, 
    CText,
    CFlex,
    CRadio, 
    CRadioGroup,
    CButton
  }
})
export default class BibleChapter extends Vue {
  @Prop() private msg!: string;

  translations: BibleInfo[] = [];
  books: BibleBookData[] = [];
  verses: BibleVerse[] = [];

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

  get _bookId(): string{
    return `${this.bookId}`;
  }
  set _bookId(val:string){
    this.bookId = +val;
  }

  get _chapterId(): string{
    return `${this.chapterId}`;
  }
  set _chapterId(val:string){
    this.chapterId = +val;
  }  

  created(){
    console.log("Yaay I have been created!");

    this.initTranslations();

    this.initBooks();

    getChapter(`${this.translationId}-0-1`).then(res => this.verses = res);

    //add({uuid:"kjv", code:"KJV", name:"King James Version"}, "translations")

    //this.populateDB();
  }

  
  @Watch('translationId') 
  actionOnTranslationId(){
    console.log("watch translationId")
    this.goToChapter()
  }

  @Watch('bookId') 
  actionOnBookId(){
    console.log("watch bookId")
    this.goToChapter()
  }  

  @Watch('chapterId')
  actionOnChapterId(){
    console.log("watch chapterId")
    this.goToChapter()
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
