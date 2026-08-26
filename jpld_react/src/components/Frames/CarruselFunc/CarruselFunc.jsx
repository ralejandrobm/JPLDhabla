/*
 * © 2025 [Ramón Alejandro Briseño Martínez, Hannah Carolina Fabian Valensia, Paola Ortega Bravo, Martín García Torres, Carlos Jimenez Zepeda, Santiago Arreola Munguía, Demián Velasco Gómez Llanos, Andrés González Gómez, Rodrigo López Gómez, Nahui Metztli Dado Delgadillo, Ana Mariem Pérez Chacón, Karla Avila Navarro, Ana María Guzman Solís]
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



// src/Frames/CarruselFunc/CarruselFunc.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flechas } from "../../Frames/Flechas/Flechas.jsx";
import "./style.css";

import { useAppContext, setLevel } from "../../../context/DirectoryProvider";

export const CarruselFunc = ({ items = [], onSelectLevel}) => {
  const {state} = useAppContext();
  const {level=0} = state;
  const [currentIndex, setCurrentIndex] = useState(level);
  const { dispatch } = useAppContext();

  if (!items || items.length === 0) return null;

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const getOffset = (index) => {
    const half = Math.floor(items.length / 2);
    let offset = index - currentIndex;
    if (offset < -half) offset += items.length;
    if (offset > half) offset -= items.length;
    return offset;
  };

  const handleClickItem = (index) => {
    setCurrentIndex(index);
    const isCenter = index === currentIndex;
    if (isCenter) {
      // update level in provider
      setLevel(dispatch, index).then(() => {
        console.log("Level updated:", index);
        if (onSelectLevel) onSelectLevel(index);
      });
    }
  };

  return (
    <div className="carrusel-container">
      <div className="carousel-arrow left-arrow" onClick={handlePrev}>
        <Flechas direction="left" size="large" showText={false} variant="thick" />
      </div>

      <div className="carousel-frame">
        {items.map((Item, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          return (
            <div
              key={index}
              className={`carousel-item ${isCenter ? "center-hover" : ""}`}
              onClick={() => handleClickItem(index)}
              style={{
                transform: `translateX(${offset * 180}px) scale(${isCenter ? 1.3 : 0.8})`,
                zIndex: 100 - absOffset,
                filter: isCenter ? "none" : "grayscale(100%)",
                opacity: absOffset > 2 ? 0 : 1,
                transition:
                  "transform 0.6s ease, filter 0.6s ease, opacity 0.6s ease",
                cursor: isCenter ? "pointer" : "default",
              }}
            >
              {typeof Item === "string" ? (
                <img
                  src={Item}
                  alt={`Item ${index + 1}`}
                  className="carousel-image"
                />
              ) : (
                <Item className="carousel-image" />
              )}
            </div>
          );
        })}
      </div>

      <div className="carousel-arrow right-arrow" onClick={handleNext}>
        <Flechas direction="right" size="large" showText={false} variant="thick" />
      </div>
    </div>
  );
};

CarruselFunc.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
  ),
  onSelectLevel: PropTypes.func, // callback when center item clicked
};
