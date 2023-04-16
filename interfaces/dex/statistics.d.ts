namespace Statistics {
  type Comment = {
    threadId: string;
    repliesCount: number;
  };
  type Rating = {
    average: number | null;
    bayesian: number | null;
    distribution: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, number>;
  };
  type Manga = {
    comments: Comment;
    rating: Rating;
    follows: number;
  };
  type Chapter = {
    comments: Comment;
  };

  type MangaResponse = Response.Statistics<Record<string, Statistics.Manga>>;
  type ChapterResponse = Response.Statistics<Record<string, Statistics.Manga>>;
}
