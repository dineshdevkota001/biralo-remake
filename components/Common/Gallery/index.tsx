import ImagePage from "./Image";
import { CDN } from "@constants/api";
import useGallery, { GalleryContextProvider } from "@contexts/GalleryContext";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useBottomSheetModal, { useDynamicModal } from "@hooks/useBottomSheet";
import useChapterControls from "@hooks/useChapterControl";
import { QualityEnum } from "@interfaces/enum";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heading, IIconProps, Icon, Pressable, Row, View } from "native-base";
import { useEffect, useState } from "react";
import { StyleProp } from "react-native";
import { Dimensions, SafeAreaView, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GalleryProps = {
  imageUrls: string[];
};

const window = Dimensions.get("window");
const { height } = window;

function MenuIcon(props: IIconProps) {
  return (
    <Icon
      as={Feather}
      margin={3}
      size={6}
      disabled={!props?.onPress}
      {...props}
    />
  );
}

function Menu() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [props, { handleOpen, handleClose }] = useBottomSheetModal();
  const [dynamicProps, childrenProps] = useDynamicModal({
    snapPoints: [(bottom || 16) + 20, "CONTENT_HEIGHT"],
  });

  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false);

  const { goPrev, goNext, hasPrev, hasNext } = useChapterControls();
  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <BottomSheetModal
      {...props}
      {...dynamicProps}
      enablePanDownToClose={false}
      index={1}
    >
      <View display="flex" {...childrenProps} padding={4}>
        <Row justifyContent="space-around" flexWrap="wrap">
          <MenuIcon
            name="more-vertical"
            onPress={() => {
              setIsExtraMenuOpen((p) => !p);
            }}
          />
          <MenuIcon name="chevron-left" onPress={goPrev} disabled={!hasPrev} />
          <MenuIcon name="chevron-right" onPress={goNext} disabled={!hasNext} />
          <MenuIcon
            name="x"
            onPress={() => {
              handleClose();
              navigation.goBack();
            }}
          />
        </Row>
        {isExtraMenuOpen ? (
          <Row minWidth="90%" flex={1}>
            <MenuIcon name="minimize" />
            <MenuIcon name="minimize-2" />
            <MenuIcon name="maximize" />
          </Row>
        ) : null}
      </View>
    </BottomSheetModal>
  );
}

function GalleryFlatList({ style }: { style: StyleProp<ViewStyle> }) {
  const route = useRoute<IRootStackScreenProps<"Gallery">["route"]>();
  const { quality = QualityEnum.DATA_SAVER, chapterId } = route.params;
  const [{ isHorizontal }] = useGallery();

  const { data } = useQuery<unknown, unknown, string[]>(
    [chapterId, quality],
    async () => {
      const res = await axios.get(`${CDN}/${chapterId}`);

      const { baseUrl, chapter } = res.data;
      const { hash } = chapter;

      return chapter?.[quality === "data" ? "data" : "dataSaver"].map(
        (filename: string) => `${baseUrl}/${quality}/${hash}/${filename}`,
      );
    },
  );
  const { goNext, hasNext } = useChapterControls();

  return (
    <>
      <Animated.FlatList
        style={style}
        data={
          data ?? ["https://picsum.photos/200", "https://picsum.photos/200"]
        }
        pagingEnabled={isHorizontal}
        ListFooterComponent={
          hasNext ? (
            <View
              height={window.height / (isHorizontal ? 1 : 2)}
              width={window.width}
              backgroundColor="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Pressable
                onPress={goNext}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={Feather}
                  color="white"
                  name="arrow-right-circle"
                  size="2xl"
                  mb={2}
                />
                <Heading size="lg" color="white">
                  Next Chapter
                </Heading>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item: url, index }) => <ImagePage url={url} />}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator
      />
    </>
  );
}

const panDownHeight = 0.11 * height;

export default function Gallery() {
  const navigation = useNavigation();
  const yValue = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      if (e.y < 2 * panDownHeight) yValue.value = e.translationY;
    })
    .onChange((e) => {
      if (e.y < 2 * panDownHeight) yValue.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.y < 2 * panDownHeight && e.translationY > 0.5 * height)
        runOnJS(navigation.goBack)();
      yValue.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(
    () => ({
      top: yValue.value,
    }),
    [],
  );

  return (
    <GalleryContextProvider value={[]}>
      <SafeAreaView style={{ position: "relative", backgroundColor: "black" }}>
        <GalleryFlatList style={animatedStyle} />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              animatedStyle,
              {
                position: "absolute",
                left: 0,
                width: "100%",
                height: panDownHeight,
              },
            ]}
          />
        </GestureDetector>
        <Menu />
      </SafeAreaView>
    </GalleryContextProvider>
  );
}
