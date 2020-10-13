type HistoryList = [string, number, number]

const item_key = '_history';

function save(history: HistoryList[]){
  localStorage.setItem(item_key, JSON.stringify(history))
}

export const get = (): HistoryList[] => {
  try {
    const h = localStorage.getItem(item_key);
    if(h){
      return JSON.parse(h)
    }
    throw new Error("Parse Error");
    
  } catch (error) {
    console.log(error)
    return []
  }
}

export const push = (h: HistoryList) => {
  let history = get()
  history.push(h)
  save(history)
}