import { readAndCompressImage } from 'browser-image-resizer';

const resizeImage = async ({ mimeType, file, quality, maxWidth, maxHeight }: { mimeType?: 'image/png' | 'image/jpeg', quality?: number, file: File, maxWidth: number, maxHeight: number }): Promise<Blob> => {
    const config = {
        maxWidth,
        maxHeight,
        quality: quality || 0.8,
        mimeType: mimeType || 'image/jpeg',
        convertSize: Infinity,
    };

    return await readAndCompressImage(file, config);
};
export default resizeImage