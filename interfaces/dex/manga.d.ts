namespace Manga {
  interface Request {
    title?: LocalizedString;
    altTitles?: Array<LocalizedString>;
    description?: LocalizedString;
    authors?: Array<string>;
    artists?: Array<string>;
    links?: { [key: string]: string };
    originalLanguage?: string;
    lastVolume?: string;
    lastChapter?: string;
    publicationDemographic?: PublicationDemographic;
    status?: Status;
    year?: number;
    contentRating?: ContentRating;
    chapterNumbersResetOnNewVolume?: boolean;
    tags?: Array<string>;
    primaryCover?: string;
    version?: number;
    includes?: "cover_art"[];
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

namespace Cover {
  interface Attributes {
    volume?: string;
    fileName?: string;
    description?: string;
    locale?: string;
    version?: number;
    createdAt?: string;
    updatedAt?: string;
  }
}
