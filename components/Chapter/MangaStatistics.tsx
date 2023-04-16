import { queryFn } from "@api/manga";
import Icon from "@components/Core/Icon";
import { MANGA_STATISTICS } from "@constants/api/routes";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import useBottomSheetModal from "@hooks/useBottomSheet";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text, useTheme } from "react-native-paper";

type IDistributionKey = keyof Statistics.Rating["distribution"];
const ratings: Array<IDistributionKey> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function RatingHistoGram({
  distribution,
}: Pick<Statistics.Rating, "distribution">) {
  const { colors } = useTheme();
  const max = Object.values(distribution).reduce((m, c) => (c > m ? c : m), 0);
  const normalized = Object.keys(distribution).reduce((acc, curr) => {
    acc[curr] =
      ((distribution?.[curr as unknown as IDistributionKey] || 0) * 100) / max;
    return acc;
  }, Object.create(null));

  const height = "10%";

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View>
        {ratings.map((rating) => (
          <View
            style={{
              height,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Icon name="star-outline" size={16} color={colors.onSurface} />
            <Text key={`${rating}-number`} style={{ color: colors.onSurface }}>
              {" "}
              {rating}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, marginRight: 4, marginLeft: 4 }}>
        {ratings.map((rating) => (
          <View
            style={{
              backgroundColor: colors.primary,
              width: `${normalized?.[rating]}%`,
              borderWidth: 1,
              borderColor: colors.surface,
              height,
              position: "relative",
            }}
          />
        ))}
      </View>
      <View>
        {ratings.map((rating) => (
          <View
            style={{
              height,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text key={`${rating}-number`} style={{ color: colors.onSurface }}>
              {distribution?.[rating]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function MangaStatistics() {
  const { params } = useRoute<IRootStackScreenProps<"Chapter List">["route"]>();
  const mangaId = params.manga.id;
  const { data } = useQuery<
    QueryKey,
    Response.ErrorResponse,
    Statistics.MangaResponse
  >([MANGA_STATISTICS(mangaId)], queryFn);
  const [props, { handleOpen, handleClose }] = useBottomSheetModal({
    shouldRenderBackdrop: true,
  });

  const { comments, rating, follows } = data?.statistics?.[mangaId] ?? {};

  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        },
        styles.antiChip,
      ]}
    >
      <Chip
        icon="bookmark-outline"
        compact
        style={styles.chip}
        textStyle={styles.chipTitle}
      >
        {follows || 0}
      </Chip>
      <Chip
        icon="star-outline"
        compact
        style={styles.chip}
        textStyle={styles.chipTitle}
        onPress={handleOpen}
      >
        {rating?.bayesian?.toFixed(2) || 0}
      </Chip>
      {rating ? (
        <BottomSheetModal
          {...props}
          snapPoints={["50%"]}
          style={{ marginBottom: 50 }}
          backdropComponent={({ style, ...props }) => {
            return (
              <BottomSheetBackdrop
                {...props}
                style={[
                  {
                    backgroundColor: "red",
                  },
                  style,
                ]}
                opacity={100}
                onPress={handleClose}
              />
            );
          }}
        >
          <RatingHistoGram {...rating} />
        </BottomSheetModal>
      ) : null}
      <Chip
        icon="comment-outline"
        compact
        style={styles.chip}
        textStyle={styles.chipTitle}
      >
        {comments?.repliesCount || 0}
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    margin: 4,
  },
  antiChip: {
    margin: -4,
  },
  chipTitle: {
    fontSize: 10,
    marginTop: 0,
    marginBottom: 0,
  },
});
