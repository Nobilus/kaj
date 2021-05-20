import React, { useEffect, useState } from "react";
import MenuCard from "Components/MenuCard";
import parse from "html-react-parser";

// Menucard icons
import shop from "Images/Png/MenuCard/shop_icon_small.png";
import locatie from "Images/Png/MenuCard/location_on-24px.png";
import praktisch from "Images/Png/MenuCard/praktisch_icon.png";
import overons from "Images/Png/MenuCard/over_ons_icon.png";

// In de kijker icon
import kijker from "Images/Png/in_de_kijker_icon.png";
import calendar from "Images/Svg/calendar.svg";

import Button from "Components/Button";
import Blogpostcard from "Components/Blogpostcard";

// blogpost placeholder
import placeholder from "Images/Jpg/placeholder.jpg";
import { axiosI } from "Utils/Types/axiosInstance";
import endpoints from "Utils/endpoints";
import { IBlogpost } from "Utils/Types/blogpost";
import { useHistory } from "react-router-dom";
import PageDivider from "Components/PageDivider";
import { EventElement, Event } from "Utils/Types/events";

import CalendarEventCard from "Components/CalendarEventCard";
import { IPage } from "Utils/Types/page";
import { AxiosRequestConfig } from "axios";

function App() {
  const [page, setPage] = useState<IPage>();
  const [blogposts, setBlogposts] = useState<IBlogpost[]>();
  const [events, setEvents] = useState<EventElement[]>();
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
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: "home",
          _embed: true,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyslug, axiosconf)
        .then(({ data }) => {
          setPage(data[0]);
        })
        .catch(() => {});
    };

    const fetchEvents = async () => {
      axiosI
        .get<Event>(endpoints.getevents)
        .then(({ data }) => {
          setEvents(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPosts();
    fetchEvents();
    fetchPage();
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
            {page && parse(page.content.rendered)}
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
      {events && events.length >= 1 ? (
        <>
          <PageDivider src={calendar} title={"Kalender"} />
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
