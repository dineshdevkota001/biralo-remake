import useChapterThumbnail from '@hooks/components/useChapterThumbnail'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'

export default function ChapterCompactThumbnail({
  children,
  ...item
}: IChapterThumbnailProps) {
  const { handleGallery, scanlationGroup, translatedLanguage, chapter, pages } =
    useChapterThumbnail({ item })
  return (
    <TouchableRipple
      style={{
        flex: 1
      }}
      onPress={handleGallery}
    >
      <Text>
        {translatedLanguage} Ch. {chapter} * {pages} pages *{' '}
        {scanlationGroup?.name}
      </Text>
    </TouchableRipple>
  )
}
