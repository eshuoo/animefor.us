import { AnilistAnimeList, Media } from "./query.interfaces";

export interface CommonMediaCollection {
  media: Media;
  users: string[];
}

export const getCommonPlanning = (
  data: AnilistAnimeList
): CommonMediaCollection[] => {
  const mediaCount = new Map<string, CommonMediaCollection>();

  // search for common entries
  Object.entries(data).forEach(([username, mediaCollection]) => {
    mediaCollection.lists.forEach((list) => {
      list.entries.forEach((entry) => {
        const media = entry.media.siteUrl;
        const commonMediaEntry = mediaCount.get(media);

        // todo: optmalize without one set
        if (commonMediaEntry) {
          mediaCount.set(media, {
            media: entry.media,
            users: [...commonMediaEntry.users, username],
          });
        } else {
          mediaCount.set(media, {
            media: entry.media,
            users: [username],
          });
        }
      });
    });
  });

  // filtering common entries
  const commonMediaCollection: CommonMediaCollection[] = [];
  mediaCount.forEach((commonMedia, _) => {
    if (commonMedia.users.length >= 2) {
      commonMediaCollection.push(commonMedia);
    }
  });

  // sorting by user count and score
  const sortedCommonMediaCollection = commonMediaCollection.sort((a, b) => {
    return (
      b.users.length - a.users.length || b.media.meanScore - a.media.meanScore
    );
  });

  return sortedCommonMediaCollection;
};

// export const getCommonAnime2 = (data: AnilistAnimeList) => {
//   const mediaCount = new Map<string, string[]>();

//   for (const username in data) {
//     const usersCollection = data[username].lists[0];

//     usersCollection.entries.forEach(({ media }) => {
//       const commonMediaUsers = mediaCount.get(media.siteUrl);

//       if (!commonMediaUsers) mediaCount.set(media.siteUrl, [username]);
//       else mediaCount.set(media.siteUrl, [...commonMediaUsers, username]);
//     });
//   }

//   return mediaCount;
// };
