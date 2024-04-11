"use client";

import React from "react";
import AvatarSearch from "@/components/AvatarSearch";

const App = () => {
  const [username1, setUsername1] = React.useState("");
  const [username2, setUsername2] = React.useState("");
  return (
    <div>
      <AvatarSearch username={username1} setUsername={setUsername1} />
      <AvatarSearch username={username2} setUsername={setUsername2} />
    </div>
  );
};

export default App;
