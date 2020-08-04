import { openDB } from "idb";

const BIBLE_DB = "bible";
export const VERSES_TABLE = "verses";
export const TRANSLATION_TABLE = "translations";
const VERSION = 2;

export async function connnectDB () {
    return await openDB( BIBLE_DB, VERSION, {
        upgrade(db, oldVersion) {
            switch(oldVersion){
                case 0:
                    //const verses = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                    //verses.createIndex('uuid', 'uuid', { unique: true })
    
                    const v = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                    v.createIndex('uuid', 'uuid', { unique: true })
                    v.createIndex('bId', 'bId');
                    v.createIndex('cId', 'cId');                
      
                case 1:
                  const t = db.createObjectStore(TRANSLATION_TABLE, {keyPath: 'id', autoIncrement: true });
                  t.createIndex('uuid', 'uuid', { unique: true });              

            }
        }
    });
}

export async function add<T>(item:T, table:string): Promise<any> {
  const db = await connnectDB();

  const tx = db.transaction(table, 'readwrite');
  const store = tx.objectStore(table);
  return store.add(item);
}

export async function getAll<T>(table: string): Promise<T[]> {

  try {

    const db = await connnectDB();

      const tx = db.transaction(table, 'readonly');
      var store = tx.objectStore(table);

      return store.getAll();    

  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getChapter(key: string): Promise<any[]> {

    try {

      const db = await connnectDB();

        const tx = db.transaction(VERSES_TABLE, 'readonly');
        const store = tx.objectStore(VERSES_TABLE);
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
      console.log(result);
      return result;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  export async function addVerses(items:any[], table:string ) {

    const db = await connnectDB();

      let promisesArray = []

      const tx = db.transaction(table, 'readwrite');
      const store = tx.objectStore(table);


      promisesArray = items.map(function(item) {

        return new Promise(resolve => {
          console.log('Adding item: ', item);
            resolve(store.add(item));
        }).catch(err=> err)

        });
      
      return Promise.all( promisesArray ).then(function(res) {
          if(res){
            console.log('All items added successfully!');
            return res;          
          }

      }).catch(function(e) {
        tx.abort();
        console.log('an error occured', e);
      }).finally(function(){

      });

  }

export function getTranslations(){
  return getAll<any>(TRANSLATION_TABLE);
}
