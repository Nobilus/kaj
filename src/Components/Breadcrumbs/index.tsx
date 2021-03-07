import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IBreadcrumbs {
  match: {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
  };
  title: string;
  id: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Breadcrumbs({ match, title, id }: IBreadcrumbs) {
  const [crumbs, setCrumbs] = useState<Array<string>>([]);

  useEffect(() => {
    const _getCrumbs = (url: string) => {
      const crumbs = url.split("/");
      crumbs.shift();

      const index = crumbs.indexOf(id);
      // id to title
      if (index !== -1) {
        crumbs[index] = title;
      }
      setCrumbs(crumbs);
    };
    _getCrumbs(match.url);
  }, [match.url, id, title]);

  return (
    <>
      <span className="c-breadcrumbs">
        <p>
          {crumbs.map((item, index) => {
            if (index + 1 === crumbs.length) {
              return `${capitalizeFirstLetter(item)} `;
            } else {
              return (
                <Link
                  key={index}
                  className="c-breadcrumbs__link"
                  to={`/${item}`}
                >{`${capitalizeFirstLetter(item)} > `}</Link>
              );
            }
          })}
        </p>
      </span>
    </>
  );
}

export default Breadcrumbs;
