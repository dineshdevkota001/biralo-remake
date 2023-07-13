import useGallery from '@contexts/GalleryContext'
import { FlatListProps, StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import ImagePage from './Image'

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
  const { isHorizontal } = useGallery()

  return (
    <Animated.FlatList
      pagingEnabled={isHorizontal}
      renderItem={({ item: url }) => <ImagePage url={url} />}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator
      {...props}
    />
  )
}
