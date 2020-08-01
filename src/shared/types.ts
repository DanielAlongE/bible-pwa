export interface BibleBookData {
    index: number
    name: string
    chapters: number
    tecartaId: number
}

export interface BibleInfo {
    id?: number
    uuid: string
    code: string
    name: string
    bookIndexes: number[]
}

export interface BibleVerse {
    id?: number
    uuid: string
    bId: string
    cId: string
    b: number
    c: number
    v: number
    t: string
    text: string
}