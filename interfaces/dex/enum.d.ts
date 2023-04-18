namespace Dex {
  type ObjectType =
    | "manga"
    | "chapter"
    | "cover_art"
    | "user"
    | "author"
    | "custom_list"
    | "group"
    | "manga_relation"
    | "mapping_id"
    | "tag"
    | "scanlation_group";
  type TagMode = "AND" | "OR";
  type PublicationDemographic = "shounen" | "shoujo" | "josei" | "seinen";
  type Status = "completed" | "ongoing" | "cancelled" | "hiatus";
  type ContentRating = "safe" | "suggestive" | "erotica" | "pornographic";
  type State = "draft" | "submitted" | "published" | "rejected";
  type Order = "asc" | "desc";
}
