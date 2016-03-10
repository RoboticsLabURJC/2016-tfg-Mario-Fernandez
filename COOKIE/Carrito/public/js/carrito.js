var user;
console.log(document.cookie);
  

// Funciones que me permiten tratar la cookie 
function setCookie(name,compra){
      document.cookie = name + "=" + JSON.stringify(compra);
}

      
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    //guardamos la cookie en un array
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        //le quitamos el primer espacio que siempre lleva la cookie
        while (c.charAt(0)==' '){
          c = c.substring(1); 
        }
        //nos quedamos con el producto(valor) de cada uno
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    // si no hay cookie devolvemos null
    return null;
}

/// Buscamos usuario para darle el contenido      
function checkCookie(){
      user = document.getElementById("name_user").value;
      var products = getCookie(user);
      console.log("-->>> Buscamos contenido de "+user+"= "+JSON.parse(products));
      if (products != null){
        Show_Car(products);
      }     
}

function Show_Car(content){
    var products = JSON.parse(content);
    var i;
    console.log(products);
    var carrito = products.carrito;
    console.log(carrito);
    var out = "<table>";
    for(i = 0; i < carrito.length; i++) {
        out += "<tr><td>" + 
        user +":     " +
        "</td><td>" +
        carrito[i].compra.nombre +
        "</td><td>" +
        carrito[i].compra.cantidad +
        "</td></tr>";
    }
    out += "</table>";
    console.log(out);
    document.getElementById("elementos").innerHTML = out;
}


//esta funcion se va a encargar de sumar +1 el producto seleccionado
function Othermore(carrito, articulo) {
    var newarticule= true;
    for(i = 0; i < carrito.length; i++) {
        if (carrito[i].compra.nombre == articulo.nombre){
          carrito[i].compra.cantidad++;
          newarticule = false;
        }
    }
    if (newarticule){
      carrito.push({compra:articulo});
      products = {carrito:carrito};
      console.log("-->>> Se añadio el nuevo elemento: "+JSON.stringify(products));
    }
}

function Añadir(id){
    var elemento = document.getElementById(id);
    console.log(elemento);
    console.log(elemento.name);
    var articulo = {nombre:elemento.name,cantidad:'1'};
    console.log(articulo);
    var content = getCookie(user);
    if (content == null){
      console.log("-->>> Buscamos contenido de "+user+"= "+JSON.parse(content));
      var obj = {compra:articulo};
      var list =[obj];
      var car = {carrito:list};
      console.log("-->>> Añadimos primer producto: "+ articulo.nombre);
      setCookie(user,car);
      console.log(obj);
    }else{
      products = JSON.parse(content);
      console.log(products);
      var carrito = products.carrito;
      Othermore(carrito, articulo);  
      setCookie(user,products);
    }
  
}



      
    