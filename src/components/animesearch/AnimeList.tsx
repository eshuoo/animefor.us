import React from "react";
import style from "./AnimeList.module.scss";
import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonPlanning } from "@/lib/utility";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const { data, loading, error } = useAnilistAnime(usernames);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (data) {
    const commonPlanning = getCommonPlanning(data);
  }
};

export default AnimeList;
