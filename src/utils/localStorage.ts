export const getItemFromLocalStorage = (key: string) => {
  const itemFromLocalStorage = localStorage.getItem(key);

  if (itemFromLocalStorage === null) {
    return null;
  }
  return JSON.parse(itemFromLocalStorage);
};


export const setItemToLocalStorage = (key: string, value: unknown) =>{
    if(typeof value === "undefined"){
        return localStorage.setItem(key, JSON.stringify(""));
    }
    localStorage.setItem(key, JSON.stringify(value));
}