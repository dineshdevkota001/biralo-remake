import Icon from "@components/Core/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTitle } from "@utils/getLocalizedString";
import { formatDistance } from "date-fns";
import { ComponentProps } from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

function Detail({
  iconName,
  children,
}: IHaveChildren & {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: "50%",
        marginBottom: 4,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Icon name={iconName} color={colors.onSurfaceVariant} size={16} />
      <Text> {children}</Text>
    </View>
  );
}

export default function Thumbnail({ attributes, id }: Chapter.Type) {
  const { title, chapter, pages, createdAt, translatedLanguage } = attributes;
  const route = useRoute<IRootStackScreenProps<"Chapter List">["route"]>();
  const navigation =
    useNavigation<IRootStackScreenProps<"Chapter List">["navigation"]>();

  const { manga } = route.params ?? {};

  return (
    <Card
      style={{ margin: 4 }}
      onPress={() =>
        navigation.navigate("Gallery", { chapterId: id, mangaId: manga.id })
      }
    >
      <Card.Title
        title={`Chapter ${chapter} ${
          title ?? getTitle(manga.attributes.title)
        }`}
      />
      <Card.Content
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Detail iconName="translate"> {translatedLanguage}</Detail>
        <Detail iconName="file"> {pages}</Detail>
        {createdAt ? (
          <Detail iconName="calendar">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </Detail>
        ) : null}
      </Card.Content>
    </Card>
  );
}

export function ThumbnailSkeleton() {
  return (
    <Card style={{ marginBottom: 8, height: 48 }}>
      <Card.Content>{null}</Card.Content>
    </Card>
  );
}
