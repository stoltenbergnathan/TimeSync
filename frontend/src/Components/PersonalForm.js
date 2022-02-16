import { useState, React } from "react";
import PersonalTask from "./PersonalTask";

function PersonalForm() {
  const [selectedType, setSelectedType] = useState("");
  const [generatedActivity, setActivity] = useState({ type: "", activity: "" });

  const formSubmitted = (event) => {
    event.preventDefault();
    console.log(selectedType);
    fetch("http://localhost/api/personal")
      .then((response) => response.json())
      .then((data) => setActivity({ ...data }));
  };

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label title="Type" htmlFor="type-select">
          Type:
        </label>
        <br />
        <select
          id="type-select"
          value={selectedType}
          onChange={setSelectedType}
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
  );
}

export default PersonalForm;
