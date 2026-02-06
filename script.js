<!-- Importar Firebase desde CDN -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com";
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com";

  // TUS DATOS DE FIREBASE (Cópialos de tu consola de Firebase)
  const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://padelsauros-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "Padelsauros",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "...",
    appId: "..."
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // 1. ESCUCHAR CAMBIOS (Para que todos vean lo mismo en tiempo real)
  const ligaRef = ref(db, 'ligas/liga03');
  onValue(ligaRef, (snapshot) => {
    const datos = snapshot.val();
    if (datos) {
      Object.keys(datos).forEach(pId => {
        const container = document.getElementById(pId);
        if (container) {
          const inputs = container.querySelectorAll('input');
          datos[pId].forEach((val, i) => { if(inputs[i]) inputs[i].value = val; });
        }
      });
      actualizarClasificacion(); // Función que ya tienes para calcular puntos
    }
  });

  // 2. FUNCIÓN PARA GUARDAR (Global)
  window.guardarPartido = function(id) {
    const partido = document.getElementById(id);
    const valores = Array.from(partido.querySelectorAll('input')).map(i => i.value);
    
    // Guardamos en Firebase
    set(ref(db, 'ligas/liga03/' + id), valores)
      .then(() => alert("Resultado publicado para todos los usuarios"))
      .catch((error) => console.error("Error al publicar:", error));
  };

  // 3. TU LÓGICA DE PUNTOS (Adaptada)
  window.actualizarClasificacion = function() {
    const parejas = ["MIGUEL/JORGE", "DANI/ROMÁN", "IVÁN/PABLO", "CARLOS/JUST"];
    let stats = {};
    parejas.forEach(p => stats[p] = { pj: 0, pg: 0, pp: 0, sf: 0, pts: 0 });

    document.querySelectorAll('.partido').forEach(partido => {
        const p1_n = partido.querySelector('.nombre1').innerText;
        const p2_n = partido.querySelector('.nombre2').innerText;
        let p1_sets = 0, p2_sets = 0, jugado = false;

        const inputs = partido.querySelectorAll('input');
        // Tu lógica de puntos 1, 0.5, 0...
        // ... (resto del código de cálculo que ya definimos)
        renderizarTabla(stats);
    });
  };
</script>
