import React, { Suspense } from "react";
import style from "./page.module.scss";
import AnilistUsersBox from "@/components/avatar/AnilistUsersBox";
import { UsersSkeleton } from "@/components/ui/skeletons";

//todo: add absolute positioning app_container bullshit shenanigans
//todo: add UsernameSearch component
//todo: searchParams tylko jako mirror a nie state
//todo: add pagination
//todo: switch po boku strony z typami bajek
//todo: promare pojawai się 2 razy
//todo: userReducer
//todo: wypierdolić powtarzjących się userów o tej samej nazwie
//todo: mrugający english

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
