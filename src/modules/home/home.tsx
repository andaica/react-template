import React from "react";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import sidebar from "../../shared/container/sidebar";

function Home() {
  let match = useRouteMatch();
  const routes = [
    {
      path: `${match.path}/home`,
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>,
    },
    {
      path: `${match.path}/bubblegum`,
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>,
    },
    {
      path: `${match.path}/shoelaces`,
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>,
    },
  ];

  return (
    <>
      <h2>Home</h2>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to={`${match.url}/home`}>Home</Link>
            </li>
            <li>
              <Link to={`${match.url}/bubblegum`}>Bubblegum</Link>
            </li>
            <li>
              <Link to={`${match.url}/shoelaces`}>Shoelaces</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path={match.path}>
              <h3>Please select a topic.</h3>
            </Route>
            <Route path={`${match.path}/:topicId`}>
              <Topic />
            </Route>
          </Switch>
        </div>
        {/* <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div> */}
      </div>
    </>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams<{ topicId: string }>();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

export default Home;
