export const fontSize = {
  get(): string {
    return localStorage.getItem("size") || "2xl";
  },
  set(s: string){
    localStorage.setItem("size", s);
  }
}