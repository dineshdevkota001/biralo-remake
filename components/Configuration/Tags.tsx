import TagsFilter from '@components/Manga/Filters/TagsFilter'
import useConfiguration from '@contexts/ConfigurationContext'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between'
  },
  vertical: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: 16
  },
  textCenter: {
    textAlign: 'center'
  }
})

export default function Tags() {
  const { colors } = useTheme()
  const { config, setConfig } = useConfiguration()
  const [props, { handleOpen }] = useBottomSheetModal({
    shouldRenderBackdrop: true
  })
  const { excludedTags, includedTags } = config ?? {}

  const form = useForm({
    defaultValues: {
      excludedTags,
      includedTags
    }
  })

  const onSubmit = form.handleSubmit(
    (values: Pick<IMangadexConfig, 'excludedTags' | 'includedTags'>) => {
      setConfig({
        excludedTags: values?.excludedTags,
        includedTags: values?.includedTags
      })
    }
  )

  return (
    <>
      <View style={styles.horizontal}>
        <Text variant="titleMedium">Tags</Text>
        <Button onPress={handleOpen} mode="text">
          Change
        </Button>
      </View>
      <View style={styles.horizontal}>
        <Card style={styles.vertical}>
          <Text variant="titleSmall">Excluded</Text>
          <Text variant="displaySmall" style={styles.textCenter}>
            {excludedTags.length ?? 0}
          </Text>
        </Card>
        <Card style={styles.vertical}>
          <Text variant="titleSmall">Included</Text>
          <Text variant="displaySmall" style={styles.textCenter}>
            {includedTags.length ?? 0}
          </Text>
        </Card>
      </View>
      <BottomSheetModal
        {...props}
        snapPoints={['50%', '80%']}
        onDismiss={() => {
          onSubmit()
        }}
      >
        <BottomSheetScrollView
          style={{
            margin: 4,
            padding: 8,
            backgroundColor: colors.surface,
            borderRadius: 16
          }}
          contentContainerStyle={{
            paddingBottom: 16
          }}
        >
          <FormProvider {...form}>
            <TagsFilter />
          </FormProvider>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  )
}
