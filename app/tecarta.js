const bibleData = [
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


const urls ={
    kjv: "https://cf-cors.tecartabible.com/7/50/chapters",
    tpt: "https://cf-cors.tecartabible.com/7/298/chapters",
    apc: "https://cf-cors.tecartabible.com/7/45/chapters",
    msg: "https://cf-cors.tecartabible.com/7/65/chapters",
    niv: "https://cf-cors.tecartabible.com/7/32/chapters",
    nlt: "https://cf-cors.tecartabible.com/7/51/chapters"
}

async function fetchFromTecarta(bookNumber, chapterNumber=1, url=urls.kjv){
    return fetch(`${url}/${bookNumber}_${chapterNumber}.json.gz`)
        .then(res => res.json());
}

function versesToString(book, chapter, verses){
    let result = "";
    if(verses){
        Object.entries(verses).forEach( ([number, verse]) => {
            result += book + ` ${chapter}:${number} ${verse}\n`;
        });
    }
    return result;
}

async function getChapter(tecartaId, chapter, bookName){
    const res = await fetchFromTecarta(tecartaId, chapter);
    
    return versesToString(bookName, chapter, res.verses);    
}

async function getChapterData(tecartaId, chapter, bookIndex, translation){
    const res = await fetchFromTecarta(tecartaId, chapter);
    const verses = res && res.verses || {};
    let result = [];
    if(verses){
        Object.entries(verses).forEach( ([verse, text]) => {
            //result += book + ` ${chapter}:${number} ${verse}\n`;
            //const uuid = `${translation}-${bookIndex}-${chapter}-${verse}`;
            const bId = `${translation}-${bookIndex}`;
            const cId = `${translation}-${bookIndex}-${chapter}`;            
            //result.push({uuid, translation, bookIndex, chapter, verse:+verse, text})
            result.push({bId, cId, t:translation, b:bookIndex, c:chapter, v:+verse, text})
        });
    }
    return result; 
}

async function populateResult(){
    let bookIndex = 0;
    //let chapters = Array(50).fill(0).map((x,i)=>i+1);
    let result = "";

    const {name, chapters, tecartaId} = bibleData[20];

    chapter = 1;

    for(let i=1; i<=1; i++){
        console.log(`...doing ${name} chapter ${i}`);
        result += await getChapter(tecartaId, i, name);
        console.log(`done ${name} chapter ${i}`);
    }
           
    return result;

}

async function getBible(){
    //let chapters = Array(50).fill(0).map((x,i)=>i+1);
    let result = [];

    let bookIndex = 40;

    while(bookIndex < 66){
        const {name, chapters, index, tecartaId} = bibleData[bookIndex];

        for(let i=1; i<=chapters; i++){
            console.log(`...doing ${name} chapter ${i}`);
            //result += await getChapter(tecartaId, i, name);
            let chapData =  await getChapterData(tecartaId, i, index, "kjv")
            result = result.concat(chapData)
            console.log(`done ${name} chapter ${i}`);
        }

        bookIndex += 1;
    }

           
    return result;

}