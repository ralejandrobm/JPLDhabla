/*
 * © 2025 [Hannah Carolina Fabian Valensia, Paola Ortega Bravo, Martín García Torres, Carlos Jimenez Zepeda, Santiago Arreola Munguía, Demián Velasco Gómez Llanos, Andrés González Gómez, Rodrigo López Gómez, Nahui Metztli Dado Delgadillo, Ana Mariem Pérez Chacón, Karla Avila Navarro, Ana María Guzman Solís]
 * Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 *
 * Contributors must be credited when using or modifying this file.
 * Commercial use or redistribution without permission is prohibited.
 *
 * Full license text: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 */

// src/hooks/useSyllableTimestamps.js
//
// Loads public/instructor-audio/syllable_timestamps_template.csv once and exposes
// a lookup by (level, difficulty, scene) -> { archivo_audio, syllables }.
// `syllables[i].start` is `null` when `inicio_segundos` hasn't been filled in yet.
import { useEffect, useState, useCallback } from "react";

const CSV_URL = "/instructor-audio/syllable_timestamps_template.csv";

let cachedData = null;
let cachedPromise = null;

const parseCsv = (text) => {
  const lines = text.trim().split("\n");
  const data = new Map();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const [nivel, sub, escena, archivo_audio, indice_silaba, , inicio_segundos] =
      line.split(",");
    const key = `${nivel}-${sub}-${escena}`;

    if (!data.has(key)) {
      data.set(key, { archivo_audio, syllables: [] });
    }

    const start = parseFloat(inicio_segundos);
    data.get(key).syllables.push({
      index: Number(indice_silaba),
      start: Number.isNaN(start) ? null : start,
    });
  }

  for (const entry of data.values()) {
    entry.syllables.sort((a, b) => a.index - b.index);
  }

  return data;
};

export const useSyllableTimestamps = () => {
  const [data, setData] = useState(cachedData);

  useEffect(() => {
    if (cachedData) return;
    if (!cachedPromise) {
      cachedPromise = fetch(CSV_URL)
        .then((res) => res.text())
        .then((text) => {
          cachedData = parseCsv(text);
          return cachedData;
        })
        .catch((err) => {
          console.error("Failed to load syllable timestamps CSV:", err);
          cachedData = new Map();
          return cachedData;
        });
    }
    cachedPromise.then(setData);
  }, []);

  const getPhraseData = useCallback(
    (level, difficulty, scene) => {
      if (!data) return null;
      return data.get(`${level}-${difficulty}-${scene}`) || null;
    },
    [data]
  );

  return { getPhraseData, isLoaded: data !== null };
};
