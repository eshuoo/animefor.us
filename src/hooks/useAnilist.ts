"use client";

import { useQuery, gql } from "@apollo/client";
import { AnilistAvatar } from "@/lib/query.interfaces";
import { useState, useEffect } from "react";

const GET_ANILIST_AVATAR = gql`
  query ($name: String) {
    User(name: $name) {
      avatar {
        medium
      }
    }
  }
`;

const GET_ANILIST_ANIME = gql`
  query ($name: String) {
    MediaListCollection(userName: $name, type: ANIME, status: PLANNING) {
      lists {
        entries {
          media {
            title {
              romaji
              english
            }
            siteUrl
          }
        }
      }
    }
  }
`;

// Define your custom hook
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

export const useAnilistAnime = (name: string) => {};
