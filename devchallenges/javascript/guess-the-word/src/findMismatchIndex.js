export function findMismatchIndex(str1, str2) {
  if (str1.length !== str2.length) {
    throw new Error("Strings must be of the same length.");
  }
  // Loop through both strings and find the first mismatch
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return i; // Return the index where they first differ
    }
  }
  return -1; // Return -1 if the strings are completely identical
}
