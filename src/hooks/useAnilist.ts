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

// Define your custom hook
export const useAnilistAvatar = (name: string) => {
  const [variables, setVariables] = useState({ name: "" });
  console.log("useAnilistAvatar called");
  const { loading, error, data } = useQuery<AnilistAvatar>(GET_ANILIST_AVATAR, {
    variables,
  });

  useEffect(() => {
    setVariables({ name });
  }, [name]);

  return { loading, error, data };
};
