import {
  faCaretDown,
  faCaretUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { colors } from "Utils/colors";
import useWindowSize from "Utils/Hooks/useWindowSize";

interface ICategoryCard {
  items: any;
  getCategory: (value: string | null) => void;
}

function CategoryCard({ items, getCategory }: ICategoryCard) {
  const { width } = useWindowSize();

  const [show, setShow] = useState(false);

  if (width && width >= 992) {
    return (
      <div className="c-categorycard">
        <div className="c-categorycard__control-row">
          <h4 className="c-categorycard__title">Categorieën</h4>
        </div>
        <ul>
          {Object.keys(items).map((item, index) => (
            <li key={index}>
              <input
                className={"o-hide-accessible"}
                type="radio"
                name="category"
                id={`${item}-id`}
                value={items[item]}
                onChange={(e) => {
                  getCategory(e.target.value);
                }}
              />
              <label className="category" htmlFor={`${item}-id`}>
                {item}
              </label>
              <FontAwesomeIcon
                className="c-cancel"
                icon={faTimes}
                onClick={(e) => {
                  //@ts-ignore
                  document.getElementById(`${item}-id`).checked = false;
                  getCategory(null);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="c-categorycard">
        <div className="c-categorycard__control-row">
          <h4 className="c-categorycard__title">Categorieën</h4>
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
          {Object.keys(items).map((item, index) => (
            <li key={index}>
              <input
                className={"o-hide-accessible"}
                type="radio"
                name="category"
                id={`${item}-id`}
                value={items[item]}
                onChange={(e) => {
                  getCategory(e.target.value);
                }}
              />
              <label htmlFor={`${item}-id`}>{item}</label>
              <FontAwesomeIcon
                className="c-cancel"
                icon={faTimes}
                onClick={(e) => {
                  //@ts-ignore
                  document.getElementById(`${item}-id`).checked = false;
                  getCategory(null);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CategoryCard;
