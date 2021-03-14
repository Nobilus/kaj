import Breadcrumbs from "Components/Breadcrumbs";
import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import { IProduct } from "Utils/Types/product";
import ProductDetail from "./ProductDetail";

//@ts-ignore
function ProductPage({ match }) {
  const {
    params: { itemid },
  } = match;

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      await axiosI
        .get<IProduct>(`${endpoints.productbyid}${itemid}`)
        .then(({ data }) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProduct();
  }, [itemid]);

  return (
    <>
      {product && (
        <>
          <Breadcrumbs match={match} title={product.name} id={itemid} />
          <ProductDetail product={product} />
        </>
      )}
    </>
  );
}

export default ProductPage;
