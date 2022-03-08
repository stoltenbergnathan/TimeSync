import { useEffect, useState } from "react";

function SavedSyncs() {
  const [likedSyncs, setSyncs] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <p>Saved Syncs</p>
      {likedSyncs.map((sync) => sync)}
    </>
  );
}

export default SavedSyncs;
