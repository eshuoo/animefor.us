"use client";

import { useQuery, gql } from "@apollo/client";
import { AnilistAvatar, AnilistAnimeList } from "@/lib/query.interfaces";
import { useState, useEffect } from "react";

// This is a query to get the avatar of an Anilist user

const GET_ANILIST_AVATAR = gql`
  query ($name: String) {
    User(name: $name) {
      avatar {
        medium
      }
    }
  }
`;

export const useAnilistAvatar = (name: string) => {
  const [deboundedName, setDeboundedName] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeboundedName(name);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  const { loading, error, data } = useQuery<AnilistAvatar>(GET_ANILIST_AVATAR, {
    skip: !deboundedName,
    variables: { name: deboundedName },
  });

  return { loading, error, data };
};

// This is a query to get the anime list of an Anilist user

const createDynamicAnilistAnimeQuery = (usernames: string[]) => {
  if (usernames.length === 0) {
    return gql`
      query {
        __typename
      }
    `;
  }

  const userQueries = usernames.map(
    (name) => `
    ${name}PLANNING: MediaListCollection(userName: $${name}, type: ANIME, status: PLANNING) {
      lists {
        isCustomList
        entries {
          media {
            title {
              romaji
              english
              native
            }
            siteUrl
            coverImage {
              large
            }
            status
            meanScore
          }
        }
      }
    }
    ${name}DROPPED: MediaListCollection(userName: $${name}, type: ANIME, status: DROPPED) {
      lists {
        isCustomList
        entries {
          media {
            siteUrl
          }
        }
      }
    }
    ${name}CURRENT: MediaListCollection(userName: $${name}, type: ANIME, status: CURRENT) {
      lists {
        isCustomList
        entries {
          media {
            siteUrl
          }
        }
      }
    }
    ${name}PAUSED: MediaListCollection(userName: $${name}, type: ANIME, status: PAUSED) {
      lists {
        isCustomList
        entries {
          media {
            siteUrl
          }
        }
      }
    }
    ${name}COMPLETED_ALL: MediaListCollection(userName: $${name}, type: ANIME, status: COMPLETED) {
      lists {
        isCustomList
        entries {
          media {
            siteUrl
          }
        }
      }
    }
    ${name}COMPLETED: MediaListCollection(userName: $${name}, type: ANIME, status: COMPLETED, sort: SCORE_DESC, perChunk: 20, chunk: 1) {
      lists {
        entries {
          media {
            siteUrl
            recommendations(perPage: 10, sort:[RATING_DESC]) {
              nodes {
                mediaRecommendation {
                  title {
                    romaji
                    english
                    native
                  }
                  siteUrl
                  coverImage {
                    large
                  }
                  meanScore
                  format
                }
              }
            }
          }
        }
      }
    }
    ${name}REPEATING: MediaListCollection(userName: $${name}, type: ANIME, status: REPEATING, sort: SCORE_DESC, perChunk: 20, chunk: 1) {
      lists {
        entries {
          media {
            siteUrl
            recommendations(perPage: 10, sort:[RATING_DESC]) {
              nodes {
                mediaRecommendation {
                  title {
                    romaji
                    english
                    native
                  }
                  siteUrl
                  coverImage {
                    large
                  }
                  meanScore
                  format
                }
              }
            }
          }
        }
      }
    }`
  );

  const variableDefinitions = usernames
    .map((name) => `$${name}: String`)
    .join(", ");

  const fullQuery = gql`
    query (${variableDefinitions}) {
      ${userQueries.join("\n")}
    }
  `;

  return fullQuery;
};

export const useAnilistAnime = (usernames: string[]) => {
  const GET_ANILIST_ANIME = createDynamicAnilistAnimeQuery(usernames);

  const variables: { [key: string]: string } = {};
  usernames.forEach((username) => {
    variables[username] = username;
  });

  const { loading, error, data } = useQuery<AnilistAnimeList>(
    GET_ANILIST_ANIME,
    { skip: usernames.length === 0, variables }
  );

  return { loading, error, data };
};
