// Cambiar entre LIGA 03, 04, 05, 06
function mostrarLiga(idLiga) {
    document.querySelectorAll('.liga-section').forEach(section => section.style.display = 'none');
    document.querySelectorAll('.btn-liga').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(idLiga).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// Abrir/Cerrar Jornada
function toggleElemento(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
}

// Lógica de Guardado
function guardarPartido(id) {
    const cont = document.getElementById(id);
    const j1 = cont.querySelector('.nombre1');
    const j2 = cont.querySelector('.nombre2');
    let s1 = 0, s2 = 0;

    for (let i = 1; i <= 3; i++) {
        const v1 = parseInt(cont.querySelector(`.p1-s${i}`).value) || 0;
        const v2 = parseInt(cont.querySelector(`.p2-s${i}`).value) || 0;
        if (v1 > v2) s1++; else if (v2 > v1) s2++;
    }

    j1.classList.remove('ganador');
    j2.classList.remove('ganador');

    if (s1 >= 2) { j1.classList.add('ganador'); alert("Ganador: " + j1.innerText); }
    else if (s2 >= 2) { j2.classList.add('ganador'); alert("Ganador: " + j2.innerText); }
    else alert("Partido guardado (en curso).");
}
