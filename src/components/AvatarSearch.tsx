"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useAnilistAvatar } from "@/hooks/useAnilist";
import Image from "next/image";

type AvatarSearchProps = {
  username: string;
  setUsername: (username: string) => void;
};

const AvatarSearch: React.FC<AvatarSearchProps> = ({
  username,
  setUsername,
}) => {
  const [debouncedName, setDebouncedName] = useState(username);
  const { error, data } = useAnilistAvatar(debouncedName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(username);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [username]);

  return (
    <div>
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
