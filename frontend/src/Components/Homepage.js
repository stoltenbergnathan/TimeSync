import { React, useEffect, useState } from "react";
import { Alert, Spinner, Container } from "react-bootstrap";
import GetFeed from "./GetFeed";
import { ReactComponent as LocationLogo } from "../assets/map-marker.svg";
import { ReactComponent as PeopleLogo } from "../assets/people.svg";

function Homepage() {
  const [list, setList] = useState([]);
  const [areaVar, setAreaVar] = useState("dark shadow w-25 m-1");
  const [personalVar, setPersonalVar] = useState("light shadow w-25 m-1");
  const [loading, setLoading] = useState(false);
  const [friendsArray, setFriendsArray] = useState([]);

  useEffect(() => {
    AreaFeed();
    fetch("http://timesync.one/friends", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((friends) => {
        fetch("http://timesync.one/getCurrentUser", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            friends.push(data.user);
            setFriendsArray(friends);
          });
      });
  }, []);

  const AreaFeed = () => {
    setAreaVar("dark shadow w-25 m-1");
    setPersonalVar("light shadow w-25 m-1");
    setLoading(true);
    fetch("http://timesync.one/AreaFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(
          data.sort(function (a, b) {
            const date1 = new Date(a.createdAt).getTime();
            const date2 = new Date(b.createdAt).getTime();
            return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
          })
        );
        setLoading(false);
      });
  };
  const PersonalFeed = () => {
    setPersonalVar("dark shadow w-25 m-1");
    setAreaVar("light shadow w-25 m-1");
    setLoading(true);

    fetch("http://timesync.one/PersonalFeed", {
      method: "POST",
      body: JSON.stringify({ friends: friendsArray }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(
          data
            .sort(function (a, b) {
              const date1 = new Date(a.createdAt).getTime();
              const date2 = new Date(b.createdAt).getTime();
              return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
            })
            .filter((post) => friendsArray.includes(post.username))
        );
        setLoading(false);
      });
  };

  const renderEvents = () => {
    if (loading)
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    if (list === undefined) {
      return (
        <>
          <Alert variant="danger m-3">
            <Alert.Heading>No Posts found!</Alert.Heading>
          </Alert>
        </>
      );
    }
    return (
      <>
        {list.map((prev) => {
          return (
            <GetFeed
              _id={prev._id}
              title={prev.title}
              genre={prev.genre}
              dateTime={prev.dateTime}
              eventUrl={prev.eventUrl}
              imageUrl={prev.imageUrl}
              username={prev.username}
              kind={prev.kind}
              ctime={prev.createdAt}
              comments={prev.comments}
            />
          );
        })}
      </>
    );
  };

  return (
    <div>
      <br />
      <div className="text-center d-flex justify-content-center">
        <Alert onClick={() => AreaFeed()} variant={areaVar}>
          <Alert.Heading>
            Public Feed{" "}
            <span>
              <LocationLogo style={{ width: "30px", fill: "black" }} />
            </span>
          </Alert.Heading>
        </Alert>
        <Alert onClick={() => PersonalFeed()} variant={personalVar}>
          <Alert.Heading>
            Friends Feed{" "}
            <span>
              <PeopleLogo style={{ width: "30px", fill: "black" }} />
            </span>
          </Alert.Heading>
        </Alert>
      </div>
      <br />
      <Container fluid className="col-7 m-auto">
        {renderEvents()}
      </Container>
    </div>
  );
}

export default Homepage;
