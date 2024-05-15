import React from "react";
import style from "./AnimeList.module.scss";
import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonPlanning } from "@/lib/utility";
import Image from "next/image";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const { data, loading, error } = useAnilistAnime(usernames);
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  const commonPlanning = getCommonPlanning(data);
  console.log(commonPlanning);

  return (
    <ol>
      {commonPlanning.map((media) => (
        <li key={media.media.siteUrl}>
          <Image
            width={100}
            height={200}
            src={media.media.coverImage.large}
            alt="dupa"
          />
          <a href={media.media.siteUrl} about="blank">
            {media.media.title.english ??
              media.media.title.romaji ??
              media.media.title.native}{" "}
            - {media.users.join(", ")}
          </a>
        </li>
      ))}
    </ol>
  );
};

export default AnimeList;
