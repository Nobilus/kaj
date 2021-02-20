import React, { useEffect, useState } from "react";
import MenuCard from "Components/MenuCard";

// Menucard icons
import shop from "Images/Png/MenuCard/shop_icon_small.png";
import locatie from "Images/Png/MenuCard/location_on-24px.png";
import praktisch from "Images/Png/MenuCard/praktisch_icon.png";
import overons from "Images/Png/MenuCard/over_ons_icon.png";

// In de kijker icon
import kijker from "Images/Png/in_de_kijker_icon.png";

import Button from "Components/Button";
import Blogpostcard from "Components/Blogpostcard";

// blogpost placeholder
import placeholder from "Images/Jpg/placeholder.jpg";
import { axiosI } from "Utils/Types/axiosInstance";
import endpoints from "Utils/endpoints";
import { IBlogpost } from "Utils/Types/blogpost";
import { useHistory } from "react-router-dom";

function App() {
  const [blogposts, setBlogposts] = useState<IBlogpost[]>();
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      axiosI
        .get<IBlogpost[]>(endpoints.homepageposts)
        .then(({ data }) => {
          setBlogposts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPosts();
  }, []);

  return (
    <>
      <>
        <section
          className="c-header__homepage"
          role="img"
          aria-label="Image Description"
        >
          <div className="c-header__moto">
            <h1>ZIEN</h1>
            <h1>OORDELEN</h1>
            <h1>HANDELEN</h1>
          </div>
        </section>
      </>
      <div className="c-menu-card__row">
        <MenuCard iconSource={overons} title={"Over ons"} />
        <MenuCard iconSource={shop} title={"Shop"} />
        <MenuCard iconSource={locatie} title={"KAJ\nin de buurt"} />
        <MenuCard iconSource={praktisch} title={"Praktisch"} />
      </div>
      <div className="c-homepage-divider">
        <div className="c-kijker">
          <img className="c-kijker__icon" src={kijker} alt="In De Kijker" />
        </div>
        <h4>In de kijker</h4>
      </div>
      <div className="c-kijker-posts">
        {blogposts?.map((post, index) => {
          return (
            <Blogpostcard
              id={post.id}
              key={index}
              slug={post.slug}
              img={post._embedded["wp:featuredmedia"][0].source_url}
              title={post.title.rendered}
              author={post._embedded.author[0].name}
              published={post.date}
              excerpt={post.excerpt.rendered}
            />
          );
        })}

        <Button
          onClick={() => {
            history.push("/nieuws");
          }}
          title={"Bekijk meer nieuws"}
        />
      </div>
    </>
  );
}

export default App;
