/* Proyecto Avanzado: Voy a comenzar con la carga de los productos de la carta*/

// SUPUESTO EN QUE SEA YO LA QUE CARGUE LAS MESAS


//Desafio 12 - Con JQuery
const contenedorMesas = $("#contenedor-Mesas");

const contenedorMesa = $("#mesa-Contenedor"); 


mostrarMesas (misMesas);

function mostrarMesas(array) {
  
  array.forEach(misMesas => {

    //Con jQuery
    $("#contenedor-Mesas").append(`<button id="boton${misMesas.id}" 
    type="button" 
    class="botonMesas"><img src="./assets/mesa-de-cafe.png" alt="mesa" width="70px" 
    height="70px"></button>
    </div>`);
   
    let boton = $(`boton${misMesas.id}`)

    boton.on(`click`, () => {
      console.log(`boton${misMesas.id}`)
    })
  })
}


//CASO EN QUE SEA YO LA QUE CARGUE TODOS LOS PRODUCTOS QUE EL CLIENTE de mi aplicacion
// VA A TENER EN LA PAGINA/ APLICACION
// En este supuesto hice un array de productos/platos/menu y los cargue en forma manual
// Luego muestro en la pagina, en el HTML, en forma de cards

let stockMenu = [];

//Con JQuery
const contenedorMenu = $("#contenedor-Menu");

//mostrarMenu(stockMenu);

$.getJSON("menu.json", function(data){
  console.log(data)
})

function mostrarMenu(array) {
  array.forEach(menu => {
    //Con JQuery
    $("#contenedor-Menu").append(`<div class="card" style="width: 18rem; margin: 3rem;">
        <img src=${menu.img} style="width: 100px; height:100px;">
        <div class="card-body">
          <h5 class="card-title">${menu.nombre}</h5>
          <p class="card-text">Precio: $${menu.precio}</p>
          <p class="card-text">Descripcion: ${menu.desc}</p>
          <p class="card-text">Pedido Especial del cliente</p>
          <p class="card-text">stock: ${menu.stock}</p>
          <a id= "botonAgregar${menu.id}" href="#" class="btn btn-primary">Agregar</a>
        </div>
      </div>
    </div>

  </div>`);

    let botonAgregar = $(`#botonAgregar${menu.id}`)

    botonAgregar.on(`click`, () => {
      agregarALaMesa(menu.id)
    })
  });
}

//La idea es despues agregar a la mesa que elija. Por ahora agrega al HTML

function agregarALaMesa(id) {
  let menuAgregar = stockMenu.find(elemento => elemento.id === id);
  
  //Con JQuery
  $("#mesa-Contenedor").append(`<div style="display:flex;width:50%; justify-content: space-between;"><p>id: ${menuAgregar.id}</p>
                    <p>${menuAgregar.nombre}</p>
                    <p>${menuAgregar.precio}</p></div>`)
  
}

//SUPUESTO EN QUE SEA EL CLIENTE EL QUE CARGUE LOS PRODUCTOS
// Es una buena opcion para no me llame cada vez que quiera agregar productos a la carta
// Cree una clase producto.

class producto {
  constructor(nombre, descripcion, precio, stock, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }
}

//Array donde se van a acumular los productos que cargue el cliente
let productos = [];

//Boton que me permite mostrar los productos cargados en forma dinamica desde js
let botonProductos = document.getElementById("botonProductos");

//Donde el usuario de mi aplicacion va a ver los productos que cargo con el formulario
let divProductos = document.getElementById("divProductos");

//Formulario donde el cliente que ocupa mi aplicacion va a cargar las caracteristicas de los productos
let formProductos = document.getElementById("formProductos");

//Para que aparezca un  mensaje pidiendo al usuario que no presione el boton nuevamente
//porque los productos ya estan cargados
let mensajeAmigable = document.getElementById("mensajeAmigable");

formProductos.addEventListener('submit', (e) => {
  e.preventDefault();
  let datForm = new FormData(e.target);
  let nuevoProd = new producto(datForm.get("nombre"), datForm.get("descripcion"), datForm.get("precio"), datForm.get("stock"), datForm.get("imagen"));
  productos.push(nuevoProd);
  localStorage.setItem('keyProductos', JSON.stringify(productos));
  formProductos.reset()
})

botonProductos.addEventListener('click', () => {
  let productosEnStorage = JSON.parse(localStorage.getItem('keyProductos'));
  if (divProductos.children.length == 0) {
    productosEnStorage.forEach((productosEnArray, indice) => {
      divProductos.innerHTML += `<div class="card"; id= "producto ${indice}"; style="width: 18rem; margin: 3rem;">
      <div class="card-body">
        <h5 class="card-title">${productosEnArray.nombre}</h5>
        <p class="card-text">Precio: $${productosEnArray.precio}</p>
        <p class="card-text">Descripcion: ${productosEnArray.descripcion}</p>
        <p class="card-text">Pedido Especial del cliente</p>
        <p class="card-text">Stock: ${productosEnArray.stock}</p>
        <a id= "boton${indice}" href="#" class="btn btn-primary">Agregar</a>
      </div>
  
  </div>`
    })
  } else {
    mensajeAmigable.innerHTML = "Por favor no haga click en el boton porque los productos ya estan cargados"
  }
  
})

//Desafio 13

$(function(){
  
  //Hacer click en boton con id button1 y que se oculte el parrafo con id primero
  $("#button1").click(function(){
  $("#primero").hide();
  });

  //Hacer click en boton con id button2 y que se oculte el parrafo con id primero
  $("#button2").click(function(){
    $("#primero").show();
  });

  //ANIMACIONES CONCATENADAS: El parrafo que tiene la clase segundo se anima teniendo un 
  //ancho de 200px, se oculta, hay una espera(delay) de unos milisegundos, y luego aparece 
  //animandose con el font-size de 22px, por ultimo vuelve al ancho del 100%
  $(".segundo").animate({"width":"200px"}).fadeOut(3000).delay(1000).animate({"font-size":"22px"}).fadeIn(5000).animate({"width": "100%"});

  //Cuando paso el mouse por el parrafo con la clase tercero el parrafo que tiene el id tercero 
  //se oculta
  $(".tercero").mouseenter(function(){
    $("#tercero").hide();
  });

  //Cuando paso el mouse por el parrafo con la clase cuarto el parrafo que tiene el id tercero 
  //se aparece
  $(".cuarto").mouseenter(function(){
    $("#tercero").show();
  });

  //Cuando paso el mouse por el parrafo con clase primero el parrafo con id cuarto desaparece
  //en forma gradual, tiene una pequeña transicion
  $(".primero").mouseenter(function(){
    $("#cuarto").fadeOut();
  });

  //Cuando paso el mouse por el parrafo con clase segundo el parrafo con id cuarto aparece
  //en forma gradual, tiene una pequeña transicion
  $(".segundo").mouseleave(function(){
    $("#cuarto").fadeIn();
  });

  //El h4 a traves de css lo oculte con display none y con el metodo show lo muestro:
  $("h4").show();
  
});

