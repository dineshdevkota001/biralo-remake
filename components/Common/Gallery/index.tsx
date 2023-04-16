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
import { Dispatch, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  IconButton,
  IconButtonProps,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
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

function MenuIcon(props: IconButtonProps) {
  const { colors } = useTheme();
  return (
    <IconButton
      iconColor={colors.onSurface}
      {...props}
      style={{
        flex: 1 / 5,
      }}
    />
  );
}

function Menu({ title }: { title: string }) {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [props, { handleOpen, handleClose }] = useBottomSheetModal();
  const [dynamicProps, childrenProps] = useDynamicModal({
    snapPoints: [(bottom || 16) + 40, "CONTENT_HEIGHT"],
  });

  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false);

  const { goPrev, goNext, hasPrev, hasNext } = useChapterControls();
  useEffect(() => {
    handleOpen();
  }, []);

  const menuFunctionWrapper = (callback: () => void) => {
    return () => {
      handleClose();
      callback();
    };
  };

  return (
    <BottomSheetModal
      {...props}
      {...dynamicProps}
      enablePanDownToClose={false}
      index={1}
    >
      <View
        {...childrenProps}
        style={[
          childrenProps?.style,
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: 16,
            paddingTop: 8,
          },
        ]}
      >
        <Text
          style={{ minWidth: "90%", flex: 1, textAlign: "center" }}
          variant="titleMedium"
        >
          {title}
        </Text>
        <MenuIcon
          icon="file-image"
          onPress={() => {
            setIsExtraMenuOpen((p) => !p);
          }}
        />
        <MenuIcon
          icon="chevron-left"
          onPress={menuFunctionWrapper(goPrev)}
          disabled={!hasPrev}
        />
        <MenuIcon
          icon="chevron-right"
          onPress={menuFunctionWrapper(goNext)}
          disabled={!hasNext}
        />
        <MenuIcon
          icon="close"
          onPress={menuFunctionWrapper(navigation.goBack)}
        />
        {isExtraMenuOpen ? (
          <View
            style={{
              flex: 1,
              minWidth: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <MenuIcon icon="fullscreen-exit" />
            <MenuIcon icon="fullscreen" />
            <MenuIcon icon="arrow-left-right" />
            <MenuIcon icon="arrow-up-down" />
          </View>
        ) : null}
      </View>
    </BottomSheetModal>
  );
}

function GalleryFlatList({
  style,
  setTitle,
}: { style: StyleProp<ViewStyle>; setTitle: Dispatch<string> }) {
  const route = useRoute<IRootStackScreenProps<"Gallery">["route"]>();
  const { quality = QualityEnum.DATA_SAVER, chapterId } = route.params;
  const [{ isHorizontal }] = useGallery();
  const { colors, fonts } = useTheme();

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
  const { goNext, hasNext, currentChapter } = useChapterControls();
  useEffect(() => {
    if (currentChapter) setTitle(`Chapter ${currentChapter.chapter}`);
  }, []);

  return (
    <>
      <Animated.FlatList
        style={style}
        data={data ?? []}
        pagingEnabled={isHorizontal}
        ListFooterComponent={
          hasNext ? (
            <View
              style={{
                height: window.height / (isHorizontal ? 1 : 2),
                width: window.width,
                backgroundColor: colors.background,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableRipple onPress={goNext}>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather
                    color={colors.onBackground}
                    name="arrow-right-circle"
                  />
                  <Text
                    variant="titleLarge"
                    style={{ color: colors.onBackground }}
                  >
                    Next Chapter
                  </Text>
                </View>
              </TouchableRipple>
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
  const [title, setTitle] = useState("");

  return (
    <GalleryContextProvider value={[]}>
      <SafeAreaView style={{ position: "relative", backgroundColor: "black" }}>
        <GalleryFlatList style={animatedStyle} setTitle={setTitle} />
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
        <Menu title={title} />
      </SafeAreaView>
    </GalleryContextProvider>
  );
}
