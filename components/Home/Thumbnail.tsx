import { useNavigation } from "@react-navigation/native"
import { getString, getTitle } from "@utils/getLocalizedString"
import { AspectRatio, Pressable, Card, Heading, Text, Skeleton, View } from "native-base"
import { SharedElement } from "react-navigation-shared-element"
import CoverImage from "./Image"

interface IThumbnailProps {
  index: number
  item: Manga.Type
}

const imageRatio = 9 / 9

export default function Thumbnail({ index, item }: IThumbnailProps) {
  const { id, attributes } = item
  const { title, description } = attributes
  const navigation = useNavigation()

  return <Pressable
    marginBottom={2}
    flex={1 / 2}
    marginLeft={index % 2 === 1 ? 2 : 0}
    padding={0}
    onPress={() => navigation.navigate('Chapter List', { id: id, manga: item })
    }
  >
    <SharedElement id={`${id}.cover`}>
      <AspectRatio w="100%" ratio={imageRatio}>
        <CoverImage {...item} />
      </AspectRatio>
    </SharedElement>
    <Card bgColor="white" w="100%">
      <Heading size="sm" noOfLines={2}>
        {getTitle(title)}
      </Heading>
      <Text fontSize="xs" noOfLines={3}>
        {getString(description)}
      </Text>
    </Card>
  </Pressable>
}

export function ThumbnailSkeleton() {
  return <View paddingBottom={2} width="50%" paddingX={2}>
    <Card bgColor="white">
      <AspectRatio w="100%" ratio={imageRatio}>
        <Skeleton height="100%" width="100%" />
      </AspectRatio>
      <Skeleton.Text mt={1} space={0.5} />
    </Card>
  </View>
}
