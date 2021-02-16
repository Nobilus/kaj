import React, { useEffect, useState } from "react";

import Navbar from "Components/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "../Pages/App";
import OnsTeam from "Pages/OnsTeam";
import Shop from "Pages/Shop";
import Burger from "Components/HamburgerMenu";
import axios from "axios";
import { axiosI } from "./Types/axiosInstance";
import { MenuI } from "./Types/menuItems";
import Page from "Pages/Page";
import Footer from "Components/Footer";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuI>();

  useEffect(() => {
    const fetchRoutes = async () => {
      console.log("this is  routes fetch");
      await axiosI
        .get<MenuI>("wp-api-menus/v2/menus/25")
        .then(({ data }) => {
          console.log("fetch succes");
          setMenuItems(data);
          console.log(data.items);
        })
        .catch((err) => {
          console.log("failed");
          console.warn(err.response);
        });
      setLoading(false);
    };
    fetchRoutes();
  }, []);

  return (
    <>
      <Navbar items={menuItems} />
      <div className="c-app">
        <Switch>
          {!loading &&
            menuItems?.items.map(({ id, title, object_slug }) => {
              return (
                <Route key={id} exact path={"/" + object_slug}>
                  {title === "Home" ? (
                    <App />
                  ) : title === "Ons team" ? (
                    <OnsTeam />
                  ) : (
                    <Page title={title} />
                  )}
                </Route>
              );
            })}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}
