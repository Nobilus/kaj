import React from "react";

interface IMenuCard {
  iconSource: any;
  title: string;
}

function MenuCard({ iconSource, title }: IMenuCard) {
  return (
    <div className="c-menu-card">
      <div className="c-menu-card__item">
        <img className="c-menu-card__image" src={iconSource} alt={title} />
        <h3 className="c-menu-card__title">{title}</h3>
      </div>
    </div>
  );
}

export default MenuCard;
