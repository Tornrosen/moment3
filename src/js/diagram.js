"use strict";

let diagramData =[];
let courses =[];
let programmes=[];

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
        displayCourses(diagramData);
        displayProgrammes(diagramData);
    } 
    catch (error) {
        console.error(error);
    }
}

/**
 * funktion som filtrerar, sorterar data, kortar ner array och skriver ut data för kurser
 * @param diagramData
 */
function displayCourses() {
    const courses= diagramData.filter(courses=>courses.type=="Kurs");
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topCourses = courses.slice(0,6);
    const barDiagram = document.getElementById('bar').getContext('2d');
new Chart(barDiagram, {
    type: 'bar',
    data: {
      labels: topCourses.map(course => course.name),
      datasets: [{
        label: 'Antal sökande',
        data: topCourses.map(course => course.applicantsTotal),
        borderWidth: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
/**
 * funktion som filtrerar, sorterar data, kortar ner array och skriver ut data för program
 * @param diagramData
 */
    function displayProgrammes() {
        const programmes= diagramData.filter(programmes=>programmes.type=="Program");
    programmes.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let topProgrammes = programmes.slice(0,5);
    const pieDiagram = document.getElementById('pie');

  new Chart(pieDiagram, {
    type:'pie',
    data: {
        labels: topProgrammes.map(programme => programme.name),
        datasets: [{
          label: 'Antal sökande',
          data: topProgrammes.map(programme => programme.applicantsTotal),
          borderWidth: 1
        }]  }});
}


  

  