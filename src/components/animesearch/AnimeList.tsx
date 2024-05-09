import React from "react";
import style from "./AnimeList.module.scss";
import { useAnilistAnime } from "@/hooks/useAnilist";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const { data, loading, error } = useAnilistAnime(usernames);
  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <div className={style.container}>
      {usernames.map((username, index) => (
        <div key={index}>{username}</div>
      ))}
    </div>
  );
};

export default AnimeList;
