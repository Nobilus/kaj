import React, {
  DOMAttributes,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PageDivider from "Components/PageDivider";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";

function Checkout() {
  const basket = useSelector((state: any) => state.shop);
  // captcha
  const siteKey = "6LepcIgaAAAAAKaFi_W1R9u2Zo6OHHpm-AI3TMlA";
  const [token, setToken] = useState<string | null>(null);

  // emailjs
  const userID = "user_E9OXdiZpf3CgW2U9OEAFF";
  const accessToken = "ca4d56671813c7fe0a4472312c7c2846";
  const serviceId = "service_ms5722r";
  const templateId = "template_f63ogz8";

  const templateParams = {
    voornaam: "",
    naam: "",
    email: "",
    straatnaam: "",
    huisnummer: "",
    postcode: "",
    stad: "",
    opmerkingen: "",
    bestelling: "",
  };

  const onChange = (token: string | null) => {
    setToken(token);
    console.log(token);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    if (token) {
      Object.keys(templateParams).forEach((key: any) => {
        if (key !== "bestelling") {
          console.log(key);
          console.log(e.target[key]);
          //@ts-ignore
          templateParams[key] = e.target.elements[key].value;
        } else {
          //@ts-ignore
          templateParams[key] = JSON.stringify(basket, null, 2);
        }
        //@ts-ignore
        templateParams["g-recaptcha-response"] = token;
      });

      emailjs.send(serviceId, templateId, templateParams, userID).then(
        (result) => {
          // redirecten naar shop
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
        <form onSubmit={sendEmail}>
          <div>
            <input
              type="text"
              name="voornaam"
              id="voornaam"
              placeholder="Voornaam"
            />
            <input type="text" name="naam" id="naam" placeholder="Naam" />
            <input type="email" name="email" id="email" placeholder="E-mail" />
          </div>
          <div>
            <input
              type="text"
              name="straatnaam"
              id="straatnaam"
              placeholder="Straatnaam"
            />
          </div>
          <div>
            <input
              type="number"
              name="huisnummer"
              id="huisnummer"
              placeholder="Nr."
            />
          </div>
          <div>
            <input
              type="number"
              name="postcode"
              id="postcode"
              placeholder="Postcode"
            />
            <input type="text" name="stad" id="stad" placeholder="Stad" />
          </div>
          <textarea
            name="opmerkingen"
            id="opmerkingen"
            cols={30}
            rows={10}
            placeholder="bv. maten van t-shirts"
          />
          <ReCAPTCHA sitekey={siteKey} onChange={onChange} />
          <input type="submit" value="Bestellen" />
        </form>
      </div>
    </>
  );
}

export default Checkout;
