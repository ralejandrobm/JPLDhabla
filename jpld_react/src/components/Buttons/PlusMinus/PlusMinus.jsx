/*
 * © 2025 [Ramón Alejandro Briseño Martínez, Hannah Carolina Fabian Valensia, Paola Ortega Bravo, Martín García Torres, Carlos Jimenez Zepeda, Santiago Arreola Munguía, Demián Velasco Gómez Llanos, Andrés González Gómez, Rodrigo López Gómez, Nahui Metztli Dado Delgadillo, Ana Mariem Pérez Chacón, Karla Avila Navarro, Ana María Guzman Solís, Bruno Palacios Cacho, Armando Josua Hermosillo García]
 * Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * 
 * Contributors must be credited when using or modifying this file.
 * Commercial use or redistribution without permission is prohibited.
 * 
 * Asset Attributions:
 * - Some SVG icons provided by Vecteezy (https://www.vecteezy.com)
 *   License: Free for personal and commercial use with attribution
 * 
 * Full license text: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 */


import React, { useState } from "react";
import PropTypes from "prop-types";

// Import SVGs as React components
import { ReactComponent as PlusVector } from "../../../assets/plus.svg";
import { ReactComponent as MinusVector } from "../../../assets/minus.svg";

import "./style.css";

export const PlusMinus = ({
  type = "plus",
  size = "normal",
  className = "",
  onClick,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`plus-minus ${size} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {type === "plus" ? (
        <PlusVector
          className="pm-icon"
        />
      ) : (
        <MinusVector
          className="pm-icon"
        />
      )}
    </div>
  );
};

PlusMinus.propTypes = {
  type: PropTypes.oneOf(["plus", "minus"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
  className: PropTypes.string,
  onClick: PropTypes.func, // ✅ add prop validation
};
