import { TagGroupEnum } from '@interfaces/enum'
import { getTitle } from '@utils/getLocalizedString'
import { capitalize, groupBy } from 'lodash'
import { View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

export default function Tag({
  name,
  group,
  id
}: ITagAttributes & { id: string }) {
  const { colors } = useTheme()

  const groupToColorMap: Record<TagGroupEnum, string> = {
    format: colors.primaryContainer,
    content: colors.errorContainer,
    genre: colors.secondaryContainer,
    theme: colors.tertiaryContainer
  }

  return (
    <Chip
      style={{
        backgroundColor: group
          ? groupToColorMap?.[group] || colors.primary
          : colors.primary
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
  group: TagGroupEnum
  tags: ITag[]
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
          flexWrap: 'wrap',
          gap: 4
        }}
      >
        {tags?.map(({ attributes: tag, id }) => (
          <Tag key={id} {...tag} id={id} />
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
  tags?: ITag[]
  includeTags?: TagGroupEnum[]
  excludeTags?: TagGroupEnum[]
  hideTitle?: boolean
}) {
  if (!tags) return null

  const tagGroup = groupBy(tags, 'attributes.group')

  if (!includeTags?.length)
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {Object.keys(tagGroup)?.map(group =>
          excludeTags?.includes(group as TagGroupEnum) ? null : (
            <TagGroup
              key={group}
              group={group as TagGroupEnum}
              tags={tagGroup?.[group]}
              hideTitle={hideTitle}
            />
          )
        )}
      </>
    )

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {Object.keys(tagGroup)?.map(group =>
        includeTags.includes(group as TagGroupEnum) ? (
          <TagGroup
            key={group}
            group={group as TagGroupEnum}
            tags={tagGroup?.[group]}
            hideTitle={hideTitle}
          />
        ) : null
      )}
    </>
  )
}
