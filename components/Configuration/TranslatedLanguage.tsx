import Flag from '@components/Common/Flag'
import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import {
  useMangadexConfig,
  useMangadexConfigDispatch
} from '@contexts/ConfigurationContext'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
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

export default function TranslatedLanguage() {
  const { colors } = useTheme()
  const [bottomSheetProps, { handleOpen }] = useBottomSheetModal()
  const { translatedLanguage } = useMangadexConfig()
  const setConfig = useMangadexConfigDispatch()

  const [selectedLangauges, setSelectedLangauges] = useImmer(translatedLanguage)

  return (
    <>
      <View style={styles.horizontal}>
        <Text variant="titleMedium">Translated Language</Text>
        <Button onPress={handleOpen} mode="text">
          Change
        </Button>
      </View>
      <View style={styles.chipContainer}>
        {translatedLanguage?.map(language => (
          <Chip compact key={language}>
            <Flag isoCode={language} /> {language}
          </Chip>
        ))}
      </View>
      <BottomSheetModal
        {...bottomSheetProps}
        snapPoints={['50%']}
        onDismiss={() => {
          setConfig('translatedLanguage', selectedLangauges)
        }}
      >
        <Card.Title title="Translated Language" />
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
          data={Object.values(LocalizationLanguageEnum)}
          keyExtractor={identity}
          renderItem={({ item }) => {
            const index = selectedLangauges.findIndex(lang => lang === item)
            const isIncluded = index >= 0

            return (
              <TwowaySwitch
                label={item.toUpperCase()}
                value={isIncluded || undefined}
                onChange={() => {
                  setSelectedLangauges(langs => {
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
