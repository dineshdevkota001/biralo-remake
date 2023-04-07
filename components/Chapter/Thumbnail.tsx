import Duplicate from '@components/Core/Duplicate'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import {
  Card,
  Heading,
  Icon,
  Pressable,
  Row,
  Skeleton,
  Text,
  View
} from 'native-base'
import { formatDistance } from 'date-fns'

function Detail({ iconName, children }: IHaveChildren & { iconName: string }) {
  return (
    <Text width="50%" mb={1}>
      <Icon as={Feather} name={iconName} /> {children}
    </Text>
  )
}

export default function Thumbnail({ attributes, id }: Chapter.Type) {
  const { title, chapter, pages, createdAt, translatedLanguage } = attributes
  const route = useRoute<IRootStackScreenProps<'Chapter List'>['route']>()
  const navigation = useNavigation()

  const { manga } = route.params ?? {}

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Gallery', { chapterId: id, mangaId: manga.id })
      }
    >
      <Card bgColor="white" mb={2}>
        <Heading size="sm" mb={1}>
          Chapter {chapter} {title ?? `${getTitle(manga.attributes.title)}`}
        </Heading>
        <Row flexWrap="wrap">
          <Detail iconName="globe"> {translatedLanguage}</Detail>
          <Detail iconName="file"> {pages}</Detail>
          {createdAt ? (
            <Detail iconName="calendar">
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true
              })}
            </Detail>
          ) : null}
        </Row>
      </Card>
    </Pressable>
  )
}

function DetailSkeleton() {
  return (
    <View width="50%">
      <Skeleton.Text width="75%" lines={1} mb={1} />
    </View>
  )
}

export function ThumbnailSkeleton() {
  return (
    <Card backgroundColor="white" mb={2}>
      <Skeleton.Text fontSize={18} mb={1} lines={1} />
      <Duplicate Component={DetailSkeleton} times={4} />
    </Card>
  )
}
