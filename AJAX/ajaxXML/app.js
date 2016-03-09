var express = require('express'),
 	app 	= express(),
 	server  = require('http').createServer(app),
 	io		= require('socket.io').listen(server),
 	bodyParser = require('body-parser')
 	//lo utulizamos para peticiones POST a nuestro servidor.
	urlencodedParser = bodyParser.urlencoded({ extended: false }),
	//PAQUETES NECESARIOS PARA PODER REALIZAR EL PARSEO DEL XML
	xml2js = require('xml2js'),
	xmldoc = require('xmldoc');

server.listen(3000, function(){
  console.log('listening on *:3000');
});


function creatXML(resultado){
 	var _xmlServer = "<respuesta>";
 	_xmlServer += "<resultado>" + String(resultado) + "</resultado>";
 	_xmlServer += "</respuesta>";
 	return  new xmldoc.XmlDocument(_xmlServer);
}


//espero una peticion(req) get del cliente y le resppondo(res) documento html
app.get('/', function(req, res){
	res.sendfile(__dirname + '/ajax.html')

});


app.post("/",urlencodedParser,function(req,res){
	var parser = new xml2js.Parser();	
	for(item in req.body){
		var _xml = item;
		console.log(_xml);
	}
	console.log("ARCHIVO XML RECIBIDO");
	var xml = new xmldoc.XmlDocument(_xml);
	console.log(xml);


	var valores = [];
	parser.parseString(xml, function (err, result){
		//Saco los valores del XML
		var parametros = result['parametros'];
		console.log("PARAMETROS del XML");
		console.log(parametros);
		for(item in parametros){
			valores.push(parametros[item]);
		}
	     });
	
	console.log("Valores de los tags del XML");
	console.log(valores);
	console.log("Resultado de la operacion");
	var add = parseInt(valores[0]) + parseInt(valores[1]);
	console.log(add);

	console.log("Enviamos el resultado en formato XML")
	var xmlServer = creatXML(add);
	console.log(xmlServer);
	res.end(String(xmlServer));
   });
