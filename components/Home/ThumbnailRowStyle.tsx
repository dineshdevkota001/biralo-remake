import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { TagGroupEnum } from '@interfaces/mangadex'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import { View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'

interface IThumbnailProps extends Partial<IHaveChildren> {
  item: IManga
}

export default function Thumbnail({ item, children }: IThumbnailProps) {
  const { id, attributes, relationships } = item
  const { title, tags } = attributes
  const navigation = useNavigation<IRootBottomTabsScreenProps<'Home'>>()
  const { url } = useCoverArt(id, relationships)

  return (
    <Card
      style={{
        margin: 8
      }}
      contentStyle={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
      }}
      onPress={() => navigation.navigate('Chapter List', { id, manga: item })}
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
      {children}
    </Card>
  )
}

export function ThumbnailSkeleton() {
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
