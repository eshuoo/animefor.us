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
        const paramsKeys = Array.from(params.keys()).map(Number);
        const maxKey =
            Math.max(...paramsKeys) === -Infinity ? 2 : Math.max(...paramsKeys);

        if (params.size > 4 || maxKey > 4) {
            window.history.replaceState(null, "", `/`);
        } else if (params.size > 2) {
            setUserCount(params.size);
        }

        for (let i = 1; i <= maxKey; i++) {
            if (!params.has(String(i))) {
                params.set(String(i), "");
            }
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
        console.log(isAvatarLoadingError);
        return (
            paramsUsers.length < 2 ||
            userCount !== paramsUsers.length ||
            !paramsUsers.every((p) => !!p) ||
            (submittedUsers.length === paramsUsers.length &&
                submittedUsers.every((user) => paramsUsers.includes(user))) ||
            paramsUsers.filter(
                (item, index) => paramsUsers.indexOf(item) !== index
            ).length > 0 ||
            isAvatarLoadingError.slice(0, userCount).includes(true)
        );
    }, [paramsUsers, userCount, submittedUsers, isAvatarLoadingError]);

    const calculateCol = useMemo(() => {
        if (userCount >= 4) return "col-6 col-md-3 col-xl-auto";
        if (userCount === 3) return "col-6 col-md-auto";
        return "col-6 col-sm-auto";
    }, [userCount]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isButtonDisabled) setSubmittedUsers(paramsUsers);
    };

    const handleChange = (
        user: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        params.set(user, e.target.value);
        window.history.replaceState(null, "", `/?${params}`);
    };

    const handleRemoveUser = (user: string) => {
        setUserCount((prevCount) => prevCount - 1);
        params.delete(user);
        window.history.replaceState(null, "", `/?${params}`);
    };

    return (
        <>
            <form className={cs(style.container)} onSubmit={handleSubmit}>
                <div className="container-lg">
                    <div className="row justify-content-center g-4">
                        {Array.from({ length: userCount }).map((_, index) => (
                            <AnilistUser
                                key={index}
                                index={index}
                                username={paramsUsers[index] || ""}
                                cols={calculateCol}
                                handleChange={handleChange}
                                handleAvatarStateChange={
                                    handleAvatarStateChange
                                }
                            />
                        ))}
                    </div>
                </div>
                {/* ---> */}
                {/* <UsersSelect users={} onChange={() => setUsers} /> */}
                <div className={cs(style.buttons_container)}>
                    <button
                        type="button"
                        className={cs("btn", style.user_count_button, {
                            "btn-danger": userCount > 2,
                            "btn-outline-danger disabled": userCount <= 2,
                        })}
                        onClick={() => handleRemoveUser(String(userCount))}
                    >
                        <b>-</b>
                    </button>
                    <button
                        type="submit"
                        className={cs("btn", {
                            "btn-primary": !isButtonDisabled,
                            "btn-outline-primary disabled": isButtonDisabled,
                        })}
                    >
                        Get recommendations
                    </button>
                    <button
                        type="button"
                        className={cs("btn", style.user_count_button, {
                            "btn-success": userCount <= 3,
                            "btn-outline-success disabled": userCount > 3,
                        })}
                        onClick={() => setUserCount(userCount + 1)}
                    >
                        <b>+</b>
                    </button>
                </div>
            </form>

            {submittedUsers.length > 0 && (
                <AnimeList
                    key={submittedUsers.join(";")}
                    usernames={submittedUsers}
                />
            )}
        </>
    );
};

export default AnilistUsersBox;
