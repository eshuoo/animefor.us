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
}

interface MediaEntry {
  media: Media;
}

interface MediaList {
  entries: MediaEntry[];
}

interface UserMediaListCollection {
  lists: MediaList[];
}

export interface AnilistAnimeList {
  [key: string]: UserMediaListCollection;
}
