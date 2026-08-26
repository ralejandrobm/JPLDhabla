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

// src/Screens/LevelOverlay/LevelOverlay.jsx
import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import { IconButton } from "../../Buttons/IconButton/IconButton.jsx";
import { ReactComponent as Microphone } from "../../../assets/microphone.svg";
import { ReactComponent as Next } from "../../../assets/next.svg";
import { ReactComponent as Repeat } from "../../../assets/repeat.svg";

import { useAppContext, setScene } from "../../../context/DirectoryProvider.jsx";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useClipboardCustom } from "../../../hooks/copyHook.jsx";
import { useSyllableTimestamps } from "../../../hooks/useSyllableTimestamps.js";
import { SpeechResultPopup } from "../PopUp/SpeechResultPopup.jsx";

// Audio files from public folder
const audioSets = {
  0: ["/sounds/monkey.mp3", "/sounds/lion.mp3", "/sounds/elephant.mp3"],
  1: ["/sounds/pencil.mp3", "/sounds/backpack.mp3", "/sounds/ball.mp3"],
  2: ["/sounds/apple.mp3", "/sounds/bread.mp3", "/sounds/fish.mp3"],
  3: ["/sounds/mom.mp3", "/sounds/bed.mp3", "/sounds/dad.mp3"],
  4: ["/sounds/hands.mp3", "/sounds/toothbrush.mp3", "/sounds/feet.mp3"],
  5: ["/sounds/airplane.mp3", "/sounds/bike.mp3", "/sounds/boat.mp3"],
  6: ["/sounds/ball_play.mp3", "/sounds/swing.mp3", "/sounds/slide.mp3"],
};

export const LevelOverlay = ({ text, onResult }) => {
  const { state, dispatch } = useAppContext();
  const { getPhraseData } = useSyllableTimestamps();
  const [activeSyllable, setActiveSyllable] = useState(null);
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, copy] = useClipboardCustom();
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [sessionTranscript, setSessionTranscript] = useState("");
  useEffect(() => {
    if (transcript) {
      console.log("speaking...", transcript);
    }
  }, [transcript]);
  const startListening = () => {
    setSessionTranscript("");
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
  };

const stopListening = () => {
  SpeechRecognition.stopListening();
  const spoken = transcript.trim();
  console.log("said...  ", spoken);
  setSessionTranscript(spoken);
  
  const normalize = (str) =>
    str
      .normalize("NFD")                     
      .replace(/[\u0300-\u036f]/g, "")      
      .replace(/[^\w\s]|_/g, "")           
      .replace(/\s+/g, "")                  
      .trim()                              
      .toLowerCase();  
      
  const expected = normalize(text);
  const said = normalize(spoken);
  console.log("expected phrase:", expected);
  console.log("normalized said:", said);

  const correct = said === expected;
  if (onResult) onResult(correct);
  if (correct) console.log("✅ CORRECTO");
  else console.log("❌ INCORRECTO");
};
  // --- 🔁 Repeat base sound  ---
  const handleRepeatClick = () => {
    const currentLevel = state.level;
    const src = audioSets[currentLevel]?.[state.scene];

    const audio = new Audio(src);
    audio.volume = state.settings.volume;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => console.log("Audio playing:", src))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  // --- 🗣️ Legacy fallback: one audio file per syllable ---
  const playLegacySyllables = async () => {
    const { level, difficulty, scene, settings } = state;
    const syllables = text.split("-").map((s) => s.trim()).filter(Boolean);

    for (let i = 0; i < syllables.length; i++) {
      const filename = `lvl${level}_sub${difficulty - 1}_w${scene}_s${i}.mp3`;
      const filepath = `/audios/${filename}`;
      const audio = new Audio(filepath);
      audio.volume = settings.volume ?? 0.5;

      console.log(`🔊 Playing syllable ${i + 1}/${syllables.length}: ${filepath}`);

      // Trigger animation
      setActiveSyllable(i);

      // Wait for audio to finish
      await new Promise((resolve, reject) => {
        audio.onended = () => {
          setActiveSyllable(null);
          resolve();
        };
        audio.onerror = (err) => {
          console.error(`❌ Error playing ${filepath}:`, err);
          setActiveSyllable(null);
          resolve(); // Skip if error
        };
        audio.play().catch(reject);
      });
    }
  };

  // --- 🗣️ Play the instructor's full-phrase audio, highlighting syllables ---
  // as their timestamp (from syllable_timestamps_template.csv) is reached.
  // Playback starts at the first known timestamp (skipping any silent lead-in
  // in the recording). Syllables without a filled-in timestamp are simply
  // never highlighted, but the rest of the audio still plays normally.
  const playInstructorAudio = (phraseData) =>
    new Promise((resolve) => {
      const { settings } = state;
      const { archivo_audio, syllables } = phraseData;
      const knownTimes = syllables.filter((s) => s.start !== null);
      const startAt = knownTimes.length > 0 ? knownTimes[0].start : 0;

      const audio = new Audio(encodeURI(`/instructor-audio/${archivo_audio}`));
      audio.volume = settings.volume ?? 0.5;

      const pickActiveSyllable = () => {
        if (knownTimes.length === 0) return null; // no timestamps yet: no animation
        let current = null;
        for (const s of knownTimes) {
          if (audio.currentTime >= s.start) current = s.index;
          else break;
        }
        return current;
      };

      const handleTimeUpdate = () => setActiveSyllable(pickActiveSyllable());

      const cleanup = () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        setActiveSyllable(null);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.onended = () => {
        cleanup();
        resolve();
      };
      audio.onerror = (err) => {
        console.error(`❌ Error playing instructor audio ${archivo_audio}:`, err);
        cleanup();
        resolve();
      };

      // Wait for duration/seekability before jumping to startAt, then play.
      audio.addEventListener(
        "loadedmetadata",
        () => {
          let seekTo = startAt;
          // Guard against a mistyped inicio_segundos landing past the end of
          // this specific mp3 — seeking there would clamp to the end and fire
          // "ended" immediately, killing both playback and the highlight.
          if (Number.isFinite(audio.duration) && seekTo >= audio.duration) {
            console.warn(
              `⚠️ Syllable timestamp ${seekTo}s is past the end of ${archivo_audio} ` +
                `(duration ${audio.duration.toFixed(2)}s). Revisa esa fila del CSV. Reproduciendo desde 0.`
            );
            seekTo = 0;
          }
          audio.currentTime = seekTo;
          setActiveSyllable(pickActiveSyllable()); // highlight immediately, don't wait for the first timeupdate tick
          audio.play().catch(() => {
            cleanup();
            resolve();
          });
        },
        { once: true }
      );
    });

  // --- 🔁 Repeat syllables with animation ---
  const handleRepeatSound = async () => {
    try {
      const { level, difficulty, scene } = state;
      const phraseData = getPhraseData(level, difficulty - 1, scene);

      if (phraseData) {
        await playInstructorAudio(phraseData);
      } else {
        await playLegacySyllables();
      }

      console.log("✅ Finished playing phrase.");
    } catch (error) {
      console.error("❌ Error in handleRepeatSound:", error);
    }
  };

  // --- ⏭️ Move to next sublevel ---
  const handleNextClick = async () => {
    const nextScene = state.scene < 2 ? state.scene + 1 : 0;

    try {
      await setScene(dispatch, nextScene);
      console.log(`Sublevel changed to: ${state.scene}`);
    } catch (error) {
      console.error("Failed to change sublevel:", error);
    }
  };

  // --- Render syllables separately for animation ---
  const syllables = text.split("-").map((s) => s.trim()).filter(Boolean);

  return (

    <div className="overlay-container">

      <p className="overlay-text">
        {syllables.map((syllable, i) => (
          <span
            key={i}
            className={`syllable ${activeSyllable === i ? "active" : ""}`}
          >
            {syllable}
            {i < syllables.length - 1 && "-"}
          </span>
        ))}
      </p>
      <div className="overlay-buttons">
        <IconButton
          icon={Microphone}
          onClick={() => {
            if (listening) {
              stopListening();
            } else {
              startListening();
            }
          }}
          className={`btn-overlay ${listening ? "listening" : ""}`}
        />
        <IconButton
          icon={Repeat}
          onClick={handleRepeatSound}
          className="btn-overlay"
        />
        <IconButton
          icon={Next}
          onClick={handleNextClick}
          className="btn-overlay"
        />

      </div>


    </div>
  );
};
