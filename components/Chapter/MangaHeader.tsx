import { Tags } from '@components/Tag'
import useCoverArt from '@hooks/useCoverArt'
import { useRoute } from '@react-navigation/native'
import { getString, getTitle } from '@utils/getLocalizedString'
import { View } from 'react-native'
import { Card, Chip, Surface, Text, TouchableRipple } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'
import { capitalize, flatten } from 'lodash'
import Flag from '@components/Common/Flag'
import MangaStatistics from './MangaStatistics'

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
    <Surface
      mode="flat"
      style={{ marginBottom: 12, paddingTop: 12, paddingBottom: 12 }}
    >
      <Card.Content>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}
        >
          <SharedElement id={`${manga.id}.cover`}>
            <Card.Cover
              source={{
                uri: url
              }}
              style={{
                width: 120
              }}
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  flexWrap: 'wrap'
                }}
              >
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4
          }}
        >
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
