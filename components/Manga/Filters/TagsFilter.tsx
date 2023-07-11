import { generalQueryFn } from '@hooks/api/common'
import { MANGA_TAGS } from '@constants/api/routes'
import { useQuery } from '@tanstack/react-query'
import { capitalize, groupBy } from 'lodash'
import { Control, Controller, Path, useFormContext } from 'react-hook-form'
import { View, ViewStyle } from 'react-native'
import { Switch, Text, useTheme } from 'react-native-paper'
import { TagModeEnum } from '@interfaces/mangadex/enum'
import ThreewaySwitch from '@components/Common/Input/Controlled/ThreewaySwitch'
import { Section, formArrayHelpers } from './commmon'

function SwitchWithTitle({
  title,
  control,
  name,
  direction = 'column'
}: {
  title: string
  control: Control<IMangaRequest>
  name: Path<IMangaRequest>
  direction?: ViewStyle['flexDirection']
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
            flexDirection: direction,
            alignItems: 'center',
            gap: 8,
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <Switch
            value={value === TagModeEnum.AND}
            onValueChange={v => onChange(v ? TagModeEnum.AND : TagModeEnum.OR)}
          />
          <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
            {title} mode : {value}
          </Text>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 32,
          justifyContent: 'space-evenly'
        }}
      >
        <SwitchWithTitle
          control={control}
          name="includedTagsMode"
          title="Include"
        />
        <SwitchWithTitle
          control={control}
          name="excludedTagsMode"
          title="Exclude"
        />
      </View>
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
                <Section
                  containerStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                  title={title}
                >
                  {values.map(tag => {
                    const {
                      isPresent: included,
                      getRemovedArray: removeInclude,
                      getInsertedArray: insertInclude
                    } = formArrayHelpers(
                      include ?? [],
                      tag,
                      id => id === tag.id
                    )

                    const {
                      isPresent: excluded,
                      getRemovedArray: removeExclude,
                      getInsertedArray: insertExclude
                    } = formArrayHelpers(
                      exclude ?? [],
                      tag,
                      id => id === tag.id
                    )

                    let value
                    if (excluded) value = false
                    else if (included) value = true

                    return (
                      <View
                        style={{
                          flex: 1,
                          minWidth: '40%',
                          maxWidth: '50%'
                        }}
                      >
                        <ThreewaySwitch
                          label={capitalize(
                            tag.attributes.name?.en?.replaceAll('_', ' ')
                          )}
                          value={value}
                          rightIconProps={{
                            name: 'plus'
                          }}
                          leftIconProps={{
                            name: 'minus'
                          }}
                          onChange={v => {
                            if (typeof v === 'undefined')
                              changeExcluded(removeExclude())
                            else if (v === true) changeIncluded(insertInclude())
                            else if (v === false) {
                              changeExcluded(insertExclude())
                              changeIncluded(removeInclude())
                            }
                          }}
                        />
                      </View>
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
