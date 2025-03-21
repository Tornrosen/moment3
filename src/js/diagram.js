"use strict";

let diagramData = [];
let courses = [];
let programmes = [];

window.onload = () => {
    loadDiagramData();
}

/**
 * Hämtar data från miuns url och kör funktionerna filterCourses och filterProgrammes.
 * 
 * function loadDiagramData
 * @param void
 * @return void
 */
async function loadDiagramData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        if (!response.ok) {
            throw new error("Anslutning fungerar ej.")
        }
        diagramData = await response.json();
        filterCourses(diagramData);
        filterProgrammes(diagramData);
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * filtrerar och sorterar data, kortar ner arrayen och kör funktionen displayCourses
 * 
 * function filterCourses
 * @param {array} diagramData
 * @return void
 */
function filterCourses() {
    const courses = diagramData.filter(courses => courses.type == "Kurs");
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topCourses = courses.slice(0, 6);
    topCourses.sort((a, b) => a.applicantsTotal - b.applicantsTotal);
    displayCourses(topCourses);
}

/**skriver ut data till diagram
 * 
 * function displayCourses
 * @param {array} data
 * @return void
 */
function displayCourses(data) {const barDiagram = document.getElementById('bar').getContext('2d');
Chart.defaults.color ='#000000';
new Chart(barDiagram, {
    type: 'bar',
    data: {
        labels: data.map(course => course.name),
        datasets: [{
            label: 'Antal sökande',
            data: data.map(course => course.applicantsTotal),
            borderWidth: 2,
            backgroundColor:'#000000',
            borderColor: '#FFFFFF',
            font: {
                size: 8,
            }
            
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            
            y: {
                beginAtZero: true
            }
        }

           , layout: {
                padding: 1
                
            }
        }
    }
);}
/**
 * filtrerar, sorterar data och kortar ner array för program samt kör funktionen displayProgrammes
 * 
 * function filterProgrammes
 * @param {array} diagramData
 * @return void
 */
function filterProgrammes() {
    const programmes = diagramData.filter(programmes => programmes.type == "Program");
    programmes.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topProgrammes = programmes.slice(0, 5);
    displayProgrammes(topProgrammes);
}

/**
 * Visar program i ett cirkeldiagram
 * 
 * function displayProgrammes
 * @param {array} data 
 * @return void
 */

function displayProgrammes(data) {
    const pieDiagram = document.getElementById('pie');
    new Chart(pieDiagram, {
        type: 'pie',
        data: {
            labels: data.map(programme => programme.name),
            datasets: [{
                label: 'Antal sökande',
                data: data.map(programme => programme.applicantsTotal),
                borderWidth: 2,
                backgroundColor: ['#000000', '#4B164C', '#EE82EE', '#DD88CF', '#7D1C4A'],
                borderColor: '#FFFFFF',
            }]
        }
    });
}




