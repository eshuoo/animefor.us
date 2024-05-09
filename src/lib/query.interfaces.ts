export interface AnilistAvatar {
  User: {
    avatar: {
      medium: string;
    };
  };
}

export interface AnilistAnimeList {
  MediaListCollection: {
    lists: Array<{
      entries: Array<{
        media: {
          title: {
            romaji: string;
            english: string;
          };
          siteUrl: string;
        };
      }>;
    }>;
  };
}
