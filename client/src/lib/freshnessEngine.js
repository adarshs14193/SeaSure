export function analyzeFreshness({ eyeImage, gillImage, storage }) {
  if (!eyeImage || !gillImage) return "spoiled";

  if (storage === "ice") return "fresh";
  if (storage === "chilled") return "moderate";

  return "spoiled";
}
