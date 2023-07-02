import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useRoute } from '@react-navigation/native'
import { getString, getTitle } from '@utils/getLocalizedString'
import { StyleSheet, View } from 'react-native'
import { Card, Chip, Surface, Text, TouchableRipple } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'
import { capitalize, flatten } from 'lodash'
import Flag from '@components/Common/Flag'
import MangaStatistics from './MangaStatistics'

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap'
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cover: {
    width: 120
  },
  container: { marginBottom: 12, paddingTop: 12, paddingBottom: 12 }
})

export default function MangaHeader() {
  const {
    params: { manga }
  } = useRoute<IRootStackScreenProps<'Chapter List'>['route']>()

  const {
    title,
    description,
    tags,
    altTitles,
    publicationDemographic,
    availableTranslatedLanguages,
    status,
    state
  } = manga.attributes
  const { url } = useCoverArt(manga.id, manga.relationships)

  return (
    <Surface mode="flat" style={styles.container}>
      <Card.Content>
        <View style={styles.root}>
          <SharedElement id={`${manga.id}.cover`}>
            <Card.Cover
              source={{
                uri: url
              }}
              style={styles.cover}
            />
          </SharedElement>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Card.Title
              title={getTitle(title)}
              titleNumberOfLines={2}
              subtitle={flatten(altTitles?.map(a => Object.values(a))).join(
                '\n'
              )}
            />
            <Card.Content>
              <MangaStatistics />
              <View style={styles.content}>
                <Text variant="titleSmall" style={{ width: '100%' }}>
                  Translated In
                </Text>
                {availableTranslatedLanguages?.map(isoCode => (
                  <TouchableRipple key={isoCode}>
                    <Flag isoCode={isoCode} />
                  </TouchableRipple>
                ))}
              </View>
            </Card.Content>
          </View>
        </View>
        <Tags tags={tags} />
        <View style={styles.content}>
          {publicationDemographic ? (
            <Chip compact>{capitalize(publicationDemographic)}</Chip>
          ) : null}
          <Chip compact>{capitalize(status)}</Chip>
          <Chip compact>{capitalize(state)}</Chip>
        </View>

        <Text>{getString(description)}</Text>
      </Card.Content>
    </Surface>
  )
}
