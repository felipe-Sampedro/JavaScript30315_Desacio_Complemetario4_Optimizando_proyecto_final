
console.log('PRESTAMOS')
/* alert("MUEVE LOS PARAMETROS Monto del Credito, Tasa Interes y Plazo PARA CALCULAR TU CUOTA MENSUAL A PAGAR!!! \n RECUERDA QUE DEBES SER MASYOR DE EDAD PARA SOLICITAR UN CREDITO") */

sessionStorage.setItem('fecha',new Date())
let tasa_interes_EM=0
let periodo=0

// funciones para conversion de parametros
function conversion_tasa_interes(tasa_interes_EA){
	let tasa_interes_EM = Math.pow((1 + (tasa_interes_EA/100)),(1/12))-1
	return tasa_interes_EM
}

function años_en_meses(años){
	let periodo = años*12
	return periodo
}

// cambio formato resultado
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
  })
  const formatter2 = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
  })

//funciones para cada uno de los periodos "k" del credito segun el plazo dado en meses

function anualidadPK(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK.toFixed(0)
}

function numPK(periodoPK){
	let numeradorPK = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK)))-1
	return numeradorPK
}

function denPK(periodoPK){
	let denominadorPK = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK))
	return denominadorPK
}


function PK(numeradorPK , denominadorPK){
	let PK = (anualidadPK() * numeradorPK) / denominadorPK
	return PK.toFixed(0)
}



//funciones para cada uno de los periodos "k-1" del credito segun el plazo dado en meses

function anualidadPK_1(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK_1=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK_1.toFixed(0)
}

function numPK_1(periodoPK_1){
	let numeradorPK_1 = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1)))-1
	return numeradorPK_1
}

function denPK_1(periodoPK_1){
	let denominadorPK_1 = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1))
	return denominadorPK_1
}


function PK_1(numeradorPK_1 , denominadorPK_1){
	let PK_1 = (anualidadPK_1() * numeradorPK_1) / denominadorPK_1
	return PK_1.toFixed(0)
}


// Funcion constructora de objetos con cada uno de los parametros calculados para cada mes 

class Cada_Periodo {
	constructor (k,numPK,denPK,PK,numPK_1,denPK_1,PK_1,abono_capital,cobro_interes){
		this.serie = k;
		this.numeradork = numPK;
		this.denominadork = denPK;
		this.capitalPK = PK;
		this.numeradorPK_1k = numPK_1;
		this.denominadorPK_1k = denPK_1;
		this.capitalPK_1 = PK_1;
		this.abonos=abono_capital
		this.cobro = cobro_interes
	}

	// Metodo que calcula del monto total pagado cada mes, cuanto se va al abono de capital
	abono_capital(){
		this.abonos= parseInt(this.capitalPK_1) - parseInt(this.capitalPK)
	}

	// Metodo que calcular del monto toal pagado cada mes, cuanto se va a pago de intereses generados
	pago_intereses(){
		this.cobro = anualidadPK() - this.abonos
	}
}

// Array vacio para utilizar propiedad push y cargarlos con los objetos creados de la funcion cosntructora
const Plan_pagos=[]

Plan_pagos.join('--')
console.log(Plan_pagos)

const borrar = document.getElementsByTagName('td')
const remover = document.getElementsByClassName('fila')
const amortizacion = document.querySelector('.resultado')
const limpiar = document.querySelector('.resetear')

let pc_fecha=document.getElementById('storage_fecha')
let años=document.getElementById('edad')
let menor_edad=document.getElementById('menor_edad')
let pc_trabaja=document.getElementById('trabaja')
let pc_amparo=document.getElementById('amparado')
let pc_historial=document.getElementById('historial')

limpiar.onclick = () => {amortizacion.innerText="";
	for (const element of borrar){
		element.innerText=""}
	for (const e of remover){
		e.remove()
	}

	pc_fecha.innerText="FECHA"
	años.innerText="EDAD"
	menor_edad.innerText="MENOR DE EDAD"
	pc_trabaja.innerText ="¿TRABAJA?"
	pc_amparo.innerText="¿AMPARADO?"
	pc_historial.innerText="¿TIENE HISTORIAL?"
}


// funcion principal para calculo de cuota mensual a pagar del credito
function anualidad(){
		let monto_prestamo = document.getElementById("prestamo").value;
		let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
		let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);
		let res=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
		document.getElementById("resultado_final").innerHTML = formatter.format(res)
}

function plan_amortizacion(){
	for (let a = 1; a <= años_en_meses(document.getElementById("plazo").value); a++){

		nombre_objeto = 'resultado'+a
		Plan_pagos.push(nombre_objeto = new Cada_Periodo(a,numPK(a).toFixed(2),denPK(a).toFixed(2),PK(numPK(a),denPK(a)),numPK_1(a).toFixed(2),denPK_1(a).toFixed(2),PK_1(numPK_1(a),denPK_1(a)),0,0));			
		nombre_objeto.abono_capital()			
		nombre_objeto.pago_intereses()
//		console.log(`en el mes ${a} se pagaron ${nombre_objeto.abonos} pesos como abono a capital y ${nombre_objeto.cobro} pesos en abono a intereses`)
		let container = document.getElementById('detalle_pagos')
		let tr = document.createElement('tr')
		tr.className= `${a} fila` 
		container.append(tr)


		for (let j = 1; j<=5;j++){
			fil_col = 'tabla'+a+j;
			clase_rc= 'rc'+a+j 

			let td = document.createElement('td')
			td.id=clase_rc
			td.className= 'linea'
			tr.append(td)

			switch(j){
				case 1:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = a
					break 
				case 2:
					fil_col=document.getElementById(clase_rc)
/* 					fil_col.innerText = nombre_objeto.capitalPK */
					fil_col.innerText = formatter2.format(nombre_objeto.capitalPK)
					break
				case 3:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.capitalPK_1)
					break
				case 4:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.abonos)
					break
				case 5:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.cobro)
					break
			}
		}
	}
}

const calcular = document.getElementById('calculo')
calcular.onclick = () => {
	edad=parseInt(prompt("cual es tu edad?"))
	while (isNaN(edad) || edad<=0){
		alert("La edad ingresada debe ser mayor que cero")
		edad=parseInt(prompt("cual es tu edad?"))
	}
	sessionStorage.setItem('edad',edad)
	if (edad>=18){
		anualidad()
		plan_amortizacion()
		sessionStorage.setItem('programa', JSON.stringify(Plan_pagos))
		const programaJson=sessionStorage.getItem('programa')
		console.log(programaJson)
		let pc_fecha=document.getElementById('storage_fecha')
		pc_fecha.innerText = 'FECHA: '+ sessionStorage.getItem('fecha')

		let años=document.getElementById('edad')
		años.innerText = 'EDAD: '+ sessionStorage.getItem('edad')

		let menor_edad=document.getElementById('menor_edad')
		menor_edad.innerText = 'MENOR DE EDAD: NO!'

		let pc_trabaja=document.getElementById('trabaja')
		pc_trabaja.innerText = ''

		let pc_amparo=document.getElementById('amparado')
		pc_amparo.innerText = ''

		let pc_historial=document.getElementById('historial')
		pc_historial.innerText = ''

		}
	else{
		alert("no tienes edad suficiente para solicitar un credito!!")
		alert("Te haremos unas preguntas que te ayudaran a sumar puntos para calificar de todas maneras para el credito")
		for (let i=1 ;i<=3;i++){
			switch (i){
				case 1:
					let trabajo=0
					while (trabajo !== "SI" && trabajo !== "si" && trabajo !== "Si" &&  trabajo !== "sI" && trabajo !== "NO" && trabajo !== "no" && trabajo !== "No" && trabajo !== "nO"){
						trabajo = prompt("¿Actualmente trabajas y puedes demotrar ingresos? SI o NO")
						if(trabajo !== "SI" && trabajo !== "si" && trabajo !== "Si" &&  trabajo !== "sI" && trabajo !== "NO" && trabajo !== "no" && trabajo !== "No" && trabajo !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(trabajo)
					}	
					if (trabajo == "SI" || trabajo == "si" || trabajo == "Si" ||  trabajo == "sI"){
						edad = edad+3
						console.log(edad)
						console.log(trabajo)
					}
					sessionStorage.setItem('trabajas', trabajo)
					break
				case 2:
					let amparo=0
					while(amparo !== "SI" && amparo !== "si" && amparo !== "Si" &&  amparo !== "sI" && amparo !== "NO" && amparo !== "no" && amparo !== "No" && amparo !== "nO"){
						amparo = prompt("Tienes alguien que te ampare financieramente? SI o NO")
						if(amparo !== "SI" && amparo !== "si" && amparo !== "Si" &&  amparo !== "sI" && amparo !== "NO" && amparo !== "no" && amparo !== "No" && amparo !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(amparo)
					}
					if (amparo == "SI" || amparo == "si" || amparo == "Si" ||  amparo == "sI"){
						edad = edad+2
						console.log(edad)
						console.log(amparo)
					}
					sessionStorage.setItem('amparado', amparo)
					break
				case 3:
					let historial=0
					while(historial !== "SI" && historial !== "si" && historial !== "Si" &&  historial !== "sI" && historial !== "NO" && historial !== "no" && historial !== "No" && historial !== "nO"){
						historial=prompt("Tienes hitorial crediticio? SI o NO")
						if(historial !== "SI" && historial !== "si" && historial !== "Si" &&  historial !== "sI" && historial !== "NO" && historial !== "no" && historial !== "No" && historial !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(historial)
					}
					if (historial == "SI" || historial == "si" || historial == "Si" ||  historial == "sI"){
						edad = edad+1
						console.log(edad)
						console.log(historial)
					}
					sessionStorage.setItem('historial', historial)
					break
				}
			if(edad>=18){
				i=4
			}
		}
		if(edad>=18){
			anualidad()
			plan_amortizacion()	

			let pc_fecha=document.getElementById('storage_fecha')
			pc_fecha.innerText = 'FECHA: '+ sessionStorage.getItem('fecha')
	
			let años=document.getElementById('edad')
			años.innerText = 'EDAD: '+ sessionStorage.getItem('edad')
	
			let menor_edad=document.getElementById('menor_edad')
			menor_edad.innerText = 'MENOR DE EDAD: SI!'
	
			let pc_trabaja=document.getElementById('trabaja')
			pc_trabaja.innerText = '¿TRABAJA?: '+ sessionStorage.getItem('trabajas')
	
			let pc_amparo=document.getElementById('amparado')
			pc_amparo.innerText = '¿AMPARADO?: ' + sessionStorage.getItem('amparado')
	
			let pc_historial=document.getElementById('historial')
			pc_historial.innerText = '¿HISTORIAL?: ' + sessionStorage.getItem('historial')
		}
		else{
			alert("lo sentimos, aunque tienes puntos extras no es suficiente, no podemos darte el credito")
		}
	}
} 
	

// para mostrar el valor seleccionados en los inputs de rango
const prestamo = document.querySelector('#prestamo')
const output = document.querySelector('.prestamo-output')

output.textContent = prestamo.value

prestamo.addEventListener('input', function() {
  output.textContent = prestamo.value
});


const interes = document.querySelector('#interes')
const output2 = document.querySelector('.interes-output')

output2.textContent = interes.value

interes.addEventListener('input', function() {
  output2.textContent = interes.value
});


const plazo = document.querySelector('#plazo')
const output3 = document.querySelector('.plazo-output')

output3.textContent = plazo.value

plazo.addEventListener('input', function() {
  output3.textContent = plazo.value
});