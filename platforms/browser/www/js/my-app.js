var Ictx;
var Imychart;
var cur_inv;

var ctx;
var myChart;
//=====================================================
function truncar(v) {
    if (v % 1 != 0) {
        return truncar(v | 0);
    } else {
        return v;
    }
}

function Itiempo() {
    var x = document.getElementById("Iperiodo").value;
    switch (x) {
        case "rien":
            Imes();
            break;
        case "un":
            Itrimestre();
            break;
        case "deux":
            Isemestre();
            break;
        case "trois":
            Ianio();
            break;
        case "quatre":
            Icinco();
            break;
        case "cinq":
            Idiez();
            break;

    }
}

function Imes() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 1) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();
}

function Itrimestre() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 3) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();
}

function Isemestre() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 6) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();

}

function Ianio() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 12) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();
}

function Icinco() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 60) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();
}

function Idiez() {
    var L = Imychart.data.labels.length;
    for (i = 0, m = 0; i < L; i++, m = m + 120) {
        Imychart.data.labels[i] = meses(mesAct + m);
    }
    Irevamp();
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
    var n = parseInt(x.value);
    if (x.value <= 100)
        x.value = 100
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

function Irevamp() { //Iactualizar
    //var x = document.getElementById("inv");
    //var n = parseInt(x.value);

    if(!cur_inv)
      histoInv();
    else
      Iactualizar(cur_inv, false);
}


function Iactualizar(p, n) {
    var q;
    if(n){

      q = p;
      cur_inv = false;
    }else{

      q = parseFloat(p.monto);
      cur_inv = p;

    }

    for (d = 0; d < 3; d++) {
        Imychart.data.datasets[d].data[0] = q.toFixed(2);
    }

    var L = Imychart.data.labels.length;
    var N = q; //Valor Nominal
    var n = N; //Valor nominal inicial
    var R = q; //Valor Real
    var r = R; //Valor real inicial
    var S = q; //Sin Inversión
    var s = S; //Sin inversión inicial
    var j = 1;
//=================Valores Temporales===============================
    var i = 0.0778; //acá va la tasa de interes
    var UDIS = [
      5.967077,
      5.584481
      //5.924896, 5.869048, 5.821673,5.811925
    ];
    var anUDIS;
    if(n){

      anUDIS = inflacion(converDate(new Date()));

    }else{

      anUDIS = inflacion(p.fecha);
      //console.log(anUDIS);

    }
    //var x = getUDIS(diAct,mesAct,anAct) / getInflacion(diAct,mesAct,anAct - j);
//=====================================================================

    var P = document.getElementById("Iperiodo").value;
    switch(P){
      case "rien": //mensual
          var x = anUDIS/12;
          for (; j < L; j++) {
              N = N*(1+i/(12/1)); // valor nominal
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*((1+i/(12/1)) / (x+1));//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/(1+x); //pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
      case "un": //tres meses
          var x = anUDIS/(12/3);
          for (; j < L; j++) {
              N = N*(1+i/(12/3)); // valor nominal
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*((1+i/(12/3)) / (x+1));//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/(1+x); //pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
      case "deux": //semestral
          var x = anUDIS/(12/6);
          for (; j < L; j++) {
              N = N*(1+i/(12/6)); // valor nominal
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*((1+i/(12/6)) / (x+1));//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/(1+x); //pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
      case "trois": //anual
          var x = anUDIS;
          for (; j < L; j++) {
              N = N*(1+i); // valor nominal
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*((1+i) / (x+1));//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/(1+x); //pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
      case "quatre": //cinco años
          var x = anUDIS;
          for (; j < L; j++) {
              N = N*Math.pow((1+i),5);
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*Math.pow(((1+i) / (x+1)),5);//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/Math.pow((1+x),5); //pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
      case "cinq": //diez años
          var x = anUDIS;
          for (; j < L; j++) {
              N = N*Math.pow((1+i),10);
              Imychart.data.datasets[0].data[j] = N.toFixed(2);
              R = R*Math.pow(((1+i) / (x+1)),10);//valor real
              Imychart.data.datasets[1].data[j] = R.toFixed(2);
              S = S/Math.pow((1+x),10); //Acá va la fórmula de cuando pierdes argent
              Imychart.data.datasets[2].data[j] = S.toFixed(2);
          }
          break;
    }


    Imychart.update();
}

function histoInv(){


    var totInv = 0;
    for(var i = 0; i<invsi.length; i++){

      totInv += parseFloat(invsi[i]["monto"]);

    }

    Iactualizar(totInv, true);


}

//=====================================================

//Inicialisacion de la aplicacion
var myApp = new Framework7();
//Declaracion de variables disque globales

//Declaracion del DOM7 (algo como jquery)
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

//Manejador del evento deviceready (necesario usar este evento)
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


//Declaracion de paginas y sus acciones al cargar
myApp.onPageInit('about', function (page) {

})

myApp.onPageInit('proyeccion', function (page) {

  ctx = document.getElementById("lineChart").getContext('2d');
  console.log(ctx);

  myChart = new Chart(ctx, {
   type: 'line',
   data: {
     labels: [meses(mesAct), meses(mesAct + 1), meses(mesAct + 2), meses(mesAct + 3), meses(mesAct + 4)],
     xAxisID: 'Tiempo',
     yAxisID: 'Dinero',
     datasets: [{
       label: 'Valor Nominal',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(54, 162, 235, .4)',
       borderColor: 'rgba(54, 162, 235, 1)',
       pointBackgroundColor: 'rgba(51, 51, 255, 1)',
       pointBorderColor: 'rgba(51, 51, 255, 1)',
       borderWidth: 1,
       lineTension: 0.4 //pa' que se vean las curvas
     },
     {
       label: 'Valor Real',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(79, 238, 73, .4)',
       borderColor: 'rgba(79, 238, 73, 1)',
       pointBackgroundColor: 'rgba(26, 210, 20, 1)',
       pointBorderColor: 'rgba(26, 210, 20, 1)',
       borderWidth: 1,
       lineTension: 0.4
     },
     {
       label: 'Sin Inversión',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(222, 13, 13, .4)',
       borderColor: 'rgba(222, 13, 13, 1)',
       pointBackgroundColor: 'rgba(179, 55, 55, 1)',
       pointBorderColor: 'rgba(179, 55, 55, 1)',
       borderWidth: 1,
       lineTension: 0.4
     }
   ]
  },
  options: {
   title: {
     display: true,
     text: 'Predicción del valor de tu argent',
     fontSize: 18
   },
   animation: {
     duration: 1000, // En milisegundos
   },
   showLines: true, //si está en false, se ven los puros puntos
   scales: {
     yAxes: [{
       ticks: {
         reverse: false, //por si es necesario que el eje Y esté arriba
         beginAtZero: true,
         callback: function(value, index, values) {
           return '$' + value.toFixed(0);
         }
       },
       scaleLabel: {
         display: true,
         labelString: 'MXN'
       }
     }],
     xAxes: [{
       scaleLabel: {
         display: true,
         labelString: 'Años'
       }
     }]
   },
   layout: {
     padding: {
       left: 5,
       right: 0,
       top: 5,
       bottom: 0
     }
   }
  }
  });
  console.log(myChart);
  revamp();

})

myApp.onPageInit('inversiones', function (page) {
  Ictx = document.getElementById("IlineChart").getContext('2d');
  console.log(Ictx);
  Imychart = new Chart(Ictx, {
   type: 'line',
   data: {
     labels: [meses(mesAct), meses(mesAct + 1), meses(mesAct + 2), meses(mesAct + 3), meses(mesAct + 4)],
     xAxisID: 'Tiempo',
     yAxisID: 'Dinero',
     datasets: [{
       label: 'Valor Nominal',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(54, 162, 235, .4)',
       borderColor: 'rgba(54, 162, 235, 1)',
       pointBackgroundColor: 'rgba(51, 51, 255, 1)',
       pointBorderColor: 'rgba(51, 51, 255, 1)',
       borderWidth: 1,
       lineTension: 0.4 //pa' que se vean las curvas
     },
     {
       label: 'Valor Real',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(79, 238, 73, .4)',
       borderColor: 'rgba(79, 238, 73, 1)',
       pointBackgroundColor: 'rgba(26, 210, 20, 1)',
       pointBorderColor: 'rgba(26, 210, 20, 1)',
       borderWidth: 1,
       lineTension: 0.4
     },
     {
       label: 'Sin Inversión',
       data: [0, 0, 0, 0, 0],
       backgroundColor: 'rgba(222, 13, 13, .4)',
       borderColor: 'rgba(222, 13, 13, 1)',
       pointBackgroundColor: 'rgba(179, 55, 55, 1)',
       pointBorderColor: 'rgba(179, 55, 55, 1)',
       borderWidth: 1,
       lineTension: 0.4
     }
   ]
  },
  options: {
   title: {
     display: true,
     text: 'Predicción del valor de tu argent',
     fontSize: 18
   },
   animation: {
     duration: 1000, // En milisegundos
   },
   showLines: true, //si está en false, se ven los puros puntos
   scales: {
     yAxes: [{
       ticks: {
         reverse: false, //por si es necesario que el eje Y esté arriba
         beginAtZero: true,
         callback: function(value, index, values) {
           return '$' + value.toFixed(0);
         }
       },
       scaleLabel: {
         display: true,
         labelString: 'MXN'
       }
     }],
     xAxes: [{
       scaleLabel: {
         display: true,
         labelString: 'Años'
       }
     }]
   },
   layout: {
     padding: {
       left: 5,
       right: 0,
       top: 5,
       bottom: 0
     }
   }
  }
  });
  console.log(Imychart);
  //Irevamp();
  getInv();
  getCetes();
});

myApp.onPageInit('educacion', function (page) {

})

myApp.onPageInit('registro', function (page) {

})

myApp.onPageInit('cetes', function (page) {

})
