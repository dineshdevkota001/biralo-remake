import { generalQueryFn } from '@api/common'
import { MANGA_TAGS } from '@constants/api/routes'
import { useQuery } from '@tanstack/react-query'
import { capitalize, groupBy } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Switch, Text, useTheme } from 'react-native-paper'
import { FilterChip, Section, formArrayHelpers } from './commmon'

export default function TagsFilter() {
  const { data } = useQuery<[string], IResponseError, ITagCollection>(
    [MANGA_TAGS],
    generalQueryFn
  )
  const { colors } = useTheme()
  const { control } = useFormContext<IMangaRequest>()

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
        <Switch value />
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
        <Switch value />
      </View>
      {formatFilters?.map(({ title, values }) => (
        <Controller
          control={control}
          name="includedTags"
          render={({ field: { value: include, onChange: changeIncluded } }) => (
            <Controller
              control={control}
              name="excludedTags"
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
                            changeIncluded(toggleInclude())
                          }
                          if (included || excluded) {
                            changeExcluded(toggleExcluded())
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
