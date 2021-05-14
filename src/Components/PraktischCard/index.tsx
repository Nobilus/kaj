import React, { CSSProperties, FunctionComponent } from "react";

interface IPraktischCard {
  title: string;
  image: string;
  slug: string;
}

const PraktischCard: FunctionComponent<IPraktischCard> = ({
  title,
  image,
  slug,
}) => {
  const gradient1 = "rgba(59, 55, 53, 0.5)";
  const gradient2 = "rgba(59, 55, 53, 0.5)";

  return (
    <a href={`/praktisch/${slug}`} className="c-praktisch-card-holder">
      <div
        className="c-praktisch-card"
        style={{
          backgroundImage: `linear-gradient(
            ${gradient1},
            ${gradient2}
        ), url(${image})`,
        }}
      >
        <h4 className="c-praktisch-card__title">{title}</h4>
      </div>
    </a>
  );
};

export default PraktischCard;
