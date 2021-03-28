import React, { SVGProps } from "react";
import { JsxElement } from "typescript";

// icons
import kijkerIcon from "Images/Png/in_de_kijker_icon.png";
import onsteamIcon from "Images/Png/ons_team_icon.png";
import shopIcon from "Images/Png/shop_icon_white.png";

interface IDivider {
  src?: string;
  alt?: string;
  title: string;
}

const icons: { [key: string]: string } = {
  "in de kijker": kijkerIcon,
  kalender: kijkerIcon,
  "precair werk": kijkerIcon,
  scheidingssituaties: kijkerIcon,
  "waardig leven": kijkerIcon,
  uitbouw: kijkerIcon,
  afdelingen: kijkerIcon,
  "over ons": kijkerIcon,
  "ons team": onsteamIcon,
  praktisch: kijkerIcon,
  shop: shopIcon,
  winkelwagen: shopIcon,
  afrekenen: shopIcon,
  nieuws: kijkerIcon,
};

function PageDivider({ src = kijkerIcon, title, alt = title }: IDivider) {
  return (
    <div className="c-homepage-divider">
      <div className="c-kijker">
        <img
          className="c-kijker__icon"
          src={icons[title.toLowerCase()]}
          alt={alt}
        />
      </div>
      <h4>{title}</h4>
    </div>
  );
}

export default PageDivider;
