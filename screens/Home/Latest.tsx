import Duplicate from '@components/Core/Duplicate'
import MangaRow1Thumbnail, {
  MangaRow1Skeleton
} from '@components/Manga/Thumbnails/Row-1'
import { FlatList } from 'react-native'
import { useLatestChapters } from '@hooks/api/chapter'
import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'

export default function RecentChapters() {
  const {
    data: mangas,
    isLoading,
    fetchNextPage,
    pageInfo
  } = useLatestChapters()

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        data={mangas}
        renderItem={({ item }) =>
          item ? (
            <MangaRow1Thumbnail {...item}>
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
        onEndReached={() => fetchNextPage()}
      />
    </SafeAreaView>
  )
}
