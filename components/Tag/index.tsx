import { getTitle } from '@utils/getLocalizedString'
import { capitalize, groupBy } from 'lodash'
import { View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

export default function Tag({ name, group }: Tag.Attributes) {
  const { colors } = useTheme()

  const groupToColorMap: Record<Tag.Group, string> = {
    format: colors.primaryContainer,
    content: colors.errorContainer,
    genre: colors.secondaryContainer,
    theme: colors.tertiaryContainer
  }

  return (
    <Chip
      style={{
        margin: 1,
        backgroundColor: group
          ? groupToColorMap?.[group] || colors.primary
          : colors.primary
      }}
      textStyle={{
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0
      }}
      compact
    >
      {getTitle(name)}
    </Chip>
  )
}

export function TagGroup({
  group,
  tags,
  hideTitle
}: {
  group: Tag.Group
  tags: Tag.Type[]
  hideTitle?: boolean
}) {
  const { colors } = useTheme()
  return (
    <View style={{ marginBottom: 4, marginTop: 4 }}>
      {hideTitle ? null : (
        <Text style={{ color: colors.onSurfaceVariant }}>
          {capitalize(group)}
        </Text>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {tags?.map(({ attributes: tag, id }) => (
          <Tag key={id} {...tag} />
        ))}
      </View>
    </View>
  )
}

export function Tags({
  tags,
  includeTags,
  excludeTags,
  hideTitle
}: {
  tags?: Tag.Type[]
  includeTags?: Tag.Group[]
  excludeTags?: Tag.Group[]
  hideTitle?: boolean
}) {
  if (!tags) return null

  const tagGroup = groupBy(tags, 'attributes.group')

  if (!includeTags?.length)
    return (
      <>
        {Object.keys(tagGroup)?.map(group =>
          excludeTags?.includes(group as Tag.Group) ? null : (
            <TagGroup
              key={group}
              group={group as Tag.Group}
              tags={tagGroup?.[group]}
              hideTitle={hideTitle}
            />
          )
        )}
      </>
    )

  return (
    <>
      {Object.keys(tagGroup)?.map(group =>
        includeTags.includes(group as Tag.Group) ? (
          <TagGroup
            key={group}
            group={group as Tag.Group}
            tags={tagGroup?.[group]}
            hideTitle={hideTitle}
          />
        ) : null
      )}
    </>
  )
}
