import React, { useState, useEffect, memo } from "react";
import { TitleFormats } from "@/lib/query.interfaces";

import LanguageSelector from "./LanguageSelector";
import AnimeListCards from "./AnimeListCards";

type AnimeListProps = {
  usernames: string[];
};

const AnimeList: React.FC<AnimeListProps> = ({ usernames }) => {
  const [titleFormat, setTitleFormat] = useState<TitleFormats>("english");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleFormat = localStorage.getItem("titleFormat") as TitleFormats;
      titleFormat && setTitleFormat(titleFormat);
    }
  }, []);

  return (
    <div className="container-md">
      <LanguageSelector
        titleFormat={titleFormat}
        setTitleFormat={setTitleFormat}
      />
      <AnimeListCards usernames={usernames} titleFormat={titleFormat} />
    </div>
  );
};

export default memo(AnimeList);
