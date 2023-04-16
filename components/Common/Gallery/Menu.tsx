import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useBottomSheetModal, { useDynamicModal } from "@hooks/useBottomSheet";
import useChapterControls from "@hooks/useChapterControl";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  IconButtonProps,
  Text,
  useTheme,
} from "react-native-paper";

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

export default function Menu({ title }: { title: string }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [props, { handleOpen, handleClose }] = useBottomSheetModal();
  const [dynamicProps, childrenProps] = useDynamicModal({
    snapPoints: [32, "CONTENT_HEIGHT"],
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
            backgroundColor: colors.surface,
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
