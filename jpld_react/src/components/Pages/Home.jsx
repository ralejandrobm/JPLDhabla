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



import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {logIn} from '../../context/DirectoryProvider';
function Home(){
    return(
        <div>
             <nav>
                <Link to="/Configuration">Configuration</Link> |{" "}
                <Link to="/InGame">InGame</Link> |{" "}
                <Link to="/LevelOverlay">LevelOverlay</Link> |{" "}
                <Link to="/LevelSelector">LevelSelector</Link> |{" "}
                <Link to="/Selector_Jugadores">Selector_Jugadores</Link> |{" "}
                <Link to="/">Home</Link>
            </nav>
           
            <button onClick={logIn}>LogIn</button>
        </div>
    );
}

export default Home;