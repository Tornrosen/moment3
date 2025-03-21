"use strict";

let diagramData = [];
let courses = [];
let programmes = [];

window.onload = () => {
    loadDiagramData();
}
/**
 * funktion som hämtar data från miuns url och sedan kör funktionerna filterCourses och filterProgrammes.
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
 * funktion som filtrerar och sorterar data, samt kortar ner arrayen och kör funktionen displayCourses
 * @param diagramData
 */
function filterCourses() {
    const courses = diagramData.filter(courses => courses.type == "Kurs");
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topCourses = courses.slice(0, 6);
    topCourses.sort((a, b) => a.applicantsTotal - b.applicantsTotal);
    displayCourses(topCourses);
}

/**funktion som skriver ut data till diagram
 * @param topCourses
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
 * funktion som filtrerar, sorterar data och kortar ner array för program samt kör funktionen displayProgrammes
 * @param diagramData
 */
function filterProgrammes() {
    const programmes = diagramData.filter(programmes => programmes.type == "Program");
    programmes.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topProgrammes = programmes.slice(0, 5);
    displayProgrammes(topProgrammes);
}

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




