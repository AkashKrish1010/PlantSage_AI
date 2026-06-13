/** Resize, fix orientation, and compress — matches mobile quality ~0.75 */
export async function prepareImageForML(
  file: File,
  maxDim = 1024,
  quality = 0.75,
): Promise<{ base64: string; previewUrl: string }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const base64 = dataUrl.split(",")[1] ?? "";
  return { base64, previewUrl: dataUrl };
}

export function fileToBase64(file: File): Promise<string> {
  return prepareImageForML(file).then((r) => r.base64);
}
