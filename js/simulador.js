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
    console.log("Marca: " + marca +", Modelo: " + modelo);
    return productos.find((prod)=>(prod.marca === marca && prod.modelo === modelo));
}


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
            mensaje = mensaje + "Marca: " + prod.marca + " " + typeof prod.marca + "\nModelo: " + prod.modelo + "\nPrecio: " + prod.precio + "\nStock: " + prod.stock + "\n\n";
        })
    }
    return mensaje;
}

let opcion, marca, modelo, precio, stock;
let salir = false;
/* do{
    let menu = "Elija el número de la opción deseada:\n"+
                "1 - Crear producto\n"+
                "2 - Eliminar Producto\n"+
                "3 - Consultar productos\n"+
                "4 - Modificar precio\n"+
                "5 - Modificar stock\n"+
                "6 - Salir";
    
    
    opcion = prompt(menu);
    switch(opcion){
        case "1":
            marca = pedirDato("Ingrese la marca del producto");
            modelo = pedirDato("Ingrese el modelo del producto");
            precio = pedirNumeroPositivoMayorACero("Ingrese el precio del producto");
            stock = pedirNumeroPositivoMayorIgualACero("Ingrese el stock del producto");
            alert(agregarProducto(marca, modelo, precio, stock));
            break;
        case "2":
            if(hayProductos()){
                marca = pedirDato("Ingrese la marca del producto");
                modelo = pedirDato("Ingrese el modelo del producto");
                alert(eliminarProducto(marca, modelo));
            }else{
                alert("No hay productos ingresados");
            }
            break;
        case "3":
            alert(listarProductos());
            break;
        case "4":
            if(hayProductos()){
                marca = pedirDato("Ingrese la marca del producto");
                modelo = pedirDato("Ingrese el modelo del producto");
                precio = pedirNumeroPositivoMayorACero("Ingrese el precio del producto");
                alert(modificarPrecio(marca, modelo, precio));
            }else{
                alert("No hay productos ingresados");
            }
            break;
        case "5":
            if(hayProductos()){
                marca = pedirDato("Ingrese la marca del producto");
                modelo = pedirDato("Ingrese el modelo del producto");
                stock = pedirNumero("Ingrese el stock del producto.\nPara restar ingrese un número negativo.");
                alert(modificarStock(marca, modelo, stock));
            }else{
                alert("No hay productos ingresados");
            }
            break;
        case "6":
            alert("Saliendo, muchas gracias");
            salir = true;
            break;
        default:
            alert("No existe la opción solicitada");
            break;
    }
    
}while(! salir);
 */
function agregarEntrada(divProd, idProd, texto, leyenda){
    let div1 = document.createElement("div");
    div1.innerHTML = `<div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">${texto}</span>
                        </div>
                        <input id="${idProd}" type="text" class="form-control" placeholder="${leyenda}" aria-label="Username" aria-describedby="basic-addon1">
                    </div>`;
    divProd.append(div1);
}

function crearDivAgregarProducto(divCR){
    agregarEntrada(divCR, "marcaProducto", "Marca:", "Ingrese la marca");
    agregarEntrada(divCR, "modeloProducto","Modelo:", "Ingrese el modelo");
    agregarEntrada(divCR, "precioProducto","Precio:", "Debe ser mayor a cero");
    agregarEntrada(divCR, "stockProducto", "Stock:", "Ingrese un valor positivo o cero");
}

function agregarProductosHTML(){
    let div = document.getElementById("divContRes");
    if(div){
        div.remove();
    }
    
    let resultados = document.getElementById("resultados");
    let divContenidoResultados = document.createElement("div");
    divContenidoResultados.setAttribute("id", "divContRes");
    console.log("Ejecutando");
    crearDivAgregarProducto(divContenidoResultados);
    resultados.append(divContenidoResultados);

}


let botonAgregar = document.getElementById("agregar");
botonAgregar.addEventListener("click", agregarProductosHTML);
