var express = require('express'),
 	app 	= express(),
 	server  = require('http').createServer(app),
 	io		= require('socket.io').listen(server);
 	var bodyParser = require('body-parser');
 	//lo utulizamos para peticiones POST a nuestro servidor.
	var urlencodedParser = bodyParser.urlencoded({ extended: false })
 	nicknames = [];

server.listen(3000, function(){
  console.log('listening on *:3000');
});


//espero una peticion(req) get del cliente y le resppondo(res) documento html
app.get('/', function(req, res){
	res.sendfile(__dirname + '/ajax.html')

});

//espero una peticion(req) POST del cliente y le resppondo(res) documento html
app.post('/',urlencodedParser,function(req,res){
	var info_user = {num1:req.body.num1,num2:req.body.num2};
	var num_1 = parseInt(info_user.num1);
	var num_2 = parseInt(info_user.num2);
	 console.log(info_user);
	 console.log(num_1);
	 console.log(num_2);
	var add = num_1+num_2;
	console.log(add);
	 //esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	res.send(JSON.stringify(add));
	//res.end(JSON.stringify(add));
});
