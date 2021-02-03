import React from "react";

interface IPage {
  title: string;
}

function Page({ title }: IPage) {
  return <div>{title}</div>;
}

export default Page;
