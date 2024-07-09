import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useAnilistAnime } from "@/hooks/useAnilist";
import {
  getCommonPlanning,
  CommonMediaCollection,
  calculateColor,
} from "@/lib/utility";
import { TitleFormats } from "@/lib/query.interfaces";

import styles from "./AnimeListCards.module.scss";
import { AnimeSkeleton } from "../ui/skeletons";

type AnimeListCardsProps = {
  usernames: string[];
  titleFormat: TitleFormats;
};

const AnimeListCards: React.FC<AnimeListCardsProps> = ({
  usernames,
  titleFormat,
}) => {
  const [commonMedia, setCommonMedia] = useState<CommonMediaCollection[]>([]);

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
    <div>
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
                <h5 className={styles.score}>
                  Mean score:{" "}
                  <span className="h4" style={calculateColor(media.meanScore)}>
                    {media.meanScore}{" "}
                  </span>
                </h5>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AnimeListCards;
