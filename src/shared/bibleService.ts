import { BibleBookData } from './types';

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

export async function importBibleTranslation(fileUrl: string){

    try {

        if(!/.+\.zip$/.test(fileUrl)){
           throw new Error("File is a zip file");
        }

        
        
    } catch (error) {
        console.log(error)
    }

}