import Duplicate from '@components/Core/Duplicate'
import MangaRow1Thumbnail, {
  MangaRow1Skeleton
} from '@components/Manga/Thumbnails/Row-1'
import { FlatList } from 'react-native'
import { useLatestChapters } from '@hooks/api/chapter'
import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import { Appbar, Card, Text } from 'react-native-paper'
import { LATEST, PROFILE } from '@constants/static/screens'

export default function RecentChapters({
  navigation
}: IRootBottomTabsScreenProps<typeof LATEST>) {
  const {
    data: mangas,
    isLoading,
    fetchNextPage,
    pageInfo
  } = useLatestChapters()

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="face-agent"
          onPress={() => navigation.navigate(PROFILE)}
        />
        <Appbar.Content title="Latest" />
      </Appbar.Header>
      <FlatList
        data={mangas}
        renderItem={({ item }) =>
          item ? (
            <MangaRow1Thumbnail {...item}>
              <Card.Content
                style={{
                  gap: 4
                }}
              >
                {item.chapters?.slice(0, 3).map(chapter => (
                  <ChapterCompactThumbnail key={chapter.id} {...chapter} />
                ))}
                {item.chapters?.length && item.chapters?.length > 3 ? (
                  <Text
                    style={{
                      padding: 4
                    }}
                  >
                    + {item.chapters.length - 3} more{' '}
                  </Text>
                ) : null}
              </Card.Content>
            </MangaRow1Thumbnail>
          ) : null
        }
        keyExtractor={(item, index) =>
          `${item?.id}${item?.chapters?.[0]?.id}${index}` || ''
        }
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          pageInfo?.hasNextPage || isLoading ? (
            <Duplicate
              Component={MangaRow1Skeleton}
              times={isLoading ? 6 : undefined}
            />
          ) : null
        }
        onEndReached={() => (pageInfo?.hasNextPage ? fetchNextPage() : null)}
      />
    </>
  )
}
