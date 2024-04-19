"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import style from "./AnilistUsers.module.scss";
import AvatarSearch from "@/components/avatar/AvatarSearch";

const AnilistUsers = () => {
  const [userCount, setUserCount] = useState(2);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    if (searchParams.size > 4) {
      replace(`/`);
    } else if (searchParams.size > 2) {
      setUserCount(searchParams.size);
    }
  }, [searchParams.size, replace]);

  const handleChange =
    (user: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set(user, e.target.value);
      replace(`/?${params}`);
    };

  const handleRemoveUser = (user: string) => {
    const params = new URLSearchParams(searchParams);
    setUserCount(userCount - 1);
    params.delete(user);
    replace(`/?${params}`);
  };

  return (
    <div className={style.container}>
      {Array.from({ length: userCount }).map((_, index) => (
        <AvatarSearch
          key={index}
          username={searchParams.get(String(index + 1)) || ""}
          handleChange={handleChange(String(index + 1))}
        />
      ))}
      <div className={style.buttons__box}>
        {userCount <= 3 && (
          <button onClick={() => setUserCount(userCount + 1)}>Add User</button>
        )}
        {userCount > 2 && (
          <button onClick={() => handleRemoveUser(String(userCount))}>
            Remove User
          </button>
        )}
      </div>
    </div>
  );
};

export default AnilistUsers;
