import React from "react";
import { TitleFormats } from "@/lib/query.interfaces";

type LanguageSelectorProps = {
  titleFormat: TitleFormats;
  setTitleFormat: React.Dispatch<React.SetStateAction<TitleFormats>>;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  titleFormat,
  setTitleFormat,
}) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFormat(e.target.id as TitleFormats);
    localStorage.setItem("titleFormat", e.target.id);
  };

  return (
    <div className="container mb-4">
      <p className="text-center mb-1">Select title format:</p>
      <div className="btn-group d-flex justify-content-center">
        <input
          type="radio"
          className="btn-check"
          name="language"
          id="romaji"
          autoComplete="off"
          onChange={handleLanguageChange}
          checked={titleFormat === "romaji"}
        />
        <label className="btn btn-outline-primary flex-grow-0" htmlFor="romaji">
          Romaji
        </label>
        <input
          type="radio"
          className="btn-check"
          name="language"
          id="english"
          autoComplete="off"
          onChange={handleLanguageChange}
          checked={titleFormat === "english"}
        />
        <label
          className="btn btn-outline-primary flex-grow-0"
          htmlFor="english"
        >
          English
        </label>
        <input
          type="radio"
          className="btn-check"
          name="language"
          id="native"
          autoComplete="off"
          onChange={handleLanguageChange}
          checked={titleFormat === "native"}
        />
        <label className="btn btn-outline-primary flex-grow-0" htmlFor="native">
          Native
        </label>
      </div>
    </div>
  );
};

export default LanguageSelector;
