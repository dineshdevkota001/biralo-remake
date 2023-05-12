import ColorSelection from '@components/Common/Filters/ColorSelection'
import defaultConfig from '@constants/static/configuration'
import useConfiguration from '@contexts/ConfigurationContext'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

type IColorScheme = 'dark'

const themes = [
  { name: 'Cat', color: defaultConfig.themeColor, isDefault: true },
  { name: 'Midnight', color: '#000000', colorScheme: 'dark' as IColorScheme },
  { name: 'Red', color: '#aa6742' },
  { name: 'Green', color: '#67aa42' },
  { name: 'Sytem', color: '' }
]

export default function Themes() {
  const { config, setConfig } = useConfiguration()

  const handleThemeChange = (color: string, colorScheme?: IColorScheme) => {
    if (colorScheme)
      setConfig({
        themeColor: color,
        colorScheme
      })
    else setConfig({ themeColor: color })
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
        const isSelected = (config.themeColor ?? '') === color
        return (
          <TouchableRipple
            onPress={() => handleThemeChange(color, colorScheme)}
            key={name}
          >
            <ColorSelection {...{ color, name, isDefault, isSelected }} />
          </TouchableRipple>
        )
      })}
    </View>
  )
}
