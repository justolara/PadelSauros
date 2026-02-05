// Objeto para almacenar los datos de la clasificación
let stats = {};

function inicializarStats() {
    // Lista de todas las parejas de la Liga 03
    const parejas = ["MIGUEL/JORGE", "DANI/ROMÁN", "IVÁN/PABLO", "CARLOS/JUST"];
    parejas.forEach(p => {
        stats[p] = { pj: 0, pg: 0, pp: 0, sf: 0, sc: 0, pts: 0 };
    });
}

function guardarPartido(id) {
    // Al guardar, recalculamos toda la tabla basándonos en los inputs actuales
    actualizarClasificacion();
    alert("Clasificación actualizada");
}

function actualizarClasificacion() {
    inicializarStats(); // Reiniciamos conteo para volver a calcular
    
    const partidos = document.querySelectorAll('.partido');
    
    partidos.forEach(partido => {
        const p1_nombre = partido.querySelector('.nombre1').innerText;
        const p2_nombre = partido.querySelector('.nombre2').innerText;
        
        // Capturar sets
        let p1_sets = 0;
        let p2_sets = 0;
        
        for(let i=1; i<=3; i++) {
            const s1 = parseInt(partido.querySelector(`.p1-s${i}`).value);
            const s2 = parseInt(partido.querySelector(`.p2-s${i}`).value);
            
            if(!isNaN(s1) && !isNaN(s2)) {
                if(s1 > s2) p1_sets++;
                else if(s2 > s1) p2_sets++;
                
                // Sumar sets a favor/contra para el desempate
                stats[p1_nombre].sf += s1 > s2 ? 1 : 0;
                stats[p2_nombre].sf += s2 > s1 ? 1 : 0;
            }
        }

        // Si se han jugado sets, contabilizar partido
        if(p1_sets > 0 || p2_sets > 0) {
            stats[p1_nombre].pj++;
            stats[p2_nombre].pj++;
            
            if(p1_sets > p2_sets) {
                stats[p1_nombre].pg++;
                stats[p1_nombre].pts += 3; // 3 puntos por ganar
                stats[p2_nombre].pp++;
                stats[p2_nombre].pts += 1; // 1 punto por perder (formato padel habitual)
            } else {
                stats[p2_nombre].pg++;
                stats[p2_nombre].pts += 3;
                stats[p1_nombre].pp++;
                stats[p1_nombre].pts += 1;
            }
        }
    });

    renderizarTabla();
}

function renderizarTabla() {
    const tbody = document.getElementById('tabla-body-l3');
    // Convertir objeto a array y ordenar por puntos (y luego por sets)
    const ranking = Object.entries(stats).sort((a, b) => b[1].pts - a[1].pts || b[1].sf - a[1].sf);
    
    tbody.innerHTML = "";
    ranking.forEach(([pareja, data]) => {
        tbody.innerHTML += `
            <tr>
                <td>${pareja}</td>
                <td>${data.pj}</td>
                <td>${data.pg}</td>
                <td>${data.pp}</td>
                <td>${data.sf}</td>
                <td style="font-weight:bold; color:#27ae60">${data.pts}</td>
            </tr>
        `;
    });
}

// Ejecutar al cargar para limpiar tabla
window.onload = inicializarStats;
