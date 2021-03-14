import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import parse from "html-react-parser";
import { IPage } from "Utils/Types/page";
import PageDivider from "Components/PageDivider";

import OnsTeamIcon from "Images/Png/ons_team_icon.png";
import Winkelwagen from "Pages/Winkelwagen";
import Checkout from "Pages/Checkout";
import Shop from "Pages/Shop";

interface ILocalPage {
  title: string;
  slug: string;
}

function Page({ title, slug }: ILocalPage) {
  const [page, setPage] = useState<IPage>();

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
    if (slug !== "shop" && slug !== "winkelwage" && slug !== "afrekenen") {
      fetchPage();
    }
  }, []);

  switch (slug) {
    case "shop":
      return <Shop title={title} />;

    case "winkelwagen":
      return <Winkelwagen />;

    case "afrekenen":
      return <Checkout />;

    default:
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
