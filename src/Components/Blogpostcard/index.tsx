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
  slug: string;
  id: number;
}

function Blogpostcard({
  title,
  img = "",
  published,
  author,
  excerpt,
  slug,
  id,
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
        <div
          className="c-blogpostcard__c1"
          style={!img ? { width: "100%" } : {}}
        >
          <div className="c-blogpostcard__excerpt">{parse(excerpt)}</div>
        </div>
        {img && (
          <div className="c-blogpostcard__c2">
            <img
              className="c-blogpostcard__img"
              src={img}
              alt={title + "-img"}
            />
          </div>
        )}
      </div>
      <Link className="c-readmore" to={`/nieuws/${id}`}>
        Lees meer
      </Link>
    </div>
  );
}

export default Blogpostcard;
