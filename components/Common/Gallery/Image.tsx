import useGallery, {
  RESIZE_MODE,
  useGalleryDispatch
} from '@contexts/GalleryContext'
import { useEffect, useState } from 'react'
import { Dimensions, Image } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

const window = Dimensions.get('window')
const windowRatio = window.width / window.height

export default function ImagePage({ url }: { url: string }) {
  const [ratio, setRatio] = useState<number>(windowRatio)

  const { isHorizontal, resizeMode: resizeContext } = useGallery()
  const { setIsHorizontal, setResizeMode } = useGalleryDispatch()

  useEffect(() => {
    const fetchImageDimensions = async () => {
      await Image.prefetch(url)
      await Image.getSize(url, (width, height) => {
        const r = width / height
        setRatio(r)
        if (r < windowRatio) {
          setIsHorizontal(false)
          setResizeMode(RESIZE_MODE.FULL_WIDTH)
        }
      })
    }
    fetchImageDimensions()
  }, [setIsHorizontal, url, setResizeMode])

  const scale = useSharedValue(1)
  const yValue = useSharedValue(0)

  const pinchGesture = Gesture.Pinch()
    .onBegin(e => {
      scale.value = e.scale
    })
    .onChange(e => {
      scale.value = e.scale
    })
    .onEnd(() => {
      if (Math.abs(scale.value - 1) <= 0.1 || !isHorizontal)
        scale.value = withSpring(1)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value
      }
    ],
    top: yValue.value,
    opacity: (window.height - yValue.value) / window.height,
    position: 'relative'
  }))

  const getWidthAndHeightOfImage = () => {
    const source = {
      uri: url,
      width: window.width,
      height: window.height
    }
    let resizeMode = 'contain'

    switch (resizeContext) {
      case RESIZE_MODE.FULL_HEIGHT:
        source.width = window.height * ratio
        source.height = window.height
        break
      case RESIZE_MODE.FULL_WIDTH:
        source.height = window.width / ratio
        break
      case RESIZE_MODE.COVER:
        resizeMode = 'cover'
        break
      case RESIZE_MODE.FIT_BOTH:
      default:
        break
    }
    return { source, resizeMode: resizeMode as 'cover' | 'contain' }
  }

  const { source, resizeMode } = getWidthAndHeightOfImage()

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View
        style={[
          animatedStyle,
          {
            height: isHorizontal ? '100%' : source.height,
            width: isHorizontal ? source.width : '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        {isHorizontal ? (
          <Image
            source={{ ...source, height: window.height }}
            resizeMode={resizeMode}
            alt="Image"
          />
        ) : (
          <Image
            source={{
              uri: url,
              height: window.width / ratio,
              width: window.width
            }}
            resizeMode="contain"
            alt="Image"
          />
        )}
      </Animated.View>
    </GestureDetector>
  )
}
