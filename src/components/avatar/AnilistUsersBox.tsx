"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import AnilistUser from "@/components/avatar/AnilistUser";
import AnimeList from "../animesearch/AnimeList";
import style from "./AnilistUsersBox.module.scss";
import cs from "classnames";

const AnilistUsersBox = () => {
  const [userCount, setUserCount] = useState(2);
  const [paramsUsers, setParamsUsers] = useState<string[]>([]);
  const [submittedUsers, setSubmittedUsers] = useState<string[]>([]);
  const [isAvatarLoadingError, setIsAvatarLoadingError] = useState<boolean[]>(
    []
  );

  // get search params
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  //handle rendering correct amount of users
  useEffect(() => {
    if (params.size > 4) {
      window.history.pushState(null, "", `/`);
    } else if (params.size > 2) {
      setUserCount(params.size);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // update paramsUsers when params change
  useEffect(() => {
    setParamsUsers(
      Array.from(params.entries())
        .sort((a, b) => +a[0] - +b[0])
        .map(([, value]) => value)
    );
  }, [params]);

  // check if button should be disabled
  const isButtonDisabled = useMemo(() => {
    return (
      paramsUsers.length < 2 ||
      userCount !== paramsUsers.length ||
      !paramsUsers.every((p) => !!p) ||
      (submittedUsers.length === paramsUsers.length &&
        submittedUsers.every((user) => paramsUsers.includes(user))) ||
      paramsUsers.filter((item, index) => paramsUsers.indexOf(item) !== index)
        .length > 0 ||
      isAvatarLoadingError.includes(true)
    );
  }, [paramsUsers, userCount, submittedUsers, isAvatarLoadingError]);

  // handle avatar loading error to disable button
  const handleAvatarStateChange = useCallback(
    (index: number, isLoadingError: boolean) => {
      setIsAvatarLoadingError((prev) => {
        const newState = [...prev];
        newState[index] = isLoadingError;
        return newState;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmittedUsers(paramsUsers);
    },
    [paramsUsers]
  );

  const handleChange = useCallback(
    (user: string, e: React.ChangeEvent<HTMLInputElement>) => {
      params.set(user, e.target.value);
      window.history.replaceState(null, "", `/?${params}`);
    },
    [params]
  );

  const handleRemoveUser = useCallback(
    (user: string) => {
      setUserCount((prevCount) => prevCount - 1);
      params.delete(user);
      window.history.replaceState(null, "", `/?${params}`);
    },
    [params]
  );

  return (
    <>
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.users_container}>
          {Array.from({ length: userCount }).map((_, index) => (
            <AnilistUser
              key={index}
              index={index}
              username={paramsUsers[index] || ""}
              handleChange={handleChange}
              handleAvatarStateChange={handleAvatarStateChange}
            />
          ))}
          <div className={cs(style.buttons_container)}>
            {userCount > 2 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveUser(String(userCount))}
              >
                <b>-</b>
              </button>
            )}
            {userCount <= 3 && (
              <button
                type="button"
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
          type="submit"
          disabled={isButtonDisabled}
          className={cs("btn", "btn-light")}
        >
          Get recommendations
        </button>
      </form>

      {submittedUsers && (
        <AnimeList key={submittedUsers.join(";")} usernames={submittedUsers} />
      )}
    </>
  );
};

export default AnilistUsersBox;
