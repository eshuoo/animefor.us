import React from "react";
import style from "./AnilistUser.module.scss";
import AnilistAvatar from "./AnilistAvatar";

type AnilistUserProps = {
  username: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAvatarError: (error: boolean) => void;
};

const AnilistUser: React.FC<AnilistUserProps> = ({
  username,
  handleChange,
  setAvatarError,
}) => {
  return (
    <div className={`${style.container}`}>
      {username ? (
        <AnilistAvatar username={username} setAvatarError={setAvatarError} />
      ) : (
        <p>Please enter a username</p>
      )}
      <input
        className="form-control"
        placeholder="Enter Anilist username"
        type="text"
        onChange={handleChange}
        defaultValue={username}
      />
    </div>
  );
};

export default AnilistUser;
