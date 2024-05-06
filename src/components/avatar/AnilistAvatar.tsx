import React, { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
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

  if (error) return <div>error</div>;
  if (loading || data === undefined)
    return <SyncLoader color="purple" cssOverride={override} />;
  if (data)
    return (
      <Image
        width={100}
        height={100}
        src={data.User.avatar.medium}
        alt="avatar"
      />
    );
};

export default AnilistAvatar;
