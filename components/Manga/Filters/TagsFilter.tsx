import { generalQueryFn } from '@api/common'
import { MANGA_TAGS } from '@constants/api/routes'
import { useQuery } from '@tanstack/react-query'
import { capitalize, groupBy } from 'lodash'
import { Control, Controller, Path, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Switch, Text, useTheme } from 'react-native-paper'
import { TagModeEnum } from '@interfaces/enum'
import PlusMinusChip from '@components/Common/Filters/PlusMinusChip'
import { Section, formArrayHelpers } from './commmon'

function SwitchWithTitle({
  title,
  control,
  name
}: {
  title: string
  control: Control<IMangaRequest>
  name: Path<IMangaRequest>
}) {
  const { colors } = useTheme()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
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
            {title}
          </Text>
          <Switch
            value={value === TagModeEnum.AND}
            onValueChange={v => onChange(v ? TagModeEnum.AND : TagModeEnum.OR)}
          />
        </View>
      )}
    />
  )
}

export default function TagsFilter() {
  const { data } = useQuery<[string], IResponseError, ITagCollection>(
    [MANGA_TAGS],
    generalQueryFn
  )
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
      <SwitchWithTitle
        control={control}
        name="includedTagsMode"
        title="Include only if all + tags match"
      />
      <SwitchWithTitle
        control={control}
        name="excludedTagsMode"
        title="Exclude only if all - tags match"
      />
      {formatFilters?.map(({ title, values }) => (
        <Controller
          key={title}
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
                    } = formArrayHelpers(
                      include ?? [],
                      tag,
                      id => id === tag.id
                    )

                    const {
                      isPresent: excluded,
                      getToggledArray: toggleExcluded
                    } = formArrayHelpers(
                      exclude ?? [],
                      tag,
                      id => id === tag.id
                    )

                    let icon: 'plus' | 'minus' | undefined

                    if (included) icon = 'plus'
                    if (excluded) icon = 'minus'

                    return (
                      <PlusMinusChip
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
                      </PlusMinusChip>
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
