import React, { SVGProps } from "react";
import { JsxElement } from "typescript";
// In de kijker icon
import kijker from "Images/Png/in_de_kijker_icon.png";

interface IDivider {
  src?: string;
  alt?: string;
  title: string;
}

function PageDivider({ src = kijker, title, alt = title }: IDivider) {
  return (
    <div className="c-homepage-divider">
      <div className="c-kijker">
        <img className="c-kijker__icon" src={src} alt={alt} />
      </div>
      <h4>{title}</h4>
    </div>
  );
}

export default PageDivider;
