async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos

    let id = location.search.split("?id=").filter(Number)
    let selectId = id[0]
    let eventoDetalle = eventos.filter(evento => evento.id == selectId)

    detalleVista(eventoDetalle)
}

getData()
 
function detalleVista(eventoDetalle) {

    var detalleVista = document.getElementById("tarjetas")
    detalleVista.innerHTML = `
    <img src="${eventoDetalle[0].image}" alt="">
    <h1>${eventoDetalle[0].name}</h1>
    <p>${eventoDetalle[0].description}</p>  
    <p>$${eventoDetalle[0].price}</p>
    <p>${eventoDetalle[0].category}</p>
    <p>${eventoDetalle[0].place}</p>    
`
}