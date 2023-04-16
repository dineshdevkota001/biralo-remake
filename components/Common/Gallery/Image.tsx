import useGallery from "@contexts/GalleryContext";
import { useNavigation } from "@react-navigation/native";
import { AspectRatio } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Animated, {
  abs,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const window = Dimensions.get("window");
const windowRatio = window.width / window.height;

export default function ImagePage({ url }: { url: string }) {
  const [ratio, setRatio] = useState<number>(windowRatio);
  const [{ isHorizontal }, { setIsHorizontal }] = useGallery();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImageDimensions = async () => {
      await Image.prefetch(url);
      await Image.getSize(url, (width, height) => {
        const r = width / height;
        setRatio(r);
        if (r < windowRatio) setIsHorizontal(false);
      });
    };
    fetchImageDimensions();
  }, [setIsHorizontal, url]);

  const scale = useSharedValue(1);
  const yValue = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onBegin((e) => (scale.value = e.scale))
    .onChange((e) => (scale.value = e.scale))
    .onEnd(() => {
      if (Math.abs(scale.value - 1) <= 0.1 || !isHorizontal)
        scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    top: yValue.value,
    opacity: (window.height - yValue.value) / window.height,
    position: "relative",
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View
        style={[
          animatedStyle,
          {
            height: isHorizontal ? "100%" : undefined,
            width: window.width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        {isHorizontal ? (
          <Image
            source={{ uri: url, ...window }}
            resizeMode="contain"
            alt={"Image"}
          />
        ) : (
          <Image
            source={{
              uri: url,
              height: window.width / ratio,
              width: window.width,
            }}
            // source={{ uri: url, ...window }}
            resizeMode="contain"
            alt={"Image"}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
}
