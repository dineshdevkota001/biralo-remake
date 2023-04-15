import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

export default function Test() {
  const scale = useSharedValue(1);
  const yValue = useSharedValue(0);

  // rome-ignore lint/suspicious/noExplicitAny: Two stuff handling
  const handlePan = (e: any) => {
    if (e.y < 0.3 * height) yValue.value = e.translationY;
  };

  const pinchGesture = Gesture.Pinch()
    .onBegin((e) => {
      scale.value = e.scale;
    })
    .onChange((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => (scale.value = withSpring(1)));

  const panGesture = Gesture.Pan()
    .onBegin(handlePan)
    .onChange(handlePan)
    .onEnd((e) => (yValue.value = withSpring(0)));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value + 0.5,
      },
    ],
    top: yValue.value,
    opacity: (height - yValue.value) / height,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.Image
          source={{ uri: "https://picsum.photos/200/300", height, width }}
          style={[animatedStyle, { position: "relative" }]}
          resizeMode="contain"
        />
      </GestureDetector>
    </GestureDetector>
  );
}
