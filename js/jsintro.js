console.log('Intro')

// Traer info de otra pagina

const simular = document.getElementById('simular')
simular.onclick = () =>{
	const alertaintro = document.getElementById('alerta')
	const nombre = document.getElementById('nom_ape')
    const age = document.getElementById('edad')
    const ready = document.getElementById('comando')
	if (nombre.value==='' || age.value==='Selecciona tu Edad'){
		alertaintro.innerText="¡Todos los datos con '*' son obligatorios para poder continuar!"
        alertaintro.className="bg-danger m-3"
    }
	else{
		const trabajando = (document.getElementById('flexRadioDefault1').checked)?'SI':'NO'
        const tutor = (document.getElementById('flexRadioDefault3').checked)?'SI':'NO'
        const trayectoria = (document.getElementById('flexRadioDefault5').checked)?'SI':'NO'
        if (parseInt(edad.value) < 18 && trabajando ==="SI" && tutor ==="SI" && trayectoria ==="SI" || parseInt(edad.value) < 18 && parseInt(edad.value) >= 15 && trabajando ==="NO" && tutor ==="SI" && trayectoria ==="SI" || parseInt(edad.value) < 18 && parseInt(edad.value) >= 14 && trabajando ==="SI" && tutor ==="NO" && trayectoria ==="SI" || parseInt(edad.value) < 18 && parseInt(edad.value) >= 13 && trabajando ==="SI" && tutor ==="SI" && trayectoria ==="NO"){
            alertaintro.innerText=`Aunque no cumples la edad para un credito, como ${trabajando} estas trabajndo, ${tutor} tienes a alguien que te ampare y ${trayectoria} tienes historial crediticio, cumples con el score para acceder` 
            alertaintro.className="bg-success m-3"
            let btn=document.createElement('button')
            btn.className="btn btn-outline-primary btn-lg"
            btn.innerHTML="<a href='../index.html'>IR AL SIMULADOR</a>"
            ready.append(btn)
        }
        else if(parseInt(edad.value) < 18 && trabajando ==="NO" && tutor ==="NO" && trayectoria ==="SI" || parseInt(edad.value) < 18 && trabajando ==="NO" && tutor ==="SI" && trayectoria ==="NO" || parseInt(edad.value) < 18 && trabajando ==="SI" && tutor ==="NO" && trayectoria ==="NO")
        {
            alertaintro.innerText=`Aunque no cumples la edad para un credito, como ${trabajando} estas trabajndo, ${tutor} tienes a alguien que te ampare y ${trayectoria} tienes historial crediticio, aun no cumples con los requisitos minimos para el credito pero te falta poco` 
            alertaintro.className="bg-warning m-3"
        }
        else{
            alertaintro.innerText=`No cumples con los requisitos minimos para un Credito, Intentalo despues.` 
            alertaintro.className="bg-danger m-3"
        }
	}

}

