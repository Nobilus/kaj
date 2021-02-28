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
import Afdelingen from "Pages/Afdelingen";

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
                switch (title) {
                  case "Home":
                    return (
                      <Route key={id} exact path={"/" + slug} component={App} />
                    );
                  case "Nieuws":
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

                  case "Ons team":
                    return (
                      <Route
                        key={id}
                        exact
                        path={"/" + slug}
                        component={OnsTeam}
                      />
                    );

                  case "Afdelingen":
                    return (
                      <Route
                        key={id}
                        exact
                        path={"/" + slug}
                        component={Afdelingen}
                      />
                    );

                  default:
                    if (children) {
                      return (
                        <Route
                          key={id}
                          path={`/${slug}`}
                          render={({ match: { url } }) =>
                            children.map((item) => (
                              <Route path={`${url}/${item.object_slug}`}>
                                <Page
                                  title={item.title}
                                  slug={item.object_slug}
                                />
                              </Route>
                            ))
                          }
                        />
                      );
                    } else {
                      console.log(id, slug, title);
                      return (
                        <Route key={id} path={`/${slug}`}>
                          <Page title={title} slug={slug} />
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
