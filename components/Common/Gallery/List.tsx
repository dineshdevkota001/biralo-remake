import ImagePage from './Image'
import { CDN } from '@constants/api'
import useGallery from '@contexts/GalleryContext'
import { Feather } from '@expo/vector-icons'
import useChapterControls from '@hooks/useChapterControl'
import { QualityEnum } from '@interfaces/enum'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, useEffect } from 'react'
import { FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

export default function GalleryFlatList(
  props: Pick<
    FlatListProps<string>,
    | 'ListFooterComponent'
    | 'ListFooterComponentStyle'
    | 'ListHeaderComponent'
    | 'data'
    | 'style'
  > & { style: StyleProp<ViewStyle> }
) {
  const [{ isHorizontal }] = useGallery()

  return (
    <>
      <Animated.FlatList
        pagingEnabled={isHorizontal}
        renderItem={({ item: url }) => <ImagePage url={url} />}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator
        {...props}
      />
    </>
  )
}
