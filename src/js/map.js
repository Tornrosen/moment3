"use strict";


(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
  key: "AIzaSyAa59LvSdJNTjoYCyqP1q-fHVaj_LksexM",
  v: "weekly",
  loading: "async",
  language: "sv",
  region: "SE",
});

let lat = 59.9208594;
let long = 16.606327999999962;
let city = "Sala";
let map;
let marker;

/**funktion från google maps som hämtar in karta 
 * 
 * @function initMap
 * @param void
 * @return void
 * 
*/

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 10,
    mapId: "DEMO_MAP_ID",
  });
  marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: lat, lng: long },
    title: city,
  });
}

initMap();

let searchBtnEl = document.getElementById("searchBtn");

searchBtnEl.addEventListener("click", getPosition);

/**läser in värdet från ett inputfält och söker i API med hjälp av detta värde,
 * väljer ut det första svaret och kör sedan funktionen updateMarker för att flytta markören
 * 
 * function getPosition
 * @param void
 * @return void
 */

async function getPosition() {
  let searchPhrase = document.querySelector("#searchingMap").value;

  let url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchPhrase}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fel vid anslutning...");
    }
    let places = await response.json();
    let place = places.slice(0, 1);
    updateMarker(place);
  } catch (error) {
    console.error(error);
  }

}

/**flyttar runt markören på kartan
 * 
 * function updateMarker
 * @param {array} place 
 * @return void
 */

async function updateMarker(place) {

  lat = parseFloat(place[0].lat);
  long = parseFloat(place[0].lon);
  city = place[0].name;

  marker.position = { lat: lat, lng: long };
  marker.title = city;

  map.setCenter({ lat: lat, lng: long });
}