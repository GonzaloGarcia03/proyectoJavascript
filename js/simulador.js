

class tipoProducto {
    constructor(marca, modelo, precio, stock){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
    }


    modificarStock(cantidad){
        if(cantidad == 0){
            // Se deja sin stock
            this.stock = 0;
            return this.stock;
        }else if( cantidad > 0){
            // Si es entero mayor que cero se suma la cantidad deseada
            this.stock = parseInt(this.stock) + parseInt(cantidad);
            return this.stock;
        }else{
            cantidad = parseInt(cantidad) * -1;
            // Se resta stock si se puede
            if(this.stock >= cantidad){
                this.stock = parseInt(this.stock) - parseInt(cantidad);
                return this.stock;
            }else{
                // Se retorna -2 si no hay la cantidad necesaria para restar stock
                console.log("no hay la cantidad necesaria para restar stock");
                return -2;
            }
        }
    }
    
   modificarPrecio(precio){
      if(parseFloat(precio)){
         if(parseFloat(precio) > 0){
               // El precio debe ser mayor a cero
               this.precio = precio;
               return this.precio;
         }else{
               // Retorna -1 si hay error
               return -1;
         }
      }else{
         // Retorna -1 si hay error
         return -1;
      }
   }

   setPrecio(precio){
      this.precio = precio;
   }

   setStock(stock){
      this.stock = stock;
   }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
////////////////////////////////  FUNCIONES PARA EL MANEJO   ////////////////////////////////////////
////////////////////////////////  DEL ARREGLO DE PRODUCTOS   ////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


// ARREGLO CON LOS PRODUCTOS DEL SISTEMA
var productos = obtenerProductos();


function obtenerProductos(){
   let productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
   let productos = [];
   if(productosLocalStorage){
      for(const prod of productosLocalStorage){
         //console.log("El prod almacenado es: \n");
         //console.log(prod);
         productos.push(new tipoProducto(prod.marca, prod.modelo, prod.precio, prod.stock));
      }
   }else{
      fetch('./productos.json')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            for (let p of data){
               productos.push(p);
            } 
         })
   }
   return productos;
}


function almacenarProductos(prods){
   console.log(JSON.stringify(prods));
   localStorage.setItem("productos", JSON.stringify(prods));
   

}


function hayProductos(){
    //console.log(productos);
    return (productos.length > 0 ) ? true : false;
}


function buscarIndiceProducto(marca, modelo){
    for(let i=0; i < productos.length; i++){
        if(productos[i].marca == marca && productos[i].modelo == modelo){
            return i;
        }
    }
    // Si no existe el producto retorna -1
    return -1;
}


function modificarStock(marca, modelo, cantidad){
    if(marca.length > 0 && modelo.length > 0){
        let indice = buscarIndiceProducto(marca, modelo);
        if(indice >= 0){
            // Si existe el producto, se modifica
            let stock = productos[indice].modificarStock(cantidad);
            if(stock >= 0){
               almacenarProductos(productos);
               return "Stock modificado correctamente";
            }else if(stock == -2){
                return "No hay suficiente stock";
            }else{
                console.log("El stock devuelto es: " + stock);
                return "Error modificando stock";
            }
        }else{
            return "No existe el producto de marca " + marca + " y modelo " + modelo;
        }
    }else{
        return "Marca o modelo vac??os";
    }
}


function modificarPrecio(marca, modelo, precio){
    if(marca.length > 0 && modelo.length > 0){
        if(precio <= 0){
            return "El precio debe ser mayor a cero";
        }else{
            let indice = buscarIndiceProducto(marca, modelo);
            if(indice >= 0){
                let ret = productos[indice].modificarPrecio(precio);
                if(ret <= 0){
                    return "Error al modificar precio";
                }else{
                     almacenarProductos(productos);
                     return "Precio modificado correctamente";
                }
            }else{
                return "No existe el producto de marca " + marca + " y modelo " + modelo;
            }
        }
    }else{
        return "Marca o modelo vac??os";
    }
}


function obtenerProducto(marca, modelo){
    // Si existe el producto, lo retorna. Si no, retorna undefined
    return productos.find(function(prod){
        return (prod.marca === marca && prod.modelo === modelo);
    });
}


function existeProducto(marca, modelo){
    //console.log("Marca: " + marca +", Modelo: " + modelo);
    return productos.find((prod)=>(prod.marca === marca && prod.modelo === modelo));
}


function eliminarProducto(marca, modelo){
    let indice = buscarIndiceProducto(marca, modelo);
    if(indice >= 0){
        productos.splice(indice,1);
        almacenarProductos(productos);
        return "Producto eliminado correctamente";
    }else{
        return "No existe el producto de marca " + marca + " y modelo " + modelo;
    }
}


function listarProductos(){
    let mensaje = "";
    if(!hayProductos()){
        mensaje = "No hay productos ingresados";
    }else{
        
        productos.forEach((prod)=>{
            mensaje = mensaje + "Marca: " + prod.marca + " " + "\nModelo: " + prod.modelo + "\nPrecio: " + prod.precio + "\nStock: " + prod.stock + "\n\n";
        })
    }
    return mensaje;
}

////////////////////////  TERMINAN LAS FUNCIONES PARA EL MANEJO DEL ARREGLO  ////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
////////////////////////////////  FUNCIONES PARA EL MANEJO   ////////////////////////////////////////
////////////////////////////////           DEL DOM           ////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


function alertOK(mensaje){
   swal({
      title: "OK!",
      text: mensaje,
      icon: "success",
      button: "OK",
    });
}


function mostrarToast(mensaje){
   Toastify({
      text: mensaje,
      duration: 2000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
}


function limpiarPanel(){
   // Limpio el panel
   document.getElementById("divContRes") && document.getElementById("divContRes").remove();
   document.getElementById("pMensaje") && document.getElementById("pMensaje").remove();
}


function crearPanel(){
   let divContenidoResultados = document.createElement("div");
   divContenidoResultados.setAttribute("id", "divContRes")
   document.getElementById("resultados").append(divContenidoResultados);
   return divContenidoResultados;
}

function verificarEntradaPrecio(entradaPrecio){
    // Se verifica que el valor del precio ingresado sea un n??mero positivo o cero. En ese caso se retorna true
   if(entradaPrecio.value){
       if(isNaN(entradaPrecio.value) || entradaPrecio.value <= 0){
           entradaPrecio.classList.add("valueError");
           return false;
       }else{
           entradaPrecio.classList.remove("valueError");
           return true;
       }
   }else{
      return false;
   }
}


function verificarEntradaStock(entradaStock){
    // Se verifica que el valor del stock ingresado sea un n??mero positivo o cero. En ese caso se retorna true
   if(entradaStock.value){
       if(isNaN(entradaStock.value) || entradaStock.value < 0){
           entradaStock.classList.add("valueError");
           return false;
       }else{
           entradaStock.classList.remove("valueError");
           return true;
       }
   }else{
       return false;
   }
}


function agregarEntrada(divProd, idProd, texto, leyenda){
   let div1 = document.createElement("div");
   div1.innerHTML = `<div class="input-group mb-3 mt-3">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="basic-addon1">${texto}</span>
                       </div>
                       <input id="${idProd}" type="text" class="form-control" placeholder="${leyenda}" aria-label="Username" aria-describedby="basic-addon1">
                   </div>`;
   divProd.append(div1);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
////////////////////////////////  MODIFICACION DE PRODUCTOS  ////////////////////////////////////////
////////////////////////////////                             ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function rellenarCamposModificar(e){
   // Se toma el texto seleccionado del dropdown de productos para rellenar los campos
   // marca, modelo, precio y stock con los valores del producto seleccionado
   const [ma, mo] = e.target.innerText.split("|");
   let {marca, modelo, precio, stock} = obtenerProducto(ma, mo);

   // La marca y el modelo no se puede modificar y quedan deshabilitados
   document.getElementById("marcaModifProducto").value = marca;
   document.getElementById("modeloModifProducto").value = modelo;
   
   let precioModifProducto = document.getElementById("precioModifProducto");
   precioModifProducto.disabled = false;
   precioModifProducto.value = precio;

   let stockModifProducto = document.getElementById("stockModifProducto");
   stockModifProducto.disabled = false;
   stockModifProducto.value = stock;
}


function modificarProducto(){
   // Si el precio y stock ingresados son correctos, se setean precio y stock del producto seleccionado
   let marca = document.getElementById("marcaModifProducto").value;
   let modelo = document.getElementById("modeloModifProducto").value;


   let producto = obtenerProducto(marca, modelo);
   producto.setPrecio(document.getElementById("precioModifProducto").value);
   producto.setStock(document.getElementById("stockModifProducto").value);
   
   // Guardo en el local storage los cambios realizados
   almacenarProductos(productos);
   alertOK("Producto modificado correctamente");
}


function verificarEntradasModifProd(e){
   // Si los valores de precio y stock son correctos se habilita el bot??n para modificar el producto
   let [okModificarPrecioProducto, okModificarStockProducto] = [false, false];
   okModificarPrecioProducto = verificarEntradaPrecio(document.getElementById("precioModifProducto"));
   okModificarStockProducto = verificarEntradaStock(document.getElementById("stockModifProducto"));

   (! okModificarPrecioProducto && e.type == "keyup" && e.target.id == "precioModifProducto") && mostrarToast("El precio debe ser mayor a cero");
   (! okModificarStockProducto && e.type == "keyup" && e.target.id == "stockModifProducto") && mostrarToast("El stock debe ser cero o mayor");
   
   let botonModifProd = document.getElementById("btnModificarProducto");
   (okModificarPrecioProducto && okModificarStockProducto) ? botonModifProd.disabled = false : botonModifProd.disabled = true;
}


function crearDivModificarProductos(divCR){
   let div1 = document.createElement("div");
   div1.innerHTML = `<div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                           Seleccione el producto
                        </button>
                        <ul id="uldropdownModificar" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        </ul>
                     </div>`;

   divCR.append(div1);

   // Agrego las entradas para modificar el producto
   agregarEntrada(divCR, "marcaModifProducto", "Marca:", "Ingrese la marca");
   agregarEntrada(divCR, "modeloModifProducto", "Modelo:", "Ingrese el modelo");
   agregarEntrada(divCR, "precioModifProducto", "Precio:", "Debe ser mayor a cero");
   agregarEntrada(divCR, "stockModifProducto", "Stock:", "Ingrese un valor positivo o cero");
   document.getElementById("marcaModifProducto").disabled = true;
   document.getElementById("modeloModifProducto").disabled = true;
   document.getElementById("precioModifProducto").disabled = true;
   document.getElementById("stockModifProducto").disabled = true;
   
   let botonModificar = document.createElement("button");
   botonModificar.classList.add("btn");
   botonModificar.classList.add("btn-primary");
   botonModificar.textContent = 'Modificar';
   botonModificar.disabled = true;
   botonModificar.setAttribute("id", "btnModificarProducto");
   botonModificar.addEventListener("click", modificarProducto);
   botonModificar.disabled = true;
   divCR.append(botonModificar);

   // Armado del dropdown para elegir los productos
   let drop = document.getElementById("uldropdownModificar");
   if(productos.length > 0){
      for(let prod of productos){
         let li = document.createElement("li");
         let a = document.createElement("a");
         a.innerText = `${prod.marca}|${prod.modelo}`;
         a.classList.add("dropdown-item");
         a.addEventListener("click", rellenarCamposModificar);
         li.append(a);
         drop.append(li);
      }
   }
}


function modificarProductosHTML(){
   limpiarPanel();
   let divContenidoResultados = crearPanel();
   crearDivModificarProductos(divContenidoResultados);

   let precioModifProducto = document.getElementById("precioModifProducto");
   precioModifProducto && precioModifProducto.addEventListener("keydown", verificarEntradasModifProd);
   precioModifProducto && precioModifProducto.addEventListener("focusout", verificarEntradasModifProd);
   precioModifProducto && precioModifProducto.addEventListener("keyup", verificarEntradasModifProd);

   let stockModifProducto = document.getElementById("stockModifProducto");
   stockModifProducto && stockModifProducto.addEventListener("keydown", verificarEntradasModifProd);
   stockModifProducto && stockModifProducto.addEventListener("focusout", verificarEntradasModifProd);
   stockModifProducto && stockModifProducto.addEventListener("keyup", verificarEntradasModifProd);
}

//////////////////////////    TERMINA MODIFICACION DE PRODUCTOS      /////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////                         /////////////////////////////////////////
///////////////////////////////////  AGREGAGO DE PRODUCTOS  /////////////////////////////////////////
///////////////////////////////////                         /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function agregarProducto(marca, modelo, precio, stock){
   if(marca == null || marca.length == 0 || modelo == null || modelo.length == 0){
       return "La marca y modelo no pueden ser vac??os";
   }else if(precio <= 0){
       return "El precio debe ser mayor a cero";
   }else{
       console.log("Existe? " + existeProducto(marca, modelo));
       if(! existeProducto(marca, modelo)){
           productos.push(new tipoProducto(String(marca), String(modelo), precio, stock));
           almacenarProductos(productos);
           return "Producto agregado correctamente"
       }else{
           return "El producto ya existe";
       }
   }
}


function verificarEntradasAgregar(e){
    // Verificaci??n de los valores de entrada

    // Se verifican los valores de las entradas marca y modelo
    // Si no existe un producto de esa marca y modelo se le quita
    // la marca roja de error. Si el resto de las entradas tambi??n es correcta
    // se habilita el bot??n para agregar el producto
    let okAgregarProductoPrecio = false;
    let okAgregarProductoStock = false;
    let okAgregarProductoMarcaModelo= false;
    
    let marca = document.getElementById("marcaAgregarProducto").value;
    let modelo = document.getElementById("modeloAgregarProducto").value;

    if(marca && modelo){
        console.log(existeProducto(marca, modelo));
        if(! existeProducto(marca, modelo)){
            // Si no existe el producto intento habilitar el boton y
            // No marco la entrada con error
            document.getElementById("marcaAgregarProducto").classList.remove("valueError");
            document.getElementById("modeloAgregarProducto").classList.remove("valueError");
            okAgregarProductoMarcaModelo = true;
        }else{
            // Si existe el producto deshabilito el boton y
            // marco la entrada con error
            document.getElementById("marcaAgregarProducto").classList.add("valueError");
            document.getElementById("modeloAgregarProducto").classList.add("valueError");
            okAgregarProductoMarcaModelo = false;
            (e.type == "keyup" && (e.target.id == "marcaAgregarProducto" || e.target.id == "modeloAgregarProducto")) && mostrarToast("Ya existe un producto con esa marca y modelo");
        }
    }else{
        okAgregarProductoMarcaModelo = false;
    }

    // Verificando la entrada precio
    // Si el precio es menor o igual a cero, se marca con error
    okAgregarProductoPrecio = verificarEntradaPrecio(document.getElementById("precioAgregarProducto"));


    (! okAgregarProductoPrecio && e.type == "keyup" && e.target.id == "precioAgregarProducto") && mostrarToast("El precio debe ser mayor a cero");
    
    
    // Verificando la entrada stock
    // Si la entrada stock es negativa, se marca con error
    okAgregarProductoStock = verificarEntradaStock(document.getElementById("stockAgregarProducto"));

    (! okAgregarProductoStock && e.type == "keyup"  && e.target.id == "stockAgregarProducto") && mostrarToast("El stock debe ser cero o mayor");

    // Si todas las entradas son correctas se habilita el bot??n
    let btnAddProd = document.getElementById("btnAgregarProducto");
    (okAgregarProductoMarcaModelo && okAgregarProductoPrecio && okAgregarProductoStock) ? btnAddProd.disabled = false : btnAddProd.disabled = true;
}


function agregarProductoEvento(){
    // Las entradas son correctas, se agrega el producto al sistema, se limpian las entradas para permitir el ingreso de 
    // otro producto y se deshabilita el bot??n de agregar producto
    let marcaEntrada = document.getElementById("marcaAgregarProducto");
    let modeloEntrada = document.getElementById("modeloAgregarProducto");
    let precioEntrada = document.getElementById("precioAgregarProducto");
    let stockEntrada = document.getElementById("stockAgregarProducto");
    let [marca, modelo, precio, stock] = [marcaEntrada.value, modeloEntrada.value, precioEntrada.value, stockEntrada.value];
    // AGREGAR SWEETALERT
    alertOK(agregarProducto(marca, modelo, precio, stock));
    document.getElementById("btnAgregarProducto").disabled = true;
    marcaEntrada.value = "";
    modeloEntrada.value = "";
    stockEntrada.value = "";
    precioEntrada.value = "";
}


function crearDivAgregarProducto(divCR){
   // Agrego las entradas al panel de resultados con los id correspondientes y el mensaje final de estado
   agregarEntrada(divCR, "marcaAgregarProducto", "Marca:", "Ingrese la marca");
   agregarEntrada(divCR, "modeloAgregarProducto","Modelo:", "Ingrese el modelo");
   agregarEntrada(divCR, "precioAgregarProducto","Precio:", "Debe ser mayor a cero");
   agregarEntrada(divCR, "stockAgregarProducto", "Stock:", "Ingrese un valor positivo o cero");
   
   let botonAgregar = document.createElement("button");
   botonAgregar.classList.add("btn");
   botonAgregar.classList.add("btn-primary");
   botonAgregar.textContent = 'Agregar';
   botonAgregar.disabled = true;
   botonAgregar.setAttribute("id", "btnAgregarProducto");

   divCR.append(botonAgregar);
}


function agregarProductosHTML(){
   limpiarPanel();
   // Contenido donde se muestran los contenidos de los resultados de clicks
   // en los botones principales

   let divContenidoResultados = crearPanel();
   
   // Se crean las entradas para agregar productos
   crearDivAgregarProducto(divContenidoResultados);

   // Agregado de eventListener a la entrada de precio
   let entradaPrecio = document.getElementById("precioAgregarProducto");
   entradaPrecio && entradaPrecio.addEventListener("keydown", verificarEntradasAgregar);
   entradaPrecio && entradaPrecio.addEventListener("focusout", verificarEntradasAgregar);
   entradaPrecio && entradaPrecio.addEventListener("keyup", verificarEntradasAgregar);

   // Agregado de eventListener a la entrada de Stock
   let entradaStock = document.getElementById("stockAgregarProducto");
   entradaPrecio && entradaStock.addEventListener("keydown", verificarEntradasAgregar);
   entradaPrecio && entradaStock.addEventListener("focusout", verificarEntradasAgregar);
   entradaPrecio && entradaStock.addEventListener("keyup", verificarEntradasAgregar);

   // Agregado de eventListener a la entrada de marca
   let entradaMarca = document.getElementById("marcaAgregarProducto");
   entradaPrecio && entradaMarca.addEventListener("keydown", verificarEntradasAgregar);
   entradaPrecio && entradaMarca.addEventListener("focusout", verificarEntradasAgregar);
   entradaPrecio && entradaMarca.addEventListener("keyup", verificarEntradasAgregar);

   // Agregado de eventListener a la entrada del modelo
   let entradaModelo = document.getElementById("modeloAgregarProducto");
   entradaPrecio && entradaModelo.addEventListener("focusout", verificarEntradasAgregar);
   entradaPrecio && entradaModelo.addEventListener("keyup", verificarEntradasAgregar);
   entradaPrecio && entradaModelo.addEventListener("keydown", verificarEntradasAgregar);

   // Agregado de eventListener al bot??n para agregar productos al sistema
   document.getElementById("btnAgregarProducto").addEventListener("click", agregarProductoEvento);
    
}

//////////////////////////    TERMINA AGREGADO DE PRODUCTOS      /////////////////////////////////



function listarProductosEvent(){
    limpiarPanel();

    let pMensaje = document.createElement("p");
    pMensaje.classList.add("lead")
    pMensaje.setAttribute("id", "pMensaje");
    document.getElementById("resultados").append(pMensaje);
    pMensaje.innerText = listarProductos();
}


// Bot??n Agregar Producto del men?? de opciones
document.getElementById("agregar").addEventListener("click", agregarProductosHTML);

// Bot??n Agregar Producto del men?? de opciones
document.getElementById("modificar").addEventListener("click", modificarProductosHTML);

// Bot??n Agregar Producto del men?? de opciones
document.getElementById("consultar").addEventListener("click", listarProductosEvent);



