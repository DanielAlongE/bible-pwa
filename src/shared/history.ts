export type HistoryList = [string, number, number]

const item_key = '_history';

function save(history: HistoryList[]){
  localStorage.setItem(item_key, JSON.stringify(history))
}

const getAll = (): HistoryList[] => {
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

const push = (h: HistoryList) => {
  let history = getAll()
  history.push(h)
  save(history)
}

const getLast = (): HistoryList | null => {
  const history = getAll()
  let size;
  if(size = history.length){
    return history[size - 1];
  }
  return null
}

export default {
  getAll,
  getLast,
  push
}