import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { IProduct } from "Utils/Types/product";

interface IProductCard {
  product: IProduct;
}

function ProductCard({ product }: IProductCard) {
  return (
    <Link to={`/shop/${product.id}`} className="c-productcard">
      <img
        src={
          product.images[0]?.src ??
          "http://wordpress.kaj.be/wp-content/uploads/woocommerce-placeholder.png"
        }
        alt={`${product.slug}-image`}
      />
      <h3>{product.name}</h3>
      {parse(product.price_html)}
    </Link>
  );
}

export default ProductCard;
