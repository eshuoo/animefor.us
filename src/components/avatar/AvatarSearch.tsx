import React from "react";
import style from "./AvatarSearch.module.scss";
import AnilistAvatar from "./AnilistAvatar";

type AvatarSearchProps = {
  username: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AvatarSearch: React.FC<AvatarSearchProps> = ({
  username,
  handleChange,
}) => {
  return (
    <div className={style.container}>
      {username ? (
        <AnilistAvatar username={username} />
      ) : (
        <p>Please enter a username</p>
      )}
      <input
        placeholder="Enter your Anilist username"
        type="text"
        onChange={handleChange}
        defaultValue={username}
      />
    </div>
  );
};

export default AvatarSearch;
