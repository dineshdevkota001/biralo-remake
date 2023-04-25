// import Thumbnail, { ThumbnailSkeleton } from "@components/Chapter/Thumbnail";
import Duplicate from "@components/Core/Duplicate";
import Thumbnail, {
  ThumbnailSkeleton,
} from "@components/Home/ThumbnailRowStyle";
import { CHAPTER, MANGA } from "@constants/api/routes";
import { ObjectType } from "@interfaces/dex/enum";
import { useInfiniteQuery } from "@tanstack/react-query";
import getFlattenedList from "@utils/getFlattenedList";
import getRelationOfType from "@utils/getRelationshipOfType";
import { getNextPageParam, queryFn } from "api";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Home() {
  const { data, error, isLoading, isRefetching, refetch, fetchNextPage } =
    useInfiniteQuery<
      [string, Chapter.Request],
      Response.ErrorResponse,
      Chapter.ListResponse
    >([CHAPTER, { limit: 10, includes: ["manga"] } as Manga.Request], queryFn, {
      getNextPageParam,
    });

  const mangas = getFlattenedList(data);
  console.log(mangas);
  const noOfMangas = mangas?.length;
  const total = data?.pages?.[0]?.total;

  console.log(mangas?.[0]?.relationships);

  return (
    <FlatList
      data={mangas}
      renderItem={(props) => (
        <Thumbnail
          item={getRelationOfType(props.item.relationships, ObjectType.MANGA)}
        />
      )}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        (noOfMangas && total && noOfMangas < total) || isLoading ? (
          <Duplicate Component={ThumbnailSkeleton} />
        ) : null
      }
      onEndReached={() => fetchNextPage()}
    />
  );
}
