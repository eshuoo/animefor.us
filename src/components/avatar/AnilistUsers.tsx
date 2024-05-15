"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import style from "./AnilistUsers.module.scss";
import AvatarSearch from "@/components/avatar/AvatarSearch";
import cs from "classnames";
import AnimeList from "../animesearch/AnimeList";

const AnilistUsers = () => {
  const [userCount, setUserCount] = useState(2);
  const [usernames, setUsernames] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  useEffect(() => {
    if (params.size > 4) {
      replace(`/`);
    } else if (params.size > 2) {
      setUserCount(params.size);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange =
    (user: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      params.set(user, e.target.value);
      replace(`/?${params}`);
    };

  const handleRemoveUser = (user: string) => {
    setUserCount(userCount - 1);
    params.delete(user);
    replace(`/?${params}`);
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
          className={cs("btn", "btn-light", {
            disabled:
              params.size < 2 ||
              userCount !== params.size ||
              !Array.from(params.values()).every((p) => !!p),
          })}
          onClick={() => setUsernames(Array.from(params.values()))}
        >
          Get recommendations
        </button>
      </div>

      {usernames && (
        <div className={style.container}>
          <AnimeList key={usernames.join(";")} usernames={usernames} />
        </div>
      )}
    </>
  );
};

export default AnilistUsers;
