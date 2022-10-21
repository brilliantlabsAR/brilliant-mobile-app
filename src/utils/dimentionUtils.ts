import { PixelRatio, Dimensions } from "react-native";

const scale = (Dimensions.get("window").width / 320);

export const normalize = (size:number) => {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}