"use client";

import React, { useEffect } from "react";
import AvatarSearch from "@/components/avatar/AvatarSearch";
import style from "./AnilistUsers.module.scss";
import { useSearchParams, useRouter } from "next/navigation";

const AnilistUsers = () => {
  const [userCount, setUserCount] = React.useState(2);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    if (searchParams.size > 2) {
      setUserCount(searchParams.size);
    }
  }, [searchParams.size]);

  const handleRemoveUser = (user: Number) => {
    const params = new URLSearchParams(searchParams);
    setUserCount(userCount - 1);
    params.delete(user.toString());
    replace(`/?${params}`);
  };
  return (
    <div className={style.container}>
      {Array.from({ length: userCount }).map((_, index) => (
        <AvatarSearch key={index} user={String(index + 1)} />
      ))}
      <div className={style.buttons__box}>
        {userCount <= 3 && (
          <button onClick={() => setUserCount(userCount + 1)}>Add User</button>
        )}
        {userCount > 2 && (
          <button onClick={() => handleRemoveUser(userCount)}>
            Remove User
          </button>
        )}
      </div>
    </div>
  );
};

export default AnilistUsers;
