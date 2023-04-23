import Duplicate from "@components/Core/Duplicate";
import Thumbnail, {
  ThumbnailSkeleton,
} from "@components/Home/ThumbnailRowStyle";
import { MANGA } from "@constants/api/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import getFlattenedList from "@utils/getFlattenedList";
import { getNextPageParam, queryFn } from "api";
import { FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Home() {
  const { data, isLoading, isRefetching, refetch, fetchNextPage } =
    useInfiniteQuery<
      [string, Manga.Request],
      Response.ErrorResponse,
      Manga.ListResponse
    >([MANGA, { limit: 10, includes: ["cover_art"] }], queryFn, {
      getNextPageParam,
    });

  const mangas = getFlattenedList(data);
  const noOfMangas = mangas?.length;
  const total = data?.pages?.[0]?.total;

  return (
    <View>
      <FlatList
        data={mangas}
        renderItem={(props) => <Thumbnail {...props} />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          (noOfMangas && total && noOfMangas < total) || isLoading ? (
            <Duplicate Component={ThumbnailSkeleton} />
          ) : null
        }
        onEndReached={() => fetchNextPage()}
      />
      {/* <MangaFilter /> */}
    </View>
  );
}
