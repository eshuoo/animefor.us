import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsersBox from "@/components/avatar/AnilistUsersBox";
import { UsersSkeleton } from "@/components/ui/skeletons";

//TODO: make this absolute positioning app_container bullshit shenanigans work
//TODO: make UsernameSearch component
//TODO: searchParams tylko jako mirror a nie state
//TODO: add proper avatar error and anime error handling
//TODO: remove unnecessary rendering
//TODO: change inputs to actual form

const App = () => {
  return (
    <div className={style.app_container}>
      <Suspense fallback={<UsersSkeleton />}>
        <AnilistUsersBox />
      </Suspense>
    </div>
  );
};

export default App;
