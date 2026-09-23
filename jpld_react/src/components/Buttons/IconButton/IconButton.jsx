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
import "./style.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const IconButton = ({ className = "", icon: Icon = null, to = null, onClick = null }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();

    // First trigger callback
    if (onClick) {
      onClick();
    }

    // Then navigate if `to` is defined
    if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className={`iniciar ${className}`}
      onClick={handleClick}
      style={{ cursor: to || onClick ? "pointer" : "default" }}
    >
      <div className="icon-wrapper">
        {Icon && <Icon className="icon-svg" />}
      </div>
    </div>
  );
};

IconButton.propTypes = {
  icon: PropTypes.elementType,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
