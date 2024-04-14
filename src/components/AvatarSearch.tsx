"use client";

import React from "react";
import style from "./AvatarSearch.module.scss";
import { useSearchParams, useRouter } from "next/navigation";
import AnilistAvatar from "./AnilistAvatar";

type AvatarSearchProps = {
  user: string;
};

//TODO: fix error rendering

const AvatarSearch: React.FC<AvatarSearchProps> = ({ user }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get(user);
  const { replace } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set(user, e.target.value);
    replace(`/?${params}`);
  };

  return (
    <div className={style.container}>
      {!username ? <p>dawaj usera</p> : <AnilistAvatar username={username} />}
      <input
        placeholder="Enter your Anilist username"
        type="text"
        onChange={handleChange}
        defaultValue={username || ""}
      />
    </div>
  );
};

export default AvatarSearch;
