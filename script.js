<script>
    function toggleJornada(id) {
        const el = document.getElementById(id);
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    }

    function cambiarLiga(idLiga, btn) {
        document.querySelectorAll('.liga-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.btn-liga').forEach(b => b.classList.remove('active'));
        
        document.getElementById(idLiga).classList.add('active');
        btn.classList.add('active');
        // Recalcular clasificación de la nueva liga automáticamente
        generarClasificacion(idLiga); 
    }

    function guardarPartido(id) {
        const cont = document.getElementById(id);
        // ... (resto de la función guardarPartido es igual que antes) ...
        const n1 = cont.querySelector('.nombre1');
        const n2 = cont.querySelector('.nombre2');
        let s1 = 0, s2 = 0;
        for (let i = 1; i <= 3; i++) {
            const v1 = parseInt(cont.querySelector(`.p1-s${i}`).value) || 0;
            const v2 = parseInt(cont.querySelector(`.p2-s${i}`).value) || 0;
            if (v1 > v2) s1++; else if (v2 > v1) s2++;
        }
        n1.classList.remove('ganador');
        n2.classList.remove('ganador');
        if (s1 >= 2) { n1.classList.add('ganador'); alert("Ganador: " + n1.innerText); }
        else if (s2 >= 2) { n2.classList.add('ganador'); alert("Ganador: " + n2.innerText); }
        else alert("Resultado guardado correctamente.");

        // Después de guardar, recalcular la clasificación automáticamente
        const ligaId = cont.closest('.liga-section').id;
        generarClasificacion(ligaId);
    }

    /**
     * Genera la tabla de clasificación para una liga específica.
     * Asume que los inputs del DOM son la fuente de verdad.
     */
    function generarClasificacion(ligaId) {
        const ligaElemento = document.getElementById(ligaId);
        const partidos = ligaElemento.querySelectorAll('.partido');
        const estadisticas = {}; // Almacenará puntos, PJ, PG, etc.

        partidos.forEach(partido => {
            const nombre1 = partido.querySelector('.nombre1').innerText;
            const nombre2 = partido.querySelector('.nombre2').innerText;

            // Inicializar estadísticas si la pareja es nueva
            if (!estadisticas[nombre1]) estadisticas[nombre1] = { pj: 0, pg: 0, pe: 0, pp: 0, puntos: 0 };
            if (!estadisticas[nombre2]) estadisticas[nombre2] = { pj: 0, pg: 0, pe: 0, pp: 0, puntos: 0 };

            let setsP1 = 0;
            let setsP2 = 0;
            let setsCompletados = 0;

            for (let i = 1; i <= 3; i++) {
                const v1 = parseInt(partido.querySelector(`.p1-s${i}`).value);
                const v2 = parseInt(partido.querySelector(`.p2-s${i}`).value);

                if (!isNaN(v1) && !isNaN(v2)) setsCompletados++;

                if (v1 > v2) setsP1++;
                else if (v2 > v1) setsP2++;
            }

            // Solo contamos si el partido está al menos empezado o terminado
            if (setsCompletados > 0) {
                estadisticas[nombre1].pj++;
                estadisticas[nombre2].pj++;

                if (setsP1 > setsP2) {
                    // Gana Pareja 1
                    estadisticas[nombre1].pg++;
                    estadisticas[nombre1].puntos += 1;
                    estadisticas[nombre2].pp++;
                } else if (setsP2 > setsP1) {
                    // Gana Pareja 2
                    estadisticas[nombre2].pg++;
                    estadisticas[nombre2].puntos += 1;
                    estadisticas[nombre1].pp++;
                } else {
                    // Empate (puede ocurrir en partidos incompletos con sets empatados)
                    estadisticas[nombre1].pe++;
                    estadisticas[nombre1].puntos += 0.5;
                    estadisticas[nombre2].pe++;
                    estadisticas[nombre2].puntos += 0.5;
                }
            }
        });

        // Convertir a array para ordenar por puntos (descendente)
        const ranking = Object.keys(estadisticas).map(nombre => ({ nombre, ...estadisticas[nombre] }));
        ranking.sort((a, b) => b.puntos - a.puntos);

        // Renderizar la tabla HTML
        const tbody = document.getElementById(`cuerpo-tabla-${ligaId}`);
        if (tbody) {
            tbody.innerHTML = ''; // Limpiar tabla
            ranking.forEach(pareja => {
                const fila = tbody.insertRow();
                fila.innerHTML = `
                    <td style="padding: 10px;">${pareja.nombre}</td>
                    <td style="padding: 10px; text-align: center;">${pareja.pj}</td>
                    <td style="padding: 10px; text-align: center;">${pareja.pg}</td>
                    <td style="padding: 10px; text-align: center;">${pareja.pe}</td>
                    <td style="padding: 10px; text-align: center;">${pareja.pp}</td>
                    <td style="padding: 10px; text-align: center; font-weight: bold;">${pareja.puntos}</td>
                `;
            });
        }
    }
    
    // Generar la clasificación inicial para la liga que esté activa al cargar
    document.addEventListener('DOMContentLoaded', (event) => {
        const ligaActiva = document.querySelector('.liga-section.active');
        if (ligaActiva) {
            generarClasificacion(ligaActiva.id);
        }
    });

</script>
