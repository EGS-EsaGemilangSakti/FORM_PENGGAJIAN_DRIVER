import type { UploadPayload } from '../types/payroll';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const KTP_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const SIM_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const FAMILY_CARD_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const POWER_OF_ATTORNEY_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_IMAGE_DIMENSION = 1600;
const JPEG_QUALITY = 0.72;

export function isAllowedFile(file: File, allowedMimeTypes: string[]): boolean {
  return allowedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE;
}

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(file);
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Gagal memproses gambar'));
    };
    image.src = url;
  });
}

function canvasToJpegBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Gagal mengompres gambar'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', JPEG_QUALITY);
  });
}

function compressedFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, '');
  return `${withoutExtension || 'dokumen'}.jpg`;
}

async function compressImageFile(file: File): Promise<File | Blob> {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') return file;

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return file;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  const compressed = await canvasToJpegBlob(canvas);
  return compressed.size < file.size ? compressed : file;
}

export async function fileToBase64Payload(file: File): Promise<UploadPayload> {
  const processedFile = await compressImageFile(file);
  const result = await readAsDataUrl(processedFile);
  const base64 = result.includes(',') ? result.split(',')[1] : result;
  const isCompressed = processedFile !== file;

  return {
    fileName: isCompressed ? compressedFileName(file.name) : file.name,
    mimeType: isCompressed ? 'image/jpeg' : file.type,
    size: processedFile.size,
    base64,
  };
}
