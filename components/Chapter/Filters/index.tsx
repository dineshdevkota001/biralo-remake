import FilterTab from '@components/Common/Filters/Tab'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import useBottomSheetModal from '@hooks/useBottomSheet'
import useTheme, { createStyle } from '@styles/appStyle'
import spacing from '@utils/theme/spacing'
import { RefObject, useEffect } from 'react'
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { Tabs } from 'react-native-paper-tabs'
import MangaOrderByFilter from './OrderByFilter'
import LanguageFilter from './Language'

const getStyles = createStyle(({ colors }) => ({
  root: {
    marginHorizontal: spacing(2),
    borderRadius: spacing(4),
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.surface
  },
  surface: {
    backgroundColor: colors.surface
  }
}))

export default function ChapterFilter({
  modalRef
}: {
  modalRef: RefObject<BottomSheetModalMethods> | null
}) {
  const styles = getStyles(useTheme())

  const [props] = useBottomSheetModal({
    shouldRenderBackdrop: true
  })

  const { control, reset } = useFormContext<IMangaRequest>()
  const defaultValues = useWatch({ control })

  const onSubmit = (value: IMangaRequest) => {
    reset(value)
  }

  const form = useForm<IMangaRequest>({
    defaultValues
  })
  const { reset: localReset } = form
  useEffect(() => {
    // this will reset to defaultValues as said in the docs
    localReset(defaultValues)
  }, [localReset, defaultValues])

  return (
    <BottomSheetModal
      {...props}
      ref={modalRef}
      snapPoints={['70%']}
      onDismiss={form.handleSubmit(onSubmit)}
    >
      <FormProvider {...form}>
        <BottomSheetView style={styles.root}>
          <Tabs
            style={styles.surface}
            iconPosition="top"
            uppercase={false}
            mode="scrollable"
          >
            <FilterTab label="Order" icon="sort">
              <MangaOrderByFilter />
            </FilterTab>
            <FilterTab label="Translated" icon="translate">
              <LanguageFilter name="translatedLanguage" />
            </FilterTab>
            <FilterTab label="Original" icon="google-translate">
              <LanguageFilter name="originalLanguage" />
            </FilterTab>
          </Tabs>
        </BottomSheetView>
      </FormProvider>
    </BottomSheetModal>
  )
}
