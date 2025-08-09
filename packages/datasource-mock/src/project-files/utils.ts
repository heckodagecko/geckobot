export function getRandomBytes() {
  const min = 1024; // 1 KiB
  const max = 1024 * 1024 * 1024; // 1 GiB
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
