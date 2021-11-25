import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image } from 'react-native';


export function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export const cacheFonts = (fonts: any) => {
  return Font.loadAsync(fonts);
};
