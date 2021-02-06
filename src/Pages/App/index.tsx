import React from "react";
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

function App() {
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
        <Blogpostcard
          img={placeholder}
          title={"dit is een zeer tof artikel"}
          author={"Bartje"}
          published={"2021-02-03T15:59:08"}
          excerpt={
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
          }
        />
        <Blogpostcard
          img={placeholder}
          title={"dit is een zeer tof artikel"}
          author={"Bartje"}
          published={"2021-02-03T15:59:08"}
          excerpt={
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
          }
        />
        <Blogpostcard
          img={placeholder}
          title={"dit is een zeer tof artikel"}
          author={"Bartje"}
          published={"2021-02-03T15:59:08"}
          excerpt={
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
          }
        />
        <Button onClick={(test: any) => {}} title={"Bekijk meer nieuws"} />
      </div>
    </>
  );
}

export default App;
