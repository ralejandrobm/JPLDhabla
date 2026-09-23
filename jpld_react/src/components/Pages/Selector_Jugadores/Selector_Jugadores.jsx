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
import { Flechas } from "../../Frames/Flechas/Flechas.jsx";
import { Person } from "../../Frames/Person/Person.jsx";
import { PlusMinus } from "../../Buttons/PlusMinus/PlusMinus.jsx";
import { Gear } from "../../Buttons/Gear/Gear.jsx";
import { InGameConfig } from "../../Screens/InGameConfig/InGameConfig.jsx"; // <-- import InGameConfig
import "./style.css";

import { useAppContext, setPlayers } from "../../../context/DirectoryProvider.jsx";

// Import assets
import IMG from "../../../assets/IMG_0850_1.png";
import img from "../../../assets/IMG_0849_1.png";

export const SelectorJugadores = () => {
  const { state, dispatch } = useAppContext();
  const playerCount = state.players;

  const [showConfig, setShowConfig] = useState(false); // <-- state for InGameConfig

  const handleIncrease = () => {
    if (playerCount < 5) {
      setPlayers(dispatch, playerCount + 1);
    }
  };

  const handleDecrease = () => {
    if (playerCount > 1) {
      setPlayers(dispatch, playerCount - 1);
    }
  };

  const handleGearClick = () => {
    setShowConfig((prev) => !prev);
  };

  return (
    <div className="selector-jugadores">
  <div className="overlap-group">
    <img className="background-img left" alt="Background left" src={IMG} />
    <img className="background-img right" alt="Background right" src={img} />

    {/* Centered main controls */}
    <div className="controls-wrapper vertical center-controls">
      <div className="header">
        <div className="text-wrapper">Jugadores en la sala</div>
      </div>

      <div className="controls-wrapper horizontal main-row">
        <PlusMinus
          type="minus"
          size="large"
          className="minus-btn"
          onClick={handleDecrease}
        />
        <Person count={playerCount} className="person-instance" />
        <PlusMinus
          type="plus"
          size="large"
          className="plus-btn"
          onClick={handleIncrease}
        />
      </div>
    </div>

    {/* Bottom arrows */}
    <Flechas className="flechas-2 arrow-left" direction="left" to="/" />
    <Flechas className="flechas-2 arrow-right" direction="right" to="/level_selector" />

  </div>
</div>

  );
};

SelectorJugadores.propTypes = {};
