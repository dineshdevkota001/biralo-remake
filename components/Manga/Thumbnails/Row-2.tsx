import Tag from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import spacing from '@utils/theme/spacing'
import { useState } from 'react'
import { View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

export default function MangaRow2Thumbnail({
  children,
  ...item
}: IMangaThumbnailProps) {
  const { id, attributes, relationships } = item
  const { title, tags } = attributes ?? {}
  const [showChildren, setShowChildren] = useState(false)

  const navigation = useNavigation<IRootBottomTabsScreenProps<'Home'>>()
  const { url } = useCoverArt(id, relationships)
  const toggleCardExpand = () => {
    setShowChildren(x => !x)
  }

  return (
    <Card
      style={{
        margin: 8
      }}
      contentStyle={{
        gap: 8
      }}
      onPress={() => navigation.navigate('Chapter List', { id, manga: item })}
      onLongPress={toggleCardExpand}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          overflow: 'hidden'
        }}
      >
        <Card.Cover
          source={{
            uri: url
          }}
          style={{
            width: 120
          }}
        />
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
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: spacing(1),
              maxHeight: showChildren ? undefined : spacing(22)
            }}
          >
            {tags?.map(tag => (
              <Tag {...tag.attributes} id={id} />
            ))}
          </Card.Content>
        </View>
      </View>
      {showChildren ? children : null}
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
