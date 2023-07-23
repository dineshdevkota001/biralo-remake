import Tag from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useNavigation } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import spacing from '@utils/theme/spacing'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  card: { margin: spacing(2) },
  cardContent: { gap: spacing(2) },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  image: {
    width: spacing(30)
  },
  details: {
    flex: 1,
    display: 'flex',
    alignSelf: 'flex-start'
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(1)
  },
  skeleton: { height: 200, flex: 1, margin: spacing(2) }
})

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
      style={styles.card}
      contentStyle={styles.cardContent}
      onPress={() => navigation.navigate('Chapter List', { id, manga: item })}
      onLongPress={toggleCardExpand}
    >
      <View style={styles.container}>
        <Card.Cover
          source={{
            uri: url
          }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Card.Title title={getTitle(title)} titleNumberOfLines={2} />
          <Card.Content
            style={[
              styles.tags,
              {
                maxHeight: showChildren ? undefined : spacing(22)
              }
            ]}
          >
            {tags?.map(tag => (
              <Tag key={id} {...tag.attributes} id={id} />
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
      style={[
        styles.skeleton,
        {
          backgroundColor: colors.surfaceVariant
        }
      ]}
    >
      {
        //
      }
    </Card>
  )
}
