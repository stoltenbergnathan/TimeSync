import { React, Fragment, useState, useEffect } from "react";
import PersonalTaskList from "./PersonalTaskList";
import PersonalTask from "./PersonalTask";
import YouTubeVideo from "./YouTubeVideo";

function Personal() {
  const [selectedType, setSelectedType] = useState("");
  const [generatedActivity, setActivity] = useState({ type: "", activity: "" });
  const [vidoes, setVideos] = useState([]);

  const formSubmitted = (event) => {
    event.preventDefault();
    fetch(`http://localhost/api/personal?type=${selectedType}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity({ ...data });
      });
  };

  useEffect(() => {
    fetch(`http://localhost/api/youtube/${generatedActivity.activity}`)
      .then((response) => response.json())
      .then((data) => setVideos(data.items));
  }, [generatedActivity]);

  return (
    <Fragment>
      <div>
        <form onSubmit={formSubmitted}>
          <label title="Type" htmlFor="type-select">
            Type:
          </label>
          <br />
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option defaultValue value="any">
              any
            </option>
            <option value="charity">charity</option>
            <option value="cooking">cooking</option>
            <option value="music">music</option>
            <option value="diy">diy</option>
            <option value="education">education</option>
            <option value="social">social</option>
            <option value="busywork">busywork</option>
            <option value="recreational">recreational</option>
          </select>
          <input type="submit" value="Generate Task" />
        </form>
        <PersonalTask
          activity={generatedActivity.activity}
          type={generatedActivity.type}
        />
      </div>
      <br style={{ margin: 50 }} />
      <PersonalTaskList />
      <br style={{ margin: 50 }} />
      {vidoes.map((video) => (
        <YouTubeVideo video={video} />
      ))}
    </Fragment>
  );
}

export default Personal;
