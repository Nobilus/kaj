import React from "react";

import Navbar from "Components/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "../Pages/App";
import Afdelingen from "Pages/Afdelingen";
import OnsTeam from "Pages/OnsTeam";
import OverOns from "Pages/OverOns";
import Praktisch from "Pages/Praktisch";
import Shop from "Pages/Shop";
import Themas from "Pages/Themas";
import KernEnergie from "Pages/Kernenergie";
import Burger from "Components/HamburgerMenu";
import { possibleRoutes } from "./possibleRoutes";

export function Routes() {
  return (
    <div className="c-app">
      <Navbar />
      <Burger />
      <Switch>
        {Object.entries(possibleRoutes).map((route, index) => {
          return <Route exact path={"/" + route[0]} component={route[1]} />;
        })}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        {/* <Route exact path={"/home"} component={App} />
        <Route exact path={"/praktisch"} component={Praktisch} />
        <Route exact path={"/themas"} component={Themas} />
        <Route exact path={"/kernenergie"} component={KernEnergie} />
        <Route exact path={"/shop"} component={Shop} />
        <Route exact path={"/afdelingen"} component={Afdelingen} />
        <Route exact path={"/over-ons"} component={OverOns} />
        <Route exact path={"/ons-team"} component={OnsTeam} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route> */}
      </Switch>
    </div>
  );
}
