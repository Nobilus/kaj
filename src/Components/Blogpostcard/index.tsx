import React from "react";
import { Link } from "react-router-dom";
import dateToReadableDate from "Utils/fp/dateToReadableDate";
import parse from "html-react-parser";

interface IBlogpostcard {
  title: string;
  img?: string;
  author: string;
  published: Date;
  excerpt: string;
}

function Blogpostcard({
  title,
  img,
  published,
  author,
  excerpt,
}: IBlogpostcard) {
  return (
    <div className="c-blogpostcard">
      <h5 className={"c-blogpostcard__title"}>{title}</h5>
      <div className="c-blogpostcard__info">
        <p className="c-blogpostcard__author">Geschreven door {author}</p>
        <p className="c-blogpostcard__publishdate">
          Gepubliceerd op {dateToReadableDate(new Date(published))}
        </p>
      </div>
      <div className="c-blogpostcard__row">
        <div className="c-blogpostcard__c1">
          <div className="c-blogpostcard__excerpt">{parse(excerpt)}</div>
        </div>
        <div className="c-blogpostcard__c2">
          <img className="c-blogpostcard__img" src={img} alt={title + "-img"} />
        </div>
      </div>
      <Link className="c-readmore" to={"/home"}>
        Lees meer
      </Link>
    </div>
  );
}

export default Blogpostcard;
