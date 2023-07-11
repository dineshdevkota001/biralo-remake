import ChapterCompactThumbnail from '@components/Chapter/Thumbnail/Compact'
import MangaRow1Thumbnail from '@components/Manga/Thumbnails/Row-1'
import useAuth from '@contexts/AuthContext'
import LoginButton from '@screens/Profile/LoginButton'
import { FlatList } from 'react-native'
import { Appbar, Card, Dialog, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UserFeedScreen() {
  const { user } = useAuth()
  const mangas: (IManga & { chapters: IChapter[] })[] = []

  if (!user)
    return (
      <>
        <Appbar.Header>
          <Appbar.Content title="Feed" />
        </Appbar.Header>
        <Dialog visible dismissable={false}>
          <Dialog.Title>No user login</Dialog.Title>
          <Dialog.Content>
            <Text>Log in to get your feed here.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <LoginButton />
          </Dialog.Actions>
        </Dialog>
      </>
    )

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        data={mangas}
        scrollEnabled={false}
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
      />
    </SafeAreaView>
  )
}
