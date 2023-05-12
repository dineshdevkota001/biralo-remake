import useConfiguration from '@contexts/ConfigurationContext'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import ColorSelection from '@components/Common/Filters/ColorSelection'

type IColorScheme = 'dark' | 'light'

const themes = [
  { name: 'Dark', color: '#000000', colorScheme: 'dark' as IColorScheme },
  { name: 'Light', color: '#fffff', colorScheme: 'light' as IColorScheme },
  { name: 'Sytem', color: '', isDefault: true, colorScheme: '' as IColorScheme }
]

export default function ColorScheme() {
  const { config, setConfig } = useConfiguration()

  const handleThemeChange = (colorScheme: IColorScheme) => {
    setConfig({
      colorScheme: colorScheme || undefined
    })
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
      }}
    >
      {themes?.map(({ color, name, isDefault, colorScheme }) => {
        const isSelected = (config.colorScheme || '') === colorScheme
        return (
          <TouchableRipple
            onPress={() => handleThemeChange(colorScheme)}
            key={name}
          >
            <ColorSelection {...{ color, name, isDefault, isSelected }} />
          </TouchableRipple>
        )
      })}
    </View>
  )
}
