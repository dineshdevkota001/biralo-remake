import CoverImage from '@components/Home/Image'
import { useRoute } from "@react-navigation/native"
import { getString, getTitle } from '@utils/getLocalizedString'
import {
  AspectRatio,
  Card,
  Column, Heading, Text
} from 'native-base'
import { Dimensions } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'

const { width, height } = Dimensions.get('window')

export default function MangaHeader() {
  const { params: { manga } } = useRoute<IRootStackScreenProps<"Chapter List">['route']>()
  const { title, description } = manga.attributes

  return <Column padding={0}>
    <SharedElement id={`${manga.id}.cover`}>
      <AspectRatio
        ratio={
          (2 * width) /
          height
        }
      >
        <CoverImage id={manga.id} relationships={manga.relationships} />
      </AspectRatio>
    </SharedElement>
    <Card bgColor="white" w="100%" marginBottom={3}>
      <Heading size="md">{getTitle(title)}</Heading>
      <Text>{getString(description)}</Text>
    </Card>
  </Column>
}
