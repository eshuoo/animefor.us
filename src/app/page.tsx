import React from "react";
import style from "./page.module.scss";
import AnilistUsers from "@/components/avatar/AnilistUsers";

//TODO: fix manual URL searchparams parsing
//TODO: add suspense to useSearchParams components
//TODO: check if it's possible to simplify AnilistSearch component

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
      <AnilistUsers />
    </>
  );
};

export default App;
