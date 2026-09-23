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



// Gear.jsx
import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as GearVector } from "../../../assets/gear.svg";
import "./style.css";

export const Gear = ({ className = "", onClick }) => {
  return (
    <div className={`gear ${className}`} onClick={onClick}>
      <GearVector className="vector" />
    </div>
  );
};

Gear.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
