import React from "react";
import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonPlanning } from "@/lib/utility";
import Image from "next/image";

import styles from "./AnimeList.module.scss";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const { data, loading, error } = useAnilistAnime(usernames);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (data === undefined) return null;

  const commonPlanning = getCommonPlanning(data).filter((anime) => {
    return anime.media.status !== "NOT_YET_RELEASED";
  });

  return (
    <div>
      {commonPlanning.map(({ media, users }) => (
        <a
          key={media.siteUrl}
          href={media.siteUrl}
          className={styles.link}
          target="_blank"
        >
          <div className={styles.animeListEntry}>
            <Image
              width={128}
              height={160}
              src={media.coverImage.large}
              alt="dupa"
            />
            <div className={styles.description}>
              <h4>
                {media.title.english ??
                  media.title.romaji ??
                  media.title.native}
              </h4>{" "}
              <p>Wanted by {users.join(", ")}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AnimeList;
