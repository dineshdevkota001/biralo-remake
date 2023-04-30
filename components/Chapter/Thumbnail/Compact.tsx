import useChapterThumbnail from '@hooks/components/useChapterThumbnail'
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
        flex: 1,
        padding: 4,
        paddingHorizontal: 8
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
