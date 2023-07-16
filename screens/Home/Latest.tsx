import Duplicate from '@components/Core/Duplicate'
import MangaRow1Thumbnail, {
  MangaRow1Skeleton
} from '@components/Manga/Thumbnails/Row-1'
import { FlatList } from 'react-native'
import { useLatestChapters } from '@hooks/api/chapter'
import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import { Card, Text } from 'react-native-paper'
import MangaListAppbar from '@components/Common/Header/MangaListAppbar'
import { useState } from 'react'

export default function RecentChapters() {
  const [title, setTitle] = useState('')
  const {
    data: { items: mangas, pageInfo },
    isLoading,
    fetchNextPage
  } = useLatestChapters({
    variables: {
      title: title || undefined
    }
  })

  const keyExtractor = (item: (typeof mangas)[0], index: number) =>
    `${item?.id}-${item?.chapters?.[0]?.id}-${index}` || ''

  return (
    <>
      <MangaListAppbar setText={setTitle} title="Latest" />
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
        keyExtractor={keyExtractor}
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
