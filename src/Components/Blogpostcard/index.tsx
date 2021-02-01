import React from "react";
import { Link } from "react-router-dom";

interface IBlogpostcard {
  title: string;
  img?: string;
}

function Blogpostcard({ title, img }: IBlogpostcard) {
  return (
    <div className="c-blogpostcard">
      <h5>{title}</h5>
      <img className="c-blogpostcard__img" src={img} alt={title + "-img"} />
      <Link className="c-readmore" to={"/home"}>
        Lees meer
      </Link>
    </div>
  );
}

export default Blogpostcard;
