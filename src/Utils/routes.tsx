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
import endpoints from "./endpoints";
import BlogPost from "Pages/BlogPost";
import Nieuws from "Pages/Nieuws";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuI>();

  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      await axiosI
        .get<MenuI>(endpoints.menuitems)
        .then(({ data }) => {
          setMenuItems(data);
          console.log(data.items);
        })
        .catch((err) => {
          console.warn(err.response);
        });
    };

    const fetchCategories = async () => {
      await axiosI
        .get(endpoints.categories)
        .then(({ data }) => {
          console.log(data);
          //@ts-ignore
          data.forEach(({ name, slug }) => {
            setCategories([...categories, { name, slug }]);
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const fetchNewsRoutes = async () => {
      await axiosI.get(`${endpoints.postsbycat}`);
    };

    fetchCategories();
    fetchNewsRoutes();

    fetchRoutes();
  }, []);

  return (
    <>
      <Navbar items={menuItems} />
      <div className="c-app">
        <Switch>
          {!loading &&
            menuItems?.items.map(({ id, title, object_slug }, index) => {
              if (title === "Nieuws") {
                console.log("categories: ", categories);
                return (
                  <>
                    <Route
                      key={index}
                      exact
                      path={"/" + object_slug}
                      component={Nieuws}
                    />
                    <Route
                      key={index}
                      path={`/${object_slug}/:postid`}
                      component={BlogPost}
                    />
                  </>
                );
              } else {
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
              }
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
