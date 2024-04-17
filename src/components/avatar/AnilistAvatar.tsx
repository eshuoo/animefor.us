import React from "react";
import { useAnilistAvatar } from "@/hooks/useAnilist";
import Image from "next/image";

type AnilistAvatarProps = {
  username: string;
};

const AnilistAvatar: React.FC<AnilistAvatarProps> = ({ username }) => {
  const { loading, error, data } = useAnilistAvatar(username || "");

  if (error) return <div>error</div>;
  if (loading || data === undefined) return <div>loading...</div>;
  if (data)
    return (
      <Image
        width={100}
        height={100}
        src={data?.User.avatar.medium}
        alt="avatar"
      />
    );
};

export default AnilistAvatar;
