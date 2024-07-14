//AnilistAvatar
export interface AnilistAvatar {
  User: {
    avatar: {
      medium: string;
    };
  };
}

//AnilistAnimeList
export interface Media {
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  siteUrl: string;
  coverImage: {
    large: string;
  };
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
  meanScore: number;
  recommendations?: RecommendationNodes;
}

interface NodeEntry {
  mediaRecommendation: Media;
}

interface RecommendationNodes {
  nodes: NodeEntry;
}

export type TitleFormats = "romaji" | "english" | "native";

interface MediaEntry {
  media: Media;
}

interface MediaList {
  entries: MediaEntry[];
  isCustomList?: boolean;
}

interface UserMediaListCollection {
  lists: MediaList[];
}

export interface AnilistAnimeList {
  [key: string]: UserMediaListCollection;
}
