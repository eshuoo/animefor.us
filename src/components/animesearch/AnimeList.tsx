import React, { useState, useEffect, memo } from "react";
import { useAnilistAnime } from "@/hooks/useAnilist";
import { TitleFormats } from "@/lib/query.interfaces";
import {
  getCommonPlanning,
  CommonMediaCollection,
  calculateColor,
} from "@/lib/utility";
import Image from "next/image";

import styles from "./AnimeList.module.scss";
import LanguageSelector from "./LanguageSelector";
import { AnimeSkeleton } from "../ui/skeletons";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const [commonMedia, setCommonMedia] = useState<CommonMediaCollection[]>([]);
  const [titleFormat, setTitleFormat] = useState<TitleFormats>("english");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleFormat = localStorage.getItem("titleFormat") as TitleFormats;
      titleFormat && setTitleFormat(titleFormat);
    }
  }, []);

  const { data, loading, error } = useAnilistAnime(usernames);

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

  if (loading) return <AnimeSkeleton />;
  if (error) return <div>Error</div>;
  if (!commonMedia.length && data) return <div>No common anime found</div>;

  return (
    <div className="container-md">
      <LanguageSelector
        titleFormat={titleFormat}
        setTitleFormat={setTitleFormat}
      />
      {commonMedia.map(({ media, users }) => (
        <a
          key={media.siteUrl}
          href={media.siteUrl}
          className={styles.link}
          target="_blank"
        >
          <div className={styles.animeListEntry}>
            <div className={styles.coverImage}>
              <Image
                fill
                sizes="128px"
                src={media.coverImage.large}
                alt={`Cover image for ${
                  media.title[titleFormat] ??
                  media.title.english ??
                  media.title.romaji ??
                  media.title.native
                }`}
              />
            </div>

            <div className={styles.description}>
              <h4>
                {media.title[titleFormat] ??
                  media.title.english ??
                  media.title.romaji ??
                  media.title.native}
              </h4>
              <p>
                Wanted by <b>{users.join(", ")}</b>
              </p>
              {media.meanScore && (
                <h4 className={styles.score}>
                  Mean score:{" "}
                  <span style={calculateColor(media.meanScore)}>
                    {media.meanScore}{" "}
                  </span>
                </h4>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default memo(AnimeList);
