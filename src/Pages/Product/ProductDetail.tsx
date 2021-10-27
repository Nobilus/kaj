import React, { useState } from "react";
import { Image, IProduct } from "Utils/Types/product";
import parse from "html-react-parser";
import shop from "../../Images/Png/shop_icon_white.png";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addItem } from "Actions";

interface IProductDetails {
  product: IProduct;
}

interface IButton {
  type: "+" | "-";
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ type, onClick }: IButton) {
  return (
    <button onClick={onClick} className="o-button-reset c-product__button">
      {type}
    </button>
  );
}

interface IBasketButton {
  onClick: () => any;
}

function BasketButton({ onClick }: IBasketButton) {
  return (
    <button className="o-button-reset c-basket-button" onClick={onClick}>
      <h5>Bestellen</h5>
      <img className="c-basket-button__image" src={shop} alt="shop-icon" />
    </button>
  );
}

function ProductDetail({ product }: IProductDetails) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);
  const _increase = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAmount(amount + 1);
  };
  const _decrease = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;
    if (number.match(/^\d+$/) && Number(number) <= 999) {
      setAmount(Number(number));
    }
  };

  const _order = () => {
    dispatch(
      addItem(product.name, amount, product.price, product.images[0].src)
    );
    history.push("/winkelwagen");
  };

  return (
    <div className="c-productdetail-container">
      <div className="c-productdetail-inforow">
        <img
          className="c-product__img"
          src={product.images[0].src}
          alt={`${product.name} afbeelding`}
        />
        <div className="c-product__details">
          <h2 style={{ marginBottom: 8 }}>{product.name}</h2>
          {product.description && (
            <p className="c-product__desc">{parse(product.description)}</p>
          )}
          <p style={{ marginBottom: 16, marginTop: 16 }}>
            {parse(product.price_html)}
          </p>

          <div className="c-productcontrol-column">
            <div className="c-productcontrols">
              <Button onClick={_decrease} type={"-"} />
              <input
                min={1}
                max={999}
                pattern={"[1-9]*"}
                inputMode={"numeric"}
                value={amount}
                type="number"
                name="amount"
                id="amount"
                onChange={_handleChange}
              />
              <Button onClick={_increase} type={"+"} />
            </div>
            <BasketButton onClick={_order} />
          </div>
        </div>
      </div>
      <div className="c-productdetail__desc"></div>
    </div>
  );
}

export default ProductDetail;
