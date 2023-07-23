import spacing from '@utils/theme/spacing'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
import { TabScreen } from 'react-native-paper-tabs'
import { TabScreenProps } from 'react-native-paper-tabs/lib/typescript/TabScreen'

const styles = StyleSheet.create({
  root: { flex: 1, padding: spacing(2) },
  content: {
    paddingBottom: spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
})

export default function FilterTab({
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
        style={[styles.root, style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    </TabScreen>
  )
}
