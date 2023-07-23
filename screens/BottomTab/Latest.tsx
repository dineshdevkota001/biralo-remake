import Duplicate from '@components/Core/Duplicate'
import MangaRow1Thumbnail, {
  MangaRow1Skeleton
} from '@components/Manga/Thumbnails/Row-1'
import { FlatList } from 'react-native'
import { useLatestChapters } from '@hooks/api/chapter'
import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import { Card, Text } from 'react-native-paper'
import MangaListAppbar from '@components/Common/Header/MangaListAppbar'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import cleanObject from '@utils/cleanObject'
import ChapterFilter from '@components/Chapter/Filters'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

const keyExtractor = (item: IManga & { chapters: IChapter[] }, index: number) =>
  `${item?.id}-${item?.chapters?.[0]?.id}-${index}` || ''

export default function RecentChapters() {
  const config = useMangadexConfig()

  const form = useForm<IChapterRequest>({
    defaultValues: {}
  })
  const { control, setValue } = form

  useEffect(() => {
    if (config) {
      setValue('translatedLanguage', config.translatedLanguage)
      setValue('originalLanguage', config.originalLanguage)
      setValue('contentRating', config.contentRating)
    }
  }, [setValue, config])

  const watched = useWatch({ control })

  const variables = cleanObject<IChapterRequest>(watched)

  const [title, setTitle] = useState('')
  const {
    data: { items: mangas, pageInfo },
    isLoading,
    fetchNextPage,
    isRefetching,
    refetch
  } = useLatestChapters({
    variables: {
      title: title || undefined,
      ...variables
    }
  })

  const ref = useRef<BottomSheetModalMethods>(null)
  const handleOpen = () => {
    ref.current?.present()
  }

  return (
    <FormProvider {...form}>
      <MangaListAppbar
        setText={setTitle}
        title="Latest"
        onFilter={handleOpen}
      />
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
        refreshing={isRefetching}
        onRefresh={refetch}
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
      <ChapterFilter modalRef={ref} />
    </FormProvider>
  )
}
