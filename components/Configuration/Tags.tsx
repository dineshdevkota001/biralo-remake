import TagsFilter from '@components/Manga/Filters/TagsFilter'
import {
  useMangadexConfig,
  useMangadexConfigDispatch
} from '@contexts/ConfigurationContext'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import spacing from '@utils/theme/spacing'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing(4),
    justifyContent: 'space-between'
  },
  vertical: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: spacing(4)
  },
  textCenter: {
    textAlign: 'center'
  },
  bottomSheetContentContainer: {
    paddingBottom: spacing(4)
  },
  bottomSheetContainer: {
    margin: spacing(1),
    padding: spacing(2),
    borderRadius: spacing(4)
  }
})

function TagCountCard({
  title,
  count
}: {
  title: string
  count: number | undefined
}) {
  return (
    <Card style={styles.vertical}>
      <Text variant="titleSmall">{title}</Text>
      <Text variant="displaySmall" style={styles.textCenter}>
        {count ?? 0}
      </Text>
    </Card>
  )
}

export default function Tags() {
  const { colors } = useTheme()
  const config = useMangadexConfig()
  const setConfig = useMangadexConfigDispatch()

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
      setConfig('includedTags', values.includedTags)
      setConfig('excludedTags', values.excludedTags)
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
        <TagCountCard title="Excluded" count={excludedTags?.length} />
        <TagCountCard title="Included" count={includedTags?.length} />
      </View>
      <BottomSheetModal
        {...props}
        snapPoints={['50%', '80%']}
        onDismiss={() => {
          onSubmit()
        }}
      >
        <BottomSheetScrollView
          style={[
            styles.bottomSheetContainer,
            {
              backgroundColor: colors.surface
            }
          ]}
          contentContainerStyle={styles.bottomSheetContentContainer}
        >
          <FormProvider {...form}>
            <TagsFilter />
          </FormProvider>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  )
}
