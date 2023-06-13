import { fetchWordsAndUnique } from "./fetchWordsAndUnique.js";

let words;

const uniqueValues = async () => {
  if (!words) {
    words = await fetchWordsAndUnique();
  }

  return console.log(`uniqueValues: ${words.size}`);
};

const existInAllFiles = async () => {
  if (!words) {
    words = await fetchWordsAndUnique();
  }

  let count = 0;

  for (const values of words.values()) {
    if (values === 20) {
      count++;
    }
  }
  return console.log(`existInAllFiles: ${count}`);
};

const existInAtleastTen = async () => {
  if (!words) {
    words = await fetchWordsAndUnique();
  }

  let count = 0;

  for (const values of words.values()) {
    if (values > 9) {
      count++;
    }
  }
  return console.log(`existInAtleastTen: ${count}`);
};

uniqueValues();
existInAllFiles();
existInAtleastTen();
