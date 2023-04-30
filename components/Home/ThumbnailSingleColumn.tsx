import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import { Card, useTheme } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'
import { TagGroupEnum } from '@interfaces/enum'

interface IThumbnailProps {
  item: IManga
}

export default function Thumbnail({ item }: IThumbnailProps) {
  const { id, attributes, relationships } = item
  const { title, tags } = attributes
  const navigation = useNavigation<IRootBottomTabsScreenProps<'Home'>>()
  const { url } = useCoverArt(id, relationships)

  return (
    <Card
      style={{
        margin: 4
      }}
      onPress={() => navigation.navigate('Chapter List', { id, manga: item })}
    >
      <SharedElement id={`${id}.cover`}>
        <Card.Cover
          source={{
            uri: url,
            height: 90,
            width: 160
          }}
        />
      </SharedElement>
      <Card.Title title={getTitle(title)} />
      <Card.Content>
        <Tags tags={tags} hideTitle includeTags={[TagGroupEnum.THEME]} />
      </Card.Content>
    </Card>
  )
}

export function ThumbnailSkeleton() {
  const { colors } = useTheme()
  return (
    <Card style={{ backgroundColor: colors.surfaceVariant, margin: 8 }}>
      {
        //
      }
    </Card>
  )
}
