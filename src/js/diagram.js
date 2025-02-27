"use strict";

let diagramData =[];

window.onload = () => {
    loadDiagramData();
}
/**
 * funktion som hämtar data från miuns url och sedan kör funktionen displayData.
 */
async function loadDiagramData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        if (!response.ok){
            throw new error("Anslutning fungerar ej.")
        }
        diagramData=await response.json();
        displayData(diagramData);
    } 
    catch (error) {
        console.error(error);
    }
}
/**
 * funktion som kör funktioner för att filtrerar och sortera data samt skriver ut data till DOM
 * @param data från funktionen loadDiagramData.
 */
function displayData(diagramData) {
    console.log(diagramData);
}