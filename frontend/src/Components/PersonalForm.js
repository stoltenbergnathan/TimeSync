import { useState, React } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

function PersonalForm() {
  const [data, setData] = useState({
    type: "",
    minprice: "",
    maxprice: "",
    minaccessibility: "",
    maxaccessibility: "",
  });

  return (
    <div>
      <form>
        <label title="Type" htmlFor="type-select">
          Type:
        </label>
        <br />
        <select id="type-select">
          <option value="charity">charity</option>
          <option value="cooking">cooking</option>
          <option value="music">music</option>
          <option value="diy">diy</option>
          <option value="education">education</option>
          <option value="social">social</option>
          <option value="busywork">busywork</option>
          <option value="recreational">recreational</option>
        </select>
        <br />
        <label title="Cost" htmlFor="cost-slider">
          Cost:
        </label>
        <br />
        <Nouislider
          accessibility
          range={{ min: 0, max: 100 }}
          start={[20, 80]}
          connect
          pips={{ mode: "steps", stepped: true, density: 10 }}
          step={10}
        />
        <br />
        <label title="Cost" htmlFor="cost-slider">
          Accessibility:
        </label>
        <br />
        <Nouislider
          accessibility
          range={{ min: 0, max: 100 }}
          start={[20, 80]}
          connect
          pips={{ mode: "steps", stepped: true, density: 10 }}
          step={10}
        />
      </form>
    </div>
  );
}

export default PersonalForm;
