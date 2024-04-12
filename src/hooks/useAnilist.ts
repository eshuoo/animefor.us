"use client";

import { useQuery, gql } from "@apollo/client";
import { AnilistAvatar } from "@/lib/query.interfaces";
import { useState, useEffect, useMemo } from "react";

const GET_ANILIST_AVATAR = gql`
  query ($name: String) {
    User(name: $name) {
      avatar {
        medium
      }
    }
  }
`;

// Define your custom hook
export const useAnilistAvatar = (name: string) => {
  const [deboundedName, setDeboundedName] = useState(name);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeboundedName(name);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  const { loading, error, data } = useQuery<AnilistAvatar>(GET_ANILIST_AVATAR, {
    variables: { name: deboundedName },
  });

  return { loading, error, data };
};
