import React, { useEffect, useState } from "react";
import endpoints from "Utils/endpoints";
import dateToReadableDate from "Utils/fp/dateToReadableDate";
import { axiosI } from "Utils/Types/axiosInstance";
import { IBlogpost } from "Utils/Types/blogpost";
import parse from "html-react-parser";
import Breadcrumbs from "Components/Breadcrumbs";
//@ts-ignore
function BlogPost({ match }) {
  const {
    params: { postid },
  } = match;

  const [data, setData] = useState<IBlogpost | undefined>(undefined);

  useEffect(() => {
    const fetchPost = async () => {
      await axiosI
        .get<IBlogpost>(`${endpoints.postbyid}${postid}?_embed`)
        .then(({ data }) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPost();
  }, [postid]);

  if (data) {
    console.log(match.path.split("/"));
    return (
      <>
        {/* <Breadcrumbs /> */}

        <div className={"c-blogpost-container"}>
          <div className={"c-blogpost"}>
            <div className="c-blogpost__image-container">
              <img
                className={"c-blogpost__head"}
                src={data._embedded["wp:featuredmedia"][0].source_url}
                alt={data._embedded["wp:featuredmedia"][0].alt_text}
              />
            </div>
            <div className="c-blogpost__info">
              <h5 className={"c-blogpost__title"}>{data.title.rendered}</h5>
              <p className="c-blogpost__author">
                Geschreven door {data._embedded.author[0].name}
              </p>
              <p className="c-blogpost__publishdate">
                Gepubliceerd op {dateToReadableDate(new Date(data.date))}
              </p>
            </div>
            <div className={"c-blogpost__body"}>
              {parse(data.content.rendered)}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default BlogPost;
