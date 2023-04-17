namespace Manga {
  type ObjectType = Dex.ObjectType.MANGA;

  interface Request {
    limit?: number;
    offset?: number;
    title?: string;
    authors?: Array<string>;
    artists?: Array<string>;
    year?: string;
    includedTags: Array<string>;
    includedTagsMode: "AND" |  "OR";
    excludedTags: Array<strings>;
    excludedTagsMode: "AND" |  "OR";
    status?: Status;
    originalLanguage?: Array<string>;
    excludedOriginalLanguage?: Array<string>;
    availableTranslatedLanguage?: Array<string>;
    contentRating?: ContentRating[];
    publicationDemographic?: PublicationDemographic[];
    // date
    createdAtSince?: string;
    createdAtSince?: string;

    // includes
    includes: "manga" | "cover_art" | "author" | "artist" | "tag";
  }
  type Create = Request;
  type Edit = Request;

  type PublicationDemographic = "shounen" | "shoujo" | "josei" | "seinen";
  type Status = "completed" | "ongoing" | "cancelled" | "hiatus";
  type ContentRating = "safe" | "suggestive" | "erotica" | "pornographic";
  type State = "draft" | "submitted" | "published" | "rejected";

  interface Attributes {
    title?: LocalizedString;
    altTitles?: Array<LocalizedString>;
    description?: LocalizedString;
    isLocked?: boolean;
    links?: { [key: string]: string };
    originalLanguage?: string;
    lastVolume?: string;
    lastChapter?: string;
    publicationDemographic?: PublicationDemographic;
    status?: Status;
    year?: number;
    contentRating?: ContentRating;
    chapterNumbersResetOnNewVolume?: boolean;
    availableTranslatedLanguages?: Array;
    latestUploadedChapter?: string;
    tags?: Array<Tag.Type>;
    state?: State;
    version?: number;
    createdAt?: string;
    updatedAt?: string;
  }

  type Type = Object<
    "manga",
    Attributes,
    Object<"cover_art", Cover.Attributes>[]
  >;
  type ListResponse = Response.Collection<Type>;
}