import React from "react";
import { Link } from "react-router-dom";

interface IMenuCard {
  iconSource: any;
  title: string;
  link: string;
}

function MenuCard({ iconSource, title, link }: IMenuCard) {
  return (
    <Link to={link} className="c-menu-card">
      <div className="c-menu-card__item">
        <img className="c-menu-card__image" src={iconSource} alt={title} />
        <h3 className="c-menu-card__title">{title}</h3>
      </div>
    </Link>
  );
}

export default MenuCard;
