// Compresión de imagen en el navegador antes de subir: redimensiona a <=1600px
// y re-encoda a WebP. Una foto de 15 MB del móvil acaba en unos cientos de KB.

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Recorta la imagen al ratio objetivo (centrado, estilo object-fit:cover) y la
 * re-encoda a WebP optimizado. Pensado para huecos de tamaño fijo (ej. la
 * galería de trabajos es 3:4): cualquier foto que suba el cliente encaja exacta
 * sin deformarse, recortando lo que sobra del centro.
 */
export async function cropToRatioWebp(
  file: File,
  ratioW: number,
  ratioH: number,
  targetHeight = 1000,
  quality = 0.85,
): Promise<string> {
  const dataUrl = await fileToBase64(file);
  if (!file.type.startsWith('image/')) return dataUrl;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const targetRatio = ratioW / ratioH;
      const srcRatio = img.width / img.height;
      // Recorte centrado: tomar el rectángulo más grande con el ratio objetivo.
      let sw = img.width;
      let sh = img.height;
      if (srcRatio > targetRatio) {
        sw = img.height * targetRatio; // demasiado ancha → recortar los lados
      } else {
        sh = img.width / targetRatio; // demasiado alta → recortar arriba/abajo
      }
      const sx = (img.width - sw) / 2;
      const sy = (img.height - sh) / 2;

      const outH = Math.min(targetHeight, Math.round(sh));
      const outW = Math.round(outH * targetRatio);
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(dataUrl); return; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
      const webp = canvas.toDataURL('image/webp', quality);
      resolve(webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<string> {
  const dataUrl = await fileToBase64(file);
  if (!file.type.startsWith('image/')) return dataUrl;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(dataUrl); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const webp = canvas.toDataURL('image/webp', quality);
      resolve(webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
