import React, { useEffect, useState } from "react";

import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonAnime, CommonMediaCollection } from "@/lib/utility";
import { TitleFormats } from "@/lib/query.interfaces";

import { AnimeSkeleton } from "../ui/skeletons";
import AnimeListCard from "./AnimeListCard";

type AnimeListCardsProps = {
  usernames: string[];
  titleFormat: TitleFormats;
};

const AnimeListCards: React.FC<AnimeListCardsProps> = ({
  usernames,
  titleFormat,
}) => {
  const [commonMedia, setCommonMedia] = useState<CommonMediaCollection[]>([]);
  const [recommendedMedia, setRecommendedMedia] = useState<
    CommonMediaCollection[]
  >([]);

  const { data, loading, error } = useAnilistAnime(usernames);

  useEffect(() => {
    if (!data) {
      if (commonMedia) {
        setCommonMedia([]);
        setRecommendedMedia([]);
      }
      return;
    }

    const { commonMediaList, recommendedMediaList } = getCommonAnime(data);
    setCommonMedia(
      commonMediaList.filter(({ media }) => media.status !== "NOT_YET_RELEASED")
    );
    setRecommendedMedia(recommendedMediaList);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <AnimeSkeleton />;
  if (error) return <div>Error</div>;
  if (!commonMedia.length && data)
    return <p className="text-danger text-center">No common anime found</p>;

  return (
    <div>
      {commonMedia.map(({ media, users }) => (
        <AnimeListCard
          key={media.siteUrl}
          media={media}
          users={users}
          titleFormat={titleFormat}
          usersText="Wanted by"
        />
      ))}
      {recommendedMedia.map(({ media, users }) => (
        <AnimeListCard
          key={media.siteUrl}
          media={media}
          users={users}
          titleFormat={titleFormat}
          usersText="Recommended for"
        />
      ))}
    </div>
  );
};

export default AnimeListCards;
