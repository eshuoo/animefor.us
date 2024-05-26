"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import style from "./AnilistUsersBox.module.scss";
import AvatarSearch from "@/components/avatar/AnilistUser";
import cs from "classnames";
import AnimeList from "../animesearch/AnimeList";

const AnilistUsersBox = () => {
  const [userCount, setUserCount] = useState(2);
  const [usernames, setUsernames] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const invalidUsernames: boolean =
    params.size < 2 ||
    userCount !== params.size ||
    !Array.from(params.values()).every((p) => !!p);

  useEffect(() => {
    if (params.size > 4) {
      window.history.pushState(null, "", `/`);
    } else if (params.size > 2) {
      setUserCount(params.size);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange =
    (user: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      params.set(user, e.target.value);
      window.history.replaceState(null, "", `/?${params}`);
    };

  const handleRemoveUser = (user: string) => {
    setUserCount(userCount - 1);
    params.delete(user);
    window.history.replaceState(null, "", `/?${params}`);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.users_container}>
          {Array.from({ length: userCount }).map((_, index) => (
            <AvatarSearch
              key={index}
              username={params.get(String(index + 1)) || ""}
              handleChange={handleChange(String(index + 1))}
            />
          ))}
          <div className={cs(style.buttons_container)}>
            {userCount > 2 && (
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveUser(String(userCount))}
              >
                <b>-</b>
              </button>
            )}
            {userCount <= 3 && (
              <button
                className="btn btn-success"
                onClick={() => setUserCount(userCount + 1)}
              >
                <b>+</b>
              </button>
            )}
          </div>
        </div>
        {/* ---> */}
        {/* <UsersSelect users={} onChange={() => setUsers} /> */}
        <button
          disabled={invalidUsernames}
          className={cs("btn", "btn-light")}
          onClick={() => setUsernames(Array.from(params.values()))}
        >
          Get recommendations
        </button>
      </div>

      {usernames && (
        <AnimeList key={usernames.join(";")} usernames={usernames} />
      )}
    </>
  );
};

export default AnilistUsersBox;
