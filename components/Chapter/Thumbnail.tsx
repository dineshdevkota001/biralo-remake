import Icon from '@components/Core/Icon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TypeEnum } from '@interfaces/mangadex'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTitle } from '@utils/getLocalizedString'
import getRelationOfType from '@utils/getRelationshipOfType'
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

export default function Thumbnail({ attributes, id, relationships }: IChapter) {
  const { colors } = useTheme()
  const { title, chapter, pages, createdAt, translatedLanguage } = attributes
  const route = useRoute<IRootStackScreenProps<'Chapter List'>['route']>()
  const navigation =
    useNavigation<IRootStackScreenProps<'Chapter List'>['navigation']>()

  const { manga } = route.params ?? {}

  const { scanlation_group: scanlationGroup, user } = relationships.reduce(
    (acc, curr) => {
      if (curr.type) acc[curr.type] = curr.attributes
      return acc
    },
    Object.create(null)
  )

  return (
    <Card
      style={{ margin: 4 }}
      onPress={() =>
        navigation.navigate('Gallery', {
          chapterId: id,
          mangaId:
            (getRelationOfType(relationships, TypeEnum.MANGA) as IManga)?.id ??
            ''
        })
      }
    >
      <Card.Title
        title={`Ch. ${chapter} ${title ?? getTitle(manga.attributes.title)}`}
      />
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
        {createdAt ? (
          <Detail iconName="calendar">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true
            })}
          </Detail>
        ) : null}
      </Card.Content>
    </Card>
  )
}

export function ThumbnailSkeleton() {
  return (
    <Card style={{ marginBottom: 8, height: 148, width: '100%' }}>
      <Card.Content>{null}</Card.Content>
    </Card>
  )
}
