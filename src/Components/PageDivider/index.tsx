import React, { SVGProps } from "react";
import { JsxElement } from "typescript";

interface IDivider {
  src: string;
  alt?: string;
  title: string;
}

function PageDivider({ src, title, alt = title }: IDivider) {
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
