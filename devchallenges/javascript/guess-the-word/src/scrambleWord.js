export function scrambleWord(word) {
  let scrambled = word.split(""); // Split the word into an array of characters
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]]; // Swap characters
  }
  return scrambled.join(""); // Join the array back into a string
}
