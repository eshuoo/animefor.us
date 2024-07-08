import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsersBox from "@/components/avatar/AnilistUsersBox";
import { UsersSkeleton } from "@/components/ui/skeletons";

//TODO: add absolute positioning app_container bullshit shenanigans
//TODO: add UsernameSearch component
//TODO: add proper avatar error and anime error handling
//TODO: searchParams tylko jako mirror a nie state
//TODO: add recommended anime besides already existing common planning
//TODO: add AnimeListCards component

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
