import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useBottomSheetModal, { useDynamicModal } from "@hooks/useBottomSheet";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { FAB, Text } from "react-native-paper";

export default function MangaFilter() {
  const [props, { handleOpen }] = useBottomSheetModal({
    shouldRenderBackdrop: true,
  });
  const [dynamicProps, childrenProps] = useDynamicModal({
    snapPoints: ["CONTENT_HEIGHT"],
  });

  return (
    <>
      <FAB
        icon="filter"
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onPress={handleOpen}
      />
      <BottomSheetModal {...props} {...dynamicProps}>
        <View {...childrenProps}>
          {/* <RenderEverythingHere ></RenderEverythingHere> */}
        </View>
      </BottomSheetModal>
    </>
  );
}
