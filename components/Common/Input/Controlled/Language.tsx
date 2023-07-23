import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
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
        <>
          {Object.values(LocalizationLanguageEnum)?.map(item => {
            const index = value?.findIndex(lang => lang === item) ?? -1
            const isIncluded = index >= 0

            return (
              <TwowaySwitch
                key={item}
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
          })}
          {/* {} */}
        </>
      )}
    />
  )
}
