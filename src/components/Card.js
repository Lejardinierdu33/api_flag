import React, { useState } from "react";

function Card({ flag }) {
  let independenceStatus = flag.independent ? "Oui" : "Non";

  const handleImageClick = () => {
    window.open(flag.maps.googleMaps, "_blank");
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  return (
    <div className="card_flag">
      <img
        src={flag.flags.svg}
        alt={flag.flags.alt}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleImageClick}
      />
      {hovered && <p className="click-message">Viens voir le pays !</p>}
      <div className="container_text_flag">
        <h2>{flag.translations.fra.common}</h2>
        <p className="capital">Capitale : {flag.capital}</p>
        <p className="nbre_hab">
          Nombre d'habitant : {flag.population.toLocaleString()}
        </p>
        <p className="independance">Indépendance : {independenceStatus}</p>
        <p className="superficie">
          Superficie du pays : {flag.area.toLocaleString()} km&sup2;
        </p>
      </div>
    </div>
  );
}

export default Card;
