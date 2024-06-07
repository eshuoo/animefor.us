import React, { useEffect } from "react";
import style from "./AnilistUser.module.scss";
import AnilistAvatar from "./AnilistAvatar";

type AnilistUserProps = {
  index: number;
  username: string;
  handleChange: (user: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarStateChange: (index: number, isLoadingError: boolean) => void;
};

const AnilistUser: React.FC<AnilistUserProps> = ({
  index,
  username,
  handleChange,
  handleAvatarStateChange,
}) => {
  useEffect(() => {
    if (username) {
      handleAvatarStateChange(index, true);
    }
    return () => {
      handleAvatarStateChange(index, false);
    };
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${style.container}`}>
      {username ? (
        <AnilistAvatar
          index={index}
          username={username}
          handleAvatarStateChange={handleAvatarStateChange}
        />
      ) : (
        <p>Please enter a username</p>
      )}
      <input
        className="form-control"
        placeholder="Enter Anilist username"
        type="text"
        onChange={(e) => handleChange(String(index + 1), e)}
        defaultValue={username}
      />
    </div>
  );
};

export default AnilistUser;
