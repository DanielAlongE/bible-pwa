import { openDB } from 'idb';

const BIBLE_DB = "bible";
const VERSES_TABLE = "kjv";
const VERSION = 1;

export async function connnectDB () {
    return await openDB( BIBLE_DB, VERSION, {
        upgrade(db, oldVersion) {
            switch(oldVersion){
                case 0:
                    //const verses = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                    //verses.createIndex('uuid', 'uuid', { unique: true })
    
                    const kjv = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                    kjv.createIndex('bId', 'bId');
                    kjv.createIndex('cId', 'cId');                
      
                case 1:
            }
        }
    });
}


export async function getChapter(key: string) {

    try {

      const db = await connnectDB();

        var tx = db.transaction(VERSES_TABLE, 'readonly');
        var store = tx.objectStore(VERSES_TABLE);
        const index = store.index('cId');
        let cursor =  await index.openCursor( IDBKeyRange.bound(key, key) );

        let result = [];

        while (cursor) {
          //if(cursor.key.indexOf(term) == 0){}
            console.log(cursor.key);                
          result.push(cursor.value);
          //console.warn(cursor.key)
        cursor = await cursor.continue();

      }

      return result;

    } catch (error) {
      console.log(error);
      return [];
    }
  }
