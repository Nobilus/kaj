import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
//socials icons
import facebook from "Images/Png/socials/facebook.png";
import instagram from "Images/Png/socials/instagram.png";
import twitter from "Images/Png/socials/twitter.png";

// sponsors
import dvv from "Images/Png/sponsors/logo-dvv.png";
import vlaanderen from "Images/Png/Vlaanderen_verbeelding_werkt.png";
import { AxiosRequestConfig } from "axios";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import { IPage } from "Utils/Types/page";

function Footer() {
  const [page, setPage] = useState<IPage>();
  const [address, setAddress] = useState("");
  const [images, setImages] = useState("");
  useEffect(() => {
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: "footer",
          _embed: true,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyslug, axiosconf)
        .then(({ data }) => {
          console.log(data[0]);

          setPage(data[0]);
        })
        .catch(() => {});
    };
    fetchPage();
  }, []);

  useEffect(() => {
    console.log(address);

    return () => {};
  }, [address]);

  useEffect(() => {
    if (page) {
      const content = page.content.rendered;
      const imageBegin = content.indexOf("<p>") + 3;

      const tempAddress = content.substring(0, imageBegin - 3);
      const tempImages = content.substring(
        imageBegin,
        content.lastIndexOf("</p>")
      );
      setAddress(tempAddress);
      setImages(tempImages);
    }
  }, [page]);

  return (
    <footer className="o-row__footer">
      <h4 className="c-footer-title">KAJ VZW</h4>
      <div className="c-footer-row">
        <div className="c-footer-row__column">
          {/* <p className="c-footer-row__item">Britsierlaan 5</p>
          <p className="c-footer-row__item">1030 Schaarbeek</p>
          <p className="c-footer-row__item">
            Tel: <a href="tel:022465300">02/246.53.00</a>
          </p> */}
          {/* <p className="c-footer-row__item">info@kaj.be</p> */}
          <div className="c-address">{parse(address)}</div>
        </div>
        <div className="c-footer-row__column c-footer-row__column-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/kajvzw"
          >
            <img
              className="c-footer-row__item c-footer-social"
              src={facebook}
              alt="facebook-icon"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/kajvzw/"
          >
            <img
              className="c-footer-row__item c-footer-social"
              src={instagram}
              alt="instagram-icon"
            />
          </a>
        </div>
      </div>
      <div
        className="c-footer-row"
        style={{ justifyContent: "center", marginBottom: 16 }}
      >
        {parse(images)}
      </div>
      <div className="c-attribution-container">
        <p className="c-attribution">
          Developed by{" "}
          <a
            className="c-attribution-link"
            href="https://nobilus.be"
            target="_blank"
          >
            Nobilus
          </a>
        </p>
        <p className="c-attribution">
          Designed by{" "}
          <a
            className="c-attribution-link"
            href="https://creabiz.be/"
            target="_blank"
          >
            Creabiz
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
