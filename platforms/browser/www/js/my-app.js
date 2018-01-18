//Inicialisacion de la aplicacion
var myApp = new Framework7();

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
  
})
