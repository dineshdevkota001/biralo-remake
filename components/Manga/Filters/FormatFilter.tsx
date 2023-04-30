import { PublicationDemographicEnum, ContentRatingEnum } from '@interfaces/enum'
import { capitalize } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'
import { FilterChip, Section, formArrayHelpers } from './commmon'

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
          render={({ field: { value, onChange } }) => (
            <Section title={title}>
              {value?.length ? null : <FilterChip selected>Any</FilterChip>}
              {Object.values(values).map(tag => {
                const { isPresent, getToggledArray } = formArrayHelpers(
                  value,
                  tag
                )

                return (
                  <FilterChip
                    selected={isPresent}
                    onPress={() => {
                      onChange(getToggledArray())
                    }}
                  >
                    {capitalize(tag.split('_').join(' '))}
                  </FilterChip>
                )
              })}
            </Section>
          )}
        />
      ))}
    </>
  )
}
