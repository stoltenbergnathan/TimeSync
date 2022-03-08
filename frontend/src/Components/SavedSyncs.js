import { useEffect, useState } from "react";
import PersonalTask from "./PersonalTask";
import EventShow from "./EventShow";

function SavedSyncs() {
  const [likedSyncs, setSyncs] = useState([{}]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost/Syncs", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) setSyncs([]);
        setSyncs(data);
        setLoaded(true);
      });
  }, []);

  const deleteSync = (key) => {
    const newState = likedSyncs.filter((sync) => sync.key !== key);
    setSyncs(newState);
    fetch("http://localhost/Sync", {
      method: "DELETE",
      body: JSON.stringify({ key: key }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      if (data.status !== 200) console.log(data);
    });
  };

  if (loaded) {
    return (
      <>
        {likedSyncs.map((sync) => {
          if (sync.type === "event") {
            return (
              <EventShow
                title={sync.sync.title}
                genre={sync.sync.genre}
                dateTime={{
                  localDate: sync.sync.date,
                  localTime: sync.sync.time,
                }}
                eventUrl={sync.sync.link}
                imageUrl={sync.sync.img}
                pkey={sync.key}
                profile={deleteSync}
              />
            );
          } else {
            return (
              <PersonalTask
                activity={sync.sync.activity}
                type={sync.sync.type}
                link={sync.sync.link}
                pkey={sync.key}
                profile={deleteSync}
              />
            );
          }
        })}
      </>
    );
  } else return <p>Loading...</p>;
}

export default SavedSyncs;
