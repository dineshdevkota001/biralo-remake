import { MANGA_THREAD_LINK } from '@constants/api/routes'
import { GALLERY, WEBVIEW } from '@constants/static/screens'
import useGallery, {
  RESIZE_MODE,
  useGalleryDispatch
} from '@contexts/GalleryContext'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useChapterStats } from '@hooks/api/statistics'
import useBottomSheetModal, { useDynamicModal } from '@hooks/useBottomSheet'
import useChapterControls from '@hooks/useChapterControl'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
  Chip,
  IconButton,
  IconButtonProps,
  Surface,
  Text,
  useTheme
} from 'react-native-paper'

function MenuIcon(props: IconButtonProps) {
  const { colors } = useTheme()
  return (
    <IconButton
      iconColor={colors.onSurface}
      {...props}
      selected
      style={{
        flex: 1 / 5
      }}
    />
  )
}

function GroupedSetting({
  title,
  children
}: { title: string } & IHaveChildren) {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flex: 1,
        minWidth: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceVariant,
        borderRadius: 16,
        marginTop: 4,
        marginBottom: 4
      }}
    >
      <Text variant="labelLarge" style={{ width: '100%', textAlign: 'center' }}>
        {title}
      </Text>
      {children}
    </View>
  )
}

export default function Menu({ title, id }: { title: string; id: string }) {
  const navigation =
    useNavigation<IRootStackScreenProps<typeof GALLERY>['navigation']>()
  const [props, { handleOpen, handleClose }] = useBottomSheetModal()
  const [dynamicProps, dynamicChildrenProps] = useDynamicModal({
    snapPoints: [32, 'CONTENT_HEIGHT']
  })

  const { isHorizontal, resizeMode } = useGallery()
  const { setIsHorizontal, setResizeMode } = useGalleryDispatch()

  const { data } = useChapterStats({ id })

  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false)

  const { goPrev, goNext, hasPrev, hasNext } = useChapterControls()

  useEffect(() => handleOpen(), [handleOpen])

  const menuFunctionWrapper = (callback: () => void) => {
    return () => {
      handleClose()
      callback()
    }
  }

  const setResizeFactory = (mode: RESIZE_MODE) => {
    return {
      selected: resizeMode === mode,
      disabled: mode === resizeMode,
      onPress: () => {
        setResizeMode(mode)
      }
    }
  }

  return (
    <BottomSheetModal
      {...props}
      {...dynamicProps}
      enablePanDownToClose={false}
      index={1}
    >
      <Surface
        {...dynamicChildrenProps}
        style={[
          dynamicChildrenProps?.style,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            borderRadius: 16,
            marginHorizontal: 8,
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 8
          }
        ]}
      >
        <Text
          style={{ minWidth: '90%', flex: 1, textAlign: 'center' }}
          variant="titleMedium"
        >
          {title}
        </Text>
        {data?.statistics?.comments ? (
          <View style={{ minWidth: '90%', flex: 1, alignSelf: 'flex-start' }}>
            <Chip
              compact
              mode="flat"
              onPress={e => {
                e.stopPropagation()
                navigation.navigate(WEBVIEW, {
                  uri: MANGA_THREAD_LINK(
                    data?.statistics?.comments?.threadId as string
                  ),
                  title
                })
              }}
            >
              {data?.statistics?.comments?.repliesCount}
            </Chip>
          </View>
        ) : null}
        <MenuIcon
          icon="file-image"
          onPress={() => {
            setIsExtraMenuOpen(p => !p)
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
          <>
            <GroupedSetting title="Image style">
              <MenuIcon
                icon="fullscreen-exit"
                {...setResizeFactory(RESIZE_MODE.FIT_BOTH)}
              />
              <MenuIcon
                icon="fullscreen"
                {...setResizeFactory(RESIZE_MODE.COVER)}
              />
              <MenuIcon
                icon="arrow-left-right"
                {...setResizeFactory(RESIZE_MODE.FULL_WIDTH)}
              />
              <MenuIcon
                icon="arrow-up-down"
                {...setResizeFactory(RESIZE_MODE.FULL_HEIGHT)}
              />
            </GroupedSetting>
            <GroupedSetting title="Reading Direction">
              <MenuIcon
                icon="arrow-down"
                selected={!isHorizontal}
                disabled={!isHorizontal}
                onPress={() => {
                  setIsHorizontal(false)
                  setResizeMode(RESIZE_MODE.FULL_WIDTH)
                }}
              />
              <MenuIcon
                icon="arrow-right"
                selected={isHorizontal}
                disabled={isHorizontal}
                onPress={() => {
                  setIsHorizontal(true)
                  setResizeMode(RESIZE_MODE.FIT_BOTH)
                }}
              />
            </GroupedSetting>
          </>
        ) : null}
      </Surface>
    </BottomSheetModal>
  )
}
