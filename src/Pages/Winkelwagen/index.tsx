import Button from "Components/Button";
import PageDivider from "Components/PageDivider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteItem } from "Actions";

interface IProductRow {
  img: string;
  id: string;
  title: string;
  size?: string;
  amount: number;
  price: number;
  type?: string;
}

const ProductRow = ({
  img,
  title,
  amount,
  price,
  size,
  type,
  id,
}: IProductRow) => {
  const dispatch = useDispatch();
  const [productTitle, setProductTitle] = useState(title);
  useEffect(() => {
    if (size || type) {
      if (size && type) {
        setProductTitle(`${title} (${type} ${size})`);
      } else if (size) {
        setProductTitle(`${title} (${size})`);
      } else if (type) {
        setProductTitle(`${title} (${type})`);
      }
    }
  }, []);

  return (
    <>
      <div className="c-basket">
        <div className="c-basket-desc">
          <p className="c-basket-title">{`${productTitle}`}</p>
        </div>

        <p className="c-basket-price">{amount}x</p>
        <p className="c-basket-price">
          €
          {Number(price).toLocaleString("be-NL", {
            minimumFractionDigits: 2,
          })}
        </p>
        <FontAwesomeIcon
          className="c-basket-cancel"
          icon={faTimes}
          onClick={() => {
            dispatch(deleteItem(id));
          }}
        />
      </div>
    </>
  );
};

function Winkelwagen() {
  const history = useHistory();
  const basket = useSelector((state: any) => state.shop);
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCosts = 0;

  useEffect(() => {
    const computeTotalPrice = () => {
      let tempTotal = 0;
      for (const item in basket) {
        tempTotal += Number(basket[item].price) * basket[item].amount;
      }
      setTotalPrice(tempTotal);
    };

    if (Object.keys(basket).length >= 1) {
      computeTotalPrice();
    } else {
      history.push("/shop");
    }
  }, [basket]);

  return (
    <>
      <PageDivider title={"Winkelwagen"} />
      <div className="c-page">
        <div className="c-winkel-row">
          <button
            className="o-button-reset c-button-continue-shopping"
            onClick={() => history.push("/shop")}
          >
            Verder winkelen
          </button>
          <button
            className="o-button-reset c-button-to-checkout"
            onClick={() => history.push("/afrekenen")}
          >
            Afrekenen
          </button>
        </div>
        <hr className="c-divider" />

        {basket &&
          Object.keys(basket).map((key: any, index: any) => (
            <ProductRow
              id={key}
              img={basket[key].img}
              title={basket[key].name}
              amount={basket[key].amount}
              price={basket[key].price}
              size={basket[key].size}
              type={basket[key].type}
            />
          ))}
        <hr className="c-divider" />
        <div>
          <div className="c-winkel-row align-end">
            <div className="c-winkel-items">
              {/* <p>Totaal artikelen</p>
              <p>Verzendkosten</p>
              <br /> */}
              <b>
                <p>Totaal</p>
              </b>
            </div>
            <div className="c-winkel-items">
              {/* <p>
                €
                {totalPrice.toLocaleString("be-NL", {
                  minimumFractionDigits: 2,
                })}
              </p> */}
              {/* <p>
                €
                {shippingCosts.toLocaleString("be-NL", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <br /> */}
              <b>
                <p>
                  €
                  {(totalPrice + shippingCosts).toLocaleString("be-NL", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Winkelwagen;
