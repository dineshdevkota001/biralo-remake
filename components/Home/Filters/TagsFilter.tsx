import { FilterChip, Section, formArrayHelpers } from './commmon'
import { queryFn } from '@api/manga'
import { MANGA_TAGS } from '@constants/api/routes'
import useVariables from '@contexts/VariableContext'
import { TagMode } from '@interfaces/dex/enum'
import { useQuery } from '@tanstack/react-query'
import { capitalize, groupBy } from 'lodash'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import { Chip, Switch, Text, useTheme } from 'react-native-paper'

export default function TagsFilter() {
  const { data } = useQuery<[string], Response.ErrorResponse, Tag.ListResponse>(
    [MANGA_TAGS],
    queryFn
  )
  const { colors } = useTheme()
  const { control } = useVariables()

  if (!data) return null

  const tags = data?.data
  const groupedByGroup = groupBy(tags, 'attributes.group')

  const formatFilters = Object.keys(groupedByGroup).map(key => ({
    title: capitalize(key.replaceAll('_', ' ')),
    values: groupedByGroup?.[key] ?? []
  }))

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between'
        }}
      >
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          Include only if all + tags match
        </Text>
        <Switch value={true} />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between'
        }}
      >
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          Exclude only if all + tags match
        </Text>
        <Switch value={true} />
      </View>
      {formatFilters?.map(({ title, values }) => (
        <Controller
          control={control}
          name="includeTags"
          render={({ field: { value: include, onChange: changeIncluded } }) => (
            <Controller
              control={control}
              name="excludeTags"
              render={({
                field: { value: exclude, onChange: changeExcluded }
              }) => (
                <Section title={title}>
                  {values.map(tag => {
                    const {
                      isPresent: included,
                      getToggledArray: toggleInclude
                    } = formArrayHelpers(include, tag, id => id === tag.id)

                    const {
                      isPresent: excluded,
                      getToggledArray: toggleExcluded
                    } = formArrayHelpers(exclude, tag, id => id === tag.id)

                    let icon: 'plus' | 'minus' | undefined

                    if (included) icon = 'plus'
                    if (excluded) icon = 'minus'

                    return (
                      <FilterChip
                        icon={icon}
                        onPress={() => {
                          if (!excluded) {
                            console.log('changing included')
                            changeIncluded(toggleInclude())
                          }
                          if (included || excluded) {
                            changeExcluded(toggleExcluded())
                            console.log('changing excluded')
                          }
                        }}
                      >
                        {capitalize(
                          tag.attributes.name?.en?.replaceAll('_', ' ')
                        )}
                      </FilterChip>
                    )
                  })}
                </Section>
              )}
            />
          )}
        />
      ))}
    </>
  )
}
