import React from 'react'
import { useTranslation } from "react-i18next";

type Props = {}

const LanguageSelector = (props: Props) => {
    const { i18n } = useTranslation();

    const onSelectLanguage = (language:string) => {
      i18n.changeLanguage(language);
      localStorage.setItem("lang", language);
    };
  return (
    <>
      <img
        role="button"
        src="https://flagcdn.com/24x18/tr.png"
        width="24"
        height="18"
        alt="Turkce"
        onClick={() => onSelectLanguage("tr")}
      ></img>
      <img
        role="button"
        src="https://flagcdn.com/24x18/us.png"
        width="24"
        height="18"
        alt="English"
        onClick={() => onSelectLanguage("en")}
      ></img>
    </>
  )
}

export default LanguageSelector