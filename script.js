import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB07P8AG1WXnOlr0vxHNJFrCBbGTf_v_7M",
  authDomain: "padelsauros.firebaseapp.com",
  databaseURL: "https://padelsauros-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "padelsauros",
  storageBucket: "padelsauros.firebasestorage.app",
  messagingSenderId: "506820255898",
  appId: "1:506820255898:web:f3b9b75f732afb8036ff23"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Hacer las funciones accesibles desde el HTML
window.guardarPartido = function(idPartido) {
    const contenedor = document.getElementById(idPartido);
    const datos = {
        s1_p1: contenedor.querySelector('.p1-s1').value,
        s1_p2: contenedor.querySelector('.p2-s1').value,
        s2_p1: contenedor.querySelector('.p1-s2').value,
        s2_p2: contenedor.querySelector('.p2-s2').value,
        s3_p1: contenedor.querySelector('.p1-s3').value,
        s3_p2: contenedor.querySelector('.p2-s3').value
    };

    // Guarda en la ruta: resultados/idPartido
    set(ref(db, 'resultados/' + idPartido), datos)
        .then(() => alert("Resultado guardado en Firebase"))
        .catch((error) => console.error("Error:", error));
};

// Leer datos automáticamente al cargar
const resultadosRef = ref(db, 'resultados/');
onValue(resultadosRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        Object.keys(data).forEach(id => {
            const res = data[id];
            const div = document.getElementById(id);
            if(div) {
                div.querySelector('.p1-s1').value = res.s1_p1;
                div.querySelector('.p2-s1').value = res.s1_p2;
                // ... repetir para s2 y s3
            }
        });
    }
});

// Función básica para cambiar ligas
window.cambiarLiga = function(ligaId, btn) {
    document.querySelectorAll('.liga-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-liga').forEach(b => b.classList.remove('active'));
    document.getElementById(ligaId).classList.add('active');
    btn.classList.add('active');
};

window.toggleJornada = function(id) {
    const x = document.getElementById(id);
    x.style.display = (x.style.display === "none") ? "block" : "none";
};
