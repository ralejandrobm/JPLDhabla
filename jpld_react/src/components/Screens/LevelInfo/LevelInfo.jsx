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



import React, { useState, useEffect } from "react";
import { Iniciar } from "../../Buttons/Iniciar/Iniciar.jsx";
import { ReactComponent as Easy } from "../../../assets/one.svg";
import { ReactComponent as Medium } from "../../../assets/two.svg";
import { ReactComponent as Hard } from "../../../assets/three.svg";
import "./style.css";
import { useAppContext, setDifficulty } from "../../../context/DirectoryProvider";

export const LevelInfo = ({ level, visible, onCancel }) => {
  const { dispatch, state } = useAppContext();
  const [selectedDiff, setSelectedDiff] = useState(state.difficulty);
  const [showClass, setShowClass] = useState(false);

  const handleSelectDiff = (diff) => {
    setSelectedDiff(diff);
    setDifficulty(dispatch, diff);
  };

  useEffect(() => {
    setShowClass(visible);
  }, [visible]);

  if (!visible) return null; // hide completely when not visible

  return (
    <div className="level-info-backdrop">
      <div className={`level-info-container ${showClass ? "fade-up" : ""}`}>
        <h2>Nivel {level}</h2>
        <div>Dificultad</div>
        <div className="difficulty-container">
          <Easy
            className={`difficulty ${selectedDiff === 1 ? "selected" : ""}`}
            onClick={() => handleSelectDiff(1)}
          />
          <Medium
            className={`difficulty ${selectedDiff === 2 ? "selected" : ""}`}
            onClick={() => handleSelectDiff(2)}
          />
          <Hard
            className={`difficulty ${selectedDiff === 3 ? "selected" : ""}`}
            onClick={() => handleSelectDiff(3)}
          />
        </div>
        <div className="buttons-container">
          <Iniciar
            text="Continuar"
            to="/level"
            className="btn-continue"
          />
          <Iniciar
            text="Cancelar"
            onClick={onCancel}
            className="btn-cancel"
          />
        </div>
      </div>
    </div>
  );
};
