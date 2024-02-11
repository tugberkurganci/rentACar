import React, { useEffect, useState } from "react";
import { FaCcMastercard } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { MdContactless } from "react-icons/md";
import "./creditCardInfo.css";

type Props = {};

const CreditCardInfo = (props: Props) => {
  const [cardInfos, setCardInfos] = useState<any>({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChangeForm = (e: any) => {
    if (e.target.name === "expiry") {
      const { value } = e.target;
      let formattedValue = value;
      if (
        value.length === 3 &&
        value.indexOf("/") === -1 &&
        !isNaN(parseInt(value[value.length - 1]))
      ) {
        formattedValue = value.slice(0, 2) + "/" + value.slice(2);
      }
      setCardInfos({ ...cardInfos, [e.target.name]: formattedValue });
    } else {
      setCardInfos({ ...cardInfos, [e.target.name]: e.target.value });
    }
  };
  const formatCardNumber = (value: any) => {
    // Eğer value undefined, null veya boşsa, boş bir string döndürür
    if (!value) return "";

    // Girilen değerdeki boşlukları ve rakam olmayan karakterleri temizler
    const cleanedValue = value.replace(/\D/g, "");

    // Her dört rakamda bir boşluk ekler
    let formattedValue = "";
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += cleanedValue[i];
    }

    return formattedValue;
  };

  return (
    <div className="my-4 d-flex flex-column gap-4">
      <div className="text-center display-5 text-center border border-2 bg-light fw-medium py-2">
        <span> Credit Card information</span>
      </div>
      <div className="row d-flex flex-column flex-md-row gap-2 m-2">
        <div className="col  d-md-none d-flex flex-column  gap-2 py-4 border align-items-center">
          <div className="d-flex w-100 flex-column gap-1 bg-dark w-80 rounded text-light p-3">
            <div>Bank Name</div>
            <div className="d-flex justify-content-between">
              <div>
                <FcSimCardChip size={50} />
              </div>
              <div>
                <MdContactless size={50} />
              </div>
            </div>
            <div>
              {cardInfos.cardNumber
                ? cardInfos.cardNumber
                : "0000 0000 0000 0000"}
            </div>
            <div className="row">
              <div className="col-8">
                <div className="text-end">
                  {cardInfos.expiry ? cardInfos.expiry : "MM/DD"}
                </div>
                <div
                  className="text-break"
                  style={{
                    fontSize: `${Math.max(
                      15,
                      20 /
                        Math.max(
                          1,
                          Math.ceil(
                            (cardInfos.name ? cardInfos.name.length : 1) / 10
                          )
                        )
                    )}px`,
                  }}
                >
                  {cardInfos.name ? cardInfos.name : "John Doe"}
                </div>
              </div>
              <div className="col text-end">
                <FaCcMastercard size={50} />
              </div>
            </div>
          </div>
        </div>
        <div className="credit-card col d-flex flex-column gap-2 py-4 border align-items-center justify-content-center">
          <div className="d-flex flex-column  w-80">
            <input
              name="name"
              placeholder="John Doe"
              type="text"
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.name}
            />
          </div>
          <div className="d-flex flex-column  w-80">
            <input
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              type="text"
              maxLength={19}
              onChange={(e) => handleChangeForm(e)}
              value={formatCardNumber(cardInfos.cardNumber)}
              onKeyDown={(e) => {
                // Sadece sayı girişine izin verir
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="d-flex gap-2 w-80 justify-content-around">
            <input
              type="text"
              className="col-4 col-md-3"
              name="expiry"
              maxLength={5}
              placeholder="MM/YY"
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.expiry}
              onKeyDown={(e) => {
                // Sadece sayı girişine izin verir
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "/"
                ) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className="col-3"
              type="text"
              name="cvv"
              maxLength={3}
              placeholder="CVV"
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.cvv}
              onKeyDown={(e) => {
                // Sadece sayı girişine izin verir
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="col d-none d-md-flex flex-column  gap-2 py-4 border align-items-center">
          <div className="d-flex flex-column gap-1 bg-dark w-80 rounded text-light p-3">
            <div>Bank Name</div>
            <div className="d-flex justify-content-between">
              <div>
                <FcSimCardChip size={50} />
              </div>
              <div>
                <MdContactless size={50} />
              </div>
            </div>
            <div>
              {cardInfos.cardNumber
                ? cardInfos.cardNumber
                : "0000 0000 0000 0000"}
            </div>
            <div className="row">
              <div className="col-8">
                <div className="text-end">
                  {cardInfos.expiry ? cardInfos.expiry : "MM/DD"}
                </div>
                <div>{cardInfos.name ? cardInfos.name : "John Doe"}</div>
              </div>
              <div className="col text-end">
                <FaCcMastercard size={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardInfo;
