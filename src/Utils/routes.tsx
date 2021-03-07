import React, { useEffect, useState } from "react";

import Navbar from "Components/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "../Pages/App";
import OnsTeam from "Pages/OnsTeam";
import { axiosI } from "./Types/axiosInstance";
import { MenuI } from "./Types/menuItems";
import Page from "Pages/Page";
import Footer from "Components/Footer";
import endpoints from "./endpoints";
import BlogPost from "Pages/BlogPost";
import Nieuws from "Pages/Nieuws";
import Afdelingen from "Pages/Afdelingen";
import ProductPage from "Pages/Product";

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
        })
        .catch((err) => {
          console.warn(err.response);
        });
    };

    const fetchCategories = async () => {
      await axiosI
        .get(endpoints.categories)
        .then(({ data }) => {
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
        {!loading &&
          menuItems &&
          menuItems.items.map(
            ({ id, title, object_slug: slug, children }, index) => {
              switch (title) {
                case "Home":
                  return (
                    <Route key={id} exact path={"/" + slug} component={App} />
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

                case "Shop":
                  return (
                    <>
                      <Route exact key={id} path={"/" + slug}>
                        <Page key={`${id}-${id}`} title={title} slug={slug} />
                      </Route>
                      <Route
                        exact
                        key={`${index}-${id}`}
                        path={`/${slug}/:itemid`}
                        component={ProductPage}
                      />
                    </>
                  );

                case "Nieuws":
                  return (
                    <>
                      <Route
                        exact
                        key={id}
                        path={"/" + slug}
                        component={Nieuws}
                      />
                      <Route
                        exact
                        key={`${index}-${id}`}
                        path={`/${slug}/:postid`}
                        component={BlogPost}
                      />
                    </>
                  );

                default:
                  if (children) {
                    return (
                      <Route
                        key={id}
                        path={`/${slug}`}
                        render={({ match: { url } }) =>
                          children.map((item, index) => (
                            <Route
                              key={`${item.id}-${index}`}
                              path={`${url}/${item.object_slug}`}
                            >
                              <Page
                                key={`${item.id}-${index}`}
                                title={item.title}
                                slug={item.object_slug}
                              />
                            </Route>
                          ))
                        }
                      />
                    );
                  } else {
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
        <Route exact path="/basket" />
        <Route exact path="/check-out" />
      </div>
      <Footer />
    </>
  );
}
