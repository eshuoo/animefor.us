import { CSSProperties } from "react";
import { AnilistAnimeList, Media } from "./query.interfaces";

export interface CommonMediaCollection {
  media: Media;
  users: string[];
}

export const getCommonAnime = (
  data: AnilistAnimeList
): {
  commonMediaList: CommonMediaCollection[];
  recommendedMediaList: CommonMediaCollection[];
} => {
  const commonMediaCount = new Map<string, CommonMediaCollection>();
  const recommendedMediaCount = new Map<string, CommonMediaCollection>();
  const knownAnime = new Set<string>();

  // generate watchedAnime set
  Object.entries(data).forEach(([username, mediaCollection]) => {
    if (username.endsWith("ALL")) {
      mediaCollection.lists.forEach((list) => {
        list.entries.forEach((entry) => {
          knownAnime.add(entry.media.siteUrl);
        });
      });
    }
  });
  // search for common entries and recommendations
  Object.entries(data).forEach(([username, mediaCollection]) => {
    if (
      !username.endsWith("ALL") &&
      !username.endsWith("REPEATING") &&
      !username.endsWith("COMPLETED")
    ) {
      mediaCollection.lists
        .filter((list) => list.isCustomList === false)
        .forEach((list) => {
          list.entries.forEach((entry) => {
            const media = entry.media.siteUrl;
            const commonMediaEntry = commonMediaCount.get(media);

            commonMediaCount.set(media, {
              media: entry.media,
              users: commonMediaEntry
                ? [...commonMediaEntry.users, username]
                : [username],
            });
          });
        });
    }
    if (username.endsWith("COMPLETED") || username.endsWith("REPEATING")) {
      mediaCollection.lists.forEach((list) => {
        list.entries.forEach((entry) => {
          entry.media.recommendations?.nodes.forEach((node) => {
            if (
              node.mediaRecommendation !== null &&
              !knownAnime.has(node.mediaRecommendation.siteUrl)
            ) {
              const media = node.mediaRecommendation.siteUrl;
              const recommendedMediaEntry = recommendedMediaCount.get(media);

              const regex = /(COMPLETED|REPEATING)$/;

              recommendedMediaCount.set(media, {
                media: node.mediaRecommendation,
                users: recommendedMediaEntry
                  ? [
                      ...recommendedMediaEntry.users,
                      username.replace(regex, ""),
                    ]
                  : [username.replace(regex, "")],
              });
            }
          });
        });
      });
    }
  });

  // converting Map to array and filtering common entries
  const commonMediaCollection = Array.from(commonMediaCount.values()).filter(
    (media) => media.users.length >= 2
  );
  const recommendedMediaCollection = Array.from(recommendedMediaCount.values())
    .map((media) => {
      const users = new Set(media.users);
      return { media: media.media, users: Array.from(users) };
    })
    .filter((media) => {
      return media.users.length >= 2;
    });

  // sorting by user count and score
  const sortedCommonMediaCollection = commonMediaCollection.sort((a, b) => {
    return (
      b.users.length - a.users.length || b.media.meanScore - a.media.meanScore
    );
  });
  const sortedRecommendedMediaCollection = recommendedMediaCollection
    .sort((a, b) => {
      return (
        b.users.length - a.users.length || b.media.meanScore - a.media.meanScore
      );
    })
    .slice(0, 10);

  console.log(sortedRecommendedMediaCollection);

  return {
    commonMediaList: sortedCommonMediaCollection,
    recommendedMediaList: sortedRecommendedMediaCollection,
  };
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

export const calculateColor = (score: number): CSSProperties => {
  if (score >= 90) {
    return { color: `rgb(0, 255, 0)` };
  }
  if (score >= 70 && score < 90) {
    const redValue = Math.floor(((90 - score) / 20) * 255);
    return { color: `rgb(${redValue}, 255, 0)` };
  }
  if (score >= 50 && score < 70) {
    const greenValue = 255 - Math.floor(((70 - score) / 20) * 255);
    return { color: `rgb(255, ${greenValue}, 0)` };
  }
  return { color: `rgb(255, 0, 0)` };
};
