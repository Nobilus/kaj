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
            menuItems?.items.map(
              ({ id, title, object_slug: slug, children }, index) => {
                if (title === "Nieuws") {
                  return (
                    <>
                      <Route
                        key={index}
                        exact
                        path={"/" + slug}
                        component={Nieuws}
                      />
                      <Route
                        key={index}
                        path={`/${slug}/:postid`}
                        component={BlogPost}
                      />
                    </>
                  );
                } else {
                  if (children) {
                    children.map(
                      ({
                        object_id,
                        object_slug: sub_slug,
                        title: subtitle,
                      }) => {
                        return (
                          <Route
                            key={object_id}
                            exact
                            path={`/${slug}/${sub_slug}`}
                          >
                            <Page title={subtitle} slug={sub_slug} />
                          </Route>
                        );
                      }
                    );
                  } else {
                    return (
                      <Route key={id} exact path={"/" + slug}>
                        {title === "Home" ? (
                          <App />
                        ) : title === "Ons team" ? (
                          <OnsTeam />
                        ) : (
                          <Page title={title} slug={slug} />
                        )}
                      </Route>
                    );
                  }
                }
              }
            )}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}
