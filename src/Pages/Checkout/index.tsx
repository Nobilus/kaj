import React, {
  DOMAttributes,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PageDivider from "Components/PageDivider";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clearBasket } from "Actions";
import { renderToStaticMarkup } from "react-dom/server";

function Checkout() {
  const basket = useSelector((state: any) => state.shop);
  const history = useHistory();
  const dispatch = useDispatch();

  // captcha
  const siteKey = "6LepcIgaAAAAAKaFi_W1R9u2Zo6OHHpm-AI3TMlA";
  const [token, setToken] = useState<string | null>(null);

  // emailjs
  const userID = "user_NDjTrdvKtAcEmBriwlpgB";
  const serviceId = "service_8u4oixd";
  const templateId = "template_rpl3wt9";

  const templateParams = {
    voornaam: "",
    naam: "",
    email: "",
    straatnaam: "",
    huisnummer: "",
    postcode: "",
    stad: "",
    opmerkingen: "geen",
    bestelling: "",
    afhaaling: false,
  };

  const onChange = (token: string | null) => {
    setToken(token);
  };

  const CreateTableFromBasket = () => {
    let total = 7;

    const border = {
      border: "1px solid black",
    };

    return (
      <table
        style={{
          borderCollapse: "collapse",
          border: "1px solid black",
        }}
      >
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th style={{ ...border }}>Artikel</th>
            <th style={{ ...border }}>Aantal</th>
            <th style={{ ...border }}>Eenheidsprijs</th>
            <th style={{ ...border }}>Type</th>
            <th style={{ ...border }}>Maat</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(basket).map((key: any, index: any) => {
            total += basket[key].amount * basket[key].price;
            return (
              <tr key={index}>
                <td style={border}>{basket[key].name}</td>
                <td style={border}>{basket[key].amount}</td>
                <td style={border}>
                  €
                  {Number(basket[key].price).toLocaleString("be-NL", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td style={border}>
                  {basket[key].size ? basket[key].size : "/"}
                </td>
                <td style={border}>
                  {basket[key].size ? basket[key].type : "/"}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ textAlign: "right" }}>Verzendkosten</td>
            <td></td>
            <td>€7.00</td>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }}>Totaal</th>
            <td></td>
            <td>
              €{total.toLocaleString("be-NL", { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    if (token) {
      Object.keys(templateParams).forEach((key: any) => {
        if (key !== "bestelling") {
          //@ts-ignore
          templateParams[key] = e.target.elements[key].value;
        } else {
          //@ts-ignore
          templateParams[key] = renderToStaticMarkup(CreateTableFromBasket());
        }
        //@ts-ignore
        templateParams["g-recaptcha-response"] = token;
      });

      emailjs.send(serviceId, templateId, templateParams, userID).then(
        (result) => {
          dispatch(clearBasket());
          history.push("/home");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    }
  };

  return (
    <>
      <PageDivider title={"Afrekenen"} />
      <div className="c-page">
        <form className="c-form" onSubmit={sendEmail}>
          <input
            className="c-form__input"
            type="text"
            name="voornaam"
            id="voornaam"
            placeholder="Voornaam"
          />
          <input
            className="c-form__input"
            type="text"
            name="naam"
            id="naam"
            placeholder="Naam"
          />
          <br />
          <input
            className="c-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <br />
          <div className="c-form-row">
            <input
              className="c-form__input c-form__input--margin"
              type="text"
              name="straatnaam"
              id="straatnaam"
              placeholder="Straatnaam"
            />
            <input
              type="number"
              name="huisnummer"
              id="huisnummer"
              placeholder="Nr."
            />
          </div>
          <div className="c-form-row">
            <input
              className="c-form__input c-form__input--margin"
              type="text"
              name="stad"
              id="stad"
              placeholder="Stad"
            />
            <input
              className="c-form__input"
              type="number"
              name="postcode"
              id="postcode"
              placeholder="Postcode"
            />
          </div>
          <br />
          <textarea
            className="c-form__input"
            name="opmerkingen"
            id="opmerkingen"
            cols={30}
            rows={10}
            placeholder="bv. Opschrift"
          />
          <br />
          <div>
            <input
              type="checkbox"
              name="afhaaling"
              id="afhaaling"
              onChange={() =>
                (templateParams.afhaaling = !templateParams.afhaaling)
              }
            />{" "}
            <label htmlFor="afhaaling">Afhalen?</label>
          </div>
          <br />
          <ReCAPTCHA sitekey={siteKey} onChange={onChange} />
          <br />
          <input
            className="o-button-reset c-form-button"
            type="submit"
            value="Bestellen"
          />
        </form>
      </div>
    </>
  );
}

export default Checkout;
