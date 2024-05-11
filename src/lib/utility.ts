import { AnilistAnimeList, Media } from "./query.interfaces";

export const getCommonPlanning = (data: AnilistAnimeList) => {
  const mediaCount = new Map<Media, number>();

  Object.values(data).forEach((userMediaListCollection) => {
    userMediaListCollection.lists[0].entries.forEach((entry) => {
      const media = entry.media;
      if (mediaCount.has(media)) {
        mediaCount.set(media, mediaCount.get(media) + 1);
      } else {
        mediaCount.set(media, 1);
      }
    });
  });

  //   return commonPlanning;
};

// https://chatgpt.com/c/ca52e5a4-5f7b-4e24-b2cc-81ac7e9015fa
