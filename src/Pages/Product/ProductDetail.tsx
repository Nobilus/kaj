import React, { useState } from "react";
import { Image } from "Utils/Types/product";
import parse from "html-react-parser";
import shop from "../../Images/Png/shop_icon_white.png";

interface IProductDetails {
  image: Image;
  description?: string;
  price: string;
  name: string;
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

function BasketButton() {
  return (
    <button className="o-button-reset c-basket-button">
      <h5>Bestellen</h5>
      <img className="c-basket-button__image" src={shop} alt="shop-icon" />
    </button>
  );
}

function ProductDetail({ image, description, price, name }: IProductDetails) {
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

  return (
    <div className="c-productdetail-container">
      <img
        className="c-product__img"
        src={image.src}
        alt={`${name} afbeelding`}
      />
      <h2>{name}</h2>
      {description && <p>{description}</p>}
      <p>{parse(price)}</p>
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
        <BasketButton />
      </div>
    </div>
  );
}

export default ProductDetail;
