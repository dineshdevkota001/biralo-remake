import Flag from '@components/Common/Flag'
import useChapterThumbnail from '@hooks/components/useChapterThumbnail'
import { LocalizationLanguageEnum } from '@interfaces/enum'
import { View } from 'react-native'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'

export default function ChapterCompactThumbnail({
  children,
  ...item
}: IChapterThumbnailProps) {
  const { colors } = useTheme()
  const { handleGallery, scanlationGroup, translatedLanguage, chapter, pages } =
    useChapterThumbnail({ item })
  return (
    <TouchableRipple
      style={{
        flex: 1
      }}
      onPress={handleGallery}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          padding: 4,
          paddingHorizontal: 8,
          backgroundColor: colors.background
        }}
      >
        <Flag isoCode={translatedLanguage as LocalizationLanguageEnum} />
        <Text>
          Ch. {chapter} * {pages} pages * {scanlationGroup?.name}
        </Text>
      </View>
    </TouchableRipple>
  )
}
