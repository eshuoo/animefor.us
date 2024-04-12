"use client";

import React from "react";
import { useAnilistAvatar } from "@/hooks/useAnilist";
import Image from "next/image";
import style from "./AvatarSearch.module.scss";

type AvatarSearchProps = {
  username: string;
  setUsername: (username: string) => void;
};

const AvatarSearch: React.FC<AvatarSearchProps> = ({
  username,
  setUsername,
}) => {
  const { error, data } = useAnilistAvatar(username);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className={style.container}>
      {data && (
        <Image
          width={100}
          height={100}
          src={data?.User.avatar.medium}
          alt="avatar"
        />
      )}
      <input
        placeholder="Enter your Anilist username"
        type="text"
        value={username}
        onChange={handleChange}
      />
    </div>
  );
};

export default AvatarSearch;
