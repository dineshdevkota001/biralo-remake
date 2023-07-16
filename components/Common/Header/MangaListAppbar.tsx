import { BOTTOM_TABS, PROFILE } from '@constants/static/screens'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import DebouncedSearchbar from '../Input/Debounced/Searchbar'

export default function MangaListAppbar({
  setText,
  title,
  onFilter
}: {
  setText: (arg0: string) => void
  title: string
  onFilter?: () => void
}) {
  const navigation =
    useNavigation<IRootBottomTabsScreenProps<typeof BOTTOM_TABS>>()
  const height = useSharedValue(0)
  const style = useAnimatedStyle(
    () => ({
      height: height.value * 56,
      marginHorizontal: 16,
      marginBottom: 4,
      overflow: 'hidden'
    }),
    [height]
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="face-man-outline"
          onPress={() => navigation.navigate(PROFILE)}
        />
        <Appbar.Content title={title} />
        <Appbar.Action
          icon="search-web"
          onPress={runOnUI(() => {
            height.value = withTiming(height.value > 0 ? 0 : 1)
          })}
        />
        {onFilter ? (
          <Appbar.Action icon="filter-outline" onPress={onFilter} />
        ) : null}
      </Appbar.Header>
      <Animated.View style={style}>
        <DebouncedSearchbar placeholder="Search" onChangeText={setText} />
      </Animated.View>
    </>
  )
}
