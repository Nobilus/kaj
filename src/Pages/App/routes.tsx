import React from "react";

import Navbar from "Components/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import Afdelingen from "Pages/Afdelingen/Afdelingen";
import OnsTeam from "Pages/OnsTeam/OnsTeam";
import OverOns from "Pages/OverOns/OverOns";
import Praktisch from "Pages/Praktisch/Praktisch";
import Shop from "Pages/Shop/Shop";
import Themas from "Pages/Themas/Themas";
import KernEnergie from "Pages/Kernenergie/KernEnergie";

export function Routes() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path={"/home"} component={App} />
        <Route exact path={"/praktisch"} component={Praktisch} />
        <Route exact path={"/themas"} component={Themas} />
        <Route exact path={"/kernenergie"} component={KernEnergie} />
        <Route exact path={"/shop"} component={Shop} />
        <Route exact path={"/afdelingen"} component={Afdelingen} />
        <Route exact path={"/over-ons"} component={OverOns} />
        <Route exact path={"/ons-team"} component={OnsTeam} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}
