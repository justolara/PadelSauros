function actualizarClasificacion() {
    inicializarStats(); // Reinicia contadores
    
    const partidos = document.querySelectorAll('.partido');
    
    partidos.forEach(partido => {
        const p1_nombre = partido.querySelector('.nombre1').innerText;
        const p2_nombre = partido.querySelector('.nombre2').innerText;
        
        let p1_sets_ganados = 0;
        let p2_sets_ganados = 0;
        let partidoJugado = false;

        // Recorremos los 3 sets posibles
        for(let i=1; i<=3; i++) {
            const s1 = parseInt(partido.querySelector(`.p1-s${i}`).value);
            const s2 = parseInt(partido.querySelector(`.p2-s${i}`).value);
            
            if(!isNaN(s1) && !isNaN(s2)) {
                partidoJugado = true;
                if(s1 > s2) { 
                    p1_sets_ganados++; 
                    stats[p1_nombre].sf++; 
                } else if(s2 > s1) { 
                    p2_sets_ganados++; 
                    stats[p2_nombre].sf++; 
                }
            }
        }

        if(partidoJugado) {
            stats[p1_nombre].pj++;
            stats[p2_nombre].pj++;
            
            // Lógica de Puntos: 1 Ganar | 0.5 Empatar | 0 Perder
            if(p1_sets_ganados > p2_sets_ganados) {
                stats[p1_nombre].pg++;
                stats[p1_nombre].pts += 1; // Ganador
                stats[p2_nombre].pp++;     // Perdedor (0 pts)
            } 
            else if(p1_sets_ganados < p2_sets_ganados) {
                stats[p2_nombre].pg++;
                stats[p2_nombre].pts += 1; // Ganador
                stats[p1_nombre].pp++;     // Perdedor (0 pts)
            } 
            else {
                // Empate en sets (ej: 1-1 y no se jugó el tercero)
                stats[p1_nombre].pts += 0.5;
                stats[p2_nombre].pts += 0.5;
            }
        }
    });

    renderizarTabla();
}
