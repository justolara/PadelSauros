/**
 * Procesa el resultado de un partido basándose en el mejor de 3 sets.
 * @param {string} id - El ID del contenedor del partido.
 */
function guardarPartido(id) {
    const contenedor = document.getElementById(id);
    const jugador1 = contenedor.querySelector('.nombre1');
    const jugador2 = contenedor.querySelector('.nombre2');
    
    let setsGanadosP1 = 0;
    let setsGanadosP2 = 0;

    // Resetear estilos visuales antes de calcular
    jugador1.classList.remove('ganador');
    jugador2.classList.remove('ganador');

    // Analizar los 3 sets posibles
    for (let i = 1; i <= 3; i++) {
        const score1 = parseInt(contenedor.querySelector(`.p1-s${i}`).value) || 0;
        const score2 = parseInt(contenedor.querySelector(`.p2-s${i}`).value) || 0;

        // Solo cuenta si alguien ha ganado el set (no empate a 0)
        if (score1 > score2) {
            setsGanadosP1++;
        } else if (score2 > score1) {
            setsGanadosP2++;
        }
    }

    // Determinar ganador al mejor de 3
    if (setsGanadosP1 >= 2) {
        jugador1.classList.add('ganador');
        alert(`¡Victoria para ${jugador1.innerText}! (${setsGanadosP1} - ${setsGanadosP2})`);
    } else if (setsGanadosP2 >= 2) {
        jugador2.classList.add('ganador');
        alert(`¡Victoria para ${jugador2.innerText}! (${setsGanadosP2} - ${setsGanadosP1})`);
    } else {
        alert("El partido aún no tiene un ganador claro (se necesitan 2 sets ganados).");
    }
}

/**
 * Alterna la visibilidad de los partidos de la jornada.
 */
function toggleJornada() {
    const contenedor = document.getElementById('contenedor');
    const displayActual = window.getComputedStyle(contenedor).display;
    contenedor.style.display = displayActual === "none" ? "block" : "none";
}
