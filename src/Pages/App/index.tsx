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
import PageDivider from "Components/PageDivider";
import { Events, Event } from "Utils/Types/events";

import CalendarEventCard from "Components/CalendarEventCard";

function App() {
  const [blogposts, setBlogposts] = useState<IBlogpost[]>();
  const [events, setEvents] = useState<Event[]>();
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
    const fetchEvents = async () => {
      axiosI
        .get<Events>(endpoints.getevents)
        .then(({ data }) => {
          setEvents(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPosts();
    fetchEvents();
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
        <MenuCard link={"/over-ons"} iconSource={overons} title={"Over ons"} />
        <MenuCard link={"/shop"} iconSource={shop} title={"Shop"} />
        <MenuCard
          link={"/afdelingen"}
          iconSource={locatie}
          title={"KAJ\nin de buurt"}
        />
        <MenuCard
          link={"/praktisch"}
          iconSource={praktisch}
          title={"Praktisch"}
        />
      </div>
      <PageDivider src={kijker} title={"In de kijker"} />
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
      {events ? (
        <>
          <PageDivider src={kijker} title={"Kalender"} />
          <div className="c-calendar-grid">
            {events?.map((item, index) => (
              <CalendarEventCard key={`event-${index}`} event={item} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
