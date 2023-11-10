import React from "react"
import './search.scss'
import { useTranslation } from "react-i18next";
export default function SearchSection() {

  const { t } = useTranslation();

  return (
    <section className="search">
      <div className="search__wrapper">
        <div>
          <h1 className="search__title"> {t("heading")} </h1>
        </div>
      </div>
    </section>
  )
}
