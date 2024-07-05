import React, { useEffect, useRef } from "react";
import style from "./AnilistUser.module.scss";
import AnilistAvatar from "./AnilistAvatar";
import cs from "classnames";

type AnilistUserProps = {
  index: number;
  username: string;
  cols: string;
  handleChange: (user: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarStateChange: (index: number, isLoadingError: boolean) => void;
};

const AnilistUser: React.FC<AnilistUserProps> = ({
  index,
  username,
  cols,
  handleChange,
  handleAvatarStateChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (username) {
      handleAvatarStateChange(index, true);
    }
    return () => {
      handleAvatarStateChange(index, false);
    };
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ref.current && index > 1 && !username) {
      ref.current.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cols}>
      <div className={cs(style.container)}>
        {username && (
          <AnilistAvatar
            index={index}
            username={username}
            handleAvatarStateChange={handleAvatarStateChange}
          />
        )}
        <input
          ref={ref}
          className="form-control"
          placeholder="Enter Anilist username"
          type="text"
          onChange={(e) => handleChange(String(index + 1), e)}
          defaultValue={username}
        />
      </div>
    </div>
  );
};

export default AnilistUser;
