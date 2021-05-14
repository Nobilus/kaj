import { AxiosRequestConfig } from "axios";
import PageDivider from "Components/PageDivider";
import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import { IPage } from "Utils/Types/page";
import parse from "html-react-parser";

function PraktischPage({ match }: any) {
  const {
    params: { pagetitle },
  } = match;

  const [page, setPage] = useState<IPage>();

  useEffect(() => {
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: pagetitle,
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
    if (pagetitle) {
      fetchPage();
    }
  }, [pagetitle]);

  return (
    <>
      <PageDivider alt={""} title={pagetitle} />
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

export default PraktischPage;
