var mesAct = new Date().getMonth();
var anAct = new Date().getFullYear();

//function de placido
function loadTab(tabname, element){
  var i;
  var content;
  var links;
  content = document.getElementsByClassName("fullpage");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  links = document.getElementsByClassName("tabs");
  for (i = 0; i < links.length; i++) {
    links[i].style.backgroundColor = "rgb(254, 246, 91)";
    links[i].style.fontWeight = "normal";
  }
  document.getElementById(tabname).style.display = "block";
  document.getElementById(element).style.backgroundColor = "rgb(255, 204, 0)";
  document.getElementById(element).style.fontWeight = "bold";
}

// var ctx = document.getElementById("lineChart").getContext('2d');
// var myChart = new Chart(ctx, {
//  type: 'line',
//  data: {
//    labels: [meses(mesAct), meses(mesAct + 1), meses(mesAct + 2), meses(mesAct + 3), meses(mesAct + 4)],
//    xAxisID: 'Tiempo',
//    yAxisID: 'Dinero',
//    datasets: [{
//      label: 'Valor Nominal',
//      data: [0, 0, 0, 0, 0],
//      backgroundColor: 'rgba(54, 162, 235, .4)',
//      borderColor: 'rgba(54, 162, 235, 1)',
//      pointBackgroundColor: 'rgba(51, 51, 255, 1)',
//      pointBorderColor: 'rgba(51, 51, 255, 1)',
//      borderWidth: 1,
//      lineTension: 0.4 //pa' que se vean las curvas
//    },
//    {
//      label: 'Valor Real',
//      data: [0, 0, 0, 0, 0],
//      backgroundColor: 'rgba(79, 238, 73, .4)',
//      borderColor: 'rgba(79, 238, 73, 1)',
//      pointBackgroundColor: 'rgba(26, 210, 20, 1)',
//      pointBorderColor: 'rgba(26, 210, 20, 1)',
//      borderWidth: 1,
//      lineTension: 0.4
//    },
//    {
//      label: 'Sin Inversión',
//      data: [0, 0, 0, 0, 0],
//      backgroundColor: 'rgba(222, 13, 13, .4)',
//      borderColor: 'rgba(222, 13, 13, 1)',
//      pointBackgroundColor: 'rgba(179, 55, 55, 1)',
//      pointBorderColor: 'rgba(179, 55, 55, 1)',
//      borderWidth: 1,
//      lineTension: 0.4
//    }
//  ]
// },
// options: {
//  title: {
//    display: true,
//    text: 'Predicción del valor de tu argent',
//    fontSize: 18
//  },
//  animation: {
//    duration: 1000, // En milisegundos
//  },
//  showLines: true, //si está en false, se ven los puros puntos
//  scales: {
//    yAxes: [{
//      ticks: {
//        reverse: false, //por si es necesario que el eje Y esté arriba
//        beginAtZero: true,
//        callback: function(value, index, values) {
//          return '$' + value.toFixed(0);
//        }
//      },
//      scaleLabel: {
//        display: true,
//        labelString: 'MXN'
//      }
//    }],
//    xAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Años'
//      }
//    }]
//  },
//  layout: {
//    padding: {
//      left: 5,
//      right: 0,
//      top: 5,
//      bottom: 0
//    }
//  }
// }
// });






/* var input = document.getElementById("inv"); //Se actualiza usando enter
input.addEventListener("keyup", function(e) {
   e.preventDefault();
   if (e.keyCode === 13) {
       document.getElementById("btnRevamp").click();
   }
})
*/

/*
function truncar(v) {
    if (v % 1 != 0) {
        return truncar(v | 0);
    } else {
        return v;
    }
}

function meses(n) {
    var y = anAct + truncar(n / 12);
    var x = n % 12;
    switch (x) {
        case 0:
            return ("Ene " + y);
            break;
        case 1:
            return ("Feb " + y);
            break;
        case 2:
            return ("Mar " + y);
            break;
        case 3:
            return ("Abr " + y);
            break;
        case 4:
            return ("May " + y);
            break;
        case 5:
            return ("Jun " + y);
            break;
        case 6:
            return ("Jul " + y);
            break;
        case 7:
            return ("Ago " + y);
            break;
        case 8:
            return ("Sep " + y);
            break;
        case 9:
            return ("Oct " + y);
            break;
        case 10:
            return ("Nov " + y);
            break;
        case 11:
            return ("Dic " + y);
            break;
    }
}



function tiempo() {
    var x = document.getElementById("periodo").value;
    switch (x) {
        case "rien":
            mes();
            break;
        case "un":
            trimestre();
            break;
        case "deux":
            semestre();
            break;
        case "trois":
            anio();
            break;
        case "quatre":
            cinco();
            break;
        case "cinq":
            diez();
            break;

    }
}

function mes() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 1) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();
}

function trimestre() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 3) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();
}

function semestre() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 6) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();

}

function anio() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 12) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();
}

function cinco() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 60) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();
}

function diez() {
    var L = myChart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 120) {
        myChart.data.labels[i] = meses(mesAct + m);
    }
    myChart.update();
}


function plusle() { //Suma
    var x = document.getElementById("inv");
    var n = parseInt(x.value);
    if (x.value < 100)
        x.value = 100
    else
        x.value = n + 100;
    actualizar(x);
}

function minum() { //Resta
    var x = document.getElementById("inv");
    if (x.value <= 100)
        x.value = 100
    else
        x.value -= 100;
    actualizar(x);
}

function revamp() { //Actualizar
    var x = document.getElementById("inv");

    actualizar(x);
}


function actualizar(p) {
    var q = parseInt(p.value);

    for (d = 0; d < 3; d++) {
        myChart.data.datasets[d].data[0] = q.toFixed(2);
    }

    var L = myChart.data.labels.length;
    var N = q; //Valor Nominal
    var R = q; //Valor Real
    var S = q; //Sin Inversión

    for (i = 1; i < L; i++) {
        N = N * 1.5; //Acá va la fórmula de valor nominal
        myChart.data.datasets[0].data[i] = N.toFixed(2);

        R = R * 1.2; //Acá va la fórmula de valor real
        myChart.data.datasets[1].data[i] = R.toFixed(2);

        S = S - 10; //Acá va la fórmula de cuando pierdes argent
        myChart.data.datasets[2].data[i] = S.toFixed(2);
    }
    myChart.update();
}
*/
