import React, { useState, useEffect } from "react";
import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonPlanning, CommonMediaCollection } from "@/lib/utility";
import Image from "next/image";

import styles from "./AnimeList.module.scss";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const { data, loading, error } = useAnilistAnime(usernames);

  const [commonMedia, setCommonMedia] = useState<CommonMediaCollection[]>([]);

  useEffect(() => {
    if (!data) {
      if (commonMedia) setCommonMedia([]);
      return;
    }

    setCommonMedia(
      getCommonPlanning(data).filter(
        ({ media }) => media.status !== "NOT_YET_RELEASED"
      )
    );
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {commonMedia.map(({ media, users }) => (
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
              <p>
                Wanted by <b>{users.join(", ")}</b>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AnimeList;
