import { OPTIMIZED_IMAGES } from './optimized-images';
export const CARD_IMAGE_SIZES =
  '(max-width: 640px) calc(100vw - 32px), (max-width: 960px) calc((100vw - 72px) / 2), (max-width: 1228px) calc((100vw - 96px) / 3), 377px';
export const COVER_IMAGE_SIZES =
  '(max-width: 768px) calc(100vw - 32px), (max-width: 960px) calc(100vw - 48px), (max-width: 1228px) calc((100vw - 88px) * .643), 733px';
export const GALLERY_IMAGE_SIZES =
  '(max-width: 480px) calc(100vw - 32px), (max-width: 768px) calc((100vw - 52px) / 2), (max-width: 960px) calc((100vw - 68px) / 2), 231px';
export function projectImage(source: string) {
  return (
    OPTIMIZED_IMAGES[source] || {
      src: source,
      width: undefined,
      height: undefined,
      srcset: undefined,
    }
  );
}
