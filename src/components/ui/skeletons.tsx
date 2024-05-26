import user from "@/components/avatar/AnilistUser.module.scss";
import users from "@/components/avatar/AnilistUsersBox.module.scss";
import style from "./skeletons.module.scss";
import cs from "classnames";

export const UserSkeleton = () => {
  return (
    <div className={user.container}>
      <input
        className={cs("form-control", style.loader)}
        disabled
        type="text"
      />
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <div className={users.container}>
      <div className={users.users_container}>
        <UserSkeleton />
        <UserSkeleton />
      </div>
      <button className="btn btn-light disabled">Get recommendations</button>
    </div>
  );
};
