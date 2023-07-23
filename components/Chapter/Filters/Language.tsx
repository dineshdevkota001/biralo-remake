import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
import { identity } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

export default function LanguageFilter({
  name
}: {
  name: 'translatedLanguage' | 'originalLanguage'
}) {
  const { control } = useFormContext<IChapterRequest>()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <BottomSheetFlatList
          data={Object.values(LocalizationLanguageEnum)}
          keyExtractor={identity}
          renderItem={({ item }) => {
            const index = value?.findIndex(lang => lang === item) ?? -1
            const isIncluded = index >= 0

            return (
              <TwowaySwitch
                label={item.toUpperCase()}
                value={isIncluded || undefined}
                onChange={() => {
                  const copy = [...(value ?? [])]
                  if (isIncluded) copy.splice(index, 1)
                  else copy.push(item)
                  onChange(copy)
                }}
              />
            )
          }}
        />
      )}
    />
  )
}
