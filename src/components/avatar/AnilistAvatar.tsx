import React, { CSSProperties, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import style from "./AnilistAvatar.module.scss";
import { useAnilistAvatar } from "@/hooks/useAnilist";
import Image from "next/image";

type AnilistAvatarProps = {
  index: number;
  username: string;
  handleAvatarStateChange: (index: number, isLoadingError: boolean) => void;
};

const override: CSSProperties = {
  height: "100px",
  width: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AnilistAvatar: React.FC<AnilistAvatarProps> = ({
  index,
  username,
  handleAvatarStateChange,
}) => {
  const { loading, error, data } = useAnilistAvatar(username || "");

  useEffect(() => {
    if (loading || error || data === undefined) {
      handleAvatarStateChange(index, true);
    } else {
      handleAvatarStateChange(index, false);
    }
  }, [data, error, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <p className="text-danger">User not found</p>;
  }
  if (loading || data === undefined) {
    return <SyncLoader color="#6F42C1" cssOverride={override} />;
  }

  return (
    <div className={style.avatarImage}>
      <Image
        fill
        sizes="100px"
        src={data.User.avatar.medium}
        alt={`${username}'s avatar image.`}
      />
    </div>
  );
};

export default AnilistAvatar;
