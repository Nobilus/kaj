import { AxiosRequestConfig } from "axios";
import PageDivider from "Components/PageDivider";
import PraktischCard from "Components/PraktischCard";
import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import { IPage } from "Utils/Types/page";

interface ILocalPage {
  id: number;
  title: string;
}

function Praktisch({ id, title }: ILocalPage) {
  const [pages, setPages] = useState<Array<IPage>>();

  useEffect(() => {
    (function () {
      const axiosconf: AxiosRequestConfig = {
        params: {
          parent: id,
          _embed: true,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyparent, axiosconf)
        .then(({ data }) => {
          setPages(data);
        })
        .catch(() => {});
    })();
  }, [id]);

  return (
    <>
      <PageDivider alt={""} title={title} />
      <div className="c-page" style={{ backgroundColor: "transparent" }}>
        <div className="c-praktisch-grid">
          {pages?.map(({ title, _embedded, slug }) => (
            <PraktischCard
              slug={slug}
              title={title.rendered}
              image={
                _embedded["wp:featuredmedia"]
                  ? _embedded["wp:featuredmedia"][0].source_url
                  : ""
              }
            />
          ))}
          {pages?.map(({ title, _embedded, slug }) => (
            <PraktischCard
              slug={slug}
              title={title.rendered}
              image={
                _embedded["wp:featuredmedia"]
                  ? _embedded["wp:featuredmedia"][0].source_url
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Praktisch;
