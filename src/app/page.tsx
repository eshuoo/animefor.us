import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsersBox from "@/components/avatar/AnilistUsersBox";
import { UsersSkeleton } from "@/components/ui/skeletons";

//todo: add absolute positioning app_container bullshit shenanigans
//todo: add UsernameSearch component
//todo: searchParams tylko jako mirror a nie state
//todo: pagination
//todo: make recommended anime list look fucking cool
//todo: fix flashing animelist error message
//todo: remove all those username.endsWith

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
