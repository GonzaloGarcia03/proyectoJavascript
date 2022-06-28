var productos = []

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
}


function hayProductos(){
    console.log(productos);
    if(productos.length > 0){
        return true;
    }else{
        return false;
    }
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
        return "Marca o modelo vacíos";
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
                    return "Precio modificado correctamente";
                }
            }else{
                return "No existe el producto de marca " + marca + " y modelo " + modelo;
            }
        }
    }else{
        return "Marca o modelo vacíos";
    }
}


function pedirNumero(mensaje){
    let num = prompt(mensaje);
    while(isNaN(num) || num == null || num.length == 0 || num % 1 != 0){
        console.log("El número ingresado es: " + num); 
        num = prompt("Debe ingresar un número sin decimales");
    }
    return num;
}


function pedirNumeroPositivoMayorACero(mensaje){
    let num = prompt(mensaje);
    while(isNaN(num) || num == null || num.length == 0 || num <= 0){
        console.log("El número ingresado es: " + num); 
        num = prompt("Debe ingresar un número positivo");
    }
    return num;
}


function pedirNumeroPositivoMayorIgualACero(mensaje){
    let num = prompt(mensaje);
    while(isNaN(num) || num == null || num.length == 0 || num < 0){
        console.log("El número ingresado es: " + num); 
        num = prompt("Debe ingresar un número mayor o igual a cero");
    }
    return num;
}


function pedirDato(mensaje){
    let dato = prompt(mensaje);
    while(dato == null || dato.length == 0){
        console.log("El dato ingresado es: " + dato); 
        dato = prompt("Debe ingresar algo no vacío");
    }
    return dato;
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

/////////////////////////////////////////////////////////////////////////////////


function agregarProducto(marca, modelo, precio, stock){
    if(marca == null || marca.length == 0 || modelo == null || modelo.length == 0){
        return "La marca y modelo no pueden ser vacíos";
    }else if(precio <= 0){
        return "El precio debe ser mayor a cero";
    }else{
        console.log("Existe? " + existeProducto(marca, modelo));
        if(! existeProducto(marca, modelo)){
            productos.push(new tipoProducto(String(marca), String(modelo), precio, stock));
            return "Producto agregado correctamente"
        }else{
            return "El producto ya existe";
        }
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


function crearDivAgregarProducto(divCR){
    // Agrego las entradas al panel de resultados con los id correspondientes y el mensaje
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
    
    let pMensaje = document.createElement("p");
    pMensaje.classList.add("lead")
    pMensaje.setAttribute("id", "pMensaje");


    divCR.append(botonAgregar);
    divCR.append(pMensaje);
}


function verificarEntradas(){
    // Verificación de los valores de entrada

    // Se verifican los valores de las entradas marca y modelo
    // Si no existe un producto de esa marca y modelo se le quita
    // la marca roja de error. Si el resto de las entradas también es correcta
    // se habilita el botón para agregar el producto
    let okAgregarProductoPrecio = false;
    let okAgregarProductoStock = false;
    let okAgregarProductoMarcaModelo= false;
    
    let entradaMarca = document.getElementById("marcaAgregarProducto");
    let entradaModelo = document.getElementById("modeloAgregarProducto");
    let marca = entradaMarca.value;
    let modelo = entradaModelo.value;

    document.getElementById("pMensaje").innerText = "";
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
            // marco la entrada sin error
            document.getElementById("marcaAgregarProducto").classList.add("valueError");
            document.getElementById("modeloAgregarProducto").classList.add("valueError");
            okAgregarProductoMarcaModelo = false;
            document.getElementById("pMensaje").innerText = "Ya existe un producto con esa marca y modelo";
        }
    }else{
        okAgregarProductoMarcaModelo = false;
    }

    // Verificando la entrada precio
    // Si el precio es menor o igual a cero, se marca con error
    let entradaPrecio = document.getElementById("precioAgregarProducto");
    let numPrecio = entradaPrecio.value;

    if(numPrecio){
        if(isNaN(numPrecio) || numPrecio <= 0){
            entradaPrecio.classList.add("valueError");
            okAgregarProductoPrecio = false;
        }else{
            entradaPrecio.classList.remove("valueError");
            okAgregarProductoPrecio = true;
        }
    }else{
        okAgregarProductoPrecio = false;
    }
    

    // Verificando la entrada stock
    // Si la entrada stock es negativa, se marca con error
    let entradaStock = document.getElementById("stockAgregarProducto");
    
    let numStock = entradaStock.value;

    if(numStock){
        if(isNaN(numStock) || numStock < 0){
            entradaStock.classList.add("valueError");
            okAgregarProductoStock = false;
        }else{
            entradaStock.classList.remove("valueError");
            okAgregarProductoStock = true;
        }
    }else{
        okAgregarProductoStock = false;
    }
    
    // Si todas las entradas son correctas se habilita el botón
    if(okAgregarProductoMarcaModelo && okAgregarProductoPrecio && okAgregarProductoStock){
        document.getElementById("btnAgregarProducto").disabled = false;
    }else{
        document.getElementById("btnAgregarProducto").disabled = true;
    }
}

function agregarProductoEvento(){
    let marcaEntrada = document.getElementById("marcaAgregarProducto");
    let modeloEntrada = document.getElementById("modeloAgregarProducto");
    let precioEntrada = document.getElementById("precioAgregarProducto");
    let stockEntrada = document.getElementById("stockAgregarProducto");
    let marca = marcaEntrada.value;
    let modelo = modeloEntrada.value;
    let precio = precioEntrada.value;
    let stock = stockEntrada.value;
    document.getElementById("pMensaje").innerText = agregarProducto(marca, modelo, precio, stock);
    document.getElementById("btnAgregarProducto").disabled = true;
    marcaEntrada.value = "";
    modeloEntrada.value = "";
    stockEntrada.value = "";
    precioEntrada.value = "";
}


function limpiarPanel(){
    let div = document.getElementById("divContRes");
    // Limpio el panel
    if(div){
        div.remove();
    }
    let p = document.getElementById("pMensaje");
    if(p){
        p.remove();
    }
}


function agregarProductosHTML(){
    limpiarPanel();
    
    // Contenido donde se muestran los contenidos de los resultados de clicks
    // en los botones principales
    let resultados = document.getElementById("resultados");
    let divContenidoResultados = document.createElement("div");
    divContenidoResultados.setAttribute("id", "divContRes");
    //console.log("Ejecutando");

    // Se crean las entradas para agregar productos
    crearDivAgregarProducto(divContenidoResultados);
    // Y se agregan al panel de resultados
    resultados.append(divContenidoResultados);

    // Agregado de eventListener a la entrada de precio
    let entradaPrecio = document.getElementById("precioAgregarProducto");
    if(entradaPrecio){
        entradaPrecio.addEventListener("keydown", verificarEntradas);
        entradaPrecio.addEventListener("focusout", verificarEntradas);
        entradaPrecio.addEventListener("keyup", verificarEntradas);
    }

    // Agregado de eventListener a la entrada de Stock
    let entradaStock = document.getElementById("stockAgregarProducto");
    if(entradaPrecio){
        entradaStock.addEventListener("keydown", verificarEntradas);
        entradaStock.addEventListener("focusout", verificarEntradas);
        entradaStock.addEventListener("keyup", verificarEntradas);
    }

    // Agregado de eventListener a la entrada de marca
    let entradaMarca = document.getElementById("marcaAgregarProducto");
    if(entradaPrecio){
        entradaMarca.addEventListener("keydown", verificarEntradas);
        entradaMarca.addEventListener("focusout", verificarEntradas);
        entradaMarca.addEventListener("keyup", verificarEntradas);
    }

    // Agregado de eventListener a la entrada del modelo
    let entradaModelo = document.getElementById("modeloAgregarProducto");
    if(entradaPrecio){
        entradaModelo.addEventListener("keydown", verificarEntradas);
        entradaModelo.addEventListener("focusout", verificarEntradas);
        entradaModelo.addEventListener("keyup", verificarEntradas);
    }

    // Agregado de eventListener al botón para agregar productos al sistema
    let btnAgregarProducto = document.getElementById("btnAgregarProducto");
    btnAgregarProducto.addEventListener("click", agregarProductoEvento);
}


function listarProductosEvent(){
    let resultados = document.getElementById("resultados");
    
    limpiarPanel();

    let pMensaje = document.createElement("p");
    pMensaje.classList.add("lead")
    pMensaje.setAttribute("id", "pMensaje");
    resultados.append(pMensaje);
    pMensaje.innerText = listarProductos();
}



// Botón Agregar Producto del menú de opciones
let botonAgregar = document.getElementById("agregar");
botonAgregar.addEventListener("click", agregarProductosHTML);


// Botón Agregar Producto del menú de opciones
let botonConsultar = document.getElementById("consultar");
botonConsultar.addEventListener("click", listarProductosEvent);



