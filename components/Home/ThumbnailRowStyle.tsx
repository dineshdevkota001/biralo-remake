import { Tags } from "@components/Tag";
import useCoverArt from "@hooks/useCoverArt";
import { useNavigation } from "@react-navigation/native";
import { getTitle } from "@utils/getLocalizedString";
import { View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { SharedElement } from "react-navigation-shared-element";

interface IThumbnailProps {
  index: number;
  item: Manga.Type;
}

export default function Thumbnail({ index, item }: IThumbnailProps) {
  const { id, attributes, relationships } = item;
  const { title, tags } = attributes;
  const navigation = useNavigation<IRootBottomTabsScreenProps<"Home">>();
  const { url } = useCoverArt(id, relationships);

  return (
    <Card
      style={{
        margin: 8,
      }}
      contentStyle={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
      onPress={() =>
        navigation.navigate("Chapter List", { id: id, manga: item })
      }
    >
      <SharedElement id={`${id}.cover`}>
        <Card.Cover
          source={{
            uri: url,
          }}
          style={{
            width: 120,
          }}
        />
      </SharedElement>
      <View
        style={{
          flex: 1,
          display: "flex",
          alignSelf: "flex-start",
        }}
      >
        <Card.Title title={getTitle(title)} titleNumberOfLines={2} />
        <Card.Content
          style={{
            flex: 1,
          }}
        >
          <Tags tags={tags} includeTags={["theme", "genre"]} />
        </Card.Content>
      </View>
    </Card>
  );
}

export function ThumbnailSkeleton() {
  const { colors } = useTheme();
  return (
    <Card
      style={{ backgroundColor: colors.surfaceVariant, margin: 8 }}
      children={[null]}
    />
  );
}
