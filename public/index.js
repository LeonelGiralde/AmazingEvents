async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
      .then(response => response.json())
      .then(json => datosApi = json)
  
    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual
    rutasPaginas()
  }
getData()
//AGREGUE LA FUNCION ASINCRONICA Y AHI DENTRO SE LLAMAN LOS EVENTOS QUE VAMOS A METER EN datosApi LA CUAL DE DECLARA DENTRO DE LA FUNCION
let eventos = []
var arrayBusqueda = []
var inputsearch = document.getElementById("buscador")
var search=""
var checkedCheckboxes= []
var ulNombreEventos= document.getElementById("eventos")
let formulario = document.getElementById("miFormulario")
let estadisticas = document.getElementById("misEstadisticas")

var buttonNavegacion = []

var botones = document.getElementsByClassName("navlink");
for(var i=0 ; i< botones.length; i++){
    const elemento = botones[i];
    buttonNavegacion.push(botones[i].innerText)
    elemento.addEventListener("click", function(e){
        imprimir(e.target.id);
        console.log(botones)
    })

}

function imprimir(id){
    var titulo = document.getElementById("titulo")

    switch (id) {

        case "proximos_eventos": 
        let eventosFuturos = eventos.filter(evento => evento.date > fechaBase) //YA NO ES NECESARIO EL FOR ASI QEU SE HACE UN FILTER DE EVENTOS Y FILTRAMOS EVENTOS PASADOS Y FUTUROS
        titulo.innerHTML="Eventos Futuros"
        arrayBusqueda= eventosFuturos
        formulario.style.display="none"
        estadisticas.style.display="none"
        inputsearch.value = "" // hacemos que el buscador de search se limpie con cada cambio de pagina
        ulNombreEventos.style.display = "flex" //le damos display flex al contenedor donde se van a imprimir las tarjeta en todos los casos donde hay tarjetas
        displayEvents(eventosFuturos)
        eventsCategories(eventosFuturos)
        break;

        case "eventos_pasados": 
        let eventosPasados = eventos.filter(evento => evento.date <fechaBase) //YA NO ES NECESARIO EL FOR ASI QEU SE HACE UN FILTER DE EVENTOS Y FILTRAMOS EVENTOS PASADOS Y FUTUROS
        titulo.innerHTML="Eventos Pasados"
        arrayBusqueda= eventosPasados
        formulario.style.display="none"
        estadisticas.style.display="none" 
        inputsearch.value = ""// hacemos que el buscador de search se limpie con cada cambio de pagina
        ulNombreEventos.style.display = "flex"//le damos display flex al contenedor donde se van a imprimir las tarjeta en todos los casos donde hay tarjetas
        displayEvents(eventosPasados)
        eventsCategories(eventosPasados)
        break;

        case "contacto":
        ulNombreEventos.style.display = "none"
        estadisticas.style.display="none"
        titulo.innerHTML="Contactanos"
        formulario.style.display = "flex"
        formulario.innerHTML= `
        <div class="datos" id="form">
       
            <div class="contact"> 
            <p>Nombre</p> <br> 
            <input type="text" name="name" placeholder="Nombre y apellido" autofocus="">
            </div>
        
            <div class="contact">
            <p>Email</p> <br> 
            <input type="text" name="name" placeholder="Email" autofocus="">
            </div>
        
            <div class="contact">
            <p>Mensaje</p> <br>
            <input type="text" name="name" placeholder="Mensaje" autofocus="">
            </div>
        </div>
            `
        break;

        case "estadistica":
        titulo.innerHTML="Estadisticas"
        ulNombreEventos.style.display = "none"
        formulario.style.display="none" // y none cuando se deben ocultar para mostrar algo mas
        estadisticas.style.display= "flex"
        estadisticas.innerHTML = `
        <table>
          <tr class="color">
            <th colspan="3">Estadísticas de Eventos</th>
          </tr>
          <tr class="titulo">
            <th>Evento con Mayor Porcentaje de Asistencia</th>
            <th>Evento con Menor Porcentaje de Asistencia</th>
            <th>Evento de Mayor Capacidad</th>
          </tr>
          <tr id="mayoresymenores">
          </tr>
        </table>  
        <table id="statsFuturos">
          <tr class="color">
            <th colspan="3">Estadisticas de Eventos Futuros por Categoría</th>
          </tr>
          <tr class="titulo">
            <th>Categorías</th>
            <th>Estimacion de Ingresos</th>
            <th>Asistencia Estimada</th>
          </tr>
        </table>  
        <table id="statsPasados">
          <tr class="color">
              <th colspan="3">Estadisticas de Eventos Pasados por Categoría</th>
          </tr>
          <tr class="titulo">
            <th>Categorías</th>
            <th>Ingresos</th>
            <th>Asistencia</th>
          </tr>
        </table>
        `
        initStats()
        break;
        
        default: 
        titulo.innerHTML="Eventos"
        arrayBusqueda= eventos
        formulario.style.display="none"
        estadisticas.style.display="none"
        inputsearch.value = ""// hacemos que el buscador de search se limpie con cada cambio de pagina
        ulNombreEventos.style.display = "flex"//le damos display flex al contenedor donde se van a imprimir las tarjeta en todos los casos donde hay tarjetas
        eventsCategories(eventos)
        displayEvents(eventos)
    }
}
 


function displayEvents(array){
    var html=""
    for(let i=0 ; i < array.length; i++){
        html+=`
<ul>
<div class="cont_card">
<li>
    <img src="${array[i].image}">
    <H2>${array[i].name}</H2>
    <p class="descripcion">${array[i].description}</p>
    <p class="precio">$${array[i].price}</p>
    <a href=./pages/detalle.html?id=${array[i].id}> <button>Ver mas</button> </a>
        </li>
        </div>
        </ul>
`
    }
    ulNombreEventos.innerHTML= html;
    
}

var time = location.search.split("?time=")
function rutasPaginas(){

switch (time[1]) {
  case "eventos_pasados":
   imprimir("eventos_pasados")
   break;
  case "proximos_eventos":
   imprimir("proximos_eventos")
   break;
 case "estadistica":
   imprimir("estadistica")
   break;
 case "contacto":
   imprimir("contacto")
   break;
 default:
   imprimir("inicio")

}} //ESTA FUNCION NO ESTABA, AGREGARLA, ES LA QUE HACE QUE CADA AGINA TENGA SU RUTA ESPECIFICA Y ASI VOLVER DE DETALLES A LA QUE QUIERAS



//funcionamiento flecha derecha 
var buttonDer = document.getElementById("butDer")

buttonDer.addEventListener("click", function(e){
    var page = document.getElementById("titulo").innerText
    if(buttonNavegacion.indexOf(page) <4 ){
        nextPage(buttonNavegacion.indexOf(page) +1 )
    }else{
        nextPage(0)
    }
})

function nextPage(i) {

    switch (i) {   
    case 0:    
    imprimir("inicio")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
    break;
    case 1:   
    imprimir("proximos_eventos")
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]   
    break;
    case 2:   
    imprimir("eventos_pasados")    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
    break;
    case 3:    
    imprimir("contacto")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
    break;
    default:   
    imprimir("estadistica")
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
}
}

//funcionamiento flecha izquierda 

var buttonIzq = document.getElementById("butIzq")

buttonDer.addEventListener("click", function(e){
    var page = document.getElementById("titulo").innerText
    if(buttonNavegacion.indexOf(page)>= 4){
        antPage(buttonNavegacion.indexOf(page)-1 )
    }else{
        antPage(0)
    }
    console.log(buttonNavegacion.indexOf(page))
})

function antPage(i) {

    switch (i) {    
    case 0:    
    imprimir("inicio")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]   
    break;
    case 1:
    imprimir("proximos_eventos")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]   
    break;
    case 2:    
    imprimir("eventos_pasados")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
    break;
    case 3:   
    imprimir("contacto")    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]    
    break; 
    default:
    imprimir("estadistica")   
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]  
}
}

// buscador
inputsearch.addEventListener("keyup", function(e){
    search=e.target.value.trim().toLowerCase()
    filtrosCombinados()
}) 

//filtro check box// 
function eventsCategories(array){
let categories = array.map(evento=> evento.category)
let unica = new Set(categories) 
let lastcategories = [...unica]
let categoriasEvento= ""
lastcategories.map(category=>
    categoriasEvento+=
`
<label><input type="checkbox" value ="${category}" >${category}</label>
`)    
    document.getElementById("checkcategories").innerHTML= categoriasEvento
    checkboxListener()
}

function checkboxListener(){
    var checkboxs = document.querySelectorAll('input[type=checkbox]')
    for(i=0 ; i < checkboxs.length; i ++){
        checkboxs[i].addEventListener("change", function(){
            checkedCheckboxes= []
            for (i = 0; i < checkboxs.length; i++){
                if(checkboxs[i].checked){
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            filtrosCombinados()
        })
    }
}

function filtrosCombinados(){
    var filtrado = []; 
    if (search !=="" && checkedCheckboxes.length > 0){
        checkedCheckboxes.map(category => filtrado.push(...arrayBusqueda.filter(evento=>
            evento.name.toLowerCase().includes(search) && evento.category === category)
            ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0){
        filtrado= arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(search))

    }

    else if(search === "" && checkedCheckboxes.length > 0){
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayBusqueda.filter(evento=>
                evento.category=== category))
                )
                console.log(filtrado)
    }

    else{
        filtrado = arrayBusqueda
    }

    filtrado.length > 0 ?
        displayEvents(filtrado) :
        ulNombreEventos.innerHTML = `
        <div class="sinResultado"
        <h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>
        </div>
        `
}

//FUNCIONES STATS

async function initStats() {
    var categorias = []
    var unique = eventos.map(evento => evento.category)
    const quitoRepetidas = new Set(unique)
    categorias = [...quitoRepetidas]
    var porCategoria = []
    categorias.forEach(categoria => {
        porCategoria.push(
            {
                categoria: categoria,
                data: eventos.filter(evento => evento.category === categoria)
            }
        )
    })
  
    var ingresoYassitencia = []
  
    porCategoria.map(datos => {
        ingresoYassitencia.push({
            categoria: datos.categoria,
            ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
            estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
            asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
            estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
            capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
        })
    })
  
    ingresoYassitencia.forEach(categoria => {
  
        let totalAsistencia = 0
        let totalAsistenciaEstimada = 0
        let totalCapacidadPasados = 0
        let totalCapacidadFuturos = 0
  
        for (var i = 0; i <categoria.ingreso.length; i++) {
  
            if (categoria.ingreso[i] > 0) {
                totalCapacidadPasados += categoria.capacidad[i]
                totalAsistencia += categoria.asistencia[i]
                categoria.totalCapacidadPasados = totalCapacidadPasados
                categoria.totalAsistencia = totalAsistencia
  
            } else {
                totalCapacidadFuturos += categoria.capacidad[i]
                totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
                categoria.totalCapacidadFuturos = totalCapacidadFuturos
                categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
            }
        }
        categoria.porcentajeDeAsistencia = "%" + ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2)
        categoria.porcentajeDeEstimacion = "%" + ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2)
  
        let totalIngreso = 0
        categoria.ingreso.map(ingresos => totalIngreso += ingresos)
        categoria.ingresos = totalIngreso
  
        let totalIngresoEstimado = 0
        categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
        categoria.estimacionIngresos = totalIngresoEstimado
  
    })
  
    let eventosPasados = []
    let eventosFuturos = []
    await eventos.filter(evento => {
        if (evento.assistance) {
            eventosPasados.push(evento)
        } else { eventosFuturos.push(evento) }
    })
    eventosPasados.map(evento => {
        evento.porcentajeAsistencia = evento.assistance * 100 / evento.capacity
    })
  
    let asistenciaEventos = []
    eventosPasados.filter(evento => { asistenciaEventos.push(evento.porcentajeAsistencia) })
    let mayor = Math.max(...asistenciaEventos)
    let eventoMayorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === mayor)
    let menor = Math.min(...asistenciaEventos)
    let eventoMenorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === menor)
    let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })
  
    var rowMayoresYmenores = document.getElementById("mayoresymenores")
    rowMayoresYmenores.innerHTML = ""
    var tdMayorAsistencia = document.createElement("td")
    var tdMenorAsistencia = document.createElement("td")
    var tdMayorCapacidad = document.createElement("td")
  
    rowMayoresYmenores.append(tdMayorAsistencia)
    tdMayorAsistencia.append(`${eventoMayorAsistencia[0].name} %${eventoMayorAsistencia[0].porcentajeAsistencia.toFixed(2)}`)
  
    rowMayoresYmenores.append(tdMenorAsistencia)
    tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " %" + eventoMenorAsistencia[0].porcentajeAsistencia.toFixed(2))
  
    rowMayoresYmenores.append(tdMayorCapacidad)
    tdMayorCapacidad.append(mayorCapacidad[0].name + "(" + mayorCapacidad[0].category + ")")
  
  
    var tablaFuturos = document.getElementById("statsFuturos")
    ordenarFuturos = []
    ordenarFuturos.push(...ingresoYassitencia.sort((a, b) => {
        return b.estimacionIngresos - a.estimacionIngresos
    }))
  
    ordenarFuturos.map(evento => {
        if (evento.estimacionIngresos > 0) {
            tablaFuturos.innerHTML +=
                `
            <tr>
              <td>${evento.categoria}</td>
              <td>$${evento.estimacionIngresos}</td>
              <td>${evento.porcentajeDeEstimacion}</td>
            </tr>       
        `
        }
    })
  
    var tablaPasados = document.getElementById("statsPasados")
    let ordenarPasados = []
    ordenarPasados.push(...ingresoYassitencia.sort((a, b) => {
        return b.ingresos - a.ingresos
    }))
    ordenarPasados.map(evento => {
        if (evento.ingresos > 0) {
            tablaPasados.innerHTML += `
        <tr>
           <td>${evento.categoria}</td>
           <td>$${evento.ingresos}</td>
           <td>${evento.porcentajeDeAsistencia}</td>
        </tr>       
     `
        }
    })
  }