import fs from "fs";

export const fetchWordsAndUnique = async () => {
  const wordsAndCoutn = new Map();

  const files = fs.readdirSync("./2kk_words", "utf-8");
  files.forEach((file) => {
    const data = fs.readFileSync(`./2kk_words/${file}`, "utf-8");

    let uniqueWords = new Set(data.split("\n"));

    for (const word of uniqueWords) {
      if (wordsAndCoutn.has(word)) {
        const countWord = wordsAndCoutn.get(word);
        wordsAndCoutn.set(word, countWord + 1);
      } else {
        wordsAndCoutn.set(word, 1);
      }
    }
  });

  return wordsAndCoutn;
};
