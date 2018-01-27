//In theory, ya para acceder a cualquier UDI haces
// udis[fecha] y ya te sale el valor del UDI
var udis;
var fileAv;
var invsi = [];
function createTwoTables(tran){

  var tUsuarios = "CREATE TABLE IF NOT EXISTS usuarios("+
                    "idUsuario integer primary key autoincrement,"+
                    "usuario text," +
                    "password text)";

  var tPassword = "CREATE TABLE IF NOT EXISTS inversiones("+
                   "idInversion integer primary key autoincrement,"+
                   "idUsuario integer,"+
                   "inflacion real,"+
                   "monto real,"+
                   "tipo text,"+
                   "tasa real,"+
                   "prov text,"+
                   "fecha text)";

  tran.executeSql(tUsuarios, [], function(tx, result){}, function(error){

      alert("No se pudieron crear los archivos necesarios.");

  });

  tran.executeSql(tPassword, [], function(tx, result){}, function(error){

    alert("No se pudieron crear los archivos necesarios.");

  });

}

function udisxd(){

  console.log(udis);

}

//Stuff de la inflacion --------------------------------------------------------
function inflacion(f1){

	var hoy = neuDate(f1);
  var year = neuDate(f1);

  year.setFullYear(year.getFullYear()-1);

  u1 = parseFloat(udis[converDate(hoy)]);
  u2 = parseFloat(udis[converDate(year)]);

  return (u1/u2)-1;

}

function lessMonth(f1, nMeses){

	var date = neuDate(f1);
  date.setMonth(date.getMonth()-nMeses-1);

  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

}

function converDate(date){

  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

}
function neuDate(f1){
  //Date object using date string from banxico
  //---------------
  var x = f1.split("/");
  return new Date(parseInt(x[2]), parseInt(x[1])-1, parseInt(x[0]));

}
//Termina stuff de la inflacion -----------------------------------------------
function insertUser(usuario, password){

  db.transaction(function(transac){

    var sql = "INSERT INTO usuarios(idUsuario, password) VALUES (?, ?)";

    transac.executeSql(sql, [usuario, password], function(tx, res){

      alert("Usuario creado con éxito");

    }, function(error){

      alert("Ha habido un error al crear el usuario");

    });

  });

}
//new ---------------------------------
function insertInv(usuario, tipo, monto){
  var fecha = new Date();
  fecha = converDate(fecha);
  db.transaction(function(transac){

    var sql = "INSERT INTO inversiones(idUsuario, monto, tipo, fecha, prov, tasa) VALUES (?, ?, ?, ?, ?, ?)";

    transac.executeSql(sql, [usuario, monto, tipo, fecha, "true", 0.007], function(tx, res){

      alert("Se invirtió con éxito");

    }, function(error){

      alert("Ha habido un error al invertir, lol: " + error.message);

    });

  });

}

function invest(){
  var mon = document.getElementById('Imonto').value;
  var tipo = document.getElementById('Itipo').value;
  insertInv("1", tipo, mon);
}

function updateInv(invId, tasa){

  db.transaction(function(transac){

    var sql = "UPDATE inversiones SET tasa = "+tasa+", prov = 'false' WHERE idInversion = "+invId+"";

    transac.executeSql(sql, [], function(tx, res){

      alert("Se actualizó con éxito");

    }, function(error){

      alert("Ha habido un error al invertir, lol: " + error.message);

    });

  });

}
//---------------------------
//new --------------------------------------------
function getInv(usuario){
  /*var fecha = new Date();
  fecha = converDate(fecha);*/

  db.transaction(function(transac){

    var sql = "SELECT idUsuario, idInversion, monto, fecha, prov, tipo, tasa FROM inversiones ";

    transac.executeSql(sql, [], function(tx, res){
      var invs = [];
      var length = res.rows.length;

      //res.rows.item(i).field;
      for(var i = 0; i<length; i++){

        var monto = res.rows.item(i).monto;
        var fecha = res.rows.item(i).fecha;
        var idInversion = res.rows.item(i).idInversion;
        var prov = res.rows.item(i).prov;
        var tipo = res.rows.item(i).tipo;
        var tasa = res.rows.item(i).tasa;
        var use = res.rows.item(i).idUsuario;
        invs.push({id: idInversion, monto:monto, fecha:fecha, prov:prov, tipo:tipo, tasa:tasa, idu:use});
        invsi.push({id: idInversion, monto:monto, fecha:fecha, prov:prov, tipo:tipo, tasa:tasa, idu:use});
      }

      outputInvs(invs);

    }, function(error){

      alert("Ha habido un error al invertir, lol");

    });

  });

}

function outputInvs(inv){
  var cont = document.getElementById("contInvs");
  for(var i = 0; i<inv.length; i++){

    var row = document.createElement("tr");
    var rId = document.createElement("td");
    rId.innerHTML = inv[i]["id"];
    var rMonto = document.createElement("td");
    rMonto.innerHTML = inv[i]["monto"];
    var rFecha = document.createElement("td");
    rFecha.innerHTML = inv[i]["fecha"];
    var button = document.createElement("button");
    button.innerHTML = "Proyectar";
    button.onclick = Iactualizar.bind(this, inv[i]);
    row.appendChild(rId);
    row.appendChild(rMonto);
    row.appendChild(rFecha);
    row.appendChild(button);
    cont.appendChild(row);
  }

}

//----------------------------------------------------------
//Tasa de interes cetes --------------------------------------------------------

function getCetes(){

  var ajax = new XMLHttpRequest();
  var url = "http://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarSeries";
  var params = "idCuadro=CF107&sector=22&version=3&locale=es&formatoHTML.x=72&formatoHTML.y=13&anoInicial=2017&anoFinal=2018&tipoInformacion=&formatoHorizontal=false&metadatosWeb=true&series=SF43936&series=SF43939&series=SF43942&series=SF43945";

  ajax.open("POST", url, true);
  ajax.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
  ajax.setRequestHeader("Accept-Encoding", "gzip, deflate");
  ajax.setRequestHeader("Accept-Language", "es-ES,es;q=0.9");
  ajax.setRequestHeader("Cache-control", "no-cache");
  ajax.setRequestHeader("Connection", "keep-alive");
  ajax.setRequestHeader("Content-Length", "'" + params.length + "'");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.setRequestHeader("Host", "www.banxico.org.mx");
  ajax.setRequestHeader("Origin", "http://www.banxico.org.mx");
  ajax.setRequestHeader("Pragma", "no-cache");
  ajax.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      updateCetes(this.responseText);

    }

    if(this.status == 500)
      console.log("shiiiit");

  };
  ajax.send(params);



}
//new--------------------
function updateCetes(html){

  for(var i = 0; i<invsi.length; i++){

    var fecha = invsi[i]["fecha"];
    var tipo = invsi[i]["tipo"];
    var monto= invsi[i]["monto"];
    var id = invsi[i]["id"];

    var vals = parseCetes(fecha, tipo, html);

    if(vals != false){
      var tasa;
      switch(tipo){

        case "mensual":
          tasa = vals[0];
          break;
        case "trimestral":
          tasa = vals[1];
          break;
        case "semestral":
          tasa = vals[2];
          break;
        case "anual":
          tasa = vals[3];
          break;

      }

    }

  }

}
function parseCetes(fechaInv, tipoInv, html){

  var doc = document.createElement("html");
  doc.innerHTML = html;
  //console.log(html);

  var trs = doc.getElementsByTagName("tr");
  var a =  getTasa(fechaInv, tipoInv, trs);
  return a;

}
//----------------------
//New------
function getTasa(fechaInv, tipoInv, trs){

  var f1 = neuDate(fechaInv);
  var days = 8;

  if(tipoInv == "anual"){

    days = 31;

  }

  for(var i = 0; i<days; i++){

    f1.setDate(f1.getDate()+1);
    //console.log("fecha " + f1);
    for(var j = trs.length-1; j>=0; j--){
      //console.log("In trs loop");
      var first = trs[j].childNodes[0];

      if(first.className == "fecha"){

        var objective = neuDate(first.innerHTML);

        if(f1.getTime() == objective.getTime()){
          var d28 = trs[j].childNodes[1].innerHTML;
          var d92 = trs[j].childNodes[2].innerHTML;
          var d168 = trs[j].childNodes[3].innerHTML;
          var d395 = trs[j].childNodes[4].innerHTML;

          if(d395 == "N/E" && tipoInv == "anual")
            continue;

          return [d28, d92, d168, d395];

        }

      }

    }

  }

  return false;

}
/*function getTasa(fechaInv, trs){
  //console.log("In getTasa");
  var f1 = neuDate(fechaInv);
  var f2 = neuDate(fechaInv);
  var hoy = new Date();
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  //console.log("trs length: " + trs.length);
  console.log(trs[trs.length-1].childNodes[0].innerHTML);
  for(var i = trs.length-1; i>=0; i--){
    //console.log("In main loop");
    var first = trs[i].childNodes[0];

    //console.log("fecha: " + first);
    //console.log(trs[i]);
    if(first.className == "fecha"){

      var fecha = trs[i].childNodes[0].innerHTML;
      fechaObj = neuDate(fecha);
      var lulz = trs[i].childNodes[4].innerHTML;
      for(var x = 7; x<36; x++){

        f2.setDate(f2.getDate()+x);
        console.log("Fecha inicial: "+f1);
        console.log("Fecha inicial: "+f2);
        console.log("Fecha inicial: "+fechaObj);
        if(f1.getTime()<=fechaObj.getTime() && f2.getTime()>=fechaObj.getTime() && lulz != "N/E"){

          var d28 = parseFloat(trs[i].childNodes[1].innerHTML);
          var d92 = parseFloat(trs[i].childNodes[2].innerHTML);
          var d168 = parseFloat(trs[i].childNodes[3].innerHTML);
          var d395 = parseFloat(trs[i].childNodes[4].innerHTML);
          /*var d28 = trs[i].childNodes[1].innerHTML;
          var d92 = trs[i].childNodes[2].innerHTML;
          var d168 = trs[i].childNodes[3].innerHTML;
          var d395 = trs[i].childNodes[4].innerHTML;
          //console.log("lulz: "+d28+", " + d92 + ", " + d168 + ", " + d395);
          return [d28, d92, d168, d395];

        }

      }

    }

  }

}*/
//---------

//Termina tasa de interés cetes-------------------------------------------------
function id(id){
  return document.getElementById(id);
}

//Get and store all udis available
function getLulz(){
  //http://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP150
  var url = "http://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarSeries";
  var ajax = new XMLHttpRequest();

  var params = "idCuadro=CP150&sector=8&version=3&locale=es&";
  params += "formatoHTML.x=32&formatoHTML.y=12&anoInicial=1995&";
  params += "anoFinal=2018&tipoInformacion=&formatoHorizontal=false&";
  params += "metadatosWeb=true&series=SP68257";

  var response;

  ajax.open("POST", url, true);

  ajax.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
  ajax.setRequestHeader("Accept-Encoding", "gzip, deflate");
  ajax.setRequestHeader("Accept-Language", "es-ES,es;q=0.9");
  ajax.setRequestHeader("Cache-control", "no-cache");
  ajax.setRequestHeader("Connection", "keep-alive");
  ajax.setRequestHeader("Content-Length", "'" + params.length + "'");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.setRequestHeader("Host", "www.banxico.org.mx");
  ajax.setRequestHeader("Origin", "http://www.banxico.org.mx");
  ajax.setRequestHeader("Pragma", "no-cache");
  ajax.setRequestHeader("Referer", "http://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP150");

  ajax.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      response = parseData(this.responseText);
      console.log("In ready");
      writeToFile(JSON.stringify(response));

    }

  }


  ajax.send(params);

}
//Useless function xdxdxdxd
function setHeaders(ajax, params){

  ajax.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
  ajax.setRequestHeader("Accept-Encoding", "gzip, deflate");
  ajax.setRequestHeader("Accept-Language", "es-ES,es;q=0.9");
  ajax.setRequestHeader("Cache-control", "no-cache");
  ajax.setRequestHeader("Connection", "keep-alive");
  ajax.setRequestHeader("Content-Length", "'" + params.length + "'");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.setRequestHeader("Host", "www.banxico.org.mx");
  ajax.setRequestHeader("Origin", "http://www.banxico.org.mx");
  ajax.setRequestHeader("Pragma", "no-cache");
  ajax.setRequestHeader("Referer", "http://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP150");

}
//Parse the banxico's html into an object containing all udis
function parseData(htm){

  var ele = document.createElement("html");
  var trs, obj = {}, firstChild, lastChild;
  ele.innerHTML = htm;

  trs = ele.getElementsByTagName("tr");

  for(var i = 0; i<trs.length; i++){

    if(trs[i].childNodes[0].className == "fecha"){

      firstChild = trs[i].childNodes[0].innerHTML;
      lastChild = trs[i].childNodes[1].innerHTML;

      obj[firstChild] = lastChild;

    }

  }
  return obj;

}
//writes to banxico.json
function writeToFile(str){

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){

    fs.root.getFile("banxico.json", {create:true, exclusive:false}, function(fileEntry){

      writeFile(fileEntry, str);

    }, null);


  }, null);


}
//Reads banxico.json
function readFile(){

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){


    fs.root.getFile("banxico.json", {create:true, exclusive:false}, function(fileEntry){

      readJSON(fileEntry);

    }, null);

  }, null);

}
//This is found inside readFile function
function readJSON(fileEntry){

  fileEntry.file(function(file){

    var reader = new FileReader();

    reader.onloadend = function(){

      //console.log("Succesful file read: " + this.result);

      udis = JSON.parse(this.result);

    };

    reader.readAsText(file);

  });

}
//Writes to a file it is found inside WriteToFile function
function writeFile(fileEntry, dataObj){

  fileEntry.createWriter(function(fileWriter){

    fileWriter.onerror = function(e){

      console.log("Failed" + e.toString());

    }

    dataObj = new Blob([dataObj], {type: 'text/plain'});

    fileWriter.write(dataObj);

  });

}
//Wraps insertUser function
function wInsertUser(){

  var name = id("name").value;
  var password = id("password").value;
  insertUser(name, password);

}
