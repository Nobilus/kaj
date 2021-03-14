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
        .catch(() => {
          console.log("cant fetch products");
        });
    };
    fetchProducts();
  }, [catId]);

  return (
    <>
      <PageDivider title={title} />

      <div className="c-page">
        <div className="c-shoprow">
          <CategoryCard
            getCategory={(value: string) => {
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
      </div>
    </>
  );
}

export default Shop;
