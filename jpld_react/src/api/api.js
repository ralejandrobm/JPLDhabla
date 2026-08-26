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




import axios from 'axios';

// Use environment variable for the base URL (you can define this in your .env file)
const api = axios.create({
    baseURL: 'http://localhost:5000',  // Change this to match your server's base URL
    headers: {
        'Content-Type': 'application/json',
    }
});

// Response interceptor for handling errors like 401 or others
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response) {
            // Server responded with an error
            console.log("API Error Response:", err.response.data);
            console.log("API Error Status:", err.response.status);
            console.log("API Error Headers:", err.response.headers);
        } else if (err.request) {
            // No response from the server
            console.log("No response from server:", err.request);
        } else {
            // General error
            console.log("Error Message:", err.message);
        }

        if (err.response && err.response.status === 401) {
            console.log("Error 401 - Unauthorized access!");
            // Optionally handle redirect or logout here
        } else {
            console.log("API Error:", err.response?.data?.message || err.message);
        }
        return Promise.reject(err);
    }
);

export default api;