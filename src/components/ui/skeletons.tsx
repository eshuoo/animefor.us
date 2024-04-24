export const UserSkeleton = () => {
  return (
    <div className="user_container">
      <div className="user_avatar" />
      <div className="user_input" />
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <div className="users_container">
      <UserSkeleton />
      <UserSkeleton />
    </div>
  );
};
