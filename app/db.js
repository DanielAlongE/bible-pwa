import { openDB, deleteDB, wrap, unwrap } from 'https://unpkg.com/idb?module';

const BIBLE_DB = "bible";
const VERSES_TABLE = "verses";

let dbPromise;

export async function initDB() {
    dbPromise = await openDB( BIBLE_DB, 1, {
    upgrade(db, oldVersion) {
        switch(oldVersion){
            case 0:
                const verses = db.createObjectStore(VERSES_TABLE, {keyPath: 'id', autoIncrement: true });
                verses.createIndex('uuid', 'uuid', { unique: true })
            case 1:
                
            }
    }
  }
  );
}


export async function addVerses(items, table=VERSES_TABLE ) {

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

  export async function getAll(table=VERSES_TABLE) {

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

export async function search(term="kjv-64", table=VERSES_TABLE) {

    try {

      const db = dbPromise;

        //const tx = db.transaction(table, 'readonly');
        //var store = tx.objectStore(table);

        var tx = db.transaction(table, 'readonly');
        var store = tx.objectStore(table);
        const index = store.index('uuid');
        let cursor =  index.openCursor( IDBKeyRange.bound("kjv-65-1-1", "kjv-65-22-1") ); //, "kjv-65-1-24"

        //range = IDBKeyRange.bound(lower, upper);
        //range = IDBKeyRange.upperBound(upper);
        //range = IDBKeyRange.lowerBound(lower);

        Promise.resolve(cursor)
        .then(function logItems(cursor) {
        if (!cursor) {
          return;
        }
        console.log('Cursored at:', cursor.key);
        for (var field in cursor.value) {
          console.log(cursor.value[field]);
        }
        return cursor.continue().then(logItems);
      }).then(function() {
        console.log('Done cursoring');
      })


    } catch (error) {
      console.log(error);
      return [];
    }
  }