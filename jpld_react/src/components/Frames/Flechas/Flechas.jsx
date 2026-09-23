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



import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Import arrow SVGs as React components
import { ReactComponent as LeftArrow } from "../../../assets/back_arrow01.svg";
import { ReactComponent as RightArrow } from "../../../assets/next_arrow01.svg";
import { ReactComponent as LeftArrow2 } from "../../../assets/left_arrow2.svg";   // thick
import { ReactComponent as RightArrow2 } from "../../../assets/right_arrow2.svg"; // thick
import "./style.css";

export const Flechas = ({
  direction = "right",
  size = "normal",
  className = "",
  showText = true,
  variant = "thin",
  to = null, // optional route to navigate to
  onClick = null, // optional callback
}) => {
  const navigate = useNavigate();
  const isRight = direction === "right";
  const isThick = variant === "thick";

  const ArrowIcon = isRight
    ? isThick
      ? RightArrow2
      : RightArrow
    : isThick
    ? LeftArrow2
    : LeftArrow;

  const handleClick = () => {
    if (to) {
      navigate(to); // navigate to the route
    }
    if (onClick) {
      onClick(); // call any additional handler
    }
  };

  return (
    <div
      className={`flechas ${size} ${className}`}
      onClick={handleClick}
      style={{ cursor: to || onClick ? "pointer" : "default" }}
    >
      <ArrowIcon className="arrow-icon" />
      {showText && (
        <span className="Atext-wrapper">{isRight ? "Siguiente" : "Atrás"}</span>
      )}
    </div>
  );
};

Flechas.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
  className: PropTypes.string,
  showText: PropTypes.bool,
  variant: PropTypes.oneOf(["thin", "thick"]),
  to: PropTypes.string,       // optional route
  onClick: PropTypes.func,    // optional callback
};
