import { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import parse from "html-react-parser";
import { IPage } from "Utils/Types/page";
import { addDivsToResponse } from "Utils/fp/addDivsToResponse";
import PageDivider from "Components/PageDivider";

import OnsTeamIcon from "Images/Png/ons_team_icon.png";
import { ReactComponent as OverOnsI } from "Images/Svg/over_ons_icon.svg";
import { IProduct } from "Utils/Types/product";
import ProductCard from "Components/ProductCard";

interface ILocalPage {
  title: string;
  slug: string;
}

function Page({ title, slug }: ILocalPage) {
  const isShop = slug === "shop" ? true : false;
  const [page, setPage] = useState<IPage>();

  console.log("on page: ", title);

  const [products, setProducts] = useState<Array<IProduct>>([]);

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
        .catch((error) => {});
    };
    fetchPage();
  }, []);

  useEffect(() => {
    const fetchProducts = () => {
      axiosI
        .get<Array<IProduct>>(endpoints.getproducts)
        .then(({ data }) => {
          console.log(data);
          setProducts(data);
        })
        .catch((error) => {
          console.log("cant fetch products");
        });
    };
    if (isShop) {
      fetchProducts();
    }
  }, []);

  if (isShop) {
    return (
      <>
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <div className="c-shop">
          {products &&
            products.map((item) => {
              return (
                <ProductCard
                  title={item.name}
                  img={item.images[0].src}
                  price={item.price_html}
                />
              );
            })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <PageDivider src={OnsTeamIcon} alt={""} title={title} />
        <div className={isShop ? "c-shop" : "c-page"}>
          {page && parse(page.content.rendered)}
        </div>
      </>
    );
  }
}

export default Page;
