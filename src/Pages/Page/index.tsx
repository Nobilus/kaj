import { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import parse from "html-react-parser";
import { IPage } from "Utils/Types/page";
import PageDivider from "Components/PageDivider";

import OnsTeamIcon from "Images/Png/ons_team_icon.png";
import { IProduct } from "Utils/Types/product";
import ProductCard from "Components/ProductCard";
import { categoriesFromProducts } from "Utils/fp/categoriesFromProducts";
import CategoryCard from "Components/CategoryCard";
import { isTemplateTail } from "typescript";

interface ILocalPage {
  title: string;
  slug: string;
}

function Page({ title, slug }: ILocalPage) {
  const isShop = slug === "shop" ? true : false;
  const [page, setPage] = useState<IPage>();
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [selectedCat, setSelectedCat] = useState<string>();

  useEffect(() => {
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: slug,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyslug, axiosconf)
        .then(({ data }) => {
          setPage(data[0]);
        })
        .catch(() => {});
    };
    fetchPage();
  }, []);

  useEffect(() => {
    const fetchProducts = () => {
      axiosI
        .get<Array<IProduct>>(endpoints.getproducts)
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(() => {
          console.log("cant fetch products");
        });
    };
    if (isShop) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (products) {
      setCategories(categoriesFromProducts(products));
    }
  }, [products]);

  const Products = () => {
    if (selectedCat) {
      console.log(
        "results: ",
        products.filter((product) => {
          product.categories.forEach((c) => {
            console.log(c.name === selectedCat);
            return c.name === selectedCat;
          });
        })
      );
    }
  };

  if (isShop) {
    Products();
    return (
      <>
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <div className="c-shoprow">
          <CategoryCard
            getCategory={(value: string) => {
              setSelectedCat(value);
            }}
            items={categoriesFromProducts(products)}
          />
          <div className="c-productgrid">
            {selectedCat
              ? products
                  .filter((item) => {
                    if (item.categories.filter((e) => e.name === selectedCat)) {
                      // console.log("filter: ", selectedCat);
                      // console.log("filtered items: ", item.name);
                      return item;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        title={item.name}
                        img={item.images[0].src}
                        price={item.price_html}
                      />
                    );
                  })
              : products.map((item, index) => {
                  return (
                    <ProductCard
                      key={index}
                      title={item.name}
                      img={item.images[0].src}
                      price={item.price_html}
                    />
                  );
                })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <>{page && parse(page.content.rendered)}</>
      </>
    );
  }
}

export default Page;
