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

  useEffect(() => {
    const fetchProducts = () => {
      const axiosConf: AxiosRequestConfig = {
        params: {
          category: catId,
          per_page: 30,
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
          console.log("cant fetch products", error);
        });
    };
    fetchProducts();
  }, [catId]);

  return (
    <>
      <PageDivider title={title} />

      {products.length > 0 && (
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
      )}
    </>
  );
}

export default Shop;
