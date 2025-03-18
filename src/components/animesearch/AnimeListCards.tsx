import React, { useEffect, useState } from "react";

import { useAnilistAnime } from "@/hooks/useAnilist";
import { getCommonAnime, CommonMediaCollection } from "@/lib/utility";
import { TitleFormats } from "@/lib/query.interfaces";

import { AnimeSkeleton } from "../ui/skeletons";
import AnimeListCard from "./AnimeListCardsItem";

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
    const [finishedProcessingAnime, setFinishedProcessingAnime] =
        useState(false);

    const { data, loading, error } = useAnilistAnime(usernames);

    useEffect(() => {
        if (!data) {
            if (commonMedia) {
                setCommonMedia([]);
                setRecommendedMedia([]);
            }
            return;
        }

        const {
            commonMediaList,
            recommendedMediaList,
            finishedProcessingAnime,
        } = getCommonAnime(data);
        setCommonMedia(commonMediaList);
        setRecommendedMedia(recommendedMediaList);
        setFinishedProcessingAnime(finishedProcessingAnime);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const noCommonAnime = (
        <p className="text-danger text-center mt-5">
            No common anime found.
            <br />
            Try adding some more!
        </p>
    );
    const noRecommendedAnime = (
        <p className="text-danger text-center mt-5">
            No recommendations for you ●︿●
        </p>
    );

    if (loading || !finishedProcessingAnime)
        return (
            <div>
                <h3 className="text-center mt-5">Common planning</h3>
                <p className="lead text-center text-white-50">
                    You all may have something in common.
                </p>
                <AnimeSkeleton />
                <h3 className="text-center mt-5">Recommended anime</h3>
                <p className="lead text-center text-white-50">
                    You didn&apos;t know you want it.
                </p>
                <AnimeSkeleton />
            </div>
        );

    if (error)
        return (
            <p className="text-danger text-center mt-5">
                Something went wrong (✖﹏✖)
                <br />
                Try again later!
            </p>
        );

    return (
        <div>
            <h3 className="text-center mt-5">Common planning</h3>
            <p className="lead text-center text-white-50">
                You all may have something in common.
            </p>
            {!commonMedia.length && data && noCommonAnime}
            {commonMedia.map(({ media, users }) => (
                <AnimeListCard
                    key={media.siteUrl}
                    media={media}
                    users={users}
                    titleFormat={titleFormat}
                    usersText="Wanted by"
                />
            ))}
            <h3 className="text-center mt-5">Recommended anime</h3>
            <p className="lead text-center text-white-50">
                You didn&apos;t know you want it.
            </p>
            {!recommendedMedia.length && data && noRecommendedAnime}
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
