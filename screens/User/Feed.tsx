import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import MangaRow1Thumbnail from '@components/Manga/Thumbnails/Row-1'
import { FlatList } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UserFeedScreen() {
  const mangas = []
  return (
    <SafeAreaView edges={['top']}>
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
        // ListFooterComponent={
        //   pageInfo?.hasNextPage || isLoading ? (
        //     <Duplicate
        //       Component={MangaRow1Skeleton}
        //       times={isLoading ? 6 : undefined}
        //     />
        //   ) : null
        // }
        // onEndReached={() => (pageInfo?.hasNextPage ? fetchNextPage() : null)}
      />
    </SafeAreaView>
  )
}