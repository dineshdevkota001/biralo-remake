import Icon from '@components/Core/Icon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useChapterThumbnail from '@hooks/components/useChapterThumbnail'
import { formatDistance } from 'date-fns'
import { ComponentProps } from 'react'
import { View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'

type IconProps = ComponentProps<typeof MaterialCommunityIcons>

function Detail({
  iconName,
  children,
  iconColor
}: IHaveChildren & {
  iconName: IconProps['name']
  iconColor?: IconProps['color']
}) {
  const { colors } = useTheme()

  return (
    <View
      style={{
        width: '50%',
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Icon
        name={iconName}
        color={iconColor ?? colors.onSurfaceVariant}
        size={16}
      />
      <Text style={{ color: iconColor ?? colors.onSurface }}> {children}</Text>
    </View>
  )
}

export default function ChapterType1Thumbnail({
  children,
  ...item
}: IChapterThumbnailProps) {
  const { colors } = useTheme()
  const {
    title,
    chapter,
    pages,
    readableAt,
    translatedLanguage,
    handleGallery,
    scanlationGroup,
    user
  } = useChapterThumbnail({ item })

  return (
    <Card style={{ margin: 4 }} onPress={handleGallery}>
      <Card.Title title={`Ch. ${chapter ?? 0} ${title ?? ''}`} />
      <Card.Content
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {scanlationGroup ? (
          <Detail iconName="google-circles-extended">
            {scanlationGroup.name}
          </Detail>
        ) : null}
        {user ? (
          <Detail
            iconColor={
              user.roles.includes('ROLE_STAFF') ? colors.primary : undefined
            }
            iconName="guy-fawkes-mask"
          >
            {user.username}
          </Detail>
        ) : null}
        <Detail iconName="translate"> {translatedLanguage}</Detail>
        <Detail iconName="file"> {pages}</Detail>
        {readableAt ? (
          <Detail iconName="calendar">
            {formatDistance(new Date(readableAt), new Date(), {
              addSuffix: true
            })}
          </Detail>
        ) : null}
      </Card.Content>
      {children}
    </Card>
  )
}

export function ChapterType1Skeleton() {
  return (
    <Card style={{ marginBottom: 8, height: 148, width: '100%' }}>
      <Card.Content>{null}</Card.Content>
    </Card>
  )
}
