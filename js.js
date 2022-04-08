
function linkSeleccionado(rutas){
    
    quitarHover()
    const inicio = document.getElementById("inicio");
    const tierList = document.getElementById("tierList");
    const comps = document.getElementById("comps");
    const rasgos = document.getElementById("rasgos");
    const objetos = document.getElementById("objetos");
    const mejoresJugadores = document.getElementById("mejoresJugadores");
    const distribucion = document.getElementById("distribucion");
    const equipo = document.getElementById("equipo");

    const doc = document.getElementById("contenido")
    if (rutas == "inicio") {
        inicio.classList.add("selected")
        // doc.innerHTML = contenidoInicio;
    }
    if (rutas == "tierList") {
        tierList.classList.add("selected")

        // doc.innerHTML = contenidoTierList;
    }
    if (rutas == "comps") {
        comps.classList.add("selected")
    }
    if (rutas == "rasgos") {
        rasgos.classList.add("selected")
    }
    if (rutas == "objetos") {
        objetos.classList.add("selected")
    }
    if (rutas == "mejoresJugadores") {
        mejoresJugadores.classList.add("selected")
    }
    if (rutas == "distribucion") {
        distribucion.classList.add("selected")
    }
    if (rutas == "equipo") {
        equipo.classList.add("selected")
    }

}

function funcionesIniciales(){
    linkSeleccionado('inicio')


    mostrarHTMLnuevo()

}

function quitarHover(){
    const todos = document.querySelectorAll("#links a")

    const LinkActivo = buscarLinkActivo(todos);
    if(LinkActivo >= 0){
        todos[LinkActivo].classList.remove("selected");
    }
}

function buscarLinkActivo(lista){
    for (let index = 0; index < lista.length; index++) {
        if(lista[index].className.includes("selected")){
            return index;
        }
    }
    return -1;
}



function calcularSubtotal(num){//1
  
    const inpPrecio = document.getElementById("inpPrecio"+num);//inpPrecio3 
    const inpCantidad = document.getElementById("inpCantidad"+num);
    const subtotal = document.getElementById("subtotal"+num);

    if (inpPrecio.value && inpCantidad.value) {
        const multiplicar = inpPrecio.value * inpCantidad.value;
        subtotal.innerHTML = multiplicar;
    }else{
        subtotal.innerHTML = "no calculado";
    }
    
    calcularTotal()

}

function calcularTotal(){

    const subtotales = document.querySelectorAll("#tbody [data-identifier='subtotal']")
    const totalHTML = document.getElementById("total");
    let suma = 0;
    for (let index = 0; index < subtotales.length; index++) {
        let subtotal= parseInt(subtotales[index].innerText);

        subtotal = isNaN(subtotal) ? 0 : subtotal;
        suma = suma + subtotal;
    }

    totalHTML.innerHTML = suma;
    
}   

function añadircelda(){

    const tbody = document.querySelectorAll("#tbody tr");

    const body = document.getElementById("tbody");



    const nuevo = `
    <tr>
        <td>${tbody.length+1}</td>
        <td><input  type="text"></td>
        <td>
            <select>
                <option>UND</option>
                <option>M2</option>
                <option>DOCENA</option>
            </select>
        </td>
        <td><input id="inpPrecio${tbody.length+1}" onkeyup="calcularSubtotal(${tbody.length+1})" type="text" value="0"></td>
        <td><input id="inpCantidad${tbody.length+1}" onkeyup="calcularSubtotal(${tbody.length+1})" type="text" value="0"></td>
        <td id="subtotal${tbody.length+1}"></td>
    </tr>
    `

    body.innerHTML+= nuevo;


}

const contenidoInicio = `<div>contenido Inicio</div>`;
const contenidoTierList = `<div>contenido tierlist</div>`;



/*<td>Item</td>
<td>Nombre producto</td>
<td>Unidad</td>
<td>Precio(S/.)</td>
<td>Cantidad</td>
<td>Subtotal</td>*/

const arrayMostrar =
[
    {

        nombre: "Medias",
        unidadCode:"",
        precio: 24,
        cantidad: 10,
        
    },
    {

        nombre: "Polos",
        unidadCode:"und002",
        precio: 40,
        cantidad: 5,
        
    },
    {

        nombre: "Vestidos",
        unidadCode:"und001",
        precio: 60,
        cantidad: 3,
        
    },
    {

        nombre: "Zapatos",
        unidadCode:"und002",
        precio: 150,
        cantidad: 3,
        
    },
]

const listaUnidades = [
    {
        codigo: "und001",
        nombre: "unidad"
    },   
     {
        codigo: "und002",
        nombre: "docena"
    },
    {
        codigo: "und003",
        nombre: "metro cuadrado"
    },
    {
        codigo: "und004",
        nombre: "metro cubico"
    }
]
function mostrarHTMLnuevo(){
    const tbody = document.getElementById("tbody");
    let html = "";

    for (let index = 0; index < arrayMostrar.length; index++) {
       html+=
       `<tr>
            <td>${index+1}</td>
            <td>${arrayMostrar[index].nombre}</td>
            <td>
                <select>
                <option value="" hidden>Seleccione</option>
                `
        for (let o = 0; o < listaUnidades.length; o++) {
            if (listaUnidades[o].codigo == arrayMostrar[index].unidadCode) {
                
                 html+=`<option selected value="${listaUnidades[o].codigo}">${listaUnidades[o].nombre}</option>`
            }else{
                html+=`<option  value="${listaUnidades[o].codigo}">${listaUnidades[o].nombre}</option>`
            }
        }    
        html+=`    
                   
                </select>
            </td>
            <td><input id="inpPrecio${index+1}" onkeyup="calcularSubtotal(${index+1})" type="text" value="${arrayMostrar[index].precio}"></td>
            <td><input id="inpCantidad${index+1}" onkeyup="calcularSubtotal(${index+1})" type="text" value="${arrayMostrar[index].cantidad}"></td>
            <td data-identifier="subtotal" id="subtotal${index+1}">${arrayMostrar[index].precio*arrayMostrar[index].cantidad}</td>
        </tr>`

        
    }
    tbody.innerHTML += html;

    calcularTotal()
    
}