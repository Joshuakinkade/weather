export function loadData(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function saveData(key,value) {
  try {
    window.localStorage.setItem(key,JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
}