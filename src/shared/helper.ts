export const fontSize = {
  get(): string {
    return localStorage.getItem("size") || "2xl";
  },
  set(s: string){
    localStorage.setItem("size", s);
  }
}

export const darkMode = {
  get(){
    const d = localStorage.getItem("darkMode");
    return d === "true" ? true : false;
  },
  set(d: boolean){
    localStorage.setItem("darkMode", `${d}`);
  }
}