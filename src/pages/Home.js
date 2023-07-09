import React, { useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [flagList, setFlagList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [rangeValue, setRangeValue] = React.useState(10);
  const [sortMethod, setSortMethod] = React.useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => {
      console.log(result.data);
      setFlagList(result.data);
    });
  }, []);
  return (
    <div>
      <Nav />
      <header>
        <div className="range_container">
          <label htmlFor="range">Nombre de pays</label>
          <input
            type="range"
            min="1"
            max="250"
            id="range"
            defaultValue={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          <span>{rangeValue}</span>
        </div>
        <div className="container_search">
          <input
            type="text"
            placeholder="Rechercher..."
            defaultValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="btn_container">
          <div>
            <button
              type="button"
              id="btn_croi"
              onClick={() => {
                setSortMethod("croissant");
              }}
            >
              Population Croissante
            </button>
            <button
              type="button"
              id="btn_decroi"
              onClick={() => {
                setSortMethod("decroissant");
              }}
            >
              Population Décroissante
            </button>
          </div>
          <div>
            <button
              type="button"
              id="btn_alpha"
              onClick={() => {
                setSortMethod("alphabétique");
              }}
            >
              Ordre Alphabétique
            </button>
            <button
              type="button"
              id="btn_superficie"
              onClick={() => {
                setSortMethod("superficie");
              }}
            >
              Superficie
            </button>
          </div>
        </div>
      </header>
      <section className="container_flag">
        {flagList
          .filter((flag) =>
            flag.translations.fra.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          .sort((a, b) => {
            if (sortMethod === "croissant") {
              return a.population - b.population;
            } else if (sortMethod === "decroissant") {
              return b.population - a.population;
            } else if (sortMethod === "alphabétique") {
              if (a.translations.fra.common < b.translations.fra.common) {
                return -1;
              }
              if (a.translations.fra.common > b.translations.fra.common) {
                return 1;
              }
            } else if (sortMethod === "superficie") {
              if (a.area < b.area) {
                return -1;
              }
              if (a.area > b.area) {
                return 1;
              }
            }
          })
          .slice(0, rangeValue)
          .map((flag, key) => (
            <Card flag={flag} key={key} />
          ))}
      </section>
      <Footer />
    </div>
  );
}

export default Home;
