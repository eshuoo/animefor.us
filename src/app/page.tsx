import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsers from "@/components/avatar/AnilistUsersBox";
import { UsersSkeleton } from "@/components/ui/skeletons";

//TODO: add memoization to AvatarSearch and AnilistUsers components
//TODO: make this absolute positioning app_container bullshit shenanigans work
//TODO: make UsernameSearch component
//TODO: searchParams tylko jako mirror a nie state
//TODO: add proper avatar error and anime error handling

const App = () => {
  return (
    <div className={style.app_container}>
      <Suspense fallback={<UsersSkeleton />}>
        <AnilistUsers />
      </Suspense>
    </div>
  );
};

export default App;
