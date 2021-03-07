import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

interface IProductCard {
  img: string;
  title: string;
  price: string;
  id: number;
}

function ProductCard({ img, title, price, id }: IProductCard) {
  return (
    <Link to={`/shop/${id}`} className="c-productcard">
      <img src={img} alt={`${title}-image`} />
      <h3>{title}</h3>
      {parse(price)}
    </Link>
  );
}

export default ProductCard;
