import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import router from "./core/router";
import initModules from "./modules";

function App() {
  initModules();

  return (
    <div className="App">
      <Router>
        <Switch>
          {router.getAll().map((item) => (
            <Route path={item.path}>{item.view}</Route>
          ))}
          <Route path="*">
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
