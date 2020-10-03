import { BibleBookData, BibleVerse, BibleInfo } from './types';
import { addVerses, VERSES_TABLE, TRANSLATION_TABLE, add } from './idbService';
//import PizZip from 'pizzip/dist/pizzip.min.js';
declare let PizZip:any;

export const bibleData: BibleBookData[] = [
    {index:0, "name":"Genesis","chapters":50,"tecartaId":1},
    {index:1, "name":"Exodus","chapters":40,"tecartaId":2},
    {index:2, "name":"Leviticus","chapters":27,"tecartaId":3},
    {index:3, "name":"Numbers","chapters":36,"tecartaId":4},
    {index:4, "name":"Deuteronomy","chapters":34,"tecartaId":5},
    {index:5, "name":"Joshua","chapters":24,"tecartaId":6},
    {index:6, "name":"Judges","chapters":21,"tecartaId":7},
    {index:7, "name":"Ruth","chapters":4,"tecartaId":8},
    {index:8, "name":"1 Samuel","chapters":31,"tecartaId":9},
    {index:9, "name":"2 Samuel","chapters":24,"tecartaId":10},
    {index:10, "name":"1 Kings","chapters":22,"tecartaId":11},
    {index:11, "name":"2 Kings","chapters":25,"tecartaId":12},
    {index:12, "name":"1 Chronicles","chapters":29,"tecartaId":13},
    {index:13, "name":"2 Chronicles","chapters":36,"tecartaId":14},
    {index:14, "name":"Ezra","chapters":10,"tecartaId":15},
    {index:15, "name":"Nehemiah","chapters":13,"tecartaId":16},
    {index:16, "name":"Esther","chapters":10,"tecartaId":19},
    {index:17, "name":"Job","chapters":42,"tecartaId":22},
    {index:18, "name":"Psalms","chapters":150,"tecartaId":23},
    {index:19, "name":"Proverbs","chapters":31,"tecartaId":24},
    {index:20, "name":"Ecclesiastes","chapters":12,"tecartaId":25},
    {index:21, "name":"Song of Solomon","chapters":8,"tecartaId":26},
    {index:22, "name":"Isaiah","chapters":66,"tecartaId":29},
    {index:23, "name":"Jeremiah","chapters":52,"tecartaId":30},
    {index:24, "name":"Lamentations","chapters":5,"tecartaId":31},
    {index:25, "name":"Ezekiel","chapters":48,"tecartaId":33},
    {index:26, "name":"Daniel","chapters":12,"tecartaId":34},
    {index:27, "name":"Hosea","chapters":14,"tecartaId":35},
    {index:28, "name":"Joel","chapters":3,"tecartaId":36},
    {index:29, "name":"Amos","chapters":9,"tecartaId":37},
    {index:30, "name":"Obadiah","chapters":1,"tecartaId":38},
    {index:31, "name":"Jonah","chapters":4,"tecartaId":39},
    {index:32, "name":"Micah","chapters":7,"tecartaId":40},
    {index:33, "name":"Nahum","chapters":3,"tecartaId":41},
    {index:34, "name":"Habakkuk","chapters":3,"tecartaId":42},
    {index:35, "name":"Zephaniah","chapters":3,"tecartaId":43},
    {index:36, "name":"Haggai","chapters":2,"tecartaId":44},
    {index:37, "name":"Zechariah","chapters":14,"tecartaId":45},
    {index:38, "name":"Malachi","chapters":4,"tecartaId":46},
    {index:39, "name":"Matthew","chapters":28,"tecartaId":47},
    {index:40, "name":"Mark","chapters":16,"tecartaId":48},
    {index:41, "name":"Luke","chapters":24,"tecartaId":49},
    {index:42, "name":"John","chapters":21,"tecartaId":50},
    {index:43, "name":"Acts","chapters":28,"tecartaId":51},
    {index:44, "name":"Romans","chapters":16,"tecartaId":52},
    {index:45, "name":"1 Corinthians","chapters":16,"tecartaId":53},
    {index:46, "name":"2 Corinthians","chapters":13,"tecartaId":54},
    {index:47, "name":"Galatians","chapters":6,"tecartaId":55},
    {index:48, "name":"Ephesians","chapters":6,"tecartaId":56},
    {index:49, "name":"Philippians","chapters":4,"tecartaId":57},
    {index:50, "name":"Colossians","chapters":4,"tecartaId":58},
    {index:51, "name":"1 Thessalonians","chapters":5,"tecartaId":59},
    {index:52, "name":"2 Thessalonians","chapters":3,"tecartaId":60},
    {index:53, "name":"1 Timothy","chapters":6,"tecartaId":61},
    {index:54, "name":"2 Timothy","chapters":4,"tecartaId":62},
    {index:55, "name":"Titus","chapters":3,"tecartaId":63},
    {index:56, "name":"Philemon","chapters":1,"tecartaId":64},
    {index:57, "name":"Hebrews","chapters":13,"tecartaId":65},
    {index:58, "name":"James","chapters":5,"tecartaId":66},
    {index:59, "name":"1 Peter","chapters":5,"tecartaId":67},
    {index:60, "name":"2 Peter","chapters":3,"tecartaId":68},
    {index:61, "name":"1 John","chapters":5,"tecartaId":69},
    {index:62, "name":"2 John","chapters":1,"tecartaId":70},
    {index:63, "name":"3 John","chapters":1,"tecartaId":71},
    {index:64, "name":"Jude","chapters":1,"tecartaId":72},
    {index:65, "name":"Revelation","chapters":22,"tecartaId":73}
];

const versesProps = ["uuid", "bId", "cId", "t", "b", "c", "v", "text"];
const infoProps = ["uuid", "code", "name", "bookIndexes"];

function isValidInfo(info: BibleInfo){
    return infoProps.every( x => info.hasOwnProperty(x) );
}

function hasNextChapter(bookId: number, chapterId: number){
    if(bookId > bibleData.length){
        return false
    }

    const currentBook = bibleData[bookId]

    if(chapterId > currentBook.chapters){
        return false
    }

    return true
}

function hasPreviousChapter(bookId: number, chapterId: number){
    if(bookId > bibleData.length){
        return false
    }

    const currentBook = bibleData[bookId]

    if(chapterId > 1){
        return true
    }

    return false
}

export function nextChapterKey(key: string){
    const [translationId, bookId, chapterId] = key.split('-').map( x => +x )

    const hasNext = hasNextChapter(bookId, chapterId)

    if(hasNext){
        return `${translationId}-${bookId}-${chapterId + 1}`
    }
    else if(bookId < bibleData.length){
        return `${translationId}-${bookId + 1}-1`
    }

    return null
}

export function previousChapterKey(key: string){
    const [translationId, bookId, chapterId] = key.split('-').map( x => +x )

    const hasPrevious = hasPreviousChapter(bookId, chapterId)

    if(hasPrevious){
        return `${translationId}-${bookId}-${chapterId - 1}`
    }
    else if(bookId < bibleData.length){
        const newChapterId = bibleData[bookId].chapters
        return `${translationId}-${bookId + 1}-${newChapterId}`
    }

    return null
}

function isValidVerses(verses: BibleVerse[]){
    if(!Array.isArray(verses)){
        return false;
    }

    if(verses.length === 0){
        return false;
    }

    const keys = Object.keys(verses[0]);

    console.log({keys})

    return versesProps.every( prop => keys.includes(prop) )
}

function prepareVerses(verses: BibleVerse[]){
    return verses.map( verse => {
        const { id, ...rest } = verse;
        return { ...rest }
    })
}

export async function importBibleTranslation(fileUrl: string){

        try {

        if(!/.+\.zip$/.test(fileUrl)){
            throw new Error("File is not a zip file");
        }

        const zip = new PizZip();
        const content = await fetch(fileUrl).then( r => r.arrayBuffer() );

        if(!content){
            throw new Error("Unable to fetch file");
        }
        zip.load(content)

        const rawFile = zip.file("data.json");

        if(!rawFile){
            throw new Error("File is invalid");
        }

        const dataString = rawFile.asText();

        if(!dataString){
            throw new Error("File is corrupted!");
        }
    
        const data = JSON.parse(dataString);

        const { info, verses:_verses } = data;

        if(!isValidInfo(info) && !isValidVerses(_verses)){
            throw new Error("File contains inaccurate data!");
        }

        const verses = prepareVerses(_verses);

        //add verse to db
        return addVerses(verses, VERSES_TABLE)
            .then(() => add(info, TRANSLATION_TABLE) ) //add info to 
            .catch(() => {
                //rollback action
                throw new Error("Unable to populate database!");
            });

        
    }
    catch( err ){
        return Promise.reject(err)
    };

}