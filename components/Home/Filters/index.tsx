import AppliedFilters from "./AppliedFilters";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import useBottomSheetModal from "@hooks/useBottomSheet";
import { FAB, Text, useTheme } from "react-native-paper";
import { TabScreen, Tabs } from "react-native-paper-tabs";

export default function MangaFilter() {
  const { colors } = useTheme();
  const [props, { handleOpen }] = useBottomSheetModal({
    shouldRenderBackdrop: true,
  });
  const tabContainerStyle = {
    flex: 1,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  };

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
      <BottomSheetModal {...props} snapPoints={["70%"]}>
        <BottomSheetView
          style={{
            marginHorizontal: 8,
            backgroundColor: colors.surface,
            borderRadius: 16,
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Tabs
            style={{
              backgroundColor: colors.surface,
            }}
            iconPosition="top"
            uppercase={false}
            mode="scrollable"
          >
            <TabScreen label="Applied" icon="tag">
              <AppliedFilters />
            </TabScreen>
            <TabScreen label="Filters" icon="github">
              <Text>Screen 2</Text>
            </TabScreen>
            <TabScreen label="AApplied Filters" icon="github">
              <Text>Screen 3</Text>
            </TabScreen>
          </Tabs>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
