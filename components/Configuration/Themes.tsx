import ColorSelection from '@components/Common/Filters/ColorSelection'
import { defaultAppConfig } from '@constants/static/configuration'
import {
  useAppConfig,
  useAppConfigDispatch
} from '@contexts/ConfigurationContext'
import { StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  }
})

type IColorSchema = IAppConfig['colorScheme']
const themes = [
  { name: 'Cat', color: defaultAppConfig.themeColor, isDefault: true },
  {
    name: 'Midnight',
    color: '#000000',
    colorScheme: 'dark' as IColorSchema
  },
  { name: 'Red', color: '#aa6742' },
  { name: 'Green', color: '#67aa42' },
  { name: 'Sytem', color: '' }
]

export default function Themes() {
  const { themeColor = '' } = useAppConfig()
  const setConfig = useAppConfigDispatch()

  const handleThemeChange = (color: string, colorScheme?: IColorSchema) => {
    setConfig('themeColor', color)
    if (colorScheme) setConfig('colorScheme', colorScheme)
  }

  return (
    <View style={styles.root}>
      {themes?.map(({ color, name, isDefault, colorScheme }) => (
        <TouchableRipple
          onPress={() => handleThemeChange(color, colorScheme)}
          key={name}
        >
          <ColorSelection
            {...{ color, name, isDefault, isSelected: themeColor === color }}
          />
        </TouchableRipple>
      ))}
    </View>
  )
}
