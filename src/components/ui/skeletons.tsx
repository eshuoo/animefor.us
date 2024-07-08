import user from "@/components/avatar/AnilistUser.module.scss";
import users from "@/components/avatar/AnilistUsersBox.module.scss";
import anime from "@/components/animesearch/AnimeList.module.scss";
import animation from "./skeletons.module.scss";
import cs from "classnames";

export const UserSkeleton = () => {
  return (
    <div className="col-6 col-sm-auto">
      <div className={user.container}>
        <input
          className={cs("form-control", animation.loader)}
          disabled
          type="text"
        />
      </div>
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <form className={cs(users.container)}>
      <div className="container-lg">
        <div className="row justify-content-center g-4">
          <UserSkeleton />
          <UserSkeleton />
        </div>
      </div>
      <div className={cs(users.buttons_container)}>
        <button
          type="button"
          className={cs(
            "btn btn-outline-danger disabled",
            users.user_count_button
          )}
        >
          <b>-</b>
        </button>
        <button type="submit" className="btn btn-outline-primary disabled">
          Get recommendations
        </button>
        <button
          type="button"
          className={cs(
            "btn btn-outline-success disabled",
            users.user_count_button
          )}
        >
          <b>+</b>
        </button>
      </div>
    </form>
  );
};

export const AnimeSkeleton = () => {
  return (
    <div className="container-md">
      <div className={cs(anime.animeListEntry)}>
        <svg className={cs(anime.coverImage, "placeholder")} />

        <div className={cs(anime.description, "placeholder-glow")}>
          <h4 className="placeholder placeholder-lg col-4 me-2" />
          <h4 className="placeholder placeholder-lg col-2 me-2" />
          <h4 className="placeholder placeholder-lg col-3" />
          <p>
            Wanted by <span className="placeholder col-1 me-1" />
            <span className="placeholder col-2" />
          </p>
          <h4 className={anime.score}>
            Mean score:{" "}
            <span className="placeholder" style={{ color: `rgb(69, 255, 0)` }}>
              69
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};
