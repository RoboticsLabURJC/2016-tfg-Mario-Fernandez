var express = require('express'),
 	app 	= express(),
 	server  = require('http').createServer(app),
 	io		= require('socket.io').listen(server);
 	var bodyParser = require('body-parser');
 	//lo utulizamos para peticiones POST a nuestro servidor.
	var urlencodedParser = bodyParser.urlencoded({ extended: false })
 	var nombres = ["Mario", "Juan", "Pepe", "Manolo", "Rosa", "Alejandro"];

server.listen(3000, function(){
  console.log('listening on *:3000');
});


//espero una peticion(req) get del cliente y le resppondo(res) documento html
app.get('/', function(req, res){
	res.sendfile(__dirname + '/ejercicio13.html')

});


app.post('/', urlencodedParser,function(req, res){
	console.log('request received');
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    name = req.body.login;
    if (nombres.indexOf(name) != -1){
        res.send("no");
    }
    else {res.send("si")}
    
});


