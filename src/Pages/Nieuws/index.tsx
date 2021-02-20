import React, { useEffect, useState } from "react";
// In de kijker icon
import kijker from "Images/Png/in_de_kijker_icon.png";
import Blogpostcard from "Components/Blogpostcard";
import { IBlogpost } from "Utils/Types/blogpost";
import { axiosI } from "Utils/Types/axiosInstance";
import endpoints from "Utils/endpoints";
import { AxiosRequestConfig } from "axios";
function Nieuws() {
  const [blogposts, setBlogposts] = useState<IBlogpost[]>();
  useEffect(() => {
    const fetchPosts = async () => {
      const axiosconfig: AxiosRequestConfig = {
        params: {
          order: "desc",
          order_by: "date",
          _embed: "",
        },
      };
      axiosI
        .get<IBlogpost[]>(endpoints.allposts, axiosconfig)
        .then(({ data }) => {
          setBlogposts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPosts();
  }, []);
  return (
    <div className="c-nieuws-container">
      <div className="c-homepage-divider">
        <div className="c-kijker">
          <img className="c-kijker__icon" src={kijker} alt="In De Kijker" />
        </div>
        <h4>In de kijker</h4>
      </div>
      <div className="c-kijker-posts">
        {blogposts?.map((post, index) => {
          return (
            <Blogpostcard
              id={post.id}
              key={index}
              slug={post.slug}
              img={post._embedded["wp:featuredmedia"][0].source_url}
              title={post.title.rendered}
              author={post._embedded.author[0].name}
              published={post.date}
              excerpt={post.excerpt.rendered}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Nieuws;
