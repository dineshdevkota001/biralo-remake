import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native"
import { getTitle } from '@utils/getLocalizedString'
import {
  Card,
  Heading,
  Icon,
  Pressable,
  Row,
  Text
} from 'native-base'

function Detail({ iconName, children }: IHaveChildren & { iconName: string }) {
  return (
    <Text width="50%">
      <Icon as={Feather} name={iconName} /> {children}
    </Text>
  )
}


export default function Thumbnail({ attributes, id }: Chapter.Type) {
  const { volume, title, chapter, pages, createdAt, translatedLanguage } = attributes
  const route = useRoute<IRootStackScreenProps<"Chapter List">['route']>()
  const navigation = useNavigation()

  const { manga } = route.params ?? {}

  return <Pressable
    onPress={() =>
      navigation.navigate('Gallery', { chapterId: id, mangaId: manga.id })
    }
  >
    <Card bgColor="white" mb={2}>
      <Heading size="sm" mb={1}>
        {title ??
          `${getTitle(manga.attributes.title)} Chapter ${chapter}`}
      </Heading>
      <Row flexWrap="wrap">
        <Detail iconName="book-open">
          {' '}
          {volume ?? 0}-{chapter}
        </Detail>
        <Detail iconName="globe">
          {' '}
          {translatedLanguage}
        </Detail>
        <Detail iconName="file"> {pages}</Detail>
        {createdAt ? <Detail iconName="calendar">
          {
            new Date(createdAt)
              .toISOString()
              .split('T')?.[0]
          }
        </Detail> : null}
      </Row>
    </Card>
  </Pressable>
}
