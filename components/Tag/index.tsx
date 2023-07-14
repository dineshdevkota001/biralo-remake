import { TagGroupEnum } from '@interfaces/mangadex/enum'
import { getTitle } from '@utils/getLocalizedString'
import spacing from '@utils/theme/spacing'
import { capitalize, groupBy } from 'lodash'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  tagContainerRoot: {
    marginVertical: spacing(1)
  },
  tagChildrenContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  }
})

export function TagGroupContainer({
  group,
  children,
  hideTitle
}: {
  group: TagGroupEnum
  children: ReactNode
  hideTitle?: boolean
}) {
  const { colors } = useTheme()
  return (
    <View style={styles.tagContainerRoot}>
      {hideTitle ? null : (
        <Text style={{ color: colors.onSurfaceVariant }}>
          {capitalize(group)}
        </Text>
      )}
      <View style={styles.tagChildrenContainer}>{children}</View>
    </View>
  )
}

export default function Tag({
  name,
  group,
  id
}: ITagAttributes & { id: string }) {
  const { colors } = useTheme()

  const groupToColorMap: Record<TagGroupEnum, string> = {
    [TagGroupEnum.FORMAT]: colors.primaryContainer,
    [TagGroupEnum.CONTENT]: colors.errorContainer,
    [TagGroupEnum.GENRE]: colors.secondaryContainer,
    [TagGroupEnum.THEME]: colors.tertiaryContainer
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

const defaultGroups = [
  TagGroupEnum.GENRE,
  TagGroupEnum.THEME,
  TagGroupEnum.CONTENT,
  TagGroupEnum.FORMAT
]

export function Tags({
  tags,
  groups = defaultGroups,
  hideTitle
}: {
  tags?: ITag[]
  groups?: TagGroupEnum[]

  hideTitle?: boolean
}) {
  const tagGroup = groupBy(tags ?? [], 'attributes.group') as Record<
    TagGroupEnum,
    ITag[]
  >

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {(Object.keys(tagGroup) as TagGroupEnum[])?.map(group =>
        groups.includes(group as TagGroupEnum) ? (
          <TagGroupContainer key={group} group={group} hideTitle={hideTitle}>
            {tagGroup?.[group]?.map(({ attributes, id }) => (
              <Tag key={id} {...attributes} id={id} />
            ))}
          </TagGroupContainer>
        ) : null
      )}
    </>
  )
}
