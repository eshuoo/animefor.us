import React, { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import style from "./AnilistAvatar.module.scss";
import { useAnilistAvatar } from "@/hooks/useAnilist";
import Image from "next/image";

type AnilistAvatarProps = {
  username: string;
};

const override: CSSProperties = {
  height: "100px",
  width: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AnilistAvatar: React.FC<AnilistAvatarProps> = ({ username }) => {
  const { loading, error, data } = useAnilistAvatar(username || "");

  if (error) {
    return <p className="text-danger">User not found</p>;
  }
  if (loading || data === undefined) {
    return <SyncLoader color="darkslateblue" cssOverride={override} />;
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
