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



import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectoryProvider, { useAppContext } from "./context/DirectoryProvider.jsx";

// Pages
import { PantallaDeInicio } from "./components/Pages/PantallaDeInicio/PantallaDeInicio.jsx";
import { SelectorJugadores } from "./components/Pages/Selector_Jugadores/Selector_Jugadores.jsx";
import { LevelSelector } from "./components/Pages/LevelSelector/LevelSelector.jsx";
import { Level } from "./components/Pages/Level/Level.jsx";

// Global overlays
import { Gear } from "./components/Buttons/Gear/Gear.jsx";
import { InGameConfig } from "./components/Screens/InGameConfig/InGameConfig.jsx";

function AppContent() {
  const { state } = useAppContext();
  const [showConfig, setShowConfig] = useState(false);

  // Update font scale
  useEffect(() => {
    const raw = state?.settings?.letterSize ?? 0.5;
    const scale = 0.75 + raw * 0.5; // map 0–1 → 0.75–1.25
    document.documentElement.style.setProperty("--font-scale", scale.toFixed(2));
  }, [state?.settings?.letterSize]);

  // Update CSS variable for brightness
  useEffect(() => {
    const raw = state?.settings?.brightness ?? 0.5;
    const scale = 0.5 + raw * 1.0; // map 0–1 → 0.5–1.5
    document.documentElement.style.setProperty("--color-brightness", scale.toFixed(2));
  }, [state?.settings?.brightness]);

  const brightnessScale = 0.5 + (state?.settings?.brightness ?? 0.5) * 1.0;

  return (
    <Router>
      {/* Main content with brightness filter */}
      <div
        style={{
          filter: `brightness(${brightnessScale})`,
          transition: "filter 0.2s ease",
          width: "100%",
          height: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<PantallaDeInicio />} />
          <Route path="/selector_jugadores" element={<SelectorJugadores />} />
          <Route path="/level_selector" element={<LevelSelector />} />
          <Route path="/level" element={<Level />} />
        </Routes>
      </div>

      {/* Global Gear button */}
      <Gear
        className="gear-instance"
        onClick={() => setShowConfig((prev) => !prev)}
      />

      {/* Global InGameConfig overlay */}
      <InGameConfig
        className={showConfig ? "open" : ""}
        onClose={() => setShowConfig(false)}
      />
    </Router>
  );
}

export default function App() {
  return (
    <DirectoryProvider>
      <AppContent />
    </DirectoryProvider>
  );
}
