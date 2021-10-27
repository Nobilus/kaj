import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import shop from "../../Images/Png/shop_icon_white.png";
import { Image, IProduct } from "Utils/Types/product";
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
  const [secondaryImages, setSecondaryImages] = useState<Array<string>>([]);
  const [sizes, setSizes] = useState<Array<string>>([]);

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

  useEffect(() => {
    if (product.images.length > 0) {
      const images = product.images;
      images.map((img) => console.log(images));
      const spliced = images.splice(1, images.length).map((img) => img.src);
      setSecondaryImages(spliced);
    }
  }, []);

  useEffect(() => {
    console.log({ product });
    if (
      product.attributes.length > 0 &&
      product.attributes[0].name === "size" &&
      product.attributes[0].options
    ) {
      setSizes(product.attributes[0].options);
    }
  }, [product]);

  useEffect(() => {
    console.log(secondaryImages);
  }, [secondaryImages]);

  return (
    <div className="c-productdetail-container">
      <div className="c-productdetail-inforow">
        <div>
          <div className="c-product__primary-img-row">
            <Zoom>
              <img
                className="c-product__img"
                src={product.images[0].src}
                alt={`${product.name} afbeelding`}
              />
            </Zoom>
          </div>
          <div className="c-product__secundary-img-row">
            {secondaryImages.map((img, key) => (
              <Zoom key={key}>
                <img
                  className="c-product__img c-product__img-secondary "
                  src={img}
                />
              </Zoom>
            ))}
          </div>
        </div>
        <div className="c-product__details">
          <h2 style={{ marginBottom: 8 }}>{product.name}</h2>
          {product.description && (
            <p className="c-product__desc">{parse(product.description)}</p>
          )}
          <p style={{ marginBottom: 16, marginTop: 16 }}>
            <b>{parse(product.price_html)}</b>
          </p>

          <div className="c-productcontrol-column">
            {sizes.length > 0 && (
              <div className="c-productcontrols">
                <select className="c-input" name="size" id="size">
                  <option value="">{"-- maat"}</option>
                  {sizes.map((size, key) => (
                    <option key={key} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
