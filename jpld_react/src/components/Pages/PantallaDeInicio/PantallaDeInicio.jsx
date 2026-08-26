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




import PropTypes from "prop-types";
import React, { useState } from "react";
import { Iniciar } from "../../Buttons/Iniciar/Iniciar.jsx";
import { Salir } from "../../Buttons/Salir/Salir.jsx";
import { Gear } from "../../Buttons/Gear/Gear.jsx";
import { InGameConfig } from "../../Screens/InGameConfig/InGameConfig.jsx";
import "./style.css";

// Import images from assets
import IMG from "../../../assets/IMG_0841_1.png";
import img from "../../../assets/IMG_0841_2.png";
import IMG1 from "../../../assets/IMG_0846_1.png";

export const PantallaDeInicio = () => {

  const [showConfig, setShowConfig] = useState(false);

  const handleGearClick = () => setShowConfig(prev => !prev);

  return (
    <div className="pantalla-de-inicio">
      <div className="overlap-group">


        <img className="IMG" alt="Img" src={IMG} />
        <img className="img" alt="Img" src={img} />
        
        <div className="iniciar-with-img">
          <img className="IMG-2" alt="Img" src={IMG1} />
          <Iniciar className="iniciar-instance" text="Iniciar" to="/selector_jugadores"/>
          <Iniciar className="salir-instance" text="Salir" to="/"/>
        </div>
  
      </div>
    </div>
  );
};