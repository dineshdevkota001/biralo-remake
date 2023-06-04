import TagsFilter from '@components/Manga/Filters/TagsFilter'
import useConfiguration from '@contexts/ConfigurationContext'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Text, useTheme } from 'react-native-paper'

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
    (values: Pick<IConfigContext, 'excludedTags' | 'includedTags'>) => {
      setConfig({
        excludedTags: values?.excludedTags,
        includedTags: values?.includedTags
      })
    }
  )

  return (
    <>
      <Text>{excludedTags?.length || 0} tags excluded</Text>
      <Text>{includedTags?.length || 0} tags included</Text>
      <Text>{JSON.stringify(config)} tags included</Text>
      <Button onPress={handleOpen}>Change</Button>
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
