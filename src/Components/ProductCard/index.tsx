import React from "react";
import parse from "html-react-parser";

interface IProductCard {
  img: string;
  title: string;
  price: string;
}

function ProductCard({ img, title, price }: IProductCard) {
  return (
    <div className="c-productcard">
      <img src={img} alt={`${title}-image`} />
      <h3>{title}</h3>
      {parse(price)}
    </div>
  );
}

export default ProductCard;
