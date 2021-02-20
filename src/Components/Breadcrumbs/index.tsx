import React from "react";
import { Link } from "react-router-dom";

interface IBreadcrumbs {
  match: {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
  };
}

function Breadcrumbs() {
  return (
    <>
      <span>
        <p>{"Home > Artikels"}</p>
      </span>
    </>
  );
}

export default Breadcrumbs;
