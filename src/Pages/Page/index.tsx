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
  const [categories, setCategories] = useState<Object>({});
  const [catId, setCatId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: slug,
          _embed: true,
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
    if (isShop) {
      fetchProducts();
    }
  }, [catId]);

  if (isShop) {
    return (
      <div className="c-page">
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <div className="c-shoprow">
          <CategoryCard
            getCategory={(value: string) => {
              setCatId(value);
            }}
            items={categories}
          />
          <div className="c-productgrid">
            {products.map((item, index) => {
              return (
                <ProductCard
                  id={item.id}
                  key={index}
                  title={item.name}
                  img={item.images[0].src}
                  price={item.price_html}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <div className="c-page">
          {page && page?._embedded["wp:featuredmedia"] && (
            <img
              src={page._embedded["wp:featuredmedia"][0].source_url}
              alt={page._embedded["wp:featuredmedia"][0].alt_text}
            />
          )}
          {page && parse(page.content.rendered)}
        </div>
      </>
    );
  }
}

export default Page;
