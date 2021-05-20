import React, { useEffect, useState } from "react";

import { AxiosRequestConfig } from "axios";
import CategoryCard from "Components/CategoryCard";
import PageDivider from "Components/PageDivider";
import ProductCard from "Components/ProductCard";
import endpoints from "Utils/endpoints";
import { categoriesFromProducts } from "Utils/fp/categoriesFromProducts";
import { axiosI } from "Utils/Types/axiosInstance";
import { IProduct } from "Utils/Types/product";

interface IShop {
  title: string;
}

function Shop({ title }: IShop) {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [categories, setCategories] = useState<Object>({});
  const [catId, setCatId] = useState<string | null>(null);
  const [comingsoon, setComingsoon] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      const axiosConf: AxiosRequestConfig = {
        params: {
          category: catId,
        },
      };
      axiosI
        .get<Array<IProduct>>(endpoints.getproducts, axiosConf)
        .then(({ data }) => {
          setProducts(data);
          if (Object.keys(categories).length === 0) {
            setCategories(categoriesFromProducts(data));
          }
        })
        .catch((error) => {
          setComingsoon(true);
          console.log("cant fetch products", error);
        });
    };
    fetchProducts();
  }, [catId]);

  return (
    <>
      <PageDivider title={title} />

      {products.length > 0 && !comingsoon ? (
        <div className="c-shoppage">
          <CategoryCard
            getCategory={(value: string | null) => {
              setCatId(value);
            }}
            items={categories}
          />
          <div className="c-productgrid">
            {products.map((item, index) => {
              return <ProductCard key={index} product={item} />;
            })}
          </div>
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>Coming soon!</h2>
      )}
    </>
  );
}

export default Shop;
