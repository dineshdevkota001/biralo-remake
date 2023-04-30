import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { TagGroupEnum } from '@interfaces/enum'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import { View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'

export default function MangaRow1Thumbnail({
  children,
  ...item
}: IMangaThumbnailProps) {
  const { id, attributes, relationships } = item
  const { title, tags } = attributes ?? {}

  const navigation = useNavigation<IRootBottomTabsScreenProps<'Home'>>()
  const { url } = useCoverArt(id, relationships)

  return (
    <Card
      style={{
        margin: 8
      }}
      onPress={() => navigation.navigate('Chapter List', { id, manga: item })}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}
      >
        <SharedElement id={`${id}.cover`}>
          <Card.Cover
            source={{
              uri: url
            }}
            style={{
              width: 120
            }}
          />
        </SharedElement>
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignSelf: 'flex-start'
          }}
        >
          <Card.Title title={getTitle(title)} titleNumberOfLines={2} />
          <Card.Content
            style={{
              flex: 1
            }}
          >
            <Tags
              tags={tags}
              includeTags={[TagGroupEnum.THEME, TagGroupEnum.GENRE]}
            />
          </Card.Content>
        </View>
      </View>
      {children}
    </Card>
  )
}

export function MangaRow1Skeleton() {
  const { colors } = useTheme()
  return (
    <Card
      style={{
        backgroundColor: colors.surfaceVariant,
        height: 200,
        flex: 1,
        margin: 8
      }}
    >
      {
        //
      }
    </Card>
  )
}
