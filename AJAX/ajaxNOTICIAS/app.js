var express = require('express'),
 	app 	= express(),
 	server  = require('http').createServer(app),
 	io		= require('socket.io').listen(server);
 	var bodyParser = require('body-parser');
 	//lo utulizamos para peticiones POST a nuestro servidor.
	var urlencodedParser = bodyParser.urlencoded({ extended: false })
 	var frases = ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                "Integer augue. Maecenas vel arcu.",
                "Nunc ipsum enim, pretium vel, blandit quis, rutrum sit amet, mauris.",
                "Proin at lectus mattis elit facilisis aliquam.",
                "Sed accumsan, neque in luctus egestas, ipsum enim hendrerit massa, at venenatis felis purus sed velit.",
                "Mauris sit amet magna ut leo ullamcorper semper.",
                "Vivamus venenatis consequat massa.",
                "Praesent erat justo, varius eu, porta at, sollicitudin in, nibh.",
                "Aenean ligula ante, vehicula sit amet, vestibulum eu, mattis non, mauris.",
                "Ut suscipit fermentum eros. Nullam ut mauris vel eros placerat cursus.",
                "Praesent non lectus. Nam condimentum nisi nec felis.",
                "Sed tincidunt ullamcorper pede.",
                "Curabitur facilisis, quam sed egestas tincidunt, justo nisl tempor odio, non auctor metus sapien sed risus.",
                "Fusce risus lectus, consequat at, molestie sit amet, auctor tristique, massa.",
                "Mauris vitae nisi. Aliquam tempus.",
                "Etiam eu neque sit amet nibh tempus lacinia.",
                "Nunc rutrum lorem eu erat. Proin ac felis. Fusce commodo leo."];

server.listen(3000, function(){
  console.log('listening on *:3000');
});


//espero una peticion(req) get del cliente y le resppondo(res) documento html
app.get('/', function(req, res){
	res.sendfile(__dirname + '/ejercicio12.html')

});


app.get('/:name', function(req, res){
	console.log('request received');
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    aleatorio = req.params.name;
    var numeroAleatorio = Math.floor((aleatorio * 10) + 1);
	frase = frases[numeroAleatorio];
	console.log(frase);
	//esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	res.send(frase);
	//res.end(JSON.stringify(add));
});


