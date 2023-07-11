import CountryFlag from 'react-native-country-flag'
import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
import { ComponentProps } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const from639To3166Map: Record<string, string> = {
  [LocalizationLanguageEnum.EN]: 'us',
  [LocalizationLanguageEnum.UK]: 'gb',
  [LocalizationLanguageEnum.CS]: 'cz',
  [LocalizationLanguageEnum.KK]: 'kz',
  [LocalizationLanguageEnum.ZH]: 'cn',
  [LocalizationLanguageEnum.EO]: 'eun'
}

function flagMap(primary: string, second: string) {
  switch (primary) {
    case LocalizationLanguageEnum.PT:
      return second || primary
    default:
      return from639To3166Map?.[primary] ?? primary
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

  if (!Object.values(LocalizationLanguageEnum).includes(isoCode))
    console.log('unknown isoCode', isoCode)

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
          right: 0,
          bottom: 0,
          lineHeight: size / 2,
          fontSize: size / 2,
          backgroundColor: 'white',
          paddingHorizontal: 1,
          opacity: 0.8
        }}
      >
        {secondary.toUpperCase()}
      </Text>
    </View>
  )
}
