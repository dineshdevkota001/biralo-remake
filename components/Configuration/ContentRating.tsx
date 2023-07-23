import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import {
  useMangadexConfig,
  useMangadexConfigDispatch
} from '@contexts/ConfigurationContext'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { ContentRatingEnum } from '@interfaces/mangadex/enum'
import spacing from '@utils/theme/spacing'
import { identity } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper'
import { useImmer } from 'use-immer'

const styles = StyleSheet.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing(4),
    justifyContent: 'space-between'
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing(1),
    flexWrap: 'wrap'
  }
})

export default function ContentRating() {
  const { colors } = useTheme()
  const [bottomSheetProps, { handleOpen }] = useBottomSheetModal()
  const { contentRating } = useMangadexConfig()
  const setConfig = useMangadexConfigDispatch()

  const [selected, setSelected] = useImmer(contentRating ?? [])

  return (
    <>
      <View style={styles.horizontal}>
        <Text variant="titleMedium">Content Rating</Text>
        <Button onPress={handleOpen} mode="text">
          Change
        </Button>
      </View>
      <View style={styles.chipContainer}>
        {contentRating?.map(language => (
          <Chip compact key={language}>
            {language}
          </Chip>
        ))}
      </View>
      <BottomSheetModal
        {...bottomSheetProps}
        snapPoints={['50%']}
        onDismiss={() => {
          setConfig('contentRating', selected)
        }}
      >
        <Card.Title title="Content Rating" />
        <BottomSheetFlatList
          style={{
            borderRadius: 16,
            marginHorizontal: 8,
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 8,
            display: 'flex',
            flex: 1,
            backgroundColor: colors.surface
          }}
          data={Object.values(ContentRatingEnum)}
          keyExtractor={identity}
          renderItem={({ item }) => {
            const index = selected?.findIndex(lang => lang === item)
            const isIncluded = index >= 0

            return (
              <TwowaySwitch
                label={item.toUpperCase()}
                value={isIncluded || undefined}
                onChange={() => {
                  setSelected(langs => {
                    if (isIncluded) langs.splice(index, 1)
                    else langs.push(item)
                    return langs
                  })
                }}
              />
            )
          }}
        />
      </BottomSheetModal>
    </>
  )
}
