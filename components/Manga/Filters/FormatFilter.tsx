import {
  PublicationDemographicEnum,
  ContentRatingEnum
} from '@interfaces/mangadex/enum'
import { capitalize } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import TwowaySwitch from '@components/Common/Input/Controlled/TwoWaySwitch'
import { Section, formArrayHelpers } from './commmon'

const formatFilters = [
  {
    name: 'publicationDemographic',
    title: 'Demographics',
    values: PublicationDemographicEnum
  },
  {
    name: 'contentRating',
    title: 'Content Rating',
    values: ContentRatingEnum
  }
]

export default function FormatFilter() {
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
                {Object.values(values).map(tag => {
                  const { isPresent, getToggledArray } = formArrayHelpers(
                    value,
                    tag
                  )
                  return (
                    <View
                      style={{
                        flex: 1,
                        minWidth: '40%',
                        maxWidth: '50%'
                      }}
                    >
                      <TwowaySwitch
                        value={isPresent}
                        onChange={() => {
                          onChange(getToggledArray())
                        }}
                        label={capitalize(tag.split('_').join(' '))}
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
