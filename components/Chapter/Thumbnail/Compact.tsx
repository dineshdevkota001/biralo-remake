import Flag from '@components/Common/Flag'
import useChapterThumbnail from '@hooks/components/useChapterThumbnail'
import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
import { formatDistance } from 'date-fns'
import { View } from 'react-native'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'

const today = new Date()

export default function ChapterCompactThumbnail({
  ...item
}: IChapterThumbnailProps) {
  const { colors } = useTheme()
  const { handleGallery, translatedLanguage, chapter, readableAt } =
    useChapterThumbnail({ item })
  return (
    <TouchableRipple
      style={{
        flex: 1,
        borderRadius: 16
      }}
      onPress={handleGallery}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          padding: 8,
          paddingVertical: 4,
          borderRadius: 16,
          backgroundColor: colors.surfaceVariant,
          gap: 4,
          alignItems: 'center'
        }}
      >
        <Flag isoCode={translatedLanguage as LocalizationLanguageEnum} />
        <Text
          variant="bodyLarge"
          style={{
            flex: 1,
            flexShrink: 0
          }}
        >
          {chapter ? `Ch. ${chapter}` : 'Oneshot'}
        </Text>
        {readableAt ? (
          <Text
            variant="bodySmall"
            style={{
              color: colors.onSurfaceVariant,
              flexShrink: 1
            }}
            ellipsizeMode="head"
          >
            {formatDistance(new Date(readableAt), today)}
          </Text>
        ) : null}
      </View>
    </TouchableRipple>
  )
}
