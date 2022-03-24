console.log('Intro')

// Traer info de otra pagina

const simular = document.getElementById('simular')
simular.onclick = () =>{
	const alertaintro = document.getElementById('alerta')
	const nombre = document.getElementById('nom_ape')
    const age = document.getElementById('edad')
	if (nombre.value==='' || age.value==='Selecciona tu Edad'){
		alertaintro.innerText="¡Todos los datos con '*' son obligatorios para poder continuar!"}
	else{
		const trabajando = (document.getElementById('flexRadioDefault1').checked)?'SI':'NO'
        const tutor = (document.getElementById('flexRadioDefault3').checked)?'SI':'NO'
        const trayectoria = (document.getElementById('flexRadioDefault5').checked)?'SI':'NO'
        if (parseInt(edad)<18 && trabajando =='SI' && tutor =='SI' && trayectoria=='SI'){
            alertaintro.innerText="Aunque no cumples la edad para un cridito, como SI estas trabajndo, SI tienes a alguien que te ampare y SI tienes historial crediticio, cumples con el score para acceder" 
        }

	}

}
