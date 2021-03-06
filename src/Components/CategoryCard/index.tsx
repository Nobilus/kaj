import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { colors } from "Utils/colors";

interface ICategoryCard {
  items: Array<string>;
  getCategory: (value: string) => void;
}

function CategoryCard({ items, getCategory }: ICategoryCard) {
  const [show, setShow] = useState(false);
  return (
    <div className="c-categorycard">
      <div className="c-categorycard__control-row">
        <h4 className="c-categorycard__title">Filters</h4>
        {show ? (
          <FontAwesomeIcon
            //   className={"c-mobile-nav__icon"}
            color={colors.textColor}
            icon={faCaretUp}
            onClick={() => setShow(false)}
          />
        ) : (
          <FontAwesomeIcon
            color={colors.textColor}
            icon={faCaretDown}
            onClick={() => {
              setShow(true);
            }}
          />
        )}
      </div>
      <ul style={{ display: show ? "block" : "none" }}>
        {items.map((item, index) => (
          <li key={index}>
            <input
              className={"o-hide-accessible"}
              type="radio"
              name="category"
              id={`${item}-id`}
              value={item}
              onChange={(e) => {
                getCategory(e.target.value);
              }}
            />
            <label htmlFor={`${item}-id`}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryCard;
