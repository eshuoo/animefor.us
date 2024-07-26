import React from "react";
import Image from "next/image";
import { calculateColor } from "@/lib/utility";
import { Media } from "@/lib/query.interfaces";
import { TitleFormats } from "@/lib/query.interfaces";
import styles from "./AnimeListCard.module.scss";

type AnimeListCardsProps = {
  media: Media;
  users: string[];
  titleFormat: TitleFormats;
  usersText: string;
};

const AnimeListCard: React.FC<AnimeListCardsProps> = ({
  media,
  users,
  titleFormat,
  usersText,
}) => {
  return (
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
            {`${usersText} `}
            <b>{users.join(", ")}</b>
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
  );
};

export default AnimeListCard;
