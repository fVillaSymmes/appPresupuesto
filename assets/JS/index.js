const inputPresupuesto = document.getElementById("presupuesto")
const cifraPresupuesto = document.getElementById("cifraPresupuesto")
const cifraGastos = document.getElementById("cifraGastos")
const cifraSaldo = document.getElementById("cifraSaldo")
const botonPresupuesto = document.getElementById("botonPresupuesto")

const inputNombre = document.getElementById("inputNombre")
const inputCantidad = document.getElementById("inputCantidad")
const cajonGastos = document.getElementById("cajonGastos")
const cajonValores = document.getElementById("cajonValores")
const botonGasto = document.getElementById("botonGasto")

const cajonBorrar = document.getElementById("cajonBorron")

const gastosParticularizados = []

const presupuesto = {
    ingreso: 0,
    egreso: 0,
    saldo: function() {
        return this.ingreso - this.egreso
    }
}

// Mostrar presupuesto en columna

function fijarPresupuesto() {
    if (inputPresupuesto.value <= 0) {
    alert("El presupuesto ingresado debe ser mayor a cero")
    presupuesto.ingreso = 0
    cifraPresupuesto.innerHTML = presupuesto.ingreso
    cifraSaldo.innerHTML = presupuesto.saldo()
    } else {
    presupuesto.ingreso += parseInt(inputPresupuesto.value)
    cifraSaldo.innerHTML = `$${presupuesto.saldo()}`
    cifraPresupuesto.innerHTML = `$${presupuesto.ingreso}`
}}

botonPresupuesto.addEventListener("click", fijarPresupuesto)

// Mostrar Gastos y Saldo en la primer row

function desplegarGastos() {
    

    presupuesto.egreso += parseInt(inputCantidad.value)
    cifraGastos.innerHTML = `$${presupuesto.egreso}`
    cifraSaldo.innerHTML = `$${presupuesto.saldo()}`
    let nuevoGasto = new gastoParticular(inputNombre.value, inputCantidad.value)
    gastosParticularizados.push(nuevoGasto)
    mostrarCadaGasto()
}

function fijarGasto() { 
    if (inputNombre.value != "" && inputCantidad.value > 0 ) {
        desplegarGastos()
    } else {
        alert("Rellene ambos campos correctamente antes de declarar un gasto")
    }
}

botonGasto.addEventListener("click", fijarGasto)

// mostrar cada gasto en el segundo row

function gastoParticular(nombre, valorMonetario) {
    this.nombre = nombre;
    this.valorMonetario = valorMonetario;
}

function borrarGasto(id) {
    presupuesto.egreso = presupuesto.egreso - parseInt(gastosParticularizados[id].valorMonetario)
    cifraGastos.innerHTML = `$${presupuesto.egreso}`
    cifraSaldo.innerHTML = `$${presupuesto.saldo()}`
    gastosParticularizados.splice(id, 1)
    mostrarCadaGasto()
    }


function mostrarCadaGasto() {
    cajonGastos.innerHTML = "<p class='border-bottom'>Gasto</p>"
    cajonValores.innerHTML = "<p class='border-bottom'>Valores</p>"
    cajonBorrar.innerHTML = "<p class='border-bottom'>Eliminar</p>"

    for (let i = 0; i < gastosParticularizados.length; i++) {
        const gasto = gastosParticularizados[i];

        paqueteGasto = document.createElement("p")
        paqueteGasto.setAttribute("class", "border-bottom")
        paqueteGasto.innerHTML = `${parseInt([i]) + 1}. ${gasto.nombre}`
        cajonGastos.appendChild(paqueteGasto)

        paqueteValor = document.createElement("p")
        paqueteValor.setAttribute("class", "border-bottom")
        paqueteValor.innerHTML = `$${gasto.valorMonetario}`
        cajonValores.appendChild(paqueteValor)

        paqueteBorrar = document.createElement("p")
        paqueteBorrar.innerHTML = `<img src='./assets/img/trash.svg' onclick='borrarGasto(${[i]})'></img>` 
        cajonBorrar.appendChild(paqueteBorrar)
    }
}