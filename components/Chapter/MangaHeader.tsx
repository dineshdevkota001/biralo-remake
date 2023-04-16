import { Tags } from "@components/Tag";
import useCoverArt from "@hooks/useCoverArt";
import { useRoute } from "@react-navigation/native";
import { getString, getTitle } from "@utils/getLocalizedString";
import { View } from "react-native";
import { Card, Surface, Text } from "react-native-paper";
import { SharedElement } from "react-navigation-shared-element";

export default function MangaHeader() {
  const {
    params: { manga },
  } = useRoute<IRootStackScreenProps<"Chapter List">["route"]>();
  const { title, description, tags } = manga.attributes;
  const { url } = useCoverArt(manga.id, manga.relationships);

  return (
    <Surface
      mode="flat"
      style={{ marginBottom: 12, paddingTop: 12, paddingBottom: 12 }}
    >
      <Card.Content>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <SharedElement id={`${manga.id}.cover`}>
            <Card.Cover
              source={{
                uri: url,
              }}
              style={{
                width: 120,
              }}
            />
          </SharedElement>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Card.Title
              title={getTitle(title)}
              titleNumberOfLines={2}
              style={{
                flex: 1,
              }}
            />
            <Card.Content>
              <Tags includeTags={["theme", "content"]} tags={tags} />
            </Card.Content>
          </View>
        </View>
        <Tags tags={tags} excludeTags={["theme", "content"]} />
        <Text>{getString(description)}</Text>
      </Card.Content>
    </Surface>
  );
}
