import { CDN } from '@constants/api'
import { GalleryContextProvider } from '@contexts/GalleryContext'
import useChapterControls from '@hooks/useChapterControl'
import { QualityEnum } from '@interfaces/mangadex/enum'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Button, useTheme } from 'react-native-paper'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import GalleryFlatList from './List'
import Menu from './Menu'

const window = Dimensions.get('window')
const { height } = window

const panDownHeight = 0.11 * height

export default function Gallery() {
  const { colors } = useTheme()
  const [title, setTitle] = useState('')
  const route = useRoute<IRootStackScreenProps<'Gallery'>['route']>()
  const navigation = useNavigation()
  const yValue = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      if (e.y < 2 * panDownHeight) yValue.value = e.translationY
    })
    .onChange(e => {
      if (e.y < 2 * panDownHeight) yValue.value = e.translationY
    })
    .onEnd(e => {
      if (e.y < 2 * panDownHeight && e.translationY > 0.5 * height)
        runOnJS(navigation.goBack)()
      yValue.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(
    () => ({
      top: yValue.value,
      opacity: 1 - yValue.value / window.height
    }),
    []
  )

  const { quality = QualityEnum.DATA_SAVER, chapterId } = route.params

  const { data } = useQuery<unknown, unknown, string[]>(
    [chapterId, quality],
    async () => {
      const res = await axios.get(`${CDN}/${chapterId}`)

      const { baseUrl, chapter } = res.data
      const { hash } = chapter

      return chapter?.[quality === 'data' ? 'data' : 'dataSaver'].map(
        (filename: string) => `${baseUrl}/${quality}/${hash}/${filename}`
      )
    }
  )

  const { goNext, hasNext, currentChapter } = useChapterControls()

  useEffect(() => {
    if (currentChapter) setTitle(`Chapter ${currentChapter.chapter}`)
  }, [currentChapter])

  return (
    <GalleryContextProvider>
      <SafeAreaView
        style={{ position: 'relative', backgroundColor: colors.background }}
      >
        <GalleryFlatList
          style={animatedStyle}
          data={data ?? []}
          ListFooterComponent={
            hasNext ? (
              <Button
                mode="contained"
                onPress={goNext}
                icon="arrow-right-circle"
              >
                Next Chapter
              </Button>
            ) : (
              <Button mode="contained" onPress={navigation.goBack}>
                Chapter List
              </Button>
            )
          }
          ListFooterComponentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            paddingBottom: 48,
            paddingTop: 48
          }}
        />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              animatedStyle,
              {
                position: 'absolute',
                left: 0,
                width: '100%',
                height: panDownHeight
              }
            ]}
          />
        </GestureDetector>
        <Menu title={title} id={chapterId} />
      </SafeAreaView>
    </GalleryContextProvider>
  )
}
