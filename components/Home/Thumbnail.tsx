import CoverImage from "./Image";
import { useNavigation } from "@react-navigation/native";
import { getString, getTitle } from "@utils/getLocalizedString";
import { AspectRatio, View } from "native-base";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { SharedElement } from "react-navigation-shared-element";

interface IThumbnailProps {
  index: number;
  item: Manga.Type;
}

const imageRatio = 9 / 9;

export default function Thumbnail({ index, item }: IThumbnailProps) {
  const { id, attributes } = item;
  const { title, description } = attributes;
  const navigation = useNavigation<IRootBottomTabsScreenProps<"Home">>();

  return (
    <TouchableRipple
      style={{
        marginBottom: 8,
        flex: 1 / 2,
        marginLeft: index % 2 === 1 ? 4 : 0,
      }}
      onPress={() =>
        navigation.navigate("Chapter List", { id: id, manga: item })
      }
    >
      <Card
        style={{
          width: "100%",
        }}
      >
        <SharedElement id={`${id}.cover`}>
          <AspectRatio w="100%" ratio={imageRatio}>
            <CoverImage {...item} />
          </AspectRatio>
        </SharedElement>
        <Card.Content>
          <Text variant="labelLarge">{getTitle(title)}</Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
}

export function ThumbnailSkeleton() {
  const { colors } = useTheme();
  return (
    <View paddingBottom={2} height={100} width="50%" paddingX={2}>
      <Card
        style={{ backgroundColor: colors.surfaceVariant }}
        children={[null]}
      />
    </View>
  );
}
