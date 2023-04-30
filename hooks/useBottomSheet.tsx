import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModalProps,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { RefObject, useMemo, useRef } from 'react'
import { ViewProps } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Footer(props: BottomSheetFooterProps) {
  const { bottom } = useSafeAreaInsets()

  return (
    <BottomSheetFooter
      {...props}
      bottomInset={bottom || 8}
      style={{
        position: 'relative',
        height: bottom || 8
      }}
    />
  )
}

export default function useBottomSheetModal(props?: {
  shouldRenderBackdrop?: boolean
}): [
  Omit<BottomSheetModalProps, 'ref' | 'children'> & {
    ref: RefObject<BottomSheetModalMethods>
  },
  { handleOpen: () => void; handleClose: () => void }
] {
  const { shouldRenderBackdrop } = props ?? {}
  const { colors } = useTheme()
  const ref = useRef<BottomSheetModalMethods>(null)
  const { bottom } = useSafeAreaInsets()

  const handleOpen = () => ref.current?.present()
  const handleClose = () => ref.current?.dismiss()

  const snapPoints = useMemo(() => [bottom + 20, '70%'], [bottom])

  return [
    {
      ref,
      enableHandlePanningGesture: true,
      enablePanDownToClose: true,
      enableDismissOnClose: true,
      animateOnMount: true,
      snapPoints,
      index: 0,
      backgroundStyle: {
        backgroundColor: colors.surfaceVariant,
        borderColor: colors.elevation.level5,
        borderLeftWidth: 2,
        borderRightWidth: 2
      },
      handleStyle: {
        backgroundColor: colors.surfaceVariant,
        borderColor: colors.elevation.level5,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      },
      handleIndicatorStyle: {
        backgroundColor: colors.onSurface
      },
      backdropComponent: shouldRenderBackdrop
        ? backdropProps => (
            <BottomSheetBackdrop
              {...backdropProps}
              animatedIndex={{ value: 1 }}
            />
          )
        : null,
      footerComponent: Footer
    },
    { handleOpen, handleClose }
  ]
}

export function useDynamicModal({
  snapPoints
}: {
  snapPoints: (string | number)[]
}): [Omit<BottomSheetModalProps, 'children' | 'isOpen'>, ViewProps] {
  const { bottom } = useSafeAreaInsets()
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout
  } = useBottomSheetDynamicSnapPoints(snapPoints)

  return [
    {
      snapPoints: animatedSnapPoints,
      handleHeight: animatedHandleHeight,
      contentHeight: animatedContentHeight
    },
    {
      onLayout: handleContentLayout,
      style: {
        paddingBottom: bottom || 8
      }
    }
  ]
}
