import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import { capitalize } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Section, formArrayHelpers } from '../../Manga/Filters/commmon'

export default function FormatFilter({
  formatFilters
}: {
  formatFilters: {
    name: string
    title: string
    values: Record<string, string>
  }[]
}) {
  const { control } = useFormContext()

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {formatFilters?.map(({ name, title, values }) => (
        <Controller
          control={control}
          name={name}
          key={title}
          render={({ field: { value, onChange } }) => {
            return (
              <Section title={title}>
                {Object.values(values).map(item => {
                  const { isPresent, getToggledArray } = formArrayHelpers(
                    value,
                    item
                  )
                  return (
                    <View
                      style={{
                        flex: 1,
                        minWidth: '40%',
                        maxWidth: '50%'
                      }}
                      key={item?.id}
                    >
                      <TwowaySwitch
                        value={isPresent}
                        onChange={() => {
                          onChange(getToggledArray())
                        }}
                        label={capitalize(item.split('_').join(' '))}
                      />
                    </View>
                  )
                })}
              </Section>
            )
          }}
        />
      ))}
    </>
  )
}
