import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Searchbar, useTheme } from 'react-native-paper'
import { TabScreen, Tabs } from 'react-native-paper-tabs'
import { TabScreenProps } from 'react-native-paper-tabs/lib/typescript/TabScreen'
import {
  useForm,
  useFormContext,
  useWatch,
  FormProvider
} from 'react-hook-form'
import useDebouncedInput from '@hooks/useDebouncedInput'
import { useEffect } from 'react'
import AppliedFilters from './AppliedFilters'
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

export default function MangaFilter() {
  const { colors } = useTheme()

  const [props, { handleOpen }] = useBottomSheetModal({
    shouldRenderBackdrop: true
  })

  const { control, reset, setValue } = useFormContext<IMangaRequest>()
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

  const { value, setValue: handleChangeText } = useDebouncedInput(v => {
    setValue('title', v)
  })

  return (
    <Appbar>
      <Searchbar
        value={value}
        onChangeText={handleChangeText}
        style={{
          flex: 1
        }}
        traileringIcon="filter-variant"
        onTraileringIconPress={handleOpen}
      />
      <BottomSheetModal
        {...props}
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
                label="Applied"
                icon="filter-check"
                contentContainerStyle={styles.tabScreen}
              >
                <AppliedFilters />
              </FilterTab>
              <FilterTab
                contentContainerStyle={styles.tabScreen}
                label="Status"
                icon="account-group"
              >
                <FormatFilter />
              </FilterTab>
              <FilterTab
                label="Tags"
                icon="tag"
                contentContainerStyle={styles.tabScreen}
              >
                <TagsFilter />
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
    </Appbar>
  )
}
