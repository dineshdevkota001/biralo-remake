import AppliedFilters from './AppliedFilters'
import FormatFilter from './FormatFilter'
import TagsFilter from './TagsFilter'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import useBottomSheetModal from '@hooks/useBottomSheet'
import { useNavigation } from '@react-navigation/native'
import { ScrollViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Searchbar, useTheme } from 'react-native-paper'
import { TabScreen, Tabs } from 'react-native-paper-tabs'
import { TabScreenProps } from 'react-native-paper-tabs/lib/typescript/TabScreen'

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
        contentContainerStyle={contentContainerStyle}
        children={children}
      />
    </TabScreen>
  )
}

export default function MangaFilter() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [props, { handleOpen }] = useBottomSheetModal({
    shouldRenderBackdrop: true
  })

  return (
    <>
      <Searchbar
        value=""
        icon="face-man"
        traileringIcon="filter-variant"
        onIconPress={() => {
          navigation.navigate('Profile')
        }}
        onTraileringIconPress={handleOpen}
      />
      <BottomSheetModal {...props} snapPoints={['70%']}>
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
            <FilterTab label="Applied" icon="filter-check">
              <AppliedFilters />
            </FilterTab>
            <FilterTab
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
              label="Status"
              icon="account-group"
            >
              <FormatFilter />
            </FilterTab>
            <FilterTab
              label="Tags"
              icon="tag"
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <TagsFilter />
            </FilterTab>
          </Tabs>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}
