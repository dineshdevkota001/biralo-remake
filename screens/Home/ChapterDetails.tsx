import { useInfiniteQuery } from '@tanstack/react-query'
import {
  AspectRatio,
  Card,
  Column,
  Container,
  FlatList,
  Heading,
  Icon,
  Pressable,
  Row,
  SectionList,
  Skeleton,
  Text
} from 'native-base'
import { queryFn, getNextPageParam } from 'api'
import { flatten, groupBy } from 'lodash'
import { MANGA_FEED, MANGA } from '@constants/api/routes'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator, Dimensions } from 'react-native'
import { EvilIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import CoverImage from '@components/Home/Image'
import { SharedElement } from 'react-navigation-shared-element'

export default function ChapterList({
  navigation,
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const { id: mangaId, manga } = route.params
  const { data, isRefetching, isFetchingNextPage, refetch, fetchNextPage } =
    useInfiniteQuery<[string, IChapterRequest], IError, ICollection<IChapter>>(
      [MANGA_FEED(mangaId), { limit: 10 }],
      queryFn,
      {
        getNextPageParam
      }
    )

  const chapters = flatten((data?.pages ?? [])?.map(({ data }) => data))

  return (
    <FlatList
      data={chapters}
      ListHeaderComponent={
        <Column padding={0}>
          <SharedElement id={`${mangaId}.cover`}>
            <AspectRatio
              height={Dimensions.get('window').height}
              ratio={
                Dimensions.get('window').width / Dimensions.get('window').height
              }
            >
              <CoverImage id={manga.id} relationships={manga.relationships} />
            </AspectRatio>
          </SharedElement>
          <Card bgColor="white" w="100%" marginBottom={3}>
            <Heading size="md">{manga?.attributes?.title?.en}</Heading>
            <Text>{manga?.attributes?.description?.en}</Text>
          </Card>
        </Column>
      }
      renderItem={({ item }) => (
        <Card bgColor="white" mb={2}>
          <Heading size="sm" mb={1}>
            {item.attributes.title}
          </Heading>
          <Row flexWrap="wrap">
            <Text width="50%">
              <Icon as={Feather} name="book-open" /> {item.attributes.volume}-
              {item.attributes.chapter}
            </Text>
            <Text width="50%">
              <Icon as={Feather} name="globe" />{' '}
              {item.attributes.translatedLanguage}
            </Text>
            <Text width="50%">
              <Icon as={Feather} name="file" /> {item.attributes.pages}
            </Text>
            <Text width="50%" noOfLines={1}>
              <Icon as={Feather} name="calendar" />{' '}
              {
                new Date(item.attributes.createdAt)
                  .toISOString()
                  .split('T')?.[0]
              }
            </Text>
          </Row>
        </Card>
      )}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      keyExtractor={item => item.id}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      onEndReached={() => {
        if (data && chapters.length < data?.pages?.[0]?.total) fetchNextPage()
      }}
    />
  )
}
