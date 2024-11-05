export const s2cConvert = (word) => {
  const first = word[0].toUpperCase();
  const upperWord = first + word.slice(1, word.length);
  return 'S2C' + upperWord;
};
