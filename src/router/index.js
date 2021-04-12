import React from "react";
import {
  Route,
  Switch,
  HashRouter as Router,
  Redirect,
} from "react-router-dom";
import routes from "./routerConfig";
import { commonConfig } from "../shared/config";

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} />}
    />
  );
}

function PrivateRoute(){
  return (
    <Switch>
      <Redirect
        sensitive={true}
        exact={true}
        from={commonConfig.routeBasePath + "/"}
        to={commonConfig.routeBasePath + "/home"}
      />
      {routes.map((item, index) => {
        return <RouteWithSubRoutes key={index} {...item} />;
      })}
      <Route path="*">
      </Route>
    </Switch>
  );
}

function RouterMap(){
  return (
    <Router>
      <Switch>
        <Redirect
          sensitive={true}
          exact={true}
          from="/"
          to={commonConfig.routeBasePath + "/home"}
        />
        <Route path={commonConfig.routeBasePath + "/*"}>
          <PrivateRoute />
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterMap;
