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
    (_, index) => `
    user${index + 1}: MediaListCollection(userName: $name${
      index + 1
    }, type: ANIME, status: PLANNING) {
      lists {
        entries {
          media {
            title {
              romaji
              english
            }
            siteUrl
            coverImage {
              large
            }
          }
        }
      }
    }`
  );

  const variableDefinitions = usernames
    .map((_, index) => `$name${index + 1}: String`)
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
  usernames.forEach((username, index) => {
    variables[`name${index + 1}`] = username;
  });

  const { loading, error, data } = useQuery<AnilistAnimeList>(
    GET_ANILIST_ANIME,
    { skip: usernames.length === 0, variables }
  );

  return { loading, error, data };
};
