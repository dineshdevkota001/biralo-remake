import { useInfiniteQuery } from '@tanstack/react-query'
import {
  AspectRatio,
  Card,
  FlatList,
  Heading,
  Pressable,
  Skeleton,
  Text
} from 'native-base'
import { queryFn, getNextPageParam } from 'api'
import { flatten } from 'lodash'
import { MANGA } from '@constants/api/routes'
import CoverImage from '@components/Home/Image'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'

export default function Home({
  navigation
}: IRootBottomTabsScreenProps<'Home'>) {
  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage
  } = useInfiniteQuery<[string, IMangaRequest], IError, ICollection<IManga>>(
    [MANGA, { limit: 10, includes: ['cover_art'] }],
    queryFn,
    {
      getNextPageParam
    }
  )

  return (
    <FlatList
      data={flatten((data?.pages ?? [])?.map(({ data }) => data))}
      numColumns={2}
      renderItem={({ item, index }) =>
        isLoading ? (
          <Card bgColor="white" marginBottom={2} flex={1 / 2} marginX={2}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Skeleton height="100%" width="100%" />
            </AspectRatio>
            <Skeleton fontSize="xl" />
            <Skeleton />
          </Card>
        ) : (
          <Pressable
            marginBottom={2}
            flex={1 / 2}
            marginLeft={index % 2 === 1 ? 2 : 0}
            padding={0}
            onPress={() =>
              navigation.navigate('Chapter List', { id: item.id, manga: item })
            }
          >
            <SharedElement id={`${item.id}.cover`}>
              <AspectRatio w="100%" ratio={9 / 16}>
                <CoverImage id={item.id} relationships={item.relationships} />
              </AspectRatio>
            </SharedElement>
            <Card bgColor="white" w="100%">
              <Heading size="sm" noOfLines={2}>
                {item?.attributes?.title?.en}
              </Heading>
              <Text fontSize="xs" noOfLines={3}>
                {item?.attributes?.description?.en}
              </Text>
            </Card>
          </Pressable>
        )
      }
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      keyExtractor={item => item.id}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      onEndReached={() => fetchNextPage()}
    />
  )
}
