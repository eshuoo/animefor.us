import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsers from "@/components/avatar/AnilistUsers";
import { UsersSkeleton } from "@/components/ui/skeletons";

//TODO: add memoization to AvatarSearch and AnilistUsers components
//TODO: replace error message
//TODO: add responsiveness to AnilistUsers component
//TODO: add anime fetching

const App = () => {
  return (
    <>
      <div className={`${style.dobrypodzial}`}>
        <h1>dobry podział komponentów zrobi ci loda</h1>
        <p>
          pamiętaj skuwysynie jeden <s>kod fragmentu</s> komponent ma jedno
          zadanie
        </p>
      </div>
      <div className={`${style.dobrypodzial} ${style.glow}`}>
        <h1>dobry podział komponentów zrobi ci loda</h1>
        <p>
          pamiętaj skuwysynie jeden <s>kod fragmentu</s> komponent ma jedno
          zadanie
        </p>
      </div>
      <div className={style.app_container}>
        <Suspense fallback={<UsersSkeleton />}>
          <AnilistUsers />
        </Suspense>
      </div>
    </>
  );
};

export default App;
