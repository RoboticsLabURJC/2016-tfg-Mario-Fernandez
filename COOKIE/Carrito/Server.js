var express=require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(express.static('public'));
app.use(cookieParser()); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', function(req, res){
  console.log("== Browser Connected ===");
  res.sendfile(__dirname + '/index.html');
});


app.get('/clear', function(req, res){
	res.clearCookie('undefined');
 	res.sendfile(__dirname + '/index.html');
});

  
app.post('/',urlencodedParser,function(req,res){
	var user = req.body.user;
	console.log("Purchase of: "+user+":");
	console.log(req.cookies);
	var carrito= JSON.parse(req.cookies[user]);
	var compra = carrito.carrito;
	for(var i=0;i < compra.length;i++){
		var item  = compra[i].compra;
		console.log(">> Article:"+item.nombre+";Unidades:"+item.cantidad);
	}
	res.clearCookie(user);
	console.log("Clear_cookie of: "+user);
	res.sendfile(__dirname + '/Response.html');
});
  

http.listen(3000, function(){
 	console.log('listening on *:3000');
});
