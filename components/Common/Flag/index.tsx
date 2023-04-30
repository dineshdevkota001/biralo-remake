import CountryFlag from 'react-native-country-flag'
import { LocalizationLanguageEnum } from '@interfaces/enum'
import { ComponentProps } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

function flagMap(primary: string, second: string) {
  switch (primary) {
    case LocalizationLanguageEnum.EN:
      return 'us'
    case LocalizationLanguageEnum.UK:
      return 'gb'
    case LocalizationLanguageEnum.PT:
      return second || primary
    default:
      return primary
  }
}

export default function Flag({
  isoCode,
  size = 16,
  style
}: {
  isoCode?: LocalizationLanguageEnum | undefined | null
} & Partial<ComponentProps<typeof CountryFlag>>) {
  if (!isoCode) return null

  const [primary, secondary] =
    isoCode?.length <= 2 ? [isoCode, ''] : isoCode.split('-')

  const countryCode = flagMap(primary, secondary)

  if (!secondary || secondary === countryCode)
    return (
      <CountryFlag
        isoCode={countryCode}
        size={size ?? 16}
        style={[style, { borderWidth: 0.5, borderRadius: 4 }]}
      />
    )

  return (
    <View
      style={{
        position: 'relative'
      }}
    >
      <CountryFlag
        isoCode={countryCode}
        size={size}
        style={[style, { borderWidth: 0.5, borderRadius: 4 }]}
      />
      <Text
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          lineHeight: size / 2,
          fontSize: size / 2,
          backgroundColor: 'white',
          opacity: 0.7
        }}
      >
        {secondary}
      </Text>
    </View>
  )
}
