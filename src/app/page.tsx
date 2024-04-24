import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsers from "@/components/avatar/AnilistUsers";
import { UsersSkeleton } from "@/components/ui/skeletons";

//TODO: add proper sceleton to useSearchParams components
//TODO: add memoization to AvatarSearch and AnilistUsers components

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
      <Suspense fallback={<UsersSkeleton />}>
        <AnilistUsers />
      </Suspense>
    </>
  );
};

export default App;
