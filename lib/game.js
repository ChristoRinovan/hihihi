export const MIN_CLICKS = 6;
export const MAX_CLICKS = 10;

export const ENDING_MESSAGE =
  "You don't have to be perfect today. Just take things one step at a time. I'm rooting for you, always. 💗";

export const DIALOGS = [
  "Hehehe, tangkap aku kalau bisa 🤭",
  "Yahhh, meleset lagi!",
  "Dikit lagi, sayanggg~",
  "Eits, aku masih bisa kabur! 💨",
  "Tangan kamu cepat juga, ya!",
  "Ups! Aku hampir ketangkep 😳",
  "Semangat dong, masa nyerah? 💗",
  "Aku di sini... eh, pindah lagi!",
  "Ayo, satu langkah lebih dekat ✨",
  "Wkwk, kok gemes banget sih?",
  "Oke, oke... aku mulai panik! 🌷",
  "Coba sekali lagi, bisa kok! 🫶",
];

// A new target must only be generated when a game session starts.
export function generateTarget() {
  return Math.floor(Math.random() * 5) + 6;
}

// A previous message is excluded before indexing, so consecutive repeats are impossible.
export function pickDialog(previousDialog, random = Math.random) {
  const available = DIALOGS.filter((message) => message !== previousDialog);
  const sample = Math.min(1 - Number.EPSILON, Math.max(0, random()));
  return available[Math.floor(sample * available.length)];
}

export function shouldFakeCatch(nextProgress, target) {
  return nextProgress > 0 && nextProgress < target && nextProgress % 3 === 0;
}

export function shouldShowDialog(nextProgress, isFakeCatch) {
  return nextProgress === 1 || isFakeCatch || nextProgress % 4 === 0;
}

// The coordinates are local to the play area. Handles narrow but valid areas.
export function getRandomPosition(
  areaWidth,
  areaHeight,
  buttonWidth,
  buttonHeight,
  padding = 18,
  random = Math.random,
) {
  const widthAvailable = Math.max(0, areaWidth - buttonWidth);
  const heightAvailable = Math.max(0, areaHeight - buttonHeight);
  const minX = Math.min(Math.max(0, padding), widthAvailable / 2);
  const minY = Math.min(Math.max(0, padding), heightAvailable / 2);
  const maxX = Math.max(minX, widthAvailable - padding);
  const maxY = Math.max(minY, heightAvailable - padding);
  const sampleX = Math.min(1 - Number.EPSILON, Math.max(0, random()));
  const sampleY = Math.min(1 - Number.EPSILON, Math.max(0, random()));

  return {
    x: Math.round(minX + sampleX * (maxX - minX)),
    y: Math.round(minY + sampleY * (maxY - minY)),
  };
}
