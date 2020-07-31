import { openDB, deleteDB, wrap, unwrap } from 'https://unpkg.com/idb?module';

const BIBLE_DB = "bible";
const VERSES_TABLE = "verses";

const KJV = "kjv";

let dbPromise;

export async function initDB() {
    dbPromise = await openDB( BIBLE_DB, 1, {
    upgrade(db, oldVersion) {
        switch(oldVersion){
            case 0:
                const verses = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                verses.createIndex('uuid', 'uuid', { unique: true })

                const kjv = db.createObjectStore(KJV, {keyPath: 'id', autoIncrement: true });
                kjv.createIndex('bId', 'bId');
                kjv.createIndex('cId', 'cId');                
  
            case 1:
            }
    }
  }
  );
}


export async function addVerses(items, table=KJV ) {

    const db = dbPromise;

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

  export async function update(item, table=KJV ) {

    const db = dbPromise;

    const tx = db.transaction(table, 'readwrite');
    const store = tx.objectStore(table);

    return new Promise(resolve => {
      console.log('Update item: ', item);
        resolve(store.put(item));
    }).catch(err=> err);

  }

  export async function getAll(table=KJV) {

    try {

      const db = dbPromise;

        const tx = db.transaction(table, 'readonly');
        var store = tx.objectStore(table);

        return store.getAll();    

    } catch (error) {
      console.log(error);
      return [];
    }
  }

export async function search1(term="kjv-64", table=VERSES_TABLE) {

    try {

      const db = dbPromise;

        //const tx = db.transaction(table, 'readonly');
        //var store = tx.objectStore(table);

        let index = 0;

        let cursor = await db.transaction(table).store.openCursor();

        while (cursor) {
            //if(cursor.key.indexOf(term) == 0){}
            //  console.log(cursor.key, cursor.value);                
            
            //console.warn(cursor.key)
          cursor = await cursor.continue();
          index += 1;
        }

        console.log({index})
    } catch (error) {
      console.log(error);
      return [];
    }
  }

export async function search(term="kjv-65-22", table=KJV) {

    try {

      const db = dbPromise;

        //const tx = db.transaction(table, 'readonly');
        //var store = tx.objectStore(table);

        var tx = db.transaction(table, 'readonly');
        var store = tx.objectStore(table);
        const index = store.index('cId');
        let cursor =  await index.openCursor( IDBKeyRange.bound(term, term) ); //

        //range = IDBKeyRange.bound(lower, upper);
        //range = IDBKeyRange.upperBound(upper);
        //range = IDBKeyRange.lowerBound(lower);

        let result = [];

        while (cursor) {
          //if(cursor.key.indexOf(term) == 0){}
            console.log(cursor.key);                
          result.push(cursor.value);
          //console.warn(cursor.key)
        cursor = await cursor.continue();

      }

      console.log(result);

      return result; //Promise.resolve(result);

    } catch (error) {
      console.log(error);
      return [];
    }
  }