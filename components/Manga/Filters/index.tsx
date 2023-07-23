import FilterTab from '@components/Common/Filters/Tab'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { RefObject, useEffect } from 'react'
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { useTheme } from 'react-native-paper'
import { Tabs } from 'react-native-paper-tabs'
import FormatFilter from './FormatFilter'
import MangaOrderByFilter from './OrderByFilter'
import TagsFilter from './TagsFilter'

export default function MangaFilter({
  modalRef
}: {
  modalRef: RefObject<BottomSheetModalMethods> | null
}) {
  const { colors } = useTheme()

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
        <BottomSheetView
          style={{
            marginHorizontal: 8,
            backgroundColor: colors.surface,
            borderRadius: 16,
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <Tabs
            style={{
              backgroundColor: colors.surface
            }}
            iconPosition="top"
            uppercase={false}
            mode="scrollable"
          >
            <FilterTab label="Tags" icon="tag">
              <TagsFilter />
            </FilterTab>
            <FilterTab label="Status" icon="account-group">
              <FormatFilter />
            </FilterTab>
            <FilterTab label="Order" icon="sort">
              <MangaOrderByFilter />
            </FilterTab>
          </Tabs>
        </BottomSheetView>
      </FormProvider>
    </BottomSheetModal>
  )
}
