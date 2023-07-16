import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { TabScreen, Tabs } from 'react-native-paper-tabs'
import { TabScreenProps } from 'react-native-paper-tabs/lib/typescript/TabScreen'
import {
  useForm,
  useFormContext,
  useWatch,
  FormProvider
} from 'react-hook-form'
import { RefObject, useEffect } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import FormatFilter from './FormatFilter'
import TagsFilter from './TagsFilter'
import OrderByFilter from './OrderByFilter'

const styles = StyleSheet.create({
  tabScreen: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
})

function FilterTab({
  label,
  icon,
  children,
  style,
  contentContainerStyle
}: TabScreenProps &
  IHaveChildren &
  Pick<ScrollViewProps, 'style' | 'contentContainerStyle'>) {
  return (
    <TabScreen label={label} icon={icon}>
      <ScrollView
        style={[
          {
            flex: 1,
            padding: 8
          },
          style
        ]}
        contentContainerStyle={[{ paddingBottom: 16 }, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    </TabScreen>
  )
}

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
            <FilterTab
              label="Tags"
              icon="tag"
              contentContainerStyle={styles.tabScreen}
            >
              <TagsFilter />
            </FilterTab>
            <FilterTab
              contentContainerStyle={styles.tabScreen}
              label="Status"
              icon="account-group"
            >
              <FormatFilter />
            </FilterTab>
            <FilterTab
              label="Order"
              icon="sort"
              contentContainerStyle={styles.tabScreen}
            >
              <OrderByFilter />
            </FilterTab>
          </Tabs>
        </BottomSheetView>
      </FormProvider>
    </BottomSheetModal>
  )
}
