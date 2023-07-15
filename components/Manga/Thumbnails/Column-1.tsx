import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import { Card, useTheme } from 'react-native-paper'

export default function MangaColumn1Thumbnail({
  children,
  id,
  attributes,
  relationships,
  type
}: IMangaThumbnailProps) {
  const { title, altTitles, tags } = attributes
  const navigation = useNavigation<IRootBottomTabsScreenProps<'Home'>>()
  const { url } = useCoverArt(id, relationships)

  return (
    <Card
      style={{
        margin: 4
      }}
      onPress={() =>
        navigation.navigate('Chapter List', {
          id,
          manga: { id, attributes, relationships, type }
        })
      }
    >
      <Card.Cover
        source={{
          uri: url,
          height: 90,
          width: 160
        }}
      />
      <Card.Title title={getTitle(title)} subtitle={getTitle(altTitles?.[0])} />
      <Card.Content>
        <Tags tags={tags} hideTitle />
      </Card.Content>
      {children}
    </Card>
  )
}

export function MangaColumn1Skeleton() {
  const { colors } = useTheme()
  return (
    <Card style={{ backgroundColor: colors.surfaceVariant, margin: 8 }}>
      {
        //
      }
    </Card>
  )
}
