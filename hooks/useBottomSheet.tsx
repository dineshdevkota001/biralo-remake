import {
  BottomSheetModalProps,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, useMemo, useRef } from "react";
import { ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useBottomSheetModal(): [
  Omit<BottomSheetModalProps, "ref" | "children"> & {
    ref: RefObject<BottomSheetModalMethods>;
  },
  { handleOpen: () => void; handleClose: () => void },
] {
  const { colors } = useTheme();
  const ref = useRef<BottomSheetModalMethods>(null);
  const handleOpen = () => ref.current?.present();
  const handleClose = () => ref.current?.dismiss();
  const { bottom } = useSafeAreaInsets();

  const snapPoints = useMemo(() => [bottom + 20, "70%"], []);

  return [
    {
      ref,
      enableHandlePanningGesture: true,
      enablePanDownToClose: true,
      enableDismissOnClose: true,
      animateOnMount: true,
      snapPoints,
      index: 0,
      handleStyle: {
        backgroundColor: colors.surface,
        borderColor: colors.elevation.level5,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      handleIndicatorStyle: {
        backgroundColor: colors.onSurface,
      },
    },
    { handleOpen, handleClose },
  ];
}

export function useDynamicModal({
  snapPoints,
}: { snapPoints: (string | number)[] }): [
  Omit<BottomSheetModalProps, "children" | "isOpen">,
  ViewProps,
] {
  const { bottom } = useSafeAreaInsets();
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  return [
    {
      snapPoints: animatedSnapPoints,
      handleHeight: animatedHandleHeight,
      contentHeight: animatedContentHeight,
    },
    {
      onLayout: handleContentLayout,
      style: {
        paddingBottom: bottom,
      },
    },
  ];
}
