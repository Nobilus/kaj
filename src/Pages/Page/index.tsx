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
    console.log(slug);
  }, []);

  return (
    <>
      <PageDivider src={OnsTeamIcon} alt={""} title={title} />
      <div className="c-page">{page && parse(page.content.rendered)}</div>
    </>
  );
}

export default Page;
